#!/usr/bin/env python3
"""Enhance blog posts with AI-generated summaries using Groq API (free)."""

import os
import re
import time
import requests

GROQ_KEY = os.environ.get("GROQ_API_KEY", "")

def parse_post(filepath):
    with open(filepath, "r") as f:
        raw = f.read()
    match = re.match(r"^---\n(.*?)\n---\n(.*)", raw, re.DOTALL)
    if not match:
        return None, None, raw
    return match.group(1), match.group(2).strip(), raw

def generate_summary(title, existing_content):
    prompt = f"""You are a medical writer for "Pain Rewired", a site that translates neuroplastic pain research into plain language. The following text is a brief RSS excerpt of a blog post by Dr. Howard Schubiner from Psychology Today's "Unlearn Your Pain" column. 

Blog post title: {title}

Existing content:
{existing_content}

Write a 250-350 word plain-language summary of this blog post. Structure it as:
1. A paragraph explaining what this post is about and why it matters
2. 3-4 bullet points of the key insights (use markdown hyphen format)
3. One closing paragraph with a practical takeaway for someone with chronic pain

Use markdown formatting. Make it educational and accessible, like you're explaining to a patient. Do NOT use clichés like "in conclusion" or "in summary". Skip any disclaimer."""

    for attempt in range(3):
        try:
            res = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={"Authorization": f"Bearer {GROQ_KEY}", "Content-Type": "application/json"},
                json={
                    "model": "llama-3.3-70b-versatile",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.7,
                    "max_tokens": 800,
                },
                timeout=60,
            )
            if res.status_code == 200:
                return res.json()["choices"][0]["message"]["content"]
            print(f"  Attempt {attempt+1}: HTTP {res.status_code} - {res.text[:200]}")
        except Exception as e:
            print(f"  Attempt {attempt+1}: {e}")
        time.sleep(2)
    return None

def main():
    posts_dir = "content/posts"
    files = sorted([f for f in os.listdir(posts_dir) if f.endswith(".md")])

    for fname in files:
        filepath = os.path.join(posts_dir, fname)
        frontmatter, content, raw = parse_post(filepath)

        if not frontmatter:
            print(f"SKIP {fname}: no frontmatter")
            continue

        # Skip if already enhanced (more than 30 lines)
        if raw.count("\n") > 30:
            print(f"SKIP {fname}: already enhanced")
            continue

        # Extract title from frontmatter
        title_match = re.search(r'title:\s*"([^"]+)"', frontmatter)
        title = title_match.group(1) if title_match else fname

        print(f"Generating summary for: {title}")
        summary = generate_summary(title, content)

        if summary:
            new_content = f"---\n{frontmatter}\n---\n\n{summary}\n\n*This post originally appeared on Unlearn Your Pain by Dr. Howard Schubiner.*"
            with open(filepath, "w") as f:
                f.write(new_content)
            print(f"  Saved ({new_content.count(chr(10))} lines)")
        else:
            print(f"  FAILED")

        time.sleep(1)

    print("\nDone!")

if __name__ == "__main__":
    main()
