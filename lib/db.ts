// lib/db.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable inside .env.local");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return mongoose.connection;

  const db = await mongoose.connect(MONGO_URI);
  isConnected = true;
  return db; // Return the database connection
}