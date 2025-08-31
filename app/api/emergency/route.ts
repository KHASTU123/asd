import { NextResponse } from "next/server"
import mongoose from "mongoose"
import { Emergency } from "../../models/Emergency"

let isConnected = false

async function connectDB() {
  if (isConnected) return
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    isConnected = true
    console.log("✅ MongoDB connected (emergency)")
  } catch (err) {
    console.error("❌ DB connection error:", err)
  }
}

// 📌 GET: Lấy toàn bộ regions
export async function GET() {
  await connectDB()
  try {
    const data = await Emergency.find({})
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch emergency data" }, { status: 500 })
  }
}

// 📌 POST: Thêm mới 1 region (bao gồm provinces/hospitals/hotlines)
export async function POST(req: Request) {
  await connectDB()
  try {
    const body = await req.json()
    const newRegion = new Emergency(body)
    await newRegion.save()
    return NextResponse.json(newRegion, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: "Failed to create emergency entry" }, { status: 500 })
  }
}

// 📌 PATCH: Cập nhật region theo _id
export async function PATCH(req: Request) {
  await connectDB()
  try {
    const body = await req.json()
    const { id, update } = body

    if (!id || !update) {
      return NextResponse.json({ error: "Missing id or update data" }, { status: 400 })
    }

    const updated = await Emergency.findByIdAndUpdate(id, update, { new: true })
    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: "Failed to update emergency entry" }, { status: 500 })
  }
}

// 📌 DELETE: Xóa region theo _id
export async function DELETE(req: Request) {
  await connectDB()
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }

    await Emergency.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete emergency entry" }, { status: 500 })
  }
}
