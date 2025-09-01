"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || data.error || "Đăng nhập thất bại");
        setIsLoading(false);
        return;
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input required type="email" placeholder="Email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
      <input required type="password" placeholder="Mật khẩu" value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})} />
      <button type="submit" disabled={isLoading}>{isLoading ? "Đang đăng nhập..." : "Đăng nhập"}</button>
    </form>
  );
}
