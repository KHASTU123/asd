"use client"

import useSWR from "swr"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function ResourcesDashboard() {
  const { data, error, isLoading, mutate } = useSWR("/api/resources", fetcher)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("pdf")

  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const addResource = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !category) return

    await fetch("/api/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category }),
    })

    setTitle("")
    setDescription("")
    mutate()
  }

  const getEmoji = (cat: string) => {
    switch (cat) {
      case "pdf": return "📄"
      case "video": return "🎥"
      case "article": return "📰"
      case "hotline": return "📞"
      default: return "📋"
    }
  }

  const filteredResources = data?.resources?.filter((item: any) => {
    const matchesSearch = (item.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                          (item.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    return matchesSearch && matchesCategory
  }) || []

  if (isLoading) return <p className="text-center text-muted-foreground">Đang tải...</p>
  if (error) return <p className="text-center text-red-500">Lỗi khi tải dữ liệu</p>

  return (
    <div className="space-y-6 p-6 bg-gradient-to-b from-[#AED6F1] to-[#D7BDE2] dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg font-nunito">
      <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center justify-center space-x-3">
        <span className="text-4xl">🧩</span>
        <span>Quản lý Tài Nguyên Hỗ Trợ</span>
        <span className="text-4xl">📚</span>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
      >
        <h3 className="text-2xl font-semibold text-foreground mb-4">Thêm Tài Nguyên Mới</h3>
        <form onSubmit={addResource} className="space-y-4">
          <Input
            type="text"
            placeholder="Tên tài nguyên (ví dụ: Hướng dẫn giao tiếp cơ bản)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border-2 border-[#FFE4B5] rounded-lg focus:ring-2 focus:ring-[#ABEBC6] transition-all bg-transparent"
            required
          />
          <Textarea
            placeholder="Mô tả ngắn gọn (ví dụ: Tài liệu PDF về các bài tập hàng ngày cho trẻ)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border-2 border-[#FFE4B5] rounded-lg focus:ring-2 focus:ring-[#ABEBC6] transition-all bg-transparent"
            rows={4}
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full p-3 border-2 border-[#FFE4B5] rounded-lg bg-transparent focus:ring-2 focus:ring-[#ABEBC6]">
              <SelectValue placeholder="Chọn loại tài nguyên" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <SelectItem value="pdf">PDF {getEmoji("pdf")}</SelectItem>
              <SelectItem value="video">Video {getEmoji("video")}</SelectItem>
              <SelectItem value="article">Article {getEmoji("article")}</SelectItem>
              <SelectItem value="hotline">Hotline {getEmoji("hotline")}</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ABEBC6] to-[#AED6F1] text-foreground font-semibold py-3 rounded-lg hover:from-[#AED6F1] hover:to-[#ABEBC6] transition-all"
          >
            Thêm Tài Nguyên Mới ✨
          </Button>
        </form>
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground text-center">Tìm Kiếm & Lọc Tài Nguyên</h3>
        <Input
          placeholder="Tìm kiếm theo tên hoặc mô tả... (ví dụ: giao tiếp)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border-2 border-[#D7BDE2] rounded-lg focus:ring-2 focus:ring-[#FFE4B5] transition-all bg-white/80 dark:bg-gray-800/80"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full p-3 border-2 border-[#D7BDE2] rounded-lg bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-[#FFE4B5]">
            <SelectValue placeholder="Lọc theo loại" />
          </SelectTrigger>
          <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <SelectItem value="all">Tất cả Loại 📋</SelectItem>
            <SelectItem value="pdf">PDF {getEmoji("pdf")}</SelectItem>
            <SelectItem value="video">Video {getEmoji("video")}</SelectItem>
            <SelectItem value="article">Article {getEmoji("article")}</SelectItem>
            <SelectItem value="hotline">Hotline {getEmoji("hotline")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((item: any, index: number) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            className="p-6 border-2 border-[#FFE4B5] rounded-xl bg-gradient-to-br from-[#D7BDE2]/30 to-[#AED6F1]/30 dark:from-purple-900/30 dark:to-blue-900/30 shadow-md cursor-pointer transition-all"
          >
            <h3 className="font-bold text-xl text-foreground mb-2 flex items-center space-x-3">
              <span className="text-3xl">{getEmoji(item.category)}</span>
              <span>{item.title}</span>
            </h3>
            <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
            <p className="text-xs text-muted-foreground italic">Loại: {item.category.toUpperCase()}</p>
          </motion.div>
        ))}
        {filteredResources.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground text-lg">Không tìm thấy tài nguyên phù hợp. Hãy thử tìm kiếm khác! 🔍</p>
        )}
      </div>
    </div>
  )
}