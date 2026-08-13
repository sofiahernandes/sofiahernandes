import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { getProjectsContent, getSiteContent } from '@/lib/payload-content';
import ProjectsSlider from '@/components/projects-slider';

export default async function Projects() {
  const [projects, siteContent] = await Promise.all([
    getProjectsContent(),
    getSiteContent(),
  ]);
  return (
    <section
      id="projects"
      className="grid grid-cols-2 lg:grid-cols-12 border-t px-6 gap-6 py-24 items-center overflow-x-visible!"
    >
      <h2 className="col-span-full lg:col-span-10 lg:col-start-2 px-4 lg:px-6 text-2xl lg:text-4xl font-bold tracking-tighter mb-6 text-center">
        Personal Projects
      </h2>
      <div className="col-span-full flex flex-col items-center justify-center overflow-visible!">
        <div className="w-full overflow-visible!">
          <ProjectsSlider projects={projects} />
        </div>
        <div>
          <Link
            href="https://github.com/sofiahernandes"
            target="_blank"
            className="flex items-center gap-2 text-sm underline-animate"
          >
            <ArrowUpRight className="h-4 w-4" />
            See all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
