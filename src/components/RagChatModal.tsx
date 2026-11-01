import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  RotateCcw, 
  Check, 
  AlertCircle,
  Cpu,
  BrainCircuit
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  reasoning?: string;
  sources?: {
    id: string;
    section: string;
    title: string;
    similarity: number;
    text: string;
  }[];
  timestamp: string;
  isStreaming?: boolean;
}

interface RagChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUERIES = [
  "What are Mounika's flagship AI and ML projects?",
  "Tell me about the IndiaAI Mission Fellowship she received.",
  "What are her skills in Generative AI and LLMs?",
  "What is her educational background and CGPA?",
  "What was her role at Eduleem and Technook?"
];

export const RagChatModal: React.FC<RagChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am Potthalam Mounika's AI Resume Assistant, powered by NVIDIA Nemotron RAG. I answer questions strictly and solely based on her verified resume. How can I help you evaluate her for AI Engineer or Machine Learning Researcher positions?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedReasoning, setExpandedReasoning] = useState<Record<string, boolean>>({});
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSend = async (queryText?: string) => {
    const query = queryText || input;
    if (!query.trim() || loading) return;

    const userMsgId = Date.now().toString();
    const newUserMsg: Message = {
      id: userMsgId,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() })
      });

      const data = await response.json();

      if (data.success && data.data) {
        const result = data.data;
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: result.answer,
          reasoning: result.reasoning,
          sources: result.retrievedChunks,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error(data.error || 'Failed to fetch response');
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      // Fallback message
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `Based strictly on Potthalam Mounika's resume, she is a Computer Science Engineering graduate (AIML, Kalasalingam Academy, 9.01 CGPA) with hands-on experience in Generative AI (Eduleem), ML (Technook), and the MeitY-funded NavBot robot.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const toggleReasoning = (id: string) => {
    setExpandedReasoning(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSources = (id: string) => {
    setExpandedSources(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: `Chat reset. Ask me anything directly from Potthalam Mounika's resume!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl h-[85vh] sm:h-[750px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  Resume RAG Assistant
                </h3>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                  NVIDIA Nemotron
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Grounding answers strictly from Potthalam Mounika's resume
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={clearChat}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pipeline Info Banner */}
        <div className="px-5 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
            <span>LLM: nemotron-3.5-lightning-30b</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Embeddings: nemotron-3.5-embed-1b</span>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-950/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                }`}
              >
                {/* Message Text with markdown line support */}
                <div className="whitespace-pre-line">
                  {msg.text}
                </div>

                {/* Collapsible Reasoning Process from Nemotron */}
                {msg.reasoning && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800 text-slate-400">
                    <button
                      onClick={() => toggleReasoning(msg.id)}
                      className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{expandedReasoning[msg.id] ? 'Hide Nemotron Thinking' : 'View Nemotron Thinking Process'}</span>
                      {expandedReasoning[msg.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {expandedReasoning[msg.id] && (
                      <div className="mt-2 p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-300 leading-normal max-h-40 overflow-y-auto">
                        {msg.reasoning}
                      </div>
                    )}
                  </div>
                )}

                {/* Collapsible Retrieved Knowledge Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800 text-slate-400">
                    <button
                      onClick={() => toggleSources(msg.id)}
                      className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <FileText className="w-3 h-3 text-emerald-400" />
                      <span>{expandedSources[msg.id] ? 'Hide Resume Sources' : `Grounded on ${msg.sources.length} Resume Sections`}</span>
                      {expandedSources[msg.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {expandedSources[msg.id] && (
                      <div className="mt-2 space-y-1.5">
                        {msg.sources.map((src, sIdx) => (
                          <div key={sIdx} className="p-2 bg-slate-950/60 border border-slate-800 rounded text-[11px]">
                            <div className="font-semibold text-white flex justify-between">
                              <span>{src.title}</span>
                              <span className="text-cyan-400 font-mono">Similarity: {src.similarity}</span>
                            </div>
                            <p className="text-slate-400 text-[10px] mt-1 line-clamp-2">
                              {src.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <span className="text-[10px] text-slate-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-2">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Nemotron RAG is retrieving resume vectors & generating answer...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-950/90 border-t border-slate-800/80 overflow-x-auto flex items-center gap-1.5 text-xs">
          <span className="text-[11px] text-slate-500 whitespace-nowrap mr-1">Ask:</span>
          {SUGGESTED_QUERIES.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleSend(sq)}
              disabled={loading}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors shrink-0 disabled:opacity-50"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Mounika's resume, skills, or projects..."
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl font-semibold text-xs sm:text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="text-[10px] text-center text-slate-500 mt-2">
            Answers are strictly constrained to facts in Potthalam Mounika's resume.
          </div>
        </div>
      </div>
    </div>
  );
};
