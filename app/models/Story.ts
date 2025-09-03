import { Schema, model, models } from "mongoose"

const StorySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ["image", "video"], default: "image" },
  expiresAt: { type: Date, required: true },
}, { timestamps: true })

// TTL index to auto-delete expired stories
StorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })
StorySchema.index({ author: 1, createdAt: -1 })

export default models.Story || model("Story", StorySchema)