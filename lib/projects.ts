export type Project = {
  title: string;
  description: string;
  images: string[];
};

import placeholder from "../public/images/bookie-screenshot.jpg";  

export const projects: Project[] = [
  {
    title: "E-commerce Storefront",
    description:
      "Next.js Ecommerce Storefront of planners and tools designed to help you heal, grow, and thrive!",
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
      "A full-featured Next.js clone of Notion built with Blocknote rich-text editor.",
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
      "A Gemini API powered chatbot that helps you find books based on your preferences.",
    images: [
      placeholder.src,
      placeholder.src,
      placeholder.src,
      placeholder.src,
      placeholder.src,
    ],
  },
];
