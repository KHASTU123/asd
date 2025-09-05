// lib/ingest.ts
import { Pinecone } from "@pinecone-database/pinecone";
import { CohereClient } from "cohere-ai";

const PINECONE_INDEX = process.env.PINECONE_INDEX!;
const PINECONE_KEY = process.env.PINECONE_API_KEY!;
const COHERE_KEY = process.env.COHERE_API_KEY!;

const pinecone = new Pinecone({ apiKey: PINECONE_KEY });
const cohere = new CohereClient({ token: COHERE_KEY });

// -----------------------------
// 1) Hàm chunk text
// -----------------------------
function chunkText(text: string, maxLen = 800) {
  const parts = text.split(/\n{2,}/).flatMap((p) => p.split(/\n/));
  const chunks: string[] = [];
  let cur = "";
  for (const p of parts) {
    if ((cur + "\n" + p).length > maxLen) {
      if (cur) {
        chunks.push(cur.trim());
        cur = p;
      } else {
        chunks.push(p);
        cur = "";
      }
    } else {
      cur = cur ? `${cur}\n${p}` : p;
    }
  }
  if (cur) chunks.push(cur.trim());
  return chunks;
}

// -----------------------------
// 2) Hàm embed text (Cohere)
// -----------------------------
async function embedText(text: string) {
  const resp = await cohere.embed({
    model: "embed-multilingual-v3.0",
    texts: [text],
    input_type: "search_document",
  });
  return resp.embeddings[0];
}

// -----------------------------
// 3) Hàm ingest chung
// -----------------------------
export async function ingestDoc({
  id,
  text,
  metadata,
}: {
  id: string;
  text: string;
  metadata: Record<string, any>;
}) {
  const index = pinecone.index(PINECONE_INDEX);

  const chunks = chunkText(text, 800);
  const vectors = [];

  for (let i = 0; i < chunks.length; i++) {
    const emb = await embedText(chunks[i]);
    vectors.push({
      id: `${id}_chunk_${i}`,
      values: emb,
      metadata: { ...metadata, chunkIndex: i, text: chunks[i] },
    });
  }

  if (vectors.length) {
    await index.upsert(vectors);
  }

  return { success: true, vectors: vectors.length };
}

// -----------------------------
// 4) ingestDailyLog
// -----------------------------
export async function ingestDailyLog(
  d: any,
  userId?: string,
  childId?: string
) {
  const metadata: Record<string, any> = {
    type: "dailyLog",
    docId: d._id.toString(),
  };

  if (userId) metadata.userId = userId;
  if (d.childId || childId) metadata.childId = d.childId ?? childId;

  return ingestDoc({
    id: `${d._id.toString()}_dailyLog`,
    text: `Date: ${d.date}\nsleepHours: ${d.sleepHours}\nmood: ${d.mood}\nnotes: ${d.notes}`,
    metadata,
  });
}

// -----------------------------
// 5) ingestPost
// -----------------------------
export async function ingestPost(post: any, userId?: string) {
  const metadata: Record<string, any> = {
    type: "post",
    docId: post._id.toString(),
  };
  if (userId) metadata.userId = userId;

  return ingestDoc({
    id: `${post._id.toString()}_post`,
    text: `Title: ${post.title}\nContent: ${post.content}`,
    metadata,
  });
}

// -----------------------------
// 6) ingestResource
// -----------------------------
export async function ingestResource(resource: any) {
  const metadata: Record<string, any> = {
    type: "resource",
    docId: resource._id.toString(),
  };

  return ingestDoc({
    id: `${resource._id.toString()}_resource`,
    text: `Title: ${resource.title}\nDescription: ${resource.description}\nCategory: ${resource.category}`,
    metadata,
  });
}

// -----------------------------
// 7) ingestProfile
// -----------------------------
export async function ingestProfile(user: any) {
  const metadata: Record<string, any> = {
    type: "profile",
    docId: user._id.toString(),
  };

  return ingestDoc({
    id: `${user._id.toString()}_profile`,
    text: `FullName: ${user.fullName}\nEmail: ${user.email}`,
    metadata,
  });
}
