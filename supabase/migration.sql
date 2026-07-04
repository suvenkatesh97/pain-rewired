-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Documents table for RAG
CREATE TABLE IF NOT EXISTS documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  chunk_index INTEGER NOT NULL DEFAULT 0,
  embedding VECTOR(384) NOT NULL
);

-- HNSW index for fast similarity search
CREATE INDEX IF NOT EXISTS documents_embedding_idx ON documents USING hnsw (embedding vector_cosine_ops);

-- RPC function to search documents by embedding
CREATE OR REPLACE FUNCTION search_documents(
  query_embedding VECTOR(384),
  match_count INTEGER DEFAULT 5
)
RETURNS TABLE (
  content TEXT,
  source TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.content,
    d.source,
    1 - (d.embedding <=> query_embedding) AS similarity
  FROM documents d
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
