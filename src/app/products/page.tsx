"use client";
import React from "react";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { Search, X, ArrowRight, GitCompareArrows, Check } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCompare } from "@/components/CompareContext";

// ─── B&W SVG icons per category ─────────────────────────────
function WeedersIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" />
      <path d="M5 18H2v-6l4-4h10l4 4v6h-2" /><path d="M9 6V2m6 4V2" />
      <path d="M9 18h6" />
    </svg>
  );
}
function ChainsawIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="10" height="6" rx="1" />
      <path d="M12 12h8" />
      <path d="M17 9l3 3-3 3" />
      <path d="M6 9V7a2 2 0 0 1 2-2h2" />
      <circle cx="6" cy="18" r="1.5" />
    </svg>
  );
}
function ChaffCutterIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="14" rx="1" />
      <path d="M7 8l10 0M7 12l10 0M7 16l6 0" />
      <path d="M19 4v14" />
    </svg>
  );
}
function WoodChipperIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="14" height="10" rx="1" />
      <path d="M17 12h4l-2-4h-2" />
      <path d="M7 8V5l4-2 4 2v3" />
      <circle cx="7" cy="21" r="2" /><circle cx="15" cy="21" r="2" />
    </svg>
  );
}
function HarvesterIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18h18M3 18V9l5-5h8l5 5v9" />
      <path d="M9 18V9m6 9V9" />
      <path d="M3 13h18" />
    </svg>
  );
}
function SprayerIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9h8v10H3z" />
      <path d="M11 13h6l2-4h-8v4z" />
      <path d="M17 9V5" /><path d="M14 5h6" />
      <circle cx="6" cy="22" r="1" />
      <path d="M20 14v7" /><path d="M17 17h6" />
    </svg>
  );
}
function WaterPumpIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
      <path d="M12 7v2m0 6v2M7 12h2m6 0h2" />
    </svg>
  );
}
function EarthAugerIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M9 21h6" />
      <path d="M9 6l3-3 3 3" /><path d="M7 10l5-2 5 2" /><path d="M8 14l4-2 4 2" />
    </svg>
  );
}
function LawnMowerIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="10" width="16" height="7" rx="1" />
      <circle cx="5" cy="20" r="2" /><circle cx="15" cy="20" r="2" />
      <path d="M18 13l3-6" /><path d="M18 10h2" />
    </svg>
  );
}
function TeaHarvesterIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l2 7H4L6 3z" /><rect x="3" y="10" width="18" height="4" rx="1" />
      <path d="M5 14v6m14-6v6M5 17h14" />
    </svg>
  );
}

function PressureWasherIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="10" height="8" rx="1" />
      <path d="M12 12h5l2-3" />
      <path d="M19 9l2-3" />
      <path d="M19 9c1 1 1 2 0 3" />
      <path d="M21 13l1 2M20 15l1 2M19 17l1 2" />
      <circle cx="6" cy="20" r="1.5" />
    </svg>
  );
}
function RiceMillIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="4" ry="2" />
      <path d="M8 5v4l4 2 4-2V5" />
      <path d="M12 11v3" />
      <path d="M9 17c0-1.7 1.3-3 3-3s3 1.3 3 3" />
      <path d="M7 20h10" />
      <path d="M5 12h2M17 12h2" />
      <path d="M5 12l-2 2M19 12l2 2" />
    </svg>
  );
}

const CAT_ICONS: Record<string, (a: { active: boolean }) => React.ReactElement> = {
  "weeders": WeedersIcon,
  "chainsaws": ChainsawIcon,
  "chaff-cutters": ChaffCutterIcon,
  "wood-chippers": WoodChipperIcon,
  "harvesters": HarvesterIcon,
  "sprayers": SprayerIcon,
  "water-pumps": WaterPumpIcon,
  "earth-augers": EarthAugerIcon,
  "lawn-mowers": LawnMowerIcon,
  "tea-harvesters": TeaHarvesterIcon,
  "pressure-washers": PressureWasherIcon,
  "rice-mills": RiceMillIcon,
};

function AllIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="0.5" /><rect x="14" y="3" width="7" height="7" rx="0.5" />
      <rect x="3" y="14" width="7" height="7" rx="0.5" /><rect x="14" y="14" width="7" height="7" rx="0.5" />
    </svg>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { add: addToCompare, remove: removeFromCompare, has: isInCompare } = useCompare();

  const categoryParam = searchParams.get("category");
  const [active, setActive] = useState(categoryParam || "all");
  const [search, setSearch] = useState("");

  // Sync state with URL parameter if it changes (e.g. user uses browser back/forward, or clicks a navbar link)
  React.useEffect(() => {
    if (categoryParam) {
      setActive(categoryParam);
    } else {
      setActive("all");
    }
  }, [categoryParam]);

  const handleCategoryClick = (slug: string) => {
    setActive(slug);
    if (slug === "all") {
      router.push("/products", { scroll: false });
    } else {
      router.push(`/products?category=${slug}`, { scroll: false });
    }
  };

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const catMatch = active === "all" || p.category === active;
      const q = search.toLowerCase();
      return (
        catMatch &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.modelCode.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q))
      );
    });
  }, [active, search]);

  return (
    <>
      <Navbar />

      {/* ─── COMPACT HEADER ──────────────────────────────── */}
      <section className="pt-24 bg-[var(--bg-primary)] border-b border-[var(--border-color)] transition-colors duration-300">
        <div className="container-site">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[var(--border-secondary)] pb-5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Equipment Catalog</div>
              <h1 className="font-bebas text-[clamp(40px,6vw,64px)] text-[var(--text-primary)] leading-none tracking-tight">
                {active === "all" ? "All Products" : CATEGORIES.find(c => c.slug === active)?.name || "All Products"}
              </h1>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search models, features..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[12px] px-10 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D71920] transition-colors"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[#D71920]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* ─── ICON CATEGORY TABS ───────────────────────── */}
          {/* border-b on container = full-width grey rule; each button -mb-px so active border-b-2 overlaps it */}
          <div className="flex items-end overflow-x-auto hide-scrollbar gap-0 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-[var(--border-color)] transition-colors duration-300">

            {/* ALL */}
            <button
              onClick={() => handleCategoryClick("all")}
              className={`group shrink-0 flex flex-col items-center gap-2 px-5 py-4 transition-colors border-b-2 -mb-px whitespace-nowrap ${active === "all"
                  ? "text-[#D71920] border-[#D71920]"
                  : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]"
                }`}
            >
              <AllIcon active={active === "all"} />
              <span className="text-[9px] font-bold uppercase tracking-[0.14em]">All</span>
            </button>

            {CATEGORIES.map((cat) => {
              const isActive = active === cat.slug;
              const Icon = CAT_ICONS[cat.slug] ?? AllIcon;
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`group shrink-0 flex flex-col items-center gap-2 px-5 py-4 transition-colors border-b-2 -mb-px whitespace-nowrap ${isActive
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
      {active !== "all" && (
        <div key={active} className="bg-[var(--bg-primary)] pt-6 transition-colors duration-300">
          <div className="container-site">
            <div className="w-full overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center justify-center min-h-[100px] md:min-h-[200px]">
              <img
                src={CATEGORIES.find((c) => c.slug === active)?.bannerImage || `/category-banners/${active}-banner.webp`}
                alt={`X1 Power by Bushra Impex - ${CATEGORIES.find((c) => c.slug === active)?.name || "Category"} Category Banner - Premium Agricultural Equipment`}
                className="w-full h-auto block object-contain"
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      )}
      ─── END BANNER STRIP */}


      {/* ─── GRID ─────────────────────────────────────────── */}
      <section className="py-10 pb-28 bg-[var(--bg-primary)] transition-colors duration-300">
        <div className="container-site">

          <div className="flex items-center justify-between mb-7">
            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">
              {filtered.length} Product{filtered.length !== 1 ? "s" : ""}
              {active !== "all" && <> — {CATEGORIES.find((c) => c.slug === active)?.name}</>}
            </p>
            {active !== "all" && (
              <button
                onClick={() => { handleCategoryClick("all"); setSearch(""); }}
                className="text-[10px] font-bold uppercase tracking-widest text-[#D71920] hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <div
                  key={p.slug}
                  className="group relative flex flex-col bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--text-muted)] hover:shadow-[0_2px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_2px_20px_rgba(255,255,255,0.06)] transition-all duration-300"
                >
                  {/* Compare button overlay */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isInCompare(p.slug)) {
                        removeFromCompare(p.slug);
                      } else {
                        addToCompare(p);
                      }
                    }}
                    className={`absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm ${isInCompare(p.slug)
                        ? "bg-[#D71920] text-white border border-[#D71920]"
                        : "bg-[var(--bg-primary)]/90 backdrop-blur-sm text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[#D71920]"
                      }`}
                    title={isInCompare(p.slug) ? "Remove from comparison" : "Add to comparison"}
                  >
                    {isInCompare(p.slug) ? (
                      <>
                        <Check className="w-3 h-3" /> Added
                      </>
                    ) : (
                      <>
                        <GitCompareArrows className="w-3 h-3 text-[var(--text-muted)]" /> + Compare
                      </>
                    )}
                  </button>

                  <Link href={`/products/${p.category}/${p.slug}`} className="flex flex-col flex-1">
                    {/* Image */}
                    {p.image ? (
                      <div className="aspect-square bg-[var(--bg-secondary)] border-b border-[var(--border-color)] overflow-hidden flex items-center justify-center transition-colors duration-300">
                        <div className="relative w-full h-full">
                          <img
                            src={p.image}
                            alt={`X1 Power by Bushra Impex - ${p.name} - Type: ${p.categoryName}`}
                            className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
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

                    {/* Info */}
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
                        <span className="w-8 h-8 border border-[var(--border-color)] group-hover:bg-[#D71920] group-hover:border-[#D71920] flex items-center justify-center transition-all shrink-0">
                          <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-white transition-colors" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-28 gap-3 border border-[var(--border-secondary)] bg-[var(--bg-secondary)] transition-colors duration-300">
              <span className="font-bebas text-[60px] text-[var(--border-color)] leading-none">0</span>
              <h3 className="font-bebas text-[22px] text-[var(--text-secondary)]">No Products Found</h3>
              <p className="text-[11px] text-[var(--text-muted)]">Try a different category or clear your search.</p>
              <button onClick={() => { setSearch(""); handleCategoryClick("all"); }} className="btn-primary mt-3">Reset</button>
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
        </div>
      </section>

      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </React.Suspense>
  );
}
