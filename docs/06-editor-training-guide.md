# Editor Training Guide

A comprehensive guide for content editors using Sanity Studio to manage the Plast Düsseldorf website.

## Getting Started

### Accessing Sanity Studio

**Production URL:** https://plast-duesseldorf.de/studio

**Login Credentials:**
- Your email address (provided by administrator)
- Password (set during account setup)

**First Login:**
1. Check your email for invitation from Sanity
2. Click activation link
3. Create a password
4. Login to Studio

## Sanity Studio Overview

### Main Interface

When you login, you'll see:

```
┌─────────────────────────────────────────┐
│  Plast Düsseldorf CMS                   │
├─────────────────────────────────────────┤
│ ┌─────────┐ ┌────────────────────────┐ │
│ │ Sidebar │ │   Main Editing Area    │ │
│ │         │ │                        │ │
│ │ Pages   │ │   Document fields      │ │
│ │ Events  │ │   with UK/DE/EN tabs  │ │
│ │ Posts   │ │                        │ │
│ │ Team    │ │                        │ │
│ │ Settings│ │   [Save] [Publish]    │ │
│ └─────────┘ └────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Document Types

You'll work with these content types:

1. **Pages** - Static pages (About, Activities, etc.)
2. **Events** - Calendar events with registration
3. **Blog Posts** - News articles and stories
4. **Team Members** - Leadership profiles
5. **Settings** - Global site configuration
6. **Form Submissions** - Contact form data (read-only)

## Working with Multilingual Content

### Understanding the Three-Language System

All content must be entered in **three languages simultaneously**:
- **Ukrainian (Українська)** - Primary language
- **German (Deutsch)** - Local language
- **English** - International language

### Language Fields

Each text field appears three times:

```
┌─────────────────────────────────────────┐
│ Title                                   │
├─────────────────────────────────────────┤
│ Українська (Ukrainian)                  │
│ ┌─────────────────────────────────────┐ │
│ │ Пластовий осередок у Дюссельдорфі  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Deutsch (German)                        │
│ ┌─────────────────────────────────────┐ │
│ │ Plast-Gruppe Düsseldorf            │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ English                                 │
│ ┌─────────────────────────────────────┐ │
│ │ Plast Düsseldorf Scout Group       │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Best Practices

✅ **Do:**
- Fill in all three languages before publishing
- Keep translations consistent in meaning
- Proofread in each language
- Use native speakers when possible

❌ **Don't:**
- Leave language fields empty
- Use machine translation without review
- Mix languages in the same field
- Copy/paste between unrelated content

## Creating Content

### 1. Creating a New Event

**Step-by-step:**

1. Click "Event" in sidebar
2. Click "+ Create" button
3. Fill in all fields:

   **Title:** (in all 3 languages)
   ```
   UK: Літній табір 2026
   DE: Sommerlager 2026
   EN: Summer Camp 2026
   ```

   **Slug:** Click "Generate" (creates URL)
   ```
   summer-camp-2026
   ```

   **Description:** (rich text in all 3 languages)
   - Use formatting tools (bold, lists, links)
   - Add detailed program information

   **Dates:**
   - Start Date: Click calendar, select date & time
   - End Date: Same process
   - Registration Deadline: Set cutoff date

   **Location:**
   ```
   Name (UK/DE/EN): Schwarzwald / Schwarzwald / Black Forest
   Address: Full address
   Coordinates: Click map to set (optional)
   ```

   **Age Group:** Select from dropdown
   - Cubs (6-11)
   - Scouts (12-17)
   - Seniors (18+)
   - All Ages

   **Capacity:** Maximum participants (e.g., 40)

   **Price:** In euros (e.g., 200)

   **Images:**
   - Click "Upload"
   - Select image (JPG or PNG)
   - Add Alt Text in all 3 languages

   **Registration Form Fields:**
   - Click "+ Add item"
   - Set Label (UK/DE/EN)
   - Choose Field Type (text, email, phone, etc.)
   - Check "Required" if needed
   - Repeat for each field

   **Status:** Select "Draft" (publish later)

4. Click "Publish" when ready

**Result:** Event appears on website calendar in all three languages!

### 2. Creating a Blog Post

1. Click "Blog Post" in sidebar
2. Click "+ Create"
3. Fill in:

   **Title:** Post title in all languages

   **Slug:** Auto-generated from title

   **Excerpt:** Brief summary (2-3 sentences)

   **Content:** Full article text
   - Use heading styles (H2, H3)
   - Add bold/italic formatting
   - Insert links
   - Create lists

   **Author:** Select from Team Members

   **Featured Image:**
   - Upload main image
   - Add Alt Text (important for accessibility!)

   **Gallery:** (optional)
   - Upload multiple photos
   - Add captions in all languages

   **Categories:** Select relevant tags
   - News
   - Events
   - Camps
   - Training
   - Community

   **Published Date:** Usually current date

4. Click "Publish"

### 3. Creating a Page

Static pages (About, Activities, etc.):

1. Click "Page" in sidebar
2. Click "+ Create"
3. Fill in:

   **Title & Slug:** As with other content

   **Description:** For SEO (appears in search results)

   **Content:** Main page content (rich text)
   - Supports headings, lists, images
   - Keep it well-structured

   **Featured Image:** (optional)

4. Publish

## Editing Existing Content

### Finding Content

**Search:**
- Use search bar at top
- Type event name, blog title, etc.

**Browse:**
- Click document type in sidebar
- Scroll through list
- Click to edit

### Making Changes

1. Click on document to edit
2. Make your changes
3. **Important:** Changes are auto-saved as "Draft"
4. Preview in each language (if preview configured)
5. Click "Publish" to make live

### Draft vs. Published

- **Draft:** Only visible in Studio, not on website
- **Published:** Live on website
- **Changes to Published:** Creates new draft until you publish again

**Workflow:**
```
Create → Draft → Edit → Publish → Live on Website
                   ↓
               Edit Again → Draft → Publish → Updated on Website
```

## Working with Images

### Uploading Images

1. Click image field
2. Click "Upload"
3. Select image from computer
4. Image appears in Studio

### Image Requirements

- **Format:** JPG or PNG
- **Size:** Max 5MB (smaller is better)
- **Dimensions:** Recommended 1920x1080 for featured images

### Alt Text (Accessibility)

**Always add Alt Text!**

Good Alt Text:
```
✅ UK: Діти граються біля вогнища під час літнього табору
✅ DE: Kinder spielen am Lagerfeuer während des Sommerlagers
✅ EN: Children playing around campfire during summer camp
```

Bad Alt Text:
```
❌ UK: Фото
❌ DE: Bild
❌ EN: Image
```

### Image Gallery

For multiple images (blog posts, events):

1. Click "+ Add item" in Gallery field
2. Upload image
3. Add Alt Text
4. Add Caption (optional)
5. Repeat for each image

## Form Submissions

### Viewing Submissions

1. Click "Form Submission" in sidebar
2. See list of all form submissions
3. Click to view details

**Fields:**
- **Form Type:** Contact, Event Registration, etc.
- **Status:** New, Read, Processed
- **Data:** Submitted information
- **Date:** When submitted

### Processing Submissions

1. Read submission
2. Update Status to "Read" or "Processed"
3. Respond to submitter via email (outside Studio)

**Note:** You cannot edit submission data, only view and change status.

## Settings & Configuration

### Global Site Settings

Access via "Settings" in sidebar:

**Site Title & Description:**
- Appears in browser tabs
- Used for SEO

**Logo:**
- Upload organization logo

**Contact Information:**
- Email, phone, address
- Displayed in footer

**Social Media:**
- Facebook URL
- Instagram URL
- YouTube URL

**Footer Text:**
- Custom footer content (all languages)

**Save Changes:**
- Click "Publish" to update site-wide

## Publishing Workflow

### Individual Publishing

For each document:
1. Create/edit content
2. Review in all languages
3. Click "Publish" button
4. Changes go live immediately

### Unpublishing

To remove content from website:
1. Open document
2. Click "..." menu (top right)
3. Select "Unpublish"
4. Content removed from website but saved as draft

### Deleting

To permanently delete:
1. Unpublish first
2. Click "..." menu
3. Select "Delete"
4. Confirm deletion

**Warning:** Cannot be undone!

## Tips & Best Practices

### Content Quality

✅ **Always:**
- Fill in all three languages
- Add alt text to images
- Proofread before publishing
- Use clear, simple language
- Break text into short paragraphs

❌ **Avoid:**
- Very long paragraphs (>5 sentences)
- Missing images
- Unclear or generic titles
- Broken links
- Empty language fields

### Event Management

**Before Event:**
- Publish 2-4 weeks in advance
- Set registration deadline
- Monitor registrations
- Update capacity if needed

**After Event:**
- Change status to "Completed"
- Create blog post with photos
- Add to photo gallery

### Blog Posts

**Frequency:** At least 2-3 posts per month

**Content Ideas:**
- Event recaps with photos
- Upcoming event announcements
- Member spotlights
- Historical articles about Plast
- Community stories

**SEO Tips:**
- Use descriptive titles
- Add relevant categories
- Include keywords naturally
- Link to related content

## Common Tasks

### Task 1: Publish Upcoming Event

```
1. Events → + Create
2. Fill title, dates, location (all languages)
3. Add description and program
4. Upload event photo
5. Set capacity and registration deadline
6. Add registration form fields
7. Set status to "Published"
8. Click Publish
```

### Task 2: Add Event Photos After Event

```
1. Find event in Events list
2. Click to edit
3. Scroll to Images section
4. Upload photos (+ Add item)
5. Add alt text for each
6. Change status to "Completed"
7. Click Publish
```

### Task 3: Create News Article

```
1. Blog Post → + Create
2. Write title and excerpt (all languages)
3. Write main content
4. Select author
5. Upload featured image
6. Add gallery if multiple photos
7. Select categories
8. Click Publish
```

## Troubleshooting

### "Cannot Publish" Error

**Possible Causes:**
- Missing required fields (title, slug)
- Empty language fields
- Invalid date format

**Solution:** Check for red error messages, fill missing fields

### Images Not Uploading

**Possible Causes:**
- File too large (>5MB)
- Wrong format (must be JPG/PNG)
- Slow internet connection

**Solution:**
- Compress image before uploading
- Check file format
- Retry upload

### Content Not Appearing on Website

**Checklist:**
1. ✅ Did you click "Publish"? (not just Save)
2. ✅ Is status set to "Published"?
3. ✅ Are all required language fields filled?
4. ✅ Wait 5-10 minutes (cache refresh)

## Getting Help

### Support Contacts

**Technical Issues:**
- Email: admin@plast-duesseldorf.de

**Content Questions:**
- Contact your content coordinator

**Sanity Studio Help:**
- Documentation: https://www.sanity.io/docs

### Best Practices Reminders

1. **Always save your work** (auto-saves, but check!)
2. **Preview before publishing** (if available)
3. **Fill all three languages**
4. **Use descriptive filenames for images**
5. **Add alt text to every image**
6. **Proofread in each language**
7. **Publish regularly** (keep content fresh)

---

**Remember:** You're maintaining the online presence of Plast Düsseldorf. Take your time, be thorough, and ask for help when needed!

**Слава Україні! Скоб!** 🇺🇦
