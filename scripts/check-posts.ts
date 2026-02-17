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

async function checkPosts() {
  console.log('🔍 Checking blog posts...\n')

  try {
    const posts = await client.fetch(
      `*[_type == "post"] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt
      }`
    )

    console.log(`Found ${posts.length} posts:\n`)
    posts.forEach((post: any, index: number) => {
      console.log(`Post ${index + 1}:`)
      console.log(`  ID: ${post._id}`)
      console.log(`  Title: ${JSON.stringify(post.title)}`)
      console.log(`  Slug: ${JSON.stringify(post.slug)}`)
      console.log(`  Published: ${post.publishedAt}`)
      console.log('')
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

checkPosts().catch(console.error)
