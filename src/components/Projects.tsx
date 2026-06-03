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
      description: "A collaborative web platform developed for StepUp! featuring a secured PHP backend and relational MySQL database structure. Focuses on secure user authentication workflows, database migrations, and clean cloud deployment configurations.",
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
      description: "A sleek, modern daily utility and productivity web application. Built with high-fidelity UI design, reactive javascript controls, and modular logic for scale. Highlights a Node.js/Express.js API architecture and optimal state management.",
      tech: ["JavaScript", "Node.js", "Express.js", "CSS Grid"],
      role: "Personal Web Application",
      type: "featured",
      github: "https://github.com/azideu/Mainichi",
      fileSize: "88.9 KB",
      filePerms: "-rwx--x--x",
    },
    {
      id: "ecorevive",
      title: "EcoRevive",
      description: "A Java-based application centered on sustainability metrics tracking and environmental solutions. Fully implements object-oriented design principles, structured memory handling, and robust CLI data analytics.",
      tech: ["Java", "OOP", "Systems Logic", "Data Structs"],
      type: "secondary",
      github: "https://github.com/azideu/EcoRevive",
      fileSize: "44.1 KB",
      filePerms: "-rwxr-xr-x",
    },
    {
      id: "smarthomesystem",
      title: "SmartHomeSystem",
      description: "A hardware-simulated automation workspace. Implements object-oriented workflows, trigger logic, and event-driven automation rules to emulate real-world sensor communication pathways.",
      tech: ["Java", "OOP Design", "Event Automation"],
      type: "secondary",
      github: "https://github.com/azideu/SmartHomeSystem",
      fileSize: "61.0 KB",
      filePerms: "-rwxr-xr-x",
    },
    {
      id: "framr",
      title: "framr",
      description: "A premium client-side web application designed for photographers to format images with professional gallery-style matte frames and borders. Preserves 100% of image dimensions during export via an offscreen HTML5 canvas solver.",
      tech: ["JavaScript", "HTML5 Canvas", "CSS Variables", "GitHub Actions"],
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
          className="flex flex-col gap-10"
        >
          {/* Asymmetric Featured Projects Layout styled as Editor Windows */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Project 1 (Left Column - occupies 7 cols) */}
            <motion.div variants={cardVariants} className="lg:col-span-7 flex flex-col">
              <div className="console-panel rounded-lg overflow-hidden flex flex-col h-full hover:border-[#00d2ff]/40 transition-colors tilt-card">
                <div className="tilt-card-inner">
                  {/* IDE Tab Header */}
                  <div className="bg-[#0b131f] border-b border-[#00d2ff]/10 px-4 py-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#00d2ff]" />
                      Featured Project
                    </span>
                  </div>

                  {/* Editor Content Area */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6">
                    <div>
                      <h3 className="text-xl md:text-3xl font-display font-bold text-slate-200 mb-2 hover:text-[#00d2ff] transition-colors shuffle-text">
                        {featuredProjects[0].title}
                      </h3>
                      <p className="text-slate-350 text-sm leading-relaxed font-light">
                        {featuredProjects[0].description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#00d2ff]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {featuredProjects[0].tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono text-slate-300 bg-[#00d2ff]/5 border border-[#00d2ff]/10 px-2 py-0.5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={featuredProjects[0].github}
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

            {/* Project 2 (Right Column - occupies 5 cols) */}
            <motion.div variants={cardVariants} className="lg:col-span-5 flex flex-col">
              <div className="console-panel rounded-lg overflow-hidden flex flex-col h-full hover:border-[#00d2ff]/40 transition-colors tilt-card">
                <div className="tilt-card-inner">
                  {/* IDE Tab Header */}
                  <div className="bg-[#0b131f] border-b border-[#00d2ff]/10 px-4 py-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#00d2ff]" />
                      Featured Project
                    </span>
                  </div>

                  {/* Editor Content Area */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-slate-200 mb-2 hover:text-[#00d2ff] transition-colors shuffle-text">
                        {featuredProjects[1].title}
                      </h3>
                      <p className="text-slate-350 text-xs md:text-sm leading-relaxed font-light">
                        {featuredProjects[1].description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#00d2ff]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {featuredProjects[1].tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono text-slate-300 bg-[#00d2ff]/5 border border-[#00d2ff]/10 px-2 py-0.5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={featuredProjects[1].github}
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
          </div>

          {/* Secondary Projects Section */}
          <div className="mt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-450 mb-6 flex items-center gap-2">
              <FolderDot className="w-4 h-4 text-[#00d2ff]" />
              Other Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {secondaryProjects.map((p) => (
                <motion.div
                  key={p.id}
                  variants={cardVariants}
                  className="console-panel rounded-lg overflow-hidden flex flex-col hover:border-[#00d2ff]/40 transition-colors tilt-card"
                >
                  <div className="tilt-card-inner">
                    <div className="bg-[#0b131f] border-b border-[#00d2ff]/10 px-4 py-2 flex items-center justify-between text-[9px] text-slate-450">
                      <span>Project File</span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200 hover:text-[#00d2ff] transition-colors mb-2 shuffle-text">
                          {p.title}
                        </h4>
                        <p className="text-slate-400 text-xs font-light leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#00d2ff]/5 justify-between items-center">
                        <div className="flex flex-wrap gap-1">
                          {p.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-mono text-slate-300 bg-[#00d2ff]/5 px-1.5 py-0.5"
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
