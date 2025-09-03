import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/app/models/Post";
import { verifyToken } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // ✅ Tìm post
    const post = await Post.findById(params.id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const userId = payload.id;
    const liked = post.likes.some((id: any) => id.toString() === userId);

    if (liked) {
      post.likes.pull(userId);
      post.likesCount = Math.max(0, post.likesCount - 1);
    } else {
      post.likes.push(userId);
      post.likesCount += 1;
    }

    await post.save();

    return NextResponse.json({
      liked: !liked,
      likesCount: post.likesCount,
    });
  } catch (err) {
    console.error("❌ Like error:", err);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
