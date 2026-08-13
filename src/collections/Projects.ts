import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'githubUrl',
      type: 'text',
      required: false,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'src', type: 'text', required: true },
        { name: 'alt', type: 'text', required: true },
      ],
    },
  ],
}
