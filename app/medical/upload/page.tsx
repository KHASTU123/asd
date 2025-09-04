"use client";
import { useState } from "react";

export default function UploadMedicalDocPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("document");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let finalUrl = url;

    // Nếu chọn file, upload lên Cloudinary trước
    if (file) {
      const fd = new FormData();
      fd.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const uploadData = await uploadRes.json();
      if (uploadData.success) {
        finalUrl = uploadData.url;
      } else {
        setMessage("❌ Upload file thất bại");
        setLoading(false);
        return;
      }
    }

    // Gửi sang API /api/medical-docs
    const token = sessionStorage.getItem("token") || "";
    const res = await fetch("/api/medical-docs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, type, url: finalUrl }),
    });

    setLoading(false);

    if (res.ok) {
      setTitle("");
      setUrl("");
      setFile(null);
      setMessage("✅ Tài liệu đã được tải lên thành công!");
    } else {
      const err = await res.json().catch(() => ({}));
      setMessage("❌ Lỗi: " + (err.message || "Không thể upload"));
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">📑 Upload tài liệu y tế</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tiêu đề</label>
          <input
            className="w-full px-3 py-2 rounded border bg-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Loại tài liệu</label>
          <select
            className="w-full px-3 py-2 rounded border bg-transparent"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="guideline">📘 Văn bản hướng dẫn</option>
            <option value="reference">🔗 Link tham khảo</option>
            <option value="document">📄 Tài liệu</option>
            <option value="video">🎬 Video</option>
            <option value="other">🗂 Khác</option>
          </select>
        </div>

        {/* Chọn link hoặc file */}
        <div>
          <label className="block text-sm font-medium">Link (tùy chọn)</label>
          <input
            type="url"
            className="w-full px-3 py-2 rounded border bg-transparent"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Hoặc upload file</label>
          <input
            type="file"
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          {file && <p className="text-sm text-emerald-600 mt-1">📂 {file.name}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-emerald-600 text-white"
        >
          {loading ? "Đang tải lên..." : "Upload"}
        </button>
      </form>

      {message && <p className="text-sm">{message}</p>}
    </main>
  );
}
