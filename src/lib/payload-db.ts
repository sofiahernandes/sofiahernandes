import { sqliteAdapter } from '@payloadcms/db-sqlite'

type DatabaseProvider = 'sqlite'

function getDatabaseProvider(): DatabaseProvider {
  const provider = (process.env.DATABASE_PROVIDER || 'sqlite').toLowerCase()

  if (provider !== 'sqlite') {
    throw new Error(
      `Unsupported DATABASE_PROVIDER "${provider}". Install and wire a matching adapter before using it.`
    )
  }

  return provider
}

export function getPayloadDatabaseAdapter() {
  const provider = getDatabaseProvider()

  if (provider === 'sqlite') {
    const url = process.env.DATABASE_URL || 'file:./temp/payload.db'
    const authToken = process.env.DATABASE_AUTH_TOKEN

    return sqliteAdapter({
      client: {
        url,
        ...(authToken ? { authToken } : {}),
      },
    })
  }

  throw new Error(`Unhandled DATABASE_PROVIDER "${provider}".`)
}
