import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ProjectCard from "./project-card";

import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="grid grid-cols-2 lg:grid-cols-12 border-t px-6 gap-6 py-24 items-center"
    >
      <div className="col-span-full lg:col-span-10 lg:col-start-2 px-4 lg:px-6">
        <h2 className="text-2xl lg:text-4xl font-bold tracking-tighter mb-6 text-center lg:text-left">
          Projects
        </h2>
        <div className="flex flex-col items-center justify-center">
          <div className="grid gap-6 lg:grid-cols-3">
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
              );
            })}
          </div>
          <div>
            <Link
              href="https://github.com/sofiahernandes"
              target="_blank"
              className="pt-4 flex items-center gap-2 text-sm hover:underline"
            >
              <ArrowUpRight className="h-4 w-4" />
              See all projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
