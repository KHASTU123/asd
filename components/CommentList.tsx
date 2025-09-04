"use client";
import { useEffect, useState } from "react";

export default function CommentList({ postId, onAnyChange }: { postId: string; onAnyChange?: () => void }) {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/comments?postId=${postId}&limit=50`);
    const data = await res.json();
    setComments(data.data || []);
    setLoading(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const token = sessionStorage
.getItem("token") || "";
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ postId, content: text }),
    });
    if (res.ok) {
      setText("");
      await load();
      onAnyChange?.();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.message || "Không thể bình luận");
    }
  }

  useEffect(() => {
    load();
  }, [postId]);

  return (
    <div className="space-y-3">
      {loading ? (
        <p>Đang tải bình luận...</p>
      ) : comments.length ? (
        comments.map((c) => (
          <div key={c._id} className="flex items-start gap-2">
            <img className="w-8 h-8 rounded-full" src={c.author?.avatar || "/avatar-placeholder.png"} />
            <div className="rounded-xl bg-black/5 dark:bg-white/10 px-3 py-2">
              <div className="text-sm font-medium">{c.author?.fullName || "Ẩn danh"}</div>
              <div className="text-sm">{c.content}</div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-neutral-500">Chưa có bình luận</p>
      )}

      <form onSubmit={submit} className="flex items-center gap-2">
        <input
          className="flex-1 px-3 py-2 rounded-lg border bg-transparent"
          placeholder="Viết bình luận..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="px-3 py-2 rounded bg-emerald-600 text-white">Gửi</button>
      </form>
    </div>
  );
}
