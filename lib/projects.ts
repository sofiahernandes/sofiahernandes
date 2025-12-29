export type Project = {
  title: string;
  description: string;
  images: string[];
};

import placeholder from "../public/images/bookie-screenshot.jpg";  

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
      placeholder.src,
      placeholder.src,
      placeholder.src,
      placeholder.src,
      placeholder.src,
    ],
  },
  {
    title: "Notion Clone",
    description:
      "A full-featured Notion clone with real-time sync, rich text editing, infinite nesting, file uploads, custom covers/icons, auth via Clerk, and a responsive UI—built with Next, Convex, and Tailwind.",
    images: [
      placeholder.src,
      placeholder.src,
      placeholder.src,
      placeholder.src,
      placeholder.src,
    ],
  },
  {
    title: "Bookie Chatbot",
    description:
      "AI-powered book recommendation chatbot using Gemini API. Sign in with Google, chat naturally, and discover books tailored to your interests. Built with Next.js, Tailwind, and NextAuth.",
    images: [
      placeholder.src,
      placeholder.src,
      placeholder.src,
      placeholder.src,
      placeholder.src,
    ],
  },
];
