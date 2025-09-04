// lib/auth.ts
import "server-only";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "./db";
import mongoose from "mongoose";
import User from "@/app/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function signToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function hashPassword(pw: string) {
  return bcrypt.hash(pw, 12);
}
export async function comparePassword(pw: string, hash: string) {
  return bcrypt.compare(pw, hash);
}

export function getBearerToken(req: Request) {
  const h = (req.headers as any).get
    ? (req.headers as Headers).get("authorization")
    : (req as any).headers?.authorization;
  if (!h?.startsWith("Bearer ")) return null;
  return h.split(" ")[1];
}

export async function getAuthUser(req: Request) {
  await connectDB();
  const tok = getBearerToken(req);
  if (!tok) return null;
  const payload = verifyToken(tok);
  if (!payload || !mongoose.Types.ObjectId.isValid(payload.userId)) return null;
  const user = await User.findById(payload.userId).lean();
  if (!user) return null;
  return { id: payload.userId, ...user };
}
