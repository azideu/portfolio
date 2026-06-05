"use client";

import { FlickeringGrid } from "@/components/ui/FlickeringGrid";

export default function BackgroundEffect() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none crt-overlay">
      {/* Absolute console dark background */}
      <div className="absolute inset-0 bg-[#05070a]" />

      {/* Flickering Grid Background */}
      <FlickeringGrid
        squareSize={4}
        gridGap={6}
        flickerChance={0.1}
        color="#00d2ff"
        maxOpacity={0.5}
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "radial-gradient(circle at center, #000 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, #000 20%, transparent 80%)",
        }}
      />

      {/* Retro blue monitor corner glow */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#00d2ff]/[0.02] rounded-full blur-[120px]" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#00d2ff]/[0.02] rounded-full blur-[120px]" />

      {/* Ambient scanline glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.01)_0%,transparent_85%)]" />
    </div>
  );
}
