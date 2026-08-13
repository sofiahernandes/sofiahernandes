export const heroContent = {
  title: "Software Engineering + AI Automations",
  description:
    "Whether you need a scalable application, a user-first interface, or automated systems to scale your impact, let’s build something smarter.",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/sofiahernandes/",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sofiahernandes/",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/sofiabotechia/",
      icon: "instagram",
    },
    {
      label: "Email",
      href: "mailto:sofiahernandes.dev@gmail.com",
      icon: "mail",
    },
  ],
} as const;

export type HeroSocialIcon = (typeof heroContent.socialLinks)[number]["icon"];
