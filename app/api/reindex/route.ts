import { NextRequest, NextResponse } from "next/server";
import { notifyGoogleIndexing, batchNotifyGoogleIndexing } from "@/lib/google-indexing";

export async function POST(request: NextRequest) {
  try {
    // Verify API key for security
    const authHeader = request.headers.get("authorization");
    const apiKey = process.env.REINDEX_API_KEY;

    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { urls, url } = body;

    if (url) {
      const result = await notifyGoogleIndexing(url);
      return NextResponse.json(result);
    }

    if (urls && Array.isArray(urls)) {
      const results = await batchNotifyGoogleIndexing(urls);
      return NextResponse.json({
        total: results.length,
        successful: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length,
        results,
      });
    }

    return NextResponse.json(
      { error: "Provide 'url' or 'urls' in request body" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
