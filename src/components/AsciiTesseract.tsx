"use client";

import { useEffect, useRef, useState } from "react";

export default function AsciiTesseract() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  // Mouse coordinate tracker (normalized -1 to 1)
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Define 16 vertices of a 4D Hypercube (Tesseract)
    // Coordinates: (x, y, z, w) where each is -1 or 1
    const vertices: number[][] = [];
    for (const x of [-1, 1]) {
      for (const y of [-1, 1]) {
        for (const z of [-1, 1]) {
          for (const w of [-1, 1]) {
            vertices.push([x, y, z, w]);
          }
        }
      }
    }

    // Define 32 edges (pairs of vertices that differ by exactly 1 coordinate)
    const edges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (vertices[i][k] !== vertices[j][k]) diff++;
        }
        if (diff === 1) {
          edges.push([i, j]);
        }
      }
    }

    // Rotation angles in various 4D planes
    let angleXY = 0; // Rotates X and Y
    let angleXZ = 0; // Rotates X and Z
    let angleXW = 0; // Rotates X and W
    let angleYW = 0; // Rotates Y and W
    let angleZW = 0; // Rotates Z and W
    let angleYZ = 0; // Rotates Y and Z

    // ASCII characters representing depth (Z-axis)
    const charRamp = [".", ":", "-", "=", "+", "*", "#", "%", "@"];

    // Resize handler
    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height, 420);
      
      // Use device pixel ratio for high DPI crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Mouse interactive tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Normalized coordinates
      mouseRef.current.x = x / (rect.width / 2);
      mouseRef.current.y = y / (rect.height / 2);
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
      isHoveredRef.current = false;
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      setIsHovered(true);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener("mouseenter", handleMouseEnter);
    }

    let animationFrameId: number;

    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear canvas with a very transparent fill for trail effects
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Draw faint background grid lines to complete the brutalist coordinate feel
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= width; i += 30) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
      }
      for (let j = 0; j <= height; j += 30) {
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
      }
      ctx.stroke();

      // Adjust rotation speeds based on mouse position
      // Mouse adds offset tilts, while idle maintains continuous rotation
      const baseSpeed = 0.006;
      const mouseInfluenceX = mouseRef.current.x * 0.02;
      const mouseInfluenceY = mouseRef.current.y * 0.02;

      angleXY += baseSpeed + mouseInfluenceX * 0.5;
      angleXZ += baseSpeed * 0.5;
      angleXW += baseSpeed * 0.8 + mouseInfluenceY * 0.4;
      angleYW += baseSpeed * 0.4 + mouseInfluenceX * 0.4;
      angleZW += baseSpeed * 0.7;
      angleYZ += baseSpeed * 0.3;

      // 4D Rotation Trigonometric coefficients
      const cosXY = Math.cos(angleXY), sinXY = Math.sin(angleXY);
      const cosXZ = Math.cos(angleXZ), sinXZ = Math.sin(angleXZ);
      const cosXW = Math.cos(angleXW), sinXW = Math.sin(angleXW);
      const cosYW = Math.cos(angleYW), sinYW = Math.sin(angleYW);
      const cosZW = Math.cos(angleZW), sinZW = Math.sin(angleZW);
      const cosYZ = Math.cos(angleYZ), sinYZ = Math.sin(angleYZ);

      // Rotate and project all 16 vertices
      const projected: { x: number; y: number; z3d: number }[] = [];

      for (let i = 0; i < 16; i++) {
        const [x, y, z, w] = vertices[i];

        // 1. Rotate in XY plane
        const x1 = x * cosXY - y * sinXY;
        const y1 = x * sinXY + y * cosXY;

        // 2. Rotate in XZ plane
        const x2 = x1 * cosXZ - z * sinXZ;
        const z1 = x1 * sinXZ + z * cosXZ;

        // 3. Rotate in YZ plane
        const y2 = y1 * cosYZ - z1 * sinYZ;
        const z2 = y1 * sinYZ + z1 * cosYZ;

        // 4. Rotate in XW plane
        const x3 = x2 * cosXW - w * sinXW;
        const w1 = x2 * sinXW + w * cosXW;

        // 5. Rotate in YW plane
        const y3 = y2 * cosYW - w1 * sinYW;
        const w2 = y2 * sinYW + w1 * cosYW;

        // 6. Rotate in ZW plane
        const z3 = z2 * cosZW - w2 * sinZW;
        const w3 = z2 * sinZW + w2 * cosZW;

        // Perspective Projection from 4D to 3D
        // Camera distance along W axis
        const Dw = 2.3; 
        const factor4d = 1 / (Dw - w3);
        const x3d = x3 * factor4d;
        const y3d = y3 * factor4d;
        const z3d = z3 * factor4d;

        // Perspective Projection from 3D to 2D
        // Camera distance along Z axis
        const Dz = 2.3;
        const factor3d = 1 / (Dz - z3d);
        
        // Final screen projection
        const zoom = Math.min(width, height) * 0.42;
        const px = centerX + x3d * factor3d * zoom;
        const py = centerY + y3d * factor3d * zoom;

        projected.push({ x: px, y: py, z3d: z3d });
      }

      // Draw Edges (32 Lines)
      ctx.lineWidth = isHoveredRef.current ? 1.5 : 1.0;
      ctx.strokeStyle = isHoveredRef.current 
        ? "rgba(255, 255, 255, 0.35)" 
        : "rgba(255, 255, 255, 0.15)";
      
      if (isHoveredRef.current) {
        ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
        ctx.shadowBlur = 4;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      for (const [start, end] of edges) {
        ctx.moveTo(projected[start].x, projected[start].y);
        ctx.lineTo(projected[end].x, projected[end].y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow blur

      // Draw Vertices as Depth-Shaded ASCII Characters
      ctx.font = "bold 11px var(--font-sans), monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < 16; i++) {
        const p = projected[i];
        
        // Normalize depth z3d (ranges roughly from -0.8 to 0.8)
        const minZ = -0.7;
        const maxZ = 0.7;
        const normZ = Math.max(0, Math.min(1, (p.z3d - minZ) / (maxZ - minZ)));
        
        // Map normalized depth to ASCII character ramp
        const charIdx = Math.floor(normZ * (charRamp.length - 1));
        const char = charRamp[charIdx];

        // Farther points are dimmer, closer points are brighter
        const opacity = 0.3 + normZ * 0.7;
        ctx.fillStyle = isHoveredRef.current 
          ? `rgba(255, 255, 255, ${opacity * 1.1})` 
          : `rgba(255, 255, 255, ${opacity * 0.85})`;

        ctx.fillText(char, p.x, p.y);
      }

      // Outer target cursor crosshairs if hovered
      if (isHoveredRef.current) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 0.5;
        
        ctx.beginPath();
        // Left horizontal crosshair
        ctx.moveTo(centerX - 130, centerY);
        ctx.lineTo(centerX - 100, centerY);
        // Right horizontal crosshair
        ctx.moveTo(centerX + 100, centerY);
        ctx.lineTo(centerX + 130, centerY);
        // Top vertical crosshair
        ctx.moveTo(centerX, centerY - 130);
        ctx.lineTo(centerX, centerY - 100);
        // Bottom vertical crosshair
        ctx.moveTo(centerX, centerY + 100);
        ctx.lineTo(centerX, centerY + 130);
        ctx.stroke();

        // Print hypercube scale info in top-left
        ctx.font = "9px var(--font-sans), monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.textAlign = "left";
        ctx.fillText(`ROT: [${(angleXY % (Math.PI * 2)).toFixed(2)}rad]`, 15, 20);
        ctx.fillText(`PROJ: 4D PERSPECTIVE`, 15, 32);
        ctx.fillText(`GRID: TESSERACT (W)`, 15, 44);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("mouseenter", handleMouseEnter);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full aspect-square max-w-[420px] bg-black border border-white/10 rounded-lg overflow-hidden flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.01)] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)] hover:border-white/20 transition-all duration-500 cursor-none"
    >
      <canvas ref={canvasRef} className="block" />
      
      {/* Visual Terminal Panel Tags */}
      <div className="absolute top-3 right-4 flex items-center gap-1.5 font-mono text-[8px] text-slate-500 select-none">
        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" />
        <span>SYS.RENDER [RENDER_OK]</span>
      </div>
      <div className="absolute bottom-3 right-4 font-mono text-[7px] text-slate-600 select-none uppercase tracking-widest">
        Interact_4D.sh
      </div>
      <div className="absolute bottom-3 left-4 font-mono text-[7px] text-slate-600 select-none uppercase tracking-widest">
        W_PLANE: {isHovered ? "ACTIVE" : "AUTO"}
      </div>
    </div>
  );
}
