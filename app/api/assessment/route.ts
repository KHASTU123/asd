// app/api/assessment/route.ts
import { NextResponse } from "next/server"
import dbConnect from "../../../lib/mongodb"
import Assessment from "../../models/assessment"

export async function POST(req: Request) {
  try {
    await dbConnect;
    const body = await req.json()

    const newAssessment = new Assessment(body)
    await newAssessment.save()

    return NextResponse.json({ success: true, data: newAssessment }, { status: 201 })
  } catch (err) {
    console.error("Error saving assessment:", err)
    return NextResponse.json({ success: false, error: "Failed to save assessment" }, { status: 500 })
  }
}
