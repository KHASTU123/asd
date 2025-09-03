import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative bg-background dark:bg-gray-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20">
        <div
          className="w-full h-full animate-gradient-slow-pulse"
          style={{
            backgroundImage:
              "linear-gradient(25deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* 3 cột */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center lg:text-left items-start">
          {/* Cột trái: Logo + social */}
          <div className="flex flex-col items-center lg:items-start">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <Heart className="h-12 w-12 text-primary animate-pulse-slow" />
              <span className="text-4xl font-extrabold text-foreground">AutismCare</span>
            </Link>
            <p className="text-xl text-muted-foreground max-w-sm mb-8">
              Nền tảng AI đồng hành cùng gia đình trên hành trình chăm sóc trẻ tự kỷ.
            </p>
            <div className="flex space-x-6 mt-2">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Cột giữa: Thông tin liên hệ */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-2xl font-bold text-foreground mb-6">Thông tin liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-xl text-muted-foreground">support@autismcare.vn</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-xl text-muted-foreground">1900 1234</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-xl text-muted-foreground">Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>

          {/* Cột phải: Ảnh chủ sở hữu / trường */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/owner.jpg" // 👉 thay bằng ảnh thật của bạn
              alt="Người sở hữu AutismCare"
              width={280}
              height={280}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-16 pt-8 text-center">
          <p className="text-muted-foreground text-base opacity-80">
            © 2024 AutismCare. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
