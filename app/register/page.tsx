import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Heart className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold text-foreground">AutismCare</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Tạo tài khoản mới</h1>
          <p className="text-muted-foreground">Bắt đầu hành trình chăm sóc và theo dõi sự phát triển của bé</p>
        </div>

        <RegisterForm />

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
