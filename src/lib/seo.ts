export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sofiab-portfolio.vercel.app'
).replace(/\/+$/, '');

export const SEO_CONFIG = {
  siteName: 'Sofia Botechia Hernandes',
  shortName: 'Sofia Botechia',
  title: 'Sofia Botechia Hernandes | Software Developer & AI Engineer',
  titleTemplate: '%s | Sofia Botechia Hernandes',
  description:
    'Portfolio of Sofia Botechia Hernandes, a Software Developer & AI Engineer in São Paulo building scalable web platforms, CMS architectures, and AI automations.',
  locale: 'en_US',
  alternateLocales: ['pt_BR'],
  author: {
    name: 'Sofia Botechia Hernandes',
    alternateName: 'Sofia Botechia',
    role: 'Software Developer & AI Engineer',
    email: 'sofiahernandes.dev@gmail.com',
    phone: '+55-11-94447-8200',
    location: {
      city: 'São Paulo',
      region: 'SP',
      country: 'BR',
      countryName: 'Brazil',
    },
    url: SITE_URL,
    github: 'https://github.com/sofiahernandes',
    linkedin: 'https://www.linkedin.com/in/sofiahernandes',
    instagram: 'https://www.instagram.com/sofiabotechia/',
  },
  ogImage: {
    url: `${SITE_URL}/images/og-image.png`,
    secureUrl: `${SITE_URL}/images/og-image.png`,
    width: 1200,
    height: 630,
    alt: 'Sofia Botechia Hernandes — Software Developer & AI Engineer interactive macOS desktop portfolio',
    type: 'image/png',
  },
  keywords: [
    'Sofia Botechia Hernandes',
    'Sofia Botechia',
    'Sofia Hernandes',
    'Software Developer',
    'Software Engineer',
    'AI Engineer',
    'Full-Stack Developer',
    'Next.js Developer',
    'React Developer',
    'TypeScript',
    'Payload CMS',
    'Strapi',
    'AI Automations',
    'Multi-Agent Systems',
    'RAG Systems',
    'Agentic Workflows',
    'São Paulo Software Engineer',
    'Brazil Software Developer',
  ],
} as const;

export function getPortfolioJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SEO_CONFIG.siteName,
        alternateName: SEO_CONFIG.shortName,
        description: SEO_CONFIG.description,
        inLanguage: 'en-US',
        publisher: {
          '@id': `${SITE_URL}/#person`,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: `${SITE_URL}/`,
        name: SEO_CONFIG.title,
        description: SEO_CONFIG.description,
        inLanguage: 'en-US',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#person`,
        },
        mainEntity: {
          '@id': `${SITE_URL}/#person`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#primaryimage`,
          url: SEO_CONFIG.ogImage.url,
          contentUrl: SEO_CONFIG.ogImage.url,
          width: SEO_CONFIG.ogImage.width,
          height: SEO_CONFIG.ogImage.height,
          caption: SEO_CONFIG.ogImage.alt,
        },
        breadcrumb: {
          '@id': `${SITE_URL}/#breadcrumb`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
        ],
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SEO_CONFIG.author.name,
        alternateName: SEO_CONFIG.author.alternateName,
        givenName: 'Sofia',
        additionalName: 'Botechia',
        familyName: 'Hernandes',
        jobTitle: SEO_CONFIG.author.role,
        description: SEO_CONFIG.description,
        url: `${SITE_URL}/`,
        image: {
          '@id': `${SITE_URL}/#primaryimage`,
        },
        email: `mailto:${SEO_CONFIG.author.email}`,
        telephone: SEO_CONFIG.author.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: SEO_CONFIG.author.location.city,
          addressRegion: SEO_CONFIG.author.location.region,
          addressCountry: SEO_CONFIG.author.location.country,
        },
        worksFor: {
          '@type': 'Organization',
          name: 'FutureBrand',
        },
        knowsLanguage: [
          {
            '@type': 'Language',
            name: 'Portuguese',
            alternateName: 'pt',
          },
          {
            '@type': 'Language',
            name: 'English',
            alternateName: 'en',
          },
          {
            '@type': 'Language',
            name: 'Spanish',
            alternateName: 'es',
          },
        ],
        knowsAbout: [
          'Software Engineering',
          'Artificial Intelligence Engineering',
          'Next.js',
          'React',
          'React Native',
          'TypeScript',
          'Node.js',
          'Payload CMS',
          'Strapi',
          'WordPress',
          'Prisma',
          'PostgreSQL',
          'MySQL',
          'SQLite',
          'RAG Systems',
          'Multi-Agent Applications',
          'Agentic Workflows',
          'Prompt Engineering',
          'AWS Cloud Architecture',
        ],
        sameAs: [
          SEO_CONFIG.author.github,
          SEO_CONFIG.author.linkedin,
          SEO_CONFIG.author.instagram,
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#projects`,
        name: 'Selected Engineering & AI Projects by Sofia Botechia Hernandes',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Enterprise Rebranding & CMS Platforms',
            description:
              'Operationally critical web applications and reusable CMS architectures built for Amazônia, Ativos (Banco do Brasil), Banco da Amazônia, Crown, GCB Investimentos, and Totvs Techfin across 16+ enterprise websites.',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Internal AI Automations & Multi-Agent Systems',
            description:
              'Production AI systems, RAG pipelines, managed internal plugins, and custom multi-agent workflows built to accelerate enterprise operations.',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Custom Full-Stack Web Applications & UX/UI Systems',
            description:
              'End-to-end digital products designed and engineered for businesses and creators from UX research to cloud deployment.',
          },
        ],
      },
    ],
  };
}
