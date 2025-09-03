import { NextResponse } from "next/server";
import {connectDB} from "../../../../lib/db";
import DailyLog from "../../../models/DailyLog";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const childId = searchParams.get("childId");

  if (!childId) {
    return NextResponse.json({ message: "childId is required" }, { status: 400 });
  }

  try {
    const logs = await DailyLog.find({ childId }).lean();

    // Thống kê mood
    const moodCounts: Record<string, number> = {};
    logs.forEach(log => {
      moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1;
    });

    // Tính trung bình giấc ngủ
    const avgSleep = logs.length > 0
      ? logs.reduce((acc, l) => acc + (l.sleepHours || 0), 0) / logs.length
      : 0;

    return NextResponse.json({
      moods: moodCounts,
      sleep: avgSleep,
      activities: logs.map(l => l.notes || "").filter(Boolean),
    });
  } catch (err: any) {
    console.error("Summary API error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
