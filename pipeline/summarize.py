"""
Take papers/blogs from fetch.py and generate simplified summaries.
Blogs with existing summaries use them directly.
Research papers are summarized with Gemini (rate-limited).
"""

import json
import os
import re
import sys
import time
from datetime import date
from email.utils import parsedate_to_datetime

from google import genai

POSTS_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content", "posts")
PROMPT_FILE = os.path.join(os.path.dirname(__file__), "prompts", "summarize.txt")

MODEL = "gemini-2.0-flash"
MAX_PAPERS_PER_RUN = 5
DELAY_BETWEEN = 5


def parse_date(s):
    if not s:
        return date.today().isoformat()
    try:
        dt = parsedate_to_datetime(s)
        return dt.strftime("%Y-%m-%d")
    except Exception:
        return s[:10]


def slugify(title):
    s = title.lower().strip()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"[\s_]+", "-", s)
    s = re.sub(r"-+", "-", s)
    return s[:80].rstrip("-")


def load_prompt(path):
    with open(path) as f:
        return f.read()


def summarize_with_gemini(item, client, prompt_path):
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
        print(f"  Error: {e}", file=sys.stderr)
        return None


def format_blog_directly(item):
    """Format a blog post using its existing summary."""
    summary = item.get("summary", "")
    # Strip HTML
    summary = re.sub(r"<[^>]+>", "", summary)
    author = item.get("authors", "") or item.get("author", "")

    return (
        f"**Key takeaway:**\n\n"
        f"{summary}\n\n"
        f"*This post originally appeared on {item.get('source_name', 'a blog')}"
        f"{f' by {author}' if author else ''}.*"
    )


def make_markdown(item, summary, source_type="pubmed"):
    title = item["title"]
    pubdate = parse_date(item.get("pubdate", ""))
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


def write_post(item, md_content, source_type):
    slug = slugify(item["title"])
    today = date.today().isoformat()
    fname = f"{today}-{slug}.md"
    fpath = os.path.join(POSTS_DIR, fname)
    counter = 1
    while os.path.exists(fpath):
        fname = f"{today}-{slug}-{counter}.md"
        fpath = os.path.join(POSTS_DIR, fname)
        counter += 1
    with open(fpath, "w") as f:
        f.write(md_content)
    print(f"  -> {fpath}", file=sys.stderr)


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

    # Process blog posts — use existing summaries directly
    for item in blogs:
        title = item["title"]
        print(f"Formatting blog: {title[:60]}...", file=sys.stderr)
        summary = format_blog_directly(item)
        md = make_markdown(item, summary, "blog")
        write_post(item, md, "blog")

    # Process research papers — summarize with Gemini (rate-limited)
    for i, item in enumerate(papers[:MAX_PAPERS_PER_RUN]):
        title = item["title"]
        print(f"Summarizing paper ({i+1}/{min(len(papers), MAX_PAPERS_PER_RUN)}): {title[:60]}...", file=sys.stderr)

        summary = summarize_with_gemini(item, client, PROMPT_FILE)
        if not summary:
            continue

        md = make_markdown(item, summary, "pubmed")
        write_post(item, md, "pubmed")

        if i < min(len(papers), MAX_PAPERS_PER_RUN) - 1:
            time.sleep(DELAY_BETWEEN)


if __name__ == "__main__":
    main()
