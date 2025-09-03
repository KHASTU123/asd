"use client";

import { useState } from "react";

export default function PostComposer({ onPostCreated }: { onPostCreated?: () => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return alert("Vui lòng nhập nội dung");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để đăng bài");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ Lỗi: ${data.error || "Không thể đăng bài"}`);
        return;
      }

      alert("✅ Đăng bài thành công");
      setContent("");
      onPostCreated?.(); // gọi callback để reload feed
    } catch (err) {
      console.error("Post error:", err);
      alert("Có lỗi xảy ra khi đăng bài");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-xl animate-fade-in-up">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-zinc-700"></div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bạn đang nghĩ gì?"
          className="w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all duration-300"
          rows={3}
        />
      </div>
      <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800 pt-4">
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 rounded-full hover:bg-emerald-100 dark:hover:bg-zinc-800 transition-colors">
            📷 Ảnh/Video
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-emerald-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-lg disabled:opacity-50"
        >
          {loading ? "Đang đăng..." : "Đăng bài"}
        </button>
      </div>
    </div>
  );
}