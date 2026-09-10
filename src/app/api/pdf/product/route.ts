import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");

  if (!slug || !category) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  const printUrl = new URL(
    `/products/${encodeURIComponent(category)}/${encodeURIComponent(slug)}?print=true`,
    request.url
  );

  return NextResponse.redirect(printUrl, 302);
}
