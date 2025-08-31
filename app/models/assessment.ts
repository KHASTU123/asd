// models/assessment.ts
import mongoose, { Schema, Document } from "mongoose"

export interface IAssessment extends Document {
  userId?: string
  date: string
  answers: Record<string, string>
  totalScore: number
  maxScore: number
  percentage: number
  timestamp: number
}

const AssessmentSchema: Schema = new Schema({
  userId: { type: String, required: false }, // sau này có thể liên kết user
  date: { type: String, required: true },
  answers: { type: Object, required: true },
  totalScore: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  percentage: { type: Number, required: true },
  timestamp: { type: Number, required: true },
})

export default mongoose.models.Assessment ||
  mongoose.model<IAssessment>("Assessment", AssessmentSchema)
