"use client";
import { useState } from "react";

export default function PostComposer({ onPosted }: { onPosted?: () => void }) {
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!content.trim()) return;
    setBusy(true);
    try {
      const token = sessionStorage
.getItem("token") || "";
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "Đăng bài thất bại");
      } else {
        setContent("");
        onPosted?.();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white/60 dark:bg-neutral-900/60 p-4 shadow-sm">
      <textarea
        className="w-full bg-transparent outline-none resize-none min-h-[80px]"
        placeholder="Bạn đang nghĩ gì?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          onClick={submit}
          disabled={busy}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white disabled:opacity-60"
        >
          {busy ? "Đang đăng..." : "Đăng bài"}
        </button>
      </div>
    </div>
  );
}
