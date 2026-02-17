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
      validation: Rule => Rule.required(),
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
