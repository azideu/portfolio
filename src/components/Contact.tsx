"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "addin.zidane.dev@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/azideu/",
      handle: "azideu",
      icon: <Github className="w-3.5 h-3.5 text-white" />,
      bodyIcon: <Github className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/addinzidane/",
      handle: "addinzidane",
      icon: <Linkedin className="w-3.5 h-3.5 text-white" />,
      bodyIcon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/azideu/",
      handle: "@azideu",
      icon: <Instagram className="w-3.5 h-3.5 text-white" />,
      bodyIcon: <Instagram className="w-5 h-5" />,
    },
  ];

  return (
    <section
      id="contact"
      className="snap-section flex flex-col justify-center items-center px-6 py-20 relative"
    >
      <div className="max-w-4xl w-full z-10 text-center font-mono">
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
            04. Connect
          </motion.span>
          <motion.h2
            variants={headingItemVariants}
            className="text-3xl md:text-5xl font-display font-bold text-slate-100 uppercase tracking-tight"
          >
            Get In Touch
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center gap-6"
        >
          {/* Brutalist Console Terminal box */}
          <motion.div variants={cardVariants} className="w-full max-w-2xl">
            <div className="console-panel rounded-lg overflow-hidden border border-white/10 hover:border-white/40 transition-colors flex flex-col tilt-card">
              <div className="tilt-card-inner h-full flex flex-col">
                {/* Tab Header */}
                <div className="bg-[#161616] border-b border-white/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-white" />
                    Contact Directory
                  </span>
                  <span className="text-white/40 font-normal lowercase">status: open</span>
                </div>

                {/* Panel Content */}
                <div className="p-5 md:p-6 flex flex-col items-center gap-6 text-center justify-center flex-1">
                  <h3 className="text-xs md:text-sm text-slate-100 leading-relaxed max-w-md">
                    Feel free to reach out via email or connect on social media.
                  </h3>

                  {/* Mail launch bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-lg">
                    <InteractiveHoverButton
                      href={`mailto:${emailAddress}`}
                      icon={<Mail className="w-4 h-4" />}
                      arrowIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                      className="flex-1 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all"
                    >
                      addin.zidane.dev@gmail.com
                    </InteractiveHoverButton>

                    <InteractiveHoverButton
                      onClick={copyToClipboard}
                      icon={
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={copied ? "check" : "copy"}
                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, rotate: 90, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{ display: "inline-flex" }}
                          >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </motion.span>
                        </AnimatePresence>
                      }
                      arrowIcon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      shuffle={!copied}
                      className="hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all"
                    >
                      {copied ? "[ COPIED ]" : "[ COPY_EMAIL ]"}
                    </InteractiveHoverButton>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social connections in terminal rows */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl justify-center">
            {socials.map((social, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="col-span-1 flex flex-col"
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="console-panel rounded-lg overflow-hidden border border-white/10 hover:border-white/40 transition-colors flex-1 flex flex-col group tilt-card"
                >
                  <div className="tilt-card-inner h-full flex flex-col">
                    {/* IDE Tab Header */}
                    <div className="bg-[#161616] border-b border-white/10 px-4 py-2 flex items-center justify-between text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        {social.icon}
                        {social.name}
                      </span>
                      <span className="text-white/40 font-normal lowercase">link</span>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex flex-row items-center gap-4 flex-1 text-left">
                      <div className="p-2 border border-white/20 text-white bg-white/5 rounded transition-colors group-hover:border-white/40 group-hover:bg-white/10">
                        {social.bodyIcon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-100 group-hover:text-white transition-colors truncate">
                          {social.handle}
                        </p>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors ml-auto flex-shrink-0" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
