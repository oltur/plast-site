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
      type: 'localizedBlock',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      validation: Rule => Rule.required(),
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
      validation: Rule => Rule.min(0),
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
      validation: Rule => Rule.min(0),
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
