import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  ArrowRight, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Award, 
  GraduationCap, 
  BrainCircuit,
  Linkedin,
  Github,
  Code2,
  Bot
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenPdf: () => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPdf, onOpenChat }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-18 md:pb-24 overflow-hidden">
      {/* Atmosphere styling */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-400">
              <span>Applying for AI Roles</span>
              <span aria-hidden="true">·</span>
              <span className="text-white font-semibold">AI Engineer</span>
              <span aria-hidden="true">·</span>
              <span className="text-white font-semibold">Machine Learning Researcher</span>
            </div>

            {/* Name & Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-base sm:text-lg font-medium text-cyan-300">
                Generative AI Trainee — Python — Java — Machine Learning — LLMs
              </p>
            </div>

            {/* Resume Summary */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {PERSONAL_INFO.summary}
            </p>

            {/* Contact details bar with 1-click copy */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="group flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-850 hover:text-white border border-slate-800 rounded-lg transition-all"
                title="Click to copy email"
              >
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{PERSONAL_INFO.email}</span>
                {copiedType === 'email' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 ml-1 transition-colors" />
                )}
              </button>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="group flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-850 hover:text-white border border-slate-800 rounded-lg transition-all"
                title="Click to copy phone number"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
                {copiedType === 'phone' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 ml-1 transition-colors" />
                )}
              </button>

              {/* Social Media Links */}
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.hackerrank}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
                  title="HackerRank Profile"
                  aria-label="HackerRank Profile"
                >
                  <Code2 className="w-4 h-4 text-emerald-400" />
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/10"
              >
                <Bot className="w-4 h-4" />
                <span>Ask Resume AI (RAG)</span>
              </button>

              <a
                href="#resume"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View ATS Resume</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <span>Browse Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenPdf}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Original PDF</span>
              </button>
            </div>
          </div>

          {/* Key Qualifications Sidebar Card */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Academic & Project Highlights</span>
                <span className="text-[10px] font-mono text-emerald-400">RAG-Indexed</span>
              </div>

              {/* Fellowship */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>IndiaAI Mission Fellowship</span>
                </div>
                <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                  NavBot Hotel Service Robot recognized & funded under MeitY, Government of India.
                </p>
              </div>

              {/* Education */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>B.Tech in CSE (AIML)</span>
                </div>
                <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                  Kalasalingam Academy · <strong className="text-slate-200">CGPA: 9.01 / 10</strong> (2022–2026)
                </p>
              </div>

              {/* Current Role */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <BrainCircuit className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Generative AI Trainee</span>
                </div>
                <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                  Eduleem (2026–Present) · LLMs, NLP & Python AI application development.
                </p>
              </div>

              {/* Scores Strip */}
              <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-bold font-mono text-white">9.01</div>
                  <div className="text-[10px] text-slate-500">B.Tech CGPA</div>
                </div>
                <div>
                  <div className="text-sm font-bold font-mono text-cyan-400">96.3%</div>
                  <div className="text-[10px] text-slate-500">Class XII</div>
                </div>
                <div>
                  <div className="text-sm font-bold font-mono text-emerald-400">94.3%</div>
                  <div className="text-[10px] text-slate-500">Class X</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
