import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const latest = posts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-light/30 dark:from-accent/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-light/80 dark:bg-accent/20 text-accent text-sm font-medium mb-6 border border-accent/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Evidence-based research, made accessible
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary dark:text-white leading-[1.06] mb-6">
              Chronic pain has a{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-teal-500 to-teal-400">
                new explanation.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary dark:text-zinc-400 leading-relaxed max-w-[600px] mb-10">
              Your brain can learn to generate real pain — even after your body has healed.
              Pain Rewired curates the science behind neuroplastic pain and the treatments
              that actually work.
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link
                href="/intro/what-is"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30"
              >
                Understand the science
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border-light dark:border-zinc-700 text-text-primary dark:text-zinc-200 font-semibold hover:border-accent dark:hover:border-accent hover:text-accent transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Ask the AI assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="mx-auto max-w-[1200px] px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white dark:bg-zinc-900 rounded-2xl border border-border-light dark:border-border-dark p-5 shadow-xl shadow-black/[0.03]">
          {[
            { value: "66%", label: "Pain-free after PRT", sub: "JAMA Psychiatry" },
            { value: "100M+", label: "Americans affected", sub: "CDC prevalence" },
            { value: "98%", label: "Improved with PRT", sub: "1,210 patients" },
            { value: "5yr", label: "Results maintained", sub: "Follow-up confirmed" },
          ].map((s, i) => (
            <div key={i} className="text-center px-3 py-2">
              <div className="text-2xl md:text-3xl font-extrabold text-accent tracking-tight">{s.value}</div>
              <div className="text-[13px] font-semibold mt-0.5">{s.label}</div>
              <div className="text-xs text-text-tertiary dark:text-zinc-500 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What is neuroplastic pain? */}
      <section className="mx-auto max-w-[1200px] px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">The Problem</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 mb-5 leading-tight">
              Pain that outlasts the injury
            </h2>
            <p className="text-text-secondary dark:text-zinc-400 leading-relaxed mb-8">
              Most people assume chronic pain means ongoing damage. But neuroscience tells
              a different story. When pain persists beyond normal healing, the brain itself
              can become the source — generating real pain through learned neural pathways,
              even when tissues are perfectly healthy.
            </p>
            <Link
              href="/intro/science"
              className="inline-flex items-center gap-1 text-accent font-semibold hover:text-accent-dark transition-colors"
            >
              Read the neuroscience
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { title: "Central sensitization", desc: "Your nervous system's volume knob gets stuck on high. Normal sensations become painful — a condition visible on brain scans." },
              { title: "Learned neural pathways", desc: "Pain circuits strengthen through repetition, just like any habit. The brain predicts danger, and your body feels real pain." },
              { title: "The mind-body link", desc: "Stress, suppressed emotions, and past trauma activate the same brain regions that process physical pain." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-white dark:bg-zinc-900 border border-border-light dark:border-border-dark shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-accent-light dark:bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">
                  {i === 0 && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="bg-white/50 dark:bg-zinc-900/50 border-y border-border-light dark:border-border-dark">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">The Solution</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 mb-4">
              Treatments backed by clinical trials
            </h2>
            <p className="text-text-secondary dark:text-zinc-400 max-w-[600px] mx-auto leading-relaxed">
              These approaches help your brain unlearn the pain pattern. No medication side effects, no surgery required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Pain Reprocessing Therapy",
                subtitle: "PRT — Alan Gordon, JAMA 2021",
                points: ["66% pain-free in 4 weeks", "8 sessions, once per week", "5-year follow-up confirmed", "Somatic tracking technique"],
                href: "/protocols/prt",
              },
              {
                title: "Unlearn Your Pain",
                subtitle: "Schubiner's 3-phase program",
                points: ["Workbook-based, self-directed", "Education + Evidence + Experience", "28-day structured format", "Works across conditions"],
                href: "/protocols/schubiner",
              },
              {
                title: "Emotional Awareness Therapy",
                subtitle: "EAET — Lumley & Schubiner",
                points: ["Targets emotional roots of pain", "Outperformed CBT in trials", "Effective for fibromyalgia", "Addresses trauma and stress"],
                href: "/intro/treatments",
              },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group block no-underline">
                <div className="h-full rounded-2xl bg-white dark:bg-zinc-900 border border-border-light dark:border-border-dark p-7 hover:shadow-xl hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-xs text-text-secondary dark:text-zinc-500 mb-6">{item.subtitle}</p>
                  <ul className="space-y-2.5">
                    {item.points.map((p, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-text-secondary dark:text-zinc-400">
                        <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto max-w-[1200px] px-6 lg:px-8 py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">Stay Current</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">Latest research digest</h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            View all articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>

        {latest.length === 0 ? (
          <div className="rounded-2xl p-16 text-center bg-white dark:bg-zinc-900 border border-border-light dark:border-border-dark">
            <p className="text-lg font-medium mb-2">No posts yet</p>
            <p className="text-text-secondary dark:text-zinc-400 text-sm">The pipeline runs weekly. Check back soon.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map((post) => {
              const isBlog = post.meta.tags?.includes("blog");
              const isResearch = post.meta.tags?.includes("pubmed");
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block no-underline">
                  <article className="rounded-xl bg-white dark:bg-zinc-900 border border-border-light dark:border-border-dark p-6 h-full hover:shadow-lg hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${isResearch ? "bg-accent-light text-accent dark:bg-accent/20 dark:text-teal-300" : "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"}`}>
                        {isResearch ? "Research" : "Blog"}
                      </span>
                      <span className="text-xs text-text-tertiary dark:text-zinc-500">{post.meta.date}</span>
                    </div>
                    <h3 className="font-semibold leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-3 text-[15px]">
                      {post.meta.title}
                    </h3>
                    {post.meta.authors && (
                      <p className="text-xs text-text-secondary dark:text-zinc-500 truncate">{post.meta.authors}</p>
                    )}
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-accent">View all articles &rarr;</Link>
        </div>
      </section>

      {/* Built with AI */}
      <section className="bg-accent/5 dark:bg-accent/5 border-y border-accent/10">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 mb-4">
              Built with AI to make research accessible
            </h2>
            <p className="text-text-secondary dark:text-zinc-400 max-w-[600px] mx-auto leading-relaxed">
              Pain Rewired uses modern AI tools to curate, summarize, and answer questions
              about neuroplastic pain — all running on free infrastructure.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                  ),
                title: "RAG Chat Assistant",
                desc: "Ask anything about neuroplastic pain. Our AI searches 4 books and 726 research chunks stored in a vector database for evidence-based answers.",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: "Powered by Groq",
                desc: "Responses stream instantly from Groq's free inference platform running Llama 3.3 70B — no wait times, no API costs, always available.",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75" />
                  </svg>
                ),
                title: "Vector Search (pgvector)",
                desc: "Questions are embedded using MiniLM-L6 and matched against book texts stored in Supabase — Sarno, Gordon, Schubiner, Abbass.",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                title: "Automated Research Pipeline",
                desc: "A GitHub Actions workflow fetches PubMed papers weekly, summarizes them with AI, and publishes directly to this site — fully automated.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-white dark:bg-zinc-900 border border-border-light dark:border-border-dark p-6 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-accent-light dark:bg-accent/20 text-accent flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-text-secondary dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-tertiary dark:text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-accent text-base">726</span> chunks indexed
            </span>
            <span className="w-1 h-1 rounded-full bg-border-light dark:bg-border-dark" />
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-accent text-base">4</span> books embedded
            </span>
            <span className="w-1 h-1 rounded-full bg-border-light dark:bg-border-dark" />
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-accent text-base">17</span> blog posts
            </span>
            <span className="w-1 h-1 rounded-full bg-border-light dark:bg-border-dark" />
            <a
              href="https://github.com/suvenkatesh97/pain-rewired"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-accent font-medium hover:text-accent-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              Open source on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Chat CTA */}
      <section className="bg-gradient-to-br from-accent via-accent to-teal-700 text-white">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-20 md:py-24 text-center">
          <svg className="w-12 h-12 mx-auto mb-6 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Ask anything about neuroplastic pain
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
            Our AI assistant has read the research. Trained on books by Sarno, Gordon,
            Schubiner, and the latest papers. Get instant, evidence-based answers.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-accent font-bold hover:bg-zinc-50 transition-all shadow-xl text-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Try the AI assistant
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="mx-auto max-w-[1200px] px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
          Take the self-assessment
        </h2>
        <p className="text-text-secondary dark:text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
          A 10-question quiz to check if your symptoms match the neuroplastic pain pattern.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all shadow-lg shadow-accent/25"
        >
          Start the quiz
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </Link>
      </section>
    </>
  );
}
