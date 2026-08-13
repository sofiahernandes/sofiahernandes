import { getSiteContent } from '@/lib/payload-content';

const paragraphIndent = '\u00a0\u00a0\u00a0\u00a0';

export default async function AboutMe() {
  const siteContent = await getSiteContent();
  return (
    <section
      id="about"
      className="grid grid-cols-2 lg:grid-cols-12 border-t px-6 gap-6 py-24"
    >
      <h2 className="lg:col-span-5 lg:col-start-2 col-span-full text-2xl lg:text-4xl font-bold tracking-tighter mt-6 lg:mt-0 mb-6 text-center lg:text-left">
        {siteContent.about.title}
      </h2>
      <div className="lg:col-span-5 col-span-full lg:col-start-7 text-gray-600 dark:text-gray-300">
        <p className="mx-auto pt-3 text-sm text-justify pb-4">
          {paragraphIndent}
          {siteContent.about.introLeading}
          <span className="underline underline-offset-4">
            {siteContent.about.introEmphasized}
          </span>
          {siteContent.about.introTrailing}
        </p>
        {siteContent.about.paragraphs.map((paragraph) => (
          <p key={paragraph.text} className="mx-auto pt-3 text-sm text-justify pb-4">
            {paragraphIndent}
            {paragraph.text}
          </p>
        ))}

        <p className="mx-auto pt-3 text-sm text-justify pb-4">
          {paragraphIndent}
          {siteContent.about.closing}
        </p>
      </div>
    </section>
  );
}
