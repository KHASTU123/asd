import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Comment from "@/app/models/Comment";
import Post from "@/app/models/Post";
import { verifyToken } from "@/lib/auth";

const createCommentSchema = z.object({
  postId: z.string(),
  content: z.string().min(1),
});

// ================== GET ==================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const limit = Number(searchParams.get("limit") ?? 10);
    const offset = Number(searchParams.get("offset") ?? 0);

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: 1 })
      .skip(offset)
      .limit(limit)
      .populate("author", "fullName avatar")
      .lean();

    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error("❌ Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// ================== POST ==================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Lấy token từ header
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { postId, content } = createCommentSchema.parse(body);

    // Check post tồn tại
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Tạo comment
    const comment = await Comment.create({
      post: postId,
      author: payload.userId, // ✅ lấy userId từ token
      content,
    });

    // Cập nhật số comment
    await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

    const populatedComment = await Comment.findById(comment._id)
      .populate("author", "fullName avatar")
      .lean();

    return NextResponse.json({ success: true, data: populatedComment }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    console.error("❌ Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
