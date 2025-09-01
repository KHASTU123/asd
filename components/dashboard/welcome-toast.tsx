"use client";
import { useEffect } from "react";

export default function WelcomeToast({ name }: { name?: string }) {
  useEffect(()=> {
    const el = document.createElement("div");
    el.className = "fixed top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-lg text-sm z-50";
    el.textContent = `Chào mừng quý phụ huynh${name ? ", " + name : ""}! Mỗi ngày là một niềm hy vọng nhỏ.`;
    document.body.appendChild(el);
    const t = setTimeout(()=> el.remove(), 4500);
    return ()=> { clearTimeout(t); el.remove(); }
  }, [name]);
  return null;
}
