"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Set up motion values for cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Slightly delayed follow spring
  const springConfig = { damping: 35, stiffness: 450, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    if (window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    const handleInitialMove = () => {
      setIsVisible(true);
      window.removeEventListener("mousemove", handleInitialMove);
    };
    window.addEventListener("mousemove", handleInitialMove);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-hover-interactive]")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center font-mono text-xs font-bold"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-20%",
        translateY: "-30%",
      }}
    >
      {/* Blinking terminal block */}
      <motion.div
        className="w-2.5 h-4.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        animate={{
          opacity: isHovered ? [0.4, 0.9, 0.4] : [1, 0, 1],
          scaleY: isHovered ? 0.3 : 1,
          scaleX: isHovered ? 2.5 : 1,
        }}
        transition={{
          duration: isHovered ? 0.3 : 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Dynamic console coordinates display (very retro CS!) */}
      {isHovered && (
        <span className="ml-2 text-[9px] text-white/80 font-mono tracking-tighter bg-black/90 px-1 border border-white/20">
          SELECT
        </span>
      )}
    </motion.div>
  );
}
