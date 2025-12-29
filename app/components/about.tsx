import { aboutContent } from "@/lib/content/about";

const paragraphIndent = "\u00a0\u00a0\u00a0\u00a0";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="grid grid-cols-2 lg:grid-cols-12 border-t px-6 gap-6 py-24"
    >
      <h2 className="lg:col-span-5 lg:col-start-2 col-span-full text-2xl lg:text-4xl font-bold tracking-tighter mt-6 lg:mt-0 mb-6 text-center lg:text-left">
        {aboutContent.title}
      </h2>
      <div className="lg:col-span-5 col-span-full lg:col-start-7 text-gray-600 dark:text-gray-300">
        <p className="mx-auto pt-3 text-sm text-justify pb-4">
          {aboutContent.intro.indent ? paragraphIndent : null}
          {aboutContent.intro.leading}
          <span className="underline underline-offset-4">
            {aboutContent.intro.emphasized}
          </span>
          {aboutContent.intro.trailing}
        </p>
        {aboutContent.paragraphs.map((paragraph) => (
          <p key={paragraph.text} className="mx-auto pt-3 text-sm text-justify pb-4">
            {paragraph.indent ? paragraphIndent : null}
            {paragraph.text}
          </p>
        ))}

        <ul className="mx-auto pt-3 text-sm text-justify pb-4">
          {aboutContent.listItems.map((item) => (
            <li key={item.label}>
              <span className="underline underline-offset-4">{item.label}</span>
              {item.separator}
              {item.text}
            </li>
          ))}
        </ul>

        <p className="mx-auto pt-3 text-sm text-justify pb-4">
          {aboutContent.closing.indent ? paragraphIndent : null}
          {aboutContent.closing.text}
        </p>
      </div>
    </section>
  );
}
