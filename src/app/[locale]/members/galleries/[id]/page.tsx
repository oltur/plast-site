import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { client } from '@/lib/sanity'
import Link from 'next/link'
import ImageGallery from '@/components/ui/ImageGallery'
import { urlFor } from '@/lib/sanity'
import ukMessages from '../../../../../../messages/uk.json'
import deMessages from '../../../../../../messages/de.json'
import enMessages from '../../../../../../messages/en.json'

type LocalizedString = {
  uk?: string
  de?: string
  en?: string
}

export default async function GalleryDetailPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const session = await auth()
  const { locale, id } = await params

  if (!session?.user) {
    redirect(`/${locale}/auth/signin`)
  }

  // Fetch gallery
  const gallery = await client.fetch(
    `*[_type == "photoGallery" && _id == $id][0] {
      _id,
      title,
      description,
      date,
      images,
      coverImage
    }`,
    { id }
  )

  if (!gallery) {
    redirect(`/${locale}/members/galleries`)
  }

  // Load translations
  const messages = locale === 'uk' ? ukMessages : locale === 'de' ? deMessages : enMessages
  const t = (key: string) => {
    const [namespace, ...keys] = key.split('.')
    let value: any = messages[namespace as keyof typeof messages]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  const title = gallery.title[locale as keyof LocalizedString] || gallery.title.en || gallery.title.uk
  const description = gallery.description?.[locale as keyof LocalizedString] || gallery.description?.en || gallery.description?.uk

  // Transform images for ImageGallery component
  const images = gallery.images
    ?.filter((img: any) => img?.asset)
    .map((img: any) => {
      try {
        return urlFor(img).width(1200).url()
      } catch (error) {
        console.error('Error generating image URL:', error)
        return null
      }
    })
    .filter(Boolean) || []

  return (
    <div className="relative min-h-screen bg-gray-50 py-12">
      <div className="container-custom relative z-10">
        <div className="mb-6">
          <Link
            href={`/${locale}/members/galleries`}
            className="text-plast-green hover:text-plast-green-dark"
          >
            ← {t('members.backToGalleries')}
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">
            {new Date(gallery.date).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          {description && (
            <p className="mt-4 text-gray-700">{description}</p>
          )}
        </div>

        <ImageGallery images={images} alt={title} locale={locale} />
      </div>
    </div>
  )
}
