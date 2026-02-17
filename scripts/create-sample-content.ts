import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

const sampleContent = [
  // Settings document
  {
    _type: 'settings',
    _id: 'settings',
    siteTitle: {
      uk: 'Пластовий осередок у Дюссельдорфі',
      de: 'Plast-Gruppe Düsseldorf',
      en: 'Plast Düsseldorf Scout Group',
    },
    contactEmail: 'info@plast-duesseldorf.de',
    contactPhone: '+49 123 456789',
    address: {
      uk: 'Дюссельдорф, Німеччина',
      de: 'Düsseldorf, Deutschland',
      en: 'Düsseldorf, Germany',
    },
    socialMedia: {
      facebook: 'https://www.facebook.com/plastduesseldorf/',
      instagram: 'https://www.instagram.com/plast.duesseldorf/',
    },
    footerText: {
      uk: 'Пластовий осередок у Дюссельдорфі - частина всесвітньої організації українського пластування',
      de: 'Plast Düsseldorf - Teil der weltweiten ukrainischen Pfadfinderbewegung',
      en: 'Plast Düsseldorf - Part of the global Ukrainian scouting organization',
    },
  },

  // About page
  {
    _type: 'page',
    _id: 'page-about-us',
    title: {
      uk: 'Про нас',
      de: 'Über uns',
      en: 'About Us',
    },
    slug: {
      uk: { current: 'about' },
      de: { current: 'about' },
      en: { current: 'about' },
    },
    description: {
      uk: 'Дізнайтеся більше про наш пластовий осередок',
      de: 'Erfahren Sie mehr über unsere Plast-Gruppe',
      en: 'Learn more about our Plast scout group',
    },
    content: {
      uk: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Пластовий осередок у Дюссельдорфі - це активна громада українських пластунів у серці Німеччини. Ми є частиною Пласту в Німеччині та всесвітньої організації Пласт, заснованої в Україні у 1912 році.',
            },
          ],
        },
      ],
      de: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Die Plast-Gruppe Düsseldorf ist eine aktive Gemeinschaft ukrainischer Pfadfinder im Herzen Deutschlands. Wir sind Teil von Plast Deutschland und der weltweiten Plast-Organisation, die 1912 in der Ukraine gegründet wurde.',
            },
          ],
        },
      ],
      en: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Plast Düsseldorf Scout Group is an active community of Ukrainian scouts in the heart of Germany. We are part of Plast Germany and the worldwide Plast organization, founded in Ukraine in 1912.',
            },
          ],
        },
      ],
    },
  },

  // Sample Event
  {
    _type: 'event',
    _id: 'event-summer-camp-2026',
    title: {
      uk: 'Літній табір 2026',
      de: 'Sommerlager 2026',
      en: 'Summer Camp 2026',
    },
    slug: {
      uk: { current: 'summer-camp-2026' },
      de: { current: 'sommerlager-2026' },
      en: { current: 'summer-camp-2026' },
    },
    description: {
      uk: 'Приєднуйтесь до нашого щорічного літнього табору! Два тижні незабутніх пригод.',
      de: 'Nehmen Sie an unserem jährlichen Sommerlager teil! Zwei Wochen voller unvergesslicher Abenteuer.',
      en: 'Join our annual summer camp! Two weeks of unforgettable adventures.',
    },
    startDate: '2026-07-15',
    endDate: '2026-07-29',
    location: {
      uk: 'Шварцвальд, Німеччина',
      de: 'Schwarzwald, Deutschland',
      en: 'Black Forest, Germany',
    },
    ageGroup: '12-17',
    capacity: 40,
    price: 200,
    status: 'published',
    registrationEnabled: true,
  },

  // Sample Blog Post
  {
    _type: 'post',
    _id: 'post-spring-gathering-2026',
    title: {
      uk: 'Успішний весняний збір 2026',
      de: 'Erfolgreiche Frühjahrsversammlung 2026',
      en: 'Successful Spring Gathering 2026',
    },
    slug: {
      uk: { current: 'spring-gathering-2026' },
      de: { current: 'fruhjahrsversammlung-2026' },
      en: { current: 'spring-gathering-2026' },
    },
    excerpt: {
      uk: 'Минулого тижня ми провели успішний весняний збір з 30 пластунами.',
      de: 'Letzte Woche haben wir eine erfolgreiche Frühjahrsversammlung mit 30 Pfadfindern durchgeführt.',
      en: 'Last week we held a successful spring gathering with 30 scouts.',
    },
    content: {
      uk: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Минулого тижня ми провели наш весняний збір, де 30 пластунів взяли участь у різних активностях на природі. Учасники навчилися навичкам виживання, грали в традиційні пластові ігри та співали українські пісні біля вогнища.',
            },
          ],
        },
      ],
      de: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Letzte Woche haben wir unsere Frühjahrsversammlung durchgeführt, bei der 30 Pfadfinder an verschiedenen Outdoor-Aktivitäten teilnahmen. Die Teilnehmer lernten Überlebensfähigkeiten, spielten traditionelle Pfadfinderspiele und sangen ukrainische Lieder am Lagerfeuer.',
            },
          ],
        },
      ],
      en: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Last week we held our spring gathering where 30 scouts participated in various outdoor activities. Participants learned survival skills, played traditional scouting games, and sang Ukrainian songs around the campfire.',
            },
          ],
        },
      ],
    },
    publishedAt: new Date().toISOString(),
    featured: true,
  },
]

async function createSampleContent() {
  console.log('Creating sample content...')

  for (const doc of sampleContent) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await client.createOrReplace(doc as any)
      console.log(`✓ Created ${doc._type}: ${doc._id || result._id}`)
    } catch (error) {
      console.error(`✗ Failed to create ${doc._type}:`, error)
    }
  }

  console.log('\nSample content created successfully!')
  console.log('\nYou can now:')
  console.log('1. Visit http://localhost:3001/studio to edit content')
  console.log('2. Visit http://localhost:3001/uk to see the website')
}

createSampleContent()
