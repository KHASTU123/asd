import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import DailyLog from "@/app/models/DailyLog";

// POST: Lưu dữ liệu nhật ký
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newLog = await DailyLog.create(body);

    return NextResponse.json({ success: true, log: newLog }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/daily-log error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET: Lấy danh sách log theo childId
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const childId = searchParams.get("childId");

    if (!childId) {
      return NextResponse.json(
        { success: false, message: "Thiếu childId" },
        { status: 400 }
      );
    }

    const logs = await DailyLog.find({ childId }).sort({ date: -1 });

    return NextResponse.json({ success: true, logs }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/daily-log error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
