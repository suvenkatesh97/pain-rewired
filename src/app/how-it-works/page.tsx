import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const books = [
  { title: "Healing Back Pain", author: "Dr. John E. Sarno", desc: "The book that started the modern mind-body pain movement. Introduced Tension Myositis Syndrome (TMS)." },
  { title: "The Way Out", author: "Alan Gordon, LCSW", desc: "The definitive guide to Pain Reprocessing Therapy (PRT). Step-by-step brain retraining protocol." },
  { title: "Unlearn Your Pain", author: "Dr. Howard Schubiner", desc: "A 28-day workbook program combining neuroscience education, emotional awareness, and behavioral techniques." },
  { title: "Hidden From View", author: "Dr. Allan Abbass & Dr. Howard Schubiner", desc: "A clinician's guide to psychophysiologic disorders — connecting emotions and physical symptoms." },
];

const pipelineSteps = [
  {
    step: 1,
    title: "Fetch new research weekly",
    desc: "Every Monday at 8 AM UTC, a GitHub Actions workflow runs a Python script that searches PubMed for the latest papers on neuroplastic pain, central sensitization, PRT, and pain neuroscience education. It also checks the Psychology Today 'Unlearn Your Pain' blog for new posts by Dr. Howard Schubiner.",
    code: "pipeline/fetch.py (214 lines)\n→ Searches 5 PubMed queries\n→ Parses RSS feed\n→ Tracks already-seen papers in seen.json",
  },
  {
    step: 2,
    title: "Summarize with AI",
    desc: "Blog posts use their existing RSS summaries directly. Research papers are summarized using an AI model that produces plain-language summaries: what they found, why it matters, and practical takeaways — all in 300-400 words.",
    code: "pipeline/summarize.py (177 lines)\n→ Gemini 2.0 Flash for paper summaries\n→ Blog posts: use RSS summaries directly\n→ Max 5 papers per weekly run",
  },
  {
    step: 3,
    title: "Publish as blog posts",
    desc: "Summaries are written as Markdown files with full frontmatter (title, date, tags, authors, source) and committed directly to the repository. Vercel detects the push and automatically deploys the updated site.",
    code: "content/posts/*.md\n→ Frontmatter: title, date, tags, difficulty\n→ Rendered with react-markdown + remark-gfm\n→ 17 posts published so far",
  },
];

const chatSteps = [
  {
    step: 1,
    title: "Chunk the books",
    desc: "All four books are split into 500-word chunks with 100-word overlap. This ensures each chunk captures enough context while being small enough for precise search matching.",
    code: "726 total chunks\n→ healing-back-pain-sarno.txt: 155 chunks\n→ the-way-out-gordon.txt: 147 chunks\n→ unlearn-your-pain-schubiner.txt: 267 chunks\n→ hidden-from-view-abass-schubiner.txt: 140 chunks\n→ + 17 blog posts: 17 chunks",
  },
  {
    step: 2,
    title: "Create embeddings",
    desc: "Each chunk is converted into a 384-dimensional vector (a list of 384 numbers) using the all-MiniLM-L6-v2 model from HuggingFace. This vector captures the semantic meaning of the text — similar concepts get similar vectors.",
    code: "scripts/embed.py (134 lines)\n→ Model: all-MiniLM-L6-v2 (SentenceTransformer)\n→ 384-dimensional vectors\n→ Run locally with PyTorch + CPU",
  },
  {
    step: 3,
    title: "Store in vector database",
    desc: "All 726 vectors are stored in a Supabase PostgreSQL database with the pgvector extension. An HNSW index enables lightning-fast similarity search across all chunks.",
    code: "Supabase pgvector\n→ documents table: id, content, source, embedding\n→ HNSW index for fast nearest-neighbor search\n→ search_documents() function for cosine similarity",
  },
  {
    step: 4,
    title: "Answer questions with AI",
    desc: "When you ask a question: (1) the question is embedded using the same model, (2) the 5 most similar book chunks are retrieved via vector search, (3) these chunks are sent as context to Groq's Llama 3.3 70B model, and (4) the AI generates an evidence-based answer with source context.",
    code: "src/app/api/chat/route.ts\n→ Embed question → Search Supabase → Groq API\n→ Streams response in real-time (SSE)\n→ Context: up to 5 relevant book excerpts",
  },
];

const tech = [
  { name: "Next.js 16", desc: "React framework with App Router, server components, and static site generation. Hosted on Vercel's free tier." },
  { name: "Tailwind CSS v4", desc: "Utility-first CSS with custom navy blue theme, dark mode support, and the shadcn/ui component library." },
  { name: "shadcn/ui", desc: "Professionally designed, accessible React components built on Radix UI primitives." },
  { name: "Supabase", desc: "Open-source Firebase alternative. Stores document vectors with pgvector extension for similarity search." },
  { name: "Groq", desc: "Free inference platform running Llama 3.3 70B. No credit card, no rate limits on free tier." },
  { name: "pgvector", desc: "PostgreSQL extension enabling vector similarity search. Powers the RAG (Retrieval-Augmented Generation) pipeline." },
  { name: "MiniLM-L6", desc: "Lightweight embedding model (22M parameters) that converts text into 384-dimension vectors for semantic search." },
  { name: "GitHub Actions", desc: "Weekly cron job that fetches new research, summarizes it with AI, and commits blog posts to the repo." },
];

export default function HowItWorks() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-20 text-center space-y-4">
          <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm">Behind the Scenes</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">How Pain Rewired Works</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A step-by-step look at how this site uses AI, vector search, and automated pipelines
            to make neuroplastic pain research accessible — all running on free infrastructure.
          </p>
        </div>
      </section>

      {/* The Knowledge Base */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-10">
            <Badge variant="outline" className="rounded-md mb-3">Knowledge Base</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">The AI is trained on 4 books</h2>
            <p className="text-muted-foreground leading-relaxed">
              All four books were extracted to plain text, split into overlapping chunks,
              and embedded as vectors. When you ask a question, the AI searches across
              all of them simultaneously to find the most relevant passages.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {books.map((book, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-primary/10 text-primary text-xs font-bold">{i + 1}</span>
                    <span className="text-xs text-muted-foreground">Book {i + 1} of 4</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{book.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{book.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Research Pipeline */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-10">
            <Badge variant="outline" className="rounded-md mb-3">Part 1</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">The Research Digest Pipeline</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every week, the site automatically finds new research, summarizes it,
              and publishes it — no human intervention needed.
            </p>
          </div>

          <div className="space-y-8">
            {pipelineSteps.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">{s.step}</div>
                  {s.step < pipelineSteps.length && <div className="w-0.5 flex-1 bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                  <pre className="bg-muted rounded-lg p-4 text-xs font-mono text-muted-foreground overflow-x-auto">{s.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat System */}
      <section className="py-16 bg-muted/30 border-y">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-10">
            <Badge variant="outline" className="rounded-md mb-3">Part 2</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">The AI Chat System (RAG)</h2>
            <p className="text-muted-foreground leading-relaxed">
              RAG stands for <strong>Retrieval-Augmented Generation</strong>. Instead of the AI just guessing
              from its training data, we first find relevant passages from our books and
              feed them to the AI — so answers are grounded in real sources.
            </p>
          </div>

          <div className="space-y-8">
            {chatSteps.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">{s.step}</div>
                  {s.step < chatSteps.length && <div className="w-0.5 flex-1 bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                  <pre className="bg-muted rounded-lg p-4 text-xs font-mono text-muted-foreground overflow-x-auto">{s.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-10">
            <Badge variant="outline" className="rounded-md mb-3">Tech Stack</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Everything we use (all free)</h2>
            <p className="text-muted-foreground leading-relaxed">
              The entire infrastructure runs on free tiers. No servers, no databases to manage,
              no API bills — just open-source tools and generous free plans.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {tech.map((t) => (
              <Card key={t.name}>
                <CardContent className="p-5">
                  <h3 className="font-bold text-sm mb-1">{t.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              The entire source code is open source and available on GitHub.
            </p>
            <a
              href="https://github.com/suvenkatesh97/pain-rewired"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              suvenkatesh97/pain-rewired
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
