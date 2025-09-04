import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/app/models/Post";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("author", "fullName avatar")
    .populate({ path: "sharedFrom", select: "author content media createdAt", populate: { path: "author", select: "fullName avatar" } })
    .lean();
  return NextResponse.json({ success: true, data: posts });
}

export async function POST(req: NextRequest) {
  const me = await getAuthUser(req);
  if (!me) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { content, media } = await req.json();

  const post = await Post.create({
    author: me.id,
    content: content || "",
    media: Array.isArray(media) ? media : [],
  });

  const populated = await Post.findById(post._id)
    .populate("author", "fullName avatar")
    .lean();

  return NextResponse.json({ success: true, data: populated }, { status: 201 });
}
