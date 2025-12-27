import { Section } from "lucide-react";
import Image from "next/image";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="grid grid-cols-2 lg:grid-cols-12 border-t px-6 gap-6 py-24"
    >
      <h2 className="lg:col-span-5 lg:col-start-2 col-span-full text-2xl lg:text-4xl font-bold tracking-tighter mt-6 lg:mt-0 mb-6 text-center lg:text-left">
          A Little About Me
        </h2>
      <div className="lg:col-span-5 col-span-full lg:col-start-7 text-gray-600 dark:text-gray-300">
        <p className="mx-auto pt-3 text-sm text-justify pb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;I’m Sofia —{" "}
          <span className="underline underline-offset-4">
            a Brazilian Computer Science student and Software Engineer based in
            São Paulo
          </span>
          . Since starting my freelance journey in 2022, I’ve been building
          responsive, accessible, and user-friendly applications and digital
          products for small businesses, content creators, and people's personal
          projects.
        </p>
        <p className="mx-auto pt-3 text-sm text-justify pb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;I’m also very passionate about UI/UX Design
          and the magic that happens when design and development work together,
          crafting digital experiences that are both functional and beautiful.
        </p>

        <ul className="mx-auto pt-3 text-sm text-justify pb-4">
          <li>
            <span className="underline underline-offset-4">Main stack:</span>{" "}
            React, Next.js, TypeScript, JavaScript;
          </li>
          <li>
            <span className="underline underline-offset-4">
              Design/Styling tools:
            </span>{" "}
            Figma, Canva, Tailwind;
          </li>
          <li>
            <span className="underline underline-offset-4">Other skills:</span>{" "}
            project management, SCRUM, communication, teamwork;
          </li>
          <li>
            <span className="underline underline-offset-4">
              Always learning
            </span>{" "}
            and looking for innovative, smarter, and prettier ways to craft
            digital solutions;
          </li>
          <li>
            <span className="underline underline-offset-4">Outside tech</span>,
            my passions include reading, fitness, traveling, singing (not very
            well), learning new languages, and a engaging in good discussions.
          </li>
        </ul>

        <p className="mx-auto pt-3 text-sm text-justify pb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;I'm currently open to freelance opportunities
          and creative collaborations. If you're looking for someone who
          understands both design and code, let’s talk!
        </p>
      </div>
    </section>
  );
}
