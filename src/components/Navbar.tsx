"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, MessageCircle, Phone, Download, Users2 } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/dealer", label: "Dealers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-color)] transition-colors duration-300" style={{ height: 64 }}>
      <div className="container-site h-full flex items-center justify-between gap-2 sm:gap-4 md:gap-8">

        <Link href="/" className="flex items-center gap-2 sm:gap-4 min-w-0 shrink">
          <img
            src={isDark ? "/images/bushraimpex-logo-white.png" : "/images/bushraimpex-logo-dark.png"}
            alt="Bushra Impex Official Distributor"
            className="h-4 min-[375px]:h-5 sm:h-6 md:h-8 w-auto max-w-[40vw] sm:max-w-none object-contain transition-all duration-300"
          />
          <span className="w-px h-4 sm:h-5 md:h-7 bg-[var(--border-color)] transition-colors duration-300 shrink-0" />
          <img
            src="/images/x1power-new logo.png"
            alt="X1 Power Brand Logo"
            className="h-4 min-[375px]:h-5 sm:h-6 md:h-8 w-auto max-w-[35vw] sm:max-w-none object-contain dark:brightness-200 dark:contrast-150 transition-all duration-300"
          />
        </Link>

        {/* ── DESKTOP NAV ── */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                pathname === l.href ? "text-[#D71920]" : "text-[var(--text-secondary)] hover:text-[#D71920]"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Products dropdown */}
          <div className="relative h-full flex items-center group">
            <Link
              href="/products"
              className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                pathname.startsWith("/products") ? "text-[#D71920]" : "text-[var(--text-secondary)] group-hover:text-[#D71920]"
              }`}
            >
              Products
              <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
            </Link>

            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[560px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] shadow-xl transition-colors duration-300">
                <Link
                  href="/products"
                  className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-color)] text-[10px] font-bold uppercase tracking-widest text-[#D71920] hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <span>View All Products</span>
                  <span>→</span>
                </Link>
                <div className="grid grid-cols-2 p-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products/${cat.slug}`}
                      className="px-4 py-3 hover:bg-[var(--bg-secondary)] transition-colors group/item"
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover/item:text-[#D71920] transition-colors">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* ── RIGHT CTA ── */}
        <div className="hidden xl:flex items-center gap-4 2xl:gap-5">
          <ThemeToggle />
          <a
            href="https://wa.me/917624869606"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] font-bold text-[var(--text-secondary)] hover:text-[#D71920] transition-colors tracking-wide"
          >
            +91 76248 69606
          </a>
          <Link
            href="/dealer"
            className="bg-[#D71920] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-[#B71520] transition-colors"
          >
            Become a Dealer
          </Link>
        </div>

        {/* ── MOBILE / TABLET TOGGLE ── */}
        <div className="xl:hidden flex items-center gap-3">
          <button
            className="p-2 text-[var(--text-primary)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

    </header>

      {/* ── MOBILE MENU: BACKDROP ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 9998,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
          }}
          className="xl:hidden"
        />
      )}

      {/* ── MOBILE MENU: SLIDE-IN DRAWER ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "85vw",
          maxWidth: 380,
          zIndex: 9999,
          background: "var(--bg-primary)",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.4)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          overflow: "hidden", /* Mascot needs to peek, so outer doesn't scroll */
          display: "flex",
          flexDirection: "column",
        }}
        className="xl:hidden"
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--border-color)", background: "var(--bg-secondary)", flexShrink: 0 }}>
          <span className="font-bebas text-2xl tracking-widest" style={{ color: "var(--text-primary)" }}>Menu</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(false)}
              style={{ padding: 8, background: "transparent", border: "none", cursor: "pointer", display: "flex", color: "var(--text-primary)" }}
            >
              <X style={{ width: 24, height: 24 }} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column" }}>

        {/* Nav Links */}
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setMobileOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 24px",
              borderBottom: "1px solid var(--border-color)",
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: pathname === l.href ? "#D71920" : "var(--text-primary)",
              background: pathname === l.href ? "var(--bg-secondary)" : "transparent",
              textDecoration: "none",
            }}
          >
            {l.label}
            <ChevronRight style={{ width: 16, height: 16, opacity: 0.4 }} />
          </Link>
        ))}

        {/* Products Accordion */}
        <button
          onClick={() => setCatOpen(!catOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 24px",
            width: "100%",
            borderBottom: "1px solid var(--border-color)",
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: catOpen ? "#D71920" : "var(--text-primary)",
            background: catOpen ? "var(--bg-secondary)" : "transparent",
            cursor: "pointer",
            border: "none",
          }}
        >
          Products
          <ChevronDown
            style={{
              width: 16, height: 16,
              transform: catOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.3s",
              color: catOpen ? "#D71920" : "inherit",
              opacity: catOpen ? 1 : 0.4,
            }}
          />
        </button>

        {/* Products Sub-menu */}
        {catOpen && (
          <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
            <Link
              href="/products"
              onClick={() => { setMobileOpen(false); setCatOpen(false); }}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", borderBottom: "1px solid var(--border-color)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#D71920", textDecoration: "none" }}
            >
              View All Products
              <ChevronRight style={{ width: 14, height: 14 }} />
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                onClick={() => { setMobileOpen(false); setCatOpen(false); }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", borderBottom: "1px solid var(--border-color)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", textDecoration: "none" }}
              >
                {cat.name}
                <ChevronRight style={{ width: 12, height: 12, opacity: 0.3 }} />
              </Link>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ padding: "24px 24px 60px 24px", display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid var(--border-color)", marginTop: "auto" }}>
          
          {/* CTA: Dealer (Primary Red) */}
          <Link
            href="/dealer"
            onClick={() => setMobileOpen(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#D71920", color: "#fff", padding: "16px 20px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", borderRadius: 4 }}
          >
            <Users2 style={{ width: 16, height: 16 }} /> Become a Dealer
          </Link>

          {/* WhatsApp (Sleek Dark/High Contrast) */}
          <a
            href="https://wa.me/917624869606"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "var(--text-primary)", color: "var(--bg-primary)", padding: "16px 20px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", borderRadius: 4 }}
          >
            <MessageCircle style={{ width: 16, height: 16 }} /> WhatsApp Us
          </a>

          {/* Secondary row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <a
              href="tel:08041503394"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "14px 8px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", borderRadius: 4, background: "transparent" }}
            >
              <Phone style={{ width: 14, height: 14 }} /> Call Us
            </a>
            <a
              href="https://drive.google.com/file/d/1Ut_jmJVbYQqyYQNfa_IzGfel3jNr8Ohf/view?usp=drive_link" target="_blank" rel="noopener noreferrer"
              download
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "14px 8px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", borderRadius: 4, background: "transparent" }}
            >
              <Download style={{ width: 14, height: 14 }} /> Catalogue
            </a>
          </div>
        </div>

        </div> {/* End of Scrollable Container */}

        {/* -- THE PEEKING MASCOT (commented out - uncomment to restore) --
        <div style={{
          position: "absolute",
          bottom: -15,
          right: -20,
          width: 160,
          height: 200,
          pointerEvents: "none",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0)" : "translateY(40px)",
          transition: "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s, opacity 0.5s 0.2s",
          zIndex: 999,
        }}>
          <Image 
            src="/images/mascot-peeking.png" 
            alt="X1 Power Mascot" 
            fill 
            style={{ objectFit: "contain", objectPosition: "bottom right" }} 
            unoptimized
          />
        </div>
        ── END MASCOT */}


      </div>
    </>
  );
}

