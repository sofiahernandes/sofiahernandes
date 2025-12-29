import Link from "next/link";
import { footerContent } from "@/lib/content/footer";

export default function Footer() {
  return (
    <div className="container flex flex-col text-center gap-2 py-6 w-full shrink-0 justify-center px-4 lg:px-6">
      <Link href={footerContent.href} target="_blank">
        <p className="text-xs text-gray-500 dark:text-gray-400 hover:underline hover:underline-offset-2">
          {footerContent.text}
        </p>
      </Link>
    </div>
  );
}
