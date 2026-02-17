import RotatingBackground from '@/components/ui/RotatingBackground'
import { client } from '@/lib/sanity'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export default async function ActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Fetch background images from Sanity
  const settings = await client.fetch(`*[_type == "settings"][0] {
    backgroundImages
  }`)

  const content = {
    uk: {
      title: 'Наша діяльність',
      subtitle: 'Чим ми займаємося',
      regular: 'Регулярні сходини',
      regularText: 'Кожної суботи ми збираємося для навчання, ігор та підготовки до таборів.',
      camps: 'Табори та вишколи',
      campsText: 'Літні та зимові табори, де пластуни навчаються виживання на природі, командної роботи та лідерства.',
      training: 'Навчання та вишколи',
      trainingText: 'Спеціалізовані курси для провідників та старших пластунів.',
      community: 'Громадська діяльність',
      communityText: 'Волонтерство, допомога українській громаді в Німеччині, культурні заходи.',
      activities: [
        {
          title: 'Пластові сходини',
          description: 'Щотижневі зустрічі для всіх вікових груп',
          when: 'Кожної суботи',
        },
        {
          title: 'Літні табори',
          description: 'Двотижневі пригоди на природі',
          when: 'Липень-Серпень',
        },
        {
          title: 'Культурні заходи',
          description: 'Святкування українських свят та традицій',
          when: 'Протягом року',
        },
      ],
    },
    de: {
      title: 'Unsere Aktivitäten',
      subtitle: 'Was wir tun',
      regular: 'Regelmäßige Treffen',
      regularText: 'Jeden Samstag treffen wir uns zum Lernen, Spielen und zur Vorbereitung auf Lager.',
      camps: 'Lager und Schulungen',
      campsText: 'Sommer- und Winterlager, bei denen Pfadfinder Überlebensfähigkeiten in der Natur, Teamarbeit und Führung lernen.',
      training: 'Ausbildung und Schulungen',
      trainingText: 'Spezialisierte Kurse für Leiter und ältere Pfadfinder.',
      community: 'Gemeinschaftsarbeit',
      communityText: 'Freiwilligenarbeit, Unterstützung der ukrainischen Gemeinschaft in Deutschland, kulturelle Veranstaltungen.',
      activities: [
        {
          title: 'Pfadfindertreffen',
          description: 'Wöchentliche Treffen für alle Altersgruppen',
          when: 'Jeden Samstag',
        },
        {
          title: 'Sommerlager',
          description: 'Zweiwöchige Abenteuer in der Natur',
          when: 'Juli-August',
        },
        {
          title: 'Kulturelle Veranstaltungen',
          description: 'Feier ukrainischer Feiertage und Traditionen',
          when: 'Das ganze Jahr über',
        },
      ],
    },
    en: {
      title: 'Our Activities',
      subtitle: 'What We Do',
      regular: 'Regular Meetings',
      regularText: 'Every Saturday we gather for learning, games, and preparation for camps.',
      camps: 'Camps and Training',
      campsText: 'Summer and winter camps where scouts learn outdoor survival skills, teamwork, and leadership.',
      training: 'Education and Training',
      trainingText: 'Specialized courses for leaders and senior scouts.',
      community: 'Community Service',
      communityText: 'Volunteering, supporting the Ukrainian community in Germany, cultural events.',
      activities: [
        {
          title: 'Scout Meetings',
          description: 'Weekly gatherings for all age groups',
          when: 'Every Saturday',
        },
        {
          title: 'Summer Camps',
          description: 'Two-week outdoor adventures',
          when: 'July-August',
        },
        {
          title: 'Cultural Events',
          description: 'Celebrating Ukrainian holidays and traditions',
          when: 'Throughout the year',
        },
      ],
    },
  }

  const t = content[locale as keyof typeof content] || content.uk

  return (
    <div className="relative py-12">
      <RotatingBackground images={settings?.backgroundImages} />
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Photo Gallery */}
        {settings?.backgroundImages && settings.backgroundImages.length > 0 && (
          <div className="mb-16">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {settings.backgroundImages.map((image: any, index: number) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={builder.image(image.asset).width(800).height(600).url()}
                    alt={image.alt || 'Plast activity'}
                    className="h-64 w-full object-cover transition hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Schedule */}
        <div className="rounded-lg bg-gray-50 p-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            {locale === 'uk' ? 'Розклад активностей' : locale === 'de' ? 'Aktivitätenplan' : 'Activity Schedule'}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {t.activities.map((activity, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-2 text-xl font-bold text-plast-green">{activity.title}</h3>
                <p className="mb-3 text-gray-700">{activity.description}</p>
                <div className="inline-block rounded bg-plast-yellow px-3 py-1 text-sm font-semibold text-gray-900">
                  {activity.when}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
