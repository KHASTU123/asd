"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4560", "#26A69A"];

export default function SummaryCharts({ childId }: { childId: string }) {
  const [moodData, setMoodData] = useState<{ name: string; value: number }[]>([]);
  const [sleepData, setSleepData] = useState<{ name: string; value: number }[]>([]);
  const [activities, setActivities] = useState<string[]>([]);

  useEffect(() => {
    if (!childId) return;

    (async () => {
      try {
        const res = await fetch(`/api/daily-log/summary?childId=${childId}`);
        if (!res.ok) {
          console.error("Failed to fetch summary:", await res.text());
          return;
        }

        const data = await res.json();

        // Pie chart cho mood
        const moods = Object.entries(data.moods || {}).map(([k, v]) => ({
          name: k,
          value: v as number,
        }));

        // Bar chart cho sleep
        const sleep = [{ name: "Giấc ngủ TB", value: data.sleep || 0 }];

        setMoodData(moods);
        setSleepData(sleep);
        setActivities(data.activities || []);
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
    })();
  }, [childId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {/* Biểu đồ tâm trạng */}
      <Card className="rounded-3xl shadow-lg border-none">
        <CardHeader>
          <CardTitle>Tỷ lệ tâm trạng</CardTitle>
          <CardDescription>Tổng hợp tâm trạng trẻ theo ngày</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={moodData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {moodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Hoạt động ghi nhận */}
      <Card className="rounded-3xl shadow-lg border-none">
        <CardHeader>
          <CardTitle>Hoạt động ghi nhận</CardTitle>
          <CardDescription>Các ghi chú quan trọng từ nhật ký</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm list-disc pl-5 space-y-1 max-h-48 overflow-y-auto">
            {activities.length > 0 ? (
              activities.map((a, i) => <li key={i}>{a}</li>)
            ) : (
              <p className="text-gray-500">Chưa có ghi chú nào</p>
            )}
          </ul>
        </CardContent>
      </Card>

      {/* Biểu đồ giấc ngủ */}
      <Card className="rounded-3xl shadow-lg border-none">
        <CardHeader>
          <CardTitle>Giấc ngủ (giờ)</CardTitle>
          <CardDescription>Trung bình số giờ ngủ trong nhật ký</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
