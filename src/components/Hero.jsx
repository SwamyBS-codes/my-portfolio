import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, FileText, Code2, Cpu, Globe2, ShieldCheck } from 'lucide-react';
import P2PNetworkBackground from './P2PNetworkBackground';
import SpotlightCard from './SpotlightCard';

const Hero = ({ openChatbot, openResumeModal }) => {
  const highlights = [
    {
      icon: <Cpu className="w-4 h-4 text-cyan-400" />,
      title: "Automated AWS CI/CD",
      desc: "Git push ➔ Docker build ➔ ECR push ➔ EC2 deploy"
    },
    {
      icon: <Globe2 className="w-4 h-4 text-indigo-400" />,
      title: "WebRTC P2P Protocols",
      desc: "Browser-to-browser transfers with zero server storage"
    },
    {
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      title: "RV College of Engineering",
      desc: "B.E. in Information Science • CGPA: 8.48 / 10.0"
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
      title: "Competitive DSA",
      desc: "2x Inter-College Coding Contest Runner-Up"
    }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden bg-gray-950/40"
    >
      {/* Living Interactive P2P Network Topology Canvas */}
      <P2PNetworkBackground />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center">
        {/* Availability Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-900/90 border border-gray-800 text-xs font-mono text-gray-300 mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Open to Software Engineering Internships & Full-Time Roles</span>
          <span className="text-gray-600">•</span>
          <span className="text-cyan-400 font-medium">RVCE '27</span>
        </motion.div>

        {/* Engineer Name with Ambient Aurora Glow & Holographic Gradient Shimmer */}
        <div className="relative inline-block mb-4">
          <motion.div
            animate={{ 
              opacity: [0.25, 0.55, 0.25], 
              scale: [0.95, 1.08, 0.95]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-indigo-500/15 to-purple-500/20 rounded-full blur-2xl -z-10 pointer-events-none"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 via-indigo-300 to-cyan-400 animate-text-shimmer drop-shadow-[0_0_35px_rgba(6,182,212,0.3)]">Swamy B S</span>
          </motion.h1>
        </div>

        {/* Core Specialization Subtitle */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-6"
        >
          Distributed Backend Systems, WebRTC P2P & Cloud Infrastructure
        </motion.h2>

        {/* Overview Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto text-base text-gray-400 leading-relaxed mb-10"
        >
          Information Science and Engineering student at <strong className="text-gray-200 font-semibold">RV College of Engineering</strong>, Bengaluru. 
          Specializing in automated self-service CI/CD pipelines (Docker / AWS EC2 & ECR), 
          low-latency browser-to-browser P2P networks via WebRTC, and production API architectures.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold text-sm transition-all shadow-md shadow-cyan-500/10 cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="/resume.pdf"
            download="Swamy_BS_Resume.pdf"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-850 text-gray-200 font-medium text-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download Resume (PDF)</span>
          </a>

          <button
            onClick={openResumeModal}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-gray-700 text-gray-300 font-medium text-sm transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-gray-400" />
            <span>Preview Resume</span>
          </button>

          <button
            onClick={openChatbot}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-medium text-xs sm:text-sm transition-all cursor-pointer shadow-sm shadow-cyan-500/10 hover:shadow-cyan-500/20"
            title="Ask Swamy's AI Assistant"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Ask AI Assistant</span>
          </button>
        </motion.div>

        {/* Engineering Highlights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left"
        >
          {highlights.map((h, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <SpotlightCard className="p-4 rounded-xl bg-gray-900/50 border border-gray-850 hover:border-cyan-500/40 transition-all backdrop-blur-sm h-full">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-gray-950 border border-gray-800">
                    {h.icon}
                  </div>
                  <h3 className="text-xs font-semibold text-gray-200">{h.title}</h3>
                </div>
                <p className="text-[11px] font-mono text-gray-400 leading-tight">
                  {h.desc}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
