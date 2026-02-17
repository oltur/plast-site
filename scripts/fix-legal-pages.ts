import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.join(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

function generateKey() {
  return Math.random().toString(36).substring(2, 11)
}

async function fixLegalPages() {
  console.log('🔧 Fixing legal pages with _key properties...\n')

  const impressumContent = {
    uk: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Пласт Дюссельдорф' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Українська Пластова Організація в Німеччині' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Адреса:' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Дюссельдорф, Німеччина' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Контакти:' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Email: info@plast-duesseldorf.de' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Телефон: +49 211 123456' }], markDefs: [] },
    ],
    de: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Plast Düsseldorf' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Ukrainische Pfadfinderorganisation in Deutschland' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Anschrift:' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Düsseldorf, Deutschland' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Kontakt:' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'E-Mail: info@plast-duesseldorf.de' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Telefon: +49 211 123456' }], markDefs: [] },
    ],
    en: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Plast Düsseldorf' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Ukrainian Scout Organization in Germany' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Address:' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Düsseldorf, Germany' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Contact:' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Email: info@plast-duesseldorf.de' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Phone: +49 211 123456' }], markDefs: [] },
    ],
  }

  const privacyContent = {
    uk: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Захист ваших персональних даних' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Ми серйозно ставимося до захисту вашої особистої інформації та дотримуємося всіх вимог GDPR.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Які дані ми збираємо' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Коли ви надсилаєте контактну форму, ми збираємо ваше ім\'я, email, телефон та повідомлення.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Як ми використовуємо ваші дані' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Ваші дані використовуються виключно для відповіді на ваш запит і не передаються третім особам.' }], markDefs: [] },
    ],
    de: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Schutz Ihrer persönlichen Daten' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Wir nehmen den Schutz Ihrer persönlichen Daten ernst und halten uns an alle DSGVO-Anforderungen.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Welche Daten wir sammeln' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Wenn Sie das Kontaktformular absenden, erfassen wir Ihren Namen, E-Mail, Telefon und Ihre Nachricht.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Wie wir Ihre Daten verwenden' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Ihre Daten werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.' }], markDefs: [] },
    ],
    en: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Protection of Your Personal Data' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'We take the protection of your personal information seriously and comply with all GDPR requirements.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'What Data We Collect' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'When you submit the contact form, we collect your name, email, phone, and message.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'How We Use Your Data' }], style: 'h3', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Your data is used exclusively to respond to your inquiry and is not shared with third parties.' }], markDefs: [] },
    ],
  }

  try {
    await client.patch('legal-impressum').set({ content: impressumContent }).commit()
    console.log('✓ Fixed: Impressum')
  } catch (error) {
    console.error('✗ Failed to fix Impressum:', error)
  }

  try {
    await client.patch('legal-privacy').set({ content: privacyContent }).commit()
    console.log('✓ Fixed: Privacy Policy')
  } catch (error) {
    console.error('✗ Failed to fix Privacy Policy:', error)
  }

  console.log('\n✅ Legal pages fixed successfully!')
}

fixLegalPages().catch(console.error)
