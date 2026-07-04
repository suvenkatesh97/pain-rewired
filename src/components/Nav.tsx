"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/intro/what-is", label: "Guides" },
  { href: "/intro/treatments", label: "Treatments" },
  { href: "/blog", label: "Research" },
  { href: "/quiz", label: "Quiz" },
  { href: "/faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-zinc-950/85 border-b border-border dark:border-zinc-800">
      <div className="max-w-[960px] mx-auto px-6 flex items-center justify-between py-2.5">
        <Link
          href="/"
          className="font-extrabold text-lg text-teal hover:text-teal-dark transition-colors flex items-center gap-1.5 no-underline"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 bg-teal rounded-md text-white text-sm font-extrabold">
            P
          </span>
          Pain Rewired
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-2.5 py-1 text-sm font-medium text-text-muted hover:text-teal transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal after:rounded after:transition-all hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-text-muted hover:text-teal hover:bg-teal-light/50 dark:hover:bg-zinc-800 transition-colors"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 px-6 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-text-muted hover:text-teal transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
