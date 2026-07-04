"""
Fetch recent neuroplastic pain papers from PubMed and blogs.
Outputs new items to stdout as JSON.
"""

import json
import os
import time
import xml.etree.ElementTree as ET
from datetime import date, timedelta
from urllib.parse import urlencode
from urllib.request import Request, urlopen

import feedparser

SEEN_FILE = os.path.join(os.path.dirname(__file__), "seen.json")
ESUMMARY = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
ESEARCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
EFETCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"

PUBMED_QUERIES = [
    '"neuroplastic pain" AND treatment',
    '"nociplastic pain"',
    '"central sensitization" AND chronic pain',
    '"pain reprocessing therapy"',
    '"pain neuroscience education" AND chronic',
]

BLOG_FEEDS = [
    "https://www.psychologytoday.com/us/blog/unlearn-your-pain/feed",
    # "https://neuroplasticpainguide.org/feed",  # feed returns empty
    "https://painpsychologycenter.com/feed",
]

DAYS_BACK = 90


def load_seen():
    if os.path.exists(SEEN_FILE):
        with open(SEEN_FILE) as f:
            return json.load(f)
    return {"pmids": [], "blog_urls": []}


def save_seen(seen):
    with open(SEEN_FILE, "w") as f:
        json.dump(seen, f, indent=2)


def eutils_get(url, params, retries=3):
    full = url + "?" + urlencode(params)
    for attempt in range(retries):
        try:
            req = Request(full, headers={"User-Agent": "PainRewired/1.0"})
            with urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8")
        except Exception as e:
            if attempt == retries - 1:
                raise
            time.sleep(2 ** attempt)


def search_pubmed(query, retmax=20):
    today = date.today()
    mindate = today - timedelta(days=DAYS_BACK)
    params = {
        "db": "pubmed",
        "term": query,
        "retmax": retmax,
        "retmode": "json",
        "sort": "pub+date",
        "datetype": "pdat",
        "mindate": mindate.isoformat(),
        "maxdate": today.isoformat(),
    }
    data = eutils_get(ESEARCH, params)
    result = json.loads(data)
    return result.get("esearchresult", {}).get("idlist", [])


def fetch_summary(pmid):
    params = {"db": "pubmed", "id": pmid, "retmode": "xml"}
    data = eutils_get(ESUMMARY, params)
    root = ET.fromstring(data)
    doc = root.find(".//DocumentSummary")
    if doc is None:
        return None

    title_el = doc.find("Title")
    source_el = doc.find("Source")
    authors_el = doc.find("AuthorList")
    pubdate_el = doc.find("PubDate")
    doi_el = doc.find(".//Item[@Name='DOI']")
    elocation = doc.find("ELocationID")

    title = title_el.text if title_el is not None else "Untitled"
    source = source_el.text if source_el is not None else ""
    pubdate = pubdate_el.text if pubdate_el is not None else ""

    authors = []
    if authors_el is not None:
        for author in authors_el.findall("Author"):
            name = author.find("Name")
            if name is not None and name.text:
                authors.append(name.text)

    doi = ""
    if doi_el is not None:
        doi = doi_el.text or ""
    if not doi and elocation is not None:
        doi = elocation.text or ""

    return {
        "pmid": pmid,
        "title": title,
        "source_type": "pubmed",
        "source_name": source,
        "pubdate": pubdate,
        "authors": ", ".join(authors[:5]) + (" et al." if len(authors) > 5 else ""),
        "doi": doi,
        "url": f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/",
    }


def fetch_abstract(pmid):
    params = {
        "db": "pubmed",
        "id": pmid,
        "retmode": "xml",
        "rettype": "abstract",
    }
    data = eutils_get(EFETCH, params)
    root = ET.fromstring(data)
    abstract_texts = root.findall(".//AbstractText")
    parts = []
    for at in abstract_texts:
        label = at.get("Label", "")
        text = "".join(at.itertext())
        if label:
            parts.append(f"{label}: {text}")
        else:
            parts.append(text)
    return "\n".join(parts)


def fetch_blogs():
    items = []
    for feed_url in BLOG_FEEDS:
        try:
            parsed = feedparser.parse(feed_url)
            blog_name = parsed.feed.get("title", feed_url)
            for entry in parsed.entries:
                url = entry.get("link", "")
                if not url:
                    continue
                items.append({
                    "source_type": "blog",
                    "source_name": blog_name,
                    "title": entry.get("title", "Untitled"),
                    "url": url,
                    "pubdate": entry.get("published", ""),
                    "summary": entry.get("summary", ""),
                    "authors": entry.get("author", ""),
                })
        except Exception as e:
            print(f"  Error fetching blog {feed_url}: {e}", file=__import__("sys").stderr)
    return items


def main():
    seen = load_seen()
    seen_pmids = set(seen.get("pmids", []))
    seen_urls = set(seen.get("blog_urls", []))
    new_papers = []
    new_blogs = []

    # PubMed
    for query in PUBMED_QUERIES:
        pmids = search_pubmed(query)
        for pmid in pmids:
            if pmid not in seen_pmids:
                if pmid not in [p.get("pmid") for p in new_papers]:
                    summary = fetch_summary(pmid)
                    if summary:
                        abstract = fetch_abstract(pmid)
                        summary["abstract"] = abstract
                        new_papers.append(summary)
                        seen_pmids.add(pmid)
                        time.sleep(0.4)

    # Blogs
    blog_items = fetch_blogs()
    for item in blog_items:
        if item["url"] not in seen_urls:
            new_blogs.append(item)
            seen_urls.add(item["url"])

    # Save seen state
    seen["pmids"] = list(seen_pmids)
    seen["blog_urls"] = list(seen_urls)
    save_seen(seen)

    output = {
        "papers": new_papers,
        "blogs": new_blogs,
        "count": len(new_papers) + len(new_blogs),
        "pubmed_count": len(new_papers),
        "blog_count": len(new_blogs),
    }
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
