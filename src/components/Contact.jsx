import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Code2, Send } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

const Contact = () => {
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
      setStatus('Please fill all fields');
      return;
    }
    setStatus('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-gray-950/60 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Get In Touch</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Have a question, want to collaborate on P2P/DevOps projects, or discuss open positions? Drop a message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Info Side: cols 1-5 */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
              
              {/* Email */}
              <div className="flex items-center justify-between p-4 bg-gray-900/40 border border-gray-850 rounded-2xl backdrop-blur-sm group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-gray-500">EMAIL</span>
                    <span className="text-sm font-semibold text-gray-200">swamybs272@gmail.com</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('swamybs272@gmail.com', 'email')}
                  className="p-2 rounded-lg bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-cyan-400 transition-all cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-4 bg-gray-900/40 border border-gray-850 rounded-2xl backdrop-blur-sm group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-gray-500">PHONE</span>
                    <span className="text-sm font-semibold text-gray-200">+91 74114 76941</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('+917411476941', 'phone')}
                  className="p-2 rounded-lg bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-indigo-400 transition-all cursor-pointer"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-4 bg-gray-900/40 border border-gray-850 rounded-2xl backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-gray-500">LOCATION</span>
                  <span className="text-sm font-semibold text-gray-200">Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Social handles */}
            <div className="border-t border-gray-850/80 pt-6">
              <h4 className="text-xs font-mono text-gray-500 font-bold mb-4 uppercase">Find me on</h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/SwamyBS-codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/swamy-b-s-86613628b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://leetcode.com/u/SwamyBS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/30 transition-colors"
                >
                  <Code2 className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Side: cols 6-12 */}
          <div className="md:col-span-7 bg-gray-900/30 border border-gray-850 rounded-3xl p-6 md:p-8 backdrop-blur-sm flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2 uppercase font-medium">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800/80 focus:border-cyan-500/50 focus:outline-none text-sm text-gray-250 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-2 uppercase font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800/80 focus:border-cyan-500/50 focus:outline-none text-sm text-gray-250 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-2 uppercase font-medium">Message</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800/80 focus:border-cyan-500/50 focus:outline-none text-sm text-gray-250 transition-colors resize-none"
                  placeholder="Hey Swamy, let's talk about building a scalable system..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-semibold text-sm transition-all shadow-md shadow-cyan-500/10 cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>

              {status && (
                <div className={`text-center text-xs font-mono mt-3 ${
                  status.includes('successfully') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
