import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Định nghĩa Schema và Model cho HealthUpdate
const HealthUpdateSchema = new mongoose.Schema({
    title: String,
    source: String,
    date: { type: Date, default: Date.now },
});

const HealthUpdate = mongoose.models.HealthUpdate || mongoose.model('HealthUpdate', HealthUpdateSchema);

// URL kết nối tới MongoDB của bạn
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Hàm kết nối với MongoDB
 */
async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw new Error('MongoDB connection failed');
    }
}

/**
 * Xử lý yêu cầu GET để lấy tất cả các cập nhật y tế từ MongoDB.
 * @returns NextResponse chứa danh sách cập nhật y tế.
 */
export async function GET() {
    try {
        await connectDB();
        const healthUpdates = await HealthUpdate.find({}).sort({ date: -1 }); // Sắp xếp theo ngày mới nhất
        return NextResponse.json(healthUpdates);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch health updates." }, { status: 500 });
    }
}

/**
 * Xử lý yêu cầu POST để thêm một cập nhật y tế mới.
 * @param request Yêu cầu chứa dữ liệu cập nhật y tế mới.
 * @returns NextResponse xác nhận cập nhật đã được thêm.
 */
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const newUpdate = new HealthUpdate(body);
        await newUpdate.save();
        return NextResponse.json({ message: "Health update added successfully.", update: newUpdate });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add health update.", message: (error as Error).message }, { status: 500 });
    }
}
