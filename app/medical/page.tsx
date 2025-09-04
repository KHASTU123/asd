"use client";
import { useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu cho một tài liệu y tế
type Doc = {
  _id: string;
  title: string;
  type: string;
  url: string;
};

export default function MedicalPage() {
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu tài liệu
    fetch("/api/medical-docs")
      .then((res) => res.json())
      .then((data) => setDocs(data.data || []));
  }, []);

  // Chia tài liệu thành các nhóm dựa trên loại tài liệu
  const grouped = {
    guideline: docs.filter((d) => d.type === "guideline"),
    reference: docs.filter((d) => d.type === "reference"),
    document: docs.filter((d) => d.type === "document"),
    video: docs.filter((d) => d.type === "video"),
    other: docs.filter((d) => d.type === "other"),
  };

  return (
    <main className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200">
      {/* Cột trái: Sidebar tài liệu */}
      <aside className="w-1/3 border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-6 bg-white dark:bg-gray-800 shadow-xl transition-all duration-300">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-emerald-600 dark:text-emerald-400">
          Thư Viện Tài Liệu Y Tế
        </h1>
        <div className="space-y-8">
          <Section title="📘 Văn bản hướng dẫn" items={grouped.guideline} />
          <Section title="🔗 Link tham khảo" items={grouped.reference} />
          <Section title="📄 Tài liệu" items={grouped.document} />
          <Section title="🎬 Video" items={grouped.video} />
          <Section title="🗂 Khác" items={grouped.other} />
        </div>
      </aside>

      {/* Cột phải: iframe hiển thị nội dung trang Bộ Y tế */}
      <section className="flex-1 p-6 flex justify-center items-center">
        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden transition-all duration-300">
          <iframe
            src="https://vi.wikipedia.org/wiki/B%E1%BB%99_Y_t%E1%BA%BF_(Vi%E1%BB%87t_Nam)"
            title="Bộ Y tế"
            className="w-full h-full border-0"
          />
        </div>
      </section>
    </main>
  );
}

// Component phụ để hiển thị các phần tài liệu
function Section({ title, items }: { title: string; items: Doc[] }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.01]">
      <h2 className="font-bold text-xl mb-4 text-emerald-700 dark:text-emerald-300 border-b border-gray-300 dark:border-gray-600 pb-2">
        {title}
      </h2>
      <ul className="space-y-3">
        {items.map((doc) => (
          <li
            key={doc._id}
            className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-emerald-50 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
          >
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-emerald-700 dark:text-emerald-300 font-medium hover:underline"
            >
              {doc.title}
            </a>
          </li>
        ))}
        {!items.length && (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            Chưa có tài liệu nào ở đây.
          </p>
        )}
      </ul>
    </div>
  );
}
