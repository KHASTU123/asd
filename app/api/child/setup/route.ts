// app/api/child/setup/route.ts
import { NextResponse } from "next/server"
import {connectDB} from "@/lib/mongodb"
import Child from "../../../models/child"

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json()
    const { userId, name, age, gender } = body

    if (!userId || !name || !age || !gender) {
      return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 })
    }

    const newChild = await Child.create({ userId, name, age, gender })

    return NextResponse.json({ message: "Lưu thông tin trẻ thành công", child: newChild })
  } catch (error) {
    console.error("❌ Lỗi khi lưu child:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
