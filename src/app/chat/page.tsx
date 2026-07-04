"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok || !res.body) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: "Sorry, something went wrong. Is the API key configured?",
          };
          return copy;
        });
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        const lines = text.split("\n").filter((l) => l.startsWith("data: "));
        for (const line of lines) {
          try {
            const json = JSON.parse(line.slice(6));
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = {
                  role: "assistant",
                  content: copy[copy.length - 1].content + delta,
                };
                return copy;
              });
            }
          } catch {
            // skip parse errors
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Sorry, an error occurred.",
        };
        return copy;
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-[720px] mx-auto px-6 py-16 min-h-[70vh] flex flex-col">
      <h1 className="text-4xl font-extrabold mb-2">Ask Pain Rewired</h1>
      <p className="text-text-muted mb-6">
        Ask questions about neuroplastic pain, central sensitization, PRT, and
        related topics. Powered by AI with knowledge from curated research and books.
      </p>

      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl border border-border dark:border-zinc-800 p-6 mb-4 min-h-[300px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-text-muted py-10">
            <p className="text-lg mb-2">Ask anything about neuroplastic pain</p>
            <p className="text-sm">
              Try: &ldquo;What is somatic tracking?&rdquo; &ldquo;How does PRT
              work?&rdquo; &ldquo;What's the evidence for neuroplastic
              pain?&rdquo;
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-teal text-white"
                  : "bg-border-light dark:bg-zinc-800 text-text dark:text-zinc-100"
              }`}
            >
              {m.content || (loading && i === messages.length - 1 ? "..." : "")}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about neuroplastic pain..."
          disabled={loading}
          className="flex-1 px-4 py-2.5 rounded-lg border border-border dark:border-zinc-700 bg-white dark:bg-zinc-900 text-text dark:text-zinc-100 placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
