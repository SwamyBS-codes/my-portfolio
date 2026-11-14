import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import AiChatbot from './components/AiChatbot';
import ResumeModal from './components/ResumeModal';
import CursorEffect from './components/CursorEffect';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev);
  };

  const openChatbot = () => {
    setIsChatbotOpen(true);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  const openResumeModal = () => {
    setIsResumeModalOpen(true);
  };

  const closeResumeModal = () => {
    setIsResumeModalOpen(false);
  };

  return (
    <div className="bg-modern-obsidian text-gray-100 min-h-screen relative selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      <CursorEffect />
      {/* 2px Precision Reading Progress Bar */}
      <motion.div 
        style={{ scaleX }} 
        className="glint-progress fixed top-0 left-0 right-0 h-[2.5px] origin-left z-50 pointer-events-none"
      />

      {/* Modern Ambient Glow & Mesh Background Layer with Breathing Aurora Animations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.18, 1],
            opacity: [0.09, 0.18, 0.09],
            x: [0, 25, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.15, 1, 1.15],
            opacity: [0.08, 0.16, 0.08],
            x: [0, -25, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -right-32 w-[550px] h-[550px] bg-indigo-500/18 rounded-full blur-[160px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.06, 0.13, 0.06],
            x: [0, 20, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-2/3 left-1/5 w-96 h-96 bg-purple-500/15 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.07, 0.14, 0.07]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 right-1/4 w-[480px] h-[480px] bg-cyan-600/15 rounded-full blur-[140px]" 
        />
      </div>

      {/* Global Navbar */}
      <Navbar 
        openChatbot={openChatbot} 
        isChatbotOpen={isChatbotOpen}
        openResumeModal={openResumeModal}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          openChatbot={openChatbot}
          openResumeModal={openResumeModal}
        />
        <About
          openResumeModal={openResumeModal}
        />
        <Skills />
        <Projects />
        <Achievements />
        <Contact
          openResumeModal={openResumeModal}
        />
      </main>

      {/* AI Resume & Projects Chatbot Widget */}
      <AiChatbot 
        isOpen={isChatbotOpen} 
        onToggle={toggleChatbot}
        onClose={closeChatbot}
      />

      {/* Professional Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={closeResumeModal}
      />

      {/* Clean Engineering Footer */}
      <footer className="py-10 bg-gray-950/80 border-t border-gray-900/80 text-center text-xs font-mono text-gray-400 relative z-10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Swamy B S • RV College of Engineering</p>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={openResumeModal}
              className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Resume PDF
            </button>
            <span>•</span>
            <button
              onClick={openChatbot}
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              Ask AI Assistant
            </button>
            <span>•</span>
            <a
              href="https://github.com/SwamyBS-codes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://linkedin.com/in/swamy-b-s-86613628b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>

          <p className="text-gray-400">
            Engineered with React & Tailwind CSS
          </p>
        </div>
      </footer>

      {/* Minimalist Back to Top Floating Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-40 p-2.5 rounded-full bg-gray-900/90 border border-gray-800 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 shadow-xl backdrop-blur-md transition-all cursor-pointer group"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
