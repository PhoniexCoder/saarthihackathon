"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface GSAPTextHoverProps {
  children: React.ReactNode
  className?: string
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'difference'
  scaleAmount?: number
}

export function GSAPTextHover({
  children, 
  className = "", 
  blendMode = "normal",
  scaleAmount = 1.1
}: GSAPTextHoverProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const tl = gsap.timeline({ paused: true })

    tl.to(element, {
      scale: scaleAmount,
      ease: "power1.out",
      duration: 0.3,
    })

    const handleMouseEnter = () => tl.play()
    const handleMouseLeave = () => tl.reverse()

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [scaleAmount])

  // Consistent className generation
  const combinedClassName = cn(
    "inline-block cursor-pointer gsap-hover-text",
    className,
    {
      "mix-blend-multiply": blendMode === "multiply",
      "mix-blend-screen": blendMode === "screen",
      "mix-blend-overlay": blendMode === "overlay",
      "mix-blend-difference": blendMode === "difference",
    }
  )

  return (
    <span ref={textRef} className={combinedClassName}>
      {children}
    </span>
  )
}
