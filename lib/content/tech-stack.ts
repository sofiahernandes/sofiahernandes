export const techStackContent = {
  title: "Main Skills",
  technologies: [
    {
      id: 1,
      category: "Frontend",
      skills: [
        { name: "Next.js" },
        { name: "React.js" },
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "Tailwind CSS" },
      ],
      highlight: false,
    },
    {
      id: 2,
      category: "Backend",
      skills: [
        { name: "Node.js" }, 
        { name: "MySQL" },
        { name: "Strapi" }, 
        { name: "Python" }
      ],
      highlight: false,
    },
    {
      id: 3,
      category: "Tools",
      skills: [
        { name: "VS Code" },
        { name: "Figma" },
        { name: "Git" },
        { name: "GitHub" },
        { name: "Google Analytics" },
      ],
      highlight: false,
    },
    {
      id: 4,
      category: "Certifications",
      skills: [
        {
          name: "Bootcamp Desenvolvimento Front-end - Santander",
          link: "https://www.dio.me/certificate/6PGRXS6K/share?utm_source=engagement&utm_medium=email&utm_campaign=santander-2025-front-end&utm_term=bootcamp-users&utm_content=graduation-certificate-link",
        },
        {
          name: "Machine Learning Training - BairesDev",
          link: "https://www.dio.me/certificate/YKU8V7HA/share?utm_source=engagement&utm_medium=email&utm_campaign=bairesdev-machine-learning-training&utm_term=bootcamp-users&utm_content=graduation-certificate-link",
        },
        {
          name: "Business Technology (tech applied to business) – FECAP",
        },
      ],
      highlight: false,
    },
    {
      id: 5,
      category: "(Human) Languages",
      skills: [
        { name: "🇺🇸 English" },
        { name: "🇧🇷 Portuguese" },
        { name: "🇪🇸 Spanish" },
      ],
      highlight: false,
    },
    {
      id: 6,
      category: "Resume",
      skills: [
        { 
          name: "Resume (en)", 
          link: "https://drive.google.com/file/d/1gaU5j2vrfSd65MN9MgF2o3hAxJrxHye_/view?usp=drive_link" 
        },
        {
          name: "Currículo (pt)",
          link: "https://drive.google.com/file/d/1sRSP2Kg0jNk2gdHZJSQwM2-Jl9NSFlMx/view?usp=drive_link",
        },
      ],
      highlight: true,
    },
  ],
} as const;

export type TechStackItem = (typeof techStackContent.technologies)[number];
