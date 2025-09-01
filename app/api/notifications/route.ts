import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Định nghĩa Schema và Model cho Notification
const NotificationSchema = new mongoose.Schema({
    title: String,
    content: String,
    source: String,
    link: String,
    date: { type: Date, default: Date.now },
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

// URL kết nối tới MongoDB của bạn
const MONGO_URI = process.env.MONGO_URI;

/**
 * Hàm kết nối với MongoDB
 */
async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    if (!MONGO_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw new Error('MongoDB connection failed');
    }
}

/**
 * Xử lý yêu cầu GET để lấy tất cả các thông báo từ MongoDB.
 * @returns NextResponse chứa danh sách thông báo.
 */
export async function GET() {
    try {
        await connectDB();
        const notifications = await Notification.find({}).sort({ date: -1 });
        return NextResponse.json(notifications);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch notifications." }, { status: 500 });
    }
}

/**
 * Xử lý yêu cầu POST để thêm một thông báo mới.
 * @param request Yêu cầu chứa dữ liệu thông báo mới.
 * @returns NextResponse xác nhận thông báo đã được thêm.
 */
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        
        // Kiểm tra các trường dữ liệu cần thiết
        if (!body.title || !body.content) {
            return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
        }

        const newNotification = new Notification(body);
        await newNotification.save();
        return NextResponse.json({ message: "Notification added successfully.", notification: newNotification });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add notification.", message: (error as Error).message }, { status: 500 });
    }
}
