#!/usr/bin/env python3
"""
Embedding pipeline: chunks books and site content, embeds locally with MiniLM-L6,
and stores in Supabase pgvector table.

Usage:
  python3 scripts/embed.py

Requires:
  pip install requests numpy python-dotenv sentence-transformers torch
  SUPABASE_URL and SUPABASE_SERVICE_KEY (service_role key) in .env
"""

import os
import sys
import json
import time
import requests
import numpy as np
from pathlib import Path
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

CHUNK_SIZE = 500
CHUNK_OVERLAP = 100

print("Loading embedding model...")
MODEL = SentenceTransformer("all-MiniLM-L6-v2")
print("Model loaded.")

def chunk_text(text: str, source: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP):
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = " ".join(words[i : i + chunk_size])
        chunks.append({"content": chunk, "source": source, "chunk_index": len(chunks)})
        i += chunk_size - overlap
    return chunks

def embed(texts: list[str]) -> list[list[float]]:
    embeddings = MODEL.encode(texts, normalize_embeddings=True)
    return embeddings.tolist() if isinstance(embeddings, np.ndarray) else embeddings

def clear_documents():
    if not SUPABASE_KEY:
        raise RuntimeError("SUPABASE_SERVICE_KEY not set")
    res = requests.delete(
        f"{SUPABASE_URL}/rest/v1/documents",
        headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}", "Prefer": "return=minimal"},
        params={"id": "gt.0"},
    )
    res.raise_for_status()
    print("Cleared existing documents")

def insert_documents(docs: list[dict]):
    if not SUPABASE_KEY:
        raise RuntimeError("SUPABASE_SERVICE_KEY not set")
    payload = json.dumps(docs)
    res = requests.post(
        f"{SUPABASE_URL}/rest/v1/documents",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
        data=payload,
    )
    res.raise_for_status()

def main():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env")
        sys.exit(1)

    all_chunks = []

    books_dir = Path("books")
    if books_dir.exists():
        for txt_file in sorted(books_dir.glob("*.txt")):
            print(f"Processing: {txt_file.name}")
            text = txt_file.read_text(encoding="utf-8")
            chunks = chunk_text(text, source=txt_file.stem)
            all_chunks.extend(chunks)
            print(f"  -> {len(chunks)} chunks")

    content_dir = Path("content/posts")
    if content_dir.exists():
        for md_file in sorted(content_dir.glob("*.md")):
            print(f"Processing: {md_file.name}")
            text = md_file.read_text(encoding="utf-8")
            chunks = chunk_text(text, source=f"blog:{md_file.stem}")
            all_chunks.extend(chunks)
            print(f"  -> {len(chunks)} chunks")

    print(f"\nTotal chunks: {len(all_chunks)}")

    if not all_chunks:
        print("No content to embed.")
        return

    print("Embedding chunks...")
    embeddings = []
    batch_size = 32
    for i in range(0, len(all_chunks), batch_size):
        batch = all_chunks[i : i + batch_size]
        texts = [c["content"] for c in batch]
        batch_embeddings = embed(texts)
        embeddings.extend(batch_embeddings)
        print(f"  {min(i + batch_size, len(all_chunks))}/{len(all_chunks)} embedded")
        if i + batch_size < len(all_chunks):
            time.sleep(0.5)

    print("Clearing existing documents...")
    clear_documents()

    print("Inserting into Supabase...")
    for i, chunk in enumerate(all_chunks):
        chunk["embedding"] = embeddings[i]

    batch_insert_size = 50
    for i in range(0, len(all_chunks), batch_insert_size):
        batch = all_chunks[i : i + batch_insert_size]
        insert_documents(batch)
        print(f"  {min(i + batch_insert_size, len(all_chunks))}/{len(all_chunks)} inserted")

    print("Done!")

if __name__ == "__main__":
    main()
