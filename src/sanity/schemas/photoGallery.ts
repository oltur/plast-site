import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export default defineType({
  name: 'photoGallery',
  title: 'Photo Gallery',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'uk', type: 'string', title: 'Ukrainian' },
        { name: 'de', type: 'string', title: 'German' },
        { name: 'en', type: 'string', title: 'English' },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'uk', type: 'text', title: 'Ukrainian' },
        { name: 'de', type: 'text', title: 'German' },
        { name: 'en', type: 'text', title: 'English' },
      ],
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'object',
              title: 'Caption',
              fields: [
                { name: 'uk', type: 'string', title: 'Ukrainian' },
                { name: 'de', type: 'string', title: 'German' },
                { name: 'en', type: 'string', title: 'English' },
              ],
            },
          ],
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'accessLevel',
      title: 'Access Level',
      type: 'string',
      options: {
        list: [
          { title: 'All Members', value: 'member' },
          { title: 'Leaders Only', value: 'leader' },
          { title: 'Admins Only', value: 'admin' },
        ],
      },
      initialValue: 'member',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      titleUk: 'title.uk',
      titleEn: 'title.en',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ titleUk, titleEn, date, media }) {
      return {
        title: titleUk || titleEn || 'Untitled',
        subtitle: date,
        media,
      }
    },
  },
})
