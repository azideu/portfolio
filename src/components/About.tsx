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
        "Flexbox & CSS Grid",
        "Tailwind Styling",
        "Mobile-First Coding",
        "Basic CSS Transitions",
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* Profile Panel */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 md:col-span-2 lg:col-span-8 flex flex-col"
          >
            <div className="console-panel rounded-lg overflow-hidden border border-[#00d2ff]/10 hover:border-[#00d2ff]/40 transition-colors flex-1 flex flex-col tilt-card">
              <div className="tilt-card-inner h-full flex flex-col">
                <div className="bg-[#0b131f] border-b border-[#00d2ff]/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#00d2ff]" />
                    Profile Summary
                  </span>
                  <span className="text-[#00d2ff]/40 font-normal">read_time: 1min</span>
                </div>
                <div className="p-5 md:p-6 text-xs md:text-sm text-slate-100 leading-relaxed font-light flex flex-col gap-4 flex-1 justify-center">
                  <p>
                    I am an aspiring software engineer with a solid computer science foundation, seeking developer internships or junior roles. My core focus is on building responsive web interfaces, writing clean backend logic, and designing relational database systems across both web and desktop environments.
                  </p>
                  <p>
                    I enjoy bridging the gap between user-centered designs and performant architectures, utilizing tools like React, Next.js, Node.js, Java, and PHP to build reliable, end-to-end software solutions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Spoken Languages Box */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col"
          >
            <div className="console-panel rounded-lg overflow-hidden border border-[#00d2ff]/10 hover:border-[#00d2ff]/40 transition-colors flex-1 flex flex-col tilt-card">
              <div className="tilt-card-inner h-full flex flex-col">
                <div className="bg-[#0b131f] border-b border-[#00d2ff]/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-[#00d2ff]" />
                    Spoken Languages
                  </span>
                  <span className="text-[#00d2ff]/40 font-normal">locales</span>
                </div>
                <div className="p-5 md:p-6 flex flex-col justify-center gap-3 flex-1">
                  <div className="flex flex-col gap-3 font-mono text-xs">
                    {languages.map((lang, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-[#00d2ff]/5 pb-2 last:border-0 last:pb-0">
                        <span className="text-slate-100">{lang.name}</span>
                        <span className="text-[#00d2ff] font-mono font-bold bg-[#00d2ff]/5 border border-[#00d2ff]/20 px-2 py-0.5 rounded">
                          {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technical Skills */}
          {skillGroups.map((group, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="col-span-1 md:col-span-1 lg:col-span-6 flex flex-col"
            >
              <div className="console-panel rounded-lg overflow-hidden border border-[#00d2ff]/10 hover:border-[#00d2ff]/40 transition-colors flex-1 flex flex-col tilt-card">
                <div className="tilt-card-inner h-full flex flex-col">
                  {/* IDE Tab Header */}
                  <div className="bg-[#0b131f] border-b border-[#00d2ff]/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      {group.icon}
                      {group.title}
                    </span>
                    <span className="text-[#00d2ff]/40 font-normal lowercase">{group.branch}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col justify-center">
                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((skill, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] font-mono text-[#00d2ff] bg-[#00d2ff]/5 border border-[#00d2ff]/10 px-2.5 py-1 hover:bg-[#00d2ff]/10 hover:border-[#00d2ff]/30 transition-all cursor-pointer rounded-sm"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
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
