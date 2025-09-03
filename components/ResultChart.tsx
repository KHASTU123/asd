"use client"
import React from 'react';

// Định nghĩa kiểu dữ liệu cho props của component
interface Score {
  domain: string;
  value: number;
}

interface ResultChartProps {
  domainScores: Score[];
  overallRisk: number;
}

// Hàm để xác định màu sắc dựa trên giá trị rủi ro
const getRiskColor = (value: number) => {
  if (value >= 0.6) return 'bg-red-500';
  if (value >= 0.4) return 'bg-yellow-500';
  return 'bg-green-500';
};

const getRiskLabel = (value: number) => {
  if (value >= 0.6) return 'Cao';
  if (value >= 0.4) return 'Trung bình';
  return 'Thấp';
};

export  function ResultChart({ domainScores, overallRisk }: ResultChartProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-200 w-full max-w-lg mx-auto font-sans">
      <h2 className="text-2xl font-bold text-center text-emerald-800 mb-6">
        Kết quả Phân tích
      </h2>

      {/* Hiển thị điểm rủi ro tổng thể */}
      <div className="flex items-center justify-between p-4 mb-4 rounded-xl border border-gray-200">
        <span className="text-lg font-semibold">Tổng rủi ro:</span>
        <div className={`px-4 py-2 rounded-full font-bold text-white ${getRiskColor(overallRisk)}`}>
          {getRiskLabel(overallRisk)}
        </div>
      </div>

      {/* Biểu đồ cột */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-2">Điểm rủi ro theo lĩnh vực</h3>
        {domainScores.map((score, index) => (
          <div key={index} className="flex items-center space-x-4">
            {/* Tên lĩnh vực */}
            <span className="w-16 font-medium text-right text-gray-600">
              {score.domain}
            </span>
            {/* Thanh biểu đồ */}
            <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${getRiskColor(score.value)}`}
                style={{ width: `${(score.value * 100).toFixed(0)}%` }}
              ></div>
            </div>
            {/* Giá trị phần trăm */}
            <span className="w-12 text-right font-medium">
              {(score.value * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
