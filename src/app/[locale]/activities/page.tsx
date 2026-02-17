import RotatingBackground from '@/components/ui/RotatingBackground'
import ImageGallery from '@/components/ui/ImageGallery'
import { client } from '@/lib/sanity'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'

const builder = imageUrlBuilder(client)

type LocalizedString = {
  uk?: string
  de?: string
  en?: string
}

type Activity = {
  _id: string
  title: LocalizedString
  slug: { current: string }
  description?: {
    uk?: any[]
    de?: any[]
    en?: any[]
  }
  excerpt?: LocalizedString
  category?: string
  images?: any[]
  ageGroup?: string
  frequency?: LocalizedString
  status: string
}

export default async function ActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Fetch activities and settings from Sanity
  const [activities, settings] = await Promise.all([
    client.fetch<Activity[]>(
      `*[_type == "activity" && status == "published"] | order(order asc) {
        _id,
        title,
        slug,
        description,
        excerpt,
        category,
        images,
        ageGroup,
        frequency,
        status
      }`
    ),
    client.fetch(`*[_type == "settings"][0] {
      backgroundImages
    }`),
  ])

  const localeKey = locale as keyof LocalizedString

  const content = {
    uk: {
      title: 'Наша діяльність',
      subtitle: 'Чим ми займаємося',
      readMore: 'Детальніше',
      photoGallery: 'Фотогалерея',
    },
    de: {
      title: 'Unsere Aktivitäten',
      subtitle: 'Was wir tun',
      readMore: 'Mehr erfahren',
      photoGallery: 'Fotogalerie',
    },
    en: {
      title: 'Our Activities',
      subtitle: 'What We Do',
      readMore: 'Read More',
      photoGallery: 'Photo Gallery',
    },
  }

  const t = content[locale as keyof typeof content] || content.uk

  return (
    <div className="relative py-12">
      <RotatingBackground images={settings?.backgroundImages} />
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Activities */}
        <div className="space-y-16">
          {activities.map(activity => {
            const title = activity.title?.[localeKey] || activity.title?.en || ''
            const excerpt = activity.excerpt?.[localeKey] || activity.excerpt?.en || ''
            const description = activity.description?.[localeKey]
            const frequency = activity.frequency?.[localeKey] || activity.frequency?.en || ''

            // Build image URLs
            const imageUrls = activity.images
              ? activity.images.map(img =>
                  builder.image(img.asset).width(1200).height(900).url()
                )
              : []

            return (
              <div key={activity._id} className="overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="bg-plast-green p-6">
                  <h2 className="text-3xl font-bold text-white">{title}</h2>
                  {frequency && (
                    <p className="mt-2 text-plast-yellow">{frequency}</p>
                  )}
                </div>

                <div className="p-6">
                  {excerpt && (
                    <p className="mb-4 text-lg text-gray-700">{excerpt}</p>
                  )}

                  {description && (
                    <div className="prose prose-lg mb-6 max-w-none text-gray-700">
                      <PortableText value={description} />
                    </div>
                  )}

                  {/* Photo Gallery */}
                  {imageUrls.length > 0 && (
                    <div className="mt-6">
                      <h3 className="mb-4 text-xl font-bold text-gray-900">
                        {t.photoGallery}
                      </h3>
                      <ImageGallery images={imageUrls} alt={title} locale={locale} />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
