import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'activity',
  title: 'Activity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'uk', title: 'Ukrainian', type: 'string' },
        { name: 'de', title: 'German', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'uk',
          title: 'Ukrainian',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'de',
          title: 'German',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'object',
      fields: [
        { name: 'uk', title: 'Ukrainian', type: 'text', rows: 3 },
        { name: 'de', title: 'German', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Regular Meetings', value: 'regular' },
          { title: 'Camps & Training', value: 'camps' },
          { title: 'Community Service', value: 'community' },
          { title: 'Cultural Events', value: 'cultural' },
          { title: 'Sports & Recreation', value: 'sports' },
        ],
      },
    }),
    defineField({
      name: 'images',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'object',
              title: 'Alternative Text',
              fields: [
                { name: 'uk', title: 'Ukrainian', type: 'string' },
                { name: 'de', title: 'German', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
              ],
            },
            {
              name: 'caption',
              type: 'object',
              title: 'Caption',
              fields: [
                { name: 'uk', title: 'Ukrainian', type: 'string' },
                { name: 'de', title: 'German', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
              ],
            },
          ],
        },
      ],
      validation: Rule => Rule.max(20),
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
      name: 'frequency',
      title: 'Frequency',
      type: 'object',
      fields: [
        { name: 'uk', title: 'Ukrainian', type: 'string' },
        { name: 'de', title: 'German', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Draft', value: 'draft' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'category',
      media: 'images.0',
    },
  },
})
