"use client";

import { Home, Users, MessageCircle, Settings } from "lucide-react";

const navItems = [
  { icon: Home, label: "Trang chủ", href: "/" },
  { icon: Users, label: "Cộng đồng", href: "/community" },
  { icon: MessageCircle, label: "Tin nhắn", href: "/messages" },
  { icon: Settings, label: "Cài đặt", href: "/settings" },
];

export default function LeftNav() {
  return (
    <nav className="space-y-2">
      {navItems.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          <Icon size={20} />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
