import React, { useState } from 'react';
import { Menu, X, FileText, Bot } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenPdf: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPdf, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Resume', href: '#resume' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills & Education', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a 
          href="#" 
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
        >
          {PERSONAL_INFO.name}
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-2 text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Ask AI questions about Potthalam Mounika's resume using Nemotron RAG"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ask AI (Nemotron RAG)</span>
          </button>

          <button
            onClick={onOpenPdf}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/70 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="View Original Resume PDF"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Original PDF</span>
          </button>

          <a
            href="#contact"
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenChat}
            className="p-2 text-cyan-400 hover:text-white bg-cyan-950/60 border border-cyan-800/50 rounded-lg"
            aria-label="Open Resume RAG AI"
          >
            <Bot className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenPdf}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
            aria-label="View Resume PDF"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-cyan-400 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 rounded-lg"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Ask Resume AI (Nemotron RAG)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPdf();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-lg"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Original PDF</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-lg"
            >
              <span>Contact Directly</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
