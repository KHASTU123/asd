// lib/db.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI");
}

let cached = (global as any)._mongoose;
if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        dbName: process.env.MONGODB_DB || undefined,
      })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
