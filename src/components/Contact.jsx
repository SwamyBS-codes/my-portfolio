import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Download, MessageSquare } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

const Contact = ({ openResumeModal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill out all required fields.');
      return;
    }
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:swamybs272@gmail.com?subject=${subject}&body=${body}`;
    setStatus('Opening your email client to send message to swamybs272@gmail.com.');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-gray-950/70 relative border-t border-gray-900/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect & Inquire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Have questions about my projects, interested in collaborating on distributed systems, or exploring engineering opportunities? Drop me a line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Info Side: cols 1-5 */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white mb-2">Direct Contact Information</h3>

              {/* Email */}
              <div className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-850 rounded-2xl group hover:border-gray-750 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-gray-500">EMAIL</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-gray-200">swamybs272@gmail.com</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('swamybs272@gmail.com', 'email')}
                  className="p-2 rounded-lg bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-850 rounded-2xl group hover:border-gray-750 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-gray-500">PHONE</span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-gray-200">+91 74114 76941</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('+917411476941', 'phone')}
                  className="p-2 rounded-lg bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-850 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <span className="block text-[11px] font-mono text-gray-500">LOCATION</span>
                  <span className="text-xs sm:text-sm font-semibold font-mono text-gray-200">Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Official Resume Quick Download Box */}
            <div className="p-4 rounded-2xl bg-gray-900/40 border border-gray-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-white block">Official Resume (PDF)</span>
                <span className="text-[11px] text-gray-400 font-mono">Updated November 2026 • 110 KB</span>
              </div>
              <a
                href="/resume.pdf"
                download="Swamy_BS_Resume.pdf"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold text-xs transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-xs font-mono text-gray-500 block mb-2">PROFESSIONAL PROFILES</span>
              <div className="grid grid-cols-3 gap-2.5">
                <a
                  href="https://github.com/SwamyBS-codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-gray-750 text-gray-300 hover:text-white flex items-center justify-center gap-1.5 text-xs font-medium transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-gray-300" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/swamy-b-s-86613628b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-gray-750 text-gray-300 hover:text-cyan-400 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://leetcode.com/u/SwamyBS18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-amber-500/40 text-gray-300 hover:text-amber-400 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors"
                >
                  <span className="font-mono text-amber-400 font-bold text-xs">&lt;/&gt;</span>
                  <span>LeetCode</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Side: cols 6-12 */}
          <div className="md:col-span-7 bg-gray-900/40 border border-gray-850 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-base font-semibold text-white mb-6 flex items-center gap-2 pb-4 border-b border-gray-800">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Send a Message</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 focus:border-cyan-500/60 text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Your Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. jane@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 focus:border-cyan-500/60 text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Message
                </label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Inquire about full-time/internship opportunities, P2P networking, or project collaboration..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 focus:border-cyan-500/60 text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              {status && (
                <div className={`p-3 rounded-lg text-xs font-mono border ${
                  status.startsWith('Thank')
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  {status}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
