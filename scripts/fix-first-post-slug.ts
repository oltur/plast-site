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

async function fixFirstPostSlug() {
  console.log('🔧 Fixing first post slug structure...\n')

  try {
    await client
      .patch('SC4hPXylW7qfW2gxm4JAnS')
      .set({
        slug: { _type: 'slug', current: 'spring-gathering-2026' },
      })
      .commit()
    console.log('✓ Fixed slug for: Successful Spring Gathering 2026')
    console.log('  New slug: spring-gathering-2026')
  } catch (error) {
    console.error('✗ Failed to update post:', error)
  }

  console.log('\n✅ Slug fixed successfully!')
}

fixFirstPostSlug().catch(console.error)
