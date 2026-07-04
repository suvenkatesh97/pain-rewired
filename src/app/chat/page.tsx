"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "What is somatic tracking?",
  "How does PRT work?",
  "What is central sensitization?",
  "Can the brain cause real pain?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const append = (role: "user" | "assistant", content: string) => {
    setMessages((prev) => [...prev, { role, content }]);
  };

  const updateLast = (content: string) => {
    setMessages((prev) => {
      const copy = [...prev];
      copy[copy.length - 1] = { ...copy[copy.length - 1], content };
      return copy;
    });
  };

  const send = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;

    setInput("");
    setLoading(true);
    append("user", msg.trim());
    append("assistant", "");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg.trim() }),
      });

      if (!res.ok || !res.body) {
        updateLast("Sorry, something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const json = JSON.parse(line.slice(6));
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              setMessages((prev) => {
                const copy = [...prev];
                const last = copy[copy.length - 1];
                copy[copy.length - 1] = { ...last, content: last.content + delta };
                return copy;
              });
            }
            if (json.choices?.[0]?.finish_reason === "stop") {
              setLoading(false);
            }
          } catch {}
        }
      }
    } catch {
      updateLast("Sorry, an error occurred. Please try again.");
    }

    setLoading(false);
  };

  const showTyping = loading && messages[messages.length - 1]?.content === "";

  return (
    <div className="mx-auto max-w-[800px] px-6 lg:px-8 py-12 flex flex-col min-h-[calc(100vh-200px)]">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Ask Pain Rewired
        </h1>
        <p className="text-text-secondary dark:text-zinc-400 max-w-[480px] mx-auto leading-relaxed text-[15px]">
          Ask questions about neuroplastic pain, central sensitization, PRT,
          and related topics. Powered by AI trained on research and books.
        </p>
      </div>

      <div className="flex-1 mb-6">
        {messages.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-accent-light dark:bg-accent/20 text-accent flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <p className="font-semibold text-lg mb-3">Ask anything about neuroplastic pain</p>
            <p className="text-text-secondary dark:text-zinc-400 text-sm mb-8">
              Trained on books by Sarno, Gordon, and Schubiner
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-border-light dark:border-zinc-700 text-sm text-text-secondary dark:text-zinc-400 hover:border-accent dark:hover:border-accent hover:text-accent transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-accent-light dark:bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed ${
                    m.role === "user"
                      ? "bg-accent text-white"
                      : "bg-white dark:bg-zinc-900 border border-border-light dark:border-zinc-800 chat-markdown"
                  }`}
                >
                  {m.role === "assistant" ? (
                    m.content ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    ) : showTyping ? (
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
                      </div>
                    ) : null
                  ) : (
                    <p className="m-0 whitespace-pre-wrap">{m.content}</p>
                  )}
                </div>
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                    U
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="sticky bottom-0 flex gap-3 bg-surface dark:bg-surface-dark pb-4"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about neuroplastic pain..."
          disabled={loading}
          className="flex-1 px-5 py-3.5 rounded-xl border-2 border-border-light dark:border-zinc-700 bg-white dark:bg-zinc-900 text-text-primary dark:text-zinc-100 placeholder:text-text-tertiary text-[15px] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all shadow-lg shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed text-[15px]"
        >
          {loading ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
          )}
        </button>
      </form>
    </div>
  );
}
