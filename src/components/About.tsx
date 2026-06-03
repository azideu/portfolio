"use client";

import { motion } from "framer-motion";
import { Code2, Server, Layout, Settings, Languages, Terminal } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  } as const;

  const cardVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.3 },
    },
  } as const;

  const skillGroups = [
    {
      title: "Languages",
      icon: <Code2 className="w-4 h-4 text-[#00d2ff]" />,
      skills: ["Java", "PHP", "JavaScript", "SQL", "C# (.NET)", "C++", "Python"],
      branch: "Programming Languages",
    },
    {
      title: "Web Development",
      icon: <Server className="w-4 h-4 text-[#00d2ff]" />,
      skills: ["HTML5", "CSS3", "React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "MySQL", "PostgreSQL"],
      branch: "Web Stack (Frontend & Backend)",
    },
    {
      title: "UI/UX & Design",
      icon: <Layout className="w-4 h-4 text-[#00d2ff]" />,
      skills: [
        "Responsive Layouts",
        "Micro-interactions",
        "Component Architectures",
        "Typography Hierarchy",
        "Minimalist Aesthetics",
      ],
      branch: "UI/UX & Design Principles",
    },
    {
      title: "Tools & Envs",
      icon: <Settings className="w-4 h-4 text-[#00d2ff]" />,
      skills: ["macOS / Unix Development", "Git versioning"],
      branch: "Development Tools",
    },
  ];

  const languages = [
    { name: "English", level: "Professional" },
    { name: "Malay", level: "Native" },
    { name: "Japanese", level: "Conversational" },
  ];

  return (
    <section
      id="about"
      className="snap-section flex flex-col justify-center items-center px-6 py-20 relative scroll-reveal"
    >
      <div className="max-w-6xl w-full z-10 font-mono text-left">
        {/* Section Heading */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-widest text-[#00d2ff]/60 font-mono block mb-1">
            01. Background
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 uppercase tracking-tight">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Summary / Left text */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Profile Panel */}
            <div className="console-panel rounded-lg overflow-hidden shadow-xl tilt-card">
              <div className="tilt-card-inner">
                <div className="bg-[#0b131f] border-b border-[#00d2ff]/10 px-4 py-2 flex items-center justify-between">
                  <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#00d2ff]" />
                    Profile Summary
                  </span>
                  <span className="text-[9px] text-[#00d2ff]/40">Read Time: 1 min</span>
                </div>
                <div className="p-6 text-sm text-slate-350 leading-relaxed font-light flex flex-col gap-4">
                  <p>
                    I am a software engineering enthusiast with a solid academic base in Computer Science. 
                    My focus lies in building clean systems programming, structured database design, and robust backend logic.
                  </p>
                  <p>
                    I enjoy bridging the gap between performance-oriented systems and sleek, modular frontends, 
                    always prioritizing readability, semantic standards, and optimal user experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Spoken Languages Box */}
            <div className="console-panel p-5 rounded-lg tilt-card">
              <div className="tilt-card-inner">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-[#00d2ff]" />
                  Spoken Languages
                </h3>
                <div className="flex flex-col gap-3 font-mono text-xs">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-[#00d2ff]/5 pb-2 last:border-0 last:pb-0">
                      <span className="text-slate-200">{lang.name}</span>
                      <span className="text-[#00d2ff] font-mono font-bold bg-[#00d2ff]/5 border border-[#00d2ff]/20 px-2 py-0.5 rounded">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills / Right grid */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {skillGroups.map((group, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="console-panel p-5 rounded-lg border border-[#00d2ff]/10 flex flex-col justify-between hover:border-[#00d2ff]/40 transition-colors tilt-card"
                >
                  <div className="tilt-card-inner">
                    {/* Path / Directory header */}
                    <div className="text-[10px] text-slate-550 mb-3 border-b border-[#00d2ff]/5 pb-2 flex justify-between">
                      <span>{group.branch}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {group.icon}
                      <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
                        {group.title}
                      </h3>
                    </div>

                    <ul className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] font-mono text-[#00d2ff] bg-[#00d2ff]/5 border border-[#00d2ff]/10 px-2 py-1 hover:bg-[#00d2ff]/10 hover:border-[#00d2ff]/30 transition-all cursor-pointer"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
