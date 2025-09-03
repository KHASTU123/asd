import mongoose, { Schema, model, models } from "mongoose"

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
)

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: 10,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    comments: [CommentSchema],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      }
    ],
  },
  { timestamps: true }
)

export default models.Post || model("Post", PostSchema)
