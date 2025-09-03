"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Brain, Users } from "lucide-react";
import Image from "next/image";
export function HeroSection() {
  const images = ["/bg_dashboard_r.png", "/bg_dashboard.png"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 giây đổi ảnh
    return () => clearInterval(interval);
  }, [images.length]);

  const features = [
    { icon: Brain, text: "AI Phân tích" },
    { icon: Users, text: "Cộng đồng & Hỗ trợ" },
    { icon: Shield, text: "Bảo mật tuyệt đối" },
  ];

  return (
    <section className="relative overflow-hidden px-6 sm:px-12 pb-20 sm:pb-32 py-16 sm:py-24">
      
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center bg-fixed transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            style={{
              backgroundImage: `url(${img})`,
              filter: "blur(4px) brightness(0.6)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-transparent dark:from-black/70 dark:via-black/50 dark:to-transparent"></div>
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-0"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
     

      {/* Nội dung chính */}
      <div className="w-full relative z-10">
        <div className=" text-center">
          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 text-balance animate-fade-in-up pt-2">
            Phát hiện sớm tự kỷ với{" "}
            <span className="text-primary relative inline-block">
              AI thông minh
              <span className="absolute left-0 right-0 -bottom-2 h-1 bg-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="w-full text-center text-3xl lg:text-3xl font-extrabold text-green-800 mb-8 text-pretty animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Nền tảng hỗ trợ phụ huynh theo dõi phát triển của trẻ, đánh giá nguy
            cơ tự kỷ và can thiệp sớm hiệu quả thông qua công nghệ AI tiên tiến.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Link href="/auth/register">
              <Button
                size="lg"
                className="min-w-[250px] text-3xl font-semibold px-12 py-8 rounded-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-blue-600 hover:text-white"
              >
                Bắt đầu miễn phí
                <ArrowRight className="ml-2 h-6 w-6 animate-pulse" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[250px] text-3xl font-semibold px-12 py-8 rounded-2xl bg-transparent backdrop-blur-sm transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-gray-100"
              >
                Xem demo
              </Button>
            </Link>
            <a
              href="https://www.facebook.com/groups/ten-group-facebook-cua-ban"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="min-w-[250px] text-3xl font-semibold px-12 py-8 rounded-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-blue-600 hover:text-white"
              >
                Kết nối cộng đồng
                <ArrowRight className="ml-2 h-6 w-6 animate-pulse" />
              </Button>
            </a>
          </div>

          <div className="relative overflow-hidden mt-10">
            {/* Background blobs for visual interest */}
            <div className="absolute inset-0 z-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-8 text-center">
                Các Tính Năng Nổi Bật
              </h2>

              <div className="flex flex-wrap justify-center gap-6 mt-10 max-w-5xl mx-auto">
                {features.map((f, i) => (
                  <div
                    key={i}
                    // Thẻ bao bọc với hiệu ứng 3D và gradient
                    className="relative p-0.5 rounded-3xl group 
                         bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 
                         transform transition-transform duration-500 hover:scale-110 hover:rotate-3"
                  >
                    {/* Nội dung bên trong với hiệu ứng backdrop-blur và hover */}
                    <div
                      className="relative flex items-center gap-4 px-8 py-5 rounded-[calc(1.5rem-2px)] 
                           bg-white/5 dark:bg-gray-800/50 
                           border border-white/20 shadow-xl backdrop-blur-md
                           group-hover:bg-white/10 group-hover:dark:bg-gray-800/70
                           transition-colors duration-300"
                    >
                      <f.icon className="w-8 h-8 text-white group-hover:text-indigo-400 transition-colors" />
                      <span className="text-lg font-semibold text-white group-hover:text-white transition-colors">
                        {f.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
