'use client'

import { MapPin } from 'lucide-react'

type EventMapProps = {
  location?: {
    name?: string
    address?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  locale: string
}

export default function EventMap({ location, locale }: EventMapProps) {
  if (!location) return null

  const { name, address, coordinates } = location

  const getMapEmbedUrl = () => {
    if (coordinates) {
      // Google Maps embed URL with coordinates
      return `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=${locale}&z=14&output=embed`
    }
    if (address || name) {
      const query = encodeURIComponent(`${name || ''} ${address || ''}`.trim())
      return `https://maps.google.com/maps?q=${query}&hl=${locale}&z=14&output=embed`
    }
    return null
  }

  const getGoogleMapsLink = () => {
    if (coordinates) {
      return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
    }
    if (address || name) {
      const query = encodeURIComponent(`${name || ''} ${address || ''}`.trim())
      return `https://www.google.com/maps/search/?api=1&query=${query}`
    }
    return null
  }

  const labels = {
    uk: {
      location: 'Місце проведення',
      openInMaps: 'Відкрити в Google Maps',
    },
    de: {
      location: 'Veranstaltungsort',
      openInMaps: 'In Google Maps öffnen',
    },
    en: {
      location: 'Location',
      openInMaps: 'Open in Google Maps',
    },
  }

  const t = labels[locale as keyof typeof labels] || labels.en
  const mapsLink = getGoogleMapsLink()
  const mapEmbedUrl = getMapEmbedUrl()

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center">
        <MapPin className="mr-2 text-plast-green" size={24} />
        <h3 className="text-xl font-bold text-gray-900">{t.location}</h3>
      </div>

      {name && <p className="mb-2 text-lg font-semibold text-gray-900">{name}</p>}
      {address && <p className="mb-4 text-gray-600">{address}</p>}

      {/* Interactive Google Maps iframe */}
      {mapEmbedUrl && (
        <div className="relative mb-4 h-64 overflow-hidden rounded-lg">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing ${name || 'event location'}`}
          />
        </div>
      )}

      {mapsLink && (
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-plast-green px-6 py-3 font-semibold text-white transition hover:bg-plast-green-dark"
        >
          {t.openInMaps} →
        </a>
      )}
    </div>
  )
}
