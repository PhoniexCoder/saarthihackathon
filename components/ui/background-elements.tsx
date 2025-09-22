"use client";
import { useEffect, useState } from "react";

// Simple cursor glow (optional)
function CursorEffect() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[10000]"
      style={{
        transform: `translate(${pos.x - 12}px, ${pos.y - 12}px)`,
      }}
    >
      <div className="w-6 h-6 rounded-full bg-primary/30 blur-md ring-2 ring-primary/60" />
    </div>
  );
}

export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Place your cursor effect here so it's above the header */}
      <CursorEffect />

      <div className="tech-background">
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
      </div>

      <div className="geometric-shapes">
        <div className="geometric-shape"></div>
        <div className="geometric-shape"></div>
        <div className="geometric-shape"></div>
      </div>
    </div>
  );
}
