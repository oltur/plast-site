'use client'

import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales } from '@/lib/i18n'

const languageNames = {
  uk: 'УКР',
  de: 'DEU',
  en: 'ENG',
}

export default function LanguageSwitcher() {
  const params = useParams()
  const pathname = usePathname()
  const currentLocale = params?.locale as string

  // Remove the locale from pathname to get the path
  const pathWithoutLocale = pathname?.replace(`/${currentLocale}`, '') || '/'

  return (
    <div className="flex items-center space-x-2">
      {locales.map(locale => {
        const isActive = locale === currentLocale
        return (
          <Link
            key={locale}
            href={`/${locale}${pathWithoutLocale}`}
            className={`rounded px-2 py-1 text-sm font-medium transition ${
              isActive
                ? 'bg-plast-yellow text-gray-900'
                : 'text-white hover:bg-plast-green-light'
            }`}
          >
            {languageNames[locale]}
          </Link>
        )
      })}
    </div>
  )
}
