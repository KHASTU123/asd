import mongoose, { Schema, Document } from "mongoose";

type Media = { url: string; kind: "image" | "video" };

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  media?: Media[];
  likes: mongoose.Types.ObjectId[];
  shares: mongoose.Types.ObjectId[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  sharedFrom?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, default: "" },
    media: [
      {
        url: String,
        kind: { type: String, enum: ["image", "video"], default: "image" },
      },
    ],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    shares: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
    sharedFrom: { type: Schema.Types.ObjectId, ref: "Post", default: null },
  },
  { timestamps: true }
);

PostSchema.index({ createdAt: -1 });

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
