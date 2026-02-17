'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/lib/sanity'

// Fallback images if Sanity images are not available
const FALLBACK_IMAGES = [
  '/photos/activity-1.jpg',
  '/photos/activity-2.jpg',
  '/photos/group-photo.png',
]

const builder = imageUrlBuilder(client)

type BackgroundImage = {
  asset: {
    _ref: string
  }
  alt?: string
}

type RotatingBackgroundProps = {
  images?: BackgroundImage[]
}

export default function RotatingBackground({ images }: RotatingBackgroundProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Use Sanity images if available, otherwise use fallback
  const imageSources = images && images.length > 0
    ? images.map(img => builder.image(img.asset).width(1920).height(1080).url())
    : FALLBACK_IMAGES

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % imageSources.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [isClient, imageSources.length])

  if (!isClient) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {imageSources.map((src, index) => (
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
