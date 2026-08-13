import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { AccessEvents } from './collections/AccessEvents'
import { Users } from './collections/Users'
import { Projects } from './collections/Projects'
import { SiteContent } from './globals/SiteContent'
import { getPayloadDatabaseAdapter } from './lib/payload-db'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const payloadSecret =
  process.env.PAYLOAD_SECRET ||
  (process.env.NODE_ENV === 'production' ? '' : 'dev-payload-secret')

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'light',
    components: {
      beforeLogin: ['@/components/admin/GoogleSignInButton#default'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, AccessEvents, Projects],
  globals: [SiteContent],
  db: getPayloadDatabaseAdapter(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
})
