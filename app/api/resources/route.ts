// app/api/resources/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Resource from "@/app/models/Resource";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const cat = new URL(req.url).searchParams.get("category") || undefined;
    const q = cat ? { category: cat } : {};
    const items = await Resource.find(q).sort({ isFeatured: -1, publishedAt: -1 }).limit(200);
    return NextResponse.json({ success: true, items });
  } catch (err) {
    console.error("Resources GET error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
