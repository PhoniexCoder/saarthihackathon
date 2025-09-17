"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  axis?: "x" | "y";
  rotation?: number;
}

export function FlipCard({ front, back, className, axis = "y", rotation = 0 }: FlipCardProps) {
  // axis: "x" for vertical (top-bottom), "y" for horizontal (left-right)
  const animate = axis === "x"
    ? { rotateX: rotation }
    : { rotateY: rotation };
  return (
    <motion.div
      className={cn("relative w-full h-full", className)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={animate}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden">
          {front}
        </div>

        {/* Back side */}
        <div className={axis === "x" ? "absolute w-full h-full rotate-x-180 backface-hidden" : "absolute w-full h-full rotate-y-180 backface-hidden"}>
          {back}
        </div>
      </motion.div>
    </motion.div>
  );
}
