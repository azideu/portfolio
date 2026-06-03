"use client";

import { useActiveSection } from "@/context/ActiveSectionContext";
import { motion } from "framer-motion";
import { Terminal, Menu, X } from "lucide-react";
import { useState } from "react";

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

type SectionType = "hero" | "about" | "projects" | "experience" | "contact";

export default function Navbar() {
  const { activeSection, scrollToSection } = useActiveSection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; path: string; id: SectionType }[] = [
    { label: "Home", path: "Home", id: "hero" },
    { label: "About", path: "About", id: "about" },
    { label: "Projects", path: "Projects", id: "projects" },
    { label: "Timeline", path: "Timeline", id: "experience" },
    { label: "Connect", path: "Connect", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#05070a]/90 backdrop-blur-md border-b border-[#00d2ff]/10 py-3.5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-1.5 font-display font-bold text-sm tracking-wider text-[#00d2ff] transition-opacity hover:opacity-85"
        >
          <Terminal className="w-4 h-4" />
          <span className="shuffle-text">ADDIN</span>
        </button>

        {/* Desktop Nav Items */}
        <nav aria-label="Navigation Links" className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 text-xs font-mono tracking-wide transition-colors ${
                  isActive 
                    ? "text-[#00d2ff] bg-[#00d2ff]/5 border border-[#00d2ff]/30" 
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                <span className="shuffle-text">{item.path}</span>
              </button>
            );
          })}
        </nav>

        {/* Status Icons / Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/azideu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-[#00d2ff] transition-colors p-1"
            aria-label="GitHub Profile"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-[#00d2ff] transition-colors p-1"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
          <div className="h-4 w-px bg-[#00d2ff]/10" />
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            status: active
          </span>
          <span id="scroll-progress-pct" className="text-[10px] font-mono text-[#00d2ff]/80 tracking-widest ml-2">
            [0%]
          </span>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-400 hover:text-[#00d2ff] bg-[#070b10] rounded border border-[#00d2ff]/10"
            aria-label="Toggle navigation directory"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Dynamic bottom progress line */}
      <div id="scroll-progress-line" />

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 w-full bg-[#05070a] border-b border-[#00d2ff]/10 flex flex-col p-6 gap-3 md:hidden font-mono"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-left text-sm ${
                activeSection === item.id ? "text-[#00d2ff]" : "text-slate-450"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-[#00d2ff]/5">
            <div className="flex gap-4">
              <a
                href="https://github.com/azideu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-450 hover:text-[#00d2ff] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-450 hover:text-[#00d2ff] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <span className="text-[9px] text-slate-500 uppercase tracking-wider">
              Status: Available
            </span>
          </div>
        </motion.div>
      )}
    </header>
  );
}
