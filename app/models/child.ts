// app/models/child.ts
import mongoose from "mongoose";

const ChildSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true },
  dob: { type: Date },
  age: { type: Number },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  diagnosis: { type: String, default: "" },
  healthNotes: { type: String, default: "" },
  therapy: [{ type: String }],
  favoriteActivities: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Child || mongoose.model("Child", ChildSchema);
