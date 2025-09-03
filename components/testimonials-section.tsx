"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";

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
      content:
        "Giao diện dễ sử dụng, các bài test không mất nhiều thời gian. Kết quả AI rất chính xác và hữu ích.",
      rating: 5,
    },
    {
      name: "Chị Lê Thị Mai",
      role: "Mẹ của bé Khang (5 tuổi)",
      content:
        "Đội ngũ hỗ trợ rất tận tình. Tôi luôn nhận được tư vấn kịp thời khi có thắc mắc về sự phát triển của con.",
      rating: 5,
    },
    {
      name: "Anh Hoàng Nam",
      role: "Phụ huynh tại Hà Nội",
      content:
        "Tôi thực sự ấn tượng với cộng đồng mà AutismCare đã xây dựng. Cảm thấy mình không còn đơn độc trên hành trình này.",
      rating: 5,
    },
  ];

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 24 },
      },
    },
  });

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <section className="py-20 lg:py-32 bg-background dark:bg-gray-950 relative">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Phụ huynh nói gì về chúng tôi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hàng nghìn gia đình đã tin tưởng và đạt được kết quả tích cực với AutismCare.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
  <div ref={sliderRef} className="keen-slider w-full overflow-hidden">
    {testimonials.map((testimonial, index) => (
      <div
        key={index}
        className="keen-slider__slide w-full max-w-full flex-shrink-0"
      >
        <Card className="w-full h-full border-none rounded-none shadow-none bg-green-50 dark:bg-gray-800">
          <CardContent className="flex flex-col justify-between h-full w-full">
            <div className="flex items-start mb-4">
              <Quote className="h-10 w-10 text-primary/30 flex-shrink-0" />
              <div className="flex ml-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
            <p className="text-foreground text-lg md:text-xl mb-6 italic leading-relaxed flex-grow">
              "{testimonial.content}"
            </p>
            <div>
              <p className="font-bold text-lg text-foreground">
                {testimonial.name}
              </p>
              <p className="text-base text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    ))}
  </div>
</div>


      </div>
    </section >
  );
}
