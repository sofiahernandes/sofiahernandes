import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import ProjectCard from "./project-card"

import { projects } from "@/lib/projects"

export default function Projects() {
    return (
        <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">Projects</h2>
            <div className="flex flex-col items-center justify-center">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => {
                  return (
                    <ProjectCard
                      key={project.title}
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      link={project.link}
                      tags={project.tags}
                    />
                  )
                })}
              </div>
              <div>
                <Link href="https://github.com/sofiahernandes" target="_blank" className="pt-4 flex items-center gap-2 text-sm hover:underline">
                  <ArrowUpRight className="h-4 w-4" />
                  See all projects
                </Link>
              </div>
            </div>
        </div>
    )
}
