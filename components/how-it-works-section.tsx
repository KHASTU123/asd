import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Calendar, Brain, FileText } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      title: "Đăng ký tài khoản",
      description: "Tạo tài khoản và thêm thông tin cơ bản về trẻ của bạn.",
      step: "01",
    },
    {
      icon: Calendar,
      title: "Thực hiện đánh giá hàng ngày",
      description: "Hoàn thành các bài test ngắn về hành vi và phát triển của trẻ mỗi ngày.",
      step: "02",
    },
    {
      icon: Brain,
      title: "AI phân tích dữ liệu",
      description: "Hệ thống AI phân tích dữ liệu từ ít nhất 3 ngày để đưa ra đánh giá.",
      step: "03",
    },
    {
      icon: FileText,
      title: "Nhận kết quả và hướng dẫn",
      description: "Xem báo cáo chi tiết và nhận tư vấn từ các chuyên gia.",
      step: "04",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Cách thức hoạt động</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quy trình đơn giản, khoa học và hiệu quả để hỗ trợ phụ huynh theo dõi sự phát triển của trẻ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="relative mb-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>

              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
