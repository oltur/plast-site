import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: path.join(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function uploadBackgroundImages() {
  console.log('📸 Uploading background images to Sanity...\n')

  const photoDir = path.join(process.cwd(), 'photo')

  // Check if photo directory exists
  if (!fs.existsSync(photoDir)) {
    console.error('❌ Photo directory not found at:', photoDir)
    return
  }

  // Get all jpg files from photo directory
  const imageFiles = fs.readdirSync(photoDir).filter(file => file.toLowerCase().endsWith('.jpg'))

  if (imageFiles.length === 0) {
    console.error('❌ No jpg images found in photo directory')
    return
  }

  console.log(`Found ${imageFiles.length} images to upload:\n`)

  const uploadedImages = []

  // Upload each image
  for (const filename of imageFiles) {
    try {
      const filePath = path.join(photoDir, filename)
      const imageBuffer = fs.readFileSync(filePath)

      console.log(`⏳ Uploading ${filename}...`)

      const asset = await client.assets.upload('image', imageBuffer, {
        filename: filename,
      })

      uploadedImages.push({
        _type: 'image',
        _key: asset._id,
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
        alt: `Plast Düsseldorf activities - ${filename.replace('.jpg', '')}`,
      })

      console.log(`✅ Uploaded ${filename} (ID: ${asset._id})`)
    } catch (error) {
      console.error(`❌ Failed to upload ${filename}:`, error)
    }
  }

  console.log(`\n✅ Uploaded ${uploadedImages.length} images successfully!\n`)
  console.log('⏳ Updating settings document...\n')

  // Update settings document with background images
  try {
    await client
      .patch('settings')
      .set({ backgroundImages: uploadedImages })
      .commit()

    console.log('✅ Settings updated with background images!')
    console.log('\n🎉 All done! Background images are now in Sanity CMS.')
    console.log('\n💡 You can manage these images in Sanity Studio at /studio')
  } catch (error) {
    console.error('❌ Failed to update settings:', error)
  }
}

uploadBackgroundImages()
