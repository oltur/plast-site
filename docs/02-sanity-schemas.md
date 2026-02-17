# Sanity CMS Schema Definitions

Complete schema definitions for the Plast Düsseldorf website content model.

## Localization Helper

First, create a reusable localization helper for all translated fields:

```typescript
// src/sanity/schemas/objects/localizedString.ts
import { defineType } from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  type: 'object',
  fields: [
    {
      name: 'uk',
      type: 'string',
      title: 'Українська (Ukrainian)',
    },
    {
      name: 'de',
      type: 'string',
      title: 'Deutsch (German)',
    },
    {
      name: 'en',
      type: 'string',
      title: 'English',
    },
  ],
})

export const localizedText = defineType({
  name: 'localizedText',
  type: 'object',
  fields: [
    {
      name: 'uk',
      type: 'text',
      title: 'Українська (Ukrainian)',
      rows: 3,
    },
    {
      name: 'de',
      type: 'text',
      title: 'Deutsch (German)',
      rows: 3,
    },
    {
      name: 'en',
      type: 'text',
      title: 'English',
      rows: 3,
    },
  ],
})

export const localizedBlock = defineType({
  name: 'localizedBlock',
  type: 'object',
  fields: [
    {
      name: 'uk',
      type: 'array',
      title: 'Українська (Ukrainian)',
      of: [{ type: 'block' }],
    },
    {
      name: 'de',
      type: 'array',
      title: 'Deutsch (German)',
      of: [{ type: 'block' }],
    },
    {
      name: 'en',
      type: 'array',
      title: 'English',
      of: [{ type: 'block' }],
    },
  ],
})
```

## 1. Page Schema

Flexible multi-section content pages.

```typescript
// src/sanity/schemas/page.ts
import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (for SEO)',
      type: 'localizedText',
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'localizedBlock',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'localizedString',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'slug.current',
      media: 'featuredImage',
    },
  },
})
```

## 2. Event Schema

Calendar events with registration functionality.

```typescript
// src/sanity/schemas/event.ts
import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedBlock',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'name',
          type: 'localizedString',
          title: 'Location Name',
        },
        {
          name: 'address',
          type: 'text',
          title: 'Address',
        },
        {
          name: 'coordinates',
          type: 'geopoint',
          title: 'Coordinates',
        },
      ],
    }),
    defineField({
      name: 'ageGroup',
      title: 'Age Group',
      type: 'string',
      options: {
        list: [
          { title: 'Cubs (6-11)', value: 'cubs' },
          { title: 'Scouts (12-17)', value: 'scouts' },
          { title: 'Seniors (18+)', value: 'seniors' },
          { title: 'All Ages', value: 'all' },
        ],
      },
    }),
    defineField({
      name: 'capacity',
      title: 'Maximum Participants',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'registrationDeadline',
      title: 'Registration Deadline',
      type: 'datetime',
    }),
    defineField({
      name: 'price',
      title: 'Price (€)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'images',
      title: 'Event Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'localizedString',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'registrationFormFields',
      title: 'Registration Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'localizedString',
              title: 'Field Label',
            },
            {
              name: 'fieldType',
              type: 'string',
              title: 'Field Type',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                  { title: 'Number', value: 'number' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Checkbox', value: 'checkbox' },
                ],
              },
            },
            {
              name: 'required',
              type: 'boolean',
              title: 'Required Field',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Registration Full', value: 'full' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      startDate: 'startDate',
      media: 'images.0',
      status: 'status',
    },
    prepare({ title, startDate, media, status }) {
      return {
        title,
        subtitle: `${new Date(startDate).toLocaleDateString()} - ${status}`,
        media,
      }
    },
  },
})
```

## 3. Blog Post Schema

News articles and blog posts.

```typescript
// src/sanity/schemas/post.ts
import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
      description: 'Brief summary for listings',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedBlock',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'localizedString',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'localizedString',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'localizedString',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'News', value: 'news' },
          { title: 'Events', value: 'events' },
          { title: 'Camps', value: 'camps' },
          { title: 'Training', value: 'training' },
          { title: 'Community', value: 'community' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      author: 'author.name',
      media: 'featuredImage',
      date: 'publishedAt',
    },
    prepare({ title, author, media, date }) {
      return {
        title,
        subtitle: `${author} - ${new Date(date).toLocaleDateString()}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
```

## 4. Team Member Schema

Leadership and staff profiles.

```typescript
// src/sanity/schemas/teamMember.ts
import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'localizedBlock',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role.en',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
```

## 5. Settings Schema

Global site configuration.

```typescript
// src/sanity/schemas/settings.ts
import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          type: 'url',
          title: 'Facebook',
        },
        {
          name: 'instagram',
          type: 'url',
          title: 'Instagram',
        },
        {
          name: 'youtube',
          type: 'url',
          title: 'YouTube',
        },
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'localizedBlock',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
```

## 6. Form Submission Schema

Store form submissions.

```typescript
// src/sanity/schemas/formSubmission.ts
import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export default defineType({
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [
          { title: 'Contact', value: 'contact' },
          { title: 'Event Registration', value: 'event-registration' },
          { title: 'Event Feedback', value: 'event-feedback' },
          { title: 'Join Us', value: 'join-us' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'data',
      title: 'Submission Data',
      type: 'object',
      fields: [
        {
          name: 'raw',
          type: 'text',
          title: 'Raw JSON',
          readOnly: true,
        },
      ],
    }),
    defineField({
      name: 'eventReference',
      title: 'Related Event',
      type: 'reference',
      to: [{ type: 'event' }],
      hidden: ({ document }) => document?.formType !== 'event-registration',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Processed', value: 'processed' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      formType: 'formType',
      status: 'status',
      date: 'submittedAt',
    },
    prepare({ formType, status, date }) {
      return {
        title: formType,
        subtitle: `${status} - ${new Date(date).toLocaleDateString()}`,
      }
    },
  },
  orderings: [
    {
      title: 'Submitted Date, New',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
})
```

## Schema Index

```typescript
// src/sanity/schemas/index.ts
import { localizedString, localizedText, localizedBlock } from './objects/localizedString'
import page from './page'
import event from './event'
import post from './post'
import teamMember from './teamMember'
import settings from './settings'
import formSubmission from './formSubmission'

export const schemaTypes = [
  // Objects
  localizedString,
  localizedText,
  localizedBlock,

  // Documents
  page,
  event,
  post,
  teamMember,
  settings,
  formSubmission,
]
```

---

**Note:** All schemas use field-level localization for Ukrainian, German, and English content. Editors will see all three language fields side-by-side in Sanity Studio for simultaneous editing.
