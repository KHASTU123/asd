// models/child.ts
import mongoose from "mongoose"

const ChildSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Child || mongoose.model("Child", ChildSchema)
