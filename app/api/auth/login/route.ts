import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/app/models/User";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const ok = await comparePassword(password, user.password);
    if (!ok) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken(user._id.toString());
    return NextResponse.json({
      success: true,
      token,
      user: { id: user._id, email: user.email, fullName: user.fullName, avatar: user.avatar },
    });
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
