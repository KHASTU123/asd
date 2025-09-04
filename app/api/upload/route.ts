import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob | null;

  if (!file) {
    return NextResponse.json({ success: false, message: "No file" }, { status: 400 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const preset = process.env.CLOUDINARY_UPLOAD_PRESET!; // unsigned preset trong Cloudinary

  const cloudForm = new FormData();
  cloudForm.append("file", file);
  cloudForm.append("upload_preset", preset);

  // Cloudinary tự nhận diện file ảnh/video
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: "POST",
    body: cloudForm,
  });

  if (!res.ok) {
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }

  const data = await res.json();

  return NextResponse.json({
    success: true,
    url: data.secure_url,
    kind: data.resource_type, // "image" | "video"
  });
}
