import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Cpu, Link2, Share2, Terminal, Network,
  Code, Activity, Database, School, Layers, CheckCircle2
} from 'lucide-react';
import { Github } from './BrandIcons';
import LogSimulator from './LogSimulator';
import ArchitectureBlueprint from './ArchitectureBlueprint';
import ApiPlayground from './ApiPlayground';
import P2pThroughputSimulator from './P2pThroughputSimulator';
import DatabaseSchema from './DatabaseSchema';
import WebrtcHandshake from './WebrtcHandshake';
import KcetSimulator from './KcetSimulator';

const Projects = () => {
  const [activeWidgets, setActiveWidgets] = useState({
    0: null, // CloudOps: 'logs' | 'arch' | null
    1: null, // PeerShare: 'arch' | 'throughput' | 'handshake' | null
    2: null, // KCET: 'simulator' | null
    3: null  // Shortify: 'arch' | 'api' | 'schema' | null
  });

  const toggleWidget = (projIdx, widgetType) => {
    setActiveWidgets(prev => ({
      ...prev,
      [projIdx]: prev[projIdx] === widgetType ? null : widgetType
    }));
  };

  const projectsList = [
    {
      title: "CloudOps — Automated CI/CD Deployment Platform for AWS",
      date: "Jun 2026",
      tag: "Cloud & DevOps Platform",
      tech: ["Node.js", "Docker", "AWS EC2", "Amazon ECR", "Socket.io", "GitHub Webhooks", "Bash"],
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      bullets: [
        "Constructed a self-service automated deployment pipeline that cut setup and container staging times from ~20 minutes to under 60 seconds across GitHub, Docker, Amazon ECR, and AWS EC2.",
        "Automated Dockerfile compilation with 3 production-grade safeguards: non-root user execution, active health checks, and graceful shutdown signal handling.",
        "Integrated Amazon ECR container publishing with automated AWS EC2 instance pull and health validation.",
        "Configured GitHub Webhook receivers to trigger instant zero-downtime hot reloads and stream deployment logs in real time via Socket.io with sensitive token masking."
      ],
      links: {
        github: "https://github.com/SwamyBS-codes/CloudOps",
      }
    },
    {
      title: "PeerShare — Real-Time WebRTC P2P Communication Platform",
      date: "Active",
      tag: "Distributed P2P Networking",
      tech: ["WebRTC DataChannels", "Node.js", "Socket.io", "React.js", "JavaScript", "Web Workers"],
      icon: <Share2 className="w-5 h-5 text-indigo-400" />,
      bullets: [
        "Engineered a browser-to-browser peer-to-peer file sharing and video communication platform using WebRTC DataChannels, eliminating central storage bandwidth and storage costs.",
        "Developed a low-latency Node.js signaling server using Socket.io for peer discovery, SDP offer/answer exchange, and ICE candidate negotiation with STUN/TURN fallback support.",
        "Implemented chunked 64KB resumable file transfers with SHA-256 integrity verification and adaptive flow control to guarantee zero packet loss over unstable networks.",
        "Offloaded cryptographic checksum hashing to Web Workers to ensure an uninterrupted 60 FPS UI experience during multi-gigabyte transfers."
      ],
      links: {
        github: "https://github.com/SwamyBS-codes/PeerShare",
        live: "https://peer-share-rho.vercel.app/"
      }
    },
    {
      title: "KCET EduGuide — KCET Counselling & Recommendation Platform",
      date: "Active • 70+ Students Guided",
      tag: "Full-Stack EdTech & Analytics",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Recharts", "Tailwind CSS", "AWS EC2", "AWS S3", "Vercel"],
      icon: <School className="w-5 h-5 text-amber-400" />,
      bullets: [
        "Designed and launched a full-stack engineering counselling platform adopted by 70+ students to generate rank-based college and branch recommendations across 200+ Karnataka institutions.",
        "Built an interactive React frontend featuring Recharts-powered cutoff trend analysis, automated PDF choice list generation, and multi-criteria filtering across college, branch, category, and round.",
        "Engineered high-throughput Node.js & Express.js REST APIs with MongoDB covering rank prediction algorithms, JWT authentication, and mentor verification.",
        "Orchestrated cloud deployment hosting the backend API on AWS EC2, JSON insight branch files on AWS S3, and client frontend on Vercel."
      ],
      links: {
        github: "https://github.com/SwamyBS-codes/KCET-EduGuide",
        live: "https://kcet-counselling-platform.vercel.app/"
      }
    },
    {
      title: "Shortify — High-Throughput URL Shortening Platform",
      date: "Jun 2026",
      tag: "Distributed Backend & Analytics",
      tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Redis", "JWT", "Docker", "Tailwind CSS"],
      icon: <Link2 className="w-5 h-5 text-purple-400" />,
      bullets: [
        "Developed a full-stack URL platform supporting custom aliases, password protection, expiration scheduling, and automated QR code generation.",
        "Architected a PostgreSQL-indexed resolution engine coupled with a Redis cache-aside layer, achieving sub-millisecond redirect lookups and reducing database load by over 80%.",
        "Built a real-time analytics dashboard with React and Recharts to visualize click volume, referrer domains, visitor activity, and geographic telemetry.",
        "Secured administrative operations and private dashboard endpoints with JWT-based role authentication and rate-limiting middleware."
      ],
      links: {
        github: "https://github.com/SwamyBS-codes/Shortify",
        live: "https://shortify-urlshortner.vercel.app/"
      }
    }
  ];

  return (
    <section id="projects" className="py-24 bg-gray-950/80 relative border-t border-gray-900/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Systems & Applications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Practical engineering projects emphasizing automated cloud deployment pipelines, WebRTC peer-to-peer data channels, database index optimization, and high-concurrency microservices.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-10">
          {projectsList.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-gray-900/40 border border-gray-850 hover:border-gray-750 transition-all backdrop-blur-sm group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Meta Panel: cols 1-4 */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    {/* Header icon and date */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {project.icon}
                      </div>
                      <span className="text-xs font-mono text-gray-400 bg-gray-950 px-2.5 py-1 rounded-md border border-gray-850">
                        {project.date}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-medium text-cyan-400 block mb-1">
                      {project.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  {/* Tech stack & Links */}
                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-gray-950 border border-gray-850 text-[10px] font-mono text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-800 hover:border-gray-700"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code Repository</span>
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/25 hover:bg-cyan-500/20"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Application</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bullets & Interactive Toggles: cols 5-12 */}
                <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-gray-800/80 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between">
                  <ul className="space-y-3.5">
                    {project.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Interactive Widgets Expand Triggers */}
                  <div className="mt-8 pt-5 border-t border-gray-850/60 flex flex-wrap gap-2.5">
                    {/* CloudOps controls (idx 0) */}
                    {idx === 0 && (
                      <>
                        <button
                          onClick={() => toggleWidget(0, 'arch')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${activeWidgets[0] === 'arch'
                              ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400'
                              : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-750 hover:text-gray-200'
                            }`}
                        >
                          <Network className="w-3.5 h-3.5" />
                          <span>{activeWidgets[0] === 'arch' ? 'Hide Architecture' : 'Architecture Blueprint'}</span>
                        </button>
                        <button
                          onClick={() => toggleWidget(0, 'logs')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${activeWidgets[0] === 'logs'
                              ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400'
                              : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-750 hover:text-gray-200'
                            }`}
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>{activeWidgets[0] === 'logs' ? 'Hide Deploy Logs' : 'View Real-Time Logs'}</span>
                        </button>
                      </>
                    )}

                    {/* PeerShare controls (idx 1) */}
                    {idx === 1 && (
                      <>
                        <button
                          onClick={() => toggleWidget(1, 'arch')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${activeWidgets[1] === 'arch'
                              ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-400'
                              : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-750 hover:text-gray-200'
                            }`}
                        >
                          <Network className="w-3.5 h-3.5" />
                          <span>{activeWidgets[1] === 'arch' ? 'Hide Blueprint' : 'P2P Topology'}</span>
                        </button>
                        <button
                          onClick={() => toggleWidget(1, 'throughput')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${activeWidgets[1] === 'throughput'
                              ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-400'
                              : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-750 hover:text-gray-200'
                            }`}
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>{activeWidgets[1] === 'throughput' ? 'Hide Speed Test' : 'Throughput Simulator'}</span>
                        </button>
                        <button
                          onClick={() => toggleWidget(1, 'handshake')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${activeWidgets[1] === 'handshake'
                              ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400'
                              : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-750 hover:text-gray-200'
                            }`}
                        >
                          <Network className="w-3.5 h-3.5" />
                          <span>{activeWidgets[1] === 'handshake' ? 'Hide Handshake' : 'WebRTC Handshake'}</span>
                        </button>
                      </>
                    )}

                    {/* KCET EduGuide controls (idx 2) */}
                    {idx === 2 && (
                      <button
                        onClick={() => toggleWidget(2, 'simulator')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${activeWidgets[2] === 'simulator'
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                            : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-750 hover:text-gray-200'
                          }`}
                      >
                        <School className="w-3.5 h-3.5" />
                        <span>{activeWidgets[2] === 'simulator' ? 'Hide Simulator' : 'Test Recommendation Simulator'}</span>
                      </button>
                    )}

                    {/* Shortify controls (idx 3) */}
                    {idx === 3 && (
                      <>
                        <button
                          onClick={() => toggleWidget(3, 'arch')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${activeWidgets[3] === 'arch'
                              ? 'bg-purple-500/15 border-purple-500/40 text-purple-400'
                              : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-750 hover:text-gray-200'
                            }`}
                        >
                          <Network className="w-3.5 h-3.5" />
                          <span>{activeWidgets[3] === 'arch' ? 'Hide Blueprint' : 'Cache-Aside Blueprint'}</span>
                        </button>
                        <button
                          onClick={() => toggleWidget(3, 'api')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${activeWidgets[3] === 'api'
                              ? 'bg-purple-500/15 border-purple-500/40 text-purple-400'
                              : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-750 hover:text-gray-200'
                            }`}
                        >
                          <Code className="w-3.5 h-3.5" />
                          <span>{activeWidgets[3] === 'api' ? 'Hide API Tester' : 'Interactive API Playground'}</span>
                        </button>
                        <button
                          onClick={() => toggleWidget(3, 'schema')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${activeWidgets[3] === 'schema'
                              ? 'bg-blue-500/15 border-blue-500/40 text-blue-400'
                              : 'bg-gray-950 border-gray-850 text-gray-400 hover:border-gray-750 hover:text-gray-200'
                            }`}
                        >
                          <Database className="w-3.5 h-3.5" />
                          <span>{activeWidgets[3] === 'schema' ? 'Hide DB Schema' : 'PostgreSQL Schema'}</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Rendered Interactive Sections */}
              <AnimatePresence>
                {/* CloudOps Widgets */}
                {idx === 0 && activeWidgets[0] === 'arch' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ArchitectureBlueprint projectType="cloudops" />
                  </motion.div>
                )}
                {idx === 0 && activeWidgets[0] === 'logs' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <LogSimulator />
                  </motion.div>
                )}

                {/* PeerShare Widgets */}
                {idx === 1 && activeWidgets[1] === 'arch' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ArchitectureBlueprint projectType="p2p" />
                  </motion.div>
                )}
                {idx === 1 && activeWidgets[1] === 'throughput' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <P2pThroughputSimulator />
                  </motion.div>
                )}
                {idx === 1 && activeWidgets[1] === 'handshake' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <WebrtcHandshake />
                  </motion.div>
                )}

                {/* KCET Widgets */}
                {idx === 2 && activeWidgets[2] === 'simulator' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <KcetSimulator />
                  </motion.div>
                )}

                {/* Shortify Widgets */}
                {idx === 3 && activeWidgets[3] === 'arch' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ArchitectureBlueprint projectType="shortify" />
                  </motion.div>
                )}
                {idx === 3 && activeWidgets[3] === 'api' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ApiPlayground />
                  </motion.div>
                )}
                {idx === 3 && activeWidgets[3] === 'schema' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <DatabaseSchema />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
