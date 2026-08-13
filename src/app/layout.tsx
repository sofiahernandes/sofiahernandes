import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { headers } from "next/headers";
import "@/styles/globals.css";
import type React from "react";
import { rethink } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Sofia Botechia",
  description: "Software Developer & AI Engineer",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname =
    headerList.get("next-url") ||
    headerList.get("x-next-url") ||
    headerList.get("x-matched-path") ||
    "";

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans scroll-auto", rethink.className)}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any"></link>
        <link rel="apple-touch-icon" href="/apple-touch.png"></link>
      </head>
      <body
        className={cn(
          "min-h-screen overflow-x-clip overflow-y-auto p-0! m-0! bg-background font-sans antialiased",
          rethink.className
        )}
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="blue"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
