import fs from "fs";
import path from "path";

export interface PostMeta {
  title: string;
  date: string;
  tags: string[];
  difficulty: string;
  source?: string;
  authors?: string;
  journal?: string;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

const postsDir = path.join(process.cwd(), "content/posts");

function parseFrontmatter(raw: string): { data: PostMeta; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: { title: "", date: "", tags: [], difficulty: "beginner" }, content: raw };

  const yaml = match[1];
  const content = match[2].trim();

  const data: PostMeta = {
    title: "",
    date: "",
    tags: [],
    difficulty: "beginner",
  };

  const lines = yaml.split("\n");
  let currentKey = "";
  let inArray = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (inArray) {
      if (trimmed.startsWith("- ")) {
        const val = trimmed.slice(2).replace(/^["']|["']$/g, "");
        if (val && val !== "]" && !val.startsWith("]")) {
          (data as unknown as Record<string, string[]>)[currentKey]?.push(val);
        }
      } else {
        inArray = false;
      }
      continue;
    }

    const kv = trimmed.match(/^(\w+):\s*(.*)/);
    if (!kv) continue;

    const key = kv[1];
    let val = kv[2].trim();

    if (val.startsWith("[") && !val.endsWith("]")) {
      currentKey = key;
      (data as unknown as Record<string, string[]>)[key] = [];
      inArray = true;
      const inner = val.slice(1).replace(/^["']|["']$/g, "");
      if (inner) (data as unknown as Record<string, string[]>)[key].push(inner);
      continue;
    }

    if (key === "tags") {
      data.tags = val
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((t) => t.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else if (key === "title") {
      data.title = val.replace(/^["']|["']$/g, "");
    } else if (key === "date") {
      data.date = val.replace(/^["']|["']$/g, "");
    } else if (key === "difficulty") {
      data.difficulty = val.replace(/^["']|["']$/g, "");
    } else if (key === "source") {
      data.source = val.replace(/^["']|["']$/g, "");
    } else if (key === "authors") {
      data.authors = val.replace(/^["']|["']$/g, "");
    } else if (key === "journal") {
      data.journal = val.replace(/^["']|["']$/g, "");
    }
  }

  return { data, content };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data, content } = parseFrontmatter(raw);
    return { slug: file.replace(".md", ""), meta: data, content };
  });

  return posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);
  return { slug, meta: data, content };
}
