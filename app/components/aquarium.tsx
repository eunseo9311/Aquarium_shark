"use client"

import React from "react"
import { useAquarium } from "../hooks/useAquarium"
import { Shark } from "../components/Shark"
import { images } from "./img/img"

export default function Aquarium() {
  const { isDay, mounted } = useAquarium()
  if (!mounted) return null

  return (
    <div
      className="relative overflow-hidden transition-colors duration-1000"
      style={{
        width: "1460px", // 사진 크기에 맞춘 고정 너비
        height: "820px", // 사진 크기에 맞춘 고정 높이
        background: isDay
          ? `url(${images.background}) center/cover no-repeat`
          : "black",
      }}
    >
      {/* shark1과 shark2는 오른쪽에서 출발 (rtl) */}
      <Shark
        src={images.shark1}
        direction="rtl"
        delay={0} // 첫 상어는 바로 등장
        containerWidth={1460}
        containerHeight={820}
      />
      <Shark
        src={images.shark2}
        direction="rtl"
        delay={5} // 5초 후에 등장
        containerWidth={1460}
        containerHeight={820}
      />

      {/* 나머지 상어는 왼쪽에서 출발 (ltr) */}
      <Shark
        src={images.shark3}
        direction="ltr"
        delay={10} // 원하는 딜레이 (5초 간격으로 조정 가능)
        containerWidth={1460}
        containerHeight={820}
      />
    </div>
  )
}
