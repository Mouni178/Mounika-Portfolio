import React, { useState } from 'react';
import { ArrowUpRight, Award, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const ProjectGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-slate-900 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <span>APPLIED AI & MACHINE LEARNING PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Project Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Practical implementations across Deep Learning (CNNs), Ensemble Machine Learning (Random Forest), and Autonomous Robotics (A* Pathfinding).
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => {
            const isFellowship = project.recognition !== undefined;

            return (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-200"
              >
                <div className="space-y-4">
                  {/* Category & Metric */}
                  <div className="flex items-start justify-between gap-3 text-xs">
                    <span className="text-slate-400 font-medium">
                      {project.categoryLabel}
                    </span>
                    <div className="text-right">
                      <span className="font-mono font-bold text-cyan-300">
                        {project.metric}
                      </span>
                    </div>
                  </div>

                  {/* Recognition highlight */}
                  {isFellowship && (
                    <div className="flex items-center gap-2 p-2 bg-amber-950/20 border border-amber-500/20 rounded-lg text-[11px] text-amber-300 font-medium">
                      <Award className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                      <span>MeitY IndiaAI Project Funding</span>
                    </div>
                  )}

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 pt-2 border-t border-slate-800/80 list-disc pl-4 text-xs text-slate-400 leading-relaxed">
                    {project.bulletPoints.map((bp, idx) => (
                      <li key={idx}>{bp}</li>
                    ))}
                  </ul>
                </div>

                {/* Footer: Tech Stack */}
                <div className="pt-5 mt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono text-slate-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl transition-all"
                  >
                    <span>View Project Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
