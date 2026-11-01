import React, { useEffect } from 'react';
import { X, Download, ExternalLink, FileText, Printer } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-950/60 border border-cyan-800/40 rounded-lg text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Potthalam Mounika — Original Resume
              </h3>
              <p className="text-xs text-slate-400">
                Official Curriculum Vitae (PDF Document)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Potthalam_Mounika_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Download</span>
            </a>
            
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close PDF viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF iframe */}
        <div className="flex-1 w-full bg-slate-950 relative">
          <iframe
            src={`${PERSONAL_INFO.resumePdfUrl}#toolbar=1&navpanes=0`}
            title="Potthalam Mounika Resume PDF"
            className="w-full h-full border-0"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Targeting: AI Engineer · Machine Learning Researcher</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Clean Format</span>
          </button>
        </div>
      </div>
    </div>
  );
};
