# Image Management with Sanity CMS

This guide explains how to manage images for the Plast Düsseldorf website through Sanity CMS.

## ✅ What's Been Set Up

### 1. Background Images Upload
- ✅ **8 photos uploaded** from `/photo` folder to Sanity CMS
- ✅ **Settings schema updated** with `backgroundImages` field
- ✅ **Rotating background component updated** to fetch images from Sanity
- ✅ **About page updated** to use Sanity background images
- ✅ **Favicon created** from plast-emblem.jpg

### 2. Available Image Management

You can manage images in **3 content types**:

#### **A. Blog Posts** (`/studio` → Content → Blog Post)
- **Featured Image** - Main image for the post
- **Photo Gallery** - Multiple images with captions
- All images support:
  - Alt text in 3 languages (Ukrainian, German, English)
  - Hotspot/crop tool
  - Automatic optimization

#### **B. Events** (`/studio` → Content → Event)
- **Event Images** - Multiple images for events
- Support for alt text and hotspot

#### **C. Site Settings** (`/studio` → Site Settings)
- **Logo** - Main site logo
- **Background Images** - Rotating backgrounds for pages (max 10 images)

## 📸 How to Manage Images

### Access Sanity Studio
- **Local:** http://localhost:3001/studio
- **Production:** https://your-vercel-url.vercel.app/studio

### Upload New Background Images
1. Go to Sanity Studio → **Site Settings**
2. Scroll to **Background Images** section
3. Click "+ Add item"
4. Click to upload or drag & drop images
5. Add alt text (optional but recommended for accessibility)
6. Use hotspot tool to set focus point
7. Click **Publish**

### Manage Blog Post Images
1. Go to Sanity Studio → **Content** → **Blog Post**
2. Create new or edit existing post
3. **Featured Image:**
   - Click the image field
   - Upload image
   - Add alt text in all 3 languages
   - Set hotspot
4. **Photo Gallery:**
   - Click "+ Add item"
   - Upload multiple images
   - Add alt text and captions
   - Arrange order by dragging
5. **Publish** when done

### Manage Event Images
Similar to blog posts:
1. Go to **Content** → **Event**
2. Scroll to **Event Images**
3. Upload and configure images
4. **Publish**

## 🔄 Re-upload Background Images

If you need to re-upload the background images from the `/photo` folder:

```bash
npm run upload-bg-images
```

This script will:
- Read all `.jpg` files from `/photo` folder
- Upload them to Sanity CDN
- Update Site Settings with new images
- Preserve existing alt text if re-uploading

## 🎯 Where Background Images Appear

Background images from **Site Settings** → **Background Images** are used on:
- ✅ About page (already implemented)
- ⏳ Activities page (needs update)
- ⏳ Contact page (needs update)
- ⏳ Events page (needs update)
- ⏳ News page (needs update)

**Note:** Homepage uses its own hero background (`/hero-background.jpg`)

## 🔧 Technical Details

### Image Optimization
- All images uploaded to Sanity are automatically:
  - Optimized for web
  - Compressed
  - Served via global CDN
  - Available in multiple sizes

### Image URLs
Sanity provides responsive images automatically:
```typescript
// Example: Get optimized image URL
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/lib/sanity'

const builder = imageUrlBuilder(client)
const url = builder
  .image(imageAsset)
  .width(800)
  .height(600)
  .url()
```

### Fetching Background Images
Pages fetch background images like this:

```typescript
const settings = await client.fetch(`*[_type == "settings"][0] {
  backgroundImages
}`)

// Pass to component
<RotatingBackground images={settings?.backgroundImages} />
```

## 📝 TODO: Update Remaining Pages

The following pages still need to be updated to fetch and use Sanity background images:

### Activities Page (`src/app/[locale]/activities/page.tsx`)
```typescript
// Add to the top of component function:
const settings = await client.fetch(`*[_type == "settings"][0] {
  backgroundImages
}`)

// Update the RotatingBackground component:
<RotatingBackground images={settings?.backgroundImages} />
```

### Contact Page (`src/app/[locale]/contact/page.tsx`)
Same pattern as Activities page.

### Events Page (`src/app/[locale]/events/page.tsx`)
Same pattern - fetch settings and pass to RotatingBackground.

### News Page (`src/app/[locale]/news/page.tsx`)
Same pattern - fetch settings and pass to RotatingBackground.

## 🎨 Favicon

The Plast emblem (`/public/plast-emblem.jpg`) is now used as the site icon:
- ✅ Copied to `/public/icon.jpg`
- ✅ Next.js will automatically use this as favicon

## 🚀 Best Practices

1. **Always add alt text** - Improves SEO and accessibility
2. **Use hotspot tool** - Ensures important parts of images are visible on mobile
3. **Optimize before upload** - While Sanity optimizes automatically, uploading smaller images helps
4. **Consistent naming** - Use descriptive filenames
5. **Test on mobile** - Check how images look on different devices

## 📚 Additional Resources

- [Sanity Image Documentation](https://www.sanity.io/docs/image-type)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/images)
- [Sanity Image URL Builder](https://www.sanity.io/docs/image-url)

## 🆘 Troubleshooting

### Images not appearing?
1. Check that images are published in Sanity Studio
2. Clear browser cache
3. Check browser console for errors
4. Verify image URLs in Network tab

### Upload script failing?
1. Check `.env.local` has correct Sanity credentials
2. Ensure `/photo` folder exists with `.jpg` images
3. Check Sanity API token has write permissions

### Background not rotating?
1. Check that `settings.backgroundImages` has images
2. Verify component receives `images` prop
3. Check browser console for errors

---

**Need Help?** Check the Sanity Studio at `/studio` or review the schema files in `src/sanity/schemas/`.
