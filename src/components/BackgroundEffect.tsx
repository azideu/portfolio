"use client";

import { motion } from "framer-motion";

export default function BackgroundEffect() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none crt-overlay">
      {/* Absolute console dark background */}
      <div className="absolute inset-0 bg-black" />

      {/* Grid Pattern with coordinates look */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:3rem_3rem]"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />

      {/* Retro monitor corner glow — top-left, drifts slowly */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px] glow-blob-tl"
        animate={{
          opacity: [0.012, 0.038, 0.018, 0.012],
          x: ["0%", "2%", "-1%", "0%"],
          y: ["0%", "-2%", "1%", "0%"],
          scale: [1, 1.07, 0.96, 1],
        }}
        transition={{
          duration: 9,
          ease: "easeInOut",
          repeat: Infinity,
          times: [0, 0.33, 0.66, 1],
        }}
      />

      {/* Retro monitor corner glow — bottom-right, drifts out of phase */}
      <motion.div
        className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px] glow-blob-br"
        animate={{
          opacity: [0.012, 0.022, 0.042, 0.012],
          x: ["0%", "-2%", "2%", "0%"],
          y: ["0%", "1%", "-2%", "0%"],
          scale: [1, 0.95, 1.09, 1],
        }}
        transition={{
          duration: 11,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 4,
          times: [0, 0.33, 0.66, 1],
        }}
      />

      {/* Ambient scanline glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_85%)]" />
    </div>
  );
}
