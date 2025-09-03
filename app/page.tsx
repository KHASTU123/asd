// app/page.tsx hoặc app/home/page.tsx

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Thanh điều hướng */}
      <Navbar />

      {/* Nội dung chính */}
      <main className="flex-1 flex flex-col gap-y-0">
        {/* Khối 1: Hero & Features */}
        <div className="flex flex-col lg:flex-row relative z-10 overflow-hidden">
          {/* Vùng trái */}
          <div className="bg-gray-50 dark:bg-gray-600 rounded-none relative w-full">
            <HeroSection />

          </div>
        </div>

        {/* Khối 2 + 3: How It Works + Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full relative z-20">
          {/* Cột trái: Quy trình bốn bước */}
          <div className="bg-white dark:bg-gray-800 p-8 flex items-center justify-center">
            <HowItWorksSection />
          </div>

          {/* Cột phải: Phụ huynh nói gì */}
          <div className="bg-gray-50 dark:bg-gray-900 p-8 overflow-hidden">
            <TestimonialsSection />
          </div>
        </div>

      </main>

      {/* Chân trang */}
      <Footer />
    </div>
  );
}
