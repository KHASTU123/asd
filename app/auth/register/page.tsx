import { RegisterForm } from "@/components/auth/register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">AutismCare</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Đăng ký tài khoản</CardTitle>
            <CardDescription>Tạo tài khoản để bắt đầu hành trình chăm sóc trẻ</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
