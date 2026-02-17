import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

// Load environment variables
config({ path: path.join(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function uploadImageToSanity(imagePath: string, altText: string) {
  const imageBuffer = fs.readFileSync(imagePath)
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(imagePath),
  })

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
    alt: {
      uk: altText,
      de: altText,
      en: altText,
    },
  }
}

async function createSampleActivities() {
  console.log('🚀 Creating sample activities...\n')

  const photoDir = path.join(process.cwd(), 'photo')
  const photoFiles = fs.readdirSync(photoDir).filter(f => f.endsWith('.jpg'))

  // Activity 1: Weekly Scout Meetings
  console.log('📸 Uploading images for Activity 1: Weekly Scout Meetings...')
  const activity1Images = []
  for (let i = 0; i < Math.min(3, photoFiles.length); i++) {
    const imagePath = path.join(photoDir, photoFiles[i])
    const image = await uploadImageToSanity(
      imagePath,
      'Plast weekly scout meetings'
    )
    activity1Images.push(image)
    console.log(`  ✓ Uploaded ${photoFiles[i]}`)
  }

  const activity1 = {
    _type: 'activity',
    _id: 'activity-weekly-meetings',
    title: {
      uk: 'Щотижневі пластові сходини',
      de: 'Wöchentliche Pfadfindertreffen',
      en: 'Weekly Scout Meetings',
    },
    slug: { current: 'weekly-scout-meetings' },
    description: {
      uk: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Кожної суботи ми збираємося для навчання, ігор та підготовки до таборів. Наші сходини включають різноманітні активності: від вивчення пластових навичок до командних ігор та обговорення цікавих тем.',
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
              text: 'Jeden Samstag treffen wir uns zum Lernen, Spielen und zur Vorbereitung auf Lager. Unsere Treffen umfassen verschiedene Aktivitäten: vom Erlernen von Pfadfinderfähigkeiten bis hin zu Teamspielen und Diskussionen über interessante Themen.',
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
              text: 'Every Saturday we gather for learning, games, and preparation for camps. Our meetings include various activities: from learning scout skills to team games and discussions on interesting topics.',
            },
          ],
        },
      ],
    },
    excerpt: {
      uk: 'Щотижневі зустрічі для всіх вікових груп з іграми, навчанням та підготовкою до таборів',
      de: 'Wöchentliche Treffen für alle Altersgruppen mit Spielen, Lernen und Lagervorbereitung',
      en: 'Weekly gatherings for all age groups with games, learning, and camp preparation',
    },
    category: 'regular',
    images: activity1Images,
    ageGroup: 'all',
    frequency: {
      uk: 'Кожної суботи',
      de: 'Jeden Samstag',
      en: 'Every Saturday',
    },
    status: 'published',
    order: 1,
  }

  // Activity 2: Summer Camps
  console.log('\n📸 Uploading images for Activity 2: Summer Camps...')
  const activity2Images = []
  for (let i = 3; i < Math.min(6, photoFiles.length); i++) {
    const imagePath = path.join(photoDir, photoFiles[i])
    const image = await uploadImageToSanity(
      imagePath,
      'Plast summer camp activities'
    )
    activity2Images.push(image)
    console.log(`  ✓ Uploaded ${photoFiles[i]}`)
  }

  const activity2 = {
    _type: 'activity',
    _id: 'activity-summer-camps',
    title: {
      uk: 'Літні табори',
      de: 'Sommerlager',
      en: 'Summer Camps',
    },
    slug: { current: 'summer-camps' },
    description: {
      uk: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Двотижневі пригоди на природі, де пластуни навчаються виживання в лісі, командної роботи, лідерства та самостійності. Табори проходять в мальовничих місцях і включають походи, ігри, вогнища та багато цікавих активностей.',
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
              text: 'Zweiwöchige Outdoor-Abenteuer, bei denen Pfadfinder Überlebensfähigkeiten im Wald, Teamarbeit, Führung und Selbstständigkeit lernen. Die Lager finden an malerischen Orten statt und umfassen Wanderungen, Spiele, Lagerfeuer und viele interessante Aktivitäten.',
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
              text: 'Two-week outdoor adventures where scouts learn forest survival skills, teamwork, leadership, and independence. Camps take place in scenic locations and include hiking, games, campfires, and many interesting activities.',
            },
          ],
        },
      ],
    },
    excerpt: {
      uk: 'Двотижневі пригоди на природі з навчанням виживання, командної роботи та лідерства',
      de: 'Zweiwöchige Outdoor-Abenteuer mit Überlebenstraining, Teamarbeit und Führungstraining',
      en: 'Two-week outdoor adventures with survival training, teamwork, and leadership development',
    },
    category: 'camps',
    images: activity2Images,
    ageGroup: 'all',
    frequency: {
      uk: 'Липень-Серпень',
      de: 'Juli-August',
      en: 'July-August',
    },
    status: 'published',
    order: 2,
  }

  // Activity 3: Cultural Events
  console.log('\n📸 Uploading images for Activity 3: Cultural Events...')
  const activity3Images = []
  for (let i = 6; i < Math.min(8, photoFiles.length); i++) {
    const imagePath = path.join(photoDir, photoFiles[i])
    const image = await uploadImageToSanity(
      imagePath,
      'Plast cultural events and celebrations'
    )
    activity3Images.push(image)
    console.log(`  ✓ Uploaded ${photoFiles[i]}`)
  }

  const activity3 = {
    _type: 'activity',
    _id: 'activity-cultural-events',
    title: {
      uk: 'Культурні заходи',
      de: 'Kulturelle Veranstaltungen',
      en: 'Cultural Events',
    },
    slug: { current: 'cultural-events' },
    description: {
      uk: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Святкування українських свят та традицій протягом року. Ми відзначаємо День Незалежності, Різдво, Великдень та інші важливі події. Також організовуємо концерти, виставки та зустрічі з цікавими людьми.',
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
              text: 'Feier ukrainischer Feiertage und Traditionen das ganze Jahr über. Wir feiern den Unabhängigkeitstag, Weihnachten, Ostern und andere wichtige Ereignisse. Wir organisieren auch Konzerte, Ausstellungen und Treffen mit interessanten Menschen.',
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
              text: 'Celebrating Ukrainian holidays and traditions throughout the year. We celebrate Independence Day, Christmas, Easter, and other important events. We also organize concerts, exhibitions, and meetings with interesting people.',
            },
          ],
        },
      ],
    },
    excerpt: {
      uk: 'Святкування українських свят, концерти та зустрічі з цікавими людьми',
      de: 'Feier ukrainischer Feiertage, Konzerte und Treffen mit interessanten Menschen',
      en: 'Celebrating Ukrainian holidays, concerts, and meetings with interesting people',
    },
    category: 'cultural',
    images: activity3Images,
    ageGroup: 'all',
    frequency: {
      uk: 'Протягом року',
      de: 'Das ganze Jahr über',
      en: 'Throughout the year',
    },
    status: 'published',
    order: 3,
  }

  // Create activities
  console.log('\n📝 Creating activities in Sanity...')

  try {
    await client.createOrReplace(activity1 as any)
    console.log('✓ Created: Weekly Scout Meetings')
  } catch (error) {
    console.error('✗ Failed to create Weekly Scout Meetings:', error)
  }

  try {
    await client.createOrReplace(activity2 as any)
    console.log('✓ Created: Summer Camps')
  } catch (error) {
    console.error('✗ Failed to create Summer Camps:', error)
  }

  try {
    await client.createOrReplace(activity3 as any)
    console.log('✓ Created: Cultural Events')
  } catch (error) {
    console.error('✗ Failed to create Cultural Events:', error)
  }

  console.log('\n✅ Sample activities created successfully!')
}

createSampleActivities().catch(console.error)
