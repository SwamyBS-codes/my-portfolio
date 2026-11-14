import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Achievements', id: 'achievements' },
  { name: 'Contact', id: 'contact' },
];

const Navbar = ({ openChatbot, openResumeModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollPosition = window.scrollY + 220;
      const ids = ['home', ...navItems.map((item) => item.id), 'contact'];
      for (let i = ids.length - 1; i >= 0; i -= 1) {
        const section = document.getElementById(ids[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openResume = () => {
    setIsOpen(false);
    openResumeModal();
  };

  return (
    <nav className={`glint-nav fixed top-0 inset-x-0 z-40 ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="glint-nav-inner">
        <button className="glint-wordmark" onClick={() => scrollTo('home')} aria-label="Go to home">
          SWAMY BS<span>.</span>
        </button>

        <div className="glint-nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={activeSection === item.id ? 'active' : ''}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="glint-nav-actions">
          <button className="glint-resume-link" onClick={openResume}>
            Resume <ArrowUpRight size={14} />
          </button>
          <button className="glint-mobile-toggle" onClick={() => setIsOpen((value) => !value)} aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen}>
            {isOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="glint-mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: .18 }}
          >
            <button className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollTo('home')}>Home</button>
            {navItems.map((item) => (
              <button key={item.id} className={activeSection === item.id ? 'active' : ''} onClick={() => scrollTo(item.id)}>{item.name}</button>
            ))}
            <button className="mobile-resume" onClick={openResume}>View resume <ArrowUpRight size={15} /></button>
            <button className="mobile-ai" onClick={() => { setIsOpen(false); openChatbot(); }}>Ask AI assistant <ArrowUpRight size={15} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
