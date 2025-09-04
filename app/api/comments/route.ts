import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Comment from "@/app/models/Comment";
import Post from "@/app/models/Post";
import mongoose from "mongoose";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");
  const limit = Number(searchParams.get("limit") ?? 10);
  const offset = Number(searchParams.get("offset") ?? 0);

  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
    return NextResponse.json({ success: false, message: "Post ID is required" }, { status: 400 });
  }

  const comments = await Comment.find({ post: postId })
    .sort({ createdAt: 1 })
    .skip(offset)
    .limit(limit)
    .populate("author", "fullName avatar")
    .lean();

  return NextResponse.json({ success: true, data: comments });
}

export async function POST(req: NextRequest) {
  const me = await getAuthUser(req);
  if (!me) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { postId, content } = await req.json();

  if (!postId || !content?.trim()) {
    return NextResponse.json({ success: false, message: "postId & content required" }, { status: 400 });
  }
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return NextResponse.json({ success: false, message: "Invalid postId" }, { status: 400 });
  }

  const post = await Post.findById(postId);
  if (!post) return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });

  const comment = await Comment.create({
    post: postId,
    author: me.id,
    content,
  });

  await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

  const populated = await Comment.findById(comment._id)
    .populate("author", "fullName avatar")
    .lean();

  return NextResponse.json({ success: true, data: populated }, { status: 201 });
}
