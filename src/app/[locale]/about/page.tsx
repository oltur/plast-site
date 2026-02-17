import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import RotatingBackground from '@/components/ui/RotatingBackground'

type LocalizedString = {
  uk?: string
  de?: string
  en?: string
}

type Page = {
  title: LocalizedString
  content?: {
    uk?: any[]
    de?: any[]
    en?: any[]
  }
  description?: LocalizedString
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Fetch about page from Sanity
  const page = await client.fetch<Page>(
    `*[_type == "page" && slug.current == "about-us"][0] {
      title,
      content,
      description
    }`
  )

  const localeKey = locale as keyof LocalizedString

  const content = {
    uk: {
      ageGroups: 'Вікові групи',
      groups: [
        { name: 'Пташата', age: '2-6 років', description: 'Знайомство з пластуванням через гру, розваги та творчість для наймолодших' },
        { name: 'Новаки', age: '6-11 років', description: 'Перші кроки в пластуванні через гру та пригоди' },
        { name: 'Юнаки/Юначки', age: '12-17 років', description: 'Розвиток лідерських навичок та самостійності' },
        { name: 'Старші пластуни', age: '18+ років', description: 'Провідники та наставники молодших пластунів' },
      ],
      parentOrgs: 'Батьківські організації',
      plastDEDesc: 'Керівна організація українського пластування в Німеччині з 1951 року',
      plastUADesc: 'Центральна організація з понад 10,000 членів у всьому світі',
    },
    de: {
      ageGroups: 'Altersgruppen',
      groups: [
        { name: 'Vögelchen', age: '2-6 Jahre', description: 'Einführung in die Pfadfinderwelt durch Spiel, Spaß und Kreativität für die Jüngsten' },
        { name: 'Novaken', age: '6-11 Jahre', description: 'Erste Schritte im Pfadfindertum durch Spiel und Abenteuer' },
        { name: 'Jugendliche', age: '12-17 Jahre', description: 'Entwicklung von Führungsqualitäten und Selbstständigkeit' },
        { name: 'Erwachsene Scouts', age: '18+ Jahre', description: 'Leiter und Mentoren für jüngere Pfadfinder' },
      ],
      parentOrgs: 'Dachorganisationen',
      plastDEDesc: 'Leitende Organisation der ukrainischen Pfadfinder in Deutschland seit 1951',
      plastUADesc: 'Zentrale Organisation mit über 10.000 Mitgliedern weltweit',
    },
    en: {
      ageGroups: 'Age Groups',
      groups: [
        { name: 'Little Birds', age: '2-6 years', description: 'Introduction to scouting through play, fun, and creativity for the youngest' },
        { name: 'Cubs', age: '6-11 years', description: 'First steps in scouting through games and adventures' },
        { name: 'Scouts', age: '12-17 years', description: 'Developing leadership skills and independence' },
        { name: 'Senior Scouts', age: '18+ years', description: 'Leaders and mentors for younger scouts' },
      ],
      parentOrgs: 'Parent Organizations',
      plastDEDesc: 'Governing organization of Ukrainian scouting in Germany since 1951',
      plastUADesc: 'Central organization with over 10,000 members worldwide',
    },
  }

  const t = content[locale as keyof typeof content] || content.uk
  const title = page?.title?.[localeKey] || 'About Us'
  const description = page?.description?.[localeKey]
  const pageContent = page?.content?.[localeKey]

  return (
    <div className="relative py-12">
      <RotatingBackground />
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-xl text-gray-600">{description}</p>}
        </div>

        {/* CMS Content */}
        {pageContent && (
          <section className="mb-16">
            <div className="prose prose-lg max-w-none">
              <PortableText value={pageContent} />
            </div>
          </section>
        )}

        {/* Age Groups */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">{t.ageGroups}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.groups.map((group, index) => (
              <div key={index} className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-2 text-xl font-bold text-plast-green">{group.name}</h3>
                <p className="mb-3 text-sm font-semibold text-gray-600">{group.age}</p>
                <p className="text-gray-700">{group.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Parent Organizations */}
        <section>
          <h2 className="mb-6 text-3xl font-bold text-gray-900">{t.parentOrgs}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="https://plastde.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-plast-green p-6 transition hover:bg-plast-green hover:text-white"
            >
              <h3 className="mb-2 text-xl font-bold">Plast Deutschland</h3>
              <p className="text-sm">{t.plastDEDesc}</p>
            </a>
            <a
              href="https://en.plast.org.ua/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-plast-green p-6 transition hover:bg-plast-green hover:text-white"
            >
              <h3 className="mb-2 text-xl font-bold">Plast Ukraine</h3>
              <p className="text-sm">{t.plastUADesc}</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
