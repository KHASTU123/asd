import { NextRequest, NextResponse } from "next/server"
import { Resource } from "../../models/resource"
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGO_URI || ""

let isConnected = false
async function dbConnect() {
  if (isConnected) return
  await mongoose.connect(MONGODB_URI)
  isConnected = true
}

// GET /api/resources
export async function GET(req: NextRequest) {
  await dbConnect()
  const resources = await Resource.find({})
  return NextResponse.json(resources)
}

// POST /api/resources
export async function POST(req: NextRequest) {
  await dbConnect()
  try {
    const body = await req.json()
    const { title, description, category } = body

    if (!title || !category) {
      return NextResponse.json({ error: "Thiếu title hoặc category" }, { status: 400 })
    }

    const newResource = await Resource.create({ title, description, category })
    return NextResponse.json(newResource, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Không thể thêm tài nguyên" }, { status: 500 })
  }
}
