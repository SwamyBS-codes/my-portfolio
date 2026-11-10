import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Monitor, Server, Database, Cloud, Wrench, BookOpen, Layers 
} from 'lucide-react';

export function Skills() {
  const categories = [
    {
      id: "languages",
      title: "Programming Languages",
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      skills: [
        { name: "C++", logo: "/logos/cplusplus.svg" },
        { name: "C", logo: "/logos/c.svg" },
        { name: "JavaScript", logo: "/logos/javascript.svg" },
        { name: "Python", logo: "/logos/python.svg" },
        { name: "SQL", logo: "/logos/sql.svg" },
      ]
    },
    {
      id: "frontend",
      title: "Frontend",
      icon: <Monitor className="w-5 h-5 text-purple-400" />,
      skills: [
        { name: "React.js", logo: "/logos/react.svg" },
        { name: "Tailwind CSS", logo: "/logos/tailwindcss.svg" },
        { name: "Vite", logo: "/logos/vite.svg" },
        { name: "HTML5", logo: "/logos/html5.svg" },
        { name: "CSS3", logo: "/logos/css3.svg" },
      ]
    },
    {
      id: "backend",
      title: "Backend",
      icon: <Server className="w-5 h-5 text-indigo-400" />,
      skills: [
        { name: "Node.js", logo: "/logos/nodejs.svg" },
        { name: "Express.js", logo: "/logos/express.svg" },
        { name: "WebRTC", logo: "/logos/webrtc.svg" },
        { name: "Socket.io", logo: "/logos/socketio.svg" },
        { name: "JWT", logo: "/logos/jwt.svg" },
      ]
    },
    {
      id: "databases",
      title: "Databases",
      icon: <Database className="w-5 h-5 text-pink-400" />,
      skills: [
        { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
        { name: "Redis", logo: "/logos/redis.svg" },
        { name: "MongoDB", logo: "/logos/mongodb.svg" },
        { name: "MySQL", logo: "/logos/mysql.svg" },
      ]
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      icon: <Cloud className="w-5 h-5 text-blue-400" />,
      skills: [
        { name: "AWS", logo: "/logos/aws.svg" },
        { name: "Docker", logo: "/logos/docker.svg" },
        { name: "NGINX", logo: "/logos/nginx.svg" },
        { name: "Linux", logo: "/logos/linux.svg" },
        { name: "Vercel", logo: "/logos/vercel.svg" },
      ]
    },
    {
      id: "tools",
      title: "Tools",
      icon: <Wrench className="w-5 h-5 text-emerald-400" />,
      skills: [
        { name: "Git", logo: "/logos/git.svg" },
        { name: "GitHub", logo: "/logos/github.svg" },
        { name: "Postman", logo: "/logos/postman.svg" },
      ]
    }
  ];

  const coreCS = [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Computer Networks",
    "Database Management Systems (DBMS)",
    "Object-Oriented Programming (OOP)"
  ];

  return (
    <section id="skills" className="py-24 bg-gray-950 relative border-t border-gray-900/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Technical Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Technical Skills
          </h2>
          <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-2"></div>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Technologies and core engineering tools separated by layer.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-gray-900/40 border border-gray-850 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all flex flex-col justify-between"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-800/80">
                <div className="p-2 rounded-lg bg-gray-950 border border-gray-800 shrink-0">
                  {cat.icon}
                </div>
                <h3 className="text-base font-semibold text-white">
                  {cat.title}
                </h3>
              </div>

              {/* Only Logo + Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-950/70 border border-gray-850/80 hover:border-cyan-500/40 hover:bg-gray-950 transition-all duration-150 group cursor-default"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gray-900/80 border border-gray-800 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-cyan-400 transition-colors truncate">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Computer Science Foundations Row */}
        <div className="mt-8 p-6 rounded-2xl bg-gray-900/40 border border-gray-850">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-800/80">
            <div className="p-2 rounded-lg bg-gray-950 border border-gray-800 shrink-0">
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Core Computer Science
              </h3>
              <p className="text-xs text-gray-400 font-mono">Foundations & Coursework</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {coreCS.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-gray-950/80 border border-gray-850 text-xs font-mono text-gray-300 hover:border-gray-700 hover:text-white transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
