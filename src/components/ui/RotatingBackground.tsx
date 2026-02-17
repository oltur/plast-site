'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const PLAST_IMAGES = [
  '/photos/activity-1.jpg',
  '/photos/activity-2.jpg',
  '/photos/group-photo.png',
  '/hero-background.jpg',
]

export default function RotatingBackground() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % PLAST_IMAGES.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [isClient])

  if (!isClient) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {PLAST_IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={src} alt="" fill className="object-cover" priority={index === 0} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
    </div>
  )
}
