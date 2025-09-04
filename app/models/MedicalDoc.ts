import mongoose, { Schema, Document } from "mongoose";

export interface IMedicalDoc extends Document {
  title: string;
  type: "document" | "guideline" | "reference" | "video" | "other";
  url: string;      // link file hoặc video
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const MedicalDocSchema = new Schema<IMedicalDoc>(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["document", "guideline", "reference", "video", "other"],
      required: true,
    },
    url: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.MedicalDoc ||
  mongoose.model<IMedicalDoc>("MedicalDoc", MedicalDocSchema);
