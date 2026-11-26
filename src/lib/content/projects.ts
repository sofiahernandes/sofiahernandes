export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectCredit {
  label: string;
  value: string;
}

export interface ProjectHighlightCard {
  tag: string;
  title: string;
  description: string;
  meta?: string;
}

export interface ProjectMediaItem {
  type: 'video' | 'image';
  src: string;
  alt: string;
  caption?: string;
  span?: 'full' | 'half';
  aspectRatio?: '16/9' | '4/3' | 'auto';
}

export type ProjectCaseStudySection =
  | {
      type: 'text';
      eyebrow?: string;
      heading: string;
      lead?: string;
      paragraphs: string[];
    }
  | {
      type: 'media-grid';
      columns?: 1 | 2;
      items: ProjectMediaItem[];
      caption?: string;
    };

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  headline?: string;
  category: string;
  year: string;
  coverImage: string;
  links: ProjectLink[];
  summaryParagraphs: string[];
  tags: string[];
  credits: ProjectCredit[];
  process: string;
  sections?: ProjectCaseStudySection[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'project-amazonia',
    slug: 'amazonia',
    title: 'Amazônia',
    subtitle: 'Living Brand Platform & Digital Rebranding System',
    headline: 'A living brand for a living territory.',
    category: 'Brand Platform & Web Architecture',
    year: '2026',
    coverImage: '/images/projects/amazonia-cover.png',
    links: [
      {
        label: 'Visit Live Website',
        href: 'https://www.visiteamazonia.com.br/',
      },
      {
        label: 'FutureBrand Case Study',
        href: 'https://www.futurebrand.com/work/amazonia/',
      },
    ],
    summaryParagraphs: [
      'Across nine states, 772 cities, and 28 million residents, the Brazilian Amazon lacked a unified identity to bring its cultural richness, sustainable tourism, and bioeconomy potential together. Developed in collaboration with FutureBrand São Paulo and Embratur, Amazônia is a living brand and digital platform shaped directly by the territory itself.',
      'The platform translates a generative visual identity—whose custom alphabet is derived from real satellite imagery mapping 25,000 kilometers of navigable Amazonian rivers—into an interactive, high-performance web experience and headless CMS architecture.',
    ],
    tags: [
      'Living Brand',
      'Web Platform',
      'Design Systems',
      'CMS Architecture',
      'Interactive Typography',
      'Rebranding',
    ],
    credits: [
      { label: 'Client', value: 'Embratur · RAI · Amazônia' },
      { label: 'Agency', value: 'FutureBrand São Paulo' },
      { label: 'Role', value: 'Software Developer' },
      { label: 'Recognition', value: 'Cannes Lions 3× Silver & 5× Shortlist' },
      { label: 'Stack', value: 'Next.js · TypeScript · Headless CMS · Motion' },
      { label: 'Year', value: '2026' },
    ],
    process:
      'Built to support an internationally recognized territorial brand launch, bridging satellite-inspired generative typography (Igaratipo) and modular storytelling blocks within a resilient, production-ready web architecture.',
    sections: [
      {
        type: 'media-grid',
        columns: 2,
        items: [
          {
            type: 'video',
            src: '/images/projects/amazonia/amazonia-satelite-1.mp4',
            alt: 'Satellite river curves morphing into the Amazônia logotype',
            span: 'half',
          },
          {
            type: 'video',
            src: '/images/projects/amazonia/amazonia-satelite-2.mp4',
            alt: 'Satellite river mosaic with GPS coordinates across Amazonian states',
            span: 'half',
          },
          {
            type: 'image',
            src: '/images/projects/amazonia/amazonia-satelite-3.jpg',
            alt: 'Complete A-Z and 0-9 satellite alphabet mapped from Amazonian rivers',
            span: 'full',
          },
        ],
      },
      {
        type: 'text',
        eyebrow: 'The Solution',
        heading: 'Written by 25,000 kilometers of Amazonian rivers.',
        lead: 'Through deep co-creation with local residents, artists, and stakeholders, the key to the region’s identity was discovered in the Amazon River itself.',
        paragraphs: [
          'Rather than relying on static clichés, the visual identity and custom typeface (Igaratipo) were extracted directly from satellite imagery and real geographic coordinates across Pará, Amazonas, Acre, Amapá, Maranhão, Mato Grosso, Rondônia, Roraima, and Tocantins.',
          'Every letter and numeral captures the organic curves of a real Amazonian waterway—creating a living design system that adapts across places and moments while honoring the distinct cultures of all nine states.',
        ],
      },
      {
        type: 'media-grid',
        columns: 2,
        items: [
          {
            type: 'video',
            src: '/images/projects/amazonia/amazonia-landscape.mp4',
            alt: 'Dynamic brand frames across Portel, Tefé, and Mamirauá landscapes',
            span: 'half',
          },
          {
            type: 'video',
            src: '/images/projects/amazonia/amazonia-poster.mp4',
            alt: 'Co-created poster series by regional Amazonian illustrators Cristo, Winny Tapajós, and Malu Menezes',
            span: 'half',
          },
        ],
      },
      {
        type: 'text',
        eyebrow: 'Digital Platform & Impact',
        heading: 'Bringing the living territory to the web.',
        lead: 'Engineered to turn an experimental typographic identity into an accessible, interactive digital destination.',
        paragraphs: [
          'The web platform (visiteamazonia.com.br) pairs fluid scroll choreography and regional storytelling across all nine states with an interactive typographic laboratory—“Write with the Waters of the Amazonian Rivers”—allowing visitors worldwide to compose and export custom artwork using the river-derived alphabet.',
          'Backed by a modular headless CMS architecture, editorial teams can continuously publish new cultural routes, regional experiences, and destination guides without engineering bottlenecks.',
        ],
      },
      {
        type: 'media-grid',
        columns: 1,
        items: [
          {
            type: 'video',
            src: '/images/projects/amazonia/amazonia-website.mp4',
            alt: 'Walkthrough of the live Amazônia digital platform and interactive Igaratype water typography tool',
            span: 'full',
          },
        ],
      },
    ],
  },
  {
    id: 'project-margaret',
    slug: 'margaret',
    title: 'Margaret',
    subtitle: 'Senior-Engineer Productivity Toolkit for AI Coding Agents',
    category: 'Developer Tools & AI Agent Engineering',
    year: '2026',
    coverImage: '/images/projects/margaret-cover.png',
    links: [
      {
        label: 'Documentation',
        href: 'https://margaret.mintlify.site/docs',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/sofiahernandes/margaret',
      },
    ],
    summaryParagraphs: [
      'Named after Margaret Hamilton—lead software engineer for the Apollo Program’s onboard flight software—Margaret is a senior-engineer productivity toolkit for AI coding agents. It equips agents across Claude Code, Codex, Gemini CLI, Cursor, and Windsurf with a lean-code engineering persona, an over-engineering bloat scanner, a high-confidence security diff reviewer, and a two-way Figma design/code bridge.',
      'Rather than adding ceremony, Margaret enforces a rigorous 7-filter decision screen (YAGNI → repo reuse → stdlib → platform feature → existing dependency → one-liner → minimal code) while strictly preserving trust-boundary validation, security, accessibility, and data-loss protections.',
    ],
    tags: [
      'AI Coding Agents',
      'Developer Toolkit',
      'Security Reviewer',
      'Figma Bridge',
      'Promptfoo Benchmarks',
      'Open Source',
    ],
    credits: [
      { label: 'Author', value: 'Sofia Botechia Hernandes' },
      {
        label: 'Inspiration',
        value: 'Margaret Hamilton (Apollo Flight Software)',
      },
      {
        label: 'Supported Hosts',
        value: 'Claude Code · Codex · Gemini CLI · Cursor · Windsurf',
      },
      {
        label: 'Documentation',
        value: 'Mintlify (margaret.mintlify.site/docs)',
      },
      {
        label: 'Stack',
        value: 'Node.js Hooks · TOML/Markdown Skills · Bash · Promptfoo',
      },
      { label: 'Year', value: '2026 (MIT License)' },
    ],
    process:
      'Designed with lifecycle hooks, cross-host rule synchronization tests, and quantitative Promptfoo evaluation suites to measurably reduce AI-generated code bloat without regressing correctness or security.',
  },
  {
    id: 'project-lumiere',
    slug: 'lumiere',
    title: 'Lumière',
    subtitle: 'Distributed Healthcare Management & Clinical Triage Ecosystem',
    category: 'Distributed Systems & Healthcare Platform',
    year: '2025',
    coverImage: '/images/projects/lumiere-cover.png',
    links: [
      {
        label: 'Web Application',
        href: 'https://admin-lumiere.vercel.app/',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/sofiahernandes/distributed-healthcare-system',
      },
    ],
    summaryParagraphs: [
      'Lumière is a distributed healthcare system engineered to unify patient care workflows, administrative operations, and real-time clinical coordination across web and mobile endpoints.',
      'The architecture pairs a cloud-deployed administrative web portal (Vercel) with a native Android client application (Android Studio), communicating through distributed service boundaries to keep patient records, appointment schedules, and care-team updates synchronized.',
    ],
    tags: [
      'Distributed Systems',
      'Healthcare Tech',
      'Admin Web Portal',
      'Android Client',
      'Real-Time Sync',
      'Full-Stack',
    ],
    credits: [
      { label: 'Project', value: 'Lumière Healthcare System' },
      {
        label: 'Team',
        value:
          'Sofia B. Hernandes · Analice Carneiro · Mariah A. Pereira · Victória Azevedo',
      },
      { label: 'Admin Portal', value: 'admin-lumiere.vercel.app' },
      {
        label: 'Stack',
        value: 'TypeScript · Next.js / React · Android Studio · REST APIs',
      },
      { label: 'Year', value: '2025' },
    ],
    process:
      'Architected around separation of concerns between hospital administration and point-of-care mobile access, ensuring fault tolerance, clear role boundaries, and fast clinical lookup.',
  },
  {
    id: 'project-arkana',
    slug: 'arkana',
    title: 'Arkana',
    subtitle: 'Social Campaign Manager & Recurring Donation Analytics Platform',
    category: 'Campaign Operations & Financial Validation',
    year: '2025',
    coverImage: '/images/projects/arkana-cover.png',
    links: [
      {
        label: 'Web Application',
        href: 'https://arkana-portfolio.vercel.app/',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/sofiahernandes/social-campaign-manager',
      },
    ],
    summaryParagraphs: [
      'Arkana is a full-stack campaign management and analytics platform engineered to orchestrate recurring social donation campaigns. Designed for institutional fundraising drives, it centralizes team administration, activity tracking, goal monitoring, and financial receipt validation in one cohesive workspace.',
      'By replacing fragmented spreadsheets with structured receipt verification workflows and real-time leaderboards, Arkana gives campaign coordinators immediate visibility into fundraising velocity, team participation, and audited contribution totals.',
    ],
    tags: [
      'Campaign Management',
      'Receipt Validation',
      'Performance Analytics',
      'Goal Monitoring',
      'Team Administration',
      'TypeScript',
    ],
    credits: [
      { label: 'Project', value: 'Arkana — Social Campaign Manager' },
      { label: 'Context', value: 'FECAP Recurring Donation Campaigns' },
      { label: 'Role', value: 'Full-Stack Software Developer' },
      {
        label: 'Stack',
        value: 'TypeScript · React / Next.js · Relational DB · Analytics',
      },
      { label: 'Year', value: '2025' },
    ],
    process:
      'Built around auditability and operational speed: every donation receipt passes through a structured verification pipeline that updates team goals and campaign analytics in real time.',
  },
  {
    id: 'project-mana',
    slug: 'mana',
    title: 'Manà',
    subtitle:
      'Local Farm-to-Market Network & Agroecological Subscription Platform',
    category: 'Marketplace, Supply Chain & E-Commerce',
    year: '2026',
    coverImage: '/images/projects/mana-cover.png',
    links: [
      {
        label: 'Web Application',
        href: 'https://mana-brasil.vercel.app/',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/sofiahernandes/farm-to-market-network',
      },
    ],
    summaryParagraphs: [
      'Manà ("Do campo à sua porta, com origem e colheita transparentes") is a Brazilian farm-to-table marketplace and subscription network connecting urban consumers directly to local family farms. The platform guarantees origin traceability, harvest-on-demand freshness, and predictable recurring income for small producers.',
      'It features a complete dual-sided ecosystem: a consumer storefront with weekly harvest catalogs (/catalogo) and flexible agroecological basket subscriptions (/cestas), paired with a dedicated Producer Portal (/produtor) for managing farm onboarding, harvest stock, order fulfillment, and financial payouts.',
    ],
    tags: [
      'Farm-to-Table Marketplace',
      'Subscription Engine',
      'Producer Dashboard',
      'Supply Chain Traceability',
      'SQLite Persistence',
      'Full-Stack Web',
    ],
    credits: [
      { label: 'Platform', value: 'Manà — Rede de Agricultura Local' },
      { label: 'Live URL', value: 'mana-brasil.vercel.app' },
      { label: 'Role', value: 'Full-Stack Software Engineer' },
      {
        label: 'Stack',
        value: 'Next.js · TypeScript · Local SQLite · Sandbox Payment Gateway',
      },
      { label: 'Year', value: '2026' },
    ],
    process:
      'Engineered as a complete two-sided marketplace with local SQLite persistence and a sandbox payment gateway, modeling real-world harvest cutoff windows, LGPD privacy controls, and producer property verification.',
  },
];
