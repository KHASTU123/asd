import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User, { IUser } from "@/app/models/User";
import Post, { IPost } from "@/app/models/Post";
import mongoose from "mongoose";

export async function GET(req: Request) {
  const me = await getAuthUser(req);
  if (!me) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  // ✅ Lấy thông tin user từ DB (để luôn có bio mới nhất)
  const user = await User.findById(me.id).lean<IUser & { _id: mongoose.Types.ObjectId }>();
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const posts = await Post.find({ author: me.id })
    .sort({ createdAt: -1 })
    .populate("author", "fullName avatar")
    .lean<IPost[]>();

  return NextResponse.json({
    success: true,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio || "",
    },
    posts,
  });
}
