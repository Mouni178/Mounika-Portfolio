export interface ResumeChunk {
  id: string;
  section: string;
  title: string;
  text: string;
  metadata: {
    category: 'education' | 'experience' | 'project' | 'skills' | 'achievements' | 'summary';
    keywords: string[];
  };
}

export const RESUME_CHUNKS: ResumeChunk[] = [
  {
    id: "summary-1",
    section: "Professional Summary",
    title: "Potthalam Mounika — Core Profile & AI Focus",
    text: `POTTHALAM MOUNIKA. Generative AI Trainee — Python — Java — Machine Learning — LLMs. Phone: +91-6300636367 (or 6300636367). Email: potthalammounika17@gmail.com. Profiles: LinkedIn, GitHub, HackerRank.
SUMMARY: Computer Science Engineering graduate with a strong foundation in Python, Java, SQL, Data Structures, and Machine Learning. Experienced in developing machine learning projects and currently pursuing hands-on training in Generative AI, Large Language Models (LLMs), and NLP. A quick learner with a problem-solving mindset, eager to apply technical knowledge to build innovative software solutions and grow as a Software Engineer, AI Engineer, and Machine Learning Researcher.`,
    metadata: {
      category: "summary",
      keywords: ["name", "email", "phone", "contact", "summary", "mounika", "potthalam", "ai engineer", "machine learning researcher"]
    }
  },
  {
    id: "edu-1",
    section: "Education",
    title: "Education — B.Tech, Intermediate & SSC",
    text: `EDUCATION DETAILS:
1. Kalasalingam Academy of Research and Education (2022 – 2026):
   - Degree: B.Tech in Computer Science Engineering (AIML)
   - Academic Score / CGPA: 9.01 / 10
2. Sri Chaitanya Junior College (2020 – 2022):
   - Level: Intermediate (Class XII)
   - Academic Score: 96.3%
3. Vignan High School (2019 – 2020):
   - Level: Secondary School Certificate (SSC / Class X)
   - Academic Score: 94.33%`,
    metadata: {
      category: "education",
      keywords: ["education", "college", "university", "school", "btech", "cgpa", "percentage", "kalasalingam", "sri chaitanya", "vignan", "aiml"]
    }
  },
  {
    id: "exp-1",
    section: "Experience",
    title: "Generative AI Trainee — Eduleem",
    text: `EXPERIENCE 1: Generative AI Trainee at Eduleem (2026 – Present):
- Hands-on training in Generative AI, Large Language Models (LLMs), Natural Language Processing (NLP), and Python-based AI application development.
- Exploring data processing, modern Generative AI workflows, and practical LLM-based solutions.`,
    metadata: {
      category: "experience",
      keywords: ["eduleem", "generative ai", "trainee", "llms", "nlp", "python", "experience", "current job", "work"]
    }
  },
  {
    id: "exp-2",
    section: "Experience",
    title: "Machine Learning Intern — Technook",
    text: `EXPERIENCE 2: Machine Learning Intern at Technook (Mar 2024 – Apr 2024, Remote):
- Developed supervised and unsupervised machine learning models using Python.
- Performed data preprocessing and feature engineering using Pandas and NumPy.
- Evaluated machine learning models and experimented with different approaches to improve performance.`,
    metadata: {
      category: "experience",
      keywords: ["technook", "internship", "intern", "machine learning", "pandas", "numpy", "supervised", "unsupervised", "feature engineering"]
    }
  },
  {
    id: "proj-1",
    section: "Projects",
    title: "Project: AI-Powered Plant Disease Detection",
    text: `PROJECT 1: AI-Powered Plant Disease Detection
Technologies: Python, TensorFlow, Keras, Convolutional Neural Networks (CNN)
Key Details:
- Developed a deep learning model using Convolutional Neural Networks (CNN) to identify plant diseases from leaf images.
- Trained and evaluated the model on a public dataset, achieving approximately 85% classification accuracy.
- Designed the solution to support early plant disease detection and help reduce potential crop loss.`,
    metadata: {
      category: "project",
      keywords: ["plant disease", "leaf", "cnn", "convolutional neural network", "tensorflow", "keras", "accuracy", "85%", "computer vision", "deep learning"]
    }
  },
  {
    id: "proj-2",
    section: "Projects",
    title: "Project: Forest Fire Detection",
    text: `PROJECT 2: Forest Fire Detection
Technologies: Python, Scikit-learn, Pandas, Random Forest
Key Details:
- Developed a machine learning model using Random Forest to predict forest fire risk based on environmental conditions.
- Used temperature, humidity, and wind speed features to classify high-risk conditions.
- Achieved over 90% accuracy on the available dataset.`,
    metadata: {
      category: "project",
      keywords: ["forest fire", "wildfire", "random forest", "scikit-learn", "pandas", "90%", "accuracy", "machine learning", "temperature", "humidity"]
    }
  },
  {
    id: "proj-3",
    section: "Projects",
    title: "Project: NavBot – Autonomous Waiter Robot for Hotel Food Service",
    text: `PROJECT 3: NavBot – Autonomous Waiter Robot for Hotel Food Service
Technologies: Arduino, C++, Raspberry Pi, A* Algorithm, Ultrasonic Sensors
Key Details:
- Developed an autonomous waiter robot with ultrasonic sensor-based obstacle detection and distance measurement for hotel food service.
- Integrated Arduino, Raspberry Pi, and motor control components; applied the A* pathfinding algorithm for efficient obstacle-avoiding navigation.
- Recognition & Funding: IndiaAI Mission Fellowship — Autonomous Waiter Robot for Hotel Food Service project recognized under the IndiaAI Mission, Ministry of Electronics and Information Technology (MeitY), Government of India, with project funding.`,
    metadata: {
      category: "project",
      keywords: ["navbot", "robot", "waiter robot", "arduino", "raspberry pi", "c++", "a* algorithm", "pathfinding", "obstacle detection", "ultrasonic", "meity", "indiaai"]
    }
  },
  {
    id: "skills-1",
    section: "Technical Skills",
    title: "Technical Skills Matrix",
    text: `TECHNICAL SKILLS:
- Programming: Python, Java, SQL
- Generative AI: Generative AI, LLMs, NLP
- Python Libraries: Pandas, NumPy
- CS Fundamentals: Data Structures and Algorithms, Object-Oriented Programming (OOP), DBMS, Computer Networks, Operating Systems
- Databases: MySQL
- AI / Machine Learning: Machine Learning, Deep Learning, CNN, Random Forest, TensorFlow, Keras, Scikit-learn
- Tools: Git, GitHub, VS Code, Jupyter Notebook`,
    metadata: {
      category: "skills",
      keywords: ["skills", "programming", "python", "java", "sql", "git", "mysql", "data structures", "algorithms", "oop", "dbms", "operating systems"]
    }
  },
  {
    id: "achieve-1",
    section: "Certifications & Achievements",
    title: "Certifications & Achievements",
    text: `CERTIFICATIONS & ACHIEVEMENTS:
1. IndiaAI Mission Fellowship: Autonomous Waiter Robot for Hotel Food Service project recognized under the IndiaAI Mission, Ministry of Electronics and Information Technology (MeitY), Government of India, with project funding.
2. AI Bot Hackathon – Coding Blocks, 2024
3. Machine Learning Internship – Technook, 2024`,
    metadata: {
      category: "achievements",
      keywords: ["achievements", "certifications", "indiaai", "fellowship", "hackathon", "coding blocks", "technook", "award", "meity"]
    }
  }
];

export const FULL_RESUME_TEXT = RESUME_CHUNKS.map(c => `[${c.section.toUpperCase()}] ${c.title}\n${c.text}`).join("\n\n");
