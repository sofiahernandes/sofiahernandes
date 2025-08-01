import { Card } from "@/components/ui/card"
import Link from "next/link";

const technologies = [
  {
    id: 1,
    category: "Frontend",
    skills: [{name: "JavaScript", link: "https://web.dev/javascript?hl=pt-br"}, {name: "TypeScript", link: "https://www.typescriptlang.org/"}, {name: "HTML", link: "https://web.dev/html?hl=pt-br"}, {name: "CSS", link: "https://www.google.com/url?client=internal-element-cse&cx=000598195112356817769:pk7nr2xiumu&q=https://web.dev/css&sa=U&ved=2ahUKEwi1tZLpueiOAxVbsJUCHdw3LQ8QFnoECAoQAQ&usg=AOvVaw0yC_iNk6UymDgVFl5O0w6g&arm=e&fexp=73019458,72986053,72986052,73019460"}, {name: "TailwindCSS", link: "https://tailwindcss.com/"}, {name: "Bootstrap", link: "https://getbootstrap.com/"}, {name: "React", link: "https://www.google.com/url?client=internal-element-cse&cx=000598195112356817769:pk7nr2xiumu&q=https://web.dev/explore/react&sa=U&ved=2ahUKEwjNnfKGuuiOAxUGq5UCHeSkHbwQFnoECAMQAQ&usg=AOvVaw32JY1UcNc2JA-VIZVN1Z3H&arm=e&fexp=73019458,72986053,72986052,73019460"}, {name: "Next.js", link: "https://nextjs.org/"}],
    highlight: false,
  },
  {
    id: 2,
    category: "Backend",
    skills: [{name: "Node.js", link: "https://nodejs.org/"}, {name: "Python", link: "https://www.python.org/downloads/"}],
    highlight: false,
  },
  {
    id: 3,
    category: "Tools",
    skills: [{name: "Visual Studio Code", link: "https://code.visualstudio.com/"}, {name: "Figma", link: "https://www.figma.com/pt-br/"}, {name: "Git", link: "https://git-scm.com/downloads"}, {name: "GitHub", link: "https://github.com/sofiahernandes"}, {name: "Vercel", link: "https://vercel.com/"}, {name: "Microsoft Office Suite", link: "https://www.microsoft.com/pt-br/microsoft-365/download-office?msockid=0fa3e5e32b9e6eb52ed0f01b2a476f57"}, {name: "Google Drive Tools", link: "https://workspace.google.com/marketplace/app/drive_toolbox_copy_move_rename_files_fol/39566378966"}],
    highlight: false,
  },
  {
    id: 4,
    category: "Certifications",
    skills: [{name: "Bootcamp Desenvolvimento Front-end - Santander", link: "https://www.dio.me/certificate/JJHOLNCF/share"}, {name: "Machine Learning Training - BairesDev", link: "noLink"}, {name: "Business Technology (tech applied to business) – FECAP", link: "noLink"}],
    highlight: false,
  },
  {
    id: 5,
    category: "(Human) Languages",
    skills: [{name: "🇺🇸 English", link: "noLink"}, {name: "🇧🇷 Portuguese", link: "noLink"}, {name: "🇪🇸 Spanish", link: "noLink"}],
    highlight: false,
  },
  {
    id: 6,
    category: "Resume",
    skills: [{name: "Resume (en-US)", link: "https://github.com/sofiahernandes"}, {name: "Currículo (pt-BR)", link: "https://github.com/sofiahernandes"}],
    highlight: true,
  }
]

export default function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {technologies.map((tech) => (
        <Card key={tech.id} className={tech.highlight ? "bg-primary/60 p-6" : "p-6"}>
          <h3 className={tech.highlight ? "text-background text-lg font-semibold mb-4" : "text-lg font-semibold mb-4"}>{tech.category}</h3>
          <div className="flex flex-wrap gap-2">
            {tech.skills.map((skill) => (
              <Link href={skill.link} target="_blank" key={skill.name} className="no-underline">
                <span className={tech.highlight ? "transition-transform hover:scale-105 text-background inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ring-background" : "transition-transform hover:scale-105 inline-flex items-center rounded-md bg-primary/15 px-2 py-1 text-sm font-medium ring-1 ring-inset ring-primary/20"}>
                {skill.name}
              </span>
              </Link>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
