import { Card } from "@/components/ui/card"

const technologies = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "HTML", "CSS", "TailwindCSS", "Bootstrap", "Canva"],
    highlight: false,
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python"],
    highlight: false,
  },
  {
    category: "Tools",
    skills: ["Microsoft Office Suite", "Visual Studio Code", "Figma", "Git", "GitHub", "Vercel"],
    highlight: false,
  },
  {
    category: "Languages",
    skills: ["🇺🇸 English", "🇧🇷 Portuguese", "🇪🇸 Spanish"],
    highlight: true,
  }
]

export default function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {technologies.map((tech) => (
        <Card key={tech.category} className={tech.highlight ? "bg-muted p-6" : "p-6"}>
          <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
          <div className="flex flex-wrap gap-2">
            {tech.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
