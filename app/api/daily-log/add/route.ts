// app/api/daily-log/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ingestDailyLog } from "@/lib/ingest";  // ✅ import helper ingest

const MONGO_URI = process.env.MONGO_URI!;
const MONGO_DB = process.env.MONGO_DB!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { childId, sleepHours, mood, notes, date } = body;

  const mongo = new MongoClient(MONGO_URI);
  await mongo.connect();
  const db = mongo.db(MONGO_DB);

  try {
    const newLog = {
      childId,
      sleepHours,
      mood,
      notes,
      date: date || new Date().toISOString().split("T")[0],
    };

    // 1) Lưu vào MongoDB
    const result = await db.collection("dailyLogs").insertOne(newLog);

    // 2) Gọi ingest để sync Pinecone
    await ingestDailyLog({ ...newLog, _id: result.insertedId }, undefined, childId);

    return NextResponse.json({ success: true, logId: result.insertedId });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    await mongo.close();
  }
}
