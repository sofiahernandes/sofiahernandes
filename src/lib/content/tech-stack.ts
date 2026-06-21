export const techStackContent = {
  title: "Specialized Skillset",
  technologies: [
    {
      id: 1,
      category: "Development",
      skills: [
        { name: "Next.js & React.js" },
        { name: "TypeScript & JavaScript" },
        { name: "Strapi & Payload (Headless CMS)" },
        { name: "Python" },
        { name: "SQL (MySQL & PostgreSQL)" },
      ],
      highlight: false,
    },
    {
      id: 2,
      category: "AI & Automations",
      skills: [
        { name: "Workflows Automation (n8n & OpenAI Agent Builder)" },
        { name: "Autonomous Agents" },
        { name: "Prompt Engineering" },
      ],
      highlight: false,
    },
    {
      id: 3,
      category: "UX/UI Design",
      skills: [
        { name: "Figma" },
        { name: "Design Systems" },
        { name: "User Research" },
        { name: "Prototyping" },
      ],
      highlight: false,
    },
    {
      id: 4,
      category: "Certifications",
      skills: [
        {
          name: "Bootcamp Desenvolvimento Front-end - Santander",
          link: "https://www.dio.me/certificate/6PGRXS6K/share",
        },
        {
          name: "Machine Learning Training - BairesDev",
          link: "https://www.dio.me/certificate/YKU8V7HA/share",
        },
        {
          name: "Business Technology (Tech Applied to Business) – FECAP",
        },
      ],
      highlight: false,
    },
    {
      id: 5,
      category: "(Human) Languages",
      skills: [
        { name: "English - Fluent" },
        { name: "Spanish - Fluent" },
        { name: "Portuguese - Native" },
      ],
      highlight: false,
    },
    {
      id: 6,
      category: "Resume",
      skills: [
        {
          name: "Download Resume (EN)",
          link: "https://drive.google.com/file/d/1gaU5j2vrfSd65MN9MgF2o3hAxJrxHye_/view?usp=drive_link",
        },
        {
          name: "Baixar Currículo (PT)",
          link: "https://drive.google.com/file/d/1sRSP2Kg0jNk2gdHZJSQwM2-Jl9NSFlMx/view?usp=drive_link",
        },
      ],
      highlight: true,
    },
  ],
} as const;

export type TechStackItem = (typeof techStackContent.technologies)[number];