import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

const uri = process.env.MONGO_URI as string
let client: MongoClient

async function getClient() {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client
}

// GET: lấy danh sách bài viết
export async function GET() {
  const client = await getClient()
  const posts = await client.db("community").collection("posts")
    .find().sort({ createdAt: -1 }).toArray()
  return NextResponse.json(posts)
}

// POST: thêm bài viết
export async function POST(req: Request) {
  const body = await req.json()
  const client = await getClient()
  const posts = client.db("community").collection("posts")
  const newPost = {
    title: body.title,
    content: body.content,
    author: body.author || "Ẩn danh",
    createdAt: new Date()
  }
  const result = await posts.insertOne(newPost)
  return NextResponse.json({ _id: result.insertedId, ...newPost })
}
