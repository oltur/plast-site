import { notFound } from 'next/navigation'
import { locales } from '@/lib/i18n'
import { TranslationProvider } from '@/lib/TranslationContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Manually load messages as a workaround for config file issue
  const messages = (await import(`../../../messages/${locale}.json`)).default

  return (
    <TranslationProvider messages={messages} locale={locale}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </TranslationProvider>
  )
}
