"use client";

import { motion, MotionStyle, Transition } from "framer-motion";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderWidth?: number;
}

export const BorderBeam = ({
  className = "",
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#00d2ff",
  colorTo = "transparent",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
}: BorderBeamProps) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] ${className}`}
      style={
        {
          "--border-beam-width": `${borderWidth}px`,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          maskImage: "linear-gradient(transparent,transparent), linear-gradient(#000,#000)",
          borderWidth: `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      <motion.div
        className="absolute aspect-square bg-gradient-to-l"
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--tw-gradient-from": colorFrom,
            "--tw-gradient-to": colorTo,
            "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
            backgroundImage: `linear-gradient(to left, ${colorFrom}, ${colorTo})`,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
};
