"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter(); // ✅ hook phải nằm trong component

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setIsLoading(true);

    try {
      // 👉 gọi API thực tế
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data: { user?: { name: string }; message?: string; error?: string } =
        await res.json();

      if (!res.ok) {
        setError(data.message || data.error || "Đăng ký thất bại");
        return;
      }

      if (data.user) {
        console.log("User registered:", data.user);
      }

      // 👉 điều hướng
      router.replace("/auth/login");
      // hoặc: router.push("/dashboard/setup");
    } catch (err) {
      console.error(err);
      setError("Lỗi kết nối");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Thông báo lỗi */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl relative text-center text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Fullname */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Họ và tên
        </label>
        <input
          required
          placeholder="Nhập họ và tên của bạn"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          required
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Mật khẩu
        </label>
        <input
          required
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Xác nhận mật khẩu
        </label>
        <input
          required
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 shadow-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
      </motion.button>
    </motion.form>
  );
}
