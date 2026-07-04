import { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HF_API_URL =
  "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";

async function embed(text: string): Promise<number[] | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(HF_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: text }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data[0]) return data[0];
    return null;
  } catch {
    return null;
  }
}

async function searchDocuments(embedding: number[]) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !embedding.length) return [];
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/search_documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      body: JSON.stringify({ query_embedding: embedding, match_count: 5 }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Message required" }), {
        status: 400,
      });
    }

    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY not configured" }),
        { status: 500 }
      );
    }

    let context = "";
    const embedding = await embed(message);
    if (embedding) {
      const docs = await searchDocuments(embedding);
      if (docs.length > 0) {
        context = docs
          .map(
            (d: { content: string; source: string }, i: number) =>
              `[Source ${i + 1}: ${d.source}]\n${d.content}`
          )
          .join("\n\n");
      }
    }

    const systemInstruction = {
      parts: [{
        text: `You are a knowledgeable, compassionate assistant for Pain Rewired, a site about neuroplastic pain. Answer questions based on the provided context. Be concise, helpful, and use markdown formatting for clarity (headers, lists, bold). If the context doesn't contain the answer, say so, then provide your best general knowledge.${
          context ? `\n\nRelevant context from Pain Rewired knowledge base:\n${context}` : ""
        }`
      }]
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
        systemInstruction,
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, err);
      return new Response(
        JSON.stringify({ error: `Gemini API error: ${geminiRes.status}` }),
        { status: 502 }
      );
    }

    // Transform Gemini SSE to OpenAI-compatible SSE format for the client
    const stream = new ReadableStream({
      async start(controller) {
        const reader = geminiRes.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const json = JSON.parse(line.slice(6));
              const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                const openaiChunk = {
                  choices: [{ delta: { content: text } }],
                };
                controller.enqueue(
                  new TextEncoder().encode(`data: ${JSON.stringify(openaiChunk)}\n\n`)
                );
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        }

        // Send done signal
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify({ choices: [{ delta: {}, finish_reason: "stop" }] })}\n\n`)
        );
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
