import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import path from 'path'

// Load environment variables
config({ path: path.join(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function createSampleEventsAndNews() {
  console.log('🚀 Creating sample events and news...\n')

  // Event 1: Spring Hiking Trip
  const event1 = {
    _type: 'event',
    _id: 'event-spring-hiking-2026',
    title: {
      uk: 'Весняний похід',
      de: 'Frühlingswanderung',
      en: 'Spring Hiking Trip',
    },
    slug: { current: 'spring-hiking-trip-2026' },
    description: {
      uk: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Приєднуйтесь до нас на весняний похід! Ми проведемо день на природі, вивчаючи пластові навички, граючи в ігри та насолоджуючись свіжим повітрям. Похід включає навчання з орієнтування на місцевості, розпалювання вогнища та приготування їжі на природі.',
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
              text: 'Begleiten Sie uns auf einer Frühlingswanderung! Wir verbringen einen Tag in der Natur, lernen Pfadfinderfähigkeiten, spielen und genießen die frische Luft. Die Wanderung umfasst Training in Orientierung, Feuer machen und Kochen in der Natur.',
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
              text: 'Join us for a spring hiking trip! We will spend a day outdoors, learning scout skills, playing games, and enjoying the fresh air. The hike includes training in navigation, fire-making, and outdoor cooking.',
            },
          ],
        },
      ],
    },
    startDate: '2026-04-18',
    endDate: '2026-04-19',
    location: {
      name: {
        uk: 'Національний парк Ейфель',
        de: 'Nationalpark Eifel',
        en: 'Eifel National Park',
      },
      address: 'Eifel National Park, Germany',
    },
    ageGroup: 'scouts',
    capacity: 30,
    price: 15,
    status: 'published',
  }

  // Event 2: Ukrainian Easter Celebration
  const event2 = {
    _type: 'event',
    _id: 'event-ukrainian-easter-2026',
    title: {
      uk: 'Святкування Великодня',
      de: 'Osterfest',
      en: 'Ukrainian Easter Celebration',
    },
    slug: { current: 'ukrainian-easter-2026' },
    description: {
      uk: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Святкуйте Великдень разом з нами! Ми підготували цікаву програму: розмалювання писанок, традиційні ігри, концерт та святковий обід. Приносьте свої писанки та беріть участь у конкурсі на найкращу писанку!',
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
              text: 'Feiern Sie Ostern mit uns! Wir haben ein interessantes Programm vorbereitet: Pysanky-Malen, traditionelle Spiele, ein Konzert und ein festliches Mittagessen. Bringen Sie Ihre Pysanky mit und nehmen Sie am Wettbewerb für die beste Pysanka teil!',
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
              text: 'Celebrate Easter with us! We have prepared an interesting program: pysanky painting, traditional games, a concert, and a festive lunch. Bring your pysanky and participate in the competition for the best pysanka!',
            },
          ],
        },
      ],
    },
    startDate: '2026-04-05',
    endDate: '2026-04-05',
    location: {
      name: {
        uk: 'Український культурний центр',
        de: 'Ukrainisches Kulturzentrum',
        en: 'Ukrainian Cultural Center',
      },
      address: 'Düsseldorf, Germany',
    },
    ageGroup: 'all',
    capacity: 100,
    price: 0,
    status: 'published',
  }

  // News 1: Successful Summer Camp
  const news1 = {
    _type: 'post',
    _id: 'post-summer-camp-success-2025',
    title: {
      uk: 'Успішний літній табір 2025',
      de: 'Erfolgreiches Sommerlager 2025',
      en: 'Successful Summer Camp 2025',
    },
    slug: { current: 'summer-camp-success-2025' },
    excerpt: {
      uk: 'Наш літній табір 2025 року завершився з великим успіхом! Понад 80 пластунів провели незабутні два тижні на природі.',
      de: 'Unser Sommerlager 2025 endete mit großem Erfolg! Über 80 Pfadfinder verbrachten zwei unvergessliche Wochen in der Natur.',
      en: 'Our 2025 summer camp ended with great success! Over 80 scouts spent two unforgettable weeks outdoors.',
    },
    content: {
      uk: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Цього літа наш табір приймав понад 80 пластунів різних вікових груп. Протягом двох тижнів учасники навчалися виживанню на природі, орієнтуванню, вузлам та багатьом іншим пластовим навичкам.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Програма табору включала походи, ігри, спортивні змагання, вечірні вогнища з піснями та розповідями. Особливо популярним був нічний похід під зірками та змагання з орієнтування.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Дякуємо всім провідникам, волонтерам та батькам за підтримку! Ми вже плануємо наступний табір на літо 2026 року.',
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
              text: 'Diesen Sommer nahmen über 80 Pfadfinder verschiedener Altersgruppen an unserem Lager teil. Während zwei Wochen lernten die Teilnehmer Überleben in der Natur, Navigation, Knoten und viele andere Pfadfinderfähigkeiten.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Das Lagerprogramm umfasste Wanderungen, Spiele, Sportwettbewerbe, abendliche Lagerfeuer mit Liedern und Geschichten. Besonders beliebt waren die Nachtwanderung unter den Sternen und der Orientierungswettbewerb.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Vielen Dank an alle Leiter, Freiwilligen und Eltern für die Unterstützung! Wir planen bereits das nächste Lager für Sommer 2026.',
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
              text: 'This summer, our camp hosted over 80 scouts of various age groups. During two weeks, participants learned outdoor survival, navigation, knots, and many other scouting skills.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'The camp program included hiking, games, sports competitions, evening campfires with songs and stories. Particularly popular were the night hike under the stars and the orienteering competition.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Thank you to all leaders, volunteers, and parents for the support! We are already planning the next camp for summer 2026.',
            },
          ],
        },
      ],
    },
    publishedAt: '2025-08-20',
  }

  // News 2: New Leaders Trained
  const news2 = {
    _type: 'post',
    _id: 'post-new-leaders-training-2025',
    title: {
      uk: 'Нові провідники завершили навчання',
      de: 'Neue Leiter haben die Ausbildung abgeschlossen',
      en: 'New Leaders Completed Training',
    },
    slug: { current: 'new-leaders-training-2025' },
    excerpt: {
      uk: 'П\'ять нових провідників успішно завершили інтенсивний курс підготовки та готові вести свої групи.',
      de: 'Fünf neue Leiter haben erfolgreich einen intensiven Ausbildungskurs abgeschlossen und sind bereit, ihre Gruppen zu führen.',
      en: 'Five new leaders successfully completed an intensive training course and are ready to lead their groups.',
    },
    content: {
      uk: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Вітаємо наших п\'ять нових провідників, які успішно завершили багатомісячний курс підготовки! Курс включав теоретичні знання з педагогіки, психології роботи з дітьми, пластових традицій та практичні навички організації заходів.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Наші нові провідники: Марія, Андрій, Олена, Тарас та Юлія. Кожен з них пройшов практику під керівництвом досвідчених провідників і тепер готовий самостійно вести свої групи.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Дякуємо всім, хто брав участь у навчанні, і бажаємо новим провідникам успіхів у їхній важливій місії!',
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
              text: 'Wir gratulieren unseren fünf neuen Leitern, die erfolgreich einen mehrmonatigen Ausbildungskurs abgeschlossen haben! Der Kurs umfasste theoretisches Wissen in Pädagogik, Kinderpsychologie, Plast-Traditionen und praktische Fähigkeiten zur Veranstaltungsorganisation.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Unsere neuen Leiter: Maria, Andriy, Olena, Taras und Julia. Jeder von ihnen absolvierte eine Praktikumszeit unter der Leitung erfahrener Leiter und ist nun bereit, seine eigenen Gruppen selbstständig zu führen.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Vielen Dank an alle, die an der Ausbildung teilgenommen haben, und wir wünschen den neuen Leitern viel Erfolg bei ihrer wichtigen Mission!',
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
              text: 'We congratulate our five new leaders who successfully completed a multi-month training course! The course included theoretical knowledge in pedagogy, child psychology, Plast traditions, and practical skills in event organization.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Our new leaders: Maria, Andriy, Olena, Taras, and Julia. Each of them completed a practicum under the guidance of experienced leaders and is now ready to independently lead their own groups.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Thank you to everyone who participated in the training, and we wish the new leaders success in their important mission!',
            },
          ],
        },
      ],
    },
    publishedAt: '2025-09-15',
  }

  // Create events and news
  console.log('📝 Creating events...')

  try {
    await client.createOrReplace(event1 as any)
    console.log('✓ Created: Spring Hiking Trip')
  } catch (error) {
    console.error('✗ Failed to create Spring Hiking Trip:', error)
  }

  try {
    await client.createOrReplace(event2 as any)
    console.log('✓ Created: Ukrainian Easter Celebration')
  } catch (error) {
    console.error('✗ Failed to create Ukrainian Easter Celebration:', error)
  }

  console.log('\n📝 Creating news/blog posts...')

  try {
    await client.createOrReplace(news1 as any)
    console.log('✓ Created: Successful Summer Camp 2025')
  } catch (error) {
    console.error('✗ Failed to create Successful Summer Camp 2025:', error)
  }

  try {
    await client.createOrReplace(news2 as any)
    console.log('✓ Created: New Leaders Completed Training')
  } catch (error) {
    console.error('✗ Failed to create New Leaders Completed Training:', error)
  }

  console.log('\n✅ Sample events and news created successfully!')
}

createSampleEventsAndNews().catch(console.error)
