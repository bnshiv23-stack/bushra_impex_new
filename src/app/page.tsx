"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ArrowRight, ChevronLeft, ChevronRight, Download, Phone } from "lucide-react";

// ── Static data ───────────────────────────────────────────────
const TRUST_METRICS = [
  { num: "100+", label: "Products" },
  { num: "500+", label: "Dealers" },
  { num: "29", label: "States" },
  { num: "50,000+", label: "Machines Sold" },
  { num: "15 Years", label: "Industry Trust" },
  { num: "ISO", label: "Certified" },
];

const WHY_FEATURES = [
  { num: "01", title: "Japanese Engine Technology", desc: "Unmatched reliability, smooth startup, and high thermal efficiency for long-hour field usage." },
  { num: "02", title: "Heavy Duty Gearbox", desc: "Reinforced cast-iron housing and hardened alloy gears designed to withstand high torque load." },
  { num: "03", title: "PAN India Dealer Network", desc: "Over 500+ authorized service centers stocked with original components and trained technicians." },
  { num: "04", title: "Easy Finance Options", desc: "Convenient bank tie-ups and flexible payment terms to ensure premium technology is accessible to all farmers." },
  { num: "05", title: "Low Fuel Consumption", desc: "Optimized carburetor and combustion systems delivering maximum power with reduced fuel overhead per hour." },
  { num: "06", title: "100% Genuine Spare Parts", desc: "Guaranteed availability of wear components, cutting teeth, filters, and gaskets across all authorized service locations." },
];

const TESTIMONIALS = [
  { name: "Rajesh Kumar", location: "Ludhiana, Punjab", crop: "Wheat & Paddy", text: "The X1 Power 750 PTO Kibao has completely transformed my tilling workflow. The Japanese engine starts in a single pull and handles wet soils without any choking." },
  { name: "Gurpreet Singh", location: "Karnal, Haryana", crop: "Horticulture", text: "We run three weeders and two sprayers from X1 Power. The low fuel consumption is a massive cost-saver, and the heavy-duty gearbox handles rough soil effortlessly." },
  { name: "S. Murugan", location: "Madurai, Tamil Nadu", crop: "Rice Cultivation", text: "Outstanding durability. Used their crop harvester and power weeder for two full seasons with zero breakdowns. Genuine spare parts always available nearby." },
  { name: "Amit Patel", location: "Surat, Gujarat", crop: "Sugarcane", text: "The build quality of X1 Power machines is unmatched. The heavy-duty gearbox on the 750 Pro Series handles tough sugarcane fields with ease. Highly recommended." },
  { name: "Vikram Reddy", location: "Nizamabad, Telangana", crop: "Maize", text: "Excellent service and support. The 4WD weeder made a huge difference in our yield this year. It's powerful, reliable, and very fuel-efficient." },
];

const ACCESSORIES = [
  { name: "32 Pcs Blade Set", desc: "For wet and dry soil tilling", img: "/images/acc-32-blade.png" },
  { name: "ATV Tyres", desc: "High clearance terrain mobility", img: "/images/acc-atv-tyres.png" },
  { name: "Side-Discs", desc: "Precise row crop clearance", img: "/images/acc-disc.png" },
  { name: "Double Fender Protection", desc: "Guards operator from flying debris", img: "/images/acc-fender-red.png" },
];

function scrollBy(ref: React.RefObject<HTMLDivElement | null>, dir: "left" | "right") {
  ref.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
}

// ── Reusable section label ─────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#D71920] mb-3">
      {children}
    </span>
  );
}

// ── Section heading ────────────────────────────────────────────
function SectionHead({ label, heading, align = "left" }: { label: string; heading: React.ReactNode; align?: "left" | "center" }) {
  return (
    <div className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start"} mb-12`}>
      <Label>{label}</Label>
      <h2 className="font-bebas text-[clamp(36px,5vw,56px)] text-[var(--text-primary)] leading-none tracking-tight">
        {heading}
      </h2>
    </div>
  );
}

export default function HomePage() {
  const bestsellersRef = useRef<HTMLDivElement>(null);
  const latestRef = useRef<HTMLDivElement>(null);

  const featuredHero = PRODUCTS.find((p) => p.slug === "750-pto-kibao") ?? PRODUCTS[0];
  const rightCards = PRODUCTS.filter((p) => ["850-kibao", "750-pro-yellow", "750-pro-orange"].includes(p.slug));
  const bestsellers = PRODUCTS.slice(2, 9);
  const latestProducts = PRODUCTS.slice(0, 7);

  return (
    <>
      <Navbar />

      {/* ── SEO H1 (Visually Hidden) ─────────────────────────────────── */}
      <h1 className="sr-only">X1 Power by Bushra Impex - Premium Agricultural Equipment: Tillers, Weeders, Chainsaws, Chaff Cutters, Wood Chippers, Harvesters, Sprayers, Water Pumps, Earth Augers, Lawn Mowers, Pressure Washers & Rice Mills</h1>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-[92vh] flex flex-col justify-end pb-12 sm:pb-16 overflow-hidden">
        {/* Hero Background Image */}
        <Image
          src="/HERO.png"
          alt="X1 Power by Bushra Impex - Powering The Backbone of India"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-top"
        />

        {/* Sophisticated Multi-Layer Overlay for Perfect Contrast & Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />

        <div className="container-site relative z-10 w-full flex flex-col items-center text-center gap-6 sm:gap-8 pt-24">
          
          {/* Glassmorphic Badge / Tagline pill */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50 text-white animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#D71920] animate-pulse" />
            <span className="text-[10px] sm:text-[12px] font-extrabold uppercase tracking-[0.25em] text-amber-300 drop-shadow-md">
              10+ YEARS &nbsp;•&nbsp; 29 STATES &nbsp;•&nbsp; 1 MISSION
            </span>
          </div>

          {/* Main Title & Subtitle Card with Glass Backdrop */}
          <div className="max-w-4xl px-6 sm:px-10 py-8 sm:py-10 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center gap-3">
            <h2 className="font-bebas text-[clamp(40px,7vw,76px)] tracking-tight text-white leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              POWERING THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-amber-200">BACKBONE OF INDIA</span>
            </h2>
            <p className="max-w-2xl text-[13px] sm:text-[15px] font-medium text-gray-200 leading-relaxed drop-shadow-md">
              High-performance agricultural machinery engineered for Indian field conditions. FMTTI tested, ISO 9001:2015 certified, trusted by over 50,000+ farmers across 29 states.
            </p>
          </div>

          {/* Previous Glassmorphic Call-to-Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/dealer"
              className="px-6 sm:px-7 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/25 transition-all"
            >
              Become a Dealer
            </Link>
            <a
              href="/x1power_catalogue.pdf" download
              className="px-6 sm:px-7 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/25 transition-all"
            >
              Download Catalogue
            </a>
          </div>

        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────── */}
      <section className="bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
        <div className="container-site">
          <div className="grid grid-cols-3 md:grid-cols-6">
            {TRUST_METRICS.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center text-center py-5 px-4 ${i < TRUST_METRICS.length - 1 ? "border-r border-[var(--border-color)]" : ""}`}
              >
                <span className="font-bebas text-[28px] text-[var(--text-primary)] leading-none">{m.num}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)] mt-0.5">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="container-site">
          <div className="flex items-end justify-between mb-12 border-b border-[var(--border-color)] pb-5">
            <div>
              <Label>Flagship Lineup</Label>
              <h2 className="font-bebas text-[clamp(36px,5vw,52px)] text-[var(--text-primary)] leading-none">Featured Machines</h2>
            </div>
            <Link href="/products" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[#D71920] transition-colors">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Large left card */}
            <div className="lg:col-span-7 relative overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] group flex flex-col lg:min-h-[520px]">

              {/* Image (Stacks in middle on mobile, absolute right on desktop) */}
              {featuredHero.image && (
                <div className="relative w-full h-[280px] sm:h-[340px] lg:h-auto lg:absolute lg:inset-0 z-0 order-2 lg:order-none">
                  <Image
                    src={featuredHero.image} alt={`X1 Power by Bushra Impex - ${featuredHero.name}`}
                    fill className="object-contain object-center lg:object-right-bottom p-4 lg:p-8 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}

              {/* Text Content */}
              <div className="relative z-10 p-6 sm:p-8 pb-0 lg:pb-8 flex flex-col gap-4 max-w-full lg:max-w-[65%] order-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#D71920]">{featuredHero.categoryName}</p>
                <h3 className="font-bebas text-[clamp(36px,4vw,52px)] text-[var(--text-primary)] leading-[1.0]">{featuredHero.name}</h3>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{featuredHero.description}</p>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[var(--border-color)] my-2">
                  {Object.entries(featuredHero.specs).slice(0, 4).map(([k, v]) => (
                    <div key={k}>
                      <span className="block text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{k}</span>
                      <span className="text-[12px] font-bold text-[var(--text-primary)]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 p-6 sm:p-8 pt-0 lg:pt-8 flex flex-wrap gap-3 order-3 mt-auto lg:mt-0">
                <Link href={`/products/${featuredHero.category}/${featuredHero.slug}`}
                  className="inline-flex items-center gap-2 bg-[#D71920] text-white text-[11px] font-bold uppercase tracking-widest px-7 py-3 hover:bg-[#b01419] transition-colors">
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a href={`/api/pdf/product?slug=${featuredHero.slug}`} download
                  className="inline-flex items-center gap-2 border border-[var(--border-color)] text-[var(--text-secondary)] text-[11px] font-bold uppercase tracking-widest px-7 py-3 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors">
                  <Download className="w-3.5 h-3.5" /> Brochure
                </a>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {rightCards.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.category}/${p.slug}`}
                  className="group flex items-center justify-between gap-4 border border-[var(--border-color)] hover:border-[#D71920] p-5 transition-all duration-200 bg-[var(--bg-secondary)]"
                >
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{p.categoryName}</p>
                    <h4 className="font-bebas text-[22px] text-[var(--text-primary)] group-hover:text-[#D71920] transition-colors leading-tight">{p.name}</h4>
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">{p.description}</p>
                    <div className="flex gap-5 pt-1">
                      {Object.entries(p.specs).slice(0, 2).map(([k, v]) => (
                        <div key={k}>
                          <span className="block text-[8px] text-[var(--text-muted)] uppercase tracking-wider">{k}</span>
                          <span className="text-[11px] font-bold text-[var(--text-secondary)]">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {p.image && (
                    <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)]">
                      <Image src={p.image} alt={`X1 Power by Bushra Impex - ${p.name} - Premium Agricultural Equipment`} fill sizes="96px" className="object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY GRID ────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
        <div className="container-site">
          <div className="flex items-end justify-between border-b border-[var(--border-color)] pb-5 mb-12">
            <div>
              <Label>Browse by Category</Label>
              <h2 className="font-bebas text-[clamp(36px,5vw,52px)] text-[var(--text-primary)] leading-none">Product Range</h2>
            </div>
            <Link href="/products" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[#D71920] transition-colors">
              All Products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-color)]">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="group relative h-40 sm:h-52 flex flex-col justify-end p-5 overflow-hidden bg-[var(--bg-primary)]"
              >
                <div className="absolute inset-0 z-0 bg-white">
                  <Image
                    src={PRODUCTS.find(p => p.category === cat.slug)?.image || cat.bannerImage} alt={`X1 Power by Bushra Impex - ${cat.name} Category - Premium Agricultural Equipment`} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-contain p-4 brightness-[0.9] group-hover:brightness-[0.8] group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="font-bebas text-[22px] sm:text-[24px] text-white leading-none">{cat.name}</h3>
                  </div>
                  <span className="w-8 h-8 border border-white/20 flex items-center justify-center group-hover:bg-[#D71920] group-hover:border-[#D71920] transition-colors shrink-0">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY X1 POWER ─────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
        <div className="container-site">
          <SectionHead label="Core Strengths" heading="Why Indian Farmers Choose X1 Power" align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-color)]">
            {WHY_FEATURES.map(({ num, title, desc }) => (
              <div key={num} className="p-8 bg-[var(--bg-primary)] flex flex-col gap-3 hover:bg-[var(--bg-secondary)] transition-colors">
                <span className="font-bebas text-[40px] text-[#D71920]/20 leading-none">{num}</span>
                <h3 className="font-bebas text-[20px] text-[var(--text-primary)] leading-tight">{title}</h3>
                <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS CAROUSEL ────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] overflow-hidden">
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Label>Field Favorites</Label>
              <h2 className="font-bebas text-[clamp(36px,5vw,52px)] text-[var(--text-primary)] leading-none">Best Sellers</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scrollBy(bestsellersRef, "left")}
                className="w-9 h-9 border border-[var(--border-color)] flex items-center justify-center hover:border-[#D71920] hover:text-[#D71920] transition-colors bg-[var(--bg-primary)]">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scrollBy(bestsellersRef, "right")}
                className="w-9 h-9 border border-[var(--border-color)] flex items-center justify-center hover:border-[#D71920] hover:text-[#D71920] transition-colors bg-[var(--bg-primary)]">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div ref={bestsellersRef} className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar pb-4">
            {bestsellers.map((p) => (
              <div key={p.slug} className="shrink-0 w-[280px] bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[#D71920] transition-all duration-200 flex flex-col group">
                <div className="aspect-square relative bg-[var(--bg-secondary)] border-b border-[var(--border-color)] overflow-hidden">
                  {p.image && <Image src={p.image} alt={`${p.name} - X1 Power Bushra Impex`} fill sizes="280px" className="object-contain p-5 group-hover:scale-105 transition-transform duration-300" />}
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#D71920]">{p.categoryName}</span>
                  <h3 className="font-bebas text-[20px] text-[var(--text-primary)] leading-tight">{p.name}</h3>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed flex-1">{p.description}</p>
                  <div className="border-t border-[var(--border-color)] pt-3 mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">{p.modelCode}</span>
                    <Link href={`/products/${p.category}/${p.slug}`}
                      className="w-8 h-8 border border-[var(--border-color)] hover:bg-[#D71920] hover:border-[#D71920] hover:text-white flex items-center justify-center transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEALER NETWORK ───────────────────────────────────── */}
      <section className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] py-16 sm:py-24">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[var(--border-color)]">
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-[var(--border-color)]">
              <div>
                <Label>National Presence</Label>
                <h2 className="font-bebas text-[clamp(36px,5vw,52px)] text-[var(--text-primary)] leading-none">Our Dealer Network</h2>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-md">
                With a strong presence across all 29 Indian states and 500+ authorized dealers, X1 Power is always close to your fields. Our dealerships offer certified purchase advice and fast parts procurement.
              </p>
              <div className="grid grid-cols-3 gap-4 border-y border-[var(--border-color)] py-5">
                {[{ num: "500+", label: "Dealers" }, { num: "29", label: "States" }, { num: "100%", label: "Support" }].map((s) => (
                  <div key={s.label}>
                    <span className="block font-bebas text-[32px] text-[var(--text-primary)] leading-none">{s.num}</span>
                    <span className="text-[9px] text-[#D71920] uppercase font-bold tracking-widest">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/dealer"
                  className="inline-flex items-center gap-2 bg-[#D71920] text-white text-[11px] font-bold uppercase tracking-widest px-7 py-3 hover:bg-[#b01419] transition-colors">
                  Become a Dealer <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
            <div className="p-12 lg:p-16 flex flex-col gap-5 bg-[var(--bg-secondary)]">
              <Label>About Bushra Impex</Label>
              <h2 className="font-bebas text-[clamp(32px,4vw,44px)] text-[var(--text-primary)] leading-none">Distributing Quality Since 2012</h2>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                Bushra Impex is a trusted distributor and wholesaler of high-performance agricultural machinery in India, bringing quality machines to farmers across all 29 states through the X1 Power brand.
              </p>
              {[
                { year: "2012", event: "Company Established in Bengaluru" },
                { year: "2017", event: "Launched X1 Power Brand" },
                { year: "2021", event: "FMTTI Testing & Approvals Secured" },
                { year: "2024", event: "PAN India Dealer Network — 500+ Strong" },
              ].map((m) => (
                <div key={m.year} className="flex items-baseline gap-3">
                  <span className="font-bebas text-[13px] text-[#D71920] tracking-widest w-10 shrink-0">{m.year}</span>
                  <span className="w-4 h-px bg-[var(--border-color)] shrink-0" />
                  <span className="text-[12px] text-[var(--text-secondary)]">{m.event}</span>
                </div>
              ))}
              <Link href="/about"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[#D71920] transition-colors mt-2 self-start">
                Our Story <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
        <div className="container-site">
          <SectionHead label="Farmer Voices" heading="What Our Customers Say" align="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border-color)]">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-8 bg-[var(--bg-primary)] flex flex-col justify-between gap-6">
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">"{t.text}"</p>
                <div className="border-t border-[var(--border-color)] pt-5">
                  <span className="block font-bold text-[13px] text-[var(--text-primary)]">{t.name}</span>
                  <span className="block text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-0.5">{t.location} · {t.crop}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST PRODUCTS ───────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-primary)] border-t border-[var(--border-color)] overflow-hidden">
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Label>New Launches</Label>
              <h2 className="font-bebas text-[clamp(36px,5vw,52px)] text-[var(--text-primary)] leading-none">Latest Products</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scrollBy(latestRef, "left")}
                className="w-9 h-9 border border-[var(--border-color)] flex items-center justify-center hover:border-[#D71920] hover:text-[#D71920] transition-colors bg-[var(--bg-secondary)]">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scrollBy(latestRef, "right")}
                className="w-9 h-9 border border-[var(--border-color)] flex items-center justify-center hover:border-[#D71920] hover:text-[#D71920] transition-colors bg-[var(--bg-secondary)]">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div ref={latestRef} className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar pb-4">
            {latestProducts.map((p) => (
              <div key={p.slug} className="shrink-0 w-[280px] bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[#D71920] transition-all duration-200 flex flex-col group">
                <div className="aspect-square relative bg-[var(--bg-primary)] border-b border-[var(--border-color)] overflow-hidden">
                  {p.image && <Image src={p.image} alt={`${p.name} - X1 Power Bushra Impex`} fill sizes="280px" className="object-contain p-5 group-hover:scale-105 transition-transform duration-300" />}
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#D71920]">{p.categoryName}</span>
                  <h3 className="font-bebas text-[20px] text-[var(--text-primary)] leading-tight">{p.name}</h3>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed flex-1">{p.description}</p>
                  <div className="border-t border-[var(--border-color)] pt-3 mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">{p.modelCode}</span>
                    <Link href={`/products/${p.category}/${p.slug}`}
                      className="w-8 h-8 border border-[var(--border-color)] hover:bg-[#D71920] hover:border-[#D71920] hover:text-white flex items-center justify-center transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCESSORIES ──────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
        <div className="container-site">
          <SectionHead label="Enhance Capability" heading="Compatible Attachments" align="center" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border-color)]">
            {ACCESSORIES.map((acc, idx) => (
              <div key={idx} className="bg-[var(--bg-primary)] p-6 flex flex-col gap-4 hover:bg-[var(--bg-secondary)] transition-colors group">
                <div className="aspect-square relative w-full overflow-hidden border border-[var(--border-color)] bg-white">
                  <Image src={acc.img} alt={`X1 Power by Bushra Impex - ${acc.name} - Machine Attachment`} fill sizes="25vw" className="object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-[12px] text-[var(--text-primary)] leading-tight">{acc.name}</h3>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{acc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORPORATE OVERVIEW / ENTITY PROFILE ──────────────── */}
      <section className="py-24 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <Label>Corporate Profile</Label>
            <h2 className="font-bebas text-[clamp(36px,5vw,56px)] text-[var(--text-primary)] leading-none tracking-tight">
              About Bushra Impex & X1 Power
            </h2>
            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
              Established in 2012 with headquarters in Bengaluru, Karnataka, <strong>Bushra Impex</strong> is one of India's leading wholesalers, importers, and distributors of premium agricultural machinery. In 2016, the company launched its proprietary brand <strong>X1 Power</strong>, dedicated to delivering robust, efficient, and cost-effective farming solutions. Engineered to withstand demanding Indian field conditions, every X1 Power machine passes stringent quality checks, boasts <strong>ISO 9001:2015</strong> certification, and is <strong>FMTTI tested</strong> to ensure subsidy eligibility under state government agricultural programs. Today, Bushra Impex powers nationwide productivity through a robust network of over 500+ authorized dealers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="text-[11px] font-bold uppercase tracking-widest text-[#D71920] hover:text-[#b01419] flex items-center gap-1 transition-colors">
                Our Full Journey <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Subsidy Approved", desc: "FMTTI tested for government subsidy programs across all Indian states." },
              { title: "ISO 9001 Certified", desc: "Adhering to strict international standards for quality management." },
              { title: "Bengaluru HQ", desc: "Corporate offices, main stockpoint, and central logistics in Karnataka." },
              { title: "Genuine Spare Parts", desc: "100% components availability across all service touchpoints." }
            ].map((item, index) => (
              <div key={index} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-5 flex flex-col gap-2 hover:border-[#D71920] transition-colors">
                <h3 className="font-bebas text-[18px] text-[var(--text-primary)] leading-tight">{item.title}</h3>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-[#111111] text-white border-t border-neutral-900 py-20">
        <div className="container-site flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-xl">
            <Label>Get Started</Label>
            <h2 className="font-bebas text-[clamp(36px,5vw,56px)] leading-none text-white">
              Talk to Our Product Experts
            </h2>
            <p className="text-[13px] text-neutral-400 leading-relaxed">
              Download catalogue sheets, request specific specs, or find a dealer near you — we are here to help.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href="https://wa.me/917624869606" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black font-bold uppercase tracking-widest text-[11px] px-7 py-3.5 hover:bg-neutral-100 transition-colors">
              WhatsApp Us
            </a>
            <a href="tel:+917624869606"
              className="inline-flex items-center gap-2 border border-neutral-700 text-white font-bold uppercase tracking-widest text-[11px] px-7 py-3.5 hover:border-white transition-colors">
              <Phone className="w-3.5 h-3.5" /> Call Now
            </a>
            <a href="/maincopy.pdf" download
              className="inline-flex items-center gap-2 border border-neutral-700 text-white font-bold uppercase tracking-widest text-[11px] px-7 py-3.5 hover:border-white transition-colors">
              <Download className="w-3.5 h-3.5" /> Catalogue
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
