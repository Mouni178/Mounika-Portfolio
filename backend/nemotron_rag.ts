import OpenAI from 'openai';
import { RESUME_CHUNKS, ResumeChunk, FULL_RESUME_TEXT } from './resume_knowledge';

// Retrieve API key strictly from environment variables
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || "";
const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";

const LLM_MODEL = "nvidia/nemotron-3.5-lightning-30b-a3b";
const EMBED_MODEL = "nvidia/nemotron-3.5-embed-1b";

// Cache for pre-computed chunk embeddings if available
const chunkEmbeddingsCache = new Map<string, number[]>();

function getOpenAIClient(apiKey = NVIDIA_API_KEY): OpenAI {
  return new OpenAI({
    apiKey: apiKey,
    baseURL: NVIDIA_BASE_URL
  });
}

// Compute cosine similarity between two float vectors
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dotProduct / denom;
}

// Keyword-based fallback matching score
function keywordScore(query: string, chunk: ResumeChunk): number {
  const qTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  let score = 0;
  const chunkTextLower = (chunk.title + " " + chunk.text + " " + chunk.metadata.keywords.join(" ")).toLowerCase();

  for (const term of qTerms) {
    if (chunk.metadata.keywords.some(k => k.includes(term) || term.includes(k))) {
      score += 3;
    }
    if (chunkTextLower.includes(term)) {
      score += 1;
    }
  }
  return score;
}

export interface RagResponse {
  answer: string;
  reasoning?: string;
  retrievedChunks: {
    id: string;
    section: string;
    title: string;
    similarity: number;
    text: string;
  }[];
  model: string;
  embeddingModel: string;
  usedFallback?: boolean;
}

export async function askResumeRag(query: string, customApiKey?: string): Promise<RagResponse> {
  const apiKey = customApiKey || NVIDIA_API_KEY;

  let rankedChunks: { chunk: ResumeChunk; similarity: number }[] = [];
  let usedEmbeddingFallback = false;

  if (!apiKey) {
    // Graceful offline fallback: Lexical keyword ranking over verified resume chunks
    rankedChunks = RESUME_CHUNKS.map(chunk => ({
      chunk,
      similarity: keywordScore(query, chunk)
    })).sort((a, b) => b.similarity - a.similarity);

    const topChunks = rankedChunks.slice(0, 4);
    const fallbackAnswer = generateDeterministicResumeAnswer(query, topChunks.map(c => c.chunk));
    return {
      answer: fallbackAnswer,
      reasoning: "Answer synthesized strictly from indexed resume chunks (NVIDIA_API_KEY not configured).",
      retrievedChunks: topChunks.map(tc => ({
        id: tc.chunk.id,
        section: tc.chunk.section,
        title: tc.chunk.title,
        similarity: Number(tc.similarity.toFixed(4)),
        text: tc.chunk.text
      })),
      model: `${LLM_MODEL} (Local Grounded RAG)`,
      embeddingModel: EMBED_MODEL,
      usedFallback: true
    };
  }

  const client = getOpenAIClient(apiKey);

  try {
    // 1. Vector Embeddings with Nemotron-3.5-embed-1b
    const embedResponse = await client.embeddings.create({
      input: [query],
      model: EMBED_MODEL,
      encoding_format: "float",
      // @ts-ignore - Nvidia NIM specific extra_body parameters
      extra_body: {
        input_type: "query",
        truncate: "END"
      }
    });

    const queryEmbedding = embedResponse.data[0]?.embedding;

    if (queryEmbedding && Array.isArray(queryEmbedding)) {
      // Embed any uncached chunks or rank against stored representations
      for (const chunk of RESUME_CHUNKS) {
        let chunkVec = chunkEmbeddingsCache.get(chunk.id);
        if (!chunkVec) {
          try {
            const chunkEmbedRes = await client.embeddings.create({
              input: [chunk.text],
              model: EMBED_MODEL,
              encoding_format: "float",
              // @ts-ignore
              extra_body: { input_type: "passage", truncate: "END" }
            });
            chunkVec = chunkEmbedRes.data[0]?.embedding;
            if (chunkVec) chunkEmbeddingsCache.set(chunk.id, chunkVec);
          } catch {
            // If individual chunk embedding fails, fallback to keyword score
          }
        }

        const similarity = chunkVec 
          ? cosineSimilarity(queryEmbedding, chunkVec)
          : (keywordScore(query, chunk) / 10);

        rankedChunks.push({ chunk, similarity });
      }

      rankedChunks.sort((a, b) => b.similarity - a.similarity);
    } else {
      throw new Error("No embedding vector returned");
    }
  } catch (embedError) {
    usedEmbeddingFallback = true;
    // Fallback: Lexical TF-IDF keyword ranking over resume chunks
    rankedChunks = RESUME_CHUNKS.map(chunk => ({
      chunk,
      similarity: keywordScore(query, chunk)
    })).sort((a, b) => b.similarity - a.similarity);
  }

  // Pick top 3-4 relevant chunks
  const topChunks = rankedChunks.slice(0, 4);
  const contextText = topChunks.map(c => `[SECTION: ${c.chunk.section} | ${c.chunk.title}]\n${c.chunk.text}`).join("\n\n---\n\n");

  // 2. Strict Prompt Formulation
  const systemPrompt = `You are the verified AI Resume Assistant for Potthalam Mounika.
Your job is to answer user questions about Potthalam Mounika STRICTLY and ONLY using the provided resume context below.

CRITICAL RULES:
1. Answer accurately and directly using ONLY facts from the provided context.
2. If the user asks about anything NOT covered in Potthalam Mounika's resume (such as outside personal life, other companies, celebrity trivia, weather, unrelated code generation, or fictional details), you MUST reply:
   "I can only answer questions based on the information provided in Potthalam Mounika's resume. This specific detail is not found in her resume."
3. Do NOT invent, assume, or extrapolate details not present in the text.
4. Keep answers professional, concise, and focused on her qualifications as an AI Engineer and Machine Learning Researcher.

VERIFIED RESUME CONTEXT:
${contextText}

FULL RESUME REFERENCE:
${FULL_RESUME_TEXT}`;

  try {
    // 3. Call NVIDIA Nemotron LLM (nemotron-3.5-lightning-30b-a3b)
    // @ts-ignore - enable_thinking parameter for Nemotron reasoning
    const completion = await client.chat.completions.create({
      model: LLM_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query }
      ],
      temperature: 0.2,
      top_p: 0.95,
      max_tokens: 4096,
      // @ts-ignore - Nvidia NIM reasoning parameters
      chat_template_kwargs: { enable_thinking: true }
    });

    const choice = completion.choices[0];
    const answer = choice?.message?.content || "No response received.";
    // @ts-ignore - Extract reasoning content if present
    const reasoning = choice?.message?.reasoning_content || choice?.message?.thinking || undefined;

    return {
      answer,
      reasoning,
      retrievedChunks: topChunks.map(tc => ({
        id: tc.chunk.id,
        section: tc.chunk.section,
        title: tc.chunk.title,
        similarity: Number(tc.similarity.toFixed(4)),
        text: tc.chunk.text
      })),
      model: LLM_MODEL,
      embeddingModel: EMBED_MODEL,
      usedFallback: usedEmbeddingFallback
    };
  } catch (llmError: any) {
    // Graceful fallback grounded solely on resume chunks
    const fallbackAnswer = generateDeterministicResumeAnswer(query, topChunks.map(c => c.chunk));
    return {
      answer: fallbackAnswer,
      reasoning: "Nemotron API key rate-limited or offline. Generated answer strictly from indexed resume chunks.",
      retrievedChunks: topChunks.map(tc => ({
        id: tc.chunk.id,
        section: tc.chunk.section,
        title: tc.chunk.title,
        similarity: Number(tc.similarity.toFixed(4)),
        text: tc.chunk.text
      })),
      model: `${LLM_MODEL} (Local Grounded RAG)`,
      embeddingModel: EMBED_MODEL,
      usedFallback: true
    };
  }
}

// Deterministic grounding fallback if network is unreachable
function generateDeterministicResumeAnswer(query: string, relevantChunks: ResumeChunk[]): string {
  const q = query.toLowerCase();

  if (q.includes("project") || q.includes("navbot") || q.includes("plant") || q.includes("fire")) {
    return `Potthalam Mounika has built three primary projects:
1. **NavBot – Autonomous Waiter Robot for Hotel Food Service**: Integrated Arduino, Raspberry Pi, and motor control with the A* pathfinding algorithm for collision-free navigation. Recognized and funded under the **IndiaAI Mission Fellowship** (Ministry of Electronics and Information Technology, MeitY).
2. **AI-Powered Plant Disease Detection**: Deep CNN model built using Python, TensorFlow, and Keras, achieving ~85% classification accuracy on public foliar datasets.
3. **Forest Fire Detection**: Supervised Random Forest classification model predicting environmental fire risk with >90% accuracy using Scikit-learn and Pandas.`;
  }

  if (q.includes("education") || q.includes("cgpa") || q.includes("college") || q.includes("university") || q.includes("degree")) {
    return `Potthalam Mounika's educational background:
- **B.Tech in Computer Science Engineering (AIML)**: Kalasalingam Academy of Research and Education (2022–2026) with a **CGPA of 9.01/10**.
- **Intermediate (XII)**: Sri Chaitanya Junior College (2020–2022) with **96.3%**.
- **SSC (X)**: Vignan High School (2019–2020) with **94.33%**.`;
  }

  if (q.includes("experience") || q.includes("eduleem") || q.includes("technook") || q.includes("intern") || q.includes("trainee")) {
    return `Potthalam Mounika's professional experience:
1. **Generative AI Trainee** at **Eduleem** (2026 – Present): Training in Generative AI, Large Language Models (LLMs), NLP, and Python-based AI application development.
2. **Machine Learning Intern** at **Technook** (Mar 2024 – Apr 2024, Remote): Developed supervised/unsupervised ML models using Python, feature engineering with Pandas and NumPy, and evaluated performance metrics.`;
  }

  if (q.includes("skill") || q.includes("python") || q.includes("programming") || q.includes("llm")) {
    return `Potthalam Mounika's technical skills:
- **Programming**: Python, Java, SQL
- **Generative AI**: Generative AI, LLMs, NLP
- **Python Libraries**: Pandas, NumPy
- **CS Fundamentals**: Data Structures & Algorithms, OOP, DBMS, Computer Networks, Operating Systems
- **Databases**: MySQL
- **AI / Machine Learning**: Machine Learning, Deep Learning, CNN, Random Forest, TensorFlow, Keras, Scikit-learn
- **Tools**: Git, GitHub, VS Code, Jupyter Notebook`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
    return `Contact details for Potthalam Mounika:
- **Email**: potthalammounika17@gmail.com
- **Phone**: +91-6300636367 (or 6300636367)
- **Profiles**: LinkedIn, GitHub, HackerRank`;
  }

  if (q.includes("fellowship") || q.includes("achievement") || q.includes("hackathon") || q.includes("meity")) {
    return `Potthalam Mounika's achievements:
1. **IndiaAI Mission Fellowship**: Recognized and funded under the IndiaAI Mission by the Ministry of Electronics and Information Technology (MeitY), Government of India, for her NavBot autonomous hotel waiter robot project.
2. **AI Bot Hackathon** – Coding Blocks, 2024.
3. **Machine Learning Internship** – Technook, 2024.`;
  }

  return `Based strictly on Potthalam Mounika's resume:\n` + relevantChunks.slice(0, 2).map(c => `• ${c.text}`).join("\n\n");
}
