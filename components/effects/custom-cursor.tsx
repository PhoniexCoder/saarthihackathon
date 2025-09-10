"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      })

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target || !target.classList) return // Add null check for target and classList
      if (target.classList.contains("gsap-hover-text")) {
        const computedStyle = window.getComputedStyle(target)
        const textColor = computedStyle.color
        const backgroundColor = computedStyle.backgroundColor || "var(--background)"

        gsap.to(cursor, {
          scale: 0.5,
          backgroundColor: textColor,
          duration: 0.3,
          ease: "power2.out",
        })

        gsap.to(follower, {
          scale: 2,
          backgroundColor: textColor,
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "var(--primary)",
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(follower, {
        scale: 1,
        backgroundColor: "var(--primary)",
        opacity: 0.2,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseenter", handleMouseEnter, true)
    document.addEventListener("mouseleave", handleMouseLeave, true)

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseenter", handleMouseEnter, true)
      document.removeEventListener("mouseleave", handleMouseLeave, true)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          backgroundColor: "var(--primary)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-40 opacity-20"
        style={{
          backgroundColor: "var(--primary)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  )
}
