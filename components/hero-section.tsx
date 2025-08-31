import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Brain, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-full border">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-card-foreground">Được tin tưởng bởi hơn 10,000 gia đình</span>
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Phát hiện sớm tự kỷ với <span className="text-primary">AI thông minh</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Nền tảng hỗ trợ phụ huynh theo dõi phát triển của trẻ, đánh giá nguy cơ tự kỷ và can thiệp sớm hiệu quả
            thông qua công nghệ AI tiên tiến.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8">
                Bắt đầu miễn phí
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Xem demo
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">AI Phân tích</h3>
              <p className="text-sm text-muted-foreground">
                Thuật toán học máy phân tích hành vi và phát triển của trẻ
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Hỗ trợ 24/7</h3>
              <p className="text-sm text-muted-foreground">Đội ngũ chuyên gia tâm lý và bác sĩ nhi khoa hỗ trợ</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Bảo mật tuyệt đối</h3>
              <p className="text-sm text-muted-foreground">Dữ liệu được mã hóa và bảo vệ theo tiêu chuẩn y tế</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
