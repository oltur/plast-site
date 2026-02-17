import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Read .env.local file
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, '../.env.local')
const envContent = readFileSync(envPath, 'utf-8')

// Parse env variables
const env = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.+)$/)
  if (match) {
    env[match[1].trim()] = match[2].trim()
  }
})

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: env.SANITY_API_TOKEN,
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
    contactPhone: '+49 211 123456',
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
              text: 'Пластовий осередок у Дюссельдорфі - це активна громада українських пластунів у серці Німеччини.',
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
              text: 'Die Plast-Gruppe Düsseldorf ist eine aktive Gemeinschaft ukrainischer Pfadfinder im Herzen Deutschlands.',
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
              text: 'Plast Düsseldorf Scout Group is an active community of Ukrainian scouts in the heart of Germany.',
            },
          ],
        },
      ],
    },
  },

  // Sample Event
  {
    _type: 'event',
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
              text: 'Минулого тижня ми провели наш весняний збір з 30 пластунами. Учасники навчилися навичкам виживання та грали в пластові ігри.',
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
              text: 'Letzte Woche haben wir unsere Frühjahrsversammlung mit 30 Pfadfindern durchgeführt. Die Teilnehmer lernten Überlebensfähigkeiten und spielten Pfadfinderspiele.',
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
              text: 'Last week we held our spring gathering with 30 scouts. Participants learned survival skills and played scouting games.',
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
  console.log('Creating sample content in Sanity...\n')

  for (const doc of sampleContent) {
    try {
      if (doc._id) {
        const result = await client.createOrReplace(doc)
        console.log(`✓ Created/Updated ${doc._type}: ${result._id}`)
      } else {
        const result = await client.create(doc)
        console.log(`✓ Created ${doc._type}: ${result._id}`)
      }
    } catch (error) {
      console.error(`✗ Failed to create ${doc._type}:`, error.message)
    }
  }

  console.log('\n✅ Sample content created successfully!')
  console.log('\nNext steps:')
  console.log('1. Visit http://localhost:3001/studio to view and edit content')
  console.log('2. Visit http://localhost:3001/uk to see the website')
}

createSampleContent().catch(console.error)
