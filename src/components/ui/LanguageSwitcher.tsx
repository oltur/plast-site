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
    <div className="relative z-50 flex items-center gap-1">
      {locales.map(locale => {
        const isActive = locale === currentLocale
        return (
          <Link
            key={locale}
            href={`/${locale}${pathWithoutLocale}`}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              isActive
                ? 'bg-plast-yellow text-gray-900'
                : 'bg-white/10 text-white hover:bg-white/20 active:bg-white/30'
            }`}
          >
            {languageNames[locale]}
          </Link>
        )
      })}
    </div>
  )
}
