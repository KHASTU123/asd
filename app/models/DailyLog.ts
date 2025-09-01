// app/models/DailyLog.ts
import mongoose from "mongoose";

const DailyLogSchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, ref: "Child", required: true, index: true },
  date: { type: Date, default: () => new Date(), index: true },
  mood: { type: String, enum: ["very_happy","happy","neutral","anxious","irritable"], default: "neutral" },
  sleepHours: { type: Number, min: 0, max: 24, default: 0 },
  meals: { type: String, default: "" },
  communication: { type: String, default: "" },
  activities: { type: String, default: "" },
  therapyNotes: { type: String, default: "" },
  behaviorNotes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.DailyLog || mongoose.model("DailyLog", DailyLogSchema);
