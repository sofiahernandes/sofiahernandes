import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Instagram } from "lucide-react"

export default function Hero() {
    return (
        <div className="m-0 flex flex-col items-center justify-center container px-4 md:px-6 space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Software Dev & UX Design
                </h1>
                <p className="mx-auto max-w-[700px] pt-5 text-sm text-gray-500 md:text-lg dark:text-gray-400">
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
    )
}
