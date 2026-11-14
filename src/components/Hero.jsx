import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Sparkles } from 'lucide-react';
import P2PNetworkBackground from './P2PNetworkBackground';
import portrait from '../assets/my_image.png';

const Hero = ({ openChatbot, openResumeModal }) => {
  const scene = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 90, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), { stiffness: 90, damping: 18 });

  const handleMove = (event) => {
    if (!scene.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = scene.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetScene = () => { px.set(0); py.set(0); };

  return (
    <section id="home" className="hero-scene relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      <P2PNetworkBackground />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-layout relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <div className="hero-kicker"><span className="status-dot" /> Bengaluru, India <i /> RVCE ’27</div>
          <p className="hero-eyebrow">HELLO, I AM</p>
          <h1 className="hero-name">SWAMY <span>B S</span></h1>
          <h2 className="hero-role">Full Stack Engineer.</h2>
          <p className="hero-lede">Information Science student at RVCE building full-stack applications and distributed systems with React, Node.js, WebRTC, Docker, and AWS.</p>
          <div className="hero-actions">
            <button className="button-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Explore my work <ArrowUpRight size={16} /></button>
            <a className="button-quiet" href="/resume.pdf" download="Swamy_BS_Resume.pdf"><Download size={15} /> Resume</a>
            <button className="hero-ai-link" onClick={openResumeModal}>Preview resume</button>
            <button className="hero-ai-link" onClick={openChatbot}><Sparkles size={15} /> Ask AI</button>
          </div>
          <div className="hero-meta"><span>Currently open to internships</span><span className="meta-rule" /><span>Backend · Cloud · Networking</span></div>
        </motion.div>

        <div className="hero-art" ref={scene} onMouseMove={handleMove} onMouseLeave={resetScene}>
          <div className="art-label art-label-top"><span>ABOUT ME</span><b>01 — 04</b></div>
          <motion.div className="portrait-stage" style={{ rotateX, rotateY }}>
            <div className="portrait-backplate" />
            <div className="portrait-frame" onContextMenu={(event) => event.preventDefault()}>
              <img src={portrait} alt="Swamy B S in a light blue shirt" draggable="false" />
              <div className="portrait-shade" />
              <div className="portrait-stamp"><span>SWAMY B S</span><b>ISE · RVCE ’27</b></div>
            </div>
            <span className="portrait-corner corner-tl" /><span className="portrait-corner corner-br" />
            <div className="portrait-float"><span className="portrait-float-dot" /><div><b>Building in Bengaluru</b><small>Backend · Cloud · P2P</small></div></div>
          </motion.div>
          <div className="art-caption"><span>FIG 01</span><span>Software & systems</span><ArrowDown size={14} /></div>
        </div>
      </div>
      <button className="scroll-cue" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></button>
    </section>
  );
};

export default Hero;
