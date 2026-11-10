import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Milestone, Download, FileText, CheckCircle2 } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const About = ({ openResumeModal }) => {
  const educationList = [
    {
      title: "B.E. — Information Science & Engineering",
      institution: "RV College of Engineering",
      duration: "Sept 2023 – June 2027",
      location: "Bengaluru, Karnataka",
      metric: "CGPA: 8.48 / 10.0",
      details: "Top engineering institution with comprehensive rigor across core Computer Science domains: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, and System Architecture.",
      coursework: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "Database Management Systems", "Object-Oriented Programming"]
    },
    {
      title: "Pre-University (PCMB)",
      institution: "GIPUC Channarayapattana",
      duration: "Mar 2021 – June 2023",
      location: "Hassan, Karnataka",
      metric: "Percentage: 94.6%",
      details: "Strong mathematical and scientific foundation with high academic distinction in Physics, Chemistry, Mathematics, and Biology.",
      coursework: ["Advanced Mathematics", "Calculus & Linear Algebra", "Physics & Problem Solving"]
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-950/70 relative border-t border-gray-900/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <Milestone className="w-3.5 h-3.5" />
            <span>Background & Academics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            About Me
          </h2>
          <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-2"></div>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Information Science undergraduate engineer focusing on scalable backend architectures, cloud deployment automation, and decentralized networking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Engineering Philosophy Card */}
          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard className="p-6 rounded-2xl bg-gray-900/40 border border-gray-850 hover:border-cyan-500/30 transition-all backdrop-blur-sm">
              <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Engineering Focus</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                I enjoy engineering low-latency backend systems, automating repetitive operational workflows, and designing reliable distributed architectures.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                From implementing custom CI/CD pipelines connecting GitHub Webhooks to Docker/EC2 staging to configuring WebRTC DataChannels for peer-to-peer file sharing without central servers, I strive for measurable throughput and reliability.
              </p>

              <div className="border-t border-gray-800/80 pt-4 space-y-2 text-xs font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>Current Base:</span>
                  <span className="text-gray-200">Bengaluru, Karnataka, IN</span>
                </div>
                <div className="flex justify-between">
                  <span>Undergrad CGPA:</span>
                  <span className="text-cyan-400 font-semibold">8.48 / 10.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-emerald-400 font-medium">Available for Roles</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href="/resume.pdf"
                  download="Swamy_BS_Resume.pdf"
                  className="flex-1 py-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-200 text-xs font-semibold text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={openResumeModal}
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-400 text-xs font-semibold text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
              </div>
            </SpotlightCard>
          </div>

          {/* Education Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Education Journey</span>
            </h3>

            <div className="space-y-5">
              {educationList.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <SpotlightCard className="p-6 rounded-2xl bg-gray-900/40 border border-gray-850 hover:border-cyan-500/30 transition-all group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-medium text-cyan-400 self-start sm:self-auto">
                      {item.metric}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-gray-400 mb-3">
                    <span className="text-gray-300 font-medium">{item.institution}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      {item.location}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
                    {item.details}
                  </p>

                  <div className="border-t border-gray-850/80 pt-3">
                    <span className="text-[11px] font-mono text-gray-500 block mb-1.5">Key Coursework:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-0.5 rounded bg-gray-950 border border-gray-850 text-[11px] font-mono text-gray-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
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
