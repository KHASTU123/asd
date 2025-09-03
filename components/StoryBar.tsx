"use client";

const stories = [
  { id: 1, name: "Nguyễn Văn A", avatar: "/avatar-placeholder.png" },
  { id: 2, name: "Trần Thị B", avatar: "/avatar-placeholder.png" },
  { id: 3, name: "Lê Văn C", avatar: "/avatar-placeholder.png" },
];

export default function StoryBar() {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
      {stories.map((s) => (
        <div
          key={s.id}
          className="flex flex-col items-center space-y-1 min-w-[70px]"
        >
          <div className="h-16 w-16 rounded-full border-2 border-blue-600 overflow-hidden">
            <img
              src={s.avatar}
              alt={s.name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xs text-center">{s.name}</span>
        </div>
      ))}
    </div>
  );
}
