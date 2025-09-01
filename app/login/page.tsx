import { RegisterForm } from "@/components/auth/register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch">
      {/* Cột bên trái: Hình ảnh */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 bg-cover bg-center transition-all duration-300 relative" style={{ backgroundImage: "url('/file_content/images (4).jfif-b0760814-3f8a-40bf-b656-5f317b3ce714')" }}>
        <div className="absolute inset-0 bg-blue-900/40"></div>
        <div className="relative text-center text-white p-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Chào mừng bạn đến với AutismCare
          </h1>
          <p className="text-lg lg:text-xl font-light drop-shadow-lg">
            Kết nối, đồng hành và sẻ chia cùng cộng đồng để chăm sóc trẻ tốt hơn.
          </p>
        </div>
      </div>

      {/* Cột bên phải: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 lg:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 md:hidden">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">AutismCare</span>
            </Link>
          </div>

          <Card className="rounded-2xl shadow-lg border-none">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Đăng ký tài khoản</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Tạo tài khoản để bắt đầu hành trình chăm sóc trẻ</CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
              <div className="text-center mt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Đã có tài khoản?{" "}
                  <Link href="/auth/login" className="text-blue-600 hover:underline font-semibold">
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}