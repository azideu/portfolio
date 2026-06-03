"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type SectionType = "hero" | "about" | "projects" | "experience" | "contact";

interface ActiveSectionContextType {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  scrollToSection: (id: SectionType) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export function ActiveSectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionType>("hero");

  const scrollToSection = (id: SectionType) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    // We observe sections to dynamically update the active section based on scroll intersection
    const sections: SectionType[] = ["hero", "about", "projects", "experience", "contact"];
    const options = {
      root: null, // relative to document viewport
      rootMargin: "-45% 0px -45% 0px", // Trigger when section is in the middle of the viewport
      threshold: 0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionType);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Native scrollsnapchange fallback check
    const handleScrollSnapChange = (e: Event) => {
      const snappedTarget = (e as unknown as Record<string, unknown>).snapTargetBlock as HTMLElement | undefined;
      if (snappedTarget && sections.includes(snappedTarget.id as SectionType)) {
        setActiveSection(snappedTarget.id as SectionType);
      }
    };

    const scrollContainer = document.querySelector(".snap-container");
    if (scrollContainer) {
      scrollContainer.addEventListener("scrollsnapchange", handleScrollSnapChange);
    }

    return () => {
      observer.disconnect();
      if (scrollContainer) {
        scrollContainer.removeEventListener("scrollsnapchange", handleScrollSnapChange);
      }
    };
  }, []);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection, scrollToSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error("useActiveSection must be used within an ActiveSectionProvider");
  }
  return context;
}
