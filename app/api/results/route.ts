import { NextResponse } from "next/server"
import { connectDB } from "../../../lib/db"
import Analysis from "../../models/Analysis"

export async function GET(req: Request) {
  try {
    await connectDB()
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, message: "Missing userId" }, { status: 400 })
    }

    const results = await Analysis.find({ userId }).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: results })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching results" }, { status: 500 })
  }
}
