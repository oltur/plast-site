import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'password',
      title: 'Password Hash',
      type: 'string',
      description: 'Hashed password (never store plain text)',
      hidden: true,
    }),
    defineField({
      name: 'image',
      title: 'Profile Picture',
      type: 'image',
      description: 'Upload a profile picture',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'avatarUrl',
      title: 'Avatar URL',
      type: 'url',
      description: 'Profile picture URL from OAuth provider (Google, etc.)',
      hidden: true,
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Member', value: 'member' },
          { title: 'Leader', value: 'leader' },
          { title: 'Admin', value: 'admin' },
        ],
      },
      initialValue: 'member',
      validation: Rule => Rule.required(),
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
        ],
      },
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'emergencyContact',
      title: 'Emergency Contact',
      type: 'object',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Contact Name',
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Contact Phone',
        },
        {
          name: 'relationship',
          type: 'string',
          title: 'Relationship',
        },
      ],
    }),
    defineField({
      name: 'googleId',
      title: 'Google ID',
      type: 'string',
      description: 'Google OAuth ID',
      hidden: true,
    }),
    defineField({
      name: 'emailVerified',
      title: 'Email Verified',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Whether this user has been approved by an administrator',
      initialValue: false,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'approvedBy',
      title: 'Approved By',
      type: 'string',
      description: 'Email of the administrator who approved this user',
      readOnly: true,
    }),
    defineField({
      name: 'approvedAt',
      title: 'Approved At',
      type: 'datetime',
      description: 'Date and time when the user was approved',
      readOnly: true,
    }),
    defineField({
      name: 'blockedBy',
      title: 'Blocked By',
      type: 'string',
      description: 'Email of the administrator who blocked this user',
      readOnly: true,
    }),
    defineField({
      name: 'blockedAt',
      title: 'Blocked At',
      type: 'datetime',
      description: 'Date and time when the user was blocked',
      readOnly: true,
    }),
    defineField({
      name: 'memberSince',
      title: 'Member Since',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'image',
      role: 'role',
    },
    prepare({ title, subtitle, media, role }) {
      return {
        title,
        subtitle: `${subtitle} - ${role}`,
        // Only use media if it's a Sanity image object, not a URL string
        media: media && typeof media === 'object' ? media : undefined,
      }
    },
  },
})
