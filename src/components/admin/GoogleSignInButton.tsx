"use client";

export default function GoogleSignInButton() {
  return (
    <a
      href="/auth/google/start"
      className="mt-4 inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium"
    >
      Sign in with Google
    </a>
  )
}
