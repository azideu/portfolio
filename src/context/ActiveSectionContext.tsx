"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

type SectionType = "hero" | "about" | "projects" | "other-projects" | "experience" | "contact";

interface ActiveSectionContextType {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  scrollToSection: (id: SectionType) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export function ActiveSectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionType>("hero");
  const activeSectionRef = useRef<SectionType>(activeSection);

  // Keep ref synced to avoid closure stale state in the keydown listener
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const scrollToSection = (id: SectionType) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const sections: SectionType[] = ["hero", "about", "projects", "other-projects", "experience", "contact"];
    const options = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id as SectionType);
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

    const handleScrollSnapChange = (e: Event) => {
      const snappedTarget = (e as unknown as Record<string, unknown>).snapTargetBlock as HTMLElement | undefined;
      if (snappedTarget) {
        const id = snappedTarget.id;
        if (sections.includes(id as SectionType)) {
          setActiveSection(id as SectionType);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement instanceof HTMLElement && activeElement.isContentEditable))
      ) {
        return;
      }

      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        const currentActive = activeSectionRef.current;
        const currentIndex = sections.indexOf(currentActive);
        if (currentIndex === -1) return;

        if (e.key === "ArrowUp" && currentIndex > 0) {
          e.preventDefault();
          scrollToSection(sections[currentIndex - 1]);
        } else if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
          e.preventDefault();
          scrollToSection(sections[currentIndex + 1]);
        }
      }
    };

    const scrollContainer = document.querySelector(".snap-container");
    if (scrollContainer) {
      scrollContainer.addEventListener("scrollsnapchange", handleScrollSnapChange);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      if (scrollContainer) {
        scrollContainer.removeEventListener("scrollsnapchange", handleScrollSnapChange);
      }
      window.removeEventListener("keydown", handleKeyDown);
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
