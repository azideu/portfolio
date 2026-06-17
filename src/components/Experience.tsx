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

  const headingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  } as const;

  const headingItemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 120 } },
  } as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", damping: 22, stiffness: 100 },
    },
  } as const;

  return (
    <section
      id="experience"
      className="snap-section flex flex-col justify-center items-center px-6 py-20 relative scroll-reveal"
    >
      <div className="max-w-4xl w-full z-10 font-mono text-left">
        {/* Section Heading */}
        <motion.div
          className="mb-12"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.span
            variants={headingItemVariants}
            className="text-xs uppercase tracking-widest text-white/60 font-mono block mb-1"
          >
            03. Timeline
          </motion.span>
          <motion.h2
            variants={headingItemVariants}
            className="text-3xl md:text-5xl font-display font-bold text-slate-100 uppercase tracking-tight"
          >
            Education &amp; Milestones
          </motion.h2>
        </motion.div>

        {/* Timeline container — relative with animated left line */}
        <div className="relative pl-6 md:pl-10 ml-3 flex flex-col gap-10">
          {/* Animated vertical line — draws from top to bottom */}
          <motion.div
            className="absolute left-0 top-0 w-px bg-white/20"
            style={{ originY: 0 }}
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-10"
          >
            {educationTimeline.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                {/* Timeline Indicator Dot — scales in after the line draws */}
                <motion.div
                  className="absolute -left-[30px] md:-left-[46px] top-1.5 p-1 bg-black border border-white/40 text-white shadow-[0_0_8px_rgba(255,255,255,0.15)] group-hover:border-white group-hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 16, stiffness: 200, delay: 0.8 }}
                >
                  <GitCommit className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </motion.div>

                {/* Console Card */}
                <div className="console-panel rounded-lg overflow-hidden border border-white/10 hover:border-white/40 transition-colors flex flex-col tilt-card">
                  <div className="tilt-card-inner h-full flex flex-col">
                    {/* IDE Tab Header */}
                    <div className="bg-[#161616] border-b border-white/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-white" />
                        Education Log
                      </span>
                      <span className="text-white/40 font-normal lowercase">{item.commitId}</span>
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-display font-bold text-slate-200 group-hover:text-white transition-colors shuffle-text">
                            {item.degree}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {item.institution}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/20 rounded text-[10px] text-white font-mono self-start md:self-center font-bold">
                          <Calendar className="w-3 h-3" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                    <p className="text-slate-100 text-xs md:text-sm font-light leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Coursework details */}
                    <div className="mb-6">
                      <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-white" />
                        Key Coursework Focus:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.courses.map((course, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono text-white/90 bg-white/5 border border-white/10 px-2 py-1 rounded"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Milestones log */}
                    <div>
                      <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                        <GitMerge className="w-3.5 h-3.5 text-white" />
                        Academic Highlights:
                      </h4>
                      <ul className="list-none flex flex-col gap-2">
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-xs text-slate-100 flex items-start gap-2">
                            <span className="text-white mt-0.5">•</span>
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
      </div>
    </section>
  );
}
