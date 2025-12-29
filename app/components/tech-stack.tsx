import { Card } from "@/components/ui/card";
import Link from "next/link";
import { techStackContent } from "@/lib/content/tech-stack";

export default function TechStack() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-12 border-t px-6 gap-6 py-24">
      <div className="col-span-full lg:col-span-10 lg:col-start-2">
        <h2 className="text-2xl lg:text-4xl font-bold tracking-tighter mb-6 text-center lg:text-left">
          {techStackContent.title}
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          {techStackContent.technologies.map((tech) => (
            <Card
              key={tech.id}
              className={tech.highlight ? "bg-primary p-6" : "bg-card p-6"}
            >
              <h3
                className={
                  tech.highlight
                    ? "text-background text-lg font-semibold mb-4"
                    : "text-lg font-semibold mb-4"
                }
              >
                {tech.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.skills.map((skill) => (
                  <Link
                    href={skill.link}
                    target="_blank"
                    key={skill.name}
                    className="no-underline"
                  >
                    <span
                      className={
                        tech.highlight
                          ? "transition-opacity hover:opacity-60 text-background inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ring-background"
                          : "transition-opacity hover:opacity-60 inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium ring-1 ring-inset ring-primary/10"
                      }
                    >
                      {skill.name}
                    </span>
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
