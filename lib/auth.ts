// lib/auth.ts
import "server-only"   // Đảm bảo chỉ chạy server, không bundle vào client

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getDatabase } from "./mongodb"
import { ObjectId } from "mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// ================== INTERFACES ==================
export interface User {
  _id?: string
  email: string
  password?: string
  name: string
  phone?: string
  role: "parent" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface Child {
  _id?: string
  parentId: string
  name: string
  birthDate: Date
  gender: "male" | "female"
  ageGroup: "0-12m" | "12-24m" | "24-48m"
  createdAt: Date
  updatedAt: Date
}

// ================== PASSWORD ==================
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// ================== JWT ==================
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch {
    return null
  }
}

// ================== USER FUNCTIONS ==================
export async function createUser(
  userData: Omit<User, "_id" | "createdAt" | "updatedAt">
): Promise<User> {
  const db = await getDatabase()

  if (!userData.password) {
    throw new Error("Password is required")
  }

  if (!userData.email || !userData.name || !userData.role) {
    throw new Error("Email, name, and role are required")
  }

  // Hash password
  const hashedPassword = await hashPassword(userData.password)

  const user = {
    ...userData,
    username: userData.email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Insert into MongoDB
  const result = await db.collection("users").insertOne(user)

  console.log("✅ User inserted with ID:", result.insertedId.toString())

  return {
    _id: result.insertedId.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    password: user.password,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export async function findUserById(id: string): Promise<User | null> {
  const db = await getDatabase()
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) })

  if (!user) return null

  return {
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    password: user.password,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

