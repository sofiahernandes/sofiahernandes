import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

export type SiteContentDoc = {
  siteTitle: string
  hero: {
    title: string
    description: string
    socialLinks: Array<{
      label: string
      href: string
      icon: 'github' | 'linkedin' | 'instagram' | 'mail'
    }>
  }
  about: {
    title: string
    introLeading: string
    introEmphasized: string
    introTrailing: string
    paragraphs: Array<{ text: string }>
    closing: string
  }
  techStackTitle: string
  techStack: Array<{
    category: string
    highlight?: boolean
    skills: Array<{ name: string; link?: string }>
  }>
  contact: {
    title: string
    fields: { name: string; email: string; message: string }
    submitIdle: string
    submitPending: string
    errorResponse: string
  }
  footer: {
    href: string
    text: string
  }
}

export type ProjectDoc = {
  title: string
  description: string
  githubUrl?: string
  images: Array<{ src: string; alt: string }>
}

const fallbackSiteContent: SiteContentDoc = {
  siteTitle: 'Sofia Botechia',
  hero: {
    title: 'Software Engineering + AI Automations',
    description:
      'Whether you need a scalable application, a user-first interface, or automated systems to scale your impact, let’s build something smarter.',
    socialLinks: [
      { label: 'GitHub', href: 'https://github.com/sofiahernandes/', icon: 'github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sofiahernandes/', icon: 'linkedin' },
      { label: 'Instagram', href: 'https://www.instagram.com/sofiabotechia/', icon: 'instagram' },
      { label: 'Email', href: 'mailto:sofiahernandes.dev@gmail.com', icon: 'mail' },
    ],
  },
  about: {
    title: 'A Little About Me',
    introLeading: 'I’m Sofia — ',
    introEmphasized: 'a Software Engineer passionate about AI Automations',
    introTrailing:
      ' based in São Paulo. Since 2022, I’ve evolved from building simple applications to high-performance digital products and autonomous systems.',
    paragraphs: [
      {
        text: "Whether I'm developing full-stack applications or multi-agent workflows, my focus is always on scalability, experience/usability, and a result-focused approach.",
      },
      {
        text: 'Beyond tech, I believe strongly in the importance of clear communication, public speaking skills, focus on organization and strategic planning.',
      },
    ],
    closing:
      "I'm always open to collaboration opportunities and creative partnerships. If you have a project in mind, let’s talk!",
  },
  techStackTitle: 'Specialized Skillset',
  techStack: [],
  contact: {
    title: 'Get in Touch',
    fields: { name: 'Name', email: 'Email', message: 'Message' },
    submitIdle: 'Send Message',
    submitPending: 'Sending...',
    errorResponse: 'Something went wrong. Please try again.',
  },
  footer: {
    href: 'https://www.linkedin.com/in/sofiahernandes/',
    text: '© 2026 Sofia Botechia Hernandes. All rights reserved.',
  },
}

export const getSiteContent = cache(async (): Promise<SiteContentDoc> => {
  try {
    const payload = await getPayload({ config })
    const doc = await payload.findGlobal({
      slug: 'site-content',
    })

    if (!doc) return fallbackSiteContent

    return doc as SiteContentDoc
  } catch {
    return fallbackSiteContent
  }
})

export const getProjectsContent = cache(async (): Promise<ProjectDoc[]> => {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      limit: 100,
      sort: 'title',
    })

    return result.docs as ProjectDoc[]
  } catch {
    return []
  }
})
