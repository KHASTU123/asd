"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

export function DashboardOverview() {
  const [childInfo, setChildInfo] = useState<any>(null)
  const [recentAssessments, setRecentAssessments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const childRes = await fetch("/api/child/info")
        const assessmentsRes = await fetch("/api/assessment/recent")

        const childData = await childRes.json()
        const assessmentsData = await assessmentsRes.json()

        setChildInfo(childData)
        setRecentAssessments(assessmentsData)
      } catch (error) {
        console.error("Lỗi khi load dữ liệu:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <p className="text-center text-muted-foreground">Đang tải dữ liệu...</p>
  }

  if (!childInfo) {
    return <p className="text-center text-red-500">Không có dữ liệu trẻ em</p>
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Chào mừng trở lại!</h1>
        <p className="text-muted-foreground">
          Theo dõi sự phát triển của {childInfo.name} và hoàn thành các bài đánh giá hàng ngày.
        </p>
      </div>

      {/* Progress Alert */}
      <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <div className="flex-1">
              <p className="font-medium text-orange-800 dark:text-orange-200">
                Cần thêm {childInfo.requiredDays - childInfo.assessmentDays} ngày đánh giá
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-300">
                Hoàn thành ít nhất 3 ngày đánh giá để nhận kết quả phân tích AI
              </p>
            </div>
            <Link href="/dashboard/assessment">
              <Button size="sm">
                Đánh giá ngay
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ngày đánh giá</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{childInfo.assessmentDays}/3</div>
            <Progress value={(childInfo.assessmentDays / 3) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Điểm trung bình</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{childInfo.avgScore}</div>
            <p className="text-xs text-muted-foreground">+2.5% so với tuần trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{childInfo.completed}</div>
            <p className="text-xs text-muted-foreground">Bài đánh giá đã hoàn thành</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thời gian còn lại</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{childInfo.daysLeft}</div>
            <p className="text-xs text-muted-foreground">Ngày để hoàn thành đánh giá</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Đánh giá gần đây</CardTitle>
            <CardDescription>Kết quả các bài đánh giá trong 3 ngày qua</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssessments.map((assessment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {assessment.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-orange-600" />
                    )}
                    <span className="text-sm font-medium">
                      {new Date(assessment.date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div className="text-sm">
                    {assessment.status === "completed" ? (
                      <span className="font-medium">{assessment.score}/100</span>
                    ) : (
                      <span className="text-muted-foreground">Chưa hoàn thành</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin trẻ</CardTitle>
            <CardDescription>Thông tin cơ bản về {childInfo.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tên:</span>
                <span className="text-sm font-medium">{childInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tuổi:</span>
                <span className="text-sm font-medium">{childInfo.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ngày tham gia:</span>
                <span className="text-sm font-medium">{childInfo.joinDate}</span>
              </div>
              <Link href="/dashboard/settings">
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                  Chỉnh sửa thông tin
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
