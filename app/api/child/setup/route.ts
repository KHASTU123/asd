// app/api/child/setup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Child from "@/app/models/child";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, name, age, gender, dob, diagnosis, healthNotes, therapy, favoriteActivities } = body;

    if (!userId || !name || !gender) {
      return NextResponse.json({ success: false, message: "Thiếu dữ liệu" }, { status: 400 });
    }

    const child = await Child.create({ userId, name, age, gender, dob, diagnosis, healthNotes, therapy, favoriteActivities });
    return NextResponse.json({ success: true, child }, { status: 201 });
  } catch (err) {
    console.error("Child setup error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
