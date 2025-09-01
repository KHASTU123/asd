"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Giả định có component Button
import { Input } from "@/components/ui/input"; // Giả định có component Input
import { Label } from "@/components/ui/label"; // Giả định có component Label
import { Textarea } from "@/components/ui/textarea"; // Giả định có component Textarea
import { ArrowLeft, Upload } from "lucide-react";

export default function AddNotificationPage() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        source: "",
        link: "",
        image: null as File | null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        setIsSuccess(false);

        // Tạo FormData để gửi dữ liệu và file
        const data = new FormData();
        data.append("title", formData.title);
        data.append("content", formData.content);
        data.append("source", formData.source);
        data.append("link", formData.link);
        data.append("date", new Date().toISOString());

        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            // Sử dụng FormData làm body của request.
            // Trình duyệt sẽ tự động thiết lập Content-Type là 'multipart/form-data'.
            // Giả lập API call
            const res = await fetch('/api/notifications', {
                method: 'POST',
                body: data,
            });

            if (!res.ok) {
                // Xử lý lỗi từ server
                // Kiểm tra Content-Type để tránh lỗi JSON.parse
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Thêm thông báo thất bại");
                } else {
                    throw new Error("Phản hồi từ máy chủ không hợp lệ. Vui lòng kiểm tra lại API.");
                }
            }

            setMessage("Thêm thông báo thành công!");
            setIsSuccess(true);
            setFormData({ title: "", content: "", source: "", link: "", image: null }); // Reset form
        } catch (error: any) {
            setMessage(error.message);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center">
            <Card className="w-full max-w-2xl rounded-3xl shadow-lg border-none">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Thêm Thông Báo Mới</h1>
                        <a href="/dashboard" className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
                            <ArrowLeft size={20} className="mr-1" />
                            <span>Quay lại</span>
                        </a>
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                        Điền đầy đủ thông tin để tạo một thông báo mới.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">Tiêu đề</Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Tiêu đề thông báo"
                                required
                                className="rounded-2xl mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="content" className="text-gray-700 dark:text-gray-300">Nội dung</Label>
                            <Textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                placeholder="Nội dung chi tiết của thông báo"
                                required
                                className="rounded-2xl mt-1 h-32"
                            />
                        </div>
                        <div>
                            <Label htmlFor="source" className="text-gray-700 dark:text-gray-300">Nguồn</Label>
                            <Input
                                type="text"
                                id="source"
                                name="source"
                                value={formData.source}
                                onChange={handleInputChange}
                                placeholder="Tên nguồn (ví dụ: VN Express)"
                                required
                                className="rounded-2xl mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="link" className="text-gray-700 dark:text-gray-300">Đường dẫn</Label>
                            <Input
                                type="url"
                                id="link"
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                                placeholder="https://example.com/tin-tuc"
                                required
                                className="rounded-2xl mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="image" className="text-gray-700 dark:text-gray-300">Hình ảnh</Label>
                            <div className="flex items-center space-x-2 mt-1">
                                <Input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {formData.image && (
                                    <p className="text-sm text-gray-500 truncate">{formData.image.name}</p>
                                )}
                            </div>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl text-sm ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {message}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-2xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Đang xử lý..." : "Thêm Thông Báo"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
