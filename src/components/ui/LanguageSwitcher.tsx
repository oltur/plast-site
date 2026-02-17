'use client'

import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales } from '@/lib/i18n'

const languageFlags = {
  uk: '🇺🇦',
  de: '🇩🇪',
  en: '🇬🇧',
}

const languageLabels = {
  uk: 'Українська',
  de: 'Deutsch',
  en: 'English',
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
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-xl transition md:h-10 md:w-10 md:text-2xl ${
              isActive
                ? 'bg-plast-yellow ring-2 ring-white/50'
                : 'bg-white/10 hover:bg-white/20 active:bg-white/30'
            }`}
            title={languageLabels[locale]}
            aria-label={languageLabels[locale]}
          >
            {languageFlags[locale]}
          </Link>
        )
      })}
    </div>
  )
}
