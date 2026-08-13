export function isAllowedEmail(email?: string | null): boolean {
  const allowed = process.env.PAYLOAD_ALLOWED_EMAILS

  if (!allowed) {
    return true
  }

  const normalizedEmail = email?.trim().toLowerCase()

  return allowed
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .includes(normalizedEmail || '')
}
