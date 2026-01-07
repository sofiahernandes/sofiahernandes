import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { projects, projectsSection } from "@/lib/projects";
import ProjectsCurvedSlider from "@/components/projects-curved-slider";

export default function Projects() {
  return (
    <section
      id="projects"
      className="grid grid-cols-2 lg:grid-cols-12 border-t px-6 gap-6 py-24 items-center overflow-x-visible!"
    >
      <h2 className="col-span-full lg:col-span-10 lg:col-start-2 px-4 lg:px-6 text-2xl lg:text-4xl font-bold tracking-tighter mb-6 text-center lg:text-left">
        {projectsSection.title}
      </h2>
      <div className="col-span-full flex flex-col items-center justify-center overflow-visible!">
        <div className="w-full overflow-visible!">
          <ProjectsCurvedSlider projects={projects} />
        </div>
        <div>
          <Link
            href={projectsSection.cta.href}
            target="_blank"
            className="flex items-center gap-2 text-sm underline-animate"
          >
            <ArrowUpRight className="h-4 w-4" />
            {projectsSection.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
