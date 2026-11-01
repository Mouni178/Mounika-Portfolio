import React, { useEffect } from 'react';
import { X, Award, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-10">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-300">{project.metricLabel}: {project.metric}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="text-sm text-slate-300">
            {project.subtitle}
          </p>
        </div>

        {/* MeitY Fellowship Recognition Spotlight if present */}
        {project.recognition && (
          <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
              <Award className="w-4 h-4" />
              <span>National Fellowship Recognition</span>
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {project.recognition}
            </p>
          </div>
        )}

        {/* Summary Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Project Overview
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Key Implementation Points */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Key Execution Details
          </h3>
          <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.bulletPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Technology Stack Tags */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="text-xs font-medium text-slate-400 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technologies & Tools:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
