import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verifyGoogleIdToken } from '@/lib/google-auth'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookieStore = await cookies()
  const expectedState = cookieStore.get('payload_google_oauth_state')?.value

  if (!code || !state || state !== expectedState) {
    return NextResponse.redirect(new URL('/admin?error=google_auth', url.origin))
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: 'Missing Google OAuth configuration.' },
      { status: 500 }
    )
  }

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })

  if (!tokenResponse.ok) {
    return NextResponse.redirect(new URL('/admin?error=google_auth', url.origin))
  }

  const tokens = (await tokenResponse.json()) as {
    id_token?: string
  }

  if (!tokens.id_token) {
    return NextResponse.redirect(new URL('/admin?error=google_auth', url.origin))
  }

  await verifyGoogleIdToken(tokens.id_token)

  cookieStore.set('payload_google_id_token', tokens.id_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  cookieStore.delete('payload_google_oauth_state')

  return NextResponse.redirect(new URL('/admin', url.origin))
}
