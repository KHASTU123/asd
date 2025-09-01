// app/api/child/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Child from "@/app/models/child";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = new URL(req.url).searchParams.get("userId");
    if (!userId) return NextResponse.json({ success: false, message: "userId required" }, { status: 400 });
    const children = await Child.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, children });
  } catch (err) {
    console.error("Child GET error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
