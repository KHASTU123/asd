import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Calendar, Brain, FileText } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      title: "Đăng ký tài khoản",
      description: "Tạo tài khoản và thêm thông tin cơ bản về trẻ của bạn một cách dễ dàng và nhanh chóng.",
      step: "01",
    },
    {
      icon: Calendar,
      title: "Thực hiện đánh giá hàng ngày",
      description: "Hoàn thành các bài test ngắn, thú vị về hành vi và phát triển của trẻ mỗi ngày.",
      step: "02",
    },
    {
      icon: Brain,
      title: "AI phân tích dữ liệu",
      description: "Hệ thống AI tiên tiến của chúng tôi sẽ tự động phân tích dữ liệu để đưa ra đánh giá chính xác.",
      step: "03",
    },
    {
      icon: FileText,
      title: "Nhận kết quả và hướng dẫn",
      description: "Xem báo cáo chi tiết, nhận các bài tập cá nhân hóa và tư vấn từ chuyên gia.",
      step: "04",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4 animate-fade-in-up">
        Quy trình 4 bước đơn giản
      </h2>
      <p
        className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        Bắt đầu hành trình đồng hành cùng con với một quy trình khoa học, hiệu quả và hoàn toàn tự động.
      </p>
    </div>

    {/* Grid dọc */}
    <div className="grid grid-cols-1 gap-16 max-w-2xl mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="relative flex flex-col items-center">
          {/* Card */}
          <Card
            className="w-full text-center p-6 border-none shadow-lg rounded-2xl 
                       transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                       bg-green-50 dark:bg-gray-800"
          >
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-primary/10">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 
                                bg-primary text-primary-foreground w-10 h-10 rounded-full 
                                flex items-center justify-center text-lg font-bold shadow-md">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-base">{step.description}</p>
            </CardContent>
          </Card>

          {/* Connector Arrow xuống bước tiếp theo */}
          {index < steps.length - 1 && (
            <div className="absolute -bottom-12 flex justify-center">
              <svg
                className="h-12 w-6 text-primary animate-pulse"
                viewBox="0 0 24 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="0" x2="12" y2="36" strokeDasharray="4,4" />
                <polygon points="6,36 18,36 12,48" fill="currentColor" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

  );
}