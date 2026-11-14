import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, ExternalLink, FileText, Check, Copy, GraduationCap, 
  Layers, Trophy, Code2, Cpu
} from 'lucide-react';

const ResumeModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'pdf'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText('swamybs272@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const skillsByCategory = [
    { category: "Languages", items: ["C++", "C", "JavaScript (ES6+)", "Python", "SQL"] },
    { category: "Frontend", items: ["React.js", "Tailwind CSS", "Vite", "HTML5", "CSS3", "Recharts"] },
    { category: "Backend", items: ["Node.js", "Express.js", "WebRTC DataChannels", "Socket.io", "JWT", "REST APIs"] },
    { category: "Databases", items: ["PostgreSQL", "Redis", "MongoDB", "MySQL"] },
    { category: "Cloud & DevOps", items: ["AWS (EC2, ECR, S3)", "Docker", "NGINX", "Linux / Bash", "Vercel"] },
    { category: "Tools", items: ["Git", "GitHub & Webhooks", "Postman", "Web Workers"] },
  ];

  return (
    createPortal(<AnimatePresence>
      <div className="resume-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="resume-dialog relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-dialog-title"
          onMouseDown={(event) => event.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="px-6 py-4 bg-gray-900/90 border-b border-gray-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 id="resume-dialog-title" className="text-white font-semibold text-base sm:text-lg">
                  Swamy B S — Software Engineering Resume
                </h2>
                <p className="text-xs text-gray-400 font-mono">
                  B.E. Information Science & Engineering • RV College of Engineering ('27)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Swamy_BS_Resume.pdf"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 py-2.5 bg-gray-900/40 border-b border-gray-850 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Interactive Summary
              </button>
              <button
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'pdf'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                PDF Document View
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-gray-400 text-xs font-mono">
              <button onClick={copyEmail} className="hover:text-cyan-400 flex items-center gap-1.5 cursor-pointer">
                <span>swamybs272@gmail.com</span>
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
              <span>+91 74114 76941</span>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {activeTab === 'pdf' ? (
              <div className="w-full h-[65vh] rounded-xl overflow-hidden border border-gray-800 bg-gray-950 flex flex-col">
                <div className="p-2.5 bg-gray-900/80 border-b border-gray-800 flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>Document: SWAMYBS_1RV23IS127.pdf</span>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:underline"
                  >
                    <span>Open in new tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <iframe
                  src="/resume.pdf#toolbar=1"
                  title="Swamy B S Resume PDF"
                  className="w-full flex-1 border-0"
                />
              </div>
            ) : (
              <>
                {/* Education Card */}
                <div className="p-5 rounded-xl bg-gray-900/40 border border-gray-850">
                  <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Education</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-gray-800/80">
                      <div>
                        <h4 className="text-sm font-semibold text-white">R V College of Engineering</h4>
                        <p className="text-xs text-gray-400">B.E. in Information Science and Engineering</p>
                      </div>
                      <div className="text-left sm:text-right text-xs font-mono">
                        <span className="text-cyan-400 font-semibold block">CGPA: 8.48 / 10.0</span>
                        <span className="text-gray-500">Sept 2023 – Jun 2027 • Bengaluru</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-sm font-semibold text-white">GIPUC Channarayapattana</h4>
                        <p className="text-xs text-gray-400">Pre-University (PCMB)</p>
                      </div>
                      <div className="text-left sm:text-right text-xs font-mono">
                        <span className="text-emerald-400 font-semibold block">Percentage: 94.6%</span>
                        <span className="text-gray-500">Mar 2021 – Jun 2023 • Hassan</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Skills (NO PERCENTAGES) */}
                <div className="p-5 rounded-xl bg-gray-900/40 border border-gray-850">
                  <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    <span>Technical Skills</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {skillsByCategory.map((grp, gIdx) => (
                      <div key={gIdx} className="p-3.5 rounded-lg bg-gray-950 border border-gray-800">
                        <span className="text-xs font-semibold text-gray-200 block mb-2">{grp.category}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {grp.items.map((item, iIdx) => (
                            <span 
                              key={iIdx}
                              className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-[11px] font-mono text-gray-300"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Projects */}
                <div className="p-5 rounded-xl bg-gray-900/40 border border-gray-850">
                  <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Key Projects</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-lg bg-gray-950 border border-gray-800">
                      <h4 className="text-sm font-semibold text-white mb-1">CloudOps CI/CD Deployment Platform</h4>
                      <p className="text-xs text-gray-400 leading-relaxed mb-2">
                        Automated 4-step deployment reducing staging times from ~20 mins to &lt;60 secs across GitHub, Docker, ECR, and AWS EC2 with production safeguards.
                      </p>
                      <div className="text-[10px] font-mono text-cyan-400">AWS EC2 • Docker • ECR • Node.js • Socket.io</div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-gray-950 border border-gray-800">
                      <h4 className="text-sm font-semibold text-white mb-1">PeerShare WebRTC P2P Platform</h4>
                      <p className="text-xs text-gray-400 leading-relaxed mb-2">
                        Decentralized browser-to-browser file transfers eliminating central storage costs. 64KB chunking with SHA-256 verification and Web Workers.
                      </p>
                      <div className="text-[10px] font-mono text-cyan-400">WebRTC • Socket.io • Node.js • React.js</div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-gray-950 border border-gray-800">
                      <h4 className="text-sm font-semibold text-white mb-1">Shortify URL Platform</h4>
                      <p className="text-xs text-gray-400 leading-relaxed mb-2">
                        PostgreSQL-indexed resolution with Redis cache-aside architecture achieving sub-millisecond lookups and reducing database load by &gt;80%.
                      </p>
                      <div className="text-[10px] font-mono text-cyan-400">PostgreSQL • Redis • Express • Docker</div>
                    </div>
                  </div>
                </div>

                {/* Achievements & Certifications */}
                <div className="p-5 rounded-xl bg-gray-900/40 border border-gray-850">
                  <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>Achievements & Certifications</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-850">
                      <span className="text-gray-200 font-medium">Runner-Up — Coding Chef (DSA & Dynamic Programming)</span>
                      <span className="text-gray-400 font-mono">Nagarjuna College (May 2026)</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-850">
                      <span className="text-gray-200 font-medium">Runner-Up — Coding Competition (Competitive Problem Solving)</span>
                      <span className="text-gray-400 font-mono">KLE Institutions (Sept 2025)</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-gray-200 font-medium">Introduction to Graph Algorithms (Shortest Path, MST, BFS/DFS)</span>
                      <span className="text-gray-400 font-mono">NPTEL Certified (Apr 2025)</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-gray-900/80 border-t border-gray-800 flex items-center justify-between text-xs font-mono text-gray-400">
            <span>Verified Candidate Record</span>
            <a
              href="/resume.pdf"
              download="Swamy_BS_Resume.pdf"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Resume</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>, document.body)
  );
};

export default ResumeModal;
