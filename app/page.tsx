"use client"

import React, { Suspense } from "react"
import dynamic from "next/dynamic"

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

