import type { CollectionConfig } from 'payload'
import { isAllowedEmail } from '@/lib/allowlist'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  hooks: {
    beforeLogin: [
      ({ user }) => {
        if (!isAllowedEmail(user.email)) {
          throw new Error('Acesso proibido')
        }
      },
    ],
  },
  versions: false,
}
