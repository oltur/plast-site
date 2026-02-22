import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import RotatingBackground from '@/components/ui/RotatingBackground'
import EventMap from '@/components/ui/EventMap'

type LocalizedString = {
  uk?: string
  de?: string
  en?: string
}

type Event = {
  _id: string
  title: LocalizedString
  slug: { current: string }
  description?: {
    uk?: any[]
    de?: any[]
    en?: any[]
  }
  startDate: string
  endDate: string
  location?: {
    name?: LocalizedString
    address?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  ageGroup?: string
  capacity?: number
  price?: number
  status: string
}

// Revalidate every 60 seconds
export const revalidate = 60

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const content = {
    uk: {
      title: 'Події',
      subtitle: 'Наші майбутні заходи',
      comingSoon: 'Скоро',
      noEvents: 'На даний момент немає запланованих подій. Слідкуйте за оновленнями!',
      ageLabel: 'Вік',
      capacityLabel: 'Місць',
      priceLabel: 'Вартість',
      register: 'Зареєструватися',
      moreEvents: 'Більше подій буде додано найближчим часом. Слідкуйте за нами в соціальних мережах!',
    },
    de: {
      title: 'Veranstaltungen',
      subtitle: 'Unsere kommenden Events',
      comingSoon: 'Demnächst',
      noEvents: 'Derzeit sind keine Veranstaltungen geplant. Bleiben Sie dran!',
      ageLabel: 'Alter',
      capacityLabel: 'Plätze',
      priceLabel: 'Kosten',
      register: 'Anmelden',
      moreEvents: 'Weitere Veranstaltungen werden in Kürze hinzugefügt. Folgen Sie uns in den sozialen Medien!',
    },
    en: {
      title: 'Events',
      subtitle: 'Our Upcoming Activities',
      comingSoon: 'Coming Soon',
      noEvents: 'No events are currently planned. Stay tuned for updates!',
      ageLabel: 'Age',
      capacityLabel: 'Spots',
      priceLabel: 'Cost',
      register: 'Register',
      moreEvents: 'More events will be added soon. Follow us on social media!',
    },
  }

  const t = content[locale as keyof typeof content] || content.uk

  // Fetch events and settings from Sanity
  const [events, settings] = await Promise.all([
    client.fetch<Event[]>(
      `*[_type == "event" && status == "published"] | order(startDate asc) {
        _id,
        title,
        slug,
        description,
        startDate,
        endDate,
        location,
        ageGroup,
        capacity,
        price,
        status
      }`
    ),
    client.fetch(`*[_type == "settings"][0] {
      backgroundImages
    }`),
  ])

  const formatDate = (start: string, end: string, locale: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    if (locale === 'de') {
      const startDay = startDate.getDate()
      const endDay = endDate.getDate()
      const month = endDate.toLocaleDateString('de-DE', { month: 'long' })
      const year = endDate.getFullYear()
      return `${startDay}.-${endDay}. ${month} ${year}`
    } else if (locale === 'uk') {
      const startDay = startDate.getDate()
      const endDay = endDate.getDate()
      const month = endDate.toLocaleDateString('uk-UA', { month: 'long' })
      const year = endDate.getFullYear()
      return `${startDay}-${endDay} ${month} ${year}`
    } else {
      const month = endDate.toLocaleDateString('en-US', { month: 'long' })
      const startDay = startDate.getDate()
      const endDay = endDate.getDate()
      const year = endDate.getFullYear()
      return `${month} ${startDay}-${endDay}, ${year}`
    }
  }

  const getAgeGroupLabel = (ageGroup: string | undefined) => {
    if (!ageGroup) return ''
    const labels: Record<string, Record<string, string>> = {
      cubs: { uk: '6-11 років', de: '6-11 Jahre', en: '6-11 years' },
      scouts: { uk: '12-17 років', de: '12-17 Jahre', en: '12-17 years' },
      seniors: { uk: '18+ років', de: '18+ Jahre', en: '18+ years' },
      all: { uk: 'Всі віки', de: 'Alle Altersgruppen', en: 'All ages' },
    }
    return labels[ageGroup]?.[locale as keyof typeof labels.cubs] || ageGroup
  }

  return (
    <div className="relative py-12">
      <RotatingBackground images={settings?.backgroundImages} />
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Events List */}
        <div className="mx-auto max-w-4xl space-y-6">
          {events.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-gray-600">{t.noEvents}</p>
            </div>
          ) : (
            events.map(event => {
              const eventLocale = locale as keyof LocalizedString
              const title = event.title?.[eventLocale] || event.title?.en || ''
              const locationName = event.location?.name?.[eventLocale] || event.location?.name?.en || ''
              const description = event.description?.[eventLocale]

              return (
                <div key={event._id} className="overflow-hidden rounded-lg border-2 border-plast-green shadow-lg">
                  <div className="bg-plast-green p-4">
                    <span className="inline-block rounded bg-plast-yellow px-3 py-1 text-sm font-semibold text-gray-900">
                      {t.comingSoon}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="mb-3 text-2xl font-bold text-gray-900">{title}</h2>
                    <div className="mb-4 space-y-2 text-gray-700">
                      <p className="flex items-center">
                        <span className="mr-2 font-semibold">📅</span>{' '}
                        {formatDate(event.startDate, event.endDate, locale)}
                      </p>
                      {locationName && (
                        <p className="flex items-center">
                          <span className="mr-2 font-semibold">📍</span> {locationName}
                        </p>
                      )}
                    </div>
                    {description && (
                      <div className="mb-4 prose prose-sm max-w-none text-gray-700">
                        <PortableText value={description} />
                      </div>
                    )}
                    {event.location && (
                      <EventMap
                        location={{
                          name: event.location.name?.[eventLocale] || event.location.name?.en,
                          address: event.location.address,
                          coordinates: event.location.coordinates,
                        }}
                        locale={locale}
                      />
                    )}
                    <div className="mt-4 grid gap-2 border-t pt-4 md:grid-cols-3">
                      {event.ageGroup && (
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            {t.ageLabel}: {getAgeGroupLabel(event.ageGroup)}
                          </p>
                        </div>
                      )}
                      {event.capacity && (
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            {t.capacityLabel}: {event.capacity}
                          </p>
                        </div>
                      )}
                      {event.price !== undefined && (
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            {t.priceLabel}: €{event.price}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-6">
                      <a
                        href={`/${locale}/contact`}
                        className="inline-block rounded-lg bg-plast-green px-6 py-3 font-semibold text-white transition hover:bg-plast-green-dark"
                      >
                        {t.register}
                      </a>
                    </div>
                  </div>
                </div>
              )
            })
          )}

          {/* Info Box */}
          <div className="mt-8 rounded-lg bg-gray-50 p-6 text-center">
            <p className="text-gray-600">{t.moreEvents}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
