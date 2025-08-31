// app/api/assessments/route.ts
import { NextResponse } from "next/server"
import dbConnect from "../../../lib/mongodb"
import Assessment from "../../models/assessment"

export async function GET() {
  try {
    await dbConnect;
    const assessments = await Assessment.find({}).sort({ timestamp: -1 })

    return NextResponse.json({ success: true, data: assessments })
  } catch (err) {
    console.error("Error fetching assessments:", err)
    return NextResponse.json({ success: false, error: "Failed to fetch assessments" }, { status: 500 })
  }
}
