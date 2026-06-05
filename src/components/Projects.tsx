"use client";

import { motion } from "framer-motion";
import { FolderDot, Server, Terminal, ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  role?: string;
  type: "featured" | "secondary";
  github: string;
  fileSize: string;
  filePerms: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: "uitm-step",
      title: "uitm-step",
      description: "A web-based freelance marketplace platform developed for UiTM students to showcase skills and secure project collaborations, featuring a custom PHP backend, MySQL relational database, and user authentication workflows.",
      tech: ["PHP", "MySQL", "Tailwind CSS", "Apache"],
      role: "CSC264 & ISP250 Group Project",
      type: "featured",
      github: "https://github.com/azideu/uitm-step",
      fileSize: "142.4 KB",
      filePerms: "-rwx------",
    },
    {
      id: "mainichi",
      title: "Mainichi",
      description: "A mobile-first Japanese language learning platform featuring tactile 3D elements, smooth animations, and an SRS flashcard system for vocabulary/grammar mastery. Built with a React frontend and Node.js/Express/MySQL backend.",
      tech: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
      role: "Personal Web Application",
      type: "featured",
      github: "https://github.com/azideu/Mainichi",
      fileSize: "88.9 KB",
      filePerms: "-rwx--x--x",
    },
    {
      id: "ecorevive",
      title: "EcoRevive",
      description: "A JavaFX desktop application designed to log, manage, and monitor electronic waste (E-Waste) recycling, featuring a custom dark-themed GUI, live analytical charts, queue management, and CSV data export.",
      tech: ["Java", "JavaFX", "CSS", "Maven"],
      type: "secondary",
      github: "https://github.com/azideu/EcoRevive",
      fileSize: "44.1 KB",
      filePerms: "-rwxr-xr-x",
    },
    {
      id: "smarthomesystem",
      title: "SmartHomeSystem",
      description: "A Java-based smart home environment simulation allowing control of devices like lights and thermostats, featuring user authentication, device logging, and a dual Java Swing GUI / terminal CLI interface.",
      tech: ["Java", "Java Swing", "AWT"],
      type: "secondary",
      github: "https://github.com/azideu/SmartHomeSystem",
      fileSize: "61.0 KB",
      filePerms: "-rwxr-xr-x",
    },
    {
      id: "framr",
      title: "framr",
      description: "A premium client-side web application for photographers to format images with professional gallery-style matte frames and borders. Preserves 100% of image dimensions during export via an offscreen HTML5 canvas solver.",
      tech: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
      type: "secondary",
      github: "https://github.com/azideu/framr",
      fileSize: "112.5 KB",
      filePerms: "-rwxr-xr-x",
    },
  ];

  const featuredProjects = projects.filter((p) => p.type === "featured");
  const secondaryProjects = projects.filter((p) => p.type === "secondary");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  } as const;

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.35 },
    },
  } as const;

  return (
    <section
      id="projects"
      className="snap-section flex flex-col justify-center items-center px-6 py-20 relative scroll-reveal"
    >
      <div className="max-w-6xl w-full z-10 font-mono text-left">
        {/* Section Heading */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-widest text-[#00d2ff]/60 font-mono block mb-1">
            02. Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 uppercase tracking-tight">
            Selected Works
          </h2>
        </div>

        {/* Layout Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8"
        >
          {/* Asymmetric Featured Projects Layout styled as Editor Windows */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {featuredProjects.map((p) => (
              <motion.div
                key={p.id}
                variants={cardVariants}
                className="col-span-1 lg:col-span-6 flex flex-col"
              >
                <div className="console-panel rounded-lg overflow-hidden border border-[#00d2ff]/10 hover:border-[#00d2ff]/40 transition-colors flex-1 flex flex-col tilt-card">
                  <div className="tilt-card-inner h-full flex flex-col">
                    {/* IDE Tab Header */}
                    <div className="bg-[#0b131f] border-b border-[#00d2ff]/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#00d2ff]" />
                        Featured: {p.title}
                      </span>
                      <span className="text-[#00d2ff]/40 font-normal lowercase">{p.fileSize} | {p.filePerms}</span>
                    </div>

                    {/* Editor Content Area */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-display font-bold text-slate-200 mb-2 hover:text-[#00d2ff] transition-colors shuffle-text">
                          {p.title}
                        </h3>
                        <p className="text-slate-350 text-xs md:text-sm leading-relaxed font-light">
                          {p.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#00d2ff]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-1.5">
                          {p.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono text-slate-300 bg-[#00d2ff]/5 border border-[#00d2ff]/10 px-2 py-0.5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] text-[#05070a] bg-[#00d2ff] uppercase font-bold hover:bg-[#00d2ff]/90 transition-colors self-start sm:self-auto"
                        >
                          <span className="shuffle-text">View on GitHub</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secondary Projects Section */}
          <div className="mt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-450 mb-6 flex items-center gap-2">
              <FolderDot className="w-4 h-4 text-[#00d2ff]" />
              Other Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryProjects.map((p) => (
                <motion.div
                  key={p.id}
                  variants={cardVariants}
                  className="console-panel rounded-lg overflow-hidden border border-[#00d2ff]/10 hover:border-[#00d2ff]/40 transition-colors flex flex-col h-full tilt-card"
                >
                  <div className="tilt-card-inner h-full flex flex-col">
                    <div className="bg-[#0b131f] border-b border-[#00d2ff]/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <FolderDot className="w-3.5 h-3.5 text-[#00d2ff]" />
                        {p.title}
                      </span>
                      <span className="text-[#00d2ff]/40 font-normal lowercase">{p.fileSize}</span>
                    </div>

                    <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <p className="text-slate-400 text-xs font-light leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#00d2ff]/5 justify-between items-center mt-auto">
                        <div className="flex flex-wrap gap-1">
                          {p.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-mono text-slate-300 bg-[#00d2ff]/5 border border-[#00d2ff]/10 px-1.5 py-0.5 rounded-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-[#00d2ff] p-1 transition-colors"
                          aria-label="inspect source"
                        >
                          <Server className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
