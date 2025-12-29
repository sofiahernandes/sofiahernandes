export const heroContent = {
  title: "Software Dev & UX Design",
  description:
    "Constantly learning & exploring better— and cuter— ways to build for the web. Let’s chat if you need a dev who gets design — or a designer who can code!",
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
