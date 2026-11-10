import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, Minimize2, Maximize2, X, Download } from 'lucide-react';

const Terminal = ({ isOpen, onClose, openResumeModal }) => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const welcomeMessage = [
    '==============================================================',
    '  Swamy B S — Software Engineering Portfolio CLI [v2.0.0]',
    '  Information Science & Engineering • RV College of Engineering',
    '==============================================================',
    'Type "help" to view available commands.',
    'Type "resume" to preview or download official PDF resume.',
    '--------------------------------------------------------------',
  ];

  useEffect(() => {
    setHistory(welcomeMessage);
  }, []);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  useEffect(() => {
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

    const newHistory = [...history, `swamy@portfolio:~$ ${cmdText}`];

    if (cleanInput === '') {
      setHistory(newHistory);
      return;
    }

    switch (mainCmd) {
      case 'help':
        newHistory.push(
          'Available commands:',
          '  about          - Brief overview of background and education',
          '  skills         - List core technical competencies',
          '  projects       - Overview of featured systems and platforms',
          '  education      - Academic credentials and coursework',
          '  certifications - Competitive programming honors and certificates',
          '  resume         - Preview or download official PDF resume',
          '  contact        - Direct contact information and profiles',
          '  clear          - Clear terminal history',
          '  help           - Display this help message'
        );
        break;

      case 'about':
        newHistory.push(
          'About Swamy B S:',
          '  - Undergraduate Software Engineer at RV College of Engineering, Bengaluru.',
          '  - Major: Information Science and Engineering (Expected: June 2027).',
          '  - Focus: Distributed Backend Systems, WebRTC P2P Protocols & Cloud Infrastructure.',
          '  - Strong foundations in Data Structures, Algorithms, Operating Systems, and DBMS.'
        );
        break;

      case 'education':
        newHistory.push(
          'Education History:',
          '  1. R V College of Engineering, Bengaluru (Sept 2023 - June 2027)',
          '     - B.E. in Information Science and Engineering',
          '     - Current CGPA: 8.48 / 10.0',
          '  2. GIPUC Channarayapattana (Mar 2021 - June 2023)',
          '     - Pre-University (PCMB) — 94.6%'
        );
        break;

      case 'skills':
        newHistory.push(
          'Technical Skills:',
          '  [Languages]           C, C++, JavaScript (ES6+), Python, SQL',
          '  [Backend & P2P]       Node.js, Express.js, WebRTC DataChannels, Socket.io, REST APIs, JWT',
          '  [Cloud & DevOps]      AWS (EC2, ECR, S3), Docker, NGINX, GitHub Webhooks, Linux',
          '  [Databases & Cache]   PostgreSQL, Redis, MongoDB, MySQL',
          '  [Frontend]            React.js, Tailwind CSS, Vite, HTML5, CSS3, Recharts',
          '  [Tools]               Git, GitHub, Postman, Linux Terminal'
        );
        break;

      case 'projects':
        newHistory.push(
          'Featured Engineering Projects:',
          '  1. CloudOps — Automated CI/CD Deployment Platform for AWS',
          '     - Automates GitHub cloning, Docker image build, Amazon ECR push, and EC2 container staging.',
          '     - Production safeguards: non-root execution, health checks, Socket.io logs.',
          '  2. PeerShare — Real-Time WebRTC P2P Communication Platform',
          '     - Browser-to-browser P2P file transfers without centralized storage.',
          '     - Chunked transfers with SHA-256 integrity verification, Web Workers & adaptive flow control.',
          '  3. KCET EduGuide — Counselling Recommendation Platform',
          '     - Used by 70+ students for personalized rank-based college cutoff recommendations (Recharts).',
          '     - Deployed backend on AWS EC2 and frontend on Vercel.',
          '  4. Shortify — High-Throughput URL Shortening Platform',
          '     - PostgreSQL indexed lookups with Redis cache-aside architecture for sub-millisecond redirects.'
        );
        break;

      case 'certifications':
      case 'achievements':
        newHistory.push(
          'Achievements & Certifications:',
          '  - Runner-Up at Coding Chef (May 2026, Nagarjuna College of Engineering): Dynamic Programming & Greedy Algorithms under strict timer.',
          '  - Runner-Up at KLE Institutions Coding Contest (Sept 2025): Algorithmic problem solving and debugging.',
          '  - Introduction to Graph Algorithms (NPTEL, April 2025): Shortest Path, Minimum Spanning Trees, Complexity Analysis.',
          '  - Active LeetCode Problem Solver: leetcode.com/u/SwamyBS18'
        );
        break;

      case 'resume':
      case 'cv':
        newHistory.push(
          'Official Candidate Resume:',
          '  - Document: public/resume.pdf (110 KB)',
          '  - Opening resume preview modal...'
        );
        if (openResumeModal) openResumeModal();
        break;

      case 'contact':
        newHistory.push(
          'Contact & Profiles:',
          '  - Email:      swamybs272@gmail.com',
          '  - Phone:      +91 74114 76941',
          '  - Location:   Bengaluru, Karnataka, India',
          '  - GitHub:     https://github.com/SwamyBS-codes',
          '  - LinkedIn:   https://linkedin.com/in/swamy-b-s-86613628b',
          '  - LeetCode:   https://leetcode.com/u/SwamyBS18'
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push(`Command not found: "${cmdText}". Type "help" for a list of valid commands.`);
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
    <div className={`fixed z-50 transition-all duration-300 ${isFullscreen
        ? 'inset-0 p-0'
        : 'bottom-4 right-4 w-[92vw] md:w-[620px] h-[420px] max-w-full'
      }`}>
      <div
        onClick={handleTerminalClick}
        className="w-full h-full bg-gray-950/98 border border-gray-800 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs md:text-sm text-gray-300 backdrop-blur-md"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800 select-none">
          <div className="flex items-center gap-2">
            <TermIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-300 font-semibold">swamy@portfolio: ~</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="Swamy_BS_Resume.pdf"
              onClick={(e) => e.stopPropagation()}
              className="px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-[11px] font-mono text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3 text-cyan-400" /> Resume
            </a>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(!isFullscreen);
              }}
              className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-1 select-text bg-gray-950">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${line.startsWith('swamy@portfolio:')
                  ? 'text-cyan-400 font-semibold'
                  : line.startsWith('Swamy B S') || line.startsWith('===')
                    ? 'text-gray-400'
                    : 'text-gray-300'
                }`}
            >
              {line}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Prompt Input Line */}
        <div className="px-4 py-2.5 bg-gray-900/90 border-t border-gray-800 flex items-center gap-2">
          <span className="text-cyan-400 font-bold shrink-0">swamy@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'projects', or 'resume'..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs md:text-sm focus:ring-0 placeholder-gray-600"
            autoFocus
          />
          <span className="terminal-cursor"></span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
