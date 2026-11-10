import React, { useEffect, useRef } from 'react';

const P2PNetworkBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const parent = containerRef.current || canvas.parentElement;
    let width = parent ? parent.offsetWidth : window.innerWidth;
    let height = parent ? parent.offsetHeight : window.innerHeight;

    const mouse = {
      x: null,
      y: null,
      radius: 140
    };

    let isVisible = true;

    // Handle high DPI
    const resizeCanvas = () => {
      if (!canvas) return;
      const curParent = containerRef.current || canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = curParent ? curParent.offsetWidth : window.innerWidth;
      height = curParent ? curParent.offsetHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    // Color palette matching the portfolio theme
    const colors = [
      { r: 6, g: 182, b: 212 },   // cyan-500
      { r: 56, g: 189, b: 248 },  // sky-400
      { r: 99, g: 102, b: 241 },  // indigo-500
      { r: 168, g: 85, b: 247 },  // purple-500
      { r: 224, g: 242, b: 254 }  // sky-100 (subtle highlight)
    ];

    let particles = [];
    let packets = [];

    const initParticles = () => {
      particles = [];
      packets = [];
      // Calculate particle density based on screen size
      const count = Math.min(Math.max(Math.floor((width * height) / 16000), 32), 65);

      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 1.2,
          color,
          baseAlpha: Math.random() * 0.4 + 0.35,
          phase: Math.random() * Math.PI * 2,
          flash: 0
        });
      }
    };

    // Track mouse coordinates on container
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const container = containerRef.current || canvas.parentElement;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    window.addEventListener('resize', resizeCanvas);

    // Pause animation when scrolled out of view to save battery/GPU
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    resizeCanvas();

    let lastPacketTime = performance.now();

    const draw = (timestamp) => {
      if (!isVisible || document.hidden) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const maxDist = width < 640 ? 95 : 135;
      const mouseDistThreshold = mouse.radius;

      // Spawn occasional P2P data packets between connected nodes
      if (timestamp - lastPacketTime > 650 && particles.length > 2) {
        lastPacketTime = timestamp;
        const srcIdx = Math.floor(Math.random() * particles.length);
        const p1 = particles[srcIdx];
        
        // Find a nearby node
        for (let j = 0; j < particles.length; j++) {
          if (srcIdx === j) continue;
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            packets.push({
              x1: p1.x,
              y1: p1.y,
              x2: p2.x,
              y2: p2.y,
              progress: 0,
              speed: 0.016 + Math.random() * 0.012,
              target: p2,
              color: p1.color
            });
            break;
          }
        }
      }

      // 1. Draw connection links between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Interactive mouse connections
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseDistThreshold) {
            const alpha = (1 - dist / mouseDistThreshold) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Very gentle hover attraction
            p.x += (mouse.x - p.x) * 0.003;
            p.y += (mouse.y - p.y) * 0.003;
          }
        }
      }

      // 3. Update & render data packets (transmitting pulses)
      for (let i = packets.length - 1; i >= 0; i--) {
        const pkt = packets[i];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          pkt.target.flash = 1; // Trigger node receive flash
          packets.splice(i, 1);
          continue;
        }

        const currX = pkt.x1 + (pkt.x2 - pkt.x1) * pkt.progress;
        const currY = pkt.y1 + (pkt.y2 - pkt.y1) * pkt.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
        ctx.shadowColor = `rgba(${pkt.color.r}, ${pkt.color.g}, ${pkt.color.b}, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // 4. Update & draw particles (nodes)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently at borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Twinkle phase
        p.phase += 0.025;
        const currentAlpha = Math.min(
          1,
          p.baseAlpha + Math.sin(p.phase) * 0.15 + (p.flash > 0 ? p.flash * 0.5 : 0)
        );

        if (p.flash > 0) {
          p.flash -= 0.04;
          if (p.flash < 0) p.flash = 0;
        }

        // Draw particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (p.flash > 0 ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
        ctx.fill();

        // Extra soft outer halo for brighter nodes
        if (currentAlpha > 0.45) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.25})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0"
      style={{
        maskImage: 'radial-gradient(ellipse 90% 85% at 50% 45%, black 45%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 45%, black 45%, transparent 100%)'
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
      />
    </div>
  );
};

export default P2PNetworkBackground;
