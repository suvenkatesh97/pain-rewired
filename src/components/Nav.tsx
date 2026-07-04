"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/intro/what-is", label: "Guides" },
  { href: "/blog", label: "Research" },
  { href: "/quiz", label: "Quiz" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border-light dark:border-border-dark bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-zinc-950/50">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 flex items-center justify-between h-[3.75rem]">
        <Link
          href="/"
          className="font-extrabold text-lg text-accent hover:text-accent-dark transition-colors flex items-center gap-2 no-underline"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-md bg-accent text-white text-[11px] font-extrabold">
            P
          </span>
          <span className="hidden xs:inline">Pain Rewired</span>
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-[10px] font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wide leading-none ml-1">
            WIP
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-[15px] font-medium text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-100 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="w-px h-5 bg-border-light dark:bg-border-dark mx-2" />
          <Link
            href="/chat"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-[14px] font-semibold bg-gradient-to-r from-accent to-blue-600 text-white rounded-lg hover:from-accent-dark hover:to-blue-700 transition-all shadow-sm shadow-accent/20"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Chat
          </Link>
          <div className="ml-1.5">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-1">
          <Link
            href="/chat"
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-gradient-to-r from-accent to-blue-600 text-white rounded-md"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Chat
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border-light dark:border-border-dark bg-white/95 dark:bg-zinc-950/95 px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-[15px] font-medium text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-100 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
