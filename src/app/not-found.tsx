import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    'The page you are looking for could not be found on Sofia Botechia Hernandes portfolio.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center text-black">
      <h1 className="text-4xl font-extrabold tracking-tight">
        404 — Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm text-gray-500">
        The requested resource does not exist on Sofia Botechia Hernandes’s
        portfolio.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-sm bg-black px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-50"
      >
        Return to Desktop Portfolio
      </Link>
    </main>
  );
}
