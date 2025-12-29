import AboutMe from "./components/about";
import ContactForm from "./components/contact-form";
import Projects from "./components/projects";
import TechStack from "./components/tech-stack";
import Hero from "./components/hero";
import { ThemeToggle } from "./components/theme-toggle";
import Footer from "./components/footer";
import { siteContent } from "@/lib/content/site";

export default function Page() {
  return (
    <div className="min-h-screen bg-white/50 dark:bg-background items-center flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur h-14 px-6 pt-2 flex justify-between">
        <p className="pt-2 inline-block font-bold">{siteContent.headerTitle}</p>

        <ThemeToggle />
      </header>

      <main>
        <Hero />
        <Projects />
        <TechStack />
        <AboutMe />
        <ContactForm />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
