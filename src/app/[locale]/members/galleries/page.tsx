import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { client } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import ukMessages from '../../../../../messages/uk.json'
import deMessages from '../../../../../messages/de.json'
import enMessages from '../../../../../messages/en.json'

type LocalizedString = {
  uk?: string
  de?: string
  en?: string
}

export default async function GalleriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await auth()
  const { locale } = await params

  if (!session?.user) {
    redirect(`/${locale}/auth/signin`)
  }

  const userRole = session.user.role || 'member'

  // Fetch galleries based on user access level
  const galleries = await client.fetch(
    `*[_type == "photoGallery" && (accessLevel == "member" || accessLevel == $role || accessLevel == "admin")] | order(date desc) {
      _id,
      title,
      description,
      date,
      coverImage,
      "imageCount": count(images)
    }`,
    { role: userRole }
  )

  // Load translations
  const messages = locale === 'uk' ? ukMessages : locale === 'de' ? deMessages : enMessages
  const t = (key: string) => {
    const [namespace, ...keys] = key.split('.')
    let value = messages[namespace]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <div className="relative min-h-screen bg-gray-50 py-12">
      <div className="container-custom relative z-10">
        <div className="mb-6">
          <Link
            href={`/${locale}/members`}
            className="text-plast-green hover:text-plast-green-dark"
          >
            ← {t('members.backToMembers')}
          </Link>
        </div>

        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          📸 {t('members.photoGalleries')}
        </h1>

        {galleries.length === 0 ? (
          <p className="text-gray-600">{t('members.noGalleries')}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {galleries.map((gallery: any) => {
              const title = gallery.title[locale as keyof LocalizedString] || gallery.title.en || gallery.title.uk
              const description = gallery.description?.[locale as keyof LocalizedString] || gallery.description?.en || gallery.description?.uk
              return (
                <Link
                  key={gallery._id}
                  href={`/${locale}/members/galleries/${gallery._id}`}
                  className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden">
                    {gallery.coverImage && (
                      <Image
                        src={urlFor(gallery.coverImage).width(400).height(300).url()}
                        alt={title}
                        fill
                        className="object-cover transition group-hover:scale-105"
                      />
                    )}
                    <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                      {gallery.imageCount} {t('members.photos')}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="mb-2 text-sm text-gray-500">
                      {new Date(gallery.date).toLocaleDateString(locale)}
                    </p>
                    {description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
