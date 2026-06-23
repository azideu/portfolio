"use client";

import { useActiveSection } from "@/context/ActiveSectionContext";
import { motion } from "framer-motion";
import { ChevronRight, Cpu, FileDown } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import AsciiTesseract from "@/components/AsciiTesseract";
import RollingCodeLog from "@/components/RollingCodeLog";
import { useEffect, useState } from "react";

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

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
const TARGET_NAME = "Addin Zidane.";

function useGlitchText(target: string, startDelay: number = 600) {
  const [displayText, setDisplayText] = useState(target);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    // Scramble on client side asynchronously to avoid ESLint warning
    const initialScrambleId = setTimeout(() => {
      setDisplayText(
        target
          .split("")
          .map((char) => {
            if (char === " ") return " ";
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );
    }, 0);

    let resolvedCount = 0;
    let tick = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        tick++;
        // Resolve one character every ~3 ticks for a gradual left-to-right decode
        if (tick % 3 === 0 && resolvedCount < target.length) {
          resolvedCount++;
        }

        setDisplayText(
          target
            .split("")
            .map((char, i) => {
              if (char === " " || i < resolvedCount) return char;
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join("")
        );

        if (resolvedCount >= target.length) {
          clearInterval(intervalId);
          setDisplayText(target);
          setResolved(true);
        }
      }, 35);
    }, startDelay);

    return () => {
      clearTimeout(initialScrambleId);
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [target, startDelay]);

  return { displayText, resolved };
}

export default function Hero() {
  const { scrollToSection } = useActiveSection();
  const { displayText: glitchName, resolved: nameResolved } = useGlitchText(TARGET_NAME, 500);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 22, stiffness: 110 },
    },
  } as const;

  return (
    <section
      id="hero"
      className="snap-section flex flex-col justify-center items-center px-6 relative py-12 md:py-0"
    >
      <div className="max-w-6xl w-full z-10 font-mono text-left">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column - Core Description */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-slate-500 text-sm">
              <Cpu className="w-4 h-4 text-white" />
              <span>Software Engineer | Seeking Internships &amp; Junior Roles</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-baseline gap-2">
                <h1 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-slate-100 uppercase">
                  Hi, I&apos;m{" "}
                  <span
                    className={`text-white text-glow-violet ${nameResolved ? "shuffle-text" : ""}`}
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {glitchName}
                  </span>
                </h1>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-slate-100 leading-relaxed font-mono max-w-2xl border-l-2 border-white/20 pl-4 py-1"
            >
              I build responsive web interfaces, robust backend APIs, and desktop systems.
              Specializing in Java, PHP, JavaScript, and database design, and seeking software engineering internships or junior roles.
            </motion.p>

            {/* Interactive buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4"
            >
              <InteractiveHoverButton
                onClick={() => scrollToSection("projects")}
                arrowIcon={<ChevronRight className="w-3.5 h-3.5" />}
                className="px-5 py-3 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all"
              >
                View My Work
              </InteractiveHoverButton>

              <InteractiveHoverButton
                onClick={() => scrollToSection("contact")}
                className="px-5 py-3 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] transition-all"
              >
                Get In Touch
              </InteractiveHoverButton>
            </motion.div>

            {/* Bottom links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mt-6 border-t border-white/5 pt-6"
            >
              <span className="text-[9px] text-slate-600 uppercase tracking-widest font-bold">Connect:</span>
              <a
                href="https://github.com/azideu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white p-1.5 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/25 rounded flex items-center gap-2 text-xs transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px]">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/addinzidane/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white p-1.5 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/25 rounded flex items-center gap-2 text-xs transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px]">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/azideu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white p-1.5 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/25 rounded flex items-center gap-2 text-xs transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px]">Instagram</span>
              </a>
              {/* Resume button — full width on mobile, inline on desktop */}
              <a
                href="/portfolio/resume.pdf"
                download="Addin_Zidane_Resume.pdf"
                className="text-white hover:text-white py-2 px-4 sm:p-1.5 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 rounded flex items-center justify-center gap-2 text-xs transition-all shadow-[0_0_10px_rgba(255,255,255,0.03)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] w-full sm:w-auto"
                aria-label="Download Resume"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Resume</span>
              </a>
            </motion.div>
          </div>

          {/* Divider Column - Rolling logs */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block lg:col-span-1 h-[380px] w-full"
          >
            <RollingCodeLog />
          </motion.div>

          {/* Right Column - Interactive 4D ASCII Tesseract */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center lg:col-span-4 w-full"
          >
            <AsciiTesseract />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating scroll trigger */}
      <div
        className="absolute bottom-8 flex flex-col items-center cursor-pointer text-slate-600 hover:text-white transition-colors hidden md:flex"
        onClick={() => scrollToSection("about")}
      >
        <span className="text-[9px] uppercase tracking-widest mb-1.5 font-mono">Scroll to Explore</span>
        <span className="w-1.5 h-1.5 bg-white animate-pulse" />
      </div>
    </section>
  );
}
