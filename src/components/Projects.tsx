"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FolderDot, Server, Terminal, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

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
  images?: string[];
}

interface FeaturedProjectCardProps {
  project: Project;
  cardVariants: Variants;
}

function FeaturedProjectCard({ project, cardVariants }: FeaturedProjectCardProps) {
  const [[activeImageIndex, direction], setActiveImageIndex] = useState([0, 0]);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!project.images) return;
    setActiveImageIndex(([prevIndex]) => [
      (prevIndex + 1) % project.images!.length,
      1
    ]);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!project.images) return;
    setActiveImageIndex(([prevIndex]) => [
      (prevIndex - 1 + project.images!.length) % project.images!.length,
      -1
    ]);
  };

  const setIndex = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex(([prevIndex]) => [
      idx,
      idx > prevIndex ? 1 : -1
    ]);
  };

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", ease: "easeInOut", duration: 0.4 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : direction > 0 ? "-100%" : 0,
      opacity: 0,
      transition: {
        x: { type: "tween", ease: "easeInOut", duration: 0.4 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <motion.div
      variants={cardVariants}
      className="col-span-1 lg:col-span-6 flex flex-col"
    >
      <div className="console-panel rounded-lg overflow-hidden border border-white/10 hover:border-white/40 transition-colors flex-1 flex flex-col tilt-card">
        <div className="tilt-card-inner h-full flex flex-col">
          {/* IDE Tab Header */}
          <div className="bg-[#161616] border-b border-white/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-white" />
              Featured: {project.title}
            </span>
            <span className="text-white/40 font-normal lowercase">
              {project.fileSize} | {project.filePerms}
            </span>
          </div>

          {/* Editor Content Area */}
          <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-6">
            <div>
              {/* Carousel if images are present */}
              {project.images && project.images.length > 0 && (
                <div className="relative w-full aspect-[16/10] mb-5 bg-[#0b0b0b] border border-white/10 rounded overflow-hidden group/carousel flex flex-col">
                  {/* Browser Tab Header */}
                  <div className="bg-[#161616] border-b border-white/10 px-3 py-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]/60" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#eab308]/60" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]/60" />
                    </div>
                    <div className="flex-1 mx-4 bg-black border border-white/10 rounded px-2.5 py-0.5 text-[8px] text-slate-500 font-mono flex items-center justify-between max-w-[200px] md:max-w-[240px]">
                      <span className="truncate">localhost:3000/{project.id}</span>
                      <span className="text-white/30 text-[7px] flex-shrink-0 ml-1 select-none">[preview]</span>
                    </div>
                    <div className="w-6 flex-shrink-0" />
                  </div>

                  {/* Image Display */}
                  <div className="relative flex-1 overflow-hidden bg-slate-950/40">
                    <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                      <motion.img
                        key={activeImageIndex}
                        src={project.images[activeImageIndex]}
                        alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-sm bg-black/70 border border-white/20 text-white hover:bg-white/15 hover:border-white/40 transition-colors opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 z-10 cursor-pointer"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm bg-black/70 border border-white/20 text-white hover:bg-white/15 hover:border-white/40 transition-colors opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 z-10 cursor-pointer"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/60 px-2 py-0.5 rounded border border-white/5">
                          {project.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => setIndex(idx, e)}
                              className={`w-1 h-1 rounded-full transition-all cursor-pointer ${
                                idx === activeImageIndex
                                  ? "bg-white scale-110 shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                                  : "bg-white/30 hover:bg-white/50"
                              }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              <h3 className="text-xl md:text-2xl font-display font-bold text-slate-200 mb-2 hover:text-white transition-colors shuffle-text">
                {project.title}
              </h3>
              <p className="text-slate-100 text-xs md:text-sm leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] text-black bg-white uppercase font-bold hover:bg-white/90 transition-colors self-start sm:self-auto"
              >
                <span className="shuffle-text">View on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: "uitm-step",
      title: "uitm-step",
      description: "A web-based freelance marketplace platform developed for UiTM students to showcase skills and secure project collaborations, featuring a custom PHP backend, MySQL relational database, and user authentication workflows.",
      tech: ["PHP (OOP & PDO)", "MySQL", "Tailwind CSS", "Google OAuth 2.0", "DigitalOcean Spaces"],
      role: "CSC264 & ISP250 Group Project",
      type: "featured",
      github: "https://github.com/azideu/uitm-step",
      fileSize: "142.4 KB",
      filePerms: "-rwx------",
      images: [
        "/portfolio/images/projects/step-home.png",
        "/portfolio/images/projects/step-market.png",
        "/portfolio/images/projects/step-chat.png",
      ],
    },
    {
      id: "mainichi",
      title: "Mainichi",
      description: "A mobile-first Japanese language learning platform featuring tactile 3D elements, smooth animations, and an SRS flashcard system for vocabulary/grammar mastery. Built with a React frontend and Node.js/Express/MySQL backend.",
      tech: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS", "JWT & Bcrypt", "Docker"],
      role: "Personal Web Application",
      type: "featured",
      github: "https://github.com/azideu/Mainichi",
      fileSize: "88.9 KB",
      filePerms: "-rwx--x--x",
      images: [
        "/portfolio/images/projects/mainichi-homepage.png",
        "/portfolio/images/projects/mainichi-flashcard.png",
        "/portfolio/images/projects/mainichi-lessons.png",
      ],
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { type: "spring", damping: 22, stiffness: 110 },
    },
  } as const;

  const headingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  } as const;

  const headingItemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 120 } },
  } as const;

  return (
    <>
      <section
        id="projects"
        className="snap-section flex flex-col justify-center items-center px-6 py-20 relative scroll-reveal"
      >
        <div className="max-w-6xl w-full z-10 font-mono text-left">
          {/* Section Heading */}
          <motion.div
            className="mb-10"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.span
              variants={headingItemVariants}
              className="text-xs uppercase tracking-widest text-white/60 font-mono block mb-1"
            >
              02. Projects
            </motion.span>
            <motion.h2
              variants={headingItemVariants}
              className="text-3xl md:text-5xl font-display font-bold text-slate-100 uppercase tracking-tight"
            >
              Selected Works
            </motion.h2>
          </motion.div>

          {/* Layout Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-8"
          >
            {/* Asymmetric Featured Projects Layout styled as Editor Windows */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {featuredProjects.map((p) => (
                <FeaturedProjectCard key={p.id} project={p} cardVariants={cardVariants} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="other-projects"
        className="snap-section flex flex-col justify-center items-center px-6 py-20 relative scroll-reveal"
      >
        <div className="max-w-6xl w-full z-10 font-mono text-left">
          {/* Section Heading */}
          <motion.div
            className="mb-10"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.span
              variants={headingItemVariants}
              className="text-xs uppercase tracking-widest text-white/60 font-mono block mb-1"
            >
              02b. Archive
            </motion.span>
            <motion.h2
              variants={headingItemVariants}
              className="text-3xl md:text-5xl font-display font-bold text-slate-100 uppercase tracking-tight"
            >
              Other Projects
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {secondaryProjects.map((p) => (
              <motion.div
                key={p.id}
                variants={cardVariants}
                className="col-span-1 flex flex-col"
              >
                <div className="console-panel rounded-lg overflow-hidden border border-white/10 hover:border-white/40 transition-colors flex-1 flex flex-col tilt-card">
                  <div className="tilt-card-inner h-full flex flex-col">
                  <div className="bg-[#161616] border-b border-white/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <FolderDot className="w-3.5 h-3.5 text-white" />
                      {p.title}
                    </span>
                    <span className="text-white/40 font-normal lowercase">{p.fileSize}</span>
                  </div>

                  <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-slate-100 text-xs font-light leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5 justify-between items-center mt-auto">
                      <div className="flex flex-wrap gap-1">
                        {p.tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-mono text-slate-300 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-white p-1 transition-colors"
                        aria-label="inspect source"
                      >
                        <Server className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
