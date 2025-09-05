import mongoose, { Schema, models, model } from "mongoose";

const DailyLogSchema = new Schema(
  {
    childId: { type: String, required: true },
    date: { type: Date, default: Date.now },

    sleepHours: { type: Number, default: 0 },
    mood: { type: String },

    eating: { type: String }, // Rất tốt, Tốt, Bình thường...
    behaviorNotes: { type: String },
    communication: { type: String },

    socialSkills: [{ type: String }], // danh sách checkbox
    independence: [{ type: String }], // danh sách checkbox

    notes: { type: String },
  },
  { timestamps: true }
);

const DailyLog = models.DailyLog || model("DailyLog", DailyLogSchema);

export default DailyLog;
