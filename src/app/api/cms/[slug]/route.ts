import { NextResponse } from "next/server";
import { getCmsPage } from "@/lib/cms";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const content = await getCmsPage(slug);

  if (!content) {
    return NextResponse.json({ content: null }, { status: 404 });
  }

  return NextResponse.json({ content });
}
