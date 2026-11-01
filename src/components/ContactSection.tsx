import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Send, 
  Copy, 
  Check, 
  Linkedin, 
  Github, 
  Code2, 
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleInterest: 'AI Engineer',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Construct mailto link as fallback/direct send
    const subject = encodeURIComponent(`[Portfolio Inquiry - ${formData.roleInterest}] from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Potthalam Mounika,\n\nName: ${formData.name}\nEmail: ${formData.email}\nTarget Role / Interest: ${formData.roleInterest}\n\nMessage:\n${formData.message}\n`
    );
    
    // Open user's email client
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <MessageSquare className="w-4 h-4" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl">
            Currently interviewing for <strong className="text-white">AI Engineer</strong> and <strong className="text-white">Machine Learning Researcher</strong> positions. Let's discuss how my skills align with your engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Direct Contact & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyan-950/60 border border-cyan-800/40 rounded-xl text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Email</div>
                    <div className="text-sm font-semibold text-white break-all">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                  title="Copy email address"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500">Fastest response route</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Compose Email &rarr;
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyan-950/60 border border-cyan-800/40 rounded-xl text-cyan-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Phone</div>
                    <div className="text-sm font-semibold text-white">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                  title="Copy phone number"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500">Available for calls & WhatsApp</span>
                <a
                  href={`tel:${PERSONAL_INFO.rawPhone}`}
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Dial Now &rarr;
                </a>
              </div>
            </div>

            {/* Social Media Profiles */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified Social & Coding Profiles
              </div>

              <div className="space-y-2">
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all text-xs font-medium text-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all text-xs font-medium text-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-slate-200" />
                    <span>GitHub Repositories</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.hackerrank}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all text-xs font-medium text-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span>HackerRank Competitions</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

          </div>

          {/* Column 2: Working Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill in the details below to dispatch an inquiry directly to Potthalam Mounika's inbox.
              </p>

              {submitted ? (
                <div className="p-6 bg-slate-950/80 border border-emerald-500/30 rounded-xl space-y-3 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Message Ready to Send!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Your email client has been opened with pre-filled details. If your client didn't launch automatically, click below to send directly:
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-2">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(`Inquiry from ${formData.name}`)}&body=${encodeURIComponent(formData.message)}`}
                      className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                    >
                      Open Email Again
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-slate-300">
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-slate-300">
                        Your Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="priya@company.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Target Role Selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="role" className="text-xs font-medium text-slate-300">
                      Opportunity Type / Position
                    </label>
                    <select
                      id="role"
                      value={formData.roleInterest}
                      onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    >
                      <option value="AI Engineer">AI Engineer Position</option>
                      <option value="Machine Learning Researcher">Machine Learning Researcher</option>
                      <option value="Generative AI Developer">Generative AI / LLM Developer</option>
                      <option value="Research Collaboration">Academic / Research Collaboration</option>
                      <option value="General Inquiry">General Technical Discussion</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-slate-300">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Mounika, we came across your work in deep learning and autonomous robotics..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/10"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Mounika</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
