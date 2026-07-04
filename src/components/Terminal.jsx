import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, Minimize2, Maximize2, X } from 'lucide-react';

const Terminal = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const welcomeMessage = [
    '==============================================================',
    '  ____                               ____ ____  ',
    ' / ___|_      ____ _ _ __ ___  _   _  | __ ) ___| ',
    ' \\___ \\ \\ /\\ / / _` | \'_ ` _ \\| | | | |  _ \\___ \\ ',
    '  ___) \\ V  V / (_| | | | | | | |_| | | |_) |__) |',
    ' |____/ \\_/\\_/ \\__,_|_| |_| |_|\\__, | |____/____/ ',
    '                               |___/              ',
    '==============================================================',
    'Welcome to Swamy B S\'s Portfolio CLI Terminal [Version 1.0.0]',
    'Type "help" to see a list of available commands.',
    '--------------------------------------------------------------',
  ];

  useEffect(() => {
    // Set initial welcome message
    setHistory(welcomeMessage);
  }, []);

  useEffect(() => {
    // Scroll to bottom on history change
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  useEffect(() => {
    // Auto focus terminal input when opened
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (cmdText) => {
    const cleanInput = cmdText.trim();
    const parts = cleanInput.split(/\s+/);
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    const newHistory = [...history, `guest@swamybs.dev:~$ ${cmdText}`];

    if (cleanInput === '') {
      setHistory(newHistory);
      return;
    }

    switch (mainCmd) {
      case 'help':
        newHistory.push(
          'Available commands:',
          '  about          - Brief overview of who I am',
          '  skills         - List my technical skillset',
          '  projects       - Overview of my projects',
          '  certifications - Coding contests and course certificates',
          '  contact        - Get my email and social profiles',
          '  clear          - Clear the terminal history',
          '  help           - Display this list'
        );
        break;

      case 'about':
        newHistory.push(
          'About Swamy B S:',
          '  - Currently pursuing BE in Information Science & Engineering at RV College of Engineering, Bengaluru.',
          '  - Expected Graduation: June 2027.',
          '  - Focus: Backend Engineering, Cloud Systems, Distributed Architectures & System Design.',
          '  - Driven by performance tuning, automation, and writing resilient code.'
        );
        break;

      case 'skills':
        newHistory.push(
          'Technical Skills:',
          '  [Languages]           C, C++, JavaScript (ES6+), Python',
          '  [Backend/Networking] Node.js, Express.js, REST APIs, WebRTC, Socket.io',
          '  [Frontend]            React.js, Tailwind CSS, HTML5, CSS3',
          '  [Databases]           PostgreSQL, Redis, MongoDB, MySQL',
          '  [Cloud & DevOps]      Docker, NGINX, AWS EC2, GitHub Actions/Webhooks, Bash scripting',
          '  [Tools]               Git, GitHub, Postman'
        );
        break;

      case 'projects':
        newHistory.push(
          'Featured Projects:',
          '  1. CloudOps — Automated CI/CD Deployment & Orchestration Platform',
          '     - Node.js, Docker, NGINX, GitHub Webhooks, AWS EC2, Bash',
          '     - Designed a custom container orchestration flow from git push to automatic EC2 staging.',
          '  2. Shortify — URL Shortening Platform',
          '     - React.js, Node.js, Express.js, PostgreSQL, Redis, JWT, Docker, Tailwind CSS',
          '     - Low-latency redirects via Redis caching, with custom analytics dashboard.',
          '  3. Peer-to-Peer File Sharing Network',
          '     - Node.js, WebRTC DataChannels, DTLS, Socket.io, JavaScript',
          '     - Zero central server dependencies. Adaptive flow control and integrity checks.',
          'Type "contact" to get repository links!'
        );
        break;

      case 'certifications':
        newHistory.push(
          'Achievements & Certifications:',
          '  - Runner-Up at Coding Chef (May 2026, Nagarjuna College of Engineering): Solved complex greedy & DP problems under strict time limit.',
          '  - Runner-Up at KLE Institutes Coding Contest (Sept 2025): Algorithmic problem solving.',
          '  - Introduction to Graph Algorithms Certificate (NPTEL, April 2025): Graph traversals, shortest path, and complexity analysis.'
        );
        break;



      case 'contact':
        newHistory.push(
          'Contact & Social Links:',
          '  - Email:      swamybs272@gmail.com',
          '  - Phone:      +91-74114 76941',
          '  - GitHub:     github.com/SwamyBS-codes',
          '  - LinkedIn:   linkedin.com/in/swamy-b-s-86613628b',
          '  - LeetCode:   leetcode.com/u/SwamyBS'
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push(`Command not found: "${cmdText}". Type "help" for a list of commands.`);
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isFullscreen 
        ? 'inset-0 p-0' 
        : 'bottom-4 right-4 w-[90vw] md:w-[600px] h-[400px] max-w-full'
    }`}>
      <div 
        onClick={handleTerminalClick}
        className="w-full h-full bg-gray-950/95 border border-gray-800 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs md:text-sm text-gray-300 shadow-cyan-500/5 backdrop-blur-md"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800 select-none">
          <div className="flex items-center gap-2">
            <TermIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-400 font-bold">swamybs@portfolio: ~</span>
          </div>
          {/* Controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 hover:bg-gray-850 rounded text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-gray-800">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line.startsWith('guest@swamybs.dev:~$') ? (
                <span>
                  <span className="text-green-400">guest@swamybs.dev</span>
                  <span className="text-gray-400">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-gray-400">$</span> {line.replace('guest@swamybs.dev:~$ ', '')}
                </span>
              ) : line.startsWith('Available commands:') || line.startsWith('Technical Skills:') || line.startsWith('Featured Projects:') || line.startsWith('About Swamy B S:') || line.startsWith('Achievements & Certifications:') || line.startsWith('Contact & Social Links:') ? (
                <span className="text-cyan-400 font-semibold">{line}</span>
              ) : (
                <span>{line}</span>
              )}
            </div>
          ))}
          
          {/* Prompt line */}
          <div className="flex items-center mt-1">
            <span className="text-green-400">guest@swamybs.dev</span>
            <span className="text-gray-400">:</span>
            <span className="text-cyan-400">~</span>
            <span className="text-gray-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none ml-2 text-cyan-300 font-mono"
              autoFocus
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
