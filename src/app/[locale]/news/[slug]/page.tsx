import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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
  content: {
    uk?: any[]
    de?: any[]
    en?: any[]
  }
  publishedAt: string
  featuredImage?: any
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  // Fetch post from Sanity
  const post = await client.fetch<Post | null>(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      featuredImage
    }`,
    { slug }
  )

  if (!post) {
    notFound()
  }

  const localeKey = locale as keyof LocalizedString
  const title = post.title?.[localeKey] || post.title?.en || ''
  const content = post.content?.[localeKey] || post.content?.en || []

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const backText = {
    uk: 'Назад до новин',
    de: 'Zurück zu Nachrichten',
    en: 'Back to News',
  }

  return (
    <div className="relative py-12">
      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Back Link */}
          <Link
            href={`/${locale}/news`}
            className="mb-8 inline-flex items-center gap-2 text-plast-green hover:underline"
          >
            <ArrowLeft size={20} />
            {backText[localeKey] || backText.en}
          </Link>

          {/* Article */}
          <article className="rounded-lg bg-white p-8 shadow-lg">
            <header className="mb-8 border-b pb-6">
              <h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>
              <time className="text-sm text-gray-600">{formatDate(post.publishedAt)}</time>
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText value={content} />
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post"] { slug }`
  )

  const locales = ['uk', 'de', 'en']

  return posts.flatMap(post =>
    locales.map(locale => ({
      locale,
      slug: post.slug.current,
    }))
  )
}
