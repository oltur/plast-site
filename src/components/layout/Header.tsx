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
      <nav className="container-header">
        <div className="flex h-14 items-center justify-between md:h-20">
          {/* Left Side - Logos */}
          <Link href={`/${locale}`} className="flex flex-shrink-0 items-center gap-1.5 md:gap-0">
            {/* Main Plast Deutschland Logo */}
            <Image
              src="/plast-logo.png"
              alt="Plast Deutschland"
              width={150}
              height={64}
              className="h-9 w-auto object-contain md:h-16"
              priority
            />
            {/* Small Emblem - Visible on mobile only */}
            <Image
              src="/plast-emblem.jpg"
              alt="Plast Düsseldorf"
              width={60}
              height={60}
              className="h-9 w-9 rounded-full md:hidden"
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
          <div className="flex items-center gap-1 md:gap-2">
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
              className="relative z-50 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 active:bg-white/30 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-14 z-50 border-t border-plast-green-light bg-plast-green py-4 shadow-lg md:hidden md:top-20">
            <div className="container-header flex flex-col space-y-4">
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
