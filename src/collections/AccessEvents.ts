import type { CollectionConfig } from 'payload'

export const AccessEvents: CollectionConfig = {
  slug: 'access-events',
  admin: {
    useAsTitle: 'occurredAt',
    defaultColumns: ['occurredAt', 'kind', 'anonymousUserId'],
    hidden: true,
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'anonymousUserId',
      type: 'text',
      required: true,
    },
    {
      name: 'kind',
      type: 'text',
      required: true,
    },
    {
      name: 'path',
      type: 'text',
      required: false,
    },
    {
      name: 'occurredAt',
      type: 'date',
      required: true,
    },
  ],
}
