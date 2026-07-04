import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pain Rewired — Understanding Neuroplastic Pain",
    template: "%s — Pain Rewired",
  },
  description:
    "Evidence-based research on neuroplastic pain, made accessible. Curated summaries, AI-powered Q&A, and treatment guides by Sunny Venkatesh.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen flex flex-col bg-surface text-text-primary dark:bg-surface-dark dark:text-zinc-100">
        <ThemeProvider>
          <div className="bg-blue-600 text-white text-center text-xs font-medium py-1.5 px-4">
            Work in progress — this site is actively being built.{" "}
            <a
              href="https://github.com/suvenkatesh97/pain-rewired"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-blue-100"
            >
              Follow along on GitHub
            </a>
          </div>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
