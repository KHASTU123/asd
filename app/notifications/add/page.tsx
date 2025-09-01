"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component

export default function AddNotificationPage() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        source: "",
        link: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch('/api/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add notification.");
            }

            const data = await response.json();
            setMessage("Thông báo đã được thêm thành công!");
            setFormData({
                title: "",
                content: "",
                source: "",
                link: ""
            }); // Reset form
        } catch (error: any) {
            setMessage(`Có lỗi xảy ra: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center">
                <Card className="w-full max-w-md rounded-3xl shadow-xl border-none">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            Thêm Thông Báo Mới
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Tạo và gửi thông báo mới đến người dùng.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tiêu đề thông báo
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nhập tiêu đề thông báo..."
                                    className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nội dung
                                </label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    placeholder="Nhập nội dung thông báo..."
                                    className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="source" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nguồn gốc thông tin
                                </label>
                                <input
                                    id="source"
                                    type="text"
                                    value={formData.source}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Bộ Y tế, WHO"
                                    className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition-colors duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Link truy cập
                                </label>
                                <input
                                    id="link"
                                    type="url"
                                    value={formData.link}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition-colors duration-200"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                disabled={isLoading}
                                className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Đang gửi..." : "Gửi thông báo"}
                            </motion.button>
                        </form>
                        {message && (
                            <div className="mt-6 text-center text-sm font-medium">
                                <p className={message.includes("thành công") ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}>
                                    {message}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
