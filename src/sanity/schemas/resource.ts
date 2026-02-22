import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  icon: DocumentTextIcon,
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Training Material', value: 'training' },
          { title: 'Form/Document', value: 'form' },
          { title: 'General Resource', value: 'general' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
      },
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Use this instead of file upload for external resources',
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
