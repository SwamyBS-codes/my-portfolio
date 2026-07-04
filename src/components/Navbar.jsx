import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal as TerminalIcon } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

const Navbar = ({ toggleTerminal, isTerminalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

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
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3' : 'py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between bg-gray-950/70 border border-gray-800/60 backdrop-blur-md rounded-full px-6 py-2.5 transition-all duration-300 shadow-lg shadow-black/30">
          {/* Logo */}
          <button 
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
              <span className="font-mono text-cyan-400 font-bold text-sm">&lt;/&gt;</span>
            </div>
            <span className="font-mono font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 text-lg">
              SwamyBS<span className="text-purple-400">.dev</span>
            </span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3 py-1 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-cyan-400' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://github.com/SwamyBS-codes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/swamy-b-s-86613628b" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            
            <button
              onClick={toggleTerminal}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all border cursor-pointer ${
                isTerminalOpen 
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]' 
                  : 'bg-gray-900/60 text-gray-300 border-gray-800 hover:border-gray-700 hover:bg-gray-850'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>TERMINAL</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTerminal}
              className={`p-2 rounded-full border cursor-pointer ${
                isTerminalOpen 
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' 
                  : 'bg-gray-900/60 text-gray-300 border-gray-800'
              }`}
            >
              <TerminalIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-gray-200 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="md:hidden bg-gray-950/95 border-b border-gray-850 backdrop-blur-lg overflow-hidden mt-2 mx-4 rounded-2xl"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id 
                      ? 'bg-cyan-500/10 text-cyan-400' 
                      : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <hr className="border-gray-900" />
              <div className="flex items-center justify-between px-3 py-1">
                <div className="flex gap-4">
                  <a href="https://github.com/SwamyBS-codes" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/swamy-b-s-86613628b" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <button
                  onClick={() => {
                    toggleTerminal();
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all border ${
                    isTerminalOpen 
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' 
                      : 'bg-gray-900 text-gray-300 border-gray-800'
                  }`}
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>TERMINAL</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
