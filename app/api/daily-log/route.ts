// app/api/daily-log/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import DailyLog from "@/app/models/DailyLog";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { childId, date, mood, sleepHours, notes } = body;

    if (!childId) {
      return NextResponse.json({ success: false, message: "childId required" }, { status: 400 });
    }
    const log = await DailyLog.create({
      childId,
      date: date || new Date(),
      mood,
      sleepHours,
      notes,
    });

    return NextResponse.json({ success: true, log }, { status: 201 });
  } catch (err: any) {
    console.error("DailyLog POST error:", err);
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const childId = searchParams.get("childId");

    if (!childId) {
      return NextResponse.json({ success: false, message: "childId required" }, { status: 400 });
    }

    const logs = await DailyLog.find({ childId }).sort({ date: -1 }).lean();

    return NextResponse.json({ success: true, logs }, { status: 200 });
  } catch (err: any) {
    console.error("DailyLog GET error:", err);
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 });
  }
}