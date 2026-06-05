"use client";

import { motion } from "framer-motion";
import { Calendar, BookOpen, GitMerge, GitCommit } from "lucide-react";

export default function Experience() {
  const educationTimeline = [
    {
      institution: "Universiti Teknologi MARA (UiTM) Cawangan Terengganu",
      degree: "Diploma in Computer Science (CDCS110)",
      period: "ONGOING",
      description: "Rigorous curriculum focused on software engineering, object-oriented design, database design, and systems logic, complemented by specialized elective tracks in cybersecurity and visual programming.",
      courses: [
        "Web & Mobile Applications",
        "Database Design",
        "Information System Development",
        "Data Communication & Networking",
        "Computer Security & Cybersecurity",
        "Data Structures & Algorithms",
      ],
      highlights: [
        "Developed 'UiTM STEP' freelance marketplace platform using PHP and MySQL for CSC264 & ISP250 project.",
        "Built a dual-interface Smart Home simulation utilizing Java Swing GUI and OOP design for CSC186.",
        "Engineered 'EcoRevive' E-Waste inventory tracking desktop application with JavaFX and Maven.",
      ],
      commitId: "commit df687e1",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "tween", duration: 0.35 },
    },
  } as const;

  return (
    <section
      id="experience"
      className="snap-section flex flex-col justify-center items-center px-6 py-20 relative scroll-reveal"
    >
      <div className="max-w-4xl w-full z-10 font-mono text-left">
        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#00d2ff]/60 font-mono block mb-1">
            03. Timeline
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 uppercase tracking-tight">
            Education &amp; Milestones
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l border-[#00d2ff]/20 pl-6 md:pl-10 ml-3 flex flex-col gap-10"
        >
          {educationTimeline.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[30px] md:-left-[46px] top-1.5 p-1 bg-[#05070a] border border-[#00d2ff]/40 text-[#00d2ff] shadow-[0_0_8px_rgba(0,210,255,0.2)] group-hover:border-[#00d2ff] group-hover:shadow-[0_0_12px_rgba(0,210,255,0.4)] transition-all duration-300">
                <GitCommit className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>

              {/* Console Card */}
              <div className="console-panel rounded-lg overflow-hidden border border-[#00d2ff]/10 hover:border-[#00d2ff]/40 transition-colors flex flex-col tilt-card">
                <div className="tilt-card-inner h-full flex flex-col">
                  {/* IDE Tab Header */}
                  <div className="bg-[#0b131f] border-b border-[#00d2ff]/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#00d2ff]" />
                      Education Log
                    </span>
                    <span className="text-[#00d2ff]/40 font-normal lowercase">{item.commitId}</span>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-display font-bold text-slate-200 group-hover:text-[#00d2ff] transition-colors shuffle-text">
                          {item.degree}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {item.institution}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00d2ff]/5 border border-[#00d2ff]/20 rounded text-[10px] text-[#00d2ff] font-mono self-start md:self-center font-bold">
                        <Calendar className="w-3 h-3" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                  <p className="text-slate-350 text-xs md:text-sm font-light leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Coursework details */}
                  <div className="mb-6">
                    <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#00d2ff]" />
                      Key Coursework Focus:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.courses.map((course, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono text-[#00d2ff]/90 bg-[#00d2ff]/5 border border-[#00d2ff]/10 px-2 py-1 rounded"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Milestones log */}
                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                      <GitMerge className="w-3.5 h-3.5 text-[#00d2ff]" />
                      Academic Highlights:
                    </h4>
                    <ul className="list-none flex flex-col gap-2">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                          <span className="text-[#00d2ff] mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
