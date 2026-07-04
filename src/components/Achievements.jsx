import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, ExternalLink, Trophy, Code } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      title: "Runner-Up — Coding Chef",
      date: "May 2026",
      issuer: "Nagarjuna College of Engineering, Bengaluru",
      icon: <Trophy className="w-5 h-5 text-cyan-400" />,
      details: "Secured runner-up position by solving multi-level Data Structures and Algorithms challenges spanning greedy approaches and dynamic programming under strict time limits.",
      tag: "DSA Competition"
    },
    {
      title: "Runner-Up — Coding Competition",
      date: "Sept 2025",
      issuer: "KLE Institutes, Bengaluru",
      icon: <Award className="w-5 h-5 text-indigo-400" />,
      details: "Solved complex algorithmic problems under time pressure, demonstrating strong real-time debugging and problem-solving abilities.",
      tag: "Competitive Programming"
    },
    {
      title: "Introduction to Graph Algorithms",
      date: "April 2025",
      issuer: "NPTEL",
      icon: <BookOpen className="w-5 h-5 text-purple-400" />,
      details: "Completed an in-depth course on graph algorithms including shortest path (Dijkstra, Bellman–Ford), minimum spanning trees (Prim’s, Kruskal’s), and DFS-based traversal techniques with complexity analysis.",
      tag: "Certification Course"
    }
  ];

  return (
    <section id="achievements" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Grid lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293706_1px,transparent_1px),linear-gradient(to_bottom,#1f293706_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Achievements & Certifications</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Chronological log of competitive programming awards and academic certifications.
          </p>
        </div>

        {/* Leetcode Quick Link Bar */}
        <div className="mb-12 bg-gray-900/35 border border-gray-850 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-200 text-sm sm:text-base">Active LeetCode Programmer</h3>
              <p className="text-xs text-gray-500">Regular problem solver testing algorithms daily</p>
            </div>
          </div>
          <a
            href="https://leetcode.com/u/SwamyBS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-950 border border-gray-880 text-xs font-semibold text-gray-300 hover:text-orange-400 transition-colors hover:border-orange-500/30"
          >
            <span>leetcode.com/u/SwamyBS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-gray-800 ml-4 sm:ml-6 space-y-12">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative pl-8 sm:pl-10"
            >
              {/* Timeline marker node */}
              <div className="absolute -left-[16px] top-1 w-8 h-8 rounded-full bg-gray-950 border-2 border-gray-800 flex items-center justify-center shadow-lg shadow-black/80">
                {item.icon}
              </div>

              {/* Event Card */}
              <div className="bg-gray-900/40 border border-gray-855 hover:border-gray-700/60 rounded-2xl p-6 backdrop-blur-sm transition-all group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/15 text-[10px] font-mono font-semibold self-start">
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono text-gray-500">{item.date}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs font-mono text-gray-400 mb-3">{item.issuer}</p>
                
                <p className="text-gray-450 text-sm leading-relaxed border-t border-gray-850/50 pt-3">
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
