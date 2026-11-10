import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import ResumeModal from './components/ResumeModal';

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const toggleTerminal = () => {
    setIsTerminalOpen(prev => !prev);
  };

  const closeTerminal = () => {
    setIsTerminalOpen(false);
  };

  const openResumeModal = () => {
    setIsResumeModalOpen(true);
  };

  const closeResumeModal = () => {
    setIsResumeModalOpen(false);
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen relative selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      {/* Global Navbar */}
      <Navbar 
        toggleTerminal={toggleTerminal} 
        isTerminalOpen={isTerminalOpen}
        openResumeModal={openResumeModal}
      />

      {/* Main Content Sections */}
      <main>
        <Hero 
          toggleTerminal={toggleTerminal}
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

      {/* Interactive CLI Terminal Panel */}
      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={closeTerminal}
        openResumeModal={openResumeModal}
      />

      {/* Professional Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={closeResumeModal} 
      />

      {/* Clean Engineering Footer */}
      <footer className="py-10 bg-gray-950 border-t border-gray-900/80 text-center text-xs font-mono text-gray-400 relative z-10">
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
              onClick={toggleTerminal}
              className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              CLI Terminal
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
    </div>
  );
}

export default App;
