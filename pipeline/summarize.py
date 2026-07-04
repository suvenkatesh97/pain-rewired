"""
Take papers from fetch.py and generate simplified summaries using Google Gemini.
Outputs markdown files to src/content/posts/.
"""

import json
import os
import re
import sys
from datetime import date

import google.generativeai as genai

POSTS_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content", "posts")
PROMPT_FILE = os.path.join(os.path.dirname(__file__), "prompts", "summarize.txt")

genai.configure(api_key=os.environ.get("GEMINI_API_KEY", ""))


def slugify(title):
    s = title.lower().strip()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"[\s_]+", "-", s)
    s = re.sub(r"-+", "-", s)
    return s[:80].rstrip("-")


def load_prompt():
    with open(PROMPT_FILE) as f:
        return f.read()


def summarize_paper(paper, model):
    prompt = load_prompt()
    abstract = paper.get("abstract", "No abstract available.")
    # Truncate abstract if too long
    if len(abstract) > 8000:
        abstract = abstract[:8000] + "..."
    full_prompt = (
        f"{prompt}\n\n---\n"
        f"Title: {paper['title']}\n"
        f"Authors: {paper.get('authors', '')}\n"
        f"Journal: {paper.get('source', '')}\n"
        f"Date: {paper.get('pubdate', '')}\n\n"
        f"Abstract:\n{abstract}"
    )

    try:
        resp = model.generate_content(full_prompt)
        return resp.text
    except Exception as e:
        print(f"  Error summarizing {paper['pmid']}: {e}", file=sys.stderr)
        return None


def make_markdown(paper, summary):
    title = paper["title"]
    pubdate = paper.get("pubdate", "")[:10]
    source = paper.get("url", "")
    authors = paper.get("authors", "")
    journal = paper.get("source", "")

    esc = lambda s: s.replace('"', "'")
    frontmatter = f"""---
title: "{esc(title)}"
date: "{pubdate}"
tags: []
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

    model = genai.GenerativeModel("models/gemini-1.5-flash")

    raw = sys.stdin.read()
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        print("Error: Invalid JSON from stdin.", file=sys.stderr)
        sys.exit(1)

    papers = data.get("papers", [])
    if not papers:
        print("No new papers to summarize.")
        return

    os.makedirs(POSTS_DIR, exist_ok=True)

    for paper in papers:
        pmid = paper["pmid"]
        title = paper["title"]
        print(f"Summarizing {pmid}: {title[:60]}...", file=sys.stderr)

        summary = summarize_paper(paper, model)
        if not summary:
            continue

        md = make_markdown(paper, summary)
        slug = slugify(title)
        fname = f"{date.today().isoformat()}-{slug}.md"
        fpath = os.path.join(POSTS_DIR, fname)

        # Avoid overwriting existing files
        counter = 1
        while os.path.exists(fpath):
            base = f"{date.today().isoformat()}-{slug}"
            fname = f"{base}-{counter}.md"
            fpath = os.path.join(POSTS_DIR, fname)
            counter += 1

        with open(fpath, "w") as f:
            f.write(md)

        print(f"  -> {fpath}", file=sys.stderr)


if __name__ == "__main__":
    main()
