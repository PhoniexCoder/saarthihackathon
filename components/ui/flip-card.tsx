"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
}

export function FlipCard({ front, back, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <motion.div
      className={cn("relative w-full h-full cursor-pointer", className)}
      onClick={handleFlip}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, animationDirection: "normal" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden">
          {front}
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full rotate-y-180 backface-hidden">
          {back}
        </div>
      </motion.div>
    </motion.div>
  )
}
