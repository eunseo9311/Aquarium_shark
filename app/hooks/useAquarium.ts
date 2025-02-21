"use client"

import { useState, useEffect } from "react"

export function useAquarium() {
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

  return { isDay, mounted }
}

