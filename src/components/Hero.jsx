import React from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, ArrowRight, Code } from 'lucide-react';

const Hero = ({ toggleTerminal }) => {
  const words = ["Full Stack Engineer", "Systems Enthusiast", "DevOps Builder"];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gray-950"
    >
      {/* Mesh/Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Code Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono font-medium mb-6"
        >
          <Code className="w-3.5 h-3.5" />
          <span>System.out.println("Hello World!");</span>
        </motion.div>

        {/* Introduction */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Swamy B S</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-3xl font-bold text-gray-300 mb-6"
        >
          Backend Systems, Cloud Platforms & System Design
        </motion.h2>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed mb-10"
        >
          Information Science student at <span className="text-gray-200 font-semibold">RV College of Engineering</span>. 
          Specializing in low-latency WebRTC file sharing, automated container orchestration (Docker/NGINX/AWS), 
          and scalable backend architecture.
        </motion.p>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={toggleTerminal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-850 text-gray-200 font-semibold text-sm font-mono transition-all cursor-pointer"
          >
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span>Launch CLI Terminal</span>
          </button>
        </motion.div>

        {/* Monospace Helper Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-4 text-xs font-mono text-gray-500"
        >
          Try running <code className="bg-gray-900 px-1.5 py-0.5 rounded border border-gray-800 text-cyan-400">help</code> in the terminal
        </motion.div>
      </div>

      {/* Down arrow/Scroll prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border border-gray-700 rounded-full flex justify-center p-1"
        >
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
