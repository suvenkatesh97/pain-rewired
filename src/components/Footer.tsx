import Link from "next/link";

const exploreLinks = [
  { href: "/intro/what-is", label: "What Is Neuroplastic Pain?" },
  { href: "/intro/science", label: "The Science" },
  { href: "/intro/symptoms", label: "Symptoms & Conditions" },
  { href: "/intro/treatments", label: "Treatment Approaches" },
  { href: "/protocols/prt", label: "PRT Protocol" },
  { href: "/protocols/schubiner", label: "Schubiner's Method" },
  { href: "/blog", label: "Research Digest" },
  { href: "/glossary", label: "Glossary" },
];

const toolsLinks = [
  { href: "/quiz", label: "Self-Assessment Quiz" },
  { href: "/chat", label: "AI Chat Assistant" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/resources", label: "Books & Resources" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-white/50 dark:bg-zinc-950/50">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-accent text-white text-[11px] font-extrabold">P</span>
              <span className="font-bold text-base text-accent">Pain Rewired</span>
            </div>
            <p className="text-sm text-text-secondary dark:text-zinc-400 leading-relaxed max-w-[280px]">
              Evidence-based research on neuroplastic pain, made accessible. AI-powered Q&A and curated summaries.
            </p>
          </div>

          <div>
            <div className="font-semibold text-xs text-text-secondary dark:text-zinc-500 uppercase tracking-widest mb-4">Explore</div>
            <div className="flex flex-col gap-2">
              {exploreLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-text-secondary dark:text-zinc-400 hover:text-accent dark:hover:text-teal-400 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold text-xs text-text-secondary dark:text-zinc-500 uppercase tracking-widest mb-4">Tools & More</div>
            <div className="flex flex-col gap-2">
              {toolsLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-text-secondary dark:text-zinc-400 hover:text-accent dark:hover:text-teal-400 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/about" className="text-sm text-text-secondary dark:text-zinc-400 hover:text-accent dark:hover:text-teal-400 transition-colors">About</Link>
              <a href="https://in.linkedin.com/in/sunny-venkatesh-877896194" target="_blank" rel="noopener noreferrer"
                className="text-sm text-text-secondary dark:text-zinc-400 hover:text-accent dark:hover:text-teal-400 transition-colors">LinkedIn</a>
              <a href="https://github.com/suvenkatesh97/pain-rewired" target="_blank" rel="noopener noreferrer"
                className="text-sm text-text-secondary dark:text-zinc-400 hover:text-accent dark:hover:text-teal-400 transition-colors">GitHub</a>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border-light dark:via-border-dark to-transparent my-8" />

        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className="text-xs text-text-tertiary dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Pain Rewired. Built by{" "}
            <a href="https://in.linkedin.com/in/sunny-venkatesh-877896194" target="_blank" rel="noopener noreferrer"
              className="hover:text-accent transition-colors">Sunny Venkatesh</a>.
          </span>
          <span className="text-xs text-text-tertiary dark:text-zinc-500">
            Educational resource. Not medical advice.
          </span>
        </div>
      </div>
    </footer>
  );
}
