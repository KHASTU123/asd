// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import User from "../../../models/User" // đường dẫn tới model của bạn
import bcrypt from "bcryptjs"

const MONGODB_URI = process.env.MONGO_URI || ""

let isConnected = false
async function dbConnect() {
  if (isConnected) return
  await mongoose.connect(MONGODB_URI)
  isConnected = true
}

export async function POST(req: NextRequest) {
  await dbConnect()
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    // Kiểm tra user đã tồn tại chưa
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "Email đã tồn tại" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({ name, email, password: hashedPassword })

    return NextResponse.json({ user: { id: newUser._id, name: newUser.name, email: newUser.email } }, { status: 201 })
  } catch (err) {
    console.error("❌ Lỗi server:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
