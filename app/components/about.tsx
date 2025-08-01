import Image from "next/image"
import ScaleCarousel from "./scale-carousel"

export default function AboutMe() {
  return (
    <div className="max-w-[700px] m-auto">
      <p className="mx-auto pt-3 text-gray-500 md:text-lg dark:text-gray-400 text-justify pb-4">&nbsp;&nbsp;&nbsp;&nbsp;Hey! I’m Sofia — <span className="underline underline-offset-4">a Brazilian Computer Science student and front-end developer based in São Paulo</span>. Since starting my freelance journey in 2022, I’ve been building responsive, accessible, and visually engaging web experiences for small businesses, content creators, and personal projects.</p>
      <p className="mx-auto pt-3 text-gray-500 md:text-lg dark:text-gray-400 text-justify pb-4">&nbsp;&nbsp;&nbsp;&nbsp;I’m passionate about clean code, thoughtful UI/UX, and the magic that happens when design and development work together. Whether it’s turning a Figma design into a pixel-perfect interface or integrating APIs to bring a product to life, <span className="underline underline-offset-4">I love crafting digital experiences that are both functional and beautiful.</span></p>

      <ScaleCarousel />
      
      <ul className="mx-auto pt-3 text-gray-500 md:text-lg dark:text-gray-400 text-justify pb-4">
      <li>💻 <span className="underline underline-offset-4">Main stack:</span> React, Next.js, TypeScript, React Native, Python;</li>
      <li>🎨 <span className="underline underline-offset-4">Design tools:</span> Figma, Canva, Bootstrap, Tailwind;</li>
      <li>🔗 <span className="underline underline-offset-4">Other skills:</span> API integration, project management, communication, teamwork;</li>
      <li>🌱 <span className="underline underline-offset-4">Always learning</span> and looking for smarter (and cuter) ways to build for the web;</li>
      <li>🏋️‍♀️ <span className="underline underline-offset-4">Outside tech</span>, my passions are reading, balenced fitness, traveling, singing (badly), and a having good philosophical discussions.</li>
      </ul>

      <p className="mx-auto pt-3 text-gray-500 md:text-lg dark:text-gray-400 text-justify pb-4">&nbsp;&nbsp;&nbsp;&nbsp;I'm currently open to freelance opportunities and creative collaborations. If you're looking for someone who understands both design and code — let’s talk!</p>
    </div>
  )
}
