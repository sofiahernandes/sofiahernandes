import { Button } from "@/components/ui/button"
import { Github, ArrowUpRight, Linkedin, Mail, Instagram } from "lucide-react"
import Link from "next/link"
import AboutMe from "./components/about"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"
import { ThemeToggle } from "./components/theme-toggle"

import { projects } from "@/lib/projects"

export default function Page() {
  return (
    <div className="min-h-screen bg-background items-center flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-14 px-6 pt-2 flex justify-between">
        <div className="container">
          <p className="pt-2 inline-block font-bold">Sofia Botechia</p>
        </div>
        <ThemeToggle />
      </header>

      <main className="container">
        <section id="hero" className="py-12 md:py-24 lg:py-32 glitter-effect">
            <div className="m-0 flex flex-col items-center justify-center container px-4 md:px-6 space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Front-end Dev & UX Designer
                </h1>
                <p className="mx-auto max-w-[700px] pt-5 text-gray-500 md:text-lg dark:text-gray-400">
                  🌱 Constantly learning & exploring better— and cuter— ways to build for the web. Let’s chat if you
                  need a dev who gets design — or a designer who can code!
                </p>
              </div>
              <div className="space-x-4">
                <Link href="https://github.com/sofiahernandes/" target="_blank">
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/sofiahernandes/" target="_blank">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://www.instagram.com/sofiabotechia/">
                  <Button variant="outline" size="icon">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
                <Link href="mailto:sofiahernandes.dev@gmail.com">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
        </section>

        <section id="projects" className="border-t py-12 items-center">
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
        </section>

        <section className="border-t py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              Main Skills
            </h2>
            <TechStack />
          </div>
        </section>

        <section id="about" className="border-t p-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
            A Little About Me
          </h2>
          <AboutMe />
        </section>

        <section id="contact" className="border-t py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[700px]">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Get in Touch
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col text-center gap-2 py-6 w-full shrink-0 justify-center px-4 md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Sofia Botechia Hernandes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
