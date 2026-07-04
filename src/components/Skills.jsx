import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Monitor, Server, Database, Cloud, Wrench } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      skills: ["C", "C++", "JavaScript (ES6+)", "Python"],
      accentClass: "shadow-cyan-500/5 hover:border-cyan-500/40"
    },
    {
      title: "Backend & Networking",
      icon: <Server className="w-5 h-5 text-indigo-400" />,
      skills: ["Node.js", "Express.js", "REST APIs", "WebRTC", "Socket.io"],
      accentClass: "shadow-indigo-500/5 hover:border-indigo-500/40"
    },
    {
      title: "Frontend",
      icon: <Monitor className="w-5 h-5 text-purple-400" />,
      skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3"],
      accentClass: "shadow-purple-500/5 hover:border-purple-500/40"
    },
    {
      title: "Databases & Caching",
      icon: <Database className="w-5 h-5 text-pink-400" />,
      skills: ["PostgreSQL", "Redis", "MongoDB", "MySQL"],
      accentClass: "shadow-pink-500/5 hover:border-pink-500/40"
    },
    {
      title: "Cloud & Infrastructure",
      icon: <Cloud className="w-5 h-5 text-blue-400" />,
      skills: ["Docker", "NGINX", "AWS EC2", "GitHub Webhooks", "Bash scripting"],
      accentClass: "shadow-blue-500/5 hover:border-blue-500/40"
    },
    {
      title: "Tools & Collaboration",
      icon: <Wrench className="w-5 h-5 text-emerald-400" />,
      skills: ["Git", "GitHub", "Postman"],
      accentClass: "shadow-emerald-500/5 hover:border-emerald-500/40"
    }
  ];

  return (
    <section id="skills" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Mesh/Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Technical Skill Hub</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Categorized technical capabilities spanning low-level system programming languages, modern frameworks, and deployment orchestration.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-gray-900/30 border border-gray-850 hover:bg-gray-900/50 rounded-2xl p-6 transition-all duration-300 shadow-md ${category.accentClass} group`}
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gray-950 border border-gray-850 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-bold text-gray-200 group-hover:text-white transition-colors">{category.title}</h3>
              </div>

              {/* Skills list */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-850 hover:border-gray-700 text-xs font-mono text-gray-400 hover:text-gray-200 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
