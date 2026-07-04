import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Cpu, Link2, Share2, Terminal, Network, Code, Activity, Database } from 'lucide-react';
import { Github } from './BrandIcons';
import LogSimulator from './LogSimulator';
import ArchitectureBlueprint from './ArchitectureBlueprint';
import ApiPlayground from './ApiPlayground';
import P2pThroughputSimulator from './P2pThroughputSimulator';
import DatabaseSchema from './DatabaseSchema';
import WebrtcHandshake from './WebrtcHandshake';

const Projects = () => {
  const [activeWidgets, setActiveWidgets] = useState({
    0: null, // CloudOps: 'logs' | 'arch' | null
    1: null, // Shortify: 'arch' | 'api' | 'schema' | null
    2: null  // P2P Share: 'arch' | 'throughput' | 'handshake' | null
  });

  const toggleWidget = (projIdx, widgetType) => {
    setActiveWidgets(prev => ({
      ...prev,
      [projIdx]: prev[projIdx] === widgetType ? null : widgetType
    }));
  };

  const projectsList = [
    {
      title: "CloudOps — Automated CI/CD Deployment & Orchestration Platform",
      date: "May 2026",
      tech: ["Node.js", "Docker", "NGINX", "GitHub Webhooks", "AWS EC2", "Bash"],
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      bullets: [
        "Designed and built a full CI/CD pipeline triggered by GitHub Webhooks: Git push ➔ build detection ➔ Docker image creation ➔ container deployment, eliminating manual deployment steps.",
        "Implemented a custom orchestration engine automating containerized delivery across local and AWS EC2-compatible environments, reducing deployment setup from hours to a single command.",
        "Configured NGINX reverse proxy for consistent request routing across containers, ensuring zero-downtime traffic handling and environment parity between local and cloud runtimes.",
        "Implemented a real-time logging and monitoring layer that tracks deployment status, container lifecycle events, and runtime logs — enabling rapid diagnosis of failures."
      ],
      links: {
        github: "https://github.com/SwamyBS-codes",
      }
    },
    {
      title: "Shortify — URL Shortening Platform",
      date: "Jun 2026",
      tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Redis", "JWT", "Docker", "Tailwind CSS"],
      icon: <Link2 className="w-6 h-6 text-indigo-400" />,
      bullets: [
        "Developed a full-stack URL shortening platform supporting custom aliases, password-protected links, expiration scheduling, and QR code generation.",
        "Designed and optimized a PostgreSQL-backed URL resolution system with indexed lookups and Redis caching, enabling low-latency redirects and reduced database load.",
        "Built a real-time dashboard using React and Recharts to visualize click metrics, visitor activity, geographic insights, and device statistics.",
        "Implemented JWT-based authentication and role-based access control with secure REST APIs, enabling personalized dashboards and protected administrative operations."
      ],
      links: {
        github: "https://github.com/SwamyBS-codes",
        live: "https://shortify-urlshortner.vercel.app/"
      }
    },
    {
      title: "Peer-to-Peer File Sharing Network",
      date: "Mar 2025",
      tech: ["Node.js", "WebRTC DataChannels", "DTLS", "Socket.io", "JavaScript"],
      icon: <Share2 className="w-6 h-6 text-purple-400" />,
      bullets: [
        "Engineered a fully decentralized P2P file-sharing system with zero central server dependency, eliminating single points of failure.",
        "Built a custom Node.js signaling server using Socket.io to orchestrate WebRTC offer/answer exchange and ICE candidate negotiation.",
        "Implemented a chunked transfer engine with checksum-based integrity verification, retry logic, and adaptive flow control reliably transmitting large files over unstable networks."
      ],
      links: {
        github: "https://github.com/SwamyBS-codes",
        live: "https://peer-share-rho.vercel.app/"
      }
    }
  ];

  return (
    <section id="projects" className="py-24 bg-gray-950/60 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Featured Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Practical applications highlighting performance tuning, web socket signaling, container orchestration, and full-stack API architectures.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {projectsList.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6 md:p-8 hover:bg-gray-900/60 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Info panel: columns 1-4 */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    {/* Date and Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-950 border border-gray-850 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        {project.icon}
                      </div>
                      <span className="text-xs font-mono text-gray-500 font-medium bg-gray-900/80 px-2.5 py-1 rounded-md border border-gray-850">
                        {project.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  {/* Tech stack & Links */}
                  <div className="mt-6 space-y-5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-gray-950 border border-gray-850/80 text-[10px] font-mono text-gray-400"
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
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-cyan-400 transition-colors px-3 py-1.5 rounded-lg bg-gray-950/80 border border-gray-850"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-cyan-400 transition-colors px-3 py-1.5 rounded-lg bg-gray-950/80 border border-gray-850"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details list: columns 5-12 */}
                <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-gray-800/80 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between">
                  <ul className="space-y-4">
                    {project.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 mt-2 shrink-0"></span>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Interactive Widgets Expand Triggers */}
                  <div className="mt-8 pt-6 border-t border-gray-850/50 flex flex-wrap gap-3">
                    {/* CloudOps controls */}
                    {idx === 0 && (
                      <>
                        <button
                          onClick={() => toggleWidget(0, 'arch')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                            activeWidgets[0] === 'arch'
                              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                              : 'bg-gray-950/50 border-gray-850 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                          }`}
                        >
                          <Network className="w-3.5 h-3.5" />
                          <span>{activeWidgets[0] === 'arch' ? 'Hide Blueprint' : 'Architecture Blueprint'}</span>
                        </button>
                        <button
                          onClick={() => toggleWidget(0, 'logs')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                            activeWidgets[0] === 'logs'
                              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                              : 'bg-gray-950/50 border-gray-850 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                          }`}
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>{activeWidgets[0] === 'logs' ? 'Hide Deploy Logs' : 'View Deploy Logs'}</span>
                        </button>
                      </>
                    )}

                    {/* Shortify controls */}
                    {idx === 1 && (
                      <>
                        <button
                          onClick={() => toggleWidget(1, 'arch')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                            activeWidgets[1] === 'arch'
                              ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400'
                              : 'bg-gray-950/50 border-gray-850 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                          }`}
                        >
                          <Network className="w-3.5 h-3.5" />
                          <span>{activeWidgets[1] === 'arch' ? 'Hide Blueprint' : 'Architecture Blueprint'}</span>
                        </button>
                        <button
                          onClick={() => toggleWidget(1, 'api')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                            activeWidgets[1] === 'api'
                              ? 'bg-purple-500/10 border-purple-500/40 text-purple-400'
                              : 'bg-gray-950/50 border-gray-850 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                          }`}
                        >
                          <Code className="w-3.5 h-3.5" />
                          <span>{activeWidgets[1] === 'api' ? 'Hide API Playground' : 'API Playground'}</span>
                        </button>
                        <button
                          onClick={() => toggleWidget(1, 'schema')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                            activeWidgets[1] === 'schema'
                              ? 'bg-blue-500/10 border-blue-500/40 text-blue-450'
                              : 'bg-gray-950/50 border-gray-850 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                          }`}
                        >
                          <Database className="w-3.5 h-3.5" />
                          <span>{activeWidgets[1] === 'schema' ? 'Hide DB Schema' : 'Database Schema'}</span>
                        </button>
                      </>
                    )}

                    {/* P2P File Share controls */}
                    {idx === 2 && (
                      <>
                        <button
                          onClick={() => toggleWidget(2, 'arch')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                            activeWidgets[2] === 'arch'
                              ? 'bg-purple-500/10 border-purple-500/40 text-purple-400'
                              : 'bg-gray-950/50 border-gray-850 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                          }`}
                        >
                          <Network className="w-3.5 h-3.5" />
                          <span>{activeWidgets[2] === 'arch' ? 'Hide Blueprint' : 'Architecture Blueprint'}</span>
                        </button>
                        <button
                          onClick={() => toggleWidget(2, 'throughput')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                            activeWidgets[2] === 'throughput'
                              ? 'bg-purple-500/10 border-purple-500/40 text-purple-400'
                              : 'bg-gray-950/50 border-gray-850 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                          }`}
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>{activeWidgets[2] === 'throughput' ? 'Hide Speed Test' : 'Throughput Simulator'}</span>
                        </button>
                        <button
                          onClick={() => toggleWidget(2, 'handshake')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                            activeWidgets[2] === 'handshake'
                              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                              : 'bg-gray-950/50 border-gray-850 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                          }`}
                        >
                          <Network className="w-3.5 h-3.5" />
                          <span>{activeWidgets[2] === 'handshake' ? 'Hide Handshake' : 'Signaling Handshake'}</span>
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

                {/* Shortify Widgets */}
                {idx === 1 && activeWidgets[1] === 'arch' && (
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
                {idx === 1 && activeWidgets[1] === 'api' && (
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
                {idx === 1 && activeWidgets[1] === 'schema' && (
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

                {/* P2P Share Widgets */}
                {idx === 2 && activeWidgets[2] === 'arch' && (
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
                {idx === 2 && activeWidgets[2] === 'throughput' && (
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
                {idx === 2 && activeWidgets[2] === 'handshake' && (
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
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
