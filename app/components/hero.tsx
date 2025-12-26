import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="grid grid-cols-2 lg:grid-cols-12 px-6 gap-6 py-24 bg-primary/10">
      <div className="col-span-full lg:col-span-8 lg:col-start-3 m-0 flex flex-col items-center justify-center px-4 lg:px-6 space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tighter text-primary lg:text-4xl">
            Software Dev & UX Design
          </h1>
          <p className="mx-auto max-w-[550px] pt-5 text-sm text-gray-500 dark:text-gray-400">
            🌱 Constantly learning & exploring better— and cuter— ways to build for the web. Let’s chat if you need a dev who gets design — or a designer who can code!
          </p>
        </div>
        <div className="space-x-4">
          <Link href="https://github.com/sofiahernandes/" target="_blank">
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link
            href="https://www.linkedin.com/in/sofiahernandes/"
            target="_blank"
          >
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
  );
}
