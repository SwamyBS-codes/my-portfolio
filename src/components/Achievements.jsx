import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, ExternalLink, Trophy, Code, CheckCircle2 } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      title: "Runner-Up — Coding Chef",
      date: "May 2026",
      issuer: "Nagarjuna College of Engineering, Bengaluru",
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      details: "Secured runner-up position in an inter-college competitive programming tournament, solving multi-level Data Structures and Algorithms challenges spanning greedy approaches and dynamic programming under strict time limits.",
      tag: "DSA Competition",
      verification: "Certificate on Record"
    },
    {
      title: "Runner-Up — Coding Competition",
      date: "Sept 2025",
      issuer: "KLE Institutions, Bengaluru",
      icon: <Award className="w-5 h-5 text-cyan-400" />,
      details: "Solved complex algorithmic problems under time pressure, demonstrating real-time debugging, analytical speed, and edge-case handling.",
      tag: "Competitive Programming",
      verification: "Certificate on Record"
    },
    {
      title: "Introduction to Graph Algorithms",
      date: "April 2025",
      issuer: "NPTEL Academic Certification",
      icon: <BookOpen className="w-5 h-5 text-indigo-400" />,
      details: "Completed comprehensive coursework covering graph representations, shortest path algorithms (Dijkstra, Bellman–Ford), minimum spanning trees (Prim’s, Kruskal’s), topological sorting, and time-complexity analysis.",
      tag: "Academic Certification",
      verification: "NPTEL Verified"
    }
  ];

  return (
    <section id="achievements" className="py-24 bg-gray-950 relative border-t border-gray-900/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Certifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Achievements & Competitions
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Record of competitive coding tournaments, algorithmic contests, and theoretical computer science certifications.
          </p>
        </div>

        {/* LeetCode Profile Callout */}
        <div className="mb-10 p-5 rounded-2xl bg-gray-900/40 border border-gray-850 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Code className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white">Active LeetCode Problem Solver</h3>
              <p className="text-xs text-gray-400">Regularly practicing algorithms across Graphs, Dynamic Programming, and System Design</p>
            </div>
          </div>

          <a
            href="https://leetcode.com/u/SwamyBS18"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-950 border border-gray-800 text-xs font-semibold text-gray-200 hover:text-amber-400 hover:border-amber-500/40 transition-colors shrink-0"
          >
            <span>leetcode.com/u/SwamyBS18</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-gray-800 ml-4 sm:ml-6 space-y-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Node indicator */}
              <div className="absolute -left-[16px] top-1 w-8 h-8 rounded-full bg-gray-950 border-2 border-gray-800 flex items-center justify-center group-hover:border-cyan-500/60 transition-colors">
                {item.icon}
              </div>

              {/* Event Card */}
              <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-850 hover:border-gray-800 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-mono font-medium self-start">
                      {item.tag}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {item.verification}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{item.date}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-gray-400 mb-3">{item.issuer}</p>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {item.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
