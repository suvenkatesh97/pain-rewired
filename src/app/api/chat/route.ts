import { NextRequest } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HF_API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";

async function embed(text: string): Promise<number[]> {
  const res = await fetch(HF_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: text }),
  });
  const data = await res.json();
  if (Array.isArray(data)) return data;
  return data[0] ?? [];
}

async function searchDocuments(embedding: number[]) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/search_documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      body: JSON.stringify({
        query_embedding: embedding,
        match_count: 5,
      }),
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return new Response(JSON.stringify({ error: "Message required" }), {
      status: 400,
    });
  }

  if (!GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: "GROQ_API_KEY not configured" }), {
      status: 500,
    });
  }

  const embedding = await embed(message);
  const docs = await searchDocuments(embedding);

  const context = docs
    .map((d: { content: string; source: string }, i: number) => `[Source ${i + 1}: ${d.source}]\n${d.content}`)
    .join("\n\n");

  const systemPrompt = `You are a knowledgeable, compassionate assistant for Pain Rewired, a site about neuroplastic pain. Answer questions based on the provided context. If the context doesn't contain the answer, say you don't know rather than guessing. Be concise and helpful.

Context:
${context || "No relevant documents found. Answer based on your general knowledge of neuroplastic pain, central sensitization, and pain neuroscience."}`;

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      stream: true,
    }),
  });

  return new Response(groqRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
