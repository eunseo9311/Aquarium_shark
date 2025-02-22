"use client"

import React from "react"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const Aquarium = dynamic(() => import("./components/aquarium"), {
  ssr: false,
})

export default function AquariumPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Aquarium />
    </Suspense>
  )
}
