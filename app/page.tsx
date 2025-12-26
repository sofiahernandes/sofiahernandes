import AboutMe from "./components/about"
import ContactForm from "./components/contact-form"
import Projects from "./components/projects"
import TechStack from "./components/tech-stack"
import Hero from "./components/hero"
import { ThemeToggle } from "./components/theme-toggle"

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
          <Hero />
        </section>

        <section id="projects" className="border-t py-12 items-center">
          <Projects />
        </section>

        <section className="border-t py-12">
          <TechStack />
        </section>

        <section id="about" className="border-t py-12 px-5 md:px-0">
          <AboutMe />
        </section>

        <section id="contact" className="border-t py-12">
          <ContactForm />
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
