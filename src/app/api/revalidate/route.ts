import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CMS_CACHE_TAG } from "@/lib/cms";

/**
 * Called by the admin after a page is published, so edits show up straight
 * away even though CMS content is cached for a day (see getCmsPage).
 *
 * The secret travels in a header rather than the query string so it never
 * lands in request-path logs.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Revalidation is not configured." },
      { status: 503 },
    );
  }

  const header = request.headers.get("authorization") ?? "";
  const provided = Buffer.from(header.replace(/^Bearer\s+/i, ""));
  const expected = Buffer.from(secret);
  if (
    provided.length !== expected.length ||
    !timingSafeEqual(provided, expected)
  ) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // expire: 0 rather than "max": with stale-while-revalidate the admin who
  // just published would be served the old page once before it refreshed.
  revalidateTag(CMS_CACHE_TAG, { expire: 0 });

  return NextResponse.json({ revalidated: true });
}
