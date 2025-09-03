// app/gioithieu/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Video, User } from "lucide-react";

export default function GioiThieuPage() {
  return (
    <main className="container mx-auto py-12 px-4 space-y-12">
      {/* Tiêu đề */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">
          Giới thiệu về Chăm sóc Trẻ Tự Kỷ
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Trang thông tin dành cho phụ huynh, giáo viên và cộng đồng nhằm hỗ trợ
          trẻ tự kỷ phát triển toàn diện, thông qua tài liệu, video và sự kết nối.
        </p>
      </section>

      {/* Video hướng dẫn */}
      <section>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex items-center gap-2">
            <Video className="w-6 h-6 text-red-500" />
            <CardTitle>Video Hướng Dẫn</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <iframe
              className="w-full h-64 rounded-xl"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video hướng dẫn 1"
              allowFullScreen
            />
            <iframe
              className="w-full h-64 rounded-xl"
              src="https://www.youtube.com/embed/ysz5S6PUM-U"
              title="Video hướng dẫn 2"
              allowFullScreen
            />
          </CardContent>
        </Card>
      </section>

      {/* Sách & Tài liệu */}
      <section>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex items-center gap-2">
            <Book className="w-6 h-6 text-green-600" />
            <CardTitle>Sách & Tài Liệu Hướng Dẫn</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Hướng dẫn chăm sóc trẻ tự kỷ",
                link: "#",
              },
              {
                title: "Giáo dục hòa nhập cho trẻ tự kỷ",
                link: "#",
              },
              {
                title: "Tài liệu tham khảo chuyên sâu",
                link: "#",
              },
            ].map((book, i) => (
              <div
                key={i}
                className="p-4 border rounded-xl hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <Button variant="link" className="mt-2 p-0" asChild>
                  <a href={book.link} target="_blank">
                    Đọc ngay →
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Thông tin người sáng lập */}
      <section>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex items-center gap-2">
            <User className="w-6 h-6 text-blue-500" />
            <CardTitle>Người Sáng Lập & Chủ Sở Hữu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <span className="font-semibold">Nguyễn Văn A</span> – Nhà sáng lập
              dự án, đồng thời là phụ huynh có con tự kỷ. Anh mong muốn xây dựng
              một cộng đồng kết nối để phụ huynh có thể tìm kiếm thông tin hữu
              ích, chia sẻ kinh nghiệm và hỗ trợ lẫn nhau.
            </p>
            <p>
              Dự án được triển khai bởi nhóm nghiên cứu tại{" "}
              <span className="font-semibold">Đại học Cần Thơ</span>, với sự hỗ
              trợ của các chuyên gia tâm lý và giáo dục đặc biệt.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
