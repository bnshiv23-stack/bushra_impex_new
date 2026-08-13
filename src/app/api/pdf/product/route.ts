import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/data/products";

// Static export compatible
export const dynamic = "force-static";

export async function GET(req: NextRequest) {
  return new NextResponse("PDF brochure available in full catalogue.", { status: 200 });
}


// ponytail: find Chrome/Edge on common install paths (Windows, Linux, Mac).
// On the actual deployment server this list should be pruned to what's available.
const CHROME_PATHS = [
  // Windows
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  // Linux (Render, Railway, etc.)
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
  // Mac
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

async function findChrome(): Promise<string | null> {
  const fs = await import("fs");
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get("slug");

  if (!slug) {
    return new NextResponse("Missing ?slug= parameter", { status: 400 });
  }

  const product = getProductBySlug(slug);
  if (!product) {
    return new NextResponse(`Product not found: ${slug}`, { status: 404 });
  }

  const executablePath = await findChrome();
  if (!executablePath) {
    return new NextResponse(
      "No Chrome/Edge browser found on server. Install Google Chrome or Microsoft Edge to enable PDF generation.",
      { status: 500 }
    );
  }

  // Build the print URL — same origin as the request
  const origin = req.nextUrl.origin;
  const printUrl = `${origin}/products/${product.category}/${product.slug}?print=true`;

  let pdfBuffer: Buffer;

  try {
    const puppeteer = await import("puppeteer-core");
    const browser = await puppeteer.default.launch({
      executablePath,
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--font-render-hinting=none",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123 }); // A4 at 96dpi

    // Navigate and wait for full network idle (images, fonts, JS)
    await page.goto(printUrl, { waitUntil: "networkidle0", timeout: 30_000 });

    // Wait for fonts to finish loading
    await page.evaluate(() => document.fonts.ready);

    // Ensure all images are decoded before printing
    await page.evaluate(async () => {
      const imgs = Array.from(document.images);
      await Promise.all(
        imgs
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise<void>((resolve) => {
                img.onload = img.onerror = () => resolve();
              })
          )
      );
    });

    const rawPdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    // page.pdf() returns Uint8Array — pass the underlying ArrayBuffer to NextResponse
    pdfBuffer = Buffer.from(rawPdf.buffer);

    await browser.close();
  } catch (err) {
    console.error("[PDF] Puppeteer error:", err);
    return new NextResponse("PDF generation failed. See server logs.", {
      status: 500,
    });
  }

  const safeModel = product.modelCode.replace(/[^a-zA-Z0-9_-]/g, "_");
  const filename = `X1_${safeModel}_Brochure.pdf`;

  return new NextResponse(pdfBuffer.buffer as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
