'use client'

import { useState } from 'react'
import ImageLightbox from './ImageLightbox'

type ImageGalleryProps = {
  images: string[]
  alt?: string
  columns?: number
  locale?: string
}

export default function ImageGallery({ images, alt = 'Gallery image', columns = 3, locale = 'en' }: ImageGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const translations = {
    uk: 'Натисніть для збільшення',
    de: 'Zum Vergrößern klicken',
    en: 'Click to enlarge',
  }

  const clickText = translations[locale as keyof typeof translations] || translations.en

  const handleImageClick = (index: number) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
  }

  const gridClass =
    columns === 2
      ? 'md:grid-cols-2'
      : columns === 4
        ? 'md:grid-cols-2 lg:grid-cols-4'
        : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <>
      <div className={`grid gap-4 ${gridClass}`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            className="group relative overflow-hidden rounded-lg shadow-lg transition hover:shadow-xl"
          >
            <img
              src={image}
              alt={`${alt} ${index + 1}`}
              className="h-64 w-full object-cover transition duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
              <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900">
                {clickText}
              </span>
            </div>
          </button>
        ))}
      </div>

      <ImageLightbox
        images={images}
        isOpen={isLightboxOpen}
        currentIndex={currentIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={setCurrentIndex}
        alt={alt}
      />
    </>
  )
}
