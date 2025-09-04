import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/app/models/User";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password, fullName } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const existed = await User.findOne({ email });
    if (existed) {
      return NextResponse.json({ success: false, message: "Email already used" }, { status: 409 });
    }

    const hashed = await hashPassword(password);
    const user = await User.create({
      email,
      password: hashed,
      fullName,
      avatar: "/avatar-placeholder.png",
    });

    const token = signToken(user._id.toString());
    return NextResponse.json({
      success: true,
      token,
      user: { id: user._id, email: user.email, fullName: user.fullName, avatar: user.avatar },
    });
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
