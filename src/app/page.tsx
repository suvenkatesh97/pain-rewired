import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const allPosts = getAllPosts();
  const latest = allPosts.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A4D3E] via-[#0D7C66] to-[#0A4D3E] text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-[960px] mx-auto px-6 py-24 md:py-32 relative">
          <div className="max-w-[650px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              A research digest by Sunny Venkatesh
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
              Your pain is real.
              <br />
              <span className="text-emerald-300">It can also change.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-10 max-w-[560px]">
              Neuroplastic pain happens when your brain's pain pathways become
              hypersensitive — even after tissues heal. I simplify the latest
              research so you can understand what's happening and what actually helps.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/intro/what-is"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0D7C66] font-bold hover:bg-emerald-50 transition-all shadow-lg shadow-black/10"
              >
                Start here
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/25 text-white font-semibold hover:bg-white/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Ask AI
              </Link>
            </div>
          </div>
        </div>

        <div className="relative -mb-px">
          <svg viewBox="0 0 1440 80" className="w-full h-auto fill-[#FAFAF8] dark:fill-zinc-950"><path d="M0 40 C240 80, 480 0, 720 40 C960 80, 1200 0, 1440 40 L1440 80 L0 80Z" /></svg>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-6 -mt-2 relative z-10 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "66%", label: "Pain-free after 4 weeks of PRT", source: "(JAMA Psychiatry, 2021)" },
            { num: "100M+", label: "Americans with chronic pain", source: "(CDC, 2023)" },
            { num: "98%", label: "Improved after PRT treatment", source: "(JAMA Psychiatry, 2021)" },
            { num: "5 yr", label: "Results maintained at follow-up", source: "(JAMA follow-up)" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group rounded-2xl p-5 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-teal/30 dark:hover:border-teal/30 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-teal tracking-tight mb-1">{stat.num}</div>
              <div className="text-sm text-text-muted dark:text-zinc-400 leading-snug mb-1">{stat.label}</div>
              <div className="text-xs text-text-light dark:text-zinc-500">{stat.source}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[720px] mx-auto px-6 pb-20">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-teal uppercase tracking-widest mb-3">Understanding the Condition</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">How neuroplastic pain works</h2>
          <p className="text-text-muted dark:text-zinc-400 max-w-[560px] mx-auto leading-relaxed">
            Three things to understand about this type of chronic pain — backed by decades of research.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              ),
              title: "It's Real",
              desc: "Brain scans confirm the same pain regions activate as with acute injury. The cause differs, but the pain is identical.",
              color: "border-t-teal",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                </svg>
              ),
              title: "It's Common",
              desc: "Fibromyalgia, chronic back pain, migraines, IBS, TMJ — all involve central sensitization of the nervous system.",
              color: "border-t-emerald-500",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
              ),
              title: "It Can Change",
              desc: "Your brain wired the pain — and it can rewire it back. PRT shows 66% pain-free after 4 weeks in clinical trials.",
              color: "border-t-amber-500",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`group rounded-2xl bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 border-t-[3px] ${item.color} p-7 shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="w-12 h-12 rounded-xl bg-teal-light dark:bg-teal/20 text-teal flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-text-muted dark:text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-zinc-900 border-y border-border dark:border-zinc-800">
        <div className="max-w-[960px] mx-auto px-6 py-20">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="text-sm font-semibold text-teal uppercase tracking-widest mb-2">Research Digest</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Latest articles</h2>
              <p className="text-text-muted dark:text-zinc-400 mt-2">Simplified summaries of the latest research on neuroplastic pain.</p>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal text-white font-semibold hover:bg-teal-dark transition-all shadow-sm">
              View all articles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {latest.length === 0 ? (
            <div className="rounded-2xl p-10 text-center bg-[#FAFAF8] dark:bg-zinc-950 border border-border dark:border-zinc-800">
              <p className="text-lg font-medium mb-1">No posts yet</p>
              <p className="text-sm text-text-muted">The pipeline runs weekly. Check back soon, or explore the{" "}
                <Link href="/intro/what-is" className="text-teal font-medium hover:underline">intro guides</Link>.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latest.map((post) => {
                const isBlog = post.meta.tags?.includes("blog");
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block no-underline">
                    <article className="rounded-2xl bg-[#FAFAF8] dark:bg-zinc-950 border border-border dark:border-zinc-800 p-5 h-full hover:shadow-md hover:border-teal/30 dark:hover:border-teal/30 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${isBlog ? "bg-indigo-100 dark:bg-indigo-900/30" : "bg-teal-light dark:bg-teal/20"}`}>
                          {isBlog ? "📝" : "📄"}
                        </div>
                        <span className="text-xs font-medium text-text-light dark:text-zinc-500">{post.meta.date}</span>
                      </div>
                      <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-teal transition-colors line-clamp-2">{post.meta.title}</h3>
                      <div className="flex gap-1.5 flex-wrap">
                        {post.meta.difficulty && (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                            post.meta.difficulty === "beginner" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                            post.meta.difficulty === "intermediate" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}>{post.meta.difficulty}</span>
                        )}
                        {isBlog && <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">blog</span>}
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-[720px] mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-light dark:bg-teal/20 text-teal text-sm font-medium mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Ask the AI
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Have questions?</h2>
        <p className="text-text-muted dark:text-zinc-400 max-w-[480px] mx-auto mb-8 leading-relaxed">
          Our AI assistant is trained on research papers, books by Sarno, Gordon, Schubiner, and everything on this site.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-teal text-white font-bold hover:bg-teal-dark transition-all shadow-lg shadow-teal/20 text-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Chat with Pain Rewired AI
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </section>

      <section className="bg-teal-dark dark:bg-teal text-white py-16">
        <div className="max-w-[720px] mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-white/75 max-w-[480px] mx-auto mb-8 leading-relaxed">
            Take the self-assessment quiz to check if your symptoms match the neuroplastic pain pattern, or explore the intro guides.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/quiz" className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-teal-dark font-bold hover:bg-gray-100 transition-all">
              Take the quiz
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/intro/what-is" className="inline-flex items-center px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all">
              Read the intro
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
