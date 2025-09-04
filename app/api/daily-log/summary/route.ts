import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import DailyLog from "@/app/models/DailyLog";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const childId = searchParams.get("childId");
    if (!childId) {
      return NextResponse.json({ success: false, message: "childId required" }, { status: 400 });
    }

    const logs = await DailyLog.find({ childId }).lean();

    // Đếm mood
    const moodCounts: Record<string, number> = {};
    logs.forEach((l) => {
      if (l.mood) {
        moodCounts[l.mood] = (moodCounts[l.mood] || 0) + 1;
      }
    });

    // Thu thập hoạt động (notes)
    const activities = logs.map((l) => l.notes).filter(Boolean);

    return NextResponse.json({
      success: true,
      moods: moodCounts,
      activities,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
