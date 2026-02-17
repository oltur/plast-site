'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent')
    if (!hasConsented) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setIsVisible(false)
  }

  const content = {
    uk: {
      message: 'Ми використовуємо куки для покращення вашого досвіду на сайті.',
      learnMore: 'Дізнатися більше',
      accept: 'Прийняти',
      decline: 'Відхилити',
    },
    de: {
      message: 'Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern.',
      learnMore: 'Mehr erfahren',
      accept: 'Akzeptieren',
      decline: 'Ablehnen',
    },
    en: {
      message: 'We use cookies to improve your experience on our website.',
      learnMore: 'Learn more',
      accept: 'Accept',
      decline: 'Decline',
    },
  }

  const t = content[locale as keyof typeof content] || content.en

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] bg-gray-900 p-4 shadow-lg">
      <div className="container-custom">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex-1">
            <p className="text-sm text-white">
              {t.message}{' '}
              <Link
                href={`/${locale}/privacy`}
                className="text-plast-yellow underline hover:no-underline"
              >
                {t.learnMore}
              </Link>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDecline}
              className="rounded-lg border border-white/20 bg-transparent px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t.decline}
            </button>
            <button
              onClick={handleAccept}
              className="rounded-lg bg-plast-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-plast-green-dark"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
