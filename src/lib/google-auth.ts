import { createRemoteJWKSet, jwtVerify } from 'jose'
import type { AuthStrategy } from 'payload'

const allowedEmail = 'sofiahernandes.dev@gmail.com'
const issuer = 'https://accounts.google.com'
const jwks = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'))

function getGoogleClientId() {
  const clientId = process.env.GOOGLE_CLIENT_ID

  if (!clientId) {
    throw new Error('Missing GOOGLE_CLIENT_ID.')
  }

  return clientId
}

export async function verifyGoogleIdToken(idToken: string) {
  const { payload } = await jwtVerify(idToken, jwks, {
    issuer,
    audience: getGoogleClientId(),
  })

  if (String(payload.email || '').toLowerCase() !== allowedEmail) {
    throw new Error('Acesso proibido')
  }

  return payload
}

export const googleAuthStrategy: AuthStrategy = {
  name: 'google',
  authenticate: async ({ headers, payload }) => {
    const cookieHeader = headers.get('cookie') || ''
    const match = cookieHeader.match(/(?:^|;\s*)payload_google_id_token=([^;]+)/)

    if (!match) {
      return { user: null }
    }

    const idToken = decodeURIComponent(match[1])
    const claims = await verifyGoogleIdToken(idToken)

    const email = String(claims.email || '').toLowerCase()

    const result = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    })

    const user = result.docs[0]

    return {
      user: user
        ? {
            ...user,
            _strategy: 'google',
          }
        : null,
    }
  },
}
