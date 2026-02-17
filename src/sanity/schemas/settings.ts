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
      validation: Rule => Rule.required(),
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
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'localizedString',
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
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'object',
      fields: [
        {
          name: 'memberCount',
          title: 'Number of Active Members',
          type: 'string',
          description: 'E.g., "100+" or "150"',
        },
        {
          name: 'foundedYear',
          title: 'Year Founded',
          type: 'number',
          description: 'E.g., 2021',
        },
        {
          name: 'ageGroups',
          title: 'Number of Age Groups',
          type: 'number',
          description: 'E.g., 4',
        },
      ],
    }),
    defineField({
      name: 'backgroundImages',
      title: 'Background Images',
      type: 'array',
      description: 'Images used for rotating backgrounds on About, Activities, Events, News, and Contact pages',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
      validation: Rule => Rule.max(10),
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
