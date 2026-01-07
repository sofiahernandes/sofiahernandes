import Link from "next/link";
import { footerContent } from "@/lib/content/footer";

export default function Footer() {
  return (
    <div className="container flex flex-col text-center gap-2 py-6 w-full shrink-0 justify-center px-4 lg:px-6">
      <Link href={footerContent.href} target="_blank">
        <p className="inline-block text-xs text-gray-500 dark:text-gray-400 underline-animate">
          {footerContent.text}
        </p>
      </Link>
    </div>
  );
}
