"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

interface SharkProps {
  src: string
  direction: "ltr" | "rtl"
  delay: number
  containerWidth: number
  containerHeight: number
}

export function Shark({ src, direction, delay, containerWidth, containerHeight }: SharkProps) {
  const [position, setPosition] = useState(0)
  const [speed, setSpeed] = useState(2)
  const [isVisible, setIsVisible] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // 상어 이미지의 크기를 사진의 원본 크기 또는 원하는 크기로 고정합니다.
    const sharkWidth = 100
    const sharkHeight = 50
    setDimensions({ width: sharkWidth, height: sharkHeight })

    // 상어의 초기 위치 설정:
    // - "ltr": 왼쪽 벽에서 시작 (약간의 머리 부분이 보이도록)
    // - "rtl": 오른쪽 벽에서 시작 (반전 이미지 고려)
    if (direction === "ltr") {
      setPosition(-sharkWidth + 20)
    } else {
      setPosition(containerWidth - 20)
    }
  }, [direction, containerWidth])

  useEffect(() => {
    // delay 후에 상어 등장
    const showTimeout = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)
    return () => clearTimeout(showTimeout)
  }, [delay])

  useEffect(() => {
    if (!isVisible || dimensions.width === 0) return

    const moveShark = () => {
      setPosition((prev) => {
        let newPosition = prev
        if (direction === "ltr") {
          newPosition = prev + speed
          // 상어의 꼬리(오른쪽 끝)가 컨테이너를 벗어나면 이동 종료
          if (newPosition > containerWidth) {
            setIsVisible(false)
            return prev
          }
        } else {
          newPosition = prev - speed
          // 상어의 꼬리(왼쪽 끝)가 컨테이너를 벗어나면 이동 종료
          if (newPosition + dimensions.width < 0) {
            setIsVisible(false)
            return prev
          }
        }
        return newPosition
      })
    }

    const interval = setInterval(moveShark, 1000 / 60) // 60fps 애니메이션
    return () => clearInterval(interval)
  }, [direction, speed, isVisible, dimensions.width, containerWidth])

  const handleClick = () => {
    setSpeed(10)
    setTimeout(() => setSpeed(2), 1000)
  }

  if (!isVisible || dimensions.width === 0) return null

  // 컨테이너의 세로 중앙에 위치하도록 계산
  const topPosition = (containerHeight - dimensions.height) / 2

  return (
    <div
      className="absolute cursor-pointer transition-opacity duration-1000"
      style={{
        left: position,
        top: topPosition,
        opacity: isVisible ? 1 : 0,
        transform: direction === "rtl" ? "scaleX(-1)" : undefined,
      }}
      onClick={handleClick}
    >
      <Image
        src={src}
        alt="Shark"
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
      />
    </div>
  )
}
