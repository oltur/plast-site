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

async function createLegalPages() {
  console.log('🚀 Creating legal pages...\n')

  // Impressum
  const impressum = {
    _type: 'legalPage',
    _id: 'legal-impressum',
    title: {
      uk: 'Imпресум',
      de: 'Impressum',
      en: 'Legal Notice',
    },
    slug: { current: 'impressum' },
    pageType: 'impressum',
    content: {
      uk: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Пласт Дюссельдорф' }],
          style: 'h2',
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Українська Пластова Організація в Німеччині' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Адреса:' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Дюссельдорф, Німеччина' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Контакти:' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Email: info@plast-duesseldorf.de' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Телефон: +49 211 123456' }],
        },
      ],
      de: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Plast Düsseldorf' }],
          style: 'h2',
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Ukrainische Pfadfinderorganisation in Deutschland' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Anschrift:' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Düsseldorf, Deutschland' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Kontakt:' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'E-Mail: info@plast-duesseldorf.de' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Telefon: +49 211 123456' }],
        },
      ],
      en: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Plast Düsseldorf' }],
          style: 'h2',
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Ukrainian Scout Organization in Germany' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Address:' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Düsseldorf, Germany' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Contact:' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Email: info@plast-duesseldorf.de' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Phone: +49 211 123456' }],
        },
      ],
    },
    lastUpdated: new Date().toISOString(),
  }

  // Privacy Policy
  const privacy = {
    _type: 'legalPage',
    _id: 'legal-privacy',
    title: {
      uk: 'Політика конфіденційності',
      de: 'Datenschutzerklärung',
      en: 'Privacy Policy',
    },
    slug: { current: 'privacy' },
    pageType: 'privacy',
    content: {
      uk: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Захист ваших персональних даних' }],
          style: 'h2',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Ми серйозно ставимося до захисту вашої особистої інформації та дотримуємося всіх вимог GDPR.',
            },
          ],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Які дані ми збираємо' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Коли ви надсилаєте контактну форму, ми збираємо ваше ім\'я, email, телефон та повідомлення.',
            },
          ],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Як ми використовуємо ваші дані' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Ваші дані використовуються виключно для відповіді на ваш запит і не передаються третім особам.',
            },
          ],
        },
      ],
      de: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Schutz Ihrer persönlichen Daten' }],
          style: 'h2',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Wir nehmen den Schutz Ihrer persönlichen Daten ernst und halten uns an alle DSGVO-Anforderungen.',
            },
          ],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Welche Daten wir sammeln' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Wenn Sie das Kontaktformular absenden, erfassen wir Ihren Namen, E-Mail, Telefon und Ihre Nachricht.',
            },
          ],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Wie wir Ihre Daten verwenden' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Ihre Daten werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.',
            },
          ],
        },
      ],
      en: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Protection of Your Personal Data' }],
          style: 'h2',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'We take the protection of your personal information seriously and comply with all GDPR requirements.',
            },
          ],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'What Data We Collect' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'When you submit the contact form, we collect your name, email, phone, and message.',
            },
          ],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: '' }],
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'How We Use Your Data' }],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Your data is used exclusively to respond to your inquiry and is not shared with third parties.',
            },
          ],
        },
      ],
    },
    lastUpdated: new Date().toISOString(),
  }

  // Create pages
  console.log('📝 Creating legal pages...')

  try {
    await client.createOrReplace(impressum as any)
    console.log('✓ Created: Impressum')
  } catch (error) {
    console.error('✗ Failed to create Impressum:', error)
  }

  try {
    await client.createOrReplace(privacy as any)
    console.log('✓ Created: Privacy Policy')
  } catch (error) {
    console.error('✗ Failed to create Privacy Policy:', error)
  }

  console.log('\n✅ Legal pages created successfully!')
}

createLegalPages().catch(console.error)
