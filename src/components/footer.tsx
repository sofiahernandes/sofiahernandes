import Link from "next/link";
import { getSiteContent } from "@/lib/payload-content";

export default async function Footer() {
  const siteContent = await getSiteContent();
  return (
    <div className="container flex flex-col text-center gap-2 py-6 w-full shrink-0 justify-center px-4 lg:px-6">
      <Link href={siteContent.footer.href} target="_blank">
        <p className="inline-block text-xs text-gray-500 dark:text-gray-400 underline-animate">
          {siteContent.footer.text}
        </p>
      </Link>
    </div>
  );
}
