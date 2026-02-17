'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { useT, useLocale } from '@/lib/useT'

export default function Header() {
  const t = useT('navigation')
  const locale = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('activities'), href: `/${locale}/activities` },
    { name: t('events'), href: `/${locale}/events` },
    { name: t('news'), href: `/${locale}/news` },
    { name: t('contact'), href: `/${locale}/contact` },
  ]

  return (
    <header className="relative z-50 bg-plast-green shadow-md">
      <nav className="container-custom">
        <div className="flex h-20 items-center justify-between">
          {/* Left Logo - Plast Deutschland */}
          <Link href={`/${locale}`} className="flex flex-shrink-0 items-center">
            <Image
              src="/plast-logo.png"
              alt="Plast Deutschland"
              width={150}
              height={64}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navigation.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white transition hover:text-plast-yellow"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side: Emblem, Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Plast Düsseldorf Emblem - Hidden on mobile */}
            <div className="hidden md:block">
              <Image
                src="/plast-emblem.jpg"
                alt="Plast Düsseldorf"
                width={60}
                height={60}
                className="h-14 w-14 rounded-full"
              />
            </div>
            <LanguageSwitcher />
            <button
              type="button"
              className="text-white md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-plast-green-light py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              {navigation.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white transition hover:text-plast-yellow"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
