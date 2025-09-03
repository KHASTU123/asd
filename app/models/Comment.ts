import { Schema, model, models } from "mongoose"

const CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
}, { timestamps: true })

CommentSchema.index({ post: 1, createdAt: 1 })

export default models.Comment || model("Comment", CommentSchema)