import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export default defineType({
  name: 'song',
  title: 'Song',
  type: 'document',
  icon: PlayIcon,
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
      name: 'lyrics',
      title: 'Lyrics',
      type: 'object',
      fields: [
        {
          name: 'uk',
          type: 'array',
          title: 'Ukrainian',
          of: [{ type: 'block' }],
        },
        {
          name: 'de',
          type: 'array',
          title: 'German',
          of: [{ type: 'block' }],
        },
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [{ type: 'block' }],
        },
      ],
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      description: 'Upload an audio recording of the song',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'externalLink',
      title: 'External Audio/Video Link',
      type: 'url',
      description: 'Link to YouTube, SoundCloud, or other external audio/video (used if no audio file uploaded)',
    }),
    defineField({
      name: 'sheetMusic',
      title: 'Sheet Music',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Plast Songs', value: 'plast' },
          { title: 'Ukrainian Folk', value: 'folk' },
          { title: 'Campfire Songs', value: 'campfire' },
          { title: 'Ceremonial', value: 'ceremonial' },
        ],
      },
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
      category: 'category',
    },
    prepare({ titleUk, titleEn, category }) {
      return {
        title: titleUk || titleEn || 'Untitled',
        subtitle: category,
      }
    },
  },
})
