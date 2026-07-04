"use client";

import { useState } from "react";

interface Term {
  word: string;
  definition: string;
}

export function GlossarySearch({ terms }: { terms: Term[] }) {
  const [query, setQuery] = useState("");

  const filtered = terms.filter(
    (t) =>
      t.word.toLowerCase().includes(query.toLowerCase()) ||
      t.definition.toLowerCase().includes(query.toLowerCase())
  );

  const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search glossary..."
          className="w-full max-w-md px-4 py-2.5 rounded-lg border border-border dark:border-zinc-700 bg-white dark:bg-zinc-900 text-text dark:text-zinc-100 placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
        />
      </div>

      {!query && (
        <div className="flex flex-wrap gap-1.5 mb-8">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => {
                const el = document.getElementById(`glossary-${letter}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-8 h-8 rounded-md text-xs font-semibold bg-teal-light dark:bg-teal/20 text-teal dark:text-teal-light hover:bg-teal hover:text-white dark:hover:bg-teal transition-colors"
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-text-muted">No terms found.</p>
      ) : (
        <div className="space-y-6">
          {filtered.map((term, i) => (
            <div key={i} id={`glossary-${term.word[0].toUpperCase()}`}>
              <dt className="font-semibold text-teal dark:text-teal-light text-lg">
                {term.word}
              </dt>
              <dd className="mt-1 text-text-muted dark:text-zinc-400 leading-relaxed">
                {term.definition}
              </dd>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
