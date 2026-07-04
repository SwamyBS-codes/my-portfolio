import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Terminal from './components/Terminal';

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const toggleTerminal = () => {
    setIsTerminalOpen(prev => !prev);
  };

  const closeTerminal = () => {
    setIsTerminalOpen(false);
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Navbar */}
      <Navbar toggleTerminal={toggleTerminal} isTerminalOpen={isTerminalOpen} />

      {/* Main Sections */}
      <main>
        <Hero toggleTerminal={toggleTerminal} />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      {/* Interactive CLI Terminal Panel */}
      <Terminal isOpen={isTerminalOpen} onClose={closeTerminal} />

      {/* Footer */}
      <footer className="py-8 bg-gray-950 border-t border-gray-900/60 text-center text-xs font-mono text-gray-500 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Swamy B S. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Designed & Built with</span>
            <span className="text-cyan-400 font-bold">&lt;/&gt;</span>
            <span>in React & Tailwind</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
