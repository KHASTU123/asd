"use client"

import { useState } from "react"
import useSWRInfinite from "swr/infinite"

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface Comment {
    _id: string
    content: string
    createdAt: string
    author: {
        _id: string
        name: string
        avatar?: string
    }
}

export default function CommentList({ postId, currentUserId }: { postId: string; currentUserId: string }) {
    const [newComment, setNewComment] = useState("")

    // Infinite load comments
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.nextCursor) return null
        const cursor = pageIndex === 0 ? "" : `&cursor=${previousPageData.nextCursor}`
        return `/api/comments?postId=${postId}${cursor}&limit=5`
    }

    const { data, error, size, setSize, mutate } = useSWRInfinite(getKey, fetcher)
    const comments: Comment[] = data ? data.flatMap((page: any) => page.data) : []
    const isLoading = !data && !error
    const isLoadingMore = size > 0 && data && typeof data[size - 1] === "undefined"
    const hasMore = data ? data[data.length - 1]?.nextCursor : false

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!newComment.trim()) return
        await fetch("/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token") || ""}` // nếu bạn dùng JWT
            },
            body: JSON.stringify({ postId, content: newComment })
        })
        setNewComment("")
        mutate() // refresh list
    }

    return (
        <div className="mt-2 space-y-2">
            {/* Comment input */}
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Viết bình luận..."
                    className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
                />
                <button
                    type="submit"
                    className="rounded-xl bg-blue-500 px-3 py-2 text-white text-sm disabled:opacity-50"
                    disabled={!newComment.trim()}
                >
                    Gửi
                </button>
            </form>

            {/* Comment list */}
            {isLoading && <p className="text-sm text-gray-500">Đang tải...</p>}
            {comments.map(comment => (
                <div key={comment._id} className="flex items-start gap-2">
                    <img
                        src={comment.author.avatar || "/default-avatar.png"}
                        alt={comment.author.name}
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="rounded-2xl bg-gray-100 px-3 py-2">
                        <p className="text-sm font-semibold">{comment.author.name}</p>
                        <p className="text-sm">{comment.content}</p>
                        <span className="text-xs text-gray-400">
                            {new Date(comment.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                    </div>
                </div>
            ))}

            {/* Load more */}
            {hasMore && (
                <button
                    onClick={() => setSize(size + 1)}
                    disabled={isLoadingMore}
                    className="text-sm text-blue-500 hover:underline"
                >
                    {isLoadingMore ? "Đang tải..." : "Xem thêm bình luận"}
                </button>
            )}
        </div>
    )
}
