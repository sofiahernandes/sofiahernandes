import Desktop from '@/components/desktop';
import { aboutContent } from '@/lib/content/about';
import { SEO_CONFIG } from '@/lib/seo';

export default function Page() {
  return (
    <>
      <article className="sr-only">
        <header>
          <h1>
            Sofia Botechia Hernandes — Software Developer &amp; AI Engineer
          </h1>
          <p>{SEO_CONFIG.description}</p>
        </header>

        <section id="about" aria-labelledby="seo-about-heading">
          <h2 id="seo-about-heading">{aboutContent.title}</h2>
          <p>{aboutContent.content}</p>
        </section>

        <section id="experience" aria-labelledby="seo-experience-heading">
          <h2 id="seo-experience-heading">
            Professional Experience &amp; Enterprise Projects
          </h2>
          <h3>FutureBrand — Software Engineer Intern (2025 – Present)</h3>
          <p>
            Develops production-grade CMS platforms, internal productivity
            tools, and AI applications for enterprise clients across 16+
            enterprise websites and 26 production repositories, including
            rebranding platforms for Amazônia, Ativos (Banco do Brasil), Banco
            da Amazônia, Crown, GCB Investimentos, and Totvs Techfin.
          </p>
          <h3>
            Freelance — Software Developer &amp; UX/UI Designer (2022 – 2025)
          </h3>
          <p>
            Designed and developed custom full-stack web applications and
            digital products for businesses and creators, from UX research to
            cloud deployment.
          </p>
        </section>

        <section id="skills" aria-labelledby="seo-skills-heading">
          <h2 id="seo-skills-heading">
            Technical Stack &amp; AI Engineering Capabilities
          </h2>
          <ul>
            <li>
              Frontend Engineering: Next.js, React, React Native, TypeScript,
              Tailwind CSS, Framer Motion, GSAP
            </li>
            <li>
              Backend &amp; Headless CMS: Node.js, Express, Payload CMS, Strapi,
              WordPress, Prisma, REST APIs
            </li>
            <li>
              AI Engineering: Model APIs, RAG Systems, Prompt Engineering,
              Multi-Agent Applications, Agentic Workflows, AI-powered CMS
              Automation, MCP Ecosystem
            </li>
            <li>
              Databases &amp; Cloud: PostgreSQL, MySQL, SQLite, AWS, Vercel,
              Railway, Cloudinary
            </li>
          </ul>
        </section>

        <nav aria-label="Portfolio resources and social profiles">
          <h2>Contact &amp; Verified Profiles</h2>
          <ul>
            <li>
              <a href="/">Sofia Botechia Hernandes Portfolio Home</a>
            </li>
            <li>
              <a href="/llms.txt">
                LLM Summary Documentation (llms.txt)
              </a>
            </li>
            <li>
              <a href="/llms-full.txt">
                Complete Technical Profile for AI Agents (llms-full.txt)
              </a>
            </li>
            <li>
              <a href="/sitemap.xml">XML Sitemap</a>
            </li>
            <li>
              <a href={`mailto:${SEO_CONFIG.author.email}`}>
                Email Sofia Botechia Hernandes ({SEO_CONFIG.author.email})
              </a>
            </li>
            <li>
              <a
                href={SEO_CONFIG.author.github}
                rel="noopener noreferrer"
              >
                Sofia Botechia Hernandes on GitHub
              </a>
            </li>
            <li>
              <a
                href={SEO_CONFIG.author.linkedin}
                rel="noopener noreferrer"
              >
                Sofia Botechia Hernandes on LinkedIn
              </a>
            </li>
            <li>
              <a
                href={SEO_CONFIG.author.instagram}
                rel="noopener noreferrer"
              >
                Sofia Botechia Hernandes on Instagram
              </a>
            </li>
          </ul>
        </nav>
      </article>
      <Desktop />
    </>
  );
}
