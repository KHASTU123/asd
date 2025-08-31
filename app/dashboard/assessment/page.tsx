import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AssessmentForm } from "@/components/dashboard/assessment-form"

export default function AssessmentPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Đánh giá hàng ngày</h1>
          <p className="text-muted-foreground">
            Hoàn thành bài đánh giá ngắn về hành vi và phát triển của trẻ hôm nay.
          </p>
        </div>
        <AssessmentForm />
      </div>
    </DashboardLayout>
  )
}
