import {
  glow1,
  glow2,
  glow3,
  glow4,
  glow5,
  notion1,
  notion2,
  notion3,
  notion4,
  notion5,
  notion6,
  notion7,
  notion8,
  notion9,
  notion10,
  notion11,
  bookie1,
  bookie2,
  bookie3,
  bookie4,
  bookie5,
} from "@/lib/images";
import type { StaticImageData } from "next/image";

export type Project = {
  title: string;
  description: string;
  images: StaticImageData[];
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
    images: [glow1, glow2, glow3, glow4, glow5],
    githubUrl: "https://github.com/sofiahernandes/glow-global",
  },
  {
    title: "Notion Clone",
    description:
      "A full-featured Notion clone with real-time sync, rich text editing, infinite nesting, file uploads, custom covers/icons, auth via Clerk, and a responsive UI—built with Next, Convex, and Tailwind.",
    images: [
      notion1,
      notion2,
      notion3,
      notion4,
      notion5,
      notion6,
      notion7,
      notion8,
      notion9,
      notion10,
      notion11,
    ],
    githubUrl: "https://github.com/sofiahernandes/notion-clone",
  },
  {
    title: "Bookie Chatbot",
    description:
      "AI-powered book recommendation chatbot using Gemini API. Sign in with Google, chat naturally, and discover books tailored to your interests. Built with Next.js, Tailwind, and NextAuth.",
    images: [
      bookie1,
      bookie2,
      bookie3,
      bookie4,
      bookie5,
    ],
    githubUrl: "https://github.com/sofiahernandes/gemini-book-chatbot",
  },
];
