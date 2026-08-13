import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";

// Static export compatible
export const dynamic = "force-static";


const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
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
  const p = searchParams.get("p"); // comma-separated slugs

  if (!p) {
    return new NextResponse("Missing ?p= parameter (comma-separated slugs)", { status: 400 });
  }

  const slugs = p.split(",").map((s) => s.trim()).filter(Boolean);
  const products = slugs
    .map((slug) => PRODUCTS.find((prod) => prod.slug === slug))
    .filter(Boolean);

  if (products.length === 0) {
    return new NextResponse("No valid products found", { status: 404 });
  }

  const executablePath = await findChrome();
  if (!executablePath) {
    return new NextResponse(
      "No Chrome/Edge browser found on server. Install Google Chrome or Microsoft Edge to enable PDF generation.",
      { status: 500 }
    );
  }

  const origin = req.nextUrl.origin;
  // Use the existing comparison page in print mode
  const printUrl = `${origin}/compare?p=${p}&print=true`;

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
    // A3 landscape works well for side-by-side comparison tables
    await page.setViewport({ width: 1123, height: 794 });

    await page.goto(printUrl, { waitUntil: "networkidle0", timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);

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
      format: "A3",
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    pdfBuffer = Buffer.from(rawPdf.buffer);

    await browser.close();
  } catch (err) {
    console.error("[PDF] Comparison Puppeteer error:", err);
    return new NextResponse("Comparison PDF generation failed. See server logs.", {
      status: 500,
    });
  }

  const modelNames = products
    .map((prod) => prod!.modelCode.replace(/[^a-zA-Z0-9_-]/g, "_"))
    .join("_vs_");
  const filename = `X1_Compare_${modelNames}.pdf`;

  return new NextResponse(pdfBuffer.buffer as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
