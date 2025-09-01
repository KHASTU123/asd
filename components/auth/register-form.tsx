"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName, // ✅ khớp với backend
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || data.error || "Đăng ký thất bại");
        setIsLoading(false);
        return;
      }

      // lưu thông tin user nếu backend trả về
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      router.push("/dashboard/setup");
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input required placeholder="Họ và tên"
        value={formData.fullName}
        onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
      <input required type="email" placeholder="Email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })} />
      <input required type="password" placeholder="Mật khẩu"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })} />
      <input required type="password" placeholder="Xác nhận Mật khẩu"
        value={formData.confirmPassword}
        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Đang tạo..." : "Đăng ký"}
      </button>
    </form>
  );
}
