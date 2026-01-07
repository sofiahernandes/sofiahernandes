import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "@/styles/globals.css";
import type React from "react";
import { inter, rethink } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Sofia Botechia - Dev & Design",
  description: "Front-end developer & UX Designer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans scroll-auto", rethink.className)}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen overflow-x-clip overflow-y-auto p-0! m-0! bg-background font-sans antialiased",
          inter.className,
          rethink.className
        )}
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
