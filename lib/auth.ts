import "server-only";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "./db";
import mongoose from "mongoose";
import User from "../app/models/User";
import type { IUser } from "../app/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// ================== PASSWORD ==================
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// ================== JWT ==================
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

// ================== USER FUNCTIONS ==================
export async function createUser(
  userData: Omit<IUser, "_id" | "createdAt">
): Promise<IUser> {
  await connectDB();

  if (!userData.password) {
    throw new Error("Password is required");
  }

  if (!userData.email || !userData.fullName) {
    throw new Error("Email and fullName are required");
  }

  // Hash password
  const hashedPassword = await hashPassword(userData.password);

  const newUser = await User.create({
    email: userData.email,
    password: hashedPassword,
    fullName: userData.fullName,
    createdAt: new Date(),
  });

  return newUser.toObject();
}

export async function findUserById(id: string): Promise<IUser | null> {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  const user = await User.findById(id).lean();
  return user as IUser | null;
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  await connectDB();
  const user = await User.findOne({ email }).lean();
  return user as IUser | null;
}
