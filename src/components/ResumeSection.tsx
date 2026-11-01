import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Download, 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  Award,
  Layers,
  Linkedin,
  Github,
  Code2
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  EDUCATION, 
  EXPERIENCE, 
  PROJECTS, 
  TECHNICAL_SKILLS, 
  CERTIFICATIONS_ACHIEVEMENTS 
} from '../data/portfolioData';

interface ResumeSectionProps {
  onOpenPdf: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenPdf }) => {
  const [roleFocus, setRoleFocus] = useState<'all' | 'aiEngineer' | 'mlResearcher'>('all');
  const [copiedText, setCopiedText] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const generatePlainTextResume = () => {
    return `POTTHALAM MOUNIKA
Generative AI Trainee — Python — Java — Machine Learning — LLMs
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.socials.linkedin}
GitHub: ${PERSONAL_INFO.socials.github}
HackerRank: ${PERSONAL_INFO.socials.hackerrank}

SUMMARY
${PERSONAL_INFO.summary}

EDUCATION
* Kalasalingam Academy of Research and Education (2022 – 2026)
  B.Tech in Computer Science Engineering (AIML) | CGPA: 9.01/10
* Sri Chaitanya Junior College (2020 – 2022)
  Intermediate (XII) | Percentage: 96.3%
* Vignan High School (2019 – 2020)
  SSC (X) | Percentage: 94.33%

EXPERIENCE
* Generative AI Trainee – Eduleem (2026 – Present)
  - Training in Generative AI, LLMs, NLP and Python-based AI application development.
  - Exploring data processing, modern Generative AI workflows, and practical LLM-based solutions.
* Machine Learning Intern – Technook (Mar 2024 – Apr 2024, Remote)
  - Developed supervised and unsupervised machine learning models using Python.
  - Performed data preprocessing and feature engineering using Pandas and NumPy.
  - Evaluated machine learning models and experimented with different approaches to improve performance.

PROJECTS
* AI-Powered Plant Disease Detection (Python, TensorFlow, Keras, CNN)
  - Developed a deep learning model using Convolutional Neural Networks (CNN) to identify plant diseases from leaf images.
  - Trained and evaluated the model on a public dataset, achieving approximately 85% classification accuracy.
  - Designed the solution to support early plant disease detection and help reduce potential crop loss.

* Forest Fire Detection (Python, Scikit-learn, Pandas, Random Forest)
  - Developed a machine learning model using Random Forest to predict forest fire risk based on environmental conditions.
  - Used temperature, humidity, and wind speed features to classify high-risk conditions.
  - Achieved over 90% accuracy on the available dataset.

* NavBot – Autonomous Waiter Robot for Hotel Food Service (Arduino, C++, Raspberry Pi, A* Algorithm)
  - Developed an autonomous waiter robot with ultrasonic sensor-based obstacle detection and distance measurement for hotel food service.
  - Integrated Arduino, Raspberry Pi, and motor control components; applied the A* pathfinding algorithm for efficient obstacle-avoiding navigation.

TECHNICAL SKILLS
- Programming: Python, Java, SQL
- Generative AI: Generative AI, LLMs, NLP
- Python Libraries: Pandas, NumPy
- CS Fundamentals: Data Structures and Algorithms, OOP, DBMS, Computer Networks, Operating Systems
- Databases: MySQL
- AI / Machine Learning: Machine Learning, Deep Learning, CNN, Random Forest, TensorFlow, Keras, Scikit-learn
- Tools: Git, GitHub, VS Code, Jupyter Notebook

CERTIFICATIONS & ACHIEVEMENTS
- IndiaAI Mission Fellowship: Autonomous Waiter Robot for Hotel Food Service project recognized under the IndiaAI Mission, Ministry of Electronics and Information Technology (MeitY), Government of India, with project funding.
- AI Bot Hackathon – Coding Blocks, 2024
- Machine Learning Internship – Technook, 2024
`;
  };

  const copyPlainResume = () => {
    navigator.clipboard.writeText(generatePlainTextResume());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <section id="resume" className="py-16 md:py-24 border-t border-slate-900 bg-slate-950">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 no-print">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Curriculum Vitae
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Simple ATS resume tailored for AI Engineer & ML Researcher roles
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
              title="Print standard resume"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={copyPlainResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
              title="Copy plain text for online ATS forms"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy ATS Text</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Original PDF</span>
            </button>
          </div>
        </div>

        {/* Tailored Focus Switcher */}
        <div className="p-1 bg-slate-900/80 border border-slate-800 rounded-xl mb-6 flex flex-wrap items-center gap-1 text-xs no-print">
          <span className="text-slate-400 px-3 font-medium">Position Target:</span>
          <button
            onClick={() => setRoleFocus('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              roleFocus === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All AI Positions
          </button>
          <button
            onClick={() => setRoleFocus('aiEngineer')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              roleFocus === 'aiEngineer'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Engineer
          </button>
          <button
            onClick={() => setRoleFocus('mlResearcher')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              roleFocus === 'mlResearcher'
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Machine Learning Researcher
          </button>
        </div>

        {/* ATS Resume Sheet */}
        <div className="resume-card bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-7 text-slate-200">
          
          {/* Header */}
          <div className="text-center pb-5 border-b border-slate-800">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-cyan-300 mt-1">
              Generative AI Trainee — Python — Java — Machine Learning — LLMs
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-2">
              <span>{PERSONAL_INFO.phone}</span>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-300 hover:text-cyan-300">
                {PERSONAL_INFO.email}
              </a>
              <span aria-hidden="true">·</span>
              <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-cyan-300">
                LinkedIn
              </a>
              <span aria-hidden="true">·</span>
              <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-cyan-300">
                GitHub
              </a>
              <span aria-hidden="true">·</span>
              <a href={PERSONAL_INFO.socials.hackerrank} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-cyan-300">
                HackerRank
              </a>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {PERSONAL_INFO.summary}
            </p>
            {roleFocus !== 'all' && (
              <div className="text-xs text-cyan-300/90 font-medium pt-1 italic">
                Objective: {PERSONAL_INFO.tailoredObjectives[roleFocus]}
              </div>
            )}
          </div>

          {/* EDUCATION */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-white">{edu.institution}</span>
                    <div className="text-slate-300">{edu.degree}</div>
                  </div>
                  <div className="sm:text-right font-mono shrink-0">
                    <span className="text-slate-400 text-xs">{edu.period}</span>
                    <span className="text-cyan-300 font-semibold ml-3">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              EXPERIENCE
            </h2>
            <div className="space-y-4">
              {EXPERIENCE.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
                    <div className="font-bold text-white">
                      {exp.role} – <span className="font-semibold text-cyan-300">{exp.company}</span>
                      {exp.location && <span className="text-xs font-normal text-slate-400 ml-2">({exp.location})</span>}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {exp.period}
                    </div>
                  </div>
                  <ul className="space-y-1 pl-4 list-disc text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECTS */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs sm:text-sm">
                    <div className="font-bold text-white">
                      {proj.title}
                    </div>
                    <div className="text-xs font-mono text-cyan-300">
                      {proj.technologies.join(', ')}
                    </div>
                  </div>
                  <ul className="space-y-1 pl-4 list-disc text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {proj.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx}>{bp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* TECHNICAL SKILLS */}
          <div className="space-y-3" id="skills">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              {TECHNICAL_SKILLS.map((skill, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                  <div className="sm:col-span-3 font-semibold text-slate-300">
                    {skill.category}
                  </div>
                  <div className="sm:col-span-9 text-slate-400">
                    {skill.items}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CERTIFICATIONS & ACHIEVEMENTS */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              CERTIFICATIONS & ACHIEVEMENTS
            </h2>
            <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-300 leading-relaxed">
              {CERTIFICATIONS_ACHIEVEMENTS.map((item, idx) => (
                <li key={idx}>
                  <strong className="text-white">{item.title}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
