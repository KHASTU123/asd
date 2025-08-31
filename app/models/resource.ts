import mongoose, { Schema, Document } from "mongoose"

export interface IResource extends Document {
  title: string
  description?: string
  category: string
  url?: string
  file?: string
  createdAt: Date
}

const ResourceSchema = new Schema<IResource>({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  url: { type: String },
  file: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export const Resource =
  mongoose.models.Resource || mongoose.model<IResource>("Resource", ResourceSchema)
