export const techStackContent = {
  title: "Main Skills",
  technologies: [
    {
      id: 1,
      category: "Frontend",
      skills: [
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "HTML" },
        { name: "CSS" },
        { name: "Tailwind CSS" },
        { name: "React" },
        { name: "Next.js" },
      ],
      highlight: false,
    },
    {
      id: 2,
      category: "Backend",
      skills: [{ name: "Node.js" }, { name: "Python" }],
      highlight: false,
    },
    {
      id: 3,
      category: "Tools",
      skills: [
        { name: "Visual Studio Code" },
        { name: "Figma" },
        { name: "Git" },
        { name: "GitHub" },
        { name: "Vercel" },
        { name: "Microsoft Office Suite" },
        { name: "Google Drive Tools" },
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
          name: "Resume (en-US)", 
          link: "https://github.com/sofiahernandes" 
        },
        {
          name: "Currículo (pt-BR)",
          link: "https://drive.google.com/file/d/1hKsENlQwNAZJfSUybn-4BhqDNfa0bHeU/view?usp=sharing",
        },
      ],
      highlight: true,
    },
  ],
} as const;

export type TechStackItem = (typeof techStackContent.technologies)[number];
