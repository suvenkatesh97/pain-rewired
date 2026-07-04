import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { ReadingProgress } from "@/components/ReadingProgress";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const isBlog = post.meta.tags?.includes("blog");
  const isResearch = post.meta.tags?.includes("pubmed");

  const badgeClass = (d: string) =>
    d === "beginner"
      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
      : d === "intermediate"
        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
        : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";

  return (
    <>
      <ReadingProgress />
      <article className="max-w-[720px] mx-auto px-6 py-8">
        <header className="mb-10">
          <div className="flex gap-2 items-center flex-wrap mb-3">
            {post.meta.difficulty && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass(post.meta.difficulty)}`}>
                {post.meta.difficulty}
              </span>
            )}
            {isBlog && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                blog
              </span>
            )}
            {isResearch && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 dark:bg-blue-600/20 dark:text-blue-600-300">
                research
              </span>
            )}
            {post.meta.tags
              ?.filter((t) => !["blog", "pubmed", "opinion"].includes(t))
              .map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 dark:bg-blue-600/20 text-blue-800 dark:text-blue-600-300"
                >
                  {t}
                </span>
              ))}
          </div>
          <h1 className="text-3xl font-extrabold mb-4 tracking-tight leading-tight">
            {post.meta.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap pb-6 border-b border-border dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-600/20 flex items-center justify-center text-xs font-bold text-blue-600">
                {isBlog ? "📝" : "📄"}
              </div>
              <span className="text-sm text-text-muted">
                {post.meta.authors || (isBlog ? "Blog post" : "Research paper")}
              </span>
            </div>
            <span className="text-sm text-text-light">·</span>
            <time className="text-sm text-text-muted">{post.meta.date}</time>
            {post.meta.journal && (
              <>
                <span className="text-sm text-text-light">·</span>
                <span className="text-sm text-text-muted">{post.meta.journal}</span>
              </>
            )}
          </div>
        </header>

        <div className="prose prose-blue dark:prose-invert max-w-none prose-img:rounded-xl prose-a:text-blue-600">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>

        <div className="mt-12 pt-6 border-t border-border dark:border-zinc-800 flex justify-between items-center flex-wrap gap-4">
          {post.meta.source && (
            <a
              href={post.meta.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-1.5 rounded-lg border-2 border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition"
            >
              Read original {isBlog ? "post" : "paper"} &rarr;
            </a>
          )}
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-1.5 rounded-lg border border-border dark:border-zinc-700 text-text-muted text-sm font-semibold hover:text-text hover:bg-border-light dark:hover:bg-zinc-800 transition"
          >
            &larr; Back to all posts
          </Link>
        </div>

        <div className="mt-8 rounded-xl p-5 bg-blue-50/50 dark:bg-blue-600/10 border border-transparent">
          <p className="text-sm text-text-muted m-0">
            <strong>Disclaimer:</strong> This is a simplified summary for
            educational purposes. Always consult a healthcare professional for
            medical advice.
          </p>
        </div>
      </article>
    </>
  );
}
