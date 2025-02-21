"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Shark } from "../components/shark"
import { images } from "./img/img"

export default function Aquarium() {
  const [isDay, setIsDay] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const checkTime = () => {
      const hours = new Date().getHours()
      setIsDay(hours >= 6 && hours < 18) // Day time between 6 AM and 6 PM
    }

    checkTime() // Initial check
    const interval = setInterval(checkTime, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="relative w-full h-screen overflow-hidden transition-colors duration-1000"
      style={{
        background: isDay ? `url(${images.background}) center/cover no-repeat` : "black",
      }}
    >
      {/* Left to right sharks */}
      <Shark src={images.shark1} direction="ltr" delay={0} />
      <Shark src={images.shark2} direction="ltr" delay={15} />

      {/* Right to left sharks */}
      <Shark src={images.shark3} direction="rtl" delay={5} />
      <Shark src={images.shark4} direction="rtl" delay={20} />
      <Shark src={images.shark5} direction="rtl" delay={10} />
      <Shark src={images.shark6} direction="rtl" delay={25} />
    </div>
  )
}

