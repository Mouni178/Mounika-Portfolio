"""
Potthalam Mounika — Resume RAG Service
Using NVIDIA Nemotron-3.5-lightning-30b-a3b and Nemotron-3.5-embed-1b

To run:
  pip install -r backend/requirements.txt
  python backend/rag_service.py
"""

import os
import math
from typing import List, Dict, Any
from openai import OpenAI

# NVIDIA NIM Configurations
LLM_MODEL = "nvidia/nemotron-3.5-lightning-30b-a3b"
EMBED_MODEL = "nvidia/nemotron-3.5-embed-1b"
NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1"

# Retrieve API Key strictly from environment variable
NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY", "")

client = None
if NVIDIA_API_KEY:
    client = OpenAI(
        api_key=NVIDIA_API_KEY,
        base_url=NVIDIA_BASE_URL
    )

# Resume Knowledge Chunks
RESUME_CHUNKS = [
    {
        "id": "summary",
        "title": "Profile & Contact",
        "text": (
            "POTTHALAM MOUNIKA\n"
            "Generative AI Trainee — Python — Java — Machine Learning — LLMs\n"
            "+91-6300636367 — potthalammounika17@gmail.com\n"
            "Profiles: LinkedIn, GitHub, HackerRank\n"
            "Summary: Computer Science Engineering graduate with a strong foundation in Python, "
            "Java, SQL, Data Structures, and Machine Learning. Experienced in developing machine "
            "learning projects and currently pursuing hands-on training in Generative AI, "
            "Large Language Models (LLMs), and NLP. Eager to grow as an AI Engineer and Machine Learning Researcher."
        )
    },
    {
        "id": "education",
        "title": "Education Details",
        "text": (
            "EDUCATION:\n"
            "- Kalasalingam Academy of Research and Education (2022 – 2026): "
            "B.Tech in Computer Science Engineering (AIML), CGPA: 9.01/10\n"
            "- Sri Chaitanya Junior College (2020 – 2022): Intermediate (XII), 96.3%\n"
            "- Vignan High School (2019 – 2020): SSC (X), 94.33%"
        )
    },
    {
        "id": "experience_eduleem",
        "title": "Experience — Eduleem",
        "text": (
            "EXPERIENCE: Generative AI Trainee – Eduleem (2026 – Present)\n"
            "- Training in Generative AI, LLMs, NLP and Python-based AI application development.\n"
            "- Exploring data processing, modern Generative AI workflows, and practical LLM-based solutions."
        )
    },
    {
        "id": "experience_technook",
        "title": "Experience — Technook",
        "text": (
            "EXPERIENCE: Machine Learning Intern – Technook (Mar 2024 – Apr 2024, Remote)\n"
            "- Developed supervised and unsupervised machine learning models using Python.\n"
            "- Performed data preprocessing and feature engineering using Pandas and NumPy.\n"
            "- Evaluated machine learning models and experimented with different approaches to improve performance."
        )
    },
    {
        "id": "project_plant_disease",
        "title": "Project: Plant Disease Detection",
        "text": (
            "PROJECT: AI-Powered Plant Disease Detection (Python, TensorFlow, Keras, CNN)\n"
            "- Developed a deep learning model using Convolutional Neural Networks (CNN) to identify plant diseases from leaf images.\n"
            "- Trained and evaluated the model on a public dataset, achieving approximately 85% classification accuracy.\n"
            "- Designed the solution to support early plant disease detection and help reduce potential crop loss."
        )
    },
    {
        "id": "project_forest_fire",
        "title": "Project: Forest Fire Detection",
        "text": (
            "PROJECT: Forest Fire Detection (Python, Scikit-learn, Pandas, Random Forest)\n"
            "- Developed a machine learning model using Random Forest to predict forest fire risk based on environmental conditions.\n"
            "- Used temperature, humidity, and wind speed features to classify high-risk conditions.\n"
            "- Achieved over 90% accuracy on the available dataset."
        )
    },
    {
        "id": "project_navbot",
        "title": "Project: NavBot Autonomous Waiter Robot",
        "text": (
            "PROJECT: NavBot – Autonomous Waiter Robot for Hotel Food Service (Arduino, C++, Raspberry Pi, A* Algorithm)\n"
            "- Developed an autonomous waiter robot with ultrasonic sensor-based obstacle detection and distance measurement for hotel food service.\n"
            "- Integrated Arduino, Raspberry Pi, and motor control components; applied the A* pathfinding algorithm for obstacle-avoiding navigation.\n"
            "- Recognition & Funding: IndiaAI Mission Fellowship — Autonomous Waiter Robot project recognized under the IndiaAI Mission, "
            "Ministry of Electronics and Information Technology (MeitY), Government of India, with project funding."
        )
    },
    {
        "id": "skills",
        "title": "Technical Skills",
        "text": (
            "TECHNICAL SKILLS:\n"
            "- Programming: Python, Java, SQL\n"
            "- Generative AI: Generative AI, LLMs, NLP\n"
            "- Python Libraries: Pandas, NumPy\n"
            "- CS Fundamentals: Data Structures and Algorithms, OOP, DBMS, Computer Networks, Operating Systems\n"
            "- Databases: MySQL\n"
            "- AI / Machine Learning: Machine Learning, Deep Learning, CNN, Random Forest, TensorFlow, Keras, Scikit-learn\n"
            "- Tools: Git, GitHub, VS Code, Jupyter Notebook"
        )
    },
    {
        "id": "achievements",
        "title": "Certifications & Achievements",
        "text": (
            "CERTIFICATIONS & ACHIEVEMENTS:\n"
            "- IndiaAI Mission Fellowship: Autonomous Waiter Robot for Hotel Food Service recognized under IndiaAI Mission, MeitY, Govt of India, with project funding.\n"
            "- AI Bot Hackathon – Coding Blocks, 2024\n"
            "- Machine Learning Internship – Technook, 2024"
        )
    }
]

def cosine_similarity(a: List[float], b: List[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(x * x for x in b))
    return dot / (norm_a * norm_b) if norm_a and norm_b else 0.0

def get_embedding(text: str, input_type: str = "passage") -> List[float]:
    response = client.embeddings.create(
        input=[text],
        model=EMBED_MODEL,
        encoding_format="float",
        extra_body={"input_type": input_type, "truncate": "END"}
    )
    return response.data[0].embedding

def ask_resume(query: str) -> Dict[str, Any]:
    print(f"\n[QUERY]: {query}")
    print("[1] Generating query embedding via nvidia/nemotron-3.5-embed-1b...")
    
    query_vec = get_embedding(query, input_type="query")
    
    # Compute similarity against resume chunks
    scored_chunks = []
    for chunk in RESUME_CHUNKS:
        chunk_vec = get_embedding(chunk["text"], input_type="passage")
        sim = cosine_similarity(query_vec, chunk_vec)
        scored_chunks.append((sim, chunk))
    
    scored_chunks.sort(key=lambda x: x[0], reverse=True)
    top_chunks = scored_chunks[:3]
    
    context = "\n\n---\n\n".join([f"[{c['title']}]\n{c['text']}" for _, c in top_chunks])
    
    system_prompt = (
        "You are the verified AI Resume Assistant for Potthalam Mounika.\n"
        "Answer user questions STRICTLY and ONLY based on the facts provided in the resume context below.\n"
        "If the question asks about something not present in her resume, reply:\n"
        "'I can only answer questions based on the information provided in Potthalam Mounika's resume. This specific detail is not found in her resume.'\n"
        "Do not invent or guess details.\n\n"
        f"RESUME CONTEXT:\n{context}"
    )
    
    print("[2] Invoking LLM nvidia/nemotron-3.5-lightning-30b-a3b with enable_thinking=True...")
    stream = client.chat.completions.create(
        model=LLM_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query}
        ],
        temperature=0.2,
        top_p=0.95,
        max_tokens=4096,
        stream=True,
        chat_template_kwargs={"enable_thinking": True}
    )
    
    answer_text = ""
    reasoning_text = ""
    
    for chunk in stream:
        delta = chunk.choices[0].delta
        if hasattr(delta, "reasoning_content") and delta.reasoning_content:
            reasoning_text += delta.reasoning_content
            print(delta.reasoning_content, end="", flush=True)
        if delta.content:
            answer_text += delta.content
            print(delta.content, end="", flush=True)
            
    print("\n")
    return {
        "query": query,
        "answer": answer_text,
        "reasoning": reasoning_text,
        "sources": [c["title"] for _, c in top_chunks]
    }

if __name__ == "__main__":
    test_queries = [
        "What are Potthalam Mounika's key AI and Machine Learning projects?",
        "Tell me about her educational background and CGPA.",
        "What was the IndiaAI Mission Fellowship she received?"
    ]
    for q in test_queries:
        ask_resume(q)
