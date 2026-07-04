import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Calendar, MapPin, Milestone } from 'lucide-react';

const About = () => {
  const cards = [
    {
      icon: <GraduationCap className="w-6 h-6 text-cyan-400" />,
      title: "BE - Information Science & Eng.",
      institution: "RV College of Engineering",
      duration: "Sept 2023 – Jun 2027",
      location: "Bengaluru, IN",
      details: "Top-tier technical university focused on engineering excellence. In-depth coursework in Data Structures, Algorithms, DBMS, Networking, and Operating Systems."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      title: "Pre-University (PCMB)",
      institution: "GIPUC Channarayapattana",
      duration: "Mar 2021 – Jun 2023",
      location: "Hassan, IN",
      details: "Strong academic foundation in Physics, Chemistry, Mathematics, and Biology with high merit scores."
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-950/60 relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] -translate-y-1/2"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Information Science student specializing in scalable backend engineering, automated cloud infrastructure, and distributed system design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Timeline & Bio */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Milestone className="w-4 h-4 text-cyan-400" />
                <span>Technical Focus</span>
              </h3>
              <p className="text-gray-450 text-sm leading-relaxed mb-4">
                Designing low-latency REST/gRPC APIs, optimizing PostgreSQL indexing and Redis caching, and configuring automated CI/CD deployment pipelines.
              </p>
              <p className="text-gray-450 text-sm leading-relaxed">
                Focused on high availability, container orchestration with Docker/NGINX, and solving complex DSA challenges.
              </p>
            </div>
          </div>

          {/* Education timeline */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 px-1">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Education Journey</span>
            </h3>
            
            <div className="space-y-6">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-gray-900/40 border border-gray-800/60 hover:border-gray-700/60 rounded-2xl p-6 transition-all hover:bg-gray-900/60 backdrop-blur-sm group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-950 border border-gray-850 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        {card.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">{card.title}</h4>
                        <p className="text-sm text-gray-400">{card.institution}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end text-xs font-mono text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {card.duration}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-450 leading-relaxed border-t border-gray-850/60 pt-4 mt-2">
                    {card.details}
                  </p>
                  
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-red-500/60" />
                    <span>{card.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
