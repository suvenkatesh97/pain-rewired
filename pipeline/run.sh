#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$DIR")"

echo "=== Pain Rewired Pipeline ==="
echo ""

# 1. Fetch new papers from PubMed
echo "[1/3] Fetching papers from PubMed..."
FETCH_OUTPUT=$(python3 "$DIR/fetch.py")
echo "$FETCH_OUTPUT"

# Count papers
PAPER_COUNT=$(echo "$FETCH_OUTPUT" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['count'])")
echo "  Found $PAPER_COUNT new paper(s)."

if [ "$PAPER_COUNT" -eq 0 ]; then
    echo "No new papers. Exiting."
    exit 0
fi

# 2. Summarize using Gemini
echo ""
echo "[2/3] Summarizing papers with Gemini..."
echo "$FETCH_OUTPUT" | python3 "$DIR/summarize.py"

# 3. Done
echo ""
echo "[3/3] Done. New posts written to src/content/posts/"
echo "Run 'git add src/content/posts/ && git commit -m \"add new digest posts\" && git push' to deploy."
