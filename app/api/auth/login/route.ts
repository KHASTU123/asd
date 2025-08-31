import { NextResponse } from "next/server"
import { connectDB } from "../../../../lib/db"
import User from "../../../models/User"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    await connectDB()
    const { email, password } = await req.json()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({ success: true, message: "Login successful", user })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error logging in" }, { status: 500 })
  }
}
