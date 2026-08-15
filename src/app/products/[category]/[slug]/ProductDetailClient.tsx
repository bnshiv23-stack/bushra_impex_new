"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES, getProductBySlug, getProductsByCategory, Product, getAccessoryImage, getOptimizedProductTitle } from "@/data/products";
import {
  ArrowRight, Download, Phone, Share2, CheckSquare,
  Settings2, Gauge, Zap, Fuel, ChevronRight, GitCompareArrows, Check, Loader2
} from "lucide-react";
import ProductImageZoom from "@/components/ProductImageZoom";
import { useCompare } from "@/components/CompareContext";
import PrintBrochure from "@/components/PrintBrochure";

// ─── Application areas per category ─────────────────────────
const BASE_APPLICATIONS: Record<string, { label: string; desc: string }[]> = {
  weeders: [
    { label: "Paddy / Rice Fields", desc: "Ideal for inter-row weeding and soil aeration in wet and dry paddy cultivation." },
    { label: "Vegetable Farming", desc: "Used for bed preparation and weed management in vegetable plots." },
    { label: "Orchard Cultivation", desc: "Suitable for inter-row soil cultivation under mango, coconut and arecanut trees." },
    { label: "Sugarcane Fields", desc: "Effective for earthing up and weed control in sugarcane rows." },
    { label: "Groundnut & Soybean", desc: "Used for inter-crop cultivation and row weeding in oilseed crops." },
    { label: "Ridging & Furrow Making", desc: "Ridger rod attachment enables seed bed preparation and furrow formation." },
  ],
  chainsaws: [
    { label: "Tree Felling", desc: "Designed for clean, controlled felling of trees up to large diameters." },
    { label: "Branch Trimming", desc: "Used for limbing and pruning branches from standing or felled trees." },
    { label: "Timber Cutting", desc: "Suitable for cutting logs into lengths for firewood and timber processing." },
    { label: "Land Clearing", desc: "Effective for clearing shrubs, dense undergrowth and small trees." },
    { label: "Forestry Operations", desc: "Used by forest departments and plantation companies for periodic clearing." },
  ],
  "chaff-cutters": [
    { label: "Cattle Feed Preparation", desc: "Chops paddy straw, wheat straw and green fodder for dairy cattle." },
    { label: "Goat & Sheep Fodder", desc: "Cuts grass and silage into small lengths suitable for small ruminants." },
    { label: "Silage Making", desc: "Chops corn stalk and green material to uniform size for silage storage." },
    { label: "Compost Preparation", desc: "Used to shred crop residues into small pieces to accelerate composting." },
    { label: "Poultry Bedding", desc: "Cuts straw to fine lengths for use as poultry litter material." },
  ],
  "wood-chippers": [
    { label: "Garden Waste Management", desc: "Chips branches, twigs and prunings into fine mulch for garden beds." },
    { label: "Mulch Production", desc: "Produces wood chip mulch to reduce soil moisture loss and suppress weeds." },
    { label: "Farm Waste Disposal", desc: "Clears crop waste, orchard prunings and hedge trimmings efficiently." },
    { label: "Compost Feedstock", desc: "Wood chip output acts as a high-carbon material in compost systems." },
    { label: "Municipal Maintenance", desc: "Used by municipalities for roadside tree trimming and park maintenance." },
  ],
  harvesters: [
    { label: "Paddy Harvesting", desc: "Cuts paddy stalks at base level for efficient manual-collection harvest." },
    { label: "Wheat Harvesting", desc: "Used for cut-and-drop harvesting of wheat before manual bundling." },
    { label: "Grass Cutting", desc: "Cuts road-side grass, bunds and embankment grass quickly." },
    { label: "Weed Management", desc: "Effective for cutting dense weed growth in uncultivated land." },
    { label: "Tea Garden Maintenance", desc: "BCH side-pack series used in tea gardens for pruning and skiffing." },
    { label: "Vegetable Plots", desc: "Precise cutting for harvesting legume and leafy vegetable crops." },
  ],
  sprayers: [
    { label: "Pest Control", desc: "High-pressure spray for effective contact and systemic pesticide application." },
    { label: "Fungicide Application", desc: "Fine mist coverage for foliar fungicide spraying on field crops." },
    { label: "Fertilizer Spraying", desc: "Micro-nutrient and liquid fertilizer application via foliar spray." },
    { label: "Weed Killer Application", desc: "Directed herbicide spray for inter-row and bund weed management." },
    { label: "Disinfection", desc: "High-pressure HTP models used for farm, poultry and animal shed disinfection." },
    { label: "Fruit Crop Spraying", desc: "Long-reach spray for mango, citrus, arecanut and tall fruit crops." },
  ],
  "water-pumps": [
    { label: "Field Irrigation", desc: "Pumps water from wells, ponds and canals for crop irrigation." },
    { label: "Water Transfer", desc: "Transfers water between storage tanks and overhead reservoirs." },
    { label: "Flood Drainage", desc: "Used for emergency de-watering of flooded fields and basements." },
    { label: "Construction Sites", desc: "Supplies water for concrete mixing, dust suppression and worker use." },
    { label: "Fish Pond Management", desc: "Used for filling, emptying and water circulation in aquaculture ponds." },
  ],
  "earth-augers": [
    { label: "Fence Post Holes", desc: "Drills clean, straight holes for barbed wire and electric fence posts." },
    { label: "Tree Planting", desc: "Prepares planting pits for saplings in orchards and afforestation drives." },
    { label: "Soil Sampling", desc: "Used to extract core soil samples for lab testing and survey work." },
    { label: "Sign Post Installation", desc: "Drills holes for road signs, marker posts and boundary pillars." },
    { label: "Foundation Surveys", desc: "Used in construction for preliminary soil bore-hole investigation." },
  ],
  "lawn-mowers": [
    { label: "Garden Maintenance", desc: "Used for regular mowing of home gardens, lawns and turf areas." },
    { label: "Sports Turf", desc: "Maintains cutting height precision for football, cricket and golf turf." },
    { label: "Park Maintenance", desc: "Used by municipalities and institutions for large open-area grass management." },
    { label: "Commercial Properties", desc: "Regular mowing of commercial premises, factory grounds and resorts." },
    { label: "Road Medians", desc: "Used for maintaining road dividers and highway green belt grass." },
  ],
  "tea-harvesters": [
    { label: "Tea Leaf Harvesting", desc: "Harvests tea shoots to precise blade-set height for two-leaf-one-bud standard." },
    { label: "Tea Garden Skiffing", desc: "Used for level-cut skiffing of tea bushes to rejuvenate growth." },
    { label: "Pruning Operations", desc: "Battery-powered models ideal for systematic pruning of tea bushes." },
    { label: "Hedge Trimming", desc: "Suitable for trimming tea bush rows to uniform height across estates." },
  ],
};

// ─── Model-specific extras from product features ─────────────
function getSpecificApplications(product: Product) {
  const base = BASE_APPLICATIONS[product.category] ?? [];
  const extras: { label: string; desc: string }[] = [];

  const featStr = product.features.join(" ").toLowerCase();
  const specStr = JSON.stringify(product.specs).toLowerCase();

  if (featStr.includes("headlight") || featStr.includes("headlights"))
    extras.push({ label: "Night / Dusk Operation", desc: "Built-in headlights allow continued operation after sunset, extending productive hours during peak farming seasons." });

  if (featStr.includes("atv") || featStr.includes("dual shock") || featStr.includes("rough terrain"))
    extras.push({ label: "Hilly & Rough Terrain", desc: "ATV tyres and dual shock absorbers make this model suitable for uneven, sloped and rocky agricultural land." });

  if (product.fuelType === "Diesel" || featStr.includes("diesel"))
    extras.push({ label: "Extended Duration Work", desc: "Diesel fuel economy enables all-day continuous operation without frequent refuelling stops." });

  if (specStr.includes("135 cms") || specStr.includes("135cm"))
    extras.push({ label: "Large Commercial Estates", desc: "Wide 135 cm tilling width makes this model efficient for large paddy estates, plantations and commercial farms." });

  if (featStr.includes("electric start"))
    extras.push({ label: "Operator Comfort", desc: "Electric start removes the physical effort of manual recoil starting, making it suitable for older or less able-bodied operators." });

  if (featStr.includes("backpack"))
    extras.push({ label: "Steep Slope Operation", desc: "Backpack mounting keeps the centre of gravity close to the operator's body, improving stability on steep terrain." });

  return [...extras, ...base].slice(0, 6);
}

// ─── Key specification picks for the 4-icon row ─────────────
function getKeySpecs(product: Product) {
  const s = product.specs;
  const ordered = [
    s["Engine"] ?? s["Engine Type"] ?? s["Rated Power"] ?? s["Max Power"],
    s["Displacement"] ?? s["Battery Voltage"] ?? s["Engine Displacement"],
    s["Power"] ?? s["Rotated Power"] ?? s["Horsepower"] ?? s["HP"],
    s["Fuel"] ?? s["Fuel Type"] ?? s["fuelType"],
  ].filter(Boolean) as string[];
  const keys = [
    Object.keys(s).find(k => ["Engine","Engine Type","Rated Power","Max Power"].includes(k)) ?? "Engine",
    Object.keys(s).find(k => ["Displacement","Battery Voltage","Engine Displacement"].includes(k)) ?? "Displacement",
    Object.keys(s).find(k => ["Power","Rotated Power","Horsepower","HP"].includes(k)) ?? "Power",
    Object.keys(s).find(k => ["Fuel","Fuel Type"].includes(k)) ?? "Fuel",
  ];
  return ordered.map((val, i) => ({ label: keys[i], val })).slice(0, 4);
}

const TABS = ["Overview", "Specifications", "Features", "Accessories", "Applications", "FAQ"];

// ─── FAQ accordion block ─────────────────────────────────────
function FaqBlock({ q, a }: { q: string; a: string }) {
  return (
    <div className="py-5">
      <h3 className="text-[13px] font-bold text-[var(--text-primary)] leading-snug mb-2">{q}</h3>
      <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{a}</p>
    </div>
  );
}

// ─── FUEL BADGE ─────────────────────────────────────────────
const FUEL_BADGE: Record<string, string> = {
  "Petrol":    "bg-[var(--text-primary)] text-[var(--bg-primary)]",
  "Diesel":    "bg-[var(--text-primary)] text-[var(--bg-primary)]",
  "Electric":  "bg-[var(--text-primary)] text-[var(--bg-primary)]",
  "Petrol/2T": "bg-[var(--text-primary)] text-[var(--bg-primary)]",
};

// ─── SPEC ICON ───────────────────────────────────────────────
const SPEC_ICONS = [
  <Settings2 className="w-5 h-5 stroke-[1.5]" />,
  <Gauge className="w-5 h-5 stroke-[1.5]" />,
  <Zap className="w-5 h-5 stroke-[1.5]" />,
  <Fuel className="w-5 h-5 stroke-[1.5]" />,
];

export default function ProductDetailClient({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const searchParams = useSearchParams();
  const isPrintMode = searchParams.get("print") === "true";

  const [tab, setTab] = useState("Overview");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const tabsSectionRef = useRef<HTMLElement>(null);

  async function handleDownloadBrochure() {
    if (!product) return;
    setIsGeneratingPDF(true);
    try {
      const res = await fetch(`/api/pdf/product?slug=${product.slug}&category=${product.category}`);
      const contentType = res.headers.get("content-type") || "";

      // If we got a valid PDF back from Cloudflare Pages Function
      if (res.ok && contentType.includes("application/pdf")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `X1_${product.modelCode.replace(/[^a-zA-Z0-9_-]/g, "_")}_Brochure.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        return;
      }

      // If in local dev mode or on server without BROWSER binding, fallback to opening print view
      const printUrl = `/products/${product.category}/${product.slug}?print=true`;
      const printWin = window.open(printUrl, "_blank");
      if (printWin) {
        printWin.addEventListener("load", () => {
          setTimeout(() => {
            printWin.print();
          }, 600);
        });
      }
    } catch (err) {
      console.error(err);
      const printUrl = `/products/${product.category}/${product.slug}?print=true`;
      window.open(printUrl, "_blank");
    } finally {
      setIsGeneratingPDF(false);
    }
  }
  const { add: addToCompare, remove: removeFromCompare, has: isInCompare } = useCompare();

  const handleTabClick = (t: string) => {
    setTab(t);
    // Scroll the tabs section into view so user sees the content on mobile
    tabsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const productImages = product.images && product.images.length > 0
    ? product.images
    : (product.image ? [product.image] : []);
  const [activeImage, setActiveImage] = useState(productImages[0] || "");

  // Sync active image when slug changes
  useEffect(() => {
    setActiveImage(productImages[0] || "");
  }, [slug, productImages[0]]);

  const catLabel = CATEGORIES.find((c) => c.slug === product.category)?.name ?? product.categoryName;
  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);
  const keySpecs = getKeySpecs(product);
  const applications = getSpecificApplications(product);
  const specEntries = Object.entries(product.specs);
  const optimized = getOptimizedProductTitle(product.name, product.modelCode, product.category);

  // ─── PRINT MODE: render the unstacked brochure for Puppeteer ──────────────
  if (isPrintMode) {
    return <PrintBrochure product={product} />;
  }

  return (
    <>
      <Navbar />

      {/* ─── BREADCRUMB ─────────────────────────────────── */}
      <div className="pt-24 bg-[var(--bg-primary)] border-b border-[var(--border-secondary)]">
        <div className="container-site py-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[#D71920] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-[var(--border-secondary)]" />
          <Link href="/products" className="hover:text-[#D71920] transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3 text-[var(--border-secondary)]" />
          <Link href={`/products?category=${product.category}`} className="hover:text-[#D71920] transition-colors">{catLabel}</Link>
          <ChevronRight className="w-3 h-3 text-[var(--border-secondary)]" />
          <span className="text-[#D71920]">{product.modelCode}</span>
        </div>
      </div>

      {/* ─── MAIN PRODUCT SECTION ───────────────────────── */}
      <section className="bg-[var(--bg-primary)] py-10">
        <div className="container-site grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_460px] gap-8 md:gap-12 xl:gap-20 items-start">

          {/* LEFT: thumbnail strip + main image */}
          <div className="flex flex-col-reverse lg:flex-row gap-3 sticky top-24 relative">
            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-[60px] overflow-x-auto hide-scrollbar shrink-0">
                {productImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square border flex items-center justify-center bg-[var(--bg-secondary)] cursor-pointer overflow-hidden transition-colors ${
                      activeImage === img ? "border-[#D71920]" : "border-[var(--border-color)] hover:border-[var(--text-muted)]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`X1 Power ${product.name} (${product.modelCode}) ${catLabel.toLowerCase()} machine photo view ${i + 1} - Bushra Impex`}
                      width={60}
                      height={60}
                      className="object-contain p-1"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Main image with zoom */}
            {activeImage ? (
              <ProductImageZoom
                imageUrl={activeImage}
                altText={`X1 Power ${product.name} (${product.modelCode}) ${catLabel.toLowerCase()} machine side view - Bushra Impex`}
                fuelBadge={
                  <span className={`absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 z-10 ${FUEL_BADGE[product.fuelType] ?? "bg-[var(--text-primary)] text-[var(--bg-primary)]"}`}>
                    {product.fuelType}
                  </span>
                }
              />
            ) : (
              <div className="flex-1 aspect-square bg-[var(--bg-secondary)] border border-[var(--border-color)] relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="font-bebas text-[160px] text-[#EBEBEB] leading-none select-none">X1</div>
                  <span className="relative z-10 font-bebas text-[16px] text-[var(--text-muted)] tracking-[0.25em]">{product.modelCode}</span>
                  <span className="relative z-10 text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Image Coming Soon</span>
                </div>
                <span className={`absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 z-10 ${FUEL_BADGE[product.fuelType] ?? "bg-[var(--text-primary)] text-[var(--bg-primary)]"}`}>
                  {product.fuelType}
                </span>
              </div>
            )}
          </div>

          {/* RIGHT: product info */}
          <div className="flex flex-col gap-7">

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920]">{catLabel}</span>
              <h1 className="font-bebas text-[clamp(36px,6vw,52px)] text-[var(--text-primary)] leading-[0.9] tracking-tight">
                {optimized.h1Title}
              </h1>
              <p className="text-[11px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-1">
                Model: {optimized.modelSub}
              </p>
            </div>

            {/* Description */}
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed border-l-2 border-[#D71920] pl-4">
              {product.description}
            </p>

            {/* Key spec blocks (flex-1 ensures perfect balance whether 2, 3, or 4 items) */}
            <div className="flex border border-[var(--border-color)]">
              {keySpecs.map((ks, i) => (
                <div
                  key={i}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 text-center ${i < keySpecs.length - 1 ? "border-r border-[var(--border-color)]" : ""}`}
                >
                  <span className="text-[var(--text-muted)]">{SPEC_ICONS[i]}</span>
                  <span className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">{ks.val}</span>
                  <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest leading-tight">{ks.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <Link href="/contact" className="flex-1 flex items-center justify-center gap-2 bg-[#D71920] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-4 hover:bg-[#B71520] transition-colors">
                <Phone className="w-3.5 h-3.5" /> Get Best Quote
              </Link>
              <button
                onClick={handleDownloadBrochure}
                disabled={isGeneratingPDF}
                className="flex-1 flex items-center justify-center gap-2 border border-[var(--border-color)] text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest px-5 py-4 hover:border-[var(--text-muted)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGeneratingPDF ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating PDF...</>
                ) : (
                  <><Download className="w-3.5 h-3.5" /> Download Brochure</>
                )}
              </button>
            </div>

            {/* Compare / Share */}
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              <button
                onClick={() => {
                  if (isInCompare(product.slug)) {
                    removeFromCompare(product.slug);
                  } else {
                    addToCompare(product);
                  }
                }}
                className={`flex items-center gap-2 transition-colors ${
                  isInCompare(product.slug)
                    ? "text-[#D71920] font-bold"
                    : "hover:text-[var(--text-primary)]"
                }`}
              >
                {isInCompare(product.slug) ? (
                  <><Check className="w-3.5 h-3.5" /> Added to Compare</>
                ) : (
                  <><GitCompareArrows className="w-3.5 h-3.5" /> Add to Compare</>
                )}
              </button>
              <button className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>

            {/* Quick spec reference strip */}
            <div className="border-t border-[var(--border-secondary)] pt-5">
              <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Quick Reference</p>
              <div className="grid grid-cols-2 gap-2">
                {specEntries.slice(0, 6).map(([k, v]) => (
                  <div key={k} className="flex flex-col bg-[var(--bg-secondary)] px-3 py-2.5">
                    <span className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-wider">{k}</span>
                    <span className="text-[12px] font-bold text-[var(--text-primary)] mt-0.5">{v}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── TABS ───────────────────────────────────────── */}
      <section ref={tabsSectionRef} className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
        <div className="container-site">
          {/* Tab strip */}
          <div className="flex items-stretch overflow-x-auto hide-scrollbar gap-0 border-b border-[var(--border-color)]">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => handleTabClick(t)}
                className={`shrink-0 px-7 py-4 text-[10px] font-bold uppercase tracking-widest transition-colors border-b-2 -mb-px whitespace-nowrap ${
                  tab === t
                    ? "text-[#D71920] border-[#D71920] bg-[var(--bg-primary)]"
                    : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-secondary)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <div className="py-10">

            {/* ── OVERVIEW ── */}
            {tab === "Overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="flex flex-col gap-6">
                  <h2 className="font-bebas text-[32px] text-[var(--text-primary)] leading-none tracking-tight">
                    About This Machine
                  </h2>
                  {/* GEO: explicit entity chain — Product → Model → Category → Brand → Company */}
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    The <strong>{product.name}</strong> (Model: <strong>{product.modelCode}</strong>) is a professional-grade <strong>{product.categoryName.toLowerCase()}</strong> sold under the <strong>X1 Power</strong> brand, manufactured and distributed by <strong>Bushra Impex</strong> — an Indian agricultural machinery company established in Bengaluru, Karnataka in 2012. X1 Power machines are FMTTI tested and ISO 9001:2015 certified.
                  </p>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex flex-col gap-3">
                    {product.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="font-bebas text-[14px] text-[#D71920] shrink-0 mt-0.5">0{i + 1}</span>
                        <span className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Overview spec table */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">Specifications at a Glance</h3>
                  <div className="border border-[var(--border-color)] bg-[var(--bg-primary)]">
                    {specEntries.map(([k, v], i) => (
                      <div key={k} className={`flex items-start px-5 py-3.5 border-b border-[var(--border-secondary)] last:border-0 ${i % 2 === 0 ? "bg-[var(--bg-primary)]" : "bg-[var(--bg-tertiary)]"}`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] w-[45%] pt-0.5">{k}</span>
                        <span className="text-[12px] font-bold text-[var(--text-secondary)] w-[55%]">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── SPECIFICATIONS ── */}
            {tab === "Specifications" && (
              <div className="max-w-3xl">
                <h2 className="font-bebas text-[32px] text-[var(--text-primary)] leading-none tracking-tight mb-6">
                  Technical Specifications
                </h2>
                <p className="text-[12px] text-[var(--text-muted)] mb-6">
                  All specification data for the <strong>{product.modelCode}</strong> is sourced directly from the official X1 Power product catalogue.
                </p>
                <div className="border border-[var(--border-color)] bg-[var(--bg-primary)]">
                  <div className="flex bg-[var(--bg-tertiary)] border-b border-[var(--border-color)] px-5 py-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] w-[45%]">Parameter</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] w-[55%]">Specification</span>
                  </div>
                  {specEntries.map(([k, v], i) => (
                    <div key={k} className={`flex items-start px-5 py-4 border-b border-[var(--border-secondary)] last:border-0 ${i % 2 === 0 ? "bg-[var(--bg-primary)]" : "bg-[var(--bg-tertiary)]"}`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] w-[45%]">{k}</span>
                      <span className="text-[13px] font-bold text-[var(--text-primary)] w-[55%]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── FEATURES ── */}
            {tab === "Features" && (
              <div>
                <h2 className="font-bebas text-[32px] text-[var(--text-primary)] leading-none tracking-tight mb-8">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-4 bg-[var(--bg-primary)] border border-[var(--border-color)] p-5 hover:border-[#D71920] transition-colors">
                      <span className="font-bebas text-[32px] text-[#D71920]/20 leading-none shrink-0">0{i + 1}</span>
                      <div className="flex flex-col gap-1 pt-1">
                        <span className="text-[13px] font-bold text-[var(--text-primary)] leading-tight">{f}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── ACCESSORIES ── */}
            {tab === "Accessories" && (
              <div>
                <h2 className="font-bebas text-[32px] text-[var(--text-primary)] leading-none tracking-tight mb-3">
                  Accessories & Attachments
                </h2>
                <p className="text-[12px] text-[var(--text-muted)] mb-7">
                  The following accessories are available / compatible with the <strong>{product.modelCode}</strong> as listed in the official catalogue.
                </p>
                {product.accessories.length > 0 ? (
                  /* Always try to render image grid using the new global map */
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                    {product.accessories.map((acc, i) => {
                      const imgSrc = getAccessoryImage(acc, product.accessoryImages);
                      return (
                        <div key={i} className="border border-[var(--border-color)] bg-[var(--bg-primary)] flex flex-col">
                          <div className="aspect-square relative bg-[var(--bg-secondary)] border-b border-[var(--border-color)] overflow-hidden flex">
                            {imgSrc ? (
                              <ProductImageZoom imageUrl={imgSrc} altText={acc} />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] text-center px-4">Image Not Available</span>
                              </div>
                            )}
                          </div>
                          <div className="px-4 py-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#D71920] shrink-0" />
                            <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wide leading-tight">{acc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] p-8 text-center">
                    <p className="text-[12px] text-[var(--text-muted)] font-bold uppercase tracking-widest">No accessories listed in catalogue for this model</p>
                  </div>
                )}
              </div>
            )}

            {/* ── APPLICATIONS ── */}
            {tab === "Applications" && (
              <div>
                <h2 className="font-bebas text-[32px] text-[var(--text-primary)] leading-none tracking-tight mb-2">
                  Where This Machine Is Used
                </h2>
                <p className="text-[12px] text-[var(--text-muted)] mb-8">
                  Application areas for the <strong>{product.modelCode}</strong> — based on this machine's specifications, engine capacity, attachments and design.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {applications.map((app, i) => (
                    <div key={i} className="bg-[var(--bg-primary)] border border-[var(--border-color)] p-6 flex flex-col gap-3 hover:border-[#D71920] transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="font-bebas text-[14px] text-[#D71920] shrink-0">0{i + 1}</span>
                        <span className="w-px h-4 bg-[var(--border-color)]" />
                        <h3 className="font-bebas text-[17px] text-[var(--text-primary)] leading-tight tracking-tight">{app.label}</h3>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{app.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Model Note</p>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    The <strong className="text-[var(--text-primary)]">{product.modelCode}</strong> with {product.specs["Displacement"] ?? product.specs["Battery Voltage"] ?? "its"}{" "}
                    {product.specs["Displacement"] ? "displacement" : product.specs["Battery Voltage"] ? "battery" : "engine"}{" "}
                    {product.specs["Power"] ?? product.specs["Rotated Power"] ?? product.specs["Rated Power"] ? `and ${product.specs["Power"] ?? product.specs["Rotated Power"] ?? product.specs["Rated Power"]} power output` : ""}{" "}
                    is specifically suited for {applications[0]?.label.toLowerCase()} and {applications[1]?.label.toLowerCase()}.
                    {product.fuelType === "Diesel" ? " Being a diesel model, it offers lower operating costs per hour and is preferred for extended daily use." : ""}
                    {product.fuelType === "Petrol" ? " Its petrol engine provides quick start-up and is ideal for short to medium duration daily operations." : ""}
                    {product.fuelType === "Electric" ? " The electric motor eliminates fuel costs and emissions, making it ideal for enclosed or noise-sensitive areas." : ""}
                  </p>
                </div>
              </div>
            )}
            {/* ── FAQ ── */}
            {tab === "FAQ" && (
              <div className="max-w-3xl">
                <h2 className="font-bebas text-[32px] text-[var(--text-primary)] leading-none tracking-tight mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-[12px] text-[var(--text-muted)] mb-8">
                  Common questions about the <strong>{product.modelCode}</strong>. All answers are based on verified catalogue data and X1 Power product information.
                </p>
                <div className="flex flex-col divide-y divide-[var(--border-secondary)]">
                  {/* Definition */}
                  <FaqBlock
                    q={`What is the ${product.name}?`}
                    a={`The ${product.name} (Model: ${product.modelCode}) is a ${
                      product.fuelType === "Petrol/2T" ? "petrol 2-stroke" : product.fuelType.toLowerCase()
                    } ${product.categoryName.toLowerCase()} manufactured under the X1 Power brand by Bushra Impex. It is designed for agricultural and commercial use in Indian field conditions and is FMTTI tested.`}
                  />
                  {/* Specs */}
                  <FaqBlock
                    q={`What are the specifications of the ${product.modelCode}?`}
                    a={Object.entries(product.specs)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(". ") + ". Sourced from the official X1 Power product catalogue."}
                  />
                  {/* Features */}
                  <FaqBlock
                    q={`What are the key features of the ${product.name}?`}
                    a={`Key features of the ${product.name} include: ${product.features.join(", ")}.`}
                  />
                  {/* Accessories */}
                  {product.accessories.length > 0 && (
                    <FaqBlock
                      q={`What accessories are available for the ${product.modelCode}?`}
                      a={`The following accessories are compatible with the ${product.modelCode} as per the official catalogue: ${product.accessories.join(", ")}.`}
                    />
                  )}
                  {/* Applications */}
                  <FaqBlock
                    q={`What are the main uses of the ${product.modelCode}?`}
                    a={`The ${product.modelCode} is used for: ${applications.map((a) => a.label).join(", ")}.`}
                  />
                  {/* Subsidy */}
                  {product.category === "weeders" && (
                    <FaqBlock
                      q={`Is the ${product.modelCode} eligible for government subsidy in India?`}
                      a={`X1 Power power weeders including the ${product.modelCode} are FMTTI tested and registered with multiple Indian state agriculture departments. Subsidy eligibility varies by state. Verify current eligibility with your state agriculture department or nearest X1 Power dealer.`}
                    />
                  )}
                  {/* Dealer */}
                  <FaqBlock
                    q={`Where can I buy the ${product.name} in India?`}
                    a={`The ${product.name} is available through the authorised X1 Power dealer network operated by Bushra Impex — 500+ dealers across all 29 Indian states. Contact Bushra Impex at +91-76248-69606 or visit bushraimpex.com to find your nearest dealer.`}
                  />
                  {/* Warranty */}
                  <FaqBlock
                    q={`Does the ${product.name} come with a warranty?`}
                    a={`Please contact our office for more details on how warranty and guarantees work.`}
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ─── RELATED PRODUCTS ────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-14 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
          <div className="container-site">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D71920] block mb-1">More in {catLabel}</span>
                <h2 className="font-bebas text-[32px] text-[var(--text-primary)] leading-none tracking-tight">Related Products</h2>
              </div>
              <Link href={`/products?category=${product.category}`} className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[#D71920] flex items-center gap-1 transition-colors">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/products/${rp.category}/${rp.slug}`}
                className="group border border-[var(--border-color)] hover:border-[#D71920] transition-all flex flex-col"
                >
                  <div className="aspect-square bg-[var(--bg-secondary)] border-b border-[var(--border-color)] relative overflow-hidden flex items-center justify-center">
                    {rp.image ? (
                      <Image
                        src={rp.image}
                        alt={`X1 Power by Bushra Impex - ${rp.name} - Type: ${catLabel}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                        <div className="w-6 h-px bg-[var(--border-secondary)]" />
                        <span className="font-bebas text-[11px] text-[var(--text-muted)] tracking-widest text-center px-3">{rp.modelCode}</span>
                        <div className="w-6 h-px bg-[var(--border-secondary)]" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-1.5 flex-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#D71920]">{rp.categoryName}</span>
                    <h3 className="font-bebas text-[16px] text-[var(--text-primary)] group-hover:text-[#D71920] transition-colors leading-tight">{rp.name}</h3>
                    <span className="mt-auto pt-3 text-[10px] font-bold uppercase tracking-wider text-[#D71920] flex items-center gap-1">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
