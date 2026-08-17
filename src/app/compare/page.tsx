"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRODUCTS, Product } from "@/data/products";
import { ArrowLeft, Check, X, GitCompareArrows, MessageSquare, ExternalLink, SlidersHorizontal, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Toggle states
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const slugsParam = searchParams.get("p");

  const products: Product[] = useMemo(() => {
    if (!slugsParam) return [];
    const slugs = slugsParam.split(",").map((s) => s.trim()).filter(Boolean);
    return slugs
      .map((slug) => PRODUCTS.find((p) => p.slug === slug))
      .filter((p): p is Product => p !== undefined);
  }, [slugsParam]);

  const categoryId = products[0]?.category;

  const availableProductsToAdd = useMemo(() => {
    if (!categoryId) return [];
    return PRODUCTS.filter(
      (p) => p.category === categoryId && !products.some((existing) => existing.slug === p.slug)
    );
  }, [categoryId, products]);

  const allSpecKeys = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      Object.keys(p.specs).forEach((k) => set.add(k));
    });
    return Array.from(set);
  }, [products]);

  const handleInquire = (p: Product) => {
    const text =
      "PRODUCT INQUIRY - " + p.name.toUpperCase() + "\n\n" +
      "MODEL: " + p.modelCode + "\n" +
      "CATEGORY: " + p.categoryName + "\n" +
      "FUEL TYPE: " + p.fuelType + "\n\n" +
      "I would like to get a quote and details for this machine.";
    window.open("https://wa.me/917624869606?text=" + encodeURIComponent(text), "_blank");
  };

  const removeProduct = (slug: string) => {
    const updated = products.filter((p) => p.slug !== slug);
    if (updated.length === 0) {
      router.push("/products");
    } else {
      router.push("/compare?p=" + updated.map((p) => p.slug).join(","));
    }
  };

  const addProduct = (slug: string) => {
    if (products.length >= 3) return;
    setShowAddModal(false);
    const updated = [...products.map(p => p.slug), slug];
    router.push("/compare?p=" + updated.join(","));
  };

  if (products.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-[75vh] pt-32 pb-20 flex flex-col items-center justify-center container-site text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center mb-6 shadow-sm">
            <GitCompareArrows className="w-10 h-10 text-[var(--text-muted)]" />
          </div>
          <h1 className="font-bebas text-[48px] text-[var(--text-primary)] leading-none mb-3">Compare X1 Power Models</h1>
          <p className="text-[14px] text-[var(--text-secondary)] max-w-[500px] mb-4 leading-relaxed">
            Select up to 3 products from our catalog to compare technical specifications, engine options, fuel consumption, tilling dimensions, and compatible attachments side-by-side.
          </p>
          <p className="text-[12px] text-[var(--text-muted)] max-w-[550px] mb-8 leading-relaxed">
            Evaluate and select the best X1 Power agricultural equipment matching your crop and farm type. Compare our FMTTI-tested power weeders, chainsaws, crop harvesters, brush cutters, sprayers, and water pumps to make an informed investment.
          </p>
          <Link href="/products" className="btn-primary px-8 py-4 text-[11px] tracking-widest uppercase font-bold transition-transform hover:scale-[1.02]">
            Browse Product Catalog
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const categoryName = products[0]?.categoryName || "Products";

  // Filter keys for Differences Only
  const visibleSpecKeys = showDifferencesOnly
    ? allSpecKeys.filter((key) => {
        const values = products.map((p) => p.specs[key] || "N/A");
        return new Set(values).size > 1; // Only keep if there's a difference
      })
    : allSpecKeys;

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-[#FAFAFA] dark:bg-[#0A0A0A] min-h-screen font-sans selection:bg-[#E30613] selection:text-white transition-colors duration-300">
        
        {/* Header Section */}
        <section className="container-site mb-12">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#777777] mb-6">
            <Link href="/" className="hover:text-[#E30613] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#E30613] transition-colors">Products</Link>
            <span>/</span>
            <span className="text-[#111111] dark:text-white">Compare</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="font-bebas text-[56px] sm:text-[72px] text-[#111111] dark:text-white leading-[0.9] tracking-tight uppercase">
                {categoryName} <span className="text-[#E30613]">Compare</span>
              </h1>
              <p className="text-[14px] text-[#777777] dark:text-[#A0A0A0] mt-4 leading-relaxed max-w-lg">
                Technical side-by-side comparison. Evaluate specifications, features, and engine capabilities to find the perfect machine for your requirements.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                onClick={() => setShowDifferencesOnly(!showDifferencesOnly)}
                className={`flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 rounded-none ${
                  showDifferencesOnly
                    ? "bg-[#111111] text-white border-[#111111] dark:bg-white dark:text-[#111111] dark:border-white"
                    : "bg-transparent text-[#111111] dark:text-white border-[#E5E5E5] dark:border-[#333333] hover:border-[#111111] dark:hover:border-white"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {showDifferencesOnly ? "Show All Specs" : "Differences Only"}
              </button>
              
              {products.length < 3 && (
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-widest bg-white dark:bg-[#111111] text-[#E30613] border border-[#E5E5E5] dark:border-[#333333] hover:border-[#E30613] dark:hover:border-[#E30613] transition-all duration-300 rounded-none"
                >
                  <Plus className="w-4 h-4" /> Add Model
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Desktop Comparison Matrix Section (Hidden on Mobile) */}
        <section className="container-site hidden md:block">
          <div className="overflow-x-auto bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#333333]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              
              {/* STICKY HEADER - PRODUCTS */}
              <thead>
                <tr className="sticky top-[80px] z-30 bg-white dark:bg-[#111111] border-b border-[#E5E5E5] dark:border-[#333333] shadow-sm">
                  <th className="p-8 w-[240px] align-bottom bg-[#FAFAFA] dark:bg-[#0A0A0A] border-r border-[#E5E5E5] dark:border-[#333333]">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777] dark:text-[#A0A0A0]">
                      {products.length} Models Selected
                    </span>
                  </th>
                  {products.map((p) => (
                    <th key={p.slug} className="p-8 border-r border-[#E5E5E5] dark:border-[#333333] last:border-r-0 align-top relative group min-w-[280px]">
                      
                      {products.length > 1 && (
                        <button
                          onClick={() => removeProduct(p.slug)}
                          className="absolute top-4 right-4 text-[#777777] dark:text-[#A0A0A0] hover:text-[#E30613] dark:hover:text-[#E30613] transition-colors p-2"
                          title="Remove model"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      <div className="flex flex-col h-full">
                        {/* Image */}
                        <div className="w-full h-[220px] mb-6 flex items-center justify-center p-4">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={`X1 Power by Bushra Impex - ${p.name} - Type: ${p.categoryName}`}
                              className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <span className="font-bebas text-[20px] text-[#E5E5E5] dark:text-[#333333]">{p.modelCode}</span>
                          )}
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-widest border border-[#E5E5E5] dark:border-[#333333] text-[#777777] dark:text-[#A0A0A0]">
                            {p.fuelType}
                          </span>
                          <span className="inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-widest border border-[#E5E5E5] dark:border-[#333333] text-[#777777] dark:text-[#A0A0A0]">
                            {p.categoryName}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-bebas text-[32px] text-[#111111] dark:text-white leading-[1.1] mb-1 group-hover:text-[#E30613] dark:group-hover:text-[#E30613] transition-colors">
                          {p.name}
                        </h3>
                        <span className="text-[12px] font-bold text-[#E30613] tracking-widest uppercase block mb-8">
                          {p.modelCode}
                        </span>

                        {/* Action */}
                        <div className="mt-auto pt-4 border-t border-[#E5E5E5] dark:border-[#333333]">
                          <button
                            onClick={() => handleInquire(p)}
                            className="w-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-[#E30613] dark:hover:bg-[#E30613] hover:text-white dark:hover:text-white text-[11px] font-bold uppercase tracking-widest py-3.5 px-4 flex items-center justify-center gap-2 transition-all duration-300"
                          >
                            <MessageSquare className="w-4 h-4" /> Get Quote
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                  
                  {/* Empty Slot for "Add Model" if < 3 */}
                  {products.length < 3 && (
                    <th className="p-8 border-r border-[#E5E5E5] dark:border-[#333333] last:border-r-0 align-center justify-center relative min-w-[280px] bg-[#FAFAFA] dark:bg-[#0A0A0A]">
                      <div className="flex flex-col items-center justify-center h-full min-h-[350px] opacity-60 hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#777777] dark:border-[#555555] flex items-center justify-center mb-4 text-[#777777] dark:text-[#A0A0A0]">
                          <Plus className="w-6 h-6" />
                        </div>
                        <span className="font-bebas text-[24px] text-[#777777] dark:text-[#A0A0A0] mb-2">Empty Slot</span>
                        <button 
                          onClick={() => setShowAddModal(true)}
                          className="text-[10px] font-bold uppercase tracking-widest text-[#E30613] hover:underline underline-offset-4"
                        >
                          Select Model to Compare
                        </button>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              
              <tbody>
                {/* QUICK VERDICT */}
                <tr className="border-b border-[#E5E5E5] dark:border-[#333333]">
                  <td className="p-6 text-[11px] font-bold uppercase tracking-[0.15em] text-[#111111] dark:text-white border-r border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#0A0A0A]">
                    Power Rating
                  </td>
                  {products.map((p) => {
                    const hp = p.specs["Engine Power"] || p.specs["Power"] || p.specs["Output"] || "";
                    const cc = p.specs["Displacement"] || p.specs["Engine Displacement"] || "";
                    return (
                      <td key={p.slug} className="p-6 border-r border-[#E5E5E5] dark:border-[#333333] last:border-r-0">
                        {hp || cc ? (
                          <div className="flex flex-col">
                            {hp && <span className="font-bebas text-[24px] text-[#E30613] leading-none mb-1">{hp}</span>}
                            {cc && <span className="text-[12px] font-medium text-[#777777] dark:text-[#A0A0A0]">{cc}</span>}
                          </div>
                        ) : (
                          <span className="text-[12px] text-[#777777] dark:text-[#555555] italic">Standard</span>
                        )}
                      </td>
                    );
                  })}
                  {products.length < 3 && <td className="bg-[#FAFAFA] dark:bg-[#0A0A0A]"></td>}
                </tr>

                {/* SPECS HEADER */}
                <tr>
                  <td colSpan={products.length < 3 ? products.length + 2 : products.length + 1} className="px-6 py-12">
                    <h4 className="font-bebas text-[32px] text-[#111111] dark:text-white">Technical Specifications</h4>
                    <p className="text-[12px] text-[#777777] dark:text-[#A0A0A0] mt-1 uppercase tracking-widest font-bold">Detailed Engine & Build Data</p>
                  </td>
                </tr>

                {/* SPECS ROWS */}
                {visibleSpecKeys.length === 0 && showDifferencesOnly ? (
                  <tr>
                    <td colSpan={products.length < 3 ? products.length + 2 : products.length + 1} className="px-6 py-12 text-center border-y border-[#E5E5E5] dark:border-[#333333]">
                      <span className="text-[13px] text-[#777777] dark:text-[#A0A0A0]">No differences found between the selected models.</span>
                    </td>
                  </tr>
                ) : (
                  visibleSpecKeys.map((key) => {
                    const values = products.map((p) => p.specs[key] || "N/A");
                    const isDifferent = new Set(values).size > 1;
                    
                    return (
                      <tr
                        key={key}
                        className={`border-b border-[#E5E5E5] dark:border-[#333333] transition-colors duration-300 hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A] ${
                          isDifferent && showDifferencesOnly ? "bg-[#FFF0F0] dark:bg-[#2A0505]" : ""
                        }`}
                      >
                        <td className="p-6 text-[12px] font-bold text-[#111111] dark:text-white border-r border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#0A0A0A] w-[240px]">
                          <div className="flex items-center justify-between gap-2">
                            <span>{key}</span>
                            {isDifferent && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" title="Difference"></span>
                            )}
                          </div>
                        </td>
                        {products.map((p) => (
                          <td key={p.slug} className={`p-6 text-[13px] border-r border-[#E5E5E5] dark:border-[#333333] last:border-r-0 ${p.specs[key] ? "text-[#333333] dark:text-[#E5E5E5]" : "text-[#777777] dark:text-[#555555] italic"}`}>
                            {p.specs[key] || "N/A"}
                          </td>
                        ))}
                        {products.length < 3 && <td className="bg-[#FAFAFA] dark:bg-[#0A0A0A]"></td>}
                      </tr>
                    );
                  })
                )}

                {/* ACCESSORIES HEADER */}
                <tr>
                  <td colSpan={products.length < 3 ? products.length + 2 : products.length + 1} className="px-6 py-12">
                    <h4 className="font-bebas text-[32px] text-[#111111] dark:text-white">Included Accessories</h4>
                    <p className="text-[12px] text-[#777777] dark:text-[#A0A0A0] mt-1 uppercase tracking-widest font-bold">What comes in the box</p>
                  </td>
                </tr>

                {/* ACCESSORIES ROW */}
                <tr className="border-y border-[#E5E5E5] dark:border-[#333333]">
                  <td className="p-6 text-[12px] font-bold text-[#111111] dark:text-white border-r border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#0A0A0A] align-top">
                    Package Extras
                  </td>
                  {products.map((p) => (
                    <td key={p.slug} className="p-6 border-r border-[#E5E5E5] dark:border-[#333333] last:border-r-0 align-top hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A] transition-colors">
                      {p.accessories && p.accessories.length > 0 ? (
                        <div className="flex flex-col gap-3">
                          {p.accessories.map((acc) => (
                            <div key={acc} className="flex items-start gap-2.5 text-[13px] text-[#333333] dark:text-[#E5E5E5] leading-snug">
                              <Check className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                              <span>{acc}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[13px] text-[#777777] dark:text-[#555555] italic">Standard package</span>
                      )}
                    </td>
                  ))}
                  {products.length < 3 && <td className="bg-[#FAFAFA] dark:bg-[#0A0A0A]"></td>}
                </tr>

                {/* FEATURES HEADER */}
                <tr>
                  <td colSpan={products.length < 3 ? products.length + 2 : products.length + 1} className="px-6 py-12">
                    <h4 className="font-bebas text-[32px] text-[#111111] dark:text-white">Key Features</h4>
                    <p className="text-[12px] text-[#777777] dark:text-[#A0A0A0] mt-1 uppercase tracking-widest font-bold">Engineering Highlights</p>
                  </td>
                </tr>

                {/* FEATURES ROW */}
                <tr className="border-y border-[#E5E5E5] dark:border-[#333333]">
                  <td className="p-6 text-[12px] font-bold text-[#111111] dark:text-white border-r border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#0A0A0A] align-top">
                    Highlights
                  </td>
                  {products.map((p) => (
                    <td key={p.slug} className="p-6 border-r border-[#E5E5E5] dark:border-[#333333] last:border-r-0 align-top hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A] transition-colors">
                      {p.features && p.features.length > 0 ? (
                        <ul className="flex flex-col gap-3 text-[13px] text-[#333333] dark:text-[#E5E5E5] leading-relaxed">
                          {p.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1 h-1 rounded-full bg-[#E30613] shrink-0 mt-2"></span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[13px] text-[#777777] dark:text-[#A0A0A0] leading-relaxed">{p.description}</p>
                      )}
                    </td>
                  ))}
                  {products.length < 3 && <td className="bg-[#FAFAFA] dark:bg-[#0A0A0A]"></td>}
                </tr>

              </tbody>
            </table>
          </div>
        </section>

        {/* ── MOBILE VERTICAL COMPARISON VIEW (Visible on mobile/tablet) ── */}
        <section className="container-site block md:hidden space-y-6">
          {/* Sticky Mobile Comparison Thumbnails Bar */}
          <div className="sticky top-[72px] z-20 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-md border border-[#E5E5E5] dark:border-[#333333] p-3 shadow-md">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777] dark:text-[#A0A0A0]">
                Comparing {products.length} Models
              </span>
              <span className="text-[9px] text-[#E30613] font-semibold">Scroll down for full specs ↓</span>
            </div>
            <div className={`grid gap-2 ${products.length === 3 ? "grid-cols-3" : products.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
              {products.map((p) => (
                <div key={p.slug} className="flex items-center gap-2 p-1.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden">
                  {p.image && (
                    <img src={p.image} alt={p.name} className="w-8 h-8 object-contain shrink-0 mix-blend-multiply dark:mix-blend-normal" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-bold text-[#E30613] uppercase tracking-wider truncate leading-tight">{p.modelCode}</p>
                    <p className="text-[10px] font-bold text-[#111111] dark:text-white truncate leading-tight">{p.name.split(" ")[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Models Detailed Summary Cards */}
          <div className="grid grid-cols-1 gap-4">
            {products.map((p) => (
              <div key={p.slug} className="bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#333333] p-5 relative shadow-sm">
                {products.length > 1 && (
                  <button
                    onClick={() => removeProduct(p.slug)}
                    className="absolute top-3 right-3 text-[#777777] hover:text-[#E30613] p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 bg-[var(--bg-secondary)] border border-[var(--border-color)] p-2 flex items-center justify-center shrink-0">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                    ) : (
                      <span className="font-bebas text-xs">{p.modelCode}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-[9px] font-bold text-[#E30613] tracking-widest uppercase block">{p.modelCode}</span>
                    <h3 className="font-bebas text-[22px] text-[#111111] dark:text-white leading-tight">{p.name}</h3>
                    <div className="flex gap-1.5 mt-1">
                      <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase border border-[#E5E5E5] dark:border-[#333333] text-[#777777]">
                        {p.fuelType}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E5E5E5] dark:border-[#333333] flex gap-2">
                  <button
                    onClick={() => handleInquire(p)}
                    className="flex-1 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-[10px] font-bold uppercase tracking-wider py-2.5 flex items-center justify-center gap-1.5 hover:bg-[#D71920] dark:hover:bg-[#D71920] dark:hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Quote
                  </button>
                  <Link
                    href={`/products/${p.category}/${p.slug}`}
                    className="px-3 py-2.5 border border-[#E5E5E5] dark:border-[#333333] text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center hover:border-[#D71920] transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Vertical Specs Comparison Table */}
          <div className="bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#333333] divide-y divide-[#E5E5E5] dark:divide-[#333333] shadow-sm">
            <div className="p-4 bg-[#FAFAFA] dark:bg-[#0A0A0A]">
              <h4 className="font-bebas text-[24px] text-[#111111] dark:text-white">Technical Specifications</h4>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#777777]">Side-by-side field comparison</p>
            </div>

            {visibleSpecKeys.map((key) => {
              const values = products.map((p) => p.specs[key] || "N/A");
              const isDifferent = new Set(values).size > 1;

              return (
                <div key={key} className={`p-4 ${isDifferent && showDifferencesOnly ? "bg-[#FFF0F0] dark:bg-[#2A0505]" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111] dark:text-white">{key}</span>
                    {isDifferent && <span className="text-[8px] font-bold uppercase px-1.5 py-0.5 bg-[#E30613] text-white rounded">Difference</span>}
                  </div>
                  <div className={`grid gap-2 ${products.length === 3 ? "grid-cols-3" : products.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {products.map((p) => (
                      <div key={p.slug} className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                        <span className="text-[9px] font-bold uppercase text-[#E30613] block truncate">{p.modelCode}</span>
                        <span className="text-[12px] font-medium text-[#111111] dark:text-white mt-0.5 block leading-snug">{p.specs[key] || "—"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Included Accessories on Mobile */}
            <div className="p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111] dark:text-white block mb-3">Included Accessories</span>
              <div className="grid grid-cols-1 gap-3">
                {products.map((p) => (
                  <div key={p.slug} className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                    <span className="text-[10px] font-bold uppercase text-[#E30613] block mb-2">{p.name} ({p.modelCode})</span>
                    {p.accessories && p.accessories.length > 0 ? (
                      <ul className="space-y-1 text-[12px] text-[#333333] dark:text-[#CCCCCC]">
                        {p.accessories.map((acc, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#E30613] shrink-0" />
                            <span>{acc}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-[11px] text-[#777777] italic">Standard kit</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-white dark:bg-[#111111] shadow-2xl border border-[#E5E5E5] dark:border-[#333333] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#E5E5E5] dark:border-[#333333]">
                <div>
                  <h3 className="font-bebas text-[28px] text-[#111111] dark:text-white leading-none">Add Model to Compare</h3>
                  <p className="text-[12px] text-[#777777] dark:text-[#A0A0A0] mt-1">Select another {categoryName} machine</p>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-[#777777] dark:text-[#A0A0A0] hover:text-[#E30613] dark:hover:text-[#E30613] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {availableProductsToAdd.length === 0 ? (
                  <div className="p-12 text-center text-[#777777] dark:text-[#A0A0A0]">
                    <p>No other products available in this category to compare.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                    {availableProductsToAdd.map((ap) => (
                      <button
                        key={ap.slug}
                        onClick={() => addProduct(ap.slug)}
                        className="flex items-center gap-4 p-4 border border-[#E5E5E5] dark:border-[#333333] hover:border-[#111111] dark:hover:border-white transition-all text-left group bg-[#FAFAFA] dark:bg-[#0A0A0A] hover:bg-white dark:hover:bg-[#1A1A1A]"
                      >
                        <div className="w-16 h-16 shrink-0 bg-white dark:bg-[#111111] p-2 border border-[#E5E5E5] dark:border-[#333333]">
                          {ap.image ? (
                            <img src={ap.image} alt={`X1 Power by Bushra Impex - ${ap.name}`} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] font-bebas text-[#E5E5E5] dark:text-[#555555]">IMG</div>
                          )}
                        </div>
                        <div>
                          <div className="text-[9px] font-bold text-[#E30613] tracking-widest uppercase mb-0.5">{ap.modelCode}</div>
                          <div className="font-bebas text-[20px] text-[#111111] dark:text-white leading-tight group-hover:text-[#E30613] dark:group-hover:text-[#E30613] transition-colors">{ap.name}</div>
                          <div className="text-[11px] text-[#777777] dark:text-[#A0A0A0] mt-1 line-clamp-1">{ap.fuelType}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default function ComparePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen pt-32 text-center text-[12px] text-[#777777] dark:text-[#A0A0A0] font-bebas text-2xl animate-pulse">Loading Comparison...</div>}>
      <CompareContent />
    </React.Suspense>
  );
}