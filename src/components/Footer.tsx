import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border dark:border-zinc-800 bg-[#FAFAF8] dark:bg-zinc-900/50">
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="flex justify-between items-start flex-wrap gap-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-teal rounded-md text-white text-[10px] font-extrabold">P</span>
              <span className="font-bold text-base text-teal">Pain Rewired</span>
            </div>
            <p className="text-sm text-text-muted max-w-[260px] leading-relaxed">
              Making neuroplastic pain research accessible for everyone.
            </p>
          </div>
          <div className="flex gap-12 flex-wrap">
            <div>
              <div className="font-semibold text-xs text-text uppercase tracking-wider mb-3">Explore</div>
              <div className="flex flex-col gap-2">
                <Link href="/intro/what-is" className="text-sm text-text-muted hover:text-teal transition-colors">Intro Guides</Link>
                <Link href="/intro/treatments" className="text-sm text-text-muted hover:text-teal transition-colors">Treatments</Link>
                <Link href="/protocols/prt" className="text-sm text-text-muted hover:text-teal transition-colors">PRT Protocol</Link>
                <Link href="/blog" className="text-sm text-text-muted hover:text-teal transition-colors">Research Digest</Link>
                <Link href="/quiz" className="text-sm text-text-muted hover:text-teal transition-colors">Quiz</Link>
                <Link href="/glossary" className="text-sm text-text-muted hover:text-teal transition-colors">Glossary</Link>
                <Link href="/faq" className="text-sm text-text-muted hover:text-teal transition-colors">FAQ</Link>
                <Link href="/resources" className="text-sm text-text-muted hover:text-teal transition-colors">Resources</Link>
              </div>
            </div>
            <div>
              <div className="font-semibold text-xs text-text uppercase tracking-wider mb-3">Tools</div>
              <div className="flex flex-col gap-2">
                <Link href="/chat" className="text-sm text-text-muted hover:text-teal transition-colors font-medium">Chat with AI</Link>
              </div>
              <div className="font-semibold text-xs text-text uppercase tracking-wider mt-4 mb-3">Connect</div>
              <div className="flex flex-col gap-2">
                <Link href="/about" className="text-sm text-text-muted hover:text-teal transition-colors">About</Link>
                <a href="https://in.linkedin.com/in/sunny-venkatesh-877896194" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-teal transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px my-8 bg-gradient-to-r from-transparent via-border to-transparent dark:via-zinc-700" />

        <div className="flex justify-between items-center flex-wrap gap-3">
          <span className="text-xs text-text-light dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Pain Rewired. Built by{" "}
            <a href="https://in.linkedin.com/in/sunny-venkatesh-877896194" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-teal transition-colors">Sunny Venkatesh</a>.
          </span>
          <span className="text-xs text-text-light dark:text-zinc-500">Not medical advice. Always consult a professional.</span>
        </div>
      </div>
    </footer>
  );
}
