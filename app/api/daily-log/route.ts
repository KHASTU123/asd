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
