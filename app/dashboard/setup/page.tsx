import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ChildSetupForm } from "@/components/dashboard/child-setup-form"

export default function SetupPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Thiết lập thông tin trẻ</h1>
          <p className="text-muted-foreground">
            Vui lòng cung cấp thông tin cơ bản về trẻ để chúng tôi có thể tùy chỉnh các bài đánh giá phù hợp.
          </p>
        </div>
        <ChildSetupForm />
      </div>
    </DashboardLayout>
  )
}
