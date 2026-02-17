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

async function updateContactInfo() {
  console.log('🚀 Updating contact information in settings...\n')

  try {
    // Fetch existing settings
    const settings = await client.fetch(`*[_type == "settings"][0]`)

    if (!settings) {
      console.error('✗ Settings document not found. Please create it in Sanity Studio first.')
      return
    }

    // Update settings with contact info and stats
    await client
      .patch(settings._id)
      .set({
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
        stats: {
          memberCount: '100+',
          foundedYear: 2021,
          ageGroups: 4,
        },
      })
      .commit()

    console.log('✅ Contact information updated successfully!')
    console.log('   Email: info@plast-duesseldorf.de')
    console.log('   Phone: +49 211 123456')
    console.log('   Address: Düsseldorf, Germany (in 3 languages)')
    console.log('   Facebook: https://www.facebook.com/plastduesseldorf/')
    console.log('   Instagram: https://www.instagram.com/plast.duesseldorf/')
  } catch (error) {
    console.error('✗ Failed to update contact information:', error)
  }
}

updateContactInfo().catch(console.error)
