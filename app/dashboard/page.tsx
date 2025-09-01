"use client";
import React, { useEffect, useState } from "react";
import { WelcomeToast } from "@/components/dashboard/welcome-toast";
import { DailyLogForm } from "@/components/dashboard/daily-log-form";
import { DailyLogChart } from "@/components/dashboard/daily-log-chart";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [childId, setChildId] = useState<string | null>(null);

  useEffect(()=> {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
    // For demo: you should fetch children list /select one
    // setChildId("<CHILD_ID>");
  }, []);

  return (
    <main className="p-6 bg-gradient-to-b from-blue-50 to-indigo-50 min-h-screen">
      <WelcomeToast name={user?.name} />
      <section className="max-w-6xl mx-auto grid gap-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Xin chào, {user?.name || "Phụ huynh"}</h1>
            <p className="text-gray-600">Mỗi ngày là một niềm hy vọng nhỏ.</p>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 grid gap-6">
            <DailyLogForm childId={childId || ""} />
            <DailyLogChart childId={childId || ""} />
          </div>
          <div className="grid gap-6">
            {/* placeholders for AI/GroupChat */}
            <div className="bg-white rounded-2xl shadow p-4">Trợ lý AI (placeholder)</div>
            <div className="bg-white rounded-2xl shadow p-4">Cộng đồng / group chat (placeholder)</div>
          </div>
        </div>
      </section>
    </main>
  );
}
