// app/api/daily-log/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import DailyLog from "@/app/models/DailyLog";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { childId, date, mood, sleepHours, meals, communication, activities, therapyNotes, behaviorNotes } = body;
    if (!childId) return NextResponse.json({ success: false, message: "childId required" }, { status: 400 });

    const log = await DailyLog.create({ childId, date, mood, sleepHours, meals, communication, activities, therapyNotes, behaviorNotes });
    return NextResponse.json({ success: true, log }, { status: 201 });
  } catch (err) {
    console.error("DailyLog POST error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const childId = new URL(req.url).searchParams.get("childId");
    if (!childId) return NextResponse.json({ success: false, message: "childId required" }, { status: 400 });
    const logs = await DailyLog.find({ childId }).sort({ date: -1 }).limit(90);
    return NextResponse.json({ success: true, logs });
  } catch (err) {
    console.error("DailyLog GET error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
