// lib/embed-cohere.ts
import { CohereClient } from "cohere";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

export async function embedText(text: string): Promise<number[]> {
  const resp = await cohere.embed({
    model: "embed-multilingual-v3.0",
    texts: [text],
  });
  return resp.embeddings[0]; // 1024 dimensions
}
