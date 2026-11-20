import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import '@/styles/globals.css';
import type React from 'react';
import { rethink } from '@/app/fonts';
import { getPortfolioJsonLd, SEO_CONFIG, SITE_URL } from '@/lib/seo';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_CONFIG.title,
    template: SEO_CONFIG.titleTemplate,
  },
  description: SEO_CONFIG.description,
  applicationName: SEO_CONFIG.siteName,
  authors: [{ name: SEO_CONFIG.author.name, url: `${SITE_URL}/` }],
  creator: SEO_CONFIG.author.name,
  publisher: SEO_CONFIG.author.name,
  keywords: [...SEO_CONFIG.keywords],
  category: 'technology',
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    siteName: SEO_CONFIG.siteName,
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    locale: SEO_CONFIG.locale,
    alternateLocale: [...SEO_CONFIG.alternateLocales],
    images: [
      {
        url: SEO_CONFIG.ogImage.url,
        secureUrl: SEO_CONFIG.ogImage.secureUrl,
        width: SEO_CONFIG.ogImage.width,
        height: SEO_CONFIG.ogImage.height,
        alt: SEO_CONFIG.ogImage.alt,
        type: SEO_CONFIG.ogImage.type,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    creator: '@sofiabotechia',
    images: [
      {
        url: SEO_CONFIG.ogImage.url,
        width: SEO_CONFIG.ogImage.width,
        height: SEO_CONFIG.ogImage.height,
        alt: SEO_CONFIG.ogImage.alt,
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname =
    headerList.get('next-url') ||
    headerList.get('x-next-url') ||
    headerList.get('x-matched-path') ||
    '';

  if (pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  const jsonLd = getPortfolioJsonLd();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`blue font-sans scroll-auto ${rethink.className}`}
    >
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLM Summary"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="LLM Full Profile"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`min-h-screen overflow-x-clip overflow-y-auto p-0! m-0! bg-background font-sans antialiased ${rethink.className}`}
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
