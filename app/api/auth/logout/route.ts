import { NextResponse } from "next/server"

export async function POST() {
  // Nếu bạn dùng JWT/cookie → clear ở đây
  return NextResponse.json({ success: true, message: "Logged out successfully" })
}
