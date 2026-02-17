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

async function checkPostsContent() {
  console.log('🔍 Checking blog posts content...\n')

  try {
    const posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        content
      }`
    )

    console.log(`Found ${posts.length} posts:\n`)
    posts.forEach((post: any, index: number) => {
      console.log(`Post ${index + 1}: ${post.title?.en || 'Untitled'}`)
      console.log(`  ID: ${post._id}`)
      console.log(`  Slug: ${post.slug?.current}`)
      console.log(`  Has UK content: ${post.content?.uk ? 'Yes (' + post.content.uk.length + ' blocks)' : 'No'}`)
      console.log(`  Has DE content: ${post.content?.de ? 'Yes (' + post.content.de.length + ' blocks)' : 'No'}`)
      console.log(`  Has EN content: ${post.content?.en ? 'Yes (' + post.content.en.length + ' blocks)' : 'No'}`)
      console.log('')
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

checkPostsContent().catch(console.error)
