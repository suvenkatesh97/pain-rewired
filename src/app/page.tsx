import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const posts = getAllPosts();
  const latest = posts.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ... Hero, Stats, Problem/Solution, Treatments, Blog, Built with AI, CTAs ... */}

      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto max-w-6xl px-4 py-24 md:py-36">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
            <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Evidence-based research, made accessible
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Chronic pain has a{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400">
                new explanation.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Your brain can learn to generate real pain — even after your body has healed.
              Pain Rewired curates the science behind neuroplastic pain and the treatments
              that actually work.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Link href="/intro/what-is" className={buttonVariants({ size: "lg" })}>
                Understand the science
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link href="/chat" className={buttonVariants({ size: "lg", variant: "outline" })}>
                <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Ask the AI assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="-mt-8 relative z-10">
        <div className="container mx-auto max-w-4xl px-4">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: "66%", label: "Pain-free after PRT", sub: "JAMA Psychiatry" },
                  { value: "100M+", label: "Americans affected", sub: "CDC prevalence" },
                  { value: "98%", label: "Improved with PRT", sub: "1,210 patients" },
                  { value: "5yr", label: "Results maintained", sub: "Follow-up confirmed" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-extrabold text-primary tracking-tight">{s.value}</div>
                    <div className="text-sm font-semibold mt-1">{s.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="rounded-md">The Problem</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Pain that outlasts the injury</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Most people assume chronic pain means ongoing damage. But neuroscience tells
                a different story. When pain persists beyond normal healing, the brain itself
                can become the source.
              </p>
              <Link href="/intro/science" className={buttonVariants({ variant: "link" })}>
                Read the neuroscience
                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { title: "Central sensitization", desc: "Your nervous system's volume knob gets stuck on high. Normal sensations become painful — visible on brain scans." },
                { title: "Learned neural pathways", desc: "Pain circuits strengthen through repetition, just like any habit. The brain predicts danger, and you feel real pain." },
                { title: "The mind-body link", desc: "Stress, suppressed emotions, and past trauma activate the same brain regions that process physical pain." },
              ].map((item, i) => (
                <Card key={i}>
                  <CardContent className="p-5 flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={i === 0 ? "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" : i === 1 ? "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" : "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Treatments */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="rounded-md">The Solution</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Treatments backed by clinical trials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">These approaches help your brain unlearn the pain pattern. No medication side effects, no surgery.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Pain Reprocessing Therapy", subtitle: "Alan Gordon · JAMA 2021", points: ["66% pain-free in 4 weeks", "8 sessions, once per week", "5-year follow-up confirmed", "Somatic tracking"], href: "/protocols/prt" },
              { title: "Unlearn Your Pain", subtitle: "Schubiner's 3-phase program", points: ["Workbook-based, self-directed", "Education + Evidence + Experience", "28-day structured format", "Works across conditions"], href: "/protocols/schubiner" },
              { title: "Emotional Awareness Therapy", subtitle: "EAET · Lumley & Schubiner", points: ["Targets emotional roots", "Outperformed CBT in trials", "Effective for fibromyalgia", "Addresses trauma and stress"], href: "/intro/treatments" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group no-underline">
                <Card className="h-full hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-7">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mb-6">{item.subtitle}</p>
                    <ul className="space-y-2.5">
                      {item.points.map((p, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <Badge variant="outline" className="rounded-md">Stay Current</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Latest research digest</h2>
            </div>
            <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
              View all articles &rarr;
            </Link>
          </div>

          {latest.length === 0 ? (
            <Card>
              <CardContent className="p-16 text-center">
                <p className="text-lg font-medium mb-2">No posts yet</p>
                <p className="text-muted-foreground text-sm">The pipeline runs weekly. Check back soon.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group no-underline">
                  <Card className="h-full hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={post.meta.tags?.includes("pubmed") ? "default" : "secondary"}>
                          {post.meta.tags?.includes("pubmed") ? "Research" : "Blog"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.meta.date}</span>
                      </div>
                      <h3 className="font-semibold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
                        {post.meta.title}
                      </h3>
                      {post.meta.authors && (
                        <p className="text-xs text-muted-foreground truncate">{post.meta.authors}</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Built with AI */}
      <section className="py-24 bg-muted/30 border-y">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="rounded-md">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Built with AI to make research accessible</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pain Rewired uses modern AI tools to curate, summarize, and answer questions — all running on free infrastructure.{" "}
              <Link href="/how-it-works" className="text-primary font-medium hover:underline">Learn how →</Link>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { title: "RAG Chat Assistant", desc: "Ask anything about neuroplastic pain. Our AI searches 4 books and 726 research chunks for evidence-based answers." },
              { title: "Powered by Groq", desc: "Responses stream from Groq's free inference platform running Llama 3.3 70B — fast, capable, completely free." },
              { title: "Vector Search (pgvector)", desc: "Questions are embedded using MiniLM-L6 and matched against book texts stored in Supabase." },
              { title: "Auto Research Pipeline", desc: "GitHub Actions fetches PubMed papers weekly, summarizes them, and publishes to this site." },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={i === 0 ? "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" : i === 1 ? "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" : i === 2 ? "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75" : "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span><strong className="text-primary text-base">726</strong> chunks</span>
            <span>·</span>
            <span><strong className="text-primary text-base">4</strong> books</span>
            <span>·</span>
            <span><strong className="text-primary text-base">17</strong> posts</span>
            <span>·</span>
            <a href="https://github.com/suvenkatesh97/pain-rewired" target="_blank" rel="noopener noreferrer"
              className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              Open source
            </a>
          </div>
        </div>
      </section>

      {/* Chat CTA */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto max-w-6xl px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Ask anything about neuroplastic pain</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
            Our AI assistant has read the research. Trained on books by Sarno, Gordon,
            Schubiner, and the latest papers.
          </p>
          <Link href="/chat" className={buttonVariants({ size: "lg", variant: "secondary" })}>
            <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Try the AI assistant
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Take the self-assessment</h2>
          <p className="text-muted-foreground max-w-md mx-auto">A 10-question quiz to check if your symptoms match the neuroplastic pain pattern.</p>
          <Link href="/quiz" className={buttonVariants({ size: "lg" })}>
            Start the quiz
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
