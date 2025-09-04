"use client";
import { useState } from "react";

export default function PostComposer({ onPosted }: { onPosted?: () => void }) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() && files.length === 0) return;

    setLoading(true);

    const uploaded: { url: string; kind: string }[] = [];

    for (const f of files) {
      const formData = new FormData();
      formData.append("file", f);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        uploaded.push({ url: data.url, kind: data.kind }); // kind = "image" | "video"
      }
    }

    const token = sessionStorage.getItem("token") || "";
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, media: uploaded }),
    });

    setLoading(false);

    if (res.ok) {
      setContent("");
      setFiles([]);
      onPosted?.();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.message || "Không thể đăng bài");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 border rounded-2xl bg-white/60 dark:bg-neutral-900/60">
      <textarea
        className="w-full resize-none rounded-lg border px-3 py-2 bg-transparent"
        rows={3}
        placeholder="Bạn đang nghĩ gì?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* chọn file (ảnh + video) */}
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
      />

      {/* preview file */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {files.map((f, i) =>
            f.type.startsWith("video/") ? (
              <video key={i} controls className="rounded-lg">
                <source src={URL.createObjectURL(f)} />
              </video>
            ) : (
              <img key={i} src={URL.createObjectURL(f)} alt="preview" className="rounded-lg object-cover" />
            )
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded bg-emerald-600 text-white"
      >
        {loading ? "Đang đăng..." : "Đăng bài"}
      </button>
    </form>
  );
}
