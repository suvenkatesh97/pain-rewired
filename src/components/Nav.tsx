"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const mainLinks = [
  { href: "/intro/what-is", label: "Guides" },
  { href: "/intro/treatments", label: "Treatments" },
  { href: "/blog", label: "Research" },
  { href: "/quiz", label: "Quiz" },
  { href: "/faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-border/50 dark:border-zinc-800/50">
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
        <Link
          href="/"
          className="font-extrabold text-base text-teal hover:text-teal-dark transition-colors flex items-center gap-2 no-underline"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 bg-teal rounded-lg text-white text-xs font-extrabold">
            P
          </span>
          <span className="hidden sm:inline">Pain Rewired</span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {mainLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm font-medium text-text-muted hover:text-text dark:hover:text-zinc-200 rounded-lg hover:bg-border-light dark:hover:bg-zinc-800 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="w-px h-5 bg-border dark:bg-zinc-700 mx-1.5" />
          <Link
            href="/chat"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-teal text-white rounded-lg hover:bg-teal-dark transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Chat
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-1">
          <Link
            href="/chat"
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-teal text-white rounded-md hover:bg-teal-dark transition-all"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Chat
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-border-light dark:hover:bg-zinc-800 transition-colors"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 px-6 py-4 flex flex-col gap-1">
          {mainLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-medium text-text-muted hover:text-text dark:hover:text-zinc-200 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
