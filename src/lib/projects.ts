export type Project = {
  title: string;
  description: string;
  images: Array<{ src: string; alt: string }>;
  githubUrl?: string;
};

export const projectsSection = {
  title: "Personal Projects",
  cta: {
    label: "See all projects",
    href: "https://github.com/sofiahernandes",
  },
} as const;

export const projects: Project[] = [
  {
    title: "E-commerce Storefront",
    description:
      "Glow Global is an ecommerce storefront for digital planners and templates for productivity, wellness, and growth. Find tools for study, finance, and self-care.",
    images: [
      { src: "/images/glow-1.jpeg", alt: "Glow Global image 1" },
      { src: "/images/glow-2.jpeg", alt: "Glow Global image 2" },
      { src: "/images/glow-3.jpeg", alt: "Glow Global image 3" },
      { src: "/images/glow-4.png", alt: "Glow Global image 4" },
      { src: "/images/glow-5.png", alt: "Glow Global image 5" },
    ],
    githubUrl: "https://github.com/sofiahernandes/glow-global",
  },
  {
    title: "Notion Clone",
    description:
      "A full-featured Notion clone with real-time sync, rich text editing, infinite nesting, file uploads, custom covers/icons, auth via Clerk, and a responsive UI—built with Next, Convex, and Tailwind.",
    images: [
      { src: "/images/notion-1.png", alt: "Notion clone image 1" },
      { src: "/images/notion-2.png", alt: "Notion clone image 2" },
      { src: "/images/notion-3.png", alt: "Notion clone image 3" },
      { src: "/images/notion-4.png", alt: "Notion clone image 4" },
      { src: "/images/notion-5.png", alt: "Notion clone image 5" },
      { src: "/images/notion-6.png", alt: "Notion clone image 6" },
      { src: "/images/notion-7.png", alt: "Notion clone image 7" },
      { src: "/images/notion-8.png", alt: "Notion clone image 8" },
      { src: "/images/notion-9.png", alt: "Notion clone image 9" },
      { src: "/images/notion-10.png", alt: "Notion clone image 10" },
      { src: "/images/notion-11.png", alt: "Notion clone image 11" },
    ],
    githubUrl: "https://github.com/sofiahernandes/notion-clone",
  },
  {
    title: "Bookie Chatbot",
    description:
      "AI-powered book recommendation chatbot using Gemini API. Sign in with Google, chat naturally, and discover books tailored to your interests. Built with Next.js, Tailwind, and NextAuth.",
    images: [
      { src: "/images/bookie-1.png", alt: "Bookie chatbot image 1" },
      { src: "/images/bookie-2.png", alt: "Bookie chatbot image 2" },
      { src: "/images/bookie-3.png", alt: "Bookie chatbot image 3" },
      { src: "/images/bookie-4.png", alt: "Bookie chatbot image 4" },
      { src: "/images/bookie-5.png", alt: "Bookie chatbot image 5" },
    ],
    githubUrl: "https://github.com/sofiahernandes/gemini-book-chatbot",
  },
];
