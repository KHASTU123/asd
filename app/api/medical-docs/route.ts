import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import MedicalDoc from "@/app/models/MedicalDoc";

// ✅ Lấy danh sách tài liệu
export async function GET() {
  await connectDB();
  const docs = await MedicalDoc.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ success: true, data: docs });
}

// ✅ Upload tài liệu (admin)
// ✅ Upload tài liệu (chỉ cần đăng nhập)
export async function POST(req: NextRequest) {
  const me = await getAuthUser(req);
  if (!me) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { title, type, url } = await req.json();

  const doc = await MedicalDoc.create({
    title,
    type,
    url,
    uploadedBy: me.id,
  });

  return NextResponse.json({ success: true, data: doc });
}
