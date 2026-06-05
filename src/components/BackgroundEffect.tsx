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
        flickerChance={0.3}
        color="#00d2ff"
        maxOpacity={0.08}
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 100%)",
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
