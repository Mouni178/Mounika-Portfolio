export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'vision' | 'ml' | 'robotics';
  categoryLabel: string;
  technologies: string[];
  metric: string;
  metricLabel: string;
  summary: string;
  bulletPoints: string[];
  recognition?: string;
}

export const PERSONAL_INFO = {
  name: "Potthalam Mounika",
  preferredTitle: "AI Engineer & Machine Learning Researcher",
  subtitle: "Generative AI Trainee · B.Tech in CSE (AIML) · CGPA: 9.01/10",
  phone: "+91-6300636367",
  rawPhone: "6300636367",
  email: "potthalammounika17@gmail.com",
  location: "India",
  resumePdfUrl: "/assets/aistudio/Potthalam__Mounika_0dbfc353.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/potthalam-mounika",
    github: "https://github.com/potthalammounika",
    hackerrank: "https://www.hackerrank.com/potthalammounika17",
  },
  summary: "Computer Science Engineering graduate with a strong foundation in Python, Java, SQL, Data Structures, and Machine Learning. Experienced in developing machine learning projects and currently pursuing hands-on training in Generative AI, Large Language Models (LLMs), and NLP. A quick learner with a problem-solving mindset, eager to apply technical knowledge to build innovative software solutions and grow as an AI Engineer and Machine Learning Researcher.",
  tailoredObjectives: {
    all: "Applying for AI Engineer and Machine Learning Researcher positions to leverage technical skills in deep learning, Generative AI, and autonomous systems.",
    aiEngineer: "Targeting AI Engineer roles: Applying hands-on experience in Generative AI, LLMs, NLP, Python application development, and embedded robotics (A* pathfinding) to build robust, scalable AI software solutions.",
    mlResearcher: "Targeting Machine Learning Researcher roles: Leveraging deep learning architectures (CNNs for plant pathology), supervised/unsupervised ensemble learning (Random Forest with 90%+ accuracy), and statistical evaluation to advance applied ML research."
  }
};

export const PROJECTS: Project[] = [
  {
    id: "plant-disease-detection",
    title: "AI-Powered Plant Disease Detection",
    subtitle: "Deep Convolutional Neural Network for Foliar Pathology Diagnosis",
    category: "vision",
    categoryLabel: "Computer Vision & Deep Learning",
    technologies: ["Python", "TensorFlow", "Keras", "CNN"],
    metric: "85%",
    metricLabel: "Classification Accuracy",
    summary: "Developed a deep learning model using Convolutional Neural Networks (CNN) to identify plant diseases from leaf images, achieving approximately 85% classification accuracy on a public dataset to support early plant disease detection and help reduce potential crop loss.",
    bulletPoints: [
      "Developed a deep learning model using Convolutional Neural Networks (CNN) to identify plant diseases from leaf images.",
      "Trained and evaluated the model on a public dataset, achieving approximately 85% classification accuracy.",
      "Designed the solution to support early plant disease detection and help reduce potential crop loss."
    ]
  },
  {
    id: "forest-fire-detection",
    title: "Forest Fire Detection",
    subtitle: "Predictive Machine Learning for Wildfire Risk Assessment",
    category: "ml",
    categoryLabel: "Machine Learning & Analytics",
    technologies: ["Python", "Scikit-learn", "Pandas", "Random Forest"],
    metric: "> 90%",
    metricLabel: "Dataset Accuracy",
    summary: "Developed a machine learning model using Random Forest to predict forest fire risk based on environmental conditions, using temperature, humidity, and wind speed features to classify high-risk conditions with over 90% accuracy.",
    bulletPoints: [
      "Developed a machine learning model using Random Forest to predict forest fire risk based on environmental conditions.",
      "Used temperature, humidity, and wind speed features to classify high-risk conditions.",
      "Achieved over 90% accuracy on the available dataset."
    ]
  },
  {
    id: "navbot-robotics",
    title: "NavBot – Autonomous Waiter Robot for Hotel Food Service",
    subtitle: "Hardware & Algorithmic Obstacle-Avoiding Food Delivery Robot",
    category: "robotics",
    categoryLabel: "Robotics & Embedded AI",
    technologies: ["Arduino", "C++", "Raspberry Pi", "A* Algorithm"],
    metric: "Funded",
    metricLabel: "IndiaAI Mission Fellowship",
    recognition: "IndiaAI Mission Fellowship: Autonomous Waiter Robot for Hotel Food Service project recognized under the IndiaAI Mission, Ministry of Electronics and Information Technology (MeitY), Government of India, with project funding.",
    summary: "Developed an autonomous waiter robot with ultrasonic sensor-based obstacle detection and distance measurement for hotel food service, integrating Arduino, Raspberry Pi, and motor control components with the A* pathfinding algorithm for efficient obstacle-avoiding navigation.",
    bulletPoints: [
      "Developed an autonomous waiter robot with ultrasonic sensor-based obstacle detection and distance measurement for hotel food service.",
      "Integrated Arduino, Raspberry Pi, and motor control components; applied the A* pathfinding algorithm for efficient obstacle-avoiding navigation.",
      "Project recognized and funded under the prestigious IndiaAI Mission by the Ministry of Electronics and Information Technology (MeitY), Government of India."
    ]
  }
];

export const EXPERIENCE = [
  {
    role: "Generative AI Trainee",
    company: "Eduleem",
    period: "2026 – Present",
    location: "Active Traineeship",
    highlights: [
      "Training in Generative AI, LLMs, NLP and Python-based AI application development.",
      "Exploring data processing, modern Generative AI workflows, and practical LLM-based solutions."
    ]
  },
  {
    role: "Machine Learning Intern",
    company: "Technook",
    period: "Mar 2024 – Apr 2024",
    location: "Remote",
    highlights: [
      "Developed supervised and unsupervised machine learning models using Python.",
      "Performed data preprocessing and feature engineering using Pandas and NumPy.",
      "Evaluated machine learning models and experimented with different approaches to improve performance."
    ]
  }
];

export const EDUCATION = [
  {
    degree: "B.Tech in Computer Science Engineering (AIML)",
    institution: "Kalasalingam Academy of Research and Education",
    period: "2022 – 2026",
    grade: "CGPA: 9.01/10"
  },
  {
    degree: "Intermediate (XII)",
    institution: "Sri Chaitanya Junior College",
    period: "2020 – 2022",
    grade: "Percentage: 96.3%"
  },
  {
    degree: "SSC (X)",
    institution: "Vignan High School",
    period: "2019 – 2020",
    grade: "Percentage: 94.33%"
  }
];

export const TECHNICAL_SKILLS = [
  {
    category: "Programming",
    items: "Python, Java, SQL"
  },
  {
    category: "Generative AI",
    items: "Generative AI, LLMs, NLP"
  },
  {
    category: "Python Libraries",
    items: "Pandas, NumPy"
  },
  {
    category: "CS Fundamentals",
    items: "Data Structures and Algorithms, OOP, DBMS, Computer Networks, Operating Systems"
  },
  {
    category: "Databases",
    items: "MySQL"
  },
  {
    category: "AI / Machine Learning",
    items: "Machine Learning, Deep Learning, CNN, Random Forest, TensorFlow, Keras, Scikit-learn"
  },
  {
    category: "Tools",
    items: "Git, GitHub, VS Code, Jupyter Notebook"
  }
];

export const CERTIFICATIONS_ACHIEVEMENTS = [
  {
    title: "IndiaAI Mission Fellowship",
    description: "Autonomous Waiter Robot for Hotel Food Service project recognized under the IndiaAI Mission, Ministry of Electronics and Information Technology (MeitY), Government of India, with project funding."
  },
  {
    title: "AI Bot Hackathon – Coding Blocks, 2024",
    description: "Participated and competed in building intelligent bot solutions."
  },
  {
    title: "Machine Learning Internship – Technook, 2024",
    description: "Completed hands-on machine learning engineering internship."
  }
];
