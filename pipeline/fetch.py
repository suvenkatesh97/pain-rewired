"""
Fetch recent neuroplastic pain papers from PubMed E-utilities.
Outputs new papers to stdout as JSON lines.
"""

import json
import os
import time
import xml.etree.ElementTree as ET
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

SEEN_FILE = os.path.join(os.path.dirname(__file__), "seen.json")
ESUMMARY = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
ESEARCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
EFETCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"

QUERIES = [
    '"neuroplastic pain" AND "treatment"[Title/Abstract]',
    '"nociplastic pain" AND ("mechanism" OR "therapy")[Title/Abstract]',
    '"central sensitization" AND chronic pain[Title/Abstract]',
    '"pain reprocessing therapy"[Title/Abstract]',
    '"pain neuroscience education" AND chronic[Title/Abstract]',
]

DAYS_BACK = 14


def load_seen():
    if os.path.exists(SEEN_FILE):
        with open(SEEN_FILE) as f:
            return json.load(f)
    return {"pmids": []}


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
    params = {
        "db": "pubmed",
        "term": query,
        "retmax": retmax,
        "retmode": "json",
        "sort": "date",
        "datetype": "pdat",
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
        "source": source,
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


def main():
    seen = load_seen()
    seen_set = set(seen["pmids"])
    new_pmids = []

    for query in QUERIES:
        pmids = search_pubmed(query)
        for pmid in pmids:
            if pmid not in seen_set and pmid not in new_pmids:
                new_pmids.append(pmid)

    if not new_pmids:
        print(json.dumps({"papers": [], "count": 0}))
        return

    papers = []
    for pmid in new_pmids:
        summary = fetch_summary(pmid)
        if not summary:
            continue
        abstract = fetch_abstract(pmid)
        summary["abstract"] = abstract
        papers.append(summary)
        seen_set.add(pmid)
        time.sleep(0.4)  # rate limit

    seen["pmids"] = list(seen_set)
    save_seen(seen)

    output = {"papers": papers, "count": len(papers)}
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
