import mongoose, { Schema, Document } from "mongoose";

export interface IDailyLog extends Document {
  childId: string;
  date: Date;
  sleepHours: number;
  mood: "Happy" | "Calm" | "Joyful" | "Tired" | "Sad" | "Angry" | "Anxious";
  notes?: string;
}

const DailyLogSchema: Schema = new Schema({
  childId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  sleepHours: { type: Number, required: true },
  mood: {
    type: String,
    enum: ["Happy", "Calm", "Joyful", "Tired", "Sad", "Angry", "Anxious"],
    required: true,
  },
  notes: { type: String },
});

export default mongoose.models.DailyLog ||
  mongoose.model<IDailyLog>("DailyLog", DailyLogSchema);
