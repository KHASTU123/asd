import { NextResponse } from "next/server"
import { connectDB } from "../../../lib/db"
import Analysis from "../../models/Analysis"

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    const analysis = new Analysis({
      userId: body.userId,
      answers: body.answers,
      score: body.score,
    })
    await analysis.save()

    return NextResponse.json({ success: true, data: analysis }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error saving analysis" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const analyses = await Analysis.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: analyses })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching analyses" }, { status: 500 })
  }
}
