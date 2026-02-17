import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

type LocalizedString = {
  uk?: string
  de?: string
  en?: string
}

type LegalPage = {
  _id: string
  title: LocalizedString
  slug: { current: string }
  pageType: string
  content: {
    uk?: any[]
    de?: any[]
    en?: any[]
  }
  lastUpdated: string
}

export default async function DynamicPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params

  // Fetch legal page from Sanity
  const legalPage = await client.fetch<LegalPage | null>(
    `*[_type == "legalPage" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      pageType,
      content,
      lastUpdated
    }`,
    { slug }
  )

  if (!legalPage) {
    notFound()
  }

  const localeKey = locale as keyof LocalizedString
  const title = legalPage.title?.[localeKey] || legalPage.title?.en || ''
  const content = legalPage.content?.[localeKey] || legalPage.content?.en || []

  const lastUpdatedLabel = {
    uk: 'Останнє оновлення',
    de: 'Zuletzt aktualisiert',
    en: 'Last updated',
  }

  const lastUpdatedText = lastUpdatedLabel[localeKey] || lastUpdatedLabel.en

  return (
    <div className="relative py-12">
      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">
              {lastUpdatedText}: {new Date(legalPage.lastUpdated).toLocaleDateString(locale)}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none rounded-lg bg-white p-8 shadow-lg">
            <PortableText value={content} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all legal pages
export async function generateStaticParams() {
  const pages = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "legalPage"] { slug }`
  )

  const locales = ['uk', 'de', 'en']

  return pages.flatMap(page =>
    locales.map(locale => ({
      locale,
      slug: page.slug.current,
    }))
  )
}
