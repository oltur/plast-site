import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { client } from '@/lib/sanity'
import Link from 'next/link'
import { Download, ExternalLink } from 'lucide-react'
import ukMessages from '../../../../../messages/uk.json'
import deMessages from '../../../../../messages/de.json'
import enMessages from '../../../../../messages/en.json'

type LocalizedString = {
  uk?: string
  de?: string
  en?: string
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await auth()
  const { locale } = await params

  if (!session?.user) {
    redirect(`/${locale}/auth/signin`)
  }

  const userRole = session.user.role || 'member'

  // Fetch resources based on user access level
  const resources = await client.fetch(
    `*[_type == "resource" && (accessLevel == "member" || accessLevel == $role || accessLevel == "admin")] | order(publishedAt desc) {
      _id,
      title,
      description,
      category,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename,
      externalLink,
      publishedAt
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

  const trainingMaterials = resources.filter((r: any) => r.category === 'training')
  const forms = resources.filter((r: any) => r.category === 'form')

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

        <h1 className="mb-8 text-3xl font-bold text-gray-900">{t('members.membersResources')}</h1>

        {/* Training Materials Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            📚 {t('members.trainingMaterials')}
          </h2>
          {trainingMaterials.length === 0 ? (
            <p className="text-gray-600">{t('members.noResources')}</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {trainingMaterials.map((resource: any) => {
                const title = resource.title[locale as keyof LocalizedString] || resource.title.en || resource.title.uk
                const description = resource.description?.[locale as keyof LocalizedString] || resource.description?.en || resource.description?.uk
                return (
                  <div key={resource._id} className="rounded-lg bg-white p-6 shadow-md">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
                    {description && (
                      <p className="mb-4 text-sm text-gray-600">{description}</p>
                    )}
                    {resource.fileUrl && (
                      <a
                        href={resource.fileUrl}
                        download
                        className="inline-flex items-center gap-2 text-sm font-medium text-plast-green hover:text-plast-green-dark"
                      >
                        <Download size={16} />
                        {resource.fileName || t('members.download')}
                      </a>
                    )}
                    {resource.externalLink && (
                      <a
                        href={resource.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-plast-green hover:text-plast-green-dark"
                      >
                        <ExternalLink size={16} />
                        {t('members.openLink')}
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Forms & Documents Section */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            📋 {t('members.formsDocs')}
          </h2>
          {forms.length === 0 ? (
            <p className="text-gray-600">{t('members.noResources')}</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {forms.map((resource: any) => {
                const title = resource.title[locale as keyof LocalizedString] || resource.title.en || resource.title.uk
                const description = resource.description?.[locale as keyof LocalizedString] || resource.description?.en || resource.description?.uk
                return (
                  <div key={resource._id} className="rounded-lg bg-white p-6 shadow-md">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
                    {description && (
                      <p className="mb-4 text-sm text-gray-600">{description}</p>
                    )}
                    {resource.fileUrl && (
                      <a
                        href={resource.fileUrl}
                        download
                        className="inline-flex items-center gap-2 text-sm font-medium text-plast-green hover:text-plast-green-dark"
                      >
                        <Download size={16} />
                        {resource.fileName || t('members.download')}
                      </a>
                    )}
                    {resource.externalLink && (
                      <a
                        href={resource.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-plast-green hover:text-plast-green-dark"
                      >
                        <ExternalLink size={16} />
                        {t('members.openLink')}
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
