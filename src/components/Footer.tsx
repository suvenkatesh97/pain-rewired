import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border dark:border-zinc-800 py-12 mt-8 bg-warm-white dark:bg-zinc-900">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="flex justify-between items-start flex-wrap gap-8">
          <div>
            <div className="font-bold text-lg text-teal mb-1">Pain Rewired</div>
            <p className="text-sm text-text-muted max-w-[280px]">
              Making neuroplastic pain research accessible for everyone.
            </p>
          </div>
          <div className="flex gap-10 flex-wrap">
            <div>
              <div className="font-semibold text-sm text-text mb-2">Explore</div>
              <div className="flex flex-col gap-1">
                <Link href="/intro/what-is" className="text-sm text-text-muted hover:text-teal">Intro Guides</Link>
                <Link href="/intro/treatments" className="text-sm text-text-muted hover:text-teal">Treatments</Link>
                <Link href="/protocols/prt" className="text-sm text-text-muted hover:text-teal">PRT Protocol</Link>
                <Link href="/blog" className="text-sm text-text-muted hover:text-teal">Research Digest</Link>
                <Link href="/quiz" className="text-sm text-text-muted hover:text-teal">Self-Assessment</Link>
                <Link href="/glossary" className="text-sm text-text-muted hover:text-teal">Glossary</Link>
                <Link href="/faq" className="text-sm text-text-muted hover:text-teal">FAQ</Link>
                <Link href="/resources" className="text-sm text-text-muted hover:text-teal">Resources</Link>
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm text-text mb-2">Connect</div>
              <div className="flex flex-col gap-1">
                <Link href="/about" className="text-sm text-text-muted hover:text-teal">About me</Link>
                <a href="https://in.linkedin.com/in/sunny-venkatesh-877896194" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-teal">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px my-6 bg-gradient-to-r from-transparent via-border to-transparent dark:via-zinc-700" />

        <div className="flex justify-between items-center flex-wrap gap-2 text-xs text-text-light">
          <span>
            &copy; 2026 Pain Rewired. Built by{" "}
            <a
              href="https://in.linkedin.com/in/sunny-venkatesh-877896194"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-teal"
            >
              Sunny Venkatesh
            </a>
            .
          </span>
          <span>Not medical advice. Always consult a professional.</span>
        </div>
      </div>
    </footer>
  );
}
