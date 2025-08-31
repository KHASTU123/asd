import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, BarChart3, Phone, BookOpen, Users, AlertTriangle, CheckCircle } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Đánh giá hàng ngày",
      description: "Theo dõi phát triển của trẻ qua các bài test ngắn, dễ thực hiện hàng ngày.",
      color: "text-blue-600",
    },
    {
      icon: BarChart3,
      title: "Phân tích AI thông minh",
      description: "Thuật toán học máy phân tích dữ liệu và đưa ra đánh giá nguy cơ chính xác.",
      color: "text-primary",
    },
    {
      icon: Phone,
      title: "Liên hệ khẩn cấp",
      description: "Danh sách bác sĩ chuyên khoa và hotline hỗ trợ 24/7 khi cần thiết.",
      color: "text-red-600",
    },
    {
      icon: BookOpen,
      title: "Tài nguyên học tập",
      description: "Thư viện bài viết, video hướng dẫn và tài liệu từ các chuyên gia.",
      color: "text-purple-600",
    },
    {
      icon: Users,
      title: "Cộng đồng hỗ trợ",
      description: "Kết nối với các gia đình khác và chia sẻ kinh nghiệm, động viên lẫn nhau.",
      color: "text-orange-600",
    },
    {
      icon: CheckCircle,
      title: "Theo dõi tiến trình",
      description: "Dashboard trực quan hiển thị sự phát triển và cải thiện của trẻ theo thời gian.",
      color: "text-green-600",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Tính năng toàn diện</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hệ thống được thiết kế để hỗ trợ phụ huynh từ việc theo dõi, đánh giá đến can thiệp sớm hiệu quả.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-card p-2 rounded-lg">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 border">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-center text-foreground mb-4">Lưu ý quan trọng</h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Hệ thống cần <strong>ít nhất 3 ngày dữ liệu</strong> để có thể đưa ra đánh giá chính xác. Kết quả chỉ mang
            tính chất tham khảo và không thay thế cho chẩn đoán y khoa chuyên nghiệp.
          </p>
        </div>
      </div>
    </section>
  )
}
