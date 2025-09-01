"use client";
import React, { useEffect, useState } from "react";
import { WelcomeToast } from "@/components/dashboard/welcome-toast";
import { DailyLogForm } from "@/components/dashboard/daily-log-form";
import { DailyLogChart } from "@/components/dashboard/daily-log-chart";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Bell, User, Newspaper, BarChart2, MessageSquare, BriefcaseMedical } from "lucide-react";
import { Navbar } from "@/components/navbar";
// Mock Data for a more public feel
const mockNotifications = [
  { id: 1, title: "Thông báo mới về phương pháp trị liệu hành vi.", date: "2024-09-01" },
  { id: 2, title: "Webinar về dinh dưỡng cho trẻ tự kỷ vào ngày 15/09.", date: "2024-08-28" },
  { id: 3, title: "Bài viết mới: Dấu hiệu nhận biết sớm ở trẻ.", date: "2024-08-25" },
];

const mockHealthUpdates = [
  { id: 1, title: "Hướng dẫn tiêm phòng mới nhất cho trẻ.", source: "Bộ Y tế" },
  { id: 2, title: "Chế độ dinh dưỡng khuyến nghị từ WHO.", source: "Tổ chức Y tế Thế giới" },
  { id: 3, title: "Cập nhật về dịch bệnh tay chân miệng.", source: "Bộ Y tế" },
];

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [childId, setChildId] = useState<string | null>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hidden lg:block">
        <h2 className="text-2xl font-extrabold mb-8 text-gray-800 dark:text-gray-100">AutismCare</h2>
        <nav className="space-y-3">
          <a href="#" className="flex items-center space-x-3 py-3 px-4 rounded-xl text-white bg-blue-600 shadow-md font-semibold transition-all duration-200 hover:bg-blue-700">
            <BarChart2 size={20} />
            <span>Tổng quan</span>
          </a>
          <a href="#" className="flex items-center space-x-3 py-3 px-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <User size={20} />
            <span>Thông tin trẻ</span>
          </a>
          <a href="#" className="flex items-center space-x-3 py-3 px-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <BriefcaseMedical size={20} />
            <span>Thông tin y tế</span>
          </a>
          <a href="#" className="flex items-center space-x-3 py-3 px-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <MessageSquare size={20} />
            <span>Cộng đồng</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}

      <main className="flex-1 lg:ml-8">
        <Navbar />
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">Tổng quan</h1>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột chính bên trái */}
          <div className="lg:col-span-2 space-y-8">
            <WelcomeToast name={user?.name} />

            {/* Phần Thống kê */}
            <Card className="rounded-3xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Thống kê hoạt động hàng ngày</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Theo dõi tiến trình phát triển của bé qua các biểu đồ trực quan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DailyLogChart childId={childId || ""} />
              </CardContent>
            </Card>

            {/* Phần Thu thập thông tin hàng ngày */}
            <Card className="rounded-3xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Nhật ký hoạt động</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Ghi lại các hoạt động và cảm xúc của bé trong ngày.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DailyLogForm childId={childId || ""} />
              </CardContent>
            </Card>
          </div>

          {/* Cột phụ bên phải */}
          <div className="space-y-8">
            {/* Thẻ Thông tin trẻ */}
            <Card className="rounded-3xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Thông tin trẻ</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Hồ sơ sức khỏe và thông tin cơ bản của bé.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900">
                  <User size={48} className="text-blue-600 dark:text-blue-300" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">Tên: Bé An</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tiến trình: Đang cải thiện</p>
                </div>
              </CardContent>
            </Card>

            {/* Thẻ Tin tức & Thông báo */}
            <Card className="rounded-3xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Tin tức & Thông báo</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Cập nhật các thông tin mới nhất từ AutismCare.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {mockNotifications.map(notification => (
                    <li key={notification.id} className="flex items-start space-x-3 text-sm">
                      <Bell size={18} className="text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">{notification.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-6">
                  <a href="#" className="text-blue-600 hover:underline font-semibold">Xem tất cả</a>
                </div>
              </CardContent>
            </Card>

            {/* Thẻ Thông tin y tế công cộng */}
            <Card className="rounded-3xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Cập nhật y tế công cộng</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Thông tin chính thức từ Bộ Y tế.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {mockHealthUpdates.map(update => (
                    <li key={update.id} className="flex items-start space-x-3 text-sm">
                      <BriefcaseMedical size={18} className="text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">{update.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Nguồn: {update.source}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
