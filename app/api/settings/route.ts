import { NextResponse } from "next/server"
import { connectDB } from "../../../lib/db"
import User from "../../models/User"

export async function PUT(req: Request) {
  try {
    await connectDB()
    const { userId, name, email } = await req.json()

    const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true })
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating settings" }, { status: 500 })
  }
}
