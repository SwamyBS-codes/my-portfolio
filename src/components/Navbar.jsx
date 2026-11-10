import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Bot, FileText, Download, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

const Navbar = ({ openChatbot, isChatbotOpen, openResumeModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const wasOpen = isOpen;
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, wasOpen ? 250 : 0);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'py-3 bg-gray-950/85 backdrop-blur-md border-b border-gray-800/80 shadow-sm' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <button 
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 cursor-pointer group text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
              <span className="font-mono text-cyan-400 font-bold text-sm">&lt;/&gt;</span>
            </div>
            <div>
              <span className="font-bold text-gray-100 text-base tracking-tight group-hover:text-cyan-400 transition-colors block leading-tight">
                Swamy B S
              </span>
              <span className="text-[11px] font-mono text-gray-400">
                Software & Systems Engineer
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-gray-900/60 border border-gray-800/80 px-3 py-1.5 rounded-full backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3.5 py-1 text-xs font-medium transition-colors cursor-pointer rounded-full ${
                  activeSection === item.id 
                    ? 'text-cyan-400 font-semibold' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activePill"
                    className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://github.com/SwamyBS-codes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com/in/swamy-b-s-86613628b" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Resume Button */}
            <button
              onClick={openResumeModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-200 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={openChatbot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:from-cyan-500/25 hover:to-indigo-500/25 shadow-sm shadow-cyan-500/10"
              title="Ask Swamy's AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask AI</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={openChatbot}
              className="p-2 rounded-lg bg-gray-900 border border-cyan-500/30 text-cyan-400"
              title="Ask AI"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-gray-950/95 border-b border-gray-800/80 backdrop-blur-xl overflow-hidden mt-3 mx-4 rounded-xl shadow-xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id 
                      ? 'bg-cyan-500/10 text-cyan-400' 
                      : 'text-gray-300 hover:bg-gray-900'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              <hr className="border-gray-800 my-2" />

              <button
                onClick={() => {
                  openChatbot();
                  setIsOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Ask Swamy's AI Assistant</span>
              </button>

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  onClick={() => {
                    openResumeModal();
                    setIsOpen(false);
                  }}
                  className="flex-1 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-200 text-xs font-medium flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Resume</span>
                </button>

                <a
                  href="/resume.pdf"
                  download="Swamy_BS_Resume.pdf"
                  className="flex-1 py-2 rounded-lg bg-cyan-500 text-gray-950 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Download</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
