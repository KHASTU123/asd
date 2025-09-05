// app/api/cron/sync/route.ts
import { syncAllData } from "@/app/api/rag/sync-all/route";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await syncAllData({}); // sync toàn bộ

    return Response.json({
      success: true,
      message: "Cron sync completed",
      data: result,
    });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
