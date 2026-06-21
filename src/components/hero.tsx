'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroContent, type HeroSocialIcon } from '@/lib/content/hero';

const iconMap: Record<HeroSocialIcon, JSX.Element> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
};

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX / window.innerWidth - 0.5,
      y: e.clientY / window.innerHeight - 0.5,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-[95vh] w-full flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>

      <div
        className="absolute inset-0 flex flex-col justify-start pt-14 lg:pt-0 lg:justify-center items-center pointer-events-none select-none z-0"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div className="opacity-30 flex flex-col items-center animate-float-slow px-4">
          <h1 className="text-primary text-[clamp(2.5rem,10vw,20rem)] font-bold leading-[0.85] tracking-tighter whitespace-nowrap">
            Software Engineering
          </h1>
          <h1 className="text-primary text-[clamp(2.5rem,10vw,20rem)] font-bold leading-[0.85] tracking-tighter whitespace-nowrap">
            & AI Automations
          </h1>
        </div>
      </div>

      <div
        className="absolute -bottom-28 z-10 w-full h-[85vh] lg:h-[105vh] lg:top-12 xl:top-32 flex justify-center items-end"
        style={{
          transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -20}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div className="relative w-full h-full max-w-5xl animate-float">
          <Image
            src="/images/avatar/avatar-2.png"
            alt="Avatar"
            fill
            className="object-contain object-bottom scale-110 lg:scale-100 origin-bottom"
            priority
          />
        </div>
      </div>

      <div className="absolute bottom-8 z-20 flex flex-col items-center space-y-6">
        <div className="flex space-x-4">
          {heroContent.socialLinks.map((link) => (
            <Link key={link.label} href={link.href} target="_blank">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 hover:bg-primary hover:text-white transition-colors shadow-lg"
              >
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
