"""
Take papers/blogs from fetch.py and generate simplified summaries using Gemini.
Outputs markdown files to src/content/posts/.
"""

import json
import os
import re
import sys
from datetime import date

from google import genai

POSTS_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content", "posts")
PROMPT_FILE = os.path.join(os.path.dirname(__file__), "prompts", "summarize.txt")
BLOG_PROMPT_FILE = os.path.join(os.path.dirname(__file__), "prompts", "blog_summarize.txt")

MODEL = "gemini-2.0-flash"


def slugify(title):
    s = title.lower().strip()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"[\s_]+", "-", s)
    s = re.sub(r"-+", "-", s)
    return s[:80].rstrip("-")


def load_prompt(path):
    with open(path) as f:
        return f.read()


def summarize(item, client, prompt_path):
    prompt = load_prompt(prompt_path)
    content = item.get("abstract") or item.get("summary") or "No content available."
    if len(content) > 8000:
        content = content[:8000] + "..."

    full_prompt = (
        f"{prompt}\n\n---\n"
        f"Title: {item['title']}\n"
        f"Source: {item.get('source_name', '')}\n"
        f"Authors: {item.get('authors', '')}\n"
        f"Date: {item.get('pubdate', '')}\n\n"
        f"Content:\n{content}"
    )

    try:
        resp = client.models.generate_content(model=MODEL, contents=full_prompt)
        return resp.text
    except Exception as e:
        print(f"  Error summarizing {item.get('pmid') or item.get('url')}: {e}", file=sys.stderr)
        return None


def make_markdown(item, summary, source_type="pubmed"):
    title = item["title"]
    pubdate = item.get("pubdate", "")[:10]
    source = item.get("url", "")
    authors = item.get("authors", "") or item.get("author", "")
    journal = item.get("source_name", "")
    tags = "pubmed" if source_type == "pubmed" else "blog"
    if source_type == "blog":
        tags = "blog, opinion"

    esc = lambda s: s.replace('"', "'").replace("\n", " ") if s else ""

    frontmatter = f"""---
title: "{esc(title)}"
date: "{pubdate}"
tags: [{tags}]
difficulty: "beginner"
source: "{esc(source)}"
authors: "{esc(authors)}"
journal: "{esc(journal)}"
---

{summary}
"""
    return frontmatter


def main():
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set.", file=sys.stderr)
        sys.exit(1)

    client = genai.Client(api_key=api_key)

    raw = sys.stdin.read()
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        print("Error: Invalid JSON from stdin.", file=sys.stderr)
        sys.exit(1)

    papers = data.get("papers", [])
    blogs = data.get("blogs", [])

    if not papers and not blogs:
        print("No new items to summarize.")
        return

    os.makedirs(POSTS_DIR, exist_ok=True)

    for item in papers + blogs:
        title = item["title"]
        source_type = item.get("source_type", "pubmed")
        prompt_path = BLOG_PROMPT_FILE if source_type == "blog" else PROMPT_FILE
        print(f"Summarizing {source_type}: {title[:60]}...", file=sys.stderr)

        summary = summarize(item, client, prompt_path)
        if not summary:
            continue

        md = make_markdown(item, summary, source_type)
        slug = slugify(title)
        today = date.today().isoformat()
        fname = f"{today}-{slug}.md"
        fpath = os.path.join(POSTS_DIR, fname)
        counter = 1
        while os.path.exists(fpath):
            fname = f"{today}-{slug}-{counter}.md"
            fpath = os.path.join(POSTS_DIR, fname)
            counter += 1
        with open(fpath, "w") as f:
            f.write(md)
        print(f"  -> {fpath}", file=sys.stderr)


if __name__ == "__main__":
    main()
