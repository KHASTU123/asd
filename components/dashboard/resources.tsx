"use client"

import useSWR from "swr"
import { useState } from "react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function ResourcesDashboard() {
  const { data, error, isLoading, mutate } = useSWR("/api/resources", fetcher)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("pdf") // mặc định

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

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Lỗi khi tải dữ liệu</p>

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Thêm Tài Nguyên</h2>

      <form onSubmit={addResource} className="space-y-4">
        <input
          type="text"
          placeholder="Tên tài nguyên"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
          <option value="article">Article</option>
          <option value="hotline">Hotline</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm
        </button>
      </form>

      <div className="space-y-4">
        {data?.resources?.map((item: any) => (
          <div key={item._id} className="p-4 border rounded shadow">
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-xs text-gray-400">Category: {item.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
