import { Schema, model, models } from "mongoose"

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: false},
  content: { type: String, default: "" },
  media: [{
    url: String,
    kind: { type: String, enum: ["image", "video"], default: "image" }
  }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
}, { timestamps: true })

PostSchema.index({ createdAt: -1 })
PostSchema.index({ author: 1, createdAt: -1 })

export default models.Post || model("Post", PostSchema)