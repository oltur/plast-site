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
