'use client';

export default function GoogleSignInButton() {
  return (
    <a
      href="/auth/google/start"
      className="mt-4 inline-flex items-center justify-center rounded-sm border px-6 py-2 text-sm font-medium"
    >
      Sign in with Google
    </a>
  );
}
