import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Chị Nguyễn Thị Lan",
      role: "Mẹ của bé Minh (4 tuổi)",
      content:
        "Nhờ có AutismCare, tôi đã phát hiện sớm các dấu hiệu và can thiệp kịp thời cho con. Giờ bé đã có tiến bộ rõ rệt.",
      rating: 5,
    },
    {
      name: "Anh Trần Văn Hùng",
      role: "Bố của bé An (3 tuổi)",
      content: "Giao diện dễ sử dụng, các bài test không mất nhiều thời gian. Kết quả AI rất chính xác và hữu ích.",
      rating: 5,
    },
    {
      name: "Chị Lê Thị Mai",
      role: "Mẹ của bé Khang (5 tuổi)",
      content:
        "Đội ngũ hỗ trợ rất tận tình. Tôi luôn nhận được tư vấn kịp thời khi có thắc mắc về sự phát triển của con.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Phụ huynh nói gì về chúng tôi</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hàng nghìn gia đình đã tin tưởng và đạt được kết quả tích cực với AutismCare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary/20 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>

                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
