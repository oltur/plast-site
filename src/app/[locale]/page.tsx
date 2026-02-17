import Image from 'next/image'
import { client } from '@/lib/sanity'

type LocalizedString = {
  uk?: string
  de?: string
  en?: string
}

type Settings = {
  siteTitle?: LocalizedString
  siteDescription?: LocalizedString
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Fetch settings from Sanity
  const settings = await client.fetch<Settings>(
    `*[_type == "settings"][0] {
      siteTitle,
      siteDescription
    }`
  )

  const localeKey = locale as keyof LocalizedString

  // Use Sanity content or fallback to defaults
  const title = settings?.siteTitle?.[localeKey] || 'Plast Düsseldorf Scout Group'
  const subtitle =
    settings?.siteDescription?.[localeKey] ||
    'We are part of the global Ukrainian scouting organization, educating youth through outdoor activities, games, and community service.'

  return (
    <div>
      {/* Hero Section with Background */}
      <section className="relative py-32 text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-background.jpg"
            alt="Plast Düsseldorf Activities"
            fill
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-plast-green/40"></div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold drop-shadow-lg md:text-5xl lg:text-6xl">{title}</h1>
            <p className="mb-8 text-lg drop-shadow-md md:text-xl">{subtitle}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={`/${locale}/contact`}
                className="rounded-lg bg-plast-yellow px-8 py-3 font-semibold text-gray-900 shadow-lg transition hover:opacity-90"
              >
                {locale === 'uk' ? 'Приєднатися' : locale === 'de' ? 'Mitmachen' : 'Join Us'}
              </a>
              <a
                href={`/${locale}/events`}
                className="rounded-lg border-2 border-white bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-plast-green"
              >
                {locale === 'uk' ? 'Наші події' : locale === 'de' ? 'Unsere Veranstaltungen' : 'Our Events'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Intro */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-5xl font-bold text-plast-green">50+</div>
              <h3 className="text-lg font-semibold">
                {locale === 'uk' ? 'Активних членів' : locale === 'de' ? 'Aktive Mitglieder' : 'Active Members'}
              </h3>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl font-bold text-plast-green">2015</div>
              <h3 className="text-lg font-semibold">
                {locale === 'uk' ? 'Рік заснування' : locale === 'de' ? 'Gegründet' : 'Founded'}
              </h3>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl font-bold text-plast-green">3</div>
              <h3 className="text-lg font-semibold">
                {locale === 'uk' ? 'Вікові групи' : locale === 'de' ? 'Altersgruppen' : 'Age Groups'}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            {locale === 'uk' ? 'Наша діяльність' : locale === 'de' ? 'Unsere Aktivitäten' : 'Our Activities'}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/photos/activity-1.jpg"
                alt={locale === 'uk' ? 'Пластові активності' : locale === 'de' ? 'Plast-Aktivitäten' : 'Plast Activities'}
                width={600}
                height={400}
                className="h-64 w-full object-cover transition hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/photos/activity-2.jpg"
                alt={locale === 'uk' ? 'Табір' : locale === 'de' ? 'Lager' : 'Camp'}
                width={600}
                height={400}
                className="h-64 w-full object-cover transition hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/photos/group-photo.png"
                alt={locale === 'uk' ? 'Наша команда' : locale === 'de' ? 'Unser Team' : 'Our Team'}
                width={600}
                height={400}
                className="h-64 w-full object-cover transition hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
