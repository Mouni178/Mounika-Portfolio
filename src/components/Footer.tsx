import React from 'react';
import { ArrowUp, Mail, Phone, Linkedin, Github, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 no-print">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-900">
          
          {/* Brand info */}
          <div className="space-y-1">
            <a href="#" className="text-lg font-bold text-white hover:text-cyan-400 transition-colors">
              {PERSONAL_INFO.name}
            </a>
            <p className="text-xs text-slate-400">
              AI Engineer · Machine Learning Researcher · Generative AI Trainee
            </p>
          </div>

          {/* Social connections */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              title="Email"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${PERSONAL_INFO.rawPhone}`}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              title="Phone"
              aria-label="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              title="GitHub"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.hackerrank}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              title="HackerRank"
              aria-label="HackerRank"
            >
              <Code2 className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors ml-2"
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All verified details reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Kalasalingam Academy of Research and Education</span>
            <span aria-hidden="true">·</span>
            <span>AIML</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
