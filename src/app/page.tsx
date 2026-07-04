import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const allPosts = getAllPosts();
  const latest = allPosts.slice(0, 6);

  return (
    <div className="divide-y divide-border/40 dark:divide-zinc-800/40">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-light/30 dark:from-teal/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-36 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-light/80 dark:bg-teal/20 text-teal text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
              </span>
              Evidence-based research, explained clearly
            </div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-text dark:text-white leading-[1.05] mb-6">
              Chronic pain has a{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal via-teal to-emerald-500">
                new explanation.
              </span>
            </h1>
            <p className="text-xl text-text-muted dark:text-zinc-400 leading-relaxed max-w-2xl mb-10">
              Your brain can learn to generate real pain — even when your body has healed. 
              Pain Rewired curates the science behind neuroplastic pain and the treatments 
              that actually work.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/intro/what-is"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal text-white font-semibold hover:bg-teal-dark transition-all shadow-lg shadow-teal/25 hover:shadow-xl hover:shadow-teal/30"
              >
                Understand the science
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
              </Link>
              <Link
                href="/chat"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border dark:border-zinc-700 text-text dark:text-zinc-200 font-semibold hover:border-teal dark:hover:border-teal hover:text-teal transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
                Ask the AI assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-zinc-900 rounded-2xl border border-border dark:border-zinc-800 shadow-xl p-6">
          {[
            { value: "66%", label: "Pain-free after PRT", sub: "JAMA Psychiatry, 2021 — 4-week RCT" },
            { value: "100M+", label: "Americans affected", sub: "CDC — chronic pain prevalence" },
            { value: "98%", label: "Improved with PRT", sub: "Results maintained at 5-year follow-up" },
          ].map((s, i) => (
            <div key={i} className="text-center px-4 py-2">
              <div className="text-4xl font-black text-teal tracking-tight">{s.value}</div>
              <div className="text-sm font-semibold mt-1">{s.label}</div>
              <div className="text-xs text-text-muted dark:text-zinc-500 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-teal uppercase tracking-widest">The Problem</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-2 mb-4">Pain that outlasts the injury</h2>
            <p className="text-text-muted dark:text-zinc-400 leading-relaxed mb-6">
              Most people assume chronic pain means ongoing damage. But neuroscience tells a different story. 
              When pain persists beyond normal healing, the brain itself can become the source — generating 
              real pain through learned neural pathways, even when tissues are perfectly healthy.
            </p>
            <Link href="/intro/science" className="text-teal font-semibold hover:underline inline-flex items-center gap-1">
              Read the neuroscience
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
          <div className="grid gap-4">
            {[
              { title: "Central sensitization", desc: "Your nervous system's volume knob gets stuck on high. Normal sensations become painful — a condition visible on brain scans." },
              { title: "Learned neural pathways", desc: "Pain circuits strengthen through repetition, just like any habit. The brain predicts danger, and your body feels real pain." },
              { title: "The mind-body link", desc: "Stress, suppressed emotions, and past trauma activate the same brain regions that process physical pain." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800">
                <div className="w-10 h-10 rounded-lg bg-teal-light dark:bg-teal/20 text-teal flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />}
                    {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />}
                    {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-0.5">{item.title}</h3>
                  <p className="text-sm text-text-muted dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment approaches */}
      <section className="bg-white/50 dark:bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-teal uppercase tracking-widest">The Solution</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-2 mb-4">Treatments backed by clinical trials</h2>
            <p className="text-text-muted dark:text-zinc-400 max-w-2xl mx-auto">These approaches help your brain unlearn the pain pattern. No medication side effects, no surgery.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Pain Reprocessing Therapy",
                subtitle: "PRT — Alan Gordon, 2021",
                points: ["66% pain-free in 4 weeks", "8 sessions, 1x/week", "JAMA Psychiatry RCT", "5-year follow-up confirmed"],
                href: "/protocols/prt",
              },
              {
                title: "Schubiner's Method",
                subtitle: "Unlearn Your Pain workbook",
                points: ["3-phase self-directed program", "Neuroscience + emotional work", "28-day structured format", "Works across conditions"],
                href: "/protocols/schubiner",
              },
              {
                title: "Emotional Awareness Therapy",
                subtitle: "EAET — Lumley & Schubiner",
                points: ["Targets emotional roots", "Outperformed CBT in trials", "Effective for fibromyalgia", "Addresses trauma and stress"],
                href: "/intro/treatments",
              },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group block no-underline">
                <div className="h-full rounded-2xl bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 p-8 hover:shadow-xl hover:border-teal/30 dark:hover:border-teal/30 transition-all duration-300">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-teal transition-colors">{item.title}</h3>
                  <p className="text-xs text-text-muted dark:text-zinc-500 mb-6">{item.subtitle}</p>
                  <ul className="space-y-2">
                    {item.points.map((p, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-text-muted dark:text-zinc-400">
                        <svg className="w-4 h-4 text-teal flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
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
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-teal uppercase tracking-widest">Stay Current</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-2">Latest research digest</h2>
          </div>
          <Link href="/blog" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-teal hover:text-teal-dark transition-colors">
            View all
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>

        {latest.length === 0 ? (
          <div className="rounded-2xl p-16 text-center bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800">
            <p className="text-lg font-medium mb-2">No posts yet</p>
            <p className="text-text-muted text-sm">The pipeline runs weekly. Check back soon.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map((post) => {
              const isBlog = post.meta.tags?.includes("blog");
              const research = post.meta.tags?.includes("pubmed");
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block no-underline">
                  <article className="rounded-xl bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 p-6 h-full hover:shadow-lg hover:border-teal/30 dark:hover:border-teal/30 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                        research ? "bg-teal-light text-teal-dark dark:bg-teal/20 dark:text-teal-300" :
                        "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"
                      }`}>
                        {research ? "Research" : "Blog"}
                      </span>
                      <span className="text-xs text-text-light dark:text-zinc-500">{post.meta.date}</span>
                    </div>
                    <h3 className="font-semibold leading-snug mb-2 group-hover:text-teal transition-colors line-clamp-3">{post.meta.title}</h3>
                    {post.meta.authors && (
                      <p className="text-xs text-text-muted dark:text-zinc-500 truncate">{post.meta.authors}</p>
                    )}
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-teal">View all articles &rarr;</Link>
        </div>
      </section>

      {/* Chat CTA */}
      <section className="bg-gradient-to-br from-teal via-teal-dark to-teal text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 text-center">
          <svg className="w-12 h-12 mx-auto mb-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">Ask anything about neuroplastic pain</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8 leading-relaxed">
            Our AI assistant has read the research. Trained on books by Sarno, Gordon, Schubiner, 
            and the latest papers. Get instant, evidence-based answers.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-teal-dark font-bold hover:bg-gray-100 transition-all shadow-xl text-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Try the AI assistant
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight mb-3">Take the self-assessment</h2>
        <p className="text-text-muted dark:text-zinc-400 max-w-md mx-auto mb-8">
          A 10-question quiz to check if your symptoms match the neuroplastic pain pattern.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal text-white font-semibold hover:bg-teal-dark transition-all shadow-lg shadow-teal/25"
        >
          Start the quiz
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </Link>
      </section>
    </div>
  );
}
