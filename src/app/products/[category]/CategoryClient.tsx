"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductImageZoom from "@/components/ProductImageZoom";
import { CATEGORIES, PRODUCTS } from "@/data/products";

// ─── B&W SVG icons per category ─────────────────────────────
function WeedersIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/>
      <path d="M5 18H2v-6l4-4h10l4 4v6h-2"/><path d="M9 6V2m6 4V2"/>
      <path d="M9 18h6"/>
    </svg>
  );
}
function ChainsawIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="10" height="6" rx="1"/>
      <path d="M12 12h8"/>
      <path d="M17 9l3 3-3 3"/>
      <path d="M6 9V7a2 2 0 0 1 2-2h2"/>
      <circle cx="6" cy="18" r="1.5"/>
    </svg>
  );
}
function ChaffCutterIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="14" rx="1"/>
      <path d="M7 8l10 0M7 12l10 0M7 16l6 0"/>
      <path d="M19 4v14"/>
    </svg>
  );
}
function WoodChipperIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="14" height="10" rx="1"/>
      <path d="M17 12h4l-2-4h-2"/>
      <path d="M7 8V5l4-2 4 2v3"/>
      <circle cx="7" cy="21" r="2"/><circle cx="15" cy="21" r="2"/>
    </svg>
  );
}
function HarvesterIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18h18M3 18V9l5-5h8l5 5v9"/>
      <path d="M9 18V9m6 9V9"/>
      <path d="M3 13h18"/>
    </svg>
  );
}
function SprayerIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9h8v10H3z"/>
      <path d="M11 13h6l2-4h-8v4z"/>
      <path d="M17 9V5"/><path d="M14 5h6"/>
      <circle cx="6" cy="22" r="1"/>
      <path d="M20 14v7"/><path d="M17 17h6"/>
    </svg>
  );
}
function WaterPumpIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>
      <path d="M12 7v2m0 6v2M7 12h2m6 0h2"/>
    </svg>
  );
}
function EarthAugerIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M9 21h6"/>
      <path d="M9 6l3-3 3 3"/><path d="M7 10l5-2 5 2"/><path d="M8 14l4-2 4 2"/>
    </svg>
  );
}
function LawnMowerIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="10" width="16" height="7" rx="1"/>
      <circle cx="5" cy="20" r="2"/><circle cx="15" cy="20" r="2"/>
      <path d="M18 13l3-6"/><path d="M18 10h2"/>
    </svg>
  );
}
function TeaHarvesterIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l2 7H4L6 3z"/><rect x="3" y="10" width="18" height="4" rx="1"/>
      <path d="M5 14v6m14-6v6M5 17h14"/>
    </svg>
  );
}

function PressureWasherIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="10" height="8" rx="1"/>
      <path d="M12 12h5l2-3"/>
      <path d="M19 9l2-3"/>
      <path d="M19 9c1 1 1 2 0 3"/>
      <path d="M21 13l1 2M20 15l1 2M19 17l1 2"/>
      <circle cx="6" cy="20" r="1.5"/>
    </svg>
  );
}
function RiceMillIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="4" ry="2"/>
      <path d="M8 5v4l4 2 4-2V5"/>
      <path d="M12 11v3"/>
      <path d="M9 17c0-1.7 1.3-3 3-3s3 1.3 3 3"/>
      <path d="M7 20h10"/>
      <path d="M5 12h2M17 12h2"/>
      <path d="M5 12l-2 2M19 12l2 2"/>
    </svg>
  );
}

const CAT_ICONS: Record<string, (a: { active: boolean }) => React.ReactElement> = {
  "weeders":          WeedersIcon,
  "chainsaws":        ChainsawIcon,
  "chaff-cutters":    ChaffCutterIcon,
  "wood-chippers":    WoodChipperIcon,
  "harvesters":       HarvesterIcon,
  "sprayers":         SprayerIcon,
  "water-pumps":      WaterPumpIcon,
  "earth-augers":     EarthAugerIcon,
  "lawn-mowers":      LawnMowerIcon,
  "tea-harvesters":   TeaHarvesterIcon,
  "pressure-washers": PressureWasherIcon,
  "rice-mills":       RiceMillIcon,
};

function AllIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="0.5"/><rect x="14" y="3" width="7" height="7" rx="0.5"/>
      <rect x="3" y="14" width="7" height="7" rx="0.5"/><rect x="14" y="14" width="7" height="7" rx="0.5"/>
    </svg>
  );
}

interface CategoryContent {
  description: string;
  buyingTips: string;
  faqs: { q: string; a: string }[];
}

const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  weeders: {
    description: "Professional-grade power weeders and power tillers engineered for weeding, soil aeration, tilling, and seedbed preparation. Highly optimized for Indian field conditions under the proprietary X1 Power brand by Bushra Impex.",
    buyingTips: "Select diesel-powered weeders for large-scale, heavy-duty clay tilling and continuous daily use. Opt for petrol-powered models for lightweight maneuverability, ease of startup, and inter-row cropping (vegetables, sugarcane, orchards).",
    faqs: [
      { q: "What is the difference between a power weeder and a power tiller?", a: "Power weeders are generally lighter and designed for weeding between rows of standing crops and secondary tilling. Power tillers are heavier, higher-horsepower machines used for primary land preparation, deep soil turning, and can often pull small trailers." },
      { q: "Are X1 Power weeders approved for government subsidies?", a: "Yes. X1 Power weeders undergo rigorous FMTTI testing and are registered for agricultural subsidy programs across multiple Indian states. Contact your local dealer or state agriculture department to verify current eligibility." },
      { q: "How many HP (Horsepower) do I need for my farm?", a: "For small-to-medium vegetable plots or orchard weeding, a 7.0 HP petrol weeder is highly suitable. For deep tilling in large paddy fields or sugarcane rows, a heavy-duty 9.0 HP diesel weeder is recommended." }
    ]
  },
  chainsaws: {
    description: "High-performance petrol chainsaws designed for forestry, branch trimming, tree felling, and farm wood clearing. Powered by efficient Japanese engine technology under the X1 Power brand.",
    buyingTips: "Ensure you match the guide bar length (typically 18-inch to 22-inch) to the average tree diameter you plan to cut. Backpack chainsaws or lightweight models are preferred for extended orchard pruning.",
    faqs: [
      { q: "What is the recommended fuel mixture for X1 Power chainsaws?", a: "X1 Power chainsaws use 2-stroke petrol engines. The recommended ratio is 1:25 (40 ml of 2T engine oil mixed with 1 Litre of petrol) to ensure optimal lubrication and engine longevity." },
      { q: "How often should I sharpen the chainsaw chain?", a: "Sharpening frequency depends on usage. You should sharpen the chain when the saw starts producing sawdust instead of clean wood chips, or when you have to apply physical force to cut." }
    ]
  },
  "chaff-cutters": {
    description: "Heavy-duty electric and engine-driven chaff cutters designed to chop green and dry fodder into uniform pieces for cattle, sheep, and goat feed. Manufactured by Bushra Impex for high-capacity dairy operations.",
    buyingTips: "For residential dairy farms (1-5 cattle), a single-phase 2 HP electric chaff cutter is highly efficient. Larger dairy estates should consider a 3 HP or 5 HP chaff cutter with automatic feeding rollers.",
    faqs: [
      { q: "Can X1 Power chaff cutters process both green and dry fodder?", a: "Yes. X1 Power chaff cutters are equipped with dual-purpose hardened alloy blades that cut paddy straw, wheat straw, green grass, sugarcane tops, and maize stalks efficiently." },
      { q: "What is the hourly output capacity of the chaff cutter?", a: "Output depends on the model. Our compact chaff cutters process between 400 to 800 kg per hour, while high-capacity commercial models exceed 1,500 kg per hour." }
    ]
  },
  "wood-chippers": {
    description: "High-capacity mobile wood chippers and branch shredders under the X1 Power brand. Ideal for organic waste reduction, garden maintenance, and mulch production.",
    buyingTips: "Check the maximum branch entry diameter (ranging from 2-inch to 5-inch). Choose engine-driven models (9 HP to 15 HP) for mobile operation in remote orchards where power is unavailable.",
    faqs: [
      { q: "What type of wood can the X1 Power wood chipper process?", a: "It is designed to chip fresh prunings, branches, twigs, bamboo, and leafy farm waste. Avoid chipping dry hardwood logs larger than the model's rated feed diameter." },
      { q: "How do I maintain the chipper blades?", a: "Regularly check the dual reversible knives for sharpness. Dull blades increase engine strain and reduce output quality. Blades can be flipped or resharpened periodically." }
    ]
  },
  harvesters: {
    description: "Side-pack and backpack crop harvesters and reapers designed for efficient base-cutting of paddy, wheat, grass, weeds, and tea pruning. Highly preferred by Indian farmers for manual harvest replacement.",
    buyingTips: "Select backpack crop harvesters for terraced or sloped farms to improve weight distribution and reduce operator fatigue. Use side-pack harvesters for flat paddy and wheat fields.",
    faqs: [
      { q: "Which blades should I use for harvesting paddy and wheat?", a: "Use an 80-tooth or 40-tooth circular alloy blade for clean base-cutting of grain stalks. For cutting thick grass or weeds, a 2-tooth or 3-tooth brush cutter blade is more suitable." },
      { q: "What is the harvesting speed per acre?", a: "On average, a trained operator using an X1 Power harvester can clear 1 acre of crop in approximately 4 to 6 hours, which is up to 10 times faster than manual harvesting." }
    ]
  },
  sprayers: {
    description: "Knapsack sprayers, battery-operated sprayers, portable power sprayers, and heavy-duty HTP pump sprayers. Sourced and distributed by Bushra Impex for crop pest control, fertilization, and farm sanitization.",
    buyingTips: "Choose battery sprayers for row crops and vegetables. For tall trees like arecanut, coconut, and mango, select high-pressure engine-driven HTP spray pumps with long-reach hoses.",
    faqs: [
      { q: "How long does the battery last on a battery-operated sprayer?", a: "X1 Power battery sprayers are equipped with high-capacity 12V lead-acid or lithium-ion batteries, delivering up to 4 to 6 hours of continuous spraying on a full charge." },
      { q: "What maintenance does an HTP spray pump require?", a: "Regularly check the pump oil level (use 20W-40 oil), lubricate the grease cups daily before operation, and wash the pump with clean water after spraying corrosive chemical solutions." }
    ]
  },
  "water-pumps": {
    description: "Portable agricultural water pumps powered by efficient petrol and diesel engines. Designed for field irrigation, water transfer, and farm drainage across India.",
    buyingTips: "Match the inlet and outlet diameter (typically 2-inch or 3-inch) to your irrigation volume. Select high-head models if you need to pump water uphill or over long horizontal distances.",
    faqs: [
      { q: "What is the maximum suction lift of X1 Power water pumps?", a: "Our agricultural engine pumps deliver a self-priming suction lift of up to 6 to 8 meters, with a total head discharge of 25 to 30 meters depending on engine power." },
      { q: "Do I need to prime the pump before starting?", a: "Yes. Always fill the pump chamber with clean water through the priming cap before starting the engine to prevent damage to the mechanical seal." }
    ]
  },
  "earth-augers": {
    description: "Robust earth augers for drilling holes in soil. Used for fencing posts, electrical grounding, plantation pit digging, and tree plantation across India.",
    buyingTips: "Single-man augers (52cc to 68cc) are suitable for standard soil drilling up to 8-inch holes. For heavy clay soils or larger holes (10 to 12 inches), select high-torque two-man augers.",
    faqs: [
      { q: "What drill bit sizes are compatible with X1 Power augers?", a: "X1 Power augers are compatible with 4-inch, 6-inch, 8-inch, 10-inch, and 12-inch drill bits. Standard shaft lengths are 800mm, with extensions available for deeper holes." },
      { q: "Can the auger drill through rocky terrain?", a: "Earth augers are designed for soil, clay, and soft gravel. Drilling into solid rock or thick concrete is not recommended and can damage the gearbox or drill tip." }
    ]
  },
  "lawn-mowers": {
    description: "Petrol and electric rotary lawn mowers with high-capacity grass catcher boxes. Designed for gardens, public parks, resorts, and sports fields.",
    buyingTips: "Select electric lawn mowers for small home gardens up to 2,000 sq ft. For large turf areas, sports fields, or hilly lawns, choose self-propelled petrol lawn mowers.",
    faqs: [
      { q: "How do I adjust the grass cutting height?", a: "Our mowers feature single-lever height adjustment, letting the operator set the cutting height between 25mm to 75mm across multiple positions." },
      { q: "What maintenance is needed for petrol lawn mowers?", a: "Keep the cutting blade clean and balanced, change the engine oil after every 50 hours of use, and clean the air filter regularly to prevent power loss." }
    ]
  },
  "tea-harvesters": {
    description: "Highly specialized single-man and two-man tea leaf harvesting machines under the X1 Power brand. Trusted by major tea estates in Assam, West Bengal, and South India.",
    buyingTips: "Select single-man harvesters for tight rows and steep mountain slopes. Two-man models with leaf blower ducts are recommended for large, flat estate rows to maximize harvesting volume.",
    faqs: [
      { q: "What blade length is standard on tea harvesters?", a: "Standard single-man models feature a 600mm curved blade, while two-man models feature 1000mm to 1200mm curved cutting blades to match tea bush widths." },
      { q: "How do tea harvesters separate plucked leaves?", a: "X1 Power tea harvesters feature an integrated blower fan that drives cut shoots through a collection chute directly into a attached fabric leaf collection bag." }
    ]
  },
  "pressure-washers": {
    description: "High-pressure commercial and domestic washing pumps. Ideal for agricultural machinery cleaning, tractor washing, dairy shed hygiene, and industrial use.",
    buyingTips: "Check the operating pressure (PSI / Bar) and water flow rate. Inductive-motor models are preferred for quiet, long-duration commercial washing, while universal motors suit light domestic use.",
    faqs: [
      { q: "Can the pressure washer suck water directly from a bucket?", a: "Yes. Most X1 Power pressure washers are equipped with self-priming pumps that can draw water from a static bucket or tank as well as a direct tap connection." },
      { q: "What is the recommended nozzle angle for washing tractors?", a: "Use a 25-degree or 40-degree fan nozzle for general mud and tractor body washing. Do not use a zero-degree pencil jet directly on engine wiring or thin seals." }
    ]
  },
  "rice-mills": {
    description: "Compact domestic mini rice mills and pulverizers designed for processing paddy and grinding grains on the farm. Built for single-phase electrical supply compatibility.",
    buyingTips: "Choose combined rice mill and pulverizer models if you need to husk paddy and grind flour/spices in the same machine. Look for vibration-damped steel frames.",
    faqs: [
      { q: "What is the hourly processing capacity?", a: "Our domestic mini rice mills process between 150 to 250 kg of paddy per hour, delivering clean white rice with minimum broken grain ratios." },
      { q: "Is the machine compatible with standard home power?", a: "Yes. All X1 Power mini rice mills are designed to operate on single-phase 220V domestic electric connections, requiring no three-phase industrial setup." }
    ]
  }
};

export default function CategoryClient({ categorySlug }: { categorySlug: string }) {
  const router = useRouter();
  
  const [search, setSearch] = React.useState("");
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const activeCategory = CATEGORIES.find(c => c.slug === categorySlug);
  
  const content = CATEGORY_CONTENT[categorySlug] || {
    description: `Explore premium ${activeCategory?.name || ""} from X1 Power by Bushra Impex. Hard-working machinery built for Indian farms.`,
    buyingTips: `Consider engine horsepower, operational fuel type, and target crop spacing when selecting your machine.`,
    faqs: []
  };

  const handleCategoryClick = (slug: string) => {
    if (slug === "all") {
      router.push("/products", { scroll: false });
    } else {
      router.push(`/products/${slug}`, { scroll: false });
    }
  };

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const catMatch = p.category === categorySlug;
      const q = search.toLowerCase();
      return (
        catMatch &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.modelCode.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q))
      );
    });
  }, [categorySlug, search]);

  if (!activeCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <h1 className="font-bebas text-6xl text-[var(--text-primary)] mb-4">Category Not Found</h1>
          <Link href="/products" className="btn-primary">View All Products</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* ─── COMPACT HEADER ──────────────────────────────── */}
      <section className="pt-24 bg-[var(--bg-primary)] border-b border-[var(--border-color)] transition-colors duration-300">
        <div className="container-site">

          {/* Breadcrumb + Title + Search */}
          <div className="flex items-start justify-between gap-8 pt-2 pb-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                <Link href="/" className="hover:text-[#D71920] transition-colors">Home</Link>
                <span>/</span>
                <Link href="/products" className="hover:text-[#D71920] transition-colors">Products</Link>
                <span>/</span>
                <span className="text-[#D71920]">{activeCategory.name}</span>
              </div>
              <h1 className="font-bebas text-[48px] text-[var(--text-primary)] leading-none tracking-tight">
                {activeCategory.name}
              </h1>
            </div>

            {/* Search */}
            <div className="relative w-64 shrink-0 mt-7">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)] pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${activeCategory.name}...`}
                className="w-full pl-10 pr-9 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D71920] transition-colors duration-300"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" />
                </button>
              )}
            </div>
          </div>

          {/* ─── ICON CATEGORY TABS ───────────────────────── */}
          <div className="flex items-end overflow-x-auto hide-scrollbar gap-0 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-[var(--border-color)] transition-colors duration-300">
            {/* ALL */}
            <button
              onClick={() => handleCategoryClick("all")}
              className={`group shrink-0 flex flex-col items-center gap-2 px-5 py-4 transition-colors border-b-2 -mb-px whitespace-nowrap text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]`}
            >
              <AllIcon active={false} />
              <span className="text-[9px] font-bold uppercase tracking-[0.14em]">All</span>
            </button>

            {CATEGORIES.map((cat) => {
              const isActive = categorySlug === cat.slug;
              const Icon = CAT_ICONS[cat.slug] ?? AllIcon;
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`group shrink-0 flex flex-col items-center gap-2 px-5 py-4 transition-colors border-b-2 -mb-px whitespace-nowrap ${
                    isActive
                      ? "text-[#D71920] border-[#D71920]"
                      : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Icon active={isActive} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-center leading-tight">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CATEGORY HORIZONTAL BANNER STRIP (commented out — uncomment to restore) ───
      <div key={categorySlug} className="bg-[var(--bg-primary)] pt-6 transition-colors duration-300">
        <div className="container-site">
          <div className="w-full border border-[var(--border-color)] bg-[var(--bg-secondary)] relative">
            <Image
              src={activeCategory.bannerImage}
              alt={`X1 Power by Bushra Impex - ${activeCategory.name} Category - Premium Agricultural Equipment`}
              width={1600}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
      ─── END BANNER STRIP */}


      {/* ─── CATEGORY INTRO & BUYING GUIDE ──────────────────── */}
      <section className="pt-10 pb-6 bg-[var(--bg-primary)] border-b border-[var(--border-secondary)] transition-colors duration-300">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920]">Category Overview</span>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
              {content.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 bg-[var(--bg-secondary)] p-6 border border-[var(--border-color)]">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-primary)]">How to Choose</span>
            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
              {content.buyingTips}
            </p>
          </div>
        </div>
      </section>

      {/* ─── GRID ─────────────────────────────────────────── */}
      <section className="py-10 bg-[var(--bg-primary)] transition-colors duration-300">
        <div className="container-site">

          <div className="flex items-center justify-between mb-7">
            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">
              {filtered.length} Product{filtered.length !== 1 ? "s" : ""} — {activeCategory.name}
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.category}/${p.slug}`}
                  className="group flex flex-col bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--text-muted)] hover:shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-300"
                >
                  {p.image ? (
                    <div className="aspect-square bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex flex-col items-center justify-center relative z-10 group-hover:z-20 transition-colors duration-300">
                      <ProductImageZoom imageUrl={p.image} altText={p.name} />
                    </div>
                  ) : (
                    <div className="aspect-square bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex flex-col items-center justify-center gap-3 transition-colors duration-300">
                      <div className="w-8 h-px bg-[var(--border-secondary)]" />
                      <span className="font-bebas text-[13px] text-[var(--text-muted)] tracking-[0.18em] text-center px-6 leading-tight">
                        {p.modelCode}
                      </span>
                      <div className="w-8 h-px bg-[var(--border-secondary)]" />
                    </div>
                  )}

                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#D71920]">
                      {p.categoryName}
                    </span>
                    <h2 className="font-bebas text-[20px] text-[var(--text-primary)] group-hover:text-[#D71920] transition-colors leading-tight">
                      {p.name}
                    </h2>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-2 flex-1">
                      {p.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 mt-1 border-t border-[var(--border-secondary)] transition-colors duration-300">
                      <div>
                        <span className="block text-[9px] text-[var(--text-muted)] uppercase tracking-widest font-bold">
                          {Object.keys(p.specs)[0]}
                        </span>
                        <span className="text-[12px] font-bold text-[var(--text-secondary)]">
                          {Object.values(p.specs)[0]}
                        </span>
                      </div>
                      <span className="w-8 h-8 border border-[var(--border-color)] group-hover:bg-[#D71920] flex items-center justify-center transition-all shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-white transition-colors" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-28 gap-3 border border-[var(--border-secondary)] bg-[var(--bg-secondary)] transition-colors duration-300">
              <span className="font-bebas text-[60px] text-[var(--border-color)] leading-none">0</span>
              <h3 className="font-bebas text-[22px] text-[var(--text-secondary)]">No Products Found</h3>
              <p className="text-[11px] text-[var(--text-muted)]">Try a different search.</p>
              <button onClick={() => setSearch("")} className="btn-primary mt-3">Reset</button>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="mt-14 pt-8 border-t border-[var(--border-secondary)] flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300">
              <p className="text-[12px] text-[var(--text-muted)]">
                Can't find the right machine? Our team will help you choose.
              </p>
              <Link href="/contact" className="btn-primary shrink-0">
                Request a Quote <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Category-Level FAQs */}
          {content.faqs.length > 0 && (
            <div className="mt-20 border-t border-[var(--border-color)] pt-14 max-w-4xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920]">{activeCategory.name} FAQ</span>
                <div className="flex-1 h-px bg-[var(--border-color)]" />
              </div>
              <div className="border border-[var(--border-color)] bg-[var(--bg-primary)]">
                {content.faqs.map((f, i) => (
                  <div key={i} className="border-b border-[var(--border-color)] last:border-0">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                      <span className="text-[12px] font-bold text-[var(--text-primary)]">{f.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5">
                        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{f.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
