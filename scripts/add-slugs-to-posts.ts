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

async function addSlugsToPosts() {
  console.log('🔧 Adding slugs to blog posts...\n')

  try {
    // Update post 1
    await client
      .patch('post-summer-camp-success-2025')
      .set({
        slug: { _type: 'slug', current: 'summer-camp-success-2025' },
      })
      .commit()
    console.log('✓ Added slug to: Successful Summer Camp 2025')
  } catch (error) {
    console.error('✗ Failed to update post 1:', error)
  }

  try {
    // Update post 2
    await client
      .patch('post-new-leaders-training-2025')
      .set({
        slug: { _type: 'slug', current: 'new-leaders-training-2025' },
      })
      .commit()
    console.log('✓ Added slug to: New Leaders Training 2025')
  } catch (error) {
    console.error('✗ Failed to update post 2:', error)
  }

  console.log('\n✅ Slugs added successfully!')
}

addSlugsToPosts().catch(console.error)
