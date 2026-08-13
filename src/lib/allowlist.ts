export function isAllowedEmail(email?: string | null): boolean {
  const normalizedEmail = email?.trim().toLowerCase()
  return normalizedEmail === 'sofiahernandes.dev@gmail.com'
}
