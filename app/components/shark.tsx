"use client"

import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface SharkProps {
  src: string
  direction: "ltr" | "rtl"
  delay: number
}

export function Shark({ src, direction, delay }: SharkProps) {
  const [position, setPosition] = useState(0)
  const [speed, setSpeed] = useState(2)
  const [isVisible, setIsVisible] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set initial dimensions and position
    const width = window.innerWidth
    setDimensions({
      width: width / 20,
      height: (width / 20) * 0.5,
    })
    setPosition(direction === "ltr" ? -200 : width)

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth
      setDimensions({
        width: newWidth / 20,
        height: (newWidth / 20) * 0.5,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [direction])

  useEffect(() => {
    // Initial delay before showing shark
    const showTimeout = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(showTimeout)
  }, [delay])

  useEffect(() => {
    if (!isVisible || !dimensions.width) return

    const moveShark = () => {
      setPosition((prev) => {
        const newPosition = direction === "ltr" ? prev + speed : prev - speed

        // Check if shark has moved off screen
        if ((direction === "ltr" && newPosition > window.innerWidth) || (direction === "rtl" && newPosition < -200)) {
          setIsVisible(false)
          // Reappear after 30 seconds
          setTimeout(() => {
            setPosition(direction === "ltr" ? -200 : window.innerWidth)
            setIsVisible(true)
          }, 30000)
          return direction === "ltr" ? -200 : window.innerWidth
        }

        return newPosition
      })
    }

    const interval = setInterval(moveShark, 1000 / 60) // 60fps animation
    return () => clearInterval(interval)
  }, [direction, speed, isVisible, dimensions.width])

  const handleClick = () => {
    setSpeed(10)
    setTimeout(() => setSpeed(2), 1000) // Reset speed after 1 second
  }

  if (!isVisible || !dimensions.width) return null

  return (
    <div
      className="absolute cursor-pointer transition-opacity duration-1000"
      style={{
        left: position,
        opacity: isVisible ? 1 : 0,
        transform: direction === "rtl" ? "scaleX(-1)" : undefined,
      }}
      onClick={handleClick}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt="Shark"
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
      />
    </div>
  )
}

