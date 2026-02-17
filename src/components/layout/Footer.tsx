'use client'

import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'
import { useT, useLocale } from '@/lib/useT'

export default function Footer() {
  const t = useT('footer')
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-50 border-t bg-gray-50">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">{t('about')}</h3>
            <p className="text-sm text-gray-600">
              Plast Düsseldorf - Ukrainian Scout Organization in Germany
            </p>
          </div>

          {/* Parent Organizations */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">{t('parentOrgs')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://plastde.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-plast-green"
                >
                  Plast Deutschland
                </a>
              </li>
              <li>
                <a
                  href="https://en.plast.org.ua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-plast-green"
                >
                  Plast Ukraine
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-600 hover:text-plast-blue">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/events`} className="text-gray-600 hover:text-plast-blue">
                  {t('events')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-600 hover:text-plast-blue">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">{t('followUs')}</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/plastduesseldorf/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-plast-blue"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/plast.duesseldorf/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-plast-blue"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>
            © {currentYear} Plast Düsseldorf. {t('allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  )
}
