"use client"

import { useState } from "react"
import CommentList from "@/components/CommentList"

export interface PostCardProps {
  post: {
    _id: string
    content?: string
    createdAt?: string
    likes?: string[]
    likesCount?: number
    commentsCount?: number
    media?: { url: string; kind: "image" | "video" }[]
    author?: {
      _id: string
      name: string
      avatar?: string
    }
  }
  currentUserId?: string
  onMutateFeed?: () => void
}

async function toggleLike(postId: string) {
  const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" })
  if (!res.ok) throw new Error(await res.text())
  return res.json() as Promise<{ liked: boolean; likesCount: number }>
}

export default function PostCard({ post, currentUserId, onMutateFeed }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [likesCount, setLikesCount] = useState(
    Array.isArray(post.likes) ? post.likes.length : post.likesCount ?? 0
  )
  const createdAt = post.createdAt ? new Date(post.createdAt) : null

  async function handleLike() {
    try {
      const res = await toggleLike(post._id)
      setLikesCount(res.likesCount)
      onMutateFeed?.()
    } catch (err) {
      console.error("Error liking post", err)
    }
  }

  return (
    <article className="rounded-2xl border bg-white/60 dark:bg-neutral-900/60 p-3 shadow-sm">
      {/* Header */}
      <header className="flex items-center gap-3">
        <img
          src={post.author?.avatar || "/avatar-placeholder.png"}
          alt={post.author?.name || "avatar"}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-medium">{post.author?.name || "Ẩn danh"}</span>
          {createdAt && (
            <time className="text-xs text-neutral-500">
              {createdAt.toLocaleString("vi-VN")}
            </time>
          )}
        </div>
      </header>

      {/* Content */}
      {post.content && (
        <p className="mt-3 whitespace-pre-wrap leading-relaxed">{post.content}</p>
      )}

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div className="mt-3 grid grid-cols-1 gap-2">
          {post.media.map((m, i) =>
            m.kind === "video" ? (
              <video key={i} controls className="w-full rounded-xl">
                <source src={m.url} />
              </video>
            ) : (
              <img key={i} src={m.url} alt="media" className="w-full rounded-xl" />
            )
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <button
          className="px-3 py-2 rounded-lg hover:bg-black/5"
          onClick={handleLike}
        >
          👍 Thích {likesCount ? `(${likesCount})` : ""}
        </button>
        <button
          className="px-3 py-2 rounded-lg hover:bg-black/5"
          onClick={() => setShowComments(s => !s)}
          aria-expanded={showComments}
        >
          💬 Bình luận {post.commentsCount ? `(${post.commentsCount})` : ""}
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-3">
          <CommentList postId={post._id} currentUserId={currentUserId || ""} />
        </div>
      )}
    </article>
  )
}
