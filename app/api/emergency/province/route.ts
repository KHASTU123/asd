import { NextResponse } from "next/server"
import mongoose from "mongoose"
import { Emergency } from "../../../models/Emergency"

let isConnected = false

async function connectDB() {
  if (isConnected) return
  await mongoose.connect(process.env.MONGO_URI as string)
  isConnected = true
}

// 📌 POST: Thêm province vào region
export async function POST(req: Request) {
  await connectDB()
  try {
    const { regionId, province } = await req.json()

    const region = await Emergency.findById(regionId)
    if (!region) return NextResponse.json({ error: "Region not found" }, { status: 404 })

    region.provinces.push(province)
    await region.save()

    return NextResponse.json(region)
  } catch (err) {
    return NextResponse.json({ error: "Failed to add province" }, { status: 500 })
  }
}

// 📌 PATCH: Cập nhật province
export async function PATCH(req: Request) {
  await connectDB()
  try {
    const { regionId, provinceId, update } = await req.json()

    const region = await Emergency.findById(regionId)
    if (!region) return NextResponse.json({ error: "Region not found" }, { status: 404 })

    const province = region.provinces.id(provinceId)
    if (!province) return NextResponse.json({ error: "Province not found" }, { status: 404 })

    Object.assign(province, update)
    await region.save()

    return NextResponse.json(region)
  } catch (err) {
    return NextResponse.json({ error: "Failed to update province" }, { status: 500 })
  }
}

// 📌 DELETE: Xóa province
export async function DELETE(req: Request) {
  await connectDB()
  try {
    const { regionId, provinceId } = await req.json()

    const region = await Emergency.findById(regionId)
    if (!region) return NextResponse.json({ error: "Region not found" }, { status: 404 })

    region.provinces = region.provinces.filter((p: any) => p._id.toString() !== provinceId)
    await region.save()

    return NextResponse.json(region)
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete province" }, { status: 500 })
  }
}
