import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Research Digest</h1>
      <p className="text-text-muted mb-10 leading-relaxed">
        Simplified summaries of research papers and blog posts on neuroplastic
        pain, central sensitization, and pain neuroscience.
      </p>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-border dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 text-center">
          <p className="text-lg mb-2">No posts yet.</p>
          <p className="text-sm text-text-muted">
            The pipeline runs weekly. Check back soon.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => {
            const isBlog = post.meta.tags?.includes("blog");
            const isResearch = post.meta.tags?.includes("pubmed");
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="no-underline text-inherit"
              >
                <article className="rounded-xl border border-border dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-blue-600-light transition-all">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ background: isBlog ? "#E0E7FF" : "#DBEAFE" }}
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
                      {isResearch && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 dark:bg-blue-600/20 dark:text-blue-600-300">research</span>}
                    </div>
                    <span className="font-semibold text-[15px] leading-snug">{post.meta.title}</span>
                    <div className="text-xs text-text-muted mt-0.5">
                      {post.meta.date} · {post.meta.journal || "Blog"}
                      {post.meta.authors && ` · ${post.meta.authors}`}
                    </div>
                  </div>
                  <span className="text-text-light text-lg flex-shrink-0">&rarr;</span>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
