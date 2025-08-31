import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Heart className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold text-foreground">AutismCare</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Chào mừng trở lại</h1>
          <p className="text-muted-foreground">Đăng nhập để tiếp tục theo dõi sự phát triển của bé</p>
        </div>

        <LoginForm />

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
