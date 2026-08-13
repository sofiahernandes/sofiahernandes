import type { CollectionConfig } from 'payload'
import { googleAuthStrategy } from '@/lib/google-auth'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    disableLocalStrategy: {
      enableFields: true,
      optionalPassword: true,
    },
    strategies: [googleAuthStrategy],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  access: {
    admin: ({ req: { user } }) =>
      Boolean(user && user.email?.toLowerCase() === 'sofiahernandes.dev@gmail.com'),
  },
  versions: false,
}
