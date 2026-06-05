"use client";

import { FlickeringGrid } from "@/components/ui/FlickeringGrid";

export default function BackgroundEffect() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none crt-overlay">
      {/* Absolute console dark background */}
      <div className="absolute inset-0 bg-[#05070a]" />

      {/* Grid Pattern with coordinates look */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,210,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,210,255,0.015)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />

      {/* Flickering Grid Dots overlay */}
      <div 
        className="absolute inset-0 opacity-40 z-0"
        style={{
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)",
        }}
      >
        <FlickeringGrid
          squareSize={1.5}
          gridGap={24}
          flickerChance={0.12}
          color="#00d2ff"
          maxOpacity={0.12}
          className="w-full h-full"
        />
      </div>

      {/* Retro blue monitor corner glow */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#00d2ff]/[0.02] rounded-full blur-[120px]" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#00d2ff]/[0.02] rounded-full blur-[120px]" />

      {/* Ambient scanline glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.01)_0%,transparent_85%)]" />
    </div>
  );
}
