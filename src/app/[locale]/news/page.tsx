import { client } from '@/lib/sanity'
import RotatingBackground from '@/components/ui/RotatingBackground'

type LocalizedString = {
  uk?: string
  de?: string
  en?: string
}

type Post = {
  _id: string
  title: LocalizedString
  slug: { current: string }
  excerpt?: LocalizedString
  publishedAt: string
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Fetch posts and settings from Sanity
  const [posts, settings] = await Promise.all([
    client.fetch<Post[]>(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt
      }`
    ),
    client.fetch(`*[_type == "settings"][0] {
      backgroundImages
    }`),
  ])

  const localeKey = locale as keyof LocalizedString

  const content = {
    uk: {
      title: 'Новини',
      subtitle: 'Останні події та оновлення',
      readMore: 'Читати далі',
      featured: 'Головна новина',
      noNews: 'Немає новин для відображення',
      followNews: 'Слідкуйте за нашими новинами',
      followDesc: 'Підпішіться на наші соціальні мережі, щоб не пропустити останні новини та події',
    },
    de: {
      title: 'Nachrichten',
      subtitle: 'Neueste Ereignisse und Updates',
      readMore: 'Weiterlesen',
      featured: 'Hauptnachricht',
      noNews: 'Keine Nachrichten zum Anzeigen',
      followNews: 'Folgen Sie unseren Nachrichten',
      followDesc: 'Folgen Sie uns in den sozialen Medien, um keine Neuigkeiten und Veranstaltungen zu verpassen',
    },
    en: {
      title: 'News',
      subtitle: 'Latest Events and Updates',
      readMore: 'Read More',
      featured: 'Featured',
      noNews: 'No news to display',
      followNews: 'Follow Our News',
      followDesc: 'Follow us on social media to stay updated with our latest news and events',
    },
  }

  const t = content[locale as keyof typeof content] || content.uk

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
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

        <div className="mx-auto max-w-4xl">
          {posts.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-gray-600">{t.noNews}</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {posts[0] && (
                <div className="mb-8 overflow-hidden rounded-lg border-2 border-plast-green shadow-lg">
                  <div className="bg-plast-green p-4">
                    <span className="inline-block rounded bg-plast-yellow px-3 py-1 text-sm font-semibold text-gray-900">
                      {t.featured}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                      {posts[0].title?.[localeKey] || posts[0].title?.en || ''}
                    </h2>
                    <p className="mb-4 text-sm text-gray-600">{formatDate(posts[0].publishedAt)}</p>
                    <p className="mb-4 text-gray-700">
                      {posts[0].excerpt?.[localeKey] || posts[0].excerpt?.en || ''}
                    </p>
                    <a
                      href={`/${locale}/news/${posts[0].slug.current}`}
                      className="inline-block font-semibold text-plast-green hover:underline"
                    >
                      {t.readMore} →
                    </a>
                  </div>
                </div>
              )}

              {/* Other News */}
              {posts.length > 1 && (
                <div className="space-y-6">
                  {posts.slice(1).map(post => (
                    <div key={post._id} className="rounded-lg border border-gray-200 p-6 shadow-sm">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {post.title?.[localeKey] || post.title?.en || ''}
                      </h3>
                      <p className="mb-3 text-sm text-gray-600">{formatDate(post.publishedAt)}</p>
                      <p className="mb-3 text-gray-700">
                        {post.excerpt?.[localeKey] || post.excerpt?.en || ''}
                      </p>
                      <a
                        href={`/${locale}/news/${post.slug.current}`}
                        className="inline-block font-semibold text-plast-green hover:underline"
                      >
                        {t.readMore} →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          <div className="mt-12 rounded-lg bg-plast-green p-8 text-center text-white">
            <h3 className="mb-4 text-2xl font-bold">{t.followNews}</h3>
            <p className="mb-6">{t.followDesc}</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.facebook.com/plastduesseldorf/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-plast-yellow px-6 py-3 font-semibold text-gray-900 transition hover:opacity-90"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/plast.duesseldorf/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-plast-yellow px-6 py-3 font-semibold text-gray-900 transition hover:opacity-90"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
