/**
 * =========================================================================
 * CRITICAL SYSTEM INSTRUCTION / PERMANENT ROUTE PRESERVATION NOTICE
 * FOR ALL AI AGENTS, AI CODERS, AND REPO DEVELOPERS:
 * 
 * The route `/connect` (this file: `src/app/connect/page.tsx`) is a PERMANENT,
 * IMMUTABLE entry point for both `bushraimpex.com/connect` and `x1power.in/connect`.
 * 
 * Physical marketing assets across India (machinery QR stickers, laser-etched
 * metal tags, 40-page printed catalogues, visiting cards, warranty cards, and
 * dealer showroom boards) are hardcoded with forever QR codes pointing here.
 * 
 * DO NOT DELETE, RENAME, REDIRECT, OR DEPRECATE THIS ROUTE UNDER ANY CIRCUMSTANCES
 * UNLESS THE USER EXPLICITLY INSTRUCTS TO DO SO AND YOU SPECIFICALLY ASK THE USER
 * TO CONFIRM BEFORE TAKING ANY ACTION.
 * =========================================================================
 */

"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { downloadVCard } from "@/lib/vcard";
import { CATEGORIES, PRODUCTS, Product } from "@/data/products";
import {
  Mail,
  Globe,
  BookOpen,
  Package,
  MapPin,
  IdCard,
  Share2,
  Check,
  QrCode,
  ExternalLink,
  ShieldCheck,
  Handshake,
  Truck,
  HeartHandshake,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Download,
  X,
  Compass,
  Layers,
} from "lucide-react";

export default function ConnectPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [activeBranch, setActiveBranch] = useState<"bengaluru" | "saharanpur">("bengaluru");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [isPaused, setIsPaused] = useState(false);

  // ─── EXTRACT 2 FEATURED PRODUCTS FROM EACH CATEGORY ───────────────
  const featuredProducts: Product[] = useMemo(() => {
    const list: Product[] = [];
    CATEGORIES.forEach((cat) => {
      const prodsInCat = PRODUCTS.filter((p) => p.category === cat.slug);
      list.push(...prodsInCat.slice(0, 2));
    });
    return list;
  }, []);

  // Filtered list for slideshow
  const filteredProducts = useMemo(() => {
    if (selectedCategoryFilter === "all") return featuredProducts;
    return featuredProducts.filter((p) => p.category === selectedCategoryFilter);
  }, [featuredProducts, selectedCategoryFilter]);

  // Slideshow Autoplay
  useEffect(() => {
    if (isPaused || filteredProducts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % filteredProducts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, filteredProducts.length]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [selectedCategoryFilter]);

  function triggerToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }

  // Handle Native Share / Clipboard Fallback
  async function handleShare() {
    const shareUrl =
      typeof window !== "undefined"
        ? window.location.href
        : "https://bushraimpex.com/connect";

    const shareData = {
      title: "Bushra Impex & X1 Power — Digital Contact Hub",
      text: "Official digital contact card, product catalogue, and navigation for Bushra Impex & X1 Power Agricultural Machinery.",
      url: shareUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  }

  function copyToClipboard(text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      triggerToast("Link copied to clipboard!");
    }
  }

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  const currentProduct = filteredProducts[currentSlideIndex] || featuredProducts[0];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased flex flex-col transition-colors duration-300">

      {/* ─── OFFICIAL GLOBAL NAVBAR ──────────────────────────────────── */}
      <Navbar />

      {/* ─── FLOATING TOAST ─────────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-5 py-3.5 shadow-2xl flex items-center gap-3 border border-[#333333] animate-fade-in">
          <Check className="w-4 h-4 text-[#D71920]" />
          <span className="text-[11px] font-bold uppercase tracking-wider">
            {toastMessage}
          </span>
        </div>
      )}

      {/* ─── MAIN CONNECT CONTAINER ─────────────────────────────────── */}
      <main className="flex-1 pt-16">

        {/* ─── HERO HEADER SECTION ──────────────────────────────────── */}
        <section className="bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
          <div className="container-site py-10 sm:py-14 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">

              {/* Left Column: Title & Actions */}
              <div className="flex flex-col">

                {/* Section Tag */}
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920] mb-3">
                  <span className="w-2 h-2 bg-[#D71920]" />
                  <span>Official Digital Link &amp; Contact Hub</span>
                </div>

                {/* Main Heading */}
                <h1 className="font-bebas text-[clamp(44px,7vw,76px)] text-[var(--text-primary)] leading-[0.92] tracking-tight uppercase">
                  <span>LET'S </span>
                  <span className="text-[#D71920] relative inline-block">
                    CONNECT
                    <span className="absolute -bottom-2 left-0 w-20 h-1 bg-[#D71920]" />
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed mt-5 mb-8 max-w-[500px]">
                  Everything you need to reach Bushra Impex &amp; X1 Power in one place. Official websites, digital equipment catalogue, direct email, and verified branch locations.
                </p>

                {/* Hero Buttons: Email Primary CTA */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">

                  {/* EMAIL US */}
                  <a
                    href="mailto:bushrapowertools@gmail.com?subject=Enquiry%20from%20Connect%20Page"
                    className="btn-primary inline-flex items-center justify-center gap-2.5 text-[11px]"
                  >
                    <Mail className="w-4 h-4 text-white stroke-[2] shrink-0" />
                    <span>EMAIL</span>
                  </a>

                  {/* SAVE CONTACT (iPhone & Android Compatible) */}
                  <a
                    href="/contact.vcf"
                    download="Bushra_Impex_X1_Power.vcf"
                    onClick={() => {
                      triggerToast("Opening contact card...");
                    }}
                    className="btn-outline inline-flex items-center justify-center gap-2 text-[11px]"
                  >
                    <IdCard className="w-4 h-4 text-[#D71920] stroke-[1.8]" />
                    <span>SAVE CONTACT CARD</span>
                  </a>

                </div>

                {/* Dual Website Quick Access */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-6 pt-5 border-t border-[var(--border-color)]">
                  <a
                    href="https://bushraimpex.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[#D71920] transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#D71920]" />
                    <span>bushraimpex.com</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>

                  <span className="hidden sm:inline text-[var(--border-color)]">|</span>

                  <a
                    href="https://x1power.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[#D71920] transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#D71920]" />
                    <span>x1power.in</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>

                  <span className="hidden sm:inline text-[var(--border-color)]">|</span>

                  <button
                    onClick={() => setShowQRModal(true)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#D71920] hover:underline"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>QR Codes</span>
                  </button>
                </div>

              </div>

              {/* Right Column: Hero Generated Landscape Wallpaper */}
              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[480px] aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden group shadow-xl">
                  <Image
                    src="/images/connect-hero-landscape.jpg"
                    alt="Lush Indian Agricultural Farmlands at Sunrise"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D71920] rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                      Cultivating Indian Agriculture
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-[10px] font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-white/90">
                      Bushra Impex &amp; X1 Power
                    </span>
                    <span className="text-[#D71920] bg-black/70 px-2 py-0.5 border border-[#D71920]/40">
                      10+ Years • 29 States
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── QUICK LINKS SECTION (6 INDUSTRIAL CARDS) ────────────────── */}
        <section className="bg-[var(--bg-secondary)] py-12 sm:py-16 border-b border-[var(--border-color)]">
          <div className="container-site">

            {/* Section Header */}
            <div className="flex items-center gap-3 mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920]">
                QUICK LINKS &amp; NAVIGATION
              </span>
              <div className="flex-1 h-px bg-[var(--border-color)]" />
            </div>

            {/* 8 Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">

              {/* 1. Bushra Impex Website */}
              <a
                href="https://bushraimpex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="product-card p-6 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#D71920] transition-colors">
                  <Globe className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[#D71920] transition-colors">
                  Bushra Impex
                </span>
                <span className="text-[9px] text-[var(--text-muted)] font-medium mt-1">bushraimpex.com</span>
              </a>

              {/* 2. X1 Power Website */}
              <a
                href="https://x1power.in"
                target="_blank"
                rel="noopener noreferrer"
                className="product-card p-6 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <span className="text-[12px] font-black tracking-wider text-[var(--text-secondary)] group-hover:text-[#D71920] border-2 border-current px-1.5 py-0.5 transition-colors">
                    X1
                  </span>
                </div>
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[#D71920] transition-colors">
                  X1 Power
                </span>
                <span className="text-[9px] text-[var(--text-muted)] font-medium mt-1">x1power.in</span>
              </a>

              {/* 3. Product Catalogue */}
              <a
                href="https://drive.google.com/file/d/1Ut_jmJVbYQqyYQNfa_IzGfel3jNr8Ohf/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="product-card p-6 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#D71920] transition-colors">
                  <BookOpen className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[#D71920] transition-colors">
                  Catalogue
                </span>
                <span className="text-[9px] text-[#D71920] font-bold mt-1">PDF Download →</span>
              </a>

              {/* 4. Email Us */}
              <a
                href="mailto:bushrapowertools@gmail.com?subject=Enquiry%20via%20Connect%20Page"
                className="product-card p-6 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#D71920] transition-colors">
                  <Mail className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[#D71920] transition-colors">
                  Email Us
                </span>
                <span className="text-[9px] text-[var(--text-muted)] font-medium mt-1">Direct Mail Support</span>
              </a>
              
              {/* 5. Instagram */}
              <a
                href="https://www.instagram.com/bushraimpex_/"
                target="_blank"
                rel="noopener noreferrer"
                className="product-card p-6 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#E1306C] transition-colors">
                  <svg className="w-6 h-6 stroke-current fill-none stroke-[1.75]" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeLinecap="round" strokeWidth="2.5" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[#E1306C] transition-colors">
                  Instagram
                </span>
                <span className="text-[9px] text-[var(--text-muted)] font-medium mt-1">@bushraimpex_</span>
              </a>

              {/* 6. Facebook */}
              <a
                href="https://www.facebook.com/people/Bushra-IMPEX/100063715104684/"
                target="_blank"
                rel="noopener noreferrer"
                className="product-card p-6 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#1877F2] transition-colors">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[#1877F2] transition-colors">
                  Facebook
                </span>
                <span className="text-[9px] text-[var(--text-muted)] font-medium mt-1">Official Page</span>
              </a>

              {/* 7. Bengaluru Map */}
              <button
                type="button"
                onClick={() => {
                  setActiveBranch("bengaluru");
                  scrollToSection("map-section");
                }}
                className="product-card p-6 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#D71920] transition-colors">
                  <MapPin className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[#D71920] transition-colors">
                  Bengaluru Head Office
                </span>
                <span className="text-[9px] text-[var(--text-muted)] font-medium mt-1">Google Maps Pin</span>
              </button>

              {/* 8. Saharanpur Map */}
              <button
                type="button"
                onClick={() => {
                  setActiveBranch("saharanpur");
                  scrollToSection("map-section");
                }}
                className="product-card p-6 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#D71920] transition-colors">
                  <Navigation className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[#D71920] transition-colors">
                  Saharanpur Branch
                </span>
                <span className="text-[9px] text-[var(--text-muted)] font-medium mt-1">UP Location &amp; Directions</span>
              </button>

            </div>
          </div>
        </section>

        {/* ─── DYNAMIC PRODUCT SLIDESHOW & CATALOGUE SHOWCASE ──────────── */}
        <section
          className="bg-[#111111] text-[#F8F8F8] py-14 sm:py-20 border-b border-[#2A2A2A] relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Red Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D71920]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container-site relative z-10">

            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D71920] block mb-2">
                  Featured Machinery Lineup (2 Per Category)
                </span>
                <h2 className="font-bebas text-[36px] sm:text-[48px] text-white tracking-tight leading-none">
                  PRODUCT CATALOGUE SHOWCASE
                </h2>
                <p className="text-[13px] text-[#AAAAAA] mt-2 max-w-[540px]">
                  Browse our complete machinery spectrum directly on our website, or download the full 40-page technical catalog.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://drive.google.com/file/d/1Ut_jmJVbYQqyYQNfa_IzGfel3jNr8Ohf/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#D71920] hover:bg-[#b01419] text-white text-[11px] font-bold uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Catalogue (PDF)</span>
                </a>
                <Link
                  href="/products"
                  className="border border-[#444444] hover:border-white text-white text-[11px] font-bold uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2"
                >
                  <span>View All Products →</span>
                </Link>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
              <button
                onClick={() => setSelectedCategoryFilter("all")}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors shrink-0 ${selectedCategoryFilter === "all"
                  ? "bg-[#D71920] text-white"
                  : "bg-[#1C1C1C] text-[#AAAAAA] hover:text-white border border-[#2E2E2E]"
                  }`}
              >
                All Categories ({featuredProducts.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategoryFilter(cat.slug)}
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors shrink-0 ${selectedCategoryFilter === cat.slug
                    ? "bg-[#D71920] text-white"
                    : "bg-[#1C1C1C] text-[#AAAAAA] hover:text-white border border-[#2E2E2E]"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Slideshow Card Display */}
            {currentProduct && (
              <div className="bg-[#181818] border border-[#2A2A2A] p-6 sm:p-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center">

                  {/* Left: Product Image */}
                  <div className="relative w-full aspect-[4/3] bg-[#0F0F0F] border border-[#2A2A2A] flex items-center justify-center p-6 group">
                    <div className="absolute top-3 left-3 bg-[#D71920] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                      {currentProduct.categoryName}
                    </div>

                    <Image
                      src={currentProduct.image || "/images/750 PTO-SERIES-new.png"}
                      alt={currentProduct.name}
                      width={500}
                      height={360}
                      className="object-contain w-full h-full max-h-[300px] drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute bottom-3 right-3 text-[10px] font-bold uppercase tracking-wider text-[#666666]">
                      Model: {currentProduct.modelCode}
                    </div>
                  </div>

                  {/* Right: Specs & Action */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920] mb-2">
                      <span>{currentProduct.fuelType} Powered</span>
                      <span>•</span>
                      <span>ISO 9001:2015</span>
                    </div>

                    <h3 className="font-bebas text-[28px] sm:text-[36px] text-white tracking-tight leading-none mb-3">
                      {currentProduct.name}
                    </h3>

                    <p className="text-[13px] text-[#AAAAAA] leading-relaxed mb-6 line-clamp-2">
                      {currentProduct.description}
                    </p>

                    {/* Key Specs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 text-[11px]">
                      {Object.entries(currentProduct.specs).slice(0, 6).map(([key, val]) => (
                        <div key={key} className="bg-[#121212] p-2.5 border border-[#262626]">
                          <span className="block text-[9px] uppercase tracking-wider text-[#777777]">{key}</span>
                          <span className="block font-bold text-white mt-0.5 truncate">{val}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Link
                        href={`/products/${currentProduct.category}/${currentProduct.slug}`}
                        className="bg-[#D71920] hover:bg-[#b01419] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2"
                      >
                        <span>View Full Machine Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={`mailto:bushrapowertools@gmail.com?subject=Enquiry%20for%20${encodeURIComponent(currentProduct.name)}%20(${encodeURIComponent(currentProduct.modelCode)})`}
                        className="border border-[#444444] hover:border-white text-white text-[10px] font-bold uppercase tracking-widest px-5 py-3 transition-colors inline-flex items-center gap-2"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#D71920]" />
                        <span>Email Inquiry for this Model</span>
                      </a>
                    </div>

                  </div>

                </div>

                {/* Carousel Controls (Bottom Bar) */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#262626]">

                  {/* Progress Indicator */}
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#888888]">
                    Showing <span className="text-white">{currentSlideIndex + 1}</span> of <span className="text-white">{filteredProducts.length}</span> models
                  </span>

                  {/* Prev / Next buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentSlideIndex((prev) =>
                          prev === 0 ? filteredProducts.length - 1 : prev - 1
                        )
                      }
                      className="p-2.5 bg-[#222222] hover:bg-[#D71920] text-white transition-colors"
                      aria-label="Previous product"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentSlideIndex((prev) => (prev + 1) % filteredProducts.length)
                      }
                      className="p-2.5 bg-[#222222] hover:bg-[#D71920] text-white transition-colors"
                      aria-label="Next product"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            )}

          </div>
        </section>

        {/* ─── GOOGLE MAPS & DIRECT NAVIGATION SECTION ─────────────────── */}
        <section id="map-section" className="bg-[var(--bg-primary)] py-14 sm:py-20 border-b border-[var(--border-color)]">
          <div className="container-site">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-5 border-b border-[var(--border-color)]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920] block mb-2">
                  Verified Locations &amp; Facilities
                </span>
                <h2 className="font-bebas text-[36px] sm:text-[44px] text-[var(--text-primary)] tracking-tight leading-none">
                  VISIT OUR OFFICES &amp; BRANCHES
                </h2>
              </div>

              {/* Branch Selector Tabs */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveBranch("bengaluru")}
                  className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${activeBranch === "bengaluru"
                    ? "bg-[#D71920] text-white"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[#D71920]"
                    }`}
                >
                  Head Office — Bengaluru
                </button>
                <button
                  onClick={() => setActiveBranch("saharanpur")}
                  className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${activeBranch === "saharanpur"
                    ? "bg-[#D71920] text-white"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[#D71920]"
                    }`}
                >
                  Branch — Saharanpur
                </button>
              </div>
            </div>

            {/* Branch Content Card & Map Embed */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 items-stretch">

              {/* Left Details Card */}
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 sm:p-10 flex flex-col justify-between">
                <div>

                  {activeBranch === "bengaluru" ? (
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D71920] mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>Corporate Head Office &amp; Warehouse</span>
                      </div>

                      <h3 className="font-bebas text-[28px] text-[var(--text-primary)] tracking-tight mb-4">
                        BENGALURU HEADQUARTERS
                      </h3>

                      <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed space-y-1 mb-6">
                        <p className="font-bold text-[var(--text-primary)]">Bushra Impex / X1 Power</p>
                        <p>Old No 98, New No 11, 1st Floor 4th Cross,</p>
                        <p>Kalasipalya New Extension,</p>
                        <p className="font-semibold">Bengaluru – 560002, Karnataka, India</p>
                      </div>

                      <div className="border-t border-[var(--border-color)] pt-4 mb-6 text-[12px] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--text-muted)]">Operating Hours:</span>
                          <span className="font-bold text-[var(--text-primary)]">Mon – Sat (9:00 AM – 6:30 PM)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--text-muted)]">Official Email:</span>
                          <span className="font-bold text-[var(--text-primary)]">bushrapowertools@gmail.com</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D71920] mb-3">
                        <Navigation className="w-4 h-4" />
                        <span>North India Regional Distribution Branch</span>
                      </div>

                      <h3 className="font-bebas text-[28px] text-[var(--text-primary)] tracking-tight mb-4">
                        SAHARANPUR BRANCH
                      </h3>

                      <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed space-y-1 mb-6">
                        <p className="font-bold text-[var(--text-primary)]">Bushra Impex North Distribution</p>
                        <p>Plot No 87-88, Gurudev Nagar,</p>
                        <p>Ambala Road, Near Badi Nahar,</p>
                        <p className="font-semibold">Saharanpur – 247001, Uttar Pradesh, India</p>
                      </div>

                      <div className="border-t border-[var(--border-color)] pt-4 mb-6 text-[12px] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--text-muted)]">Regional Focus:</span>
                          <span className="font-bold text-[var(--text-primary)]">UP, Punjab, Haryana &amp; North India</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--text-muted)]">Official Email:</span>
                          <span className="font-bold text-[var(--text-primary)]">bushrapowertools@gmail.com</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Direct Google Maps Navigation Button */}
                <div className="pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row gap-3">
                  {activeBranch === "bengaluru" ? (
                    <>
                      <a
                        href="https://maps.app.goo.gl/z9NPGfNr5JJ8gwBLA?g_st=aw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex-1 justify-center text-[10px] inline-flex items-center gap-2"
                      >
                        <Navigation className="w-4 h-4 fill-white" />
                        <span>Navigate to X1 Power (Google Maps)</span>
                      </a>
                      <a
                        href="mailto:bushrapowertools@gmail.com?subject=Enquiry%20regarding%20Bengaluru%20Head%20Office%20Visit"
                        className="btn-outline flex-1 justify-center text-[10px] inline-flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4 text-[#D71920]" />
                        <span>Email Office</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=29.976000,77.508806"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex-1 justify-center text-[10px] inline-flex items-center gap-2"
                      >
                        <Navigation className="w-4 h-4 fill-white" />
                        <span>Navigate to Saharanpur Branch</span>
                      </a>
                      <a
                        href="mailto:bushrapowertools@gmail.com?subject=Enquiry%20regarding%20Saharanpur%20Branch%20Visit"
                        className="btn-outline flex-1 justify-center text-[10px] inline-flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4 text-[#D71920]" />
                        <span>Email Branch</span>
                      </a>
                    </>
                  )}
                </div>

              </div>

              {/* Right: Embedded Google Maps Iframe */}
              <div className="w-full min-h-[380px] bg-[var(--bg-secondary)] border border-[var(--border-color)] relative overflow-hidden flex items-center justify-center">
                {activeBranch === "bengaluru" ? (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1520.909581719777!2d77.58089097156387!3d12.95926901179676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae158531a2b971%3A0x2912f0f81e317359!2sX1%20Power!5e0!3m2!1sen!2sin!4v1787650675684!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    className="w-full h-full min-h-[400px] border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="X1 Power Official Bengaluru Google Map"
                  />
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1047.9111104405504!2d77.50853674670502!3d29.976786745259922!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDU4JzMzLjYiTiA3N8KwMzAnMzEuNyJF!5e1!3m2!1sen!2sin!4v1787813149616!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    className="w-full h-full min-h-[400px] border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Bushra Impex Official Saharanpur Google Map"
                  />
                )}
              </div>

            </div>

          </div>
        </section>

        {/* ─── RED VALUE PROPOSITION BANNER ────────────────────────────── */}
        <section className="bg-[#D71920] text-white py-8">
          <div className="container-site">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">

              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
                <span className="font-bold text-[11px] sm:text-[12px] uppercase tracking-wider">
                  PREMIUM QUALITY
                </span>
                <span className="text-[10px] text-white/80">Products you can trust</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <Handshake className="w-6 h-6 stroke-[2]" />
                <span className="font-bold text-[11px] sm:text-[12px] uppercase tracking-wider">
                  RELIABLE SERVICE
                </span>
                <span className="text-[10px] text-white/80">Always here for you</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-6 h-6 stroke-[2]" />
                <span className="font-bold text-[11px] sm:text-[12px] uppercase tracking-wider">
                  TIMELY DELIVERY
                </span>
                <span className="text-[10px] text-white/80">On time, every time</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <HeartHandshake className="w-6 h-6 stroke-[2]" />
                <span className="font-bold text-[11px] sm:text-[12px] uppercase tracking-wider">
                  CUSTOMER SATISFACTION
                </span>
                <span className="text-[10px] text-white/80">Our top priority</span>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ─── OFFICIAL GLOBAL FOOTER ──────────────────────────────────── */}
      <Footer />

      {/* ─── FOREVER QR CODE MODAL ────────────────────────────────────── */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">

            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-5 right-5 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <QrCode className="w-5 h-5 text-[#D71920]" />
              <h3 className="font-bebas text-[24px] tracking-tight uppercase text-[var(--text-primary)]">
                Official Forever QR Codes
              </h3>
            </div>

            <p className="text-[12px] text-[var(--text-secondary)] mb-6 leading-relaxed">
              High-resolution vector SVGs &amp; 300 DPI PNGs with Level-H error correction (30% redundancy). Hardcoded for packaging, machinery labels, and offset printing across India.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* bushraimpex.com/connect */}
              <div className="border border-[var(--border-color)] p-4 flex flex-col items-center text-center bg-[var(--bg-secondary)]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                  bushraimpex.com
                </span>
                <div className="w-32 h-32 bg-white p-2 border border-[#EBEBEB] mb-3">
                  <Image
                    src="/qr/bushraimpex-connect.svg"
                    alt="Bushra Impex Forever QR"
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <a
                    href="/qr/bushraimpex-connect.svg"
                    download="bushraimpex-connect.svg"
                    className="btn-outline flex-1 text-center justify-center py-2 text-[9px]"
                  >
                    SVG
                  </a>
                  <a
                    href="/qr/bushraimpex-connect.png"
                    download="bushraimpex-connect-300dpi.png"
                    className="btn-primary flex-1 text-center justify-center py-2 text-[9px]"
                  >
                    PNG (300DPI)
                  </a>
                </div>
              </div>

              {/* x1power.in/connect */}
              <div className="border border-[var(--border-color)] p-4 flex flex-col items-center text-center bg-[var(--bg-secondary)]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D71920] mb-2">
                  x1power.in
                </span>
                <div className="w-32 h-32 bg-white p-2 border border-[#EBEBEB] mb-3">
                  <Image
                    src="/qr/x1power-connect.svg"
                    alt="X1 Power Forever QR"
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <a
                    href="/qr/x1power-connect.svg"
                    download="x1power-connect.svg"
                    className="btn-outline flex-1 text-center justify-center py-2 text-[9px]"
                  >
                    SVG
                  </a>
                  <a
                    href="/qr/x1power-connect.png"
                    download="x1power-connect-300dpi.png"
                    className="btn-primary flex-1 text-center justify-center py-2 text-[9px]"
                  >
                    PNG (300DPI)
                  </a>
                </div>
              </div>

            </div>

            <div className="mt-5 text-center">
              <span className="text-[10px] text-[var(--text-muted)] font-semibold">
                Permanent Target URLs: <code>https://bushraimpex.com/connect</code> &amp; <code>https://x1power.in/connect</code>
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
