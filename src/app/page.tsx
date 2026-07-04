import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const allPosts = getAllPosts();
  const latest = allPosts.slice(0, 4);

  return (
    <>
      <section className="bg-gradient-to-br from-teal via-teal-dark to-[#0A4D3E] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,white_0%,transparent_50%),radial-gradient(circle_at_80%_80%,white_0%,transparent_40%)]" />
        <div className="max-w-[720px] mx-auto px-6 relative">
          <p className="text-sm opacity-75 mb-3 uppercase tracking-widest font-semibold">
            A research digest by Sunny Venkatesh
          </p>
          <h1 className="text-5xl font-extrabold max-w-[650px] mb-5 leading-tight tracking-tight">
            Your pain is real.
            <br />
            It can also change.
          </h1>
          <p className="text-lg opacity-90 max-w-[560px] mb-8 leading-relaxed">
            Neuroplastic pain is a well-understood condition where your brain&apos;s
            pain pathways become hypersensitive — even after tissues heal. I simplify
            the latest research so you can understand what&apos;s happening and what
            actually helps.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/intro/what-is"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-teal font-bold hover:bg-gray-100 transition"
            >
              Start here &rarr;
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 transition"
            >
              Take the assessment
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-3 gap-4 bg-warm-white dark:bg-zinc-900 rounded-2xl border border-border dark:border-zinc-800 shadow-md p-6">
          {[
            { num: "66%", label: "Pain-free after PRT (JAMA trial)" },
            { num: "100M+", label: "Americans with chronic pain" },
            { num: "3", label: "Pain types: nociceptive, neuropathic, nociplastic" },
          ].map((stat, i) => (
            <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
              <div className="text-3xl font-extrabold text-teal tracking-tight">{stat.num}</div>
              <div className="text-sm text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[720px] mx-auto px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Understanding Neuroplastic Pain</h2>
        <p className="text-center text-text-muted max-w-[500px] mx-auto mt-2 mb-10">
          Three things to know about this type of chronic pain.
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: "🧠", title: "It&apos;s Real", desc: "Brain scans confirm the same pain regions activate as with acute injury. The cause differs, but the pain is identical.", color: "#0D7C66" },
            { icon: "📊", title: "It&apos;s Common", desc: "Fibromyalgia, chronic back pain, migraines, IBS, TMJ, pelvic pain — all involve central sensitization.", color: "#065A48" },
            { icon: "🔄", title: "It Can Change", desc: "Your brain wired the pain — and it can rewire it back. PRT shows 66% pain-free after 4 weeks in clinical trials.", color: "#0A4D3E" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-border dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center shadow-sm hover:shadow-md transition-shadow animate-fade-in-up"
              style={{ borderTopColor: item.color, borderTopWidth: "3px", animationDelay: `${0.1 * (i + 1)}s` }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[720px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent dark:via-zinc-700" />
      </div>

      <section className="max-w-[720px] mx-auto px-6 py-16">
        <div className="flex justify-between items-center flex-wrap gap-2 mb-6">
          <div>
            <h2 className="text-3xl font-bold">Latest Research</h2>
            <p className="text-text-muted mt-1">
              Simplified summaries of recent papers and blog posts.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-1.5 rounded-lg border-2 border-teal text-teal text-sm font-semibold hover:bg-teal-light hover:text-teal-dark transition"
          >
            View all &rarr;
          </Link>
        </div>

        {latest.length === 0 ? (
          <div className="rounded-xl border border-border dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 text-center">
            <p className="text-lg mb-2">No posts yet.</p>
            <p className="text-sm text-text-muted">
              The pipeline runs weekly. Check back soon, or explore the{" "}
              <Link href="/intro/what-is" className="text-teal hover:underline">intro guides</Link>.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {latest.map((post) => {
              const isBlog = post.meta.tags?.includes("blog");
              const isResearch = post.meta.tags?.includes("pubmed");
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="no-underline text-inherit"
                >
                  <article className="rounded-xl border border-border dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-teal-light transition-all">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                      style={{ background: isBlog ? "#E0E7FF" : "var(--teal-light, #E8F5F2)" }}
                    >
                      {isBlog ? "📝" : "📄"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-1.5 flex-wrap mb-0.5">
                        {post.meta.difficulty && (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                            post.meta.difficulty === "beginner" ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" :
                            post.meta.difficulty === "intermediate" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300" :
                            "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                          }`}>{post.meta.difficulty}</span>
                        )}
                        {isBlog && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">blog</span>}
                        {isResearch && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-light text-teal-dark dark:bg-teal/20 dark:text-teal-300">research</span>}
                      </div>
                      <span className="font-semibold text-[15px] leading-snug">{post.meta.title}</span>
                      <div className="text-xs text-text-muted mt-0.5">
                        {post.meta.date} · {post.meta.journal || "Blog"}
                      </div>
                    </div>
                    <span className="text-text-light text-lg flex-shrink-0">&rarr;</span>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <div className="max-w-[720px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent dark:via-zinc-700" />
      </div>

      <section className="max-w-[720px] mx-auto px-6 py-16">
        <div className="rounded-2xl p-8 flex gap-6 items-center flex-wrap bg-gradient-to-br from-teal-light to-teal-light/50 dark:from-teal/10 dark:to-teal/5 border border-teal-light/50 dark:border-teal/20">
          <div className="w-16 h-16 rounded-full bg-teal-light dark:bg-teal/20 border-2 border-teal flex items-center justify-center text-2xl font-bold text-teal flex-shrink-0">
            S
          </div>
          <div className="flex-1 min-w-60">
            <h3 className="text-lg font-bold mb-1">Built by Sunny Venkatesh</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              I created Pain Rewired because the research on neuroplastic pain
              changed my understanding of chronic pain — and I wanted to make it
              accessible to everyone who needs it. I curate and simplify the latest
              findings so you don&apos;t have to read through dense academic papers.
            </p>
            <div className="mt-3 flex gap-3 items-center">
              <Link
                href="/about"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-teal text-white text-sm font-semibold hover:bg-teal-dark transition"
              >
                More about me &rarr;
              </Link>
              <a
                href="https://in.linkedin.com/in/sunny-venkatesh-877896194"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-border dark:border-zinc-700 text-text-muted text-sm font-semibold hover:text-text hover:bg-border-light dark:hover:bg-zinc-800 transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-dark dark:bg-teal text-white py-12 text-center">
        <div className="max-w-[720px] mx-auto px-6">
          <h2 className="text-2xl font-bold mb-3">Not sure where to start?</h2>
          <p className="opacity-85 max-w-[440px] mx-auto mb-6">
            Take the self-assessment quiz to check if your symptoms match the
            neuroplastic pain pattern, or jump into the intro guides.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/quiz"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-white text-teal-dark dark:text-teal font-bold hover:bg-gray-100 transition"
            >
              Take the quiz &rarr;
            </Link>
            <Link
              href="/intro/what-is"
              className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 border-white/30 text-white hover:bg-white/10 transition"
            >
              Read the intro
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
