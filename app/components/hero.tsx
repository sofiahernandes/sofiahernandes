import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { heroContent, type HeroSocialIcon } from "@/lib/content/hero";

const iconMap: Record<HeroSocialIcon, JSX.Element> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="grid grid-cols-2 lg:grid-cols-12 px-6 gap-6 py-36 bg-primary/5"
    >
      <div className="col-span-full lg:col-span-8 lg:col-start-3 m-0 flex flex-col items-center justify-center px-4 lg:px-6 space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tighter text-primary">
            {heroContent.title}
          </h1>
          <p className="mx-auto max-w-[550px] pt-2 pb-4 text-sm text-gray-600 dark:text-gray-300">
            {heroContent.description}
          </p>
        </div>
        <div className="space-x-4">
          {heroContent.socialLinks.map((link) => (
            <Link key={link.label} href={link.href} target="_blank">
              <Button variant="outline" size="icon">
                {iconMap[link.icon]}
                <span className="sr-only">{link.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
