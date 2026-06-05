"use client";

import { FlickeringGrid } from "@/components/ui/FlickeringGrid";

export default function BackgroundEffect() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none crt-overlay">
      {/* Absolute console dark background */}
      <div className="absolute inset-0 bg-[#05070a]" />

      {/* Grid Pattern with coordinates look */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,210,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,210,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />

      {/* Flickering Grid CRT Simulation */}
      <FlickeringGrid
        className="absolute inset-0"
        squareSize={2}
        gridGap={7}
        flickerChance={0.12}
        color="rgb(0, 210, 255)"
        maxOpacity={0.08}
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)",
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
