"use client";

import ChatBot from "./ChatBot";

const contacts = [
  { id: 1, name: "Nguyễn Văn A", avatar: "/avatar-placeholder.png" },
  { id: 2, name: "Trần Thị B", avatar: "/avatar-placeholder.png" },
];

export default function RightSidebar() {
  return (
    <div className="space-y-6">
      {/* Danh sách bạn bè online */}
      <section>
        <h2 className="font-semibold mb-2">Bạn bè</h2>
        <ul className="space-y-2">
          {contacts.map((c) => (
            <li key={c.id} className="flex items-center gap-2">
              <img
                src={c.avatar}
                alt={c.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm">{c.name}</span>
              <span className="ml-auto h-2 w-2 bg-green-500 rounded-full" />
            </li>
          ))}
        </ul>
      </section>

      {/* Chatbot AI */}
      <section>
        <h2 className="font-semibold mb-2">Trợ lý AI</h2>
        <ChatBot />
      </section>
    </div>
  );
}
