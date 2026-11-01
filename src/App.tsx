import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeSection } from './components/ResumeSection';
import { ProjectGallery } from './components/ProjectGallery';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PdfModal } from './components/PdfModal';
import { RagChatModal } from './components/RagChatModal';

export default function App() {
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200 relative">
      {/* Navigation */}
      <Navbar 
        onOpenPdf={() => setPdfModalOpen(true)} 
        onOpenChat={() => setChatModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Personal Details & Key Credentials Hero */}
        <Hero 
          onOpenPdf={() => setPdfModalOpen(true)} 
          onOpenChat={() => setChatModalOpen(true)}
        />

        {/* Dedicated Simple ATS Resume Section */}
        <ResumeSection onOpenPdf={() => setPdfModalOpen(true)} />

        {/* Project Gallery */}
        <ProjectGallery />

        {/* Contact Form & Social Media Links */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button for Nemotron Resume RAG */}
      <div className="fixed bottom-6 right-6 z-30 no-print">
        <button
          onClick={() => setChatModalOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
          aria-label="Ask Resume RAG Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-slate-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950 animate-pulse" />
          </div>
          <span className="hidden sm:inline">Ask Resume AI (RAG)</span>
          <span className="sm:hidden">Ask AI</span>
        </button>
      </div>

      {/* Embedded Original Resume PDF Modal */}
      <PdfModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
      />

      {/* Nemotron RAG Chatbot Modal */}
      <RagChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
      />
    </div>
  );
}
