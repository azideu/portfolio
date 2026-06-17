"use client";

import { useActiveSection } from "@/context/ActiveSectionContext";

type SectionType = "hero" | "about" | "projects" | "other-projects" | "experience" | "contact";

export default function DotNav() {
  const { activeSection, scrollToSection } = useActiveSection();

  const sections: { id: SectionType; label: string }[] = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "other-projects", label: "Archive" },
    { id: "experience", label: "Timeline" },
    { id: "contact", label: "Connect" },
  ];

  return (
    <nav 
      aria-label="Scroll Navigation" 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-8 font-mono text-[10px]"
    >
      <div className="absolute right-[11px] top-2 bottom-2 w-px bg-white/10" />
      
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center justify-end focus:outline-none py-1"
            aria-label={`Jump to ${section.label}`}
            aria-current={isActive ? "location" : undefined}
          >
            {/* Folder / Section name */}
            <span className={`absolute right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono tracking-widest text-white bg-[#0b0b0b] px-2.5 py-1 border border-white/20 pointer-events-none shadow-2xl`}>
              {section.label}
            </span>

            {/* Small brutalist prompt dot */}
            <div
              className={`w-2.5 h-2.5 transition-all duration-300 relative z-10 ${
                isActive
                  ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] rotate-45 scale-110"
                  : "bg-slate-800 hover:bg-slate-500 hover:scale-125"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
