'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'
import { useT, useLocale } from '@/lib/useT'

export default function Footer() {
  const t = useT('footer')
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-50 border-t bg-plast-green">
      <div className="container-custom py-12">
        {/* Logos */}
        <div className="mb-8 flex items-center justify-center gap-6">
          <Link href={`/${locale}`} className="flex items-center gap-4">
            <Image
              src="/plast-logo.png"
              alt="Plast Logo"
              width={180}
              height={120}
              className="h-20 w-auto object-contain md:h-24"
            />
            <Image
              src="/plast-emblem.jpg"
              alt="Plast Emblem"
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover md:h-28 md:w-28"
            />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* About */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t('about')}</h3>
            <p className="text-sm text-white/90">
              Plast Düsseldorf - Ukrainian Scout Organization in Germany
            </p>
          </div>

          {/* Parent Organizations */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t('parentOrgs')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://plastde.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-plast-yellow"
                >
                  Plast Deutschland
                </a>
              </li>
              <li>
                <a
                  href="https://en.plast.org.ua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-plast-yellow"
                >
                  Plast Ukraine
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/about`} className="text-white/90 hover:text-plast-yellow">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/events`} className="text-white/90 hover:text-plast-yellow">
                  {t('events')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-white/90 hover:text-plast-yellow">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              {locale === 'uk' ? 'Правова інформація' : locale === 'de' ? 'Rechtliches' : 'Legal'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/impressum`} className="text-white/90 hover:text-plast-yellow">
                  {locale === 'uk' ? 'Імпресум' : locale === 'de' ? 'Impressum' : 'Legal Notice'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="text-white/90 hover:text-plast-yellow">
                  {locale === 'uk' ? 'Конфіденційність' : locale === 'de' ? 'Datenschutz' : 'Privacy'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t('followUs')}</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/plastduesseldorf/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-plast-yellow"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/plast.duesseldorf/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-plast-yellow"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/90">
          <p className="mb-2">
            © {currentYear} Plast Düsseldorf. {t('allRightsReserved')}.
          </p>
          <p className="text-xs text-white/70">
            Created by{' '}
            <a
              href="https://turevskiy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-plast-yellow hover:underline"
            >
              turevskiy.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
