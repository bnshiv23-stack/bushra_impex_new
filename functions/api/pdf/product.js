/**
 * Cloudflare Pages Function: /api/pdf/product
 * Generates a product brochure PDF using Cloudflare Browser Rendering
 * (the BROWSER binding) and @cloudflare/puppeteer.
 *
 * Query params:
 *   slug     - product slug, e.g. "750-pto-kibao"
 *   category - product category slug, e.g. "weeders"
 *
 * The function opens the product page at ?print=true, which renders
 * only the <PrintBrochure> component (existing logic in ProductDetailClient).
 */

import puppeteer from "@cloudflare/puppeteer";

export const onRequest = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  const slug = url.searchParams.get("slug");
  const category = url.searchParams.get("category");

  // Validate inputs
  if (!slug || !category) {
    return new Response(
      JSON.stringify({ error: "Missing required query params: slug, category" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Guard: Browser binding must exist (only available on CF Pages/Workers)
  if (!env.BROWSER) {
    return new Response(
      "Browser Rendering binding (BROWSER) is not configured. " +
        "Add [browser]\nbinding = \"BROWSER\" to wrangler.toml and ensure " +
        "Browser Rendering is enabled in your Cloudflare Pages project.",
      { status: 503 }
    );
  }

  // Build the print URL
  // The page at ?print=true renders <PrintBrochure product={product} /> only.
  const origin = url.origin;
  const printUrl = `${origin}/products/${encodeURIComponent(category)}/${encodeURIComponent(slug)}?print=true`;

  let browser = null;

  try {
    // Launch Cloudflare headless browser
    browser = await puppeteer.launch(env.BROWSER);
    const page = await browser.newPage();

    // A4 viewport for accurate CSS layout
    await page.setViewport({ width: 794, height: 1123 });

    // Navigate and wait until network is fully idle (all images loaded)
    await page.goto(printUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Extra settle time for fonts / late-loading images
    await new Promise((r) => setTimeout(r, 1500));

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: false,
    });

    // Return the PDF binary
    const safeSlug = slug.replace(/[^a-zA-Z0-9_-]/g, "_");
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="X1_Power_${safeSlug}_Brochure.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[PDF Worker] Error:", err);
    return new Response(
      `PDF generation failed: ${err instanceof Error ? err.message : String(err)}`,
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
