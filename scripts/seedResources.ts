// scripts/seedResources.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Resource from "../app/models/Resource";

async function main() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI required");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected");

  const items = [
    {
      title: "Hướng dẫn chăm sóc trẻ tự kỷ - Mẫu",
      category: "guide",
      summary: "Hướng dẫn chăm sóc cơ bản cho phụ huynh",
      content: "Nội dung mẫu: các bước chăm sóc, liên hệ chuyên gia, nguồn tham khảo...",
      isFeatured: true
    },
    {
      title: "Tài liệu học thuật: can thiệp sớm",
      category: "academic",
      summary: "Tổng quan về can thiệp sớm",
      content: "Nội dung tóm tắt...",
    }
  ];

  await Resource.deleteMany({});
  await Resource.insertMany(items);
  console.log("Seeded", items.length);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
