import Image from "next/image";

export default function AboutMe() {
  return (
    <div className="grid md:grid-cols-10 gap-10">
      <Image
        className="object-cover w-full md:col-span-4 rounded-lg md:sticky md:top-0"
        src="/images/personal-image-1.png"
        alt="Personal Image"
        width={400}
        height={400}
      />
      <div className="md:col-span-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
          A Little About Me
        </h2>
        <p className="mx-auto pt-3 text-sm text-gray-500 md:text-lg dark:text-gray-400 text-justify pb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;Hey! I’m Sofia —{" "}
          <span className="underline underline-offset-4">
            a Brazilian Computer Science student and Software Developer based in
            São Paulo
          </span>
          . Since starting my freelance journey in 2022, I’ve been building
          responsive, accessible, and user-friendly web applications for small
          businesses, content creators, and personal projects.
        </p>
        <p className="mx-auto pt-3 text-sm text-gray-500 md:text-lg dark:text-gray-400 text-justify pb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;I’m also very passionate about UI/UX Design
          and the magic that happens when design and development work together,
          crafting digital experiences that are both functional and beautiful.
        </p>

        <ul className="mx-auto pt-3 text-sm text-gray-500 md:text-lg dark:text-gray-400 text-justify pb-4">
          <li>
            💻 <span className="underline underline-offset-4">Main stack:</span>{" "}
            React, Next.js, TypeScript, JavaScript;
          </li>
          <li>
            🎨{" "}
            <span className="underline underline-offset-4">
              Design/Styling tools:
            </span>{" "}
            Figma, Canva, Tailwind;
          </li>
          <li>
            🔗{" "}
            <span className="underline underline-offset-4">Other skills:</span>{" "}
            project management, SCRUM, communication, teamwork;
          </li>
          <li>
            🌱{" "}
            <span className="underline underline-offset-4">
              Always learning
            </span>{" "}
            and looking for smarter (and prettier) ways to build for the web;
          </li>
          <li>
            🏋️‍♀️{" "}
            <span className="underline underline-offset-4">Outside tech</span>,
            my passions include reading, balenced fitness, traveling, singing
            (woribly), and a engaging in good discussions.
          </li>
        </ul>

        <p className="mx-auto pt-3 text-sm text-gray-500 md:text-lg dark:text-gray-400 text-justify pb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;I'm currently open to freelance opportunities
          and creative collaborations. If you're looking for someone who
          understands both design and code — let’s talk!
        </p>
      </div>
    </div>
  );
}
