import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import cloudinary from "@/lib/cloudinary";
// Định nghĩa Schema và Model cho Notification
const NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    source: String,
    link: String,
    image: String,
    date: { type: Date, default: Date.now },
});

// Kiểm tra và tạo lại model nếu đã tồn tại để tránh lỗi
const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

// URL kết nối tới MongoDB của bạn
const MONGO_URI = process.env.MONGO_URI;

/**
 * Hàm kết nối với MongoDB.
 */
async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        return; // Đã kết nối, không cần kết nối lạ
    }

    if (!MONGO_URI) {
        console.error('Lỗi: Vui lòng định nghĩa biến môi trường MONGO_URI.');
        return;
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB đã kết nối thành công.');
    } catch (error) {
        console.error('Kết nối MongoDB thất bại:', error);
        throw new Error('Kết nối MongoDB thất bại.');
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
        return NextResponse.json({ error: "Lấy thông báo thất bại.", message: (error as Error).message }, { status: 500 });
    }
}

/**
 * Xử lý yêu cầu POST để thêm một thông báo mới.
 * @param request Yêu cầu chứa dữ liệu thông báo mới (dưới dạng FormData).
 * @returns NextResponse xác nhận thông báo đã được thêm.
 */
export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const source = formData.get("source") as string;
    const link = formData.get("link") as string;
    const image = formData.get("image") as File | null;

    if (!title || !content) {
      return NextResponse.json({ error: "Tiêu đề và nội dung là bắt buộc." }, { status: 400 });
    }

    let imageUrl = null;
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload lên Cloudinary
      const uploadResult: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "notifications" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(buffer);
      });

      console.log("Cloudinary result:", uploadResult); // 👈 kiểm tra object trả về
      imageUrl = uploadResult.secure_url; // 👈 URL đầy đủ của ảnh
      console.log("Save imageUrl:", imageUrl);

    }

    const newNotification = new Notification({
      title,
      content,
      source,
      link,
      image: imageUrl,
    });

    await newNotification.save();
    return NextResponse.json({
      message: "Thêm thông báo thành công.",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Lỗi khi thêm thông báo:", error);
    return NextResponse.json(
      { error: "Thêm thông báo thất bại.", message: (error as Error).message },
      { status: 500 }
    );
  }
}
