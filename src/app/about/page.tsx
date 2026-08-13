import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import ProfileViewer from "@/app/company-overview/ProfileViewer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Bushra Impex — X1 Power Agricultural Machinery Brand Story",
  description:
    "Bushra Impex, founded in Bengaluru in 2012, is India's leading agricultural machinery distributor and the company behind the X1 Power brand. FMTTI tested, ISO 9001:2015 certified. 500+ dealers across all 29 Indian states.",
  keywords: [
    "About Bushra Impex", "Bushra Impex history", "X1 Power brand India",
    "Bushra Impex Bengaluru", "agricultural machinery company India",
    "FMTTI tested machines India", "ISO 9001 agri equipment India",
    "X1 Power dealer network India", "Bushra Impex 2012",
    "agricultural machinery manufacturer Karnataka",
  ],
  alternates: { canonical: "https://bushraimpex.com/about" },
  openGraph: {
    title: "About Bushra Impex — X1 Power Agricultural Machinery",
    description:
      "Est. 2012, Bengaluru. India's trusted agricultural machinery brand. FMTTI tested, ISO 9001 certified. 500+ PAN India dealers.",
    url: "https://bushraimpex.com/about",
    siteName: "Bushra Impex — X1 Power",
    locale: "en_IN",
    type: "website",
  },
};

// About-page entity JSON-LD: reinforces Organization identity
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://bushraimpex.com/about#aboutpage",
  url: "https://bushraimpex.com/about",
  name: "About Bushra Impex — X1 Power Agricultural Machinery Brand",
  description:
    "Bushra Impex was established in 2012 in Bengaluru, Karnataka. The company launched its proprietary brand X1 Power in 2016, focusing on FMTTI-tested agricultural machinery for Indian farmers.",
  about: {
    "@type": "Organization",
    "@id": "https://bushraimpex.com/#organization",
    name: "Bushra Impex",
    alternateName: "X1 Power",
    foundingDate: "2012",
    foundingLocation: { "@type": "Place", name: "Bengaluru, Karnataka, India" },
    numberOfEmployees: { "@type": "QuantitativeValue", description: "Growing team across India" },
    award: ["FMTTI Tested & Approved", "ISO 9001:2015 Certified"],
  },
};


const MILESTONES = [
  { year: "2012",  event: "Bushra Impex founded in Bengaluru, Karnataka" },
  { year: "2013",  event: "Started distributing quality agricultural machinery from Japan & China" },
  { year: "2016",  event: "Expanded dealer network across South India — 100+ dealers" },
  { year: "2017",  event: "Launched X1 Power as the flagship proprietary brand" },
  { year: "2018",  event: "New warehouse & infrastructure commissioned in North India" },
  { year: "2021",  event: "Government FMTTI testing & approvals secured for Power Weeders" },
  { year: "2024",  event: "PAN India network — 500+ dealers across all 29 states" },
  { year: "Future", event: "₹250 Crore business vision. Global expansion. Technology-driven growth." },
];

const VALUES = [
  { num: "01", title: "Farmer Centric",          desc: "Our products are designed for Indian farm conditions — not imported directly from foreign specs. Local insight drives every design decision." },
  { num: "02", title: "Reliability Over Marketing", desc: "We invest in product reliability first. Our 500+ dealers and 50,000+ satisfied customers are the result of machines that simply work." },
  { num: "03", title: "Long-Term Partnership",   desc: "We build multi-year partnerships with our dealers — providing genuine spare parts, training, and technical support throughout." },
  { num: "04", title: "Quality Assured",         desc: "Every X1 Power machine passes stringent quality checks. ISO 9001:2015 certified and FMTTI tested for government approval." },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <Navbar />

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="pt-16 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px]">

          {/* Left */}
          <div className="px-[80px] py-16 flex flex-col gap-6 border-r border-[var(--border-color)]">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              <Link href="/" className="hover:text-[#D71920] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#D71920]">About Us</span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D71920] block mb-3">Our Story</span>
              <h1 className="font-bebas text-[clamp(56px,8vw,96px)] text-[var(--text-primary)] leading-none tracking-tight">
                About<br />Bushra Impex
              </h1>
            </div>

            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed max-w-[520px]">
              Bushra Impex is a trusted <strong>distributor and wholesaler</strong> of agricultural machinery in India. Since 2012, we have been committed to empowering farmers with quality machinery, reliable service, and unmatched dealer support through the X1 Power brand.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              <a href="#company-presentation"
                className="inline-flex items-center gap-2 bg-[#D71920] text-white text-[11px] font-bold uppercase tracking-widest px-7 py-3.5 hover:bg-[#b01419] transition-colors">
                View Company Profile <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link href="/products"
                className="inline-flex items-center gap-2 border border-[var(--border-color)] text-[var(--text-secondary)] text-[11px] font-bold uppercase tracking-widest px-7 py-3.5 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors">
                Explore Products
              </Link>
            </div>
          </div>

          {/* Right: key numbers */}
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border-color)]">
            {[
              { num: "2012", label: "Founded"        },
              { num: "500+", label: "Dealers"        },
              { num: "29",  label: "States"         },
              { num: "50K+", label: "Happy Customers"},
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-10 gap-1.5">
                <span className="font-bebas text-[44px] text-[var(--text-primary)] leading-none">{s.num}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <img
          src="/company-overview/images/walpaperpg14.png"
          alt="Bushra Impex Journey — From 2012 to Global Vision"
          className="w-full h-auto block"
        />
      </section>

      {/* ─── TIMELINE ──────────────────────────────────────── */}
      <section className="bg-[var(--bg-primary)] py-20">
        <div className="container-site">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D71920]">Our Journey</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[var(--border-color)]">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="flex gap-6 p-8 bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-colors">
                <span className="font-bebas text-[16px] text-[#D71920] tracking-widest w-14 shrink-0 pt-0.5">{m.year}</span>
                <div className="flex gap-4 items-start">
                  <span className="w-px h-full bg-[var(--border-color)] shrink-0 mt-1.5" />
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ────────────────────────────────────────── */}
      <section className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] py-20">
        <div className="container-site">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D71920]">What Drives Us</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-color)]">
            {VALUES.map((v) => (
              <div key={v.num} className="p-8 bg-[var(--bg-primary)] flex gap-6 hover:bg-[var(--bg-secondary)] transition-colors group">
                <span className="font-bebas text-[44px] text-[#D71920]/15 leading-none shrink-0 group-hover:text-[#D71920]/25 transition-colors">{v.num}</span>
                <div className="flex flex-col gap-2 pt-1">
                  <h3 className="font-bebas text-[22px] text-[var(--text-primary)] tracking-tight leading-none">{v.title}</h3>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 29 STATES PRESENCE ──────────────────────────── */}
      <section className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] py-20">
        <div className="container-site">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D71920]">National Reach</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
          </div>
          <h2 className="font-bebas text-[clamp(32px,4vw,44px)] text-[var(--text-primary)] leading-none mb-8">Serving All 29 States in India</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi (NCR)"
            ].map(state => (
              <div key={state} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] px-4 py-3 flex items-center justify-center text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">{state}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS STRIP ──────────────────────────── */}
      <section className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] py-12">
        <div className="container-site">
          <div className="flex flex-wrap gap-px bg-[var(--border-color)]">
            {["FMTTI Tested & Approved", "ISO 9001:2015 Certified", "Government Subsidy Eligible", "500+ PAN India Dealers"].map((c) => (
              <div key={c} className="flex-1 min-w-[200px] bg-[var(--bg-primary)] px-8 py-6 flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#D71920] shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────── */}
      <section className="bg-[#111111] py-20 border-t border-neutral-900">
        <div className="container-site flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D71920] block mb-3">Partner With Us</span>
            <h2 className="font-bebas text-[clamp(36px,5vw,52px)] text-white leading-none">Become an X1 Power Dealer</h2>
            <p className="text-[13px] text-neutral-400 mt-3 max-w-md leading-relaxed">
              Join our growing network of 500+ dealers and be part of India's agricultural machinery revolution.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/dealer"
              className="inline-flex items-center gap-2 bg-[#D71920] text-white font-bold uppercase tracking-widest text-[11px] px-7 py-3.5 hover:bg-[#b01419] transition-colors">
              Join Our Network <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 border border-neutral-700 text-white font-bold uppercase tracking-widest text-[11px] px-7 py-3.5 hover:border-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ─── EMBEDDED COMPANY PROFILE PRESENTATION ─────────── */}
      <section id="company-presentation" className="w-full bg-[#111] border-t border-neutral-900" style={{ height: "min(900px, 90vh)" }}>
        <ProfileViewer />
      </section>

      <Footer />
    </>
  );
}
