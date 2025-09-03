import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Post from "@/app/models/Post";
import { verifyToken } from "@/lib/auth";

const createPostSchema = z.object({
  content: z.string().min(1, "Content is required"),
  media: z
    .array(
      z.object({
        url: z.string().url(),
        kind: z.enum(["image", "video"]).default("image"),
      })
    )
    .optional(),
});

// ================== GET ==================
export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "fullName email") // populate theo schema User
      .lean();

    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
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

    // ✅ Validate body
    const body = await req.json();
    const { content, media } = createPostSchema.parse(body);

    // ✅ Tạo post
    const post = await Post.create({
      author: payload.id,
      content,
      media,
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (err) {
    console.error("❌ Post error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
