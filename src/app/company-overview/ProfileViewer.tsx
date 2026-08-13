"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { COMPANY_OVERVIEW as D } from "@/data/company-overview";

// ─── SCALED SLIDE WRAPPER ───────────────────────────────────────────────────
// This guarantees the slide is exactly 1280x720 internally and scales to fit ANY screen.
function ScaledSlide({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // Calculate scale to fit 1280x720 within the available container space
        const scaleX = width / 1280;
        const scaleY = height / 720;
        setScale(Math.min(scaleX, scaleY));
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      <div 
        style={{
          width: 1280, 
          height: 720, 
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          background: 'var(--bg-primary)'
        }}
        className="relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[var(--border-color)] shrink-0 overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}

// ─── CHAPTER INDEX (23 pages with Section Dividers & New Goals Page) ──────────
const CHAPTERS = [
  { id: "cover", num: "-", label: "Cover" },
  { id: "toc", num: "-", label: "Contents" },
  { id: "div1", num: "S1", label: "Facts & Figures" },
  { id: "overview", num: "01", label: "Company Overview" },
  { id: "financial", num: "02", label: "Financial Performance" },
  { id: "rnd", num: "03", label: "Research & Development" },
  { id: "sustainability", num: "04", label: "Sustainability" },
  { id: "india", num: "05", label: "India Opportunity" },
  { id: "facts", num: "06", label: "Bushra Impex at a Glance" },
  { id: "brands", num: "07", label: "Our Brands" },
  { id: "products", num: "08", label: "Product Ecosystem" },
  { id: "div2", num: "S2", label: "Story of Success" },
  { id: "infrastructure", num: "09", label: "Infrastructure" },
  { id: "story", num: "10", label: "Timeline & Journey" },
  { id: "div3", num: "S3", label: "People & Network" },
  { id: "leadership", num: "11", label: "Leadership" },
  { id: "management", num: "12", label: "Management & People" },
  { id: "dealer", num: "13", label: "Dealer Network" },
  { id: "div4", num: "S4", label: "Future Plans" },
  { id: "future", num: "14", label: "Future Vision & Roadmap" },
  { id: "goals", num: "15", label: "Plans & Goals" },
  { id: "contact", num: "16", label: "Contact & Enquiries" },
  { id: "closing", num: "17", label: "Closing" },
];

// ─── SHARED ───────────────────────────────────────────────────────────────────
function Tag({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-px bg-[#D71920]" />
      <span className="text-[13px] font-bold tracking-[0.3em] uppercase text-[var(--text-muted)]">{text}</span>
    </div>
  );
}

function Img({ id, prompt, className = "" }: { id: string; prompt: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center border border-dashed border-[var(--border-secondary)] bg-[var(--bg-tertiary)] select-none ${className}`}>
      <span className="text-[var(--border-secondary)] text-3xl mb-1">◻</span>
      <span className="font-mono text-[13px] font-bold text-[var(--text-muted)]">{id}</span>
      <span className="text-[13px] text-center px-3 mt-0.5 leading-relaxed max-w-[160px] text-[var(--border-secondary)]">{prompt}</span>
    </div>
  );
}

function RedLine() { return <div className="w-full h-px bg-[#D71920] opacity-30" />; }

// ─── PAGE 0: COVER ────────────────────────────────────────────────────────────
function CoverPage({ goTo }: { goTo: (i: number) => void }) {
  return (
    <div className="w-full h-full flex relative overflow-hidden bg-[var(--bg-primary)]">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(var(--text-primary) 1px,transparent 1px),linear-gradient(90deg,var(--text-primary) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* LEFT - 45% branding */}
      <div className="w-[47%] flex flex-col justify-between p-10 relative z-10 bg-[var(--bg-primary)]"
        style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 4vw) 100%, 0 100%)" }}>
        {/* Top logos */}
        <div className="flex items-center gap-4 pr-8">
          <Image src="/images/bushraimpex-new logo.png" alt="Bushra Impex" width={130} height={38} className="object-contain" />
          <span className="w-px h-5 bg-[var(--border-color)]" />
          <Image src="/images/x1power-new logo.png" alt="X1 Power" width={90} height={32} className="object-contain dark:brightness-200" />
        </div>

        {/* Centre headings */}
        <div className="pr-8">
          <div className="text-[13px] font-bold tracking-[0.35em] uppercase text-[#D71920] mb-4">Company Profile · 2026-2027</div>
          <h1 className="font-bebas text-[96px] leading-none text-[var(--text-primary)] tracking-wide mb-1">Bushra<br />Impex</h1>
          <div className="font-bebas text-[40px] text-[var(--text-muted)] tracking-[0.15em]">× X1 Power</div>
        </div>

        {/* Bottom meta */}
        <div className="flex items-end justify-between pr-[4vw]">
          <div>
            <p className="text-[13px] text-[var(--text-muted)] tracking-widest uppercase mb-0.5">Est. 2012 · Bengaluru, Karnataka, India</p>
            <p className="text-[13px] text-[var(--text-muted)] tracking-widest uppercase">Powering Agriculture. Engineering Reliability.</p>
          </div>
          <button onClick={() => goTo(1)}
            className="text-[13px] tracking-widest uppercase border border-[var(--border-secondary)] text-[var(--text-muted)] hover:border-[#D71920] hover:text-[#D71920] px-4 py-1.5 transition-all mb-1 mr-2">
            View Contents →
          </button>
        </div>
      </div>

      {/* RIGHT - 55% image */}
      <div className="flex-1 relative">
        <img src="/company-overview/images/1a.png" alt="Cover Image" className="absolute inset-0 w-full h-full object-cover border-0" />
        {/* Red accent bar */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#D71920]" />
      </div>


    </div>
  );
}

// ─── PAGE 1: TABLE OF CONTENTS ────────────────────────────────────────────────
function TocPage({ goTo }: { goTo: (i: number) => void }) {
  const chapters = CHAPTERS.filter(c => !["cover", "toc"].includes(c.id));
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#D71920]" />

      {/* LEFT - Title block */}
      <div className="w-64 border-r border-[var(--border-color)] flex flex-col justify-between p-8">
        <div>
          <Tag text="Bushra Impex · X1 Power" />
          <h2 className="font-bebas text-[56px] leading-none text-[var(--text-primary)] tracking-wide">Table<br />of Contents</h2>
        </div>
        <div>
          <div className="w-8 h-px bg-[#D71920] mb-3" />
          <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-widest">Confidential<br />Authorised Distribution Only</p>
        </div>
      </div>

      {/* RIGHT - 2-col chapter list */}
      <div className="flex-1 flex flex-col flex-wrap p-6 gap-x-6 gap-y-1 content-start overflow-hidden h-full">
        {chapters.map((ch, i) => (
          <button key={ch.id} onClick={() => goTo(i + 2)}
            className="flex items-center gap-3 py-2 px-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] group text-left transition-colors w-[45%]">
            <span className="font-mono text-[12px] text-[#D71920] font-bold w-5 shrink-0">{ch.num}</span>
            <span className="flex-1 text-[12px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{ch.label}</span>
            <span className="font-mono text-[12px] text-[var(--border-secondary)] group-hover:text-[#D71920]">{String(i + 2).padStart(2, "0")}</span>
          </button>
        ))}
      </div>


    </div>
  );
}

// ─── PAGE 2: COMPANY OVERVIEW ─────────────────────────────────────────────────
function CompanyOverviewPage() {
  const d = D.overview;
  const paras = d.subheading.split("\n\n");
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex overflow-hidden">
      {/* LEFT - 55% text */}
      <div className="w-[55%] flex flex-col p-8 border-r border-[var(--border-color)] overflow-hidden">
        <Tag text={d.label} />
        <h2 className="font-bebas text-[48px] leading-none text-[var(--text-primary)] tracking-wide mb-4">{d.heading}</h2>
        <div className="flex flex-col gap-3 flex-1 overflow-hidden">
          {paras.map((p, i) => <p key={i} className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{p}</p>)}
          <p className="text-[13px] font-bold italic text-[var(--text-primary)] tracking-wide">{d.footer}</p>
          <div className="w-full h-px bg-[var(--border-color)] my-1" />
          <div className="flex flex-col gap-2">
            {d.points.map(pt => (
              <div key={pt.label} className="flex items-start gap-2.5">
                <span className="text-[#D71920] text-sm shrink-0 mt-0.5">◆</span>
                <div>
                  <div className="text-[13px] font-bold text-[var(--text-primary)]">{pt.label}</div>
                  <div className="text-[12px] text-[var(--text-muted)] leading-relaxed">{pt.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-[var(--border-color)] my-1" />
          <div className="bg-[var(--bg-secondary)] border-l-2 border-[#D71920] p-4">
            <div className="text-[12px] font-bold uppercase tracking-widest text-[#D71920] mb-1">{d.fmtti.title}</div>
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed ">{d.fmtti.body}</p>
          </div>
        </div>
      </div>
      {/* RIGHT - 45% Image */}
      <div className="flex-1 flex flex-col bg-[var(--bg-primary)] overflow-hidden relative border-l border-[var(--border-color)] p-6 justify-center items-center">
        <img src="/company-overview/images/01 - Company Overview page iamge.png" alt="Company Overview" className="w-full h-full object-contain" />
        <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
          {[{ v: "29", l: "States" }, { v: "ISO", l: "9001:2015" }, { v: "FMTTI", l: "Tested" }].map(b => (
            <div key={b.l} className="bg-[var(--bg-primary)]/90 backdrop-blur-sm border border-[var(--border-color)] p-3 text-center shadow-sm">
              <div className="font-bebas text-2xl text-[#D71920]">{b.v}</div>
              <div className="text-[13px] uppercase tracking-widest text-[var(--text-primary)]">{b.l}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── PAGE 3: STORY OF SUCCESS ─────────────────────────────────────────────────
function StoryPage() {
  const d = D.story;
  return (
    <div className="w-full h-full bg-black flex flex-col overflow-hidden relative select-none">
      {/* Full bleed wallpaper */}
      <img src="/company-overview/images/walpaperpg14.png" alt="Story of Success" className="absolute inset-0 w-full h-full object-cover opacity-90" />

      {/* Gradient overlay so heading stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Heading on top */}
      <div className="relative z-10 p-12 flex flex-col">
        <div className="flex items-end justify-between mb-6 text-white">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-px bg-[#D71920]" />
              <span className="text-[13px] font-bold tracking-[0.3em] uppercase text-gray-300">{d.label}</span>
            </div>
            <h2 className="font-bebas text-[64px] leading-none text-white tracking-wide max-w-2xl drop-shadow-lg">{d.heading}</h2>
          </div>
        </div>
        <div className="w-full h-px bg-[#D71920] opacity-50" />
      </div>
    </div>
  );
}

// ─── PAGE 4: FACTS & FIGURES ──────────────────────────────────────────────────
function FactsPage() {
  const d = D.facts;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex flex-col overflow-hidden p-8">
      {/* Top row */}
      <div className="flex items-end gap-10 mb-5">
        <div className="shrink-0">
          <Tag text={d.label} />
          <h2 className="font-bebas text-[48px] leading-none text-[var(--text-primary)] tracking-wide">{d.heading}</h2>
        </div>
        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed flex-1 max-w-lg">{d.body}</p>
      </div>
      <RedLine />
      {/* 8-card landscape strip - 4 top, 4 bottom */}
      <div className="grid grid-cols-4 gap-4 flex-1 content-stretch mt-6">
        {d.kpis.map(k => (
          <div key={k.title} className="border border-[var(--border-color)] p-6 flex flex-col justify-between hover:border-[#D71920]/40 transition-colors bg-[var(--bg-secondary)]">
            <div>
              <div className="font-bebas text-[36px] text-[#D71920] tracking-wide leading-none mb-2">{k.value}{k.suffix}</div>
              <div className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-primary)] mb-2">{k.title}</div>
              <div className="text-[13px] text-[var(--text-muted)] leading-relaxed">{k.description}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ─── PAGE 5: FINANCIAL PERFORMANCE ───────────────────────────────────────────
function FinancialPage() {
  const d = D.financial;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex overflow-hidden">
      {/* LEFT - 40% editorial */}
      <div className="w-[40%] flex flex-col p-8 border-r border-[var(--border-color)]">
        <Tag text={d.label} />
        <h2 className="font-bebas text-[44px] leading-none text-[var(--text-primary)] tracking-wide mb-3">{d.heading}</h2>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-5">{d.body}</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {d.metrics.map(m => (
            <div key={m.label} className="border border-[var(--border-color)] p-3 flex items-start justify-between hover:border-[#D71920]/30 transition-colors">
              <div>
                <div className="font-bebas text-xl text-[#D71920] tracking-wide">{m.value}</div>
                <div className="text-[13px] uppercase tracking-widest text-[var(--text-muted)]">{m.label}</div>
              </div>
              <span className={`text-[12px] font-bold ${m.trend === "up" ? "text-green-500" : "text-red-500"}`}>{m.trend === "up" ? "(+)" : "(-)"}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto bg-[var(--bg-secondary)] border-l-2 border-[#D71920] p-4">
          <div className="text-[13px] font-bold uppercase tracking-widest text-[#D71920] mb-1">Investing in Tomorrow</div>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">Bushra Impex continues to invest in product development, infrastructure, technology and dealer partnerships for sustainable long-term growth.</p>
        </div>
      </div>

      {/* RIGHT - 2 rows (top: img 1 & 3, bottom: text & img 2) */}
      <div className="flex-1 flex flex-col bg-[var(--bg-secondary)]">
        {/* Top Row */}
        <div className="flex-1 flex border-b border-[var(--border-color)] bg-white overflow-hidden">
          <div className="flex-1 relative overflow-hidden border-r border-[var(--border-color)]">
            <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)] shadow-sm z-10 border border-[var(--border-color)]">
              Financials YoY
            </div>
            <img src="/company-overview/images/financialYOY dat.png" alt="Financial YOY Data" className="absolute inset-0 w-full h-full object-contain p-4" />
          </div>
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)] shadow-sm z-10 border border-[var(--border-color)]">
              Containers YoY
            </div>
            <img src="/company-overview/images/financial image 3.png" alt="Financial Data 3" className="absolute inset-0 w-full h-full object-contain p-4" />
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="flex-1 bg-white flex items-center p-6 gap-4 overflow-hidden">
          <div className="w-[45%] pl-4 shrink-0 flex flex-col justify-center">
            <h3 className="font-bebas text-[54px] sm:text-[64px] leading-[0.9] text-[#D71920] tracking-wide uppercase">
              India's Highest Power Weeder Importers
            </h3>
            <p className="font-bebas text-[32px] sm:text-[40px] leading-[1.1] text-[var(--text-primary)] tracking-wide uppercase mt-2">
              For the year 2025
            </p>
          </div>
          <div className="flex-1 relative h-full w-full">
            <img src="/company-overview/images/financial image 2.png" alt="Financial Data 2" className="absolute inset-0 w-full h-full object-contain object-right" />
          </div>
        </div>
      </div>

    </div>
  );
}

// ─── PAGE 6: R&D ──────────────────────────────────────────────────────────────
function RndPage() {
  const d = D.rnd;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex overflow-hidden">
      {/* LEFT images */}
      <div className="w-[38%] flex flex-col gap-4 p-4 bg-[var(--bg-secondary)] border-r border-[var(--border-color)]">
        <div className="flex-1 relative bg-[var(--bg-primary)] rounded-md overflow-hidden shadow-sm">
          <img src="/company-overview/images/5a 1st image.png" alt="R&D Testing" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="flex-1 relative bg-[var(--bg-primary)] rounded-md overflow-hidden shadow-sm">
          <img src="/company-overview/images/5a 2nd image.png" alt="R&D Engineering" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      {/* RIGHT - content */}
      <div className="flex-1 flex flex-col p-8">
        <Tag text={d.label} />
        <h2 className="font-bebas text-[48px] leading-none text-[var(--text-primary)] tracking-wide mb-3">{d.heading}</h2>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-5 max-w-lg">{d.body}</p>
        <RedLine />
        <div className="grid grid-cols-2 gap-3 flex-1 content-start mt-4">
          {d.pillars.map(p => (
            <div key={p.title} className="flex gap-3 p-4 border border-[var(--border-color)] hover:border-[#D71920]/30 transition-colors">
              <div className="w-0.5 bg-[#D71920] shrink-0" />
              <div>
                <div className="text-[13px] font-bold text-[var(--text-primary)] mb-1">{p.title}</div>
                <div className="text-[13px] text-[var(--text-muted)] leading-relaxed">{p.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── PAGE 6: SUSTAINABILITY (new content) ────────────────────────────────────
function SustainabilityPage() {
  const d = D.sustainability;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex overflow-hidden">
      <div className="w-[38%] flex flex-col p-8 border-r border-[var(--border-color)] overflow-hidden">
        <Tag text={d.label} />
        <h2 className="font-bebas text-[30px] leading-tight text-[var(--text-primary)] tracking-wide mb-4">{d.heading}</h2>
        <div className="flex flex-col gap-3 flex-1 overflow-hidden">
          {d.sections.map((s, i) => (
            <div key={i} className="pl-3" style={{ borderLeft: `2px solid ${i === 0 ? "#D71920" : "var(--border-secondary)"}` }}>
              <div className="text-[13px] font-bold uppercase tracking-widest text-[#D71920] mb-1">{s.title}</div>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-[var(--bg-secondary)] p-3 border border-[var(--border-color)]">
          <p className="text-[8.5px] italic text-[var(--text-muted)] leading-relaxed">&ldquo;{d.quote}&rdquo;</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-8 border-r border-[var(--border-color)]">
        <div className="text-[13px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">Our Commitment</div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {d.commitments.map((c, i) => (
            <div key={i} className="flex items-start gap-2.5 p-4 border border-[var(--border-color)] hover:border-[#D71920]/40 transition-colors bg-[var(--bg-secondary)]">
              <span className="text-lg shrink-0">{c.split(" ")[0]}</span>
              <span className="text-[13px] font-bold text-[var(--text-primary)] leading-tight">{c.split(" ").slice(1).join(" ")}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 relative overflow-hidden rounded-md border border-[var(--border-color)]">
          <img src="/company-overview/images/6A IMAGE.png" alt="Sustainability" className="absolute inset-0 w-full h-full object-contain" />
        </div>
      </div>
      <div className="w-52 bg-[var(--bg-secondary)] relative overflow-hidden">
        <img src="/company-overview/images/6b.png" alt="X1 Power in field" className="absolute inset-0 w-full h-full object-cover" />
      </div>

    </div>
  );
}

// ─── PAGE 7: INDIA OPPORTUNITY (3-card layout) ────────────────────────────────
function IndiaPage() {
  const d = D.indiaOpportunity;
  const stats = [
    { value: "140M+", label: "Agricultural Households", desc: "India is home to over 140 million agricultural households, making it one of the world's largest agricultural markets." },
    { value: "60%+", label: "Mechanisation Potential", desc: "Farm mechanisation in India remains uneven across crops and regions, creating significant room for future growth as adoption expands nationwide." },
    { value: "₹1.6L Cr+", label: "Agricultural Machinery Market", desc: "India's agricultural machinery industry continues to expand rapidly, driven by government support, rising farm incomes and increasing mechanisation demand." },
  ];
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex flex-col overflow-hidden p-8">
      <div className="mb-4">
        <Tag text={d.label} />
        <h2 className="font-bebas text-[48px] leading-none text-[var(--text-primary)] tracking-wide">{d.heading}</h2>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mt-2 max-w-3xl">{d.body}</p>
      </div>
      <RedLine />
      <div className="flex gap-4 mt-4 mb-4">
        {stats.map(s => (
          <div key={s.label} className="flex-1 border border-[var(--border-color)] p-6 relative overflow-hidden hover:border-[#D71920]/40 transition-colors bg-[var(--bg-secondary)]">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#D71920]" />
            <div className="font-bebas text-[42px] text-[#D71920] tracking-wide leading-none mb-1">{s.value}</div>
            <div className="text-[13px] font-bold uppercase tracking-widest text-[var(--text-primary)] mb-3">{s.label}</div>
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-auto">
        {d.keyPoints.map((kp, i) => (
          <div key={i} className="flex items-start gap-2 text-[13px] text-[var(--text-secondary)]">
            <span className="text-[#D71920] shrink-0 font-bold">✓</span>
            <span className="leading-snug">{kp}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

// ─── PAGE 10: DEALER NETWORK ──────────────────────────────────────────────────
function DealerPage() {
  const d = D.dealerNetwork;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex overflow-hidden">
      {/* LEFT - heading + metrics */}
      <div className="w-[28%] flex flex-col p-8 border-r border-[var(--border-color)]">
        <Tag text={d.label} />
        <h2 className="font-bebas text-[42px] leading-none text-[var(--text-primary)] tracking-wide mb-3">{d.heading}</h2>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">{d.body}</p>
        <div className="flex flex-col gap-2">
          {d.metrics.map(m => (
            <div key={m.label} className="border border-[var(--border-color)] p-3">
              <div className="font-bebas text-xl text-[#D71920] tracking-wide">{m.value}</div>
              <div className="text-[13px] uppercase tracking-widest text-[var(--text-muted)]">{m.label}</div>
            </div>
          ))}
        </div>
        {/* Journey */}
        <div className="mt-4 flex flex-col gap-0.5">
          {d.journey.map((step, i) => (
            <div key={step} className="flex items-center gap-1.5">
              <span className="text-[13px] bg-[var(--bg-secondary)] border border-[var(--border-color)] px-2 py-0.5 text-[var(--text-secondary)]">{step}</span>
              {i < d.journey.length - 1 && <span className="text-[13px] text-[#D71920]">↓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* CENTRE - benefits */}
      <div className="flex-1 grid grid-cols-2 gap-3 p-8 content-start border-r border-[var(--border-color)]">
        {d.benefits.map(b => (
          <div key={b.title} className="border border-[var(--border-color)] p-4 hover:border-[#D71920]/30 transition-colors">
            <div className="text-[13px] font-bold text-[var(--text-primary)] mb-1">{b.title}</div>
            <div className="text-[13px] text-[var(--text-muted)] leading-relaxed">{b.description}</div>
          </div>
        ))}
      </div>



    </div>
  );
}

// ─── PAGE 11: OUR BRANDS ──────────────────────────────────────────────────────
function BrandsPage() {
  const d = D.brands;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex overflow-hidden">
      {/* Section label col */}
      <div className="w-48 border-r border-[var(--border-color)] flex flex-col justify-between p-8">
        <div>
          <Tag text={d.label} />
          <h2 className="font-bebas text-[44px] leading-none text-[var(--text-primary)] tracking-wide">Our<br />Brands</h2>
        </div>
        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{d.body}</p>
      </div>

      {/* Bushra Impex brand card + image */}
      <div className="flex-1 border-r border-[var(--border-color)] flex flex-col relative overflow-hidden min-h-0">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#D71920]" />
        <div className="relative overflow-hidden" style={{ height: "60%", minHeight: 0 }}>
          <img src="/company-overview/images/PAGE 10 IMAGE 1- FOR BUSHRA IMPEX.jpg" alt="Bushra Impex" className="absolute inset-0 w-full h-full object-contain" />
        </div>
        <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-primary)] flex-1">
          <div className="font-bebas text-[40px] leading-none text-[var(--text-primary)] tracking-wide mb-1">{d.brandList[0].name}</div>
          <div className="text-[13px] uppercase tracking-widest text-[#D71920] font-bold mb-2">{d.brandList[0].tagline}</div>
          <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{d.brandList[0].description}</p>
        </div>
      </div>

      {/* X1 Power brand card + image */}
      <div className="flex-1 border-r border-[var(--border-color)] flex flex-col relative overflow-hidden min-h-0">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#D71920]" />
        <div className="relative overflow-hidden" style={{ height: "60%", minHeight: 0 }}>
          <img src="/company-overview/images/PAGE 10 IMAGE 2- FOR X1 POWER.jpg" alt="X1 Power" className="absolute inset-0 w-full h-full object-contain" />
        </div>
        <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-primary)] flex-1">
          <div className="font-bebas text-[40px] leading-none text-[var(--text-primary)] tracking-wide mb-1">{d.brandList[1].name}</div>
          <div className="text-[13px] uppercase tracking-widest text-[#D71920] font-bold mb-2">{d.brandList[1].tagline}</div>
          <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{d.brandList[1].description}</p>
        </div>
      </div>

    </div>
  );
}

// ─── PAGE 12: PRODUCT ECOSYSTEM ───────────────────────────────────────────────
function ProductsPage() {
  const d = D.products;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex flex-col overflow-hidden p-8">
      <div className="flex items-end justify-between mb-4">
        <div>
          <Tag text={d.label} />
          <h2 className="font-bebas text-[48px] leading-none text-[var(--text-primary)] tracking-wide">{d.heading}</h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-[13px] text-[var(--text-muted)] text-right max-w-xs leading-relaxed">{d.body}</p>
          <Link href="/products" className="text-[13px] font-bold uppercase tracking-widest text-[#D71920] hover:underline">Explore Full Catalogue →</Link>
        </div>
      </div>
      <RedLine />
      {/* 5-column landscape grid */}
      <div className="grid grid-cols-5 gap-3 flex-1 content-stretch mt-4 min-h-0">
        {d.categories.map(cat => {
          // Map category name to image filename
          const imageMap: Record<string, string> = {
            "Power Weeders": "power weeders.png",
            "Crop Harvesters": "Crop harvester.png",
            "Chainsaws": "chainsaw.png",
            "Sprayers & HTP": "Sprayers & HTP.png",
            "Water Pumps": "water pumps.png",
            "Chaff Cutters": "Chaff Cutter.png",
            "Earth Augers": "Earth Augers.png",
            "Lawn Mowers": "lawn movers.png",
            "Tea Harvesters": "Tea Harvesters.png",
            "Wood Chippers": "wood chippers.png",
          };
          const imageSrc = imageMap[cat.name];
          
          return (
            <div key={cat.name} className="border border-[var(--border-color)] p-3 flex flex-col hover:border-[#D71920]/40 transition-all group bg-white dark:bg-[var(--bg-primary)] overflow-hidden">
              {/* Product Image - Primary focus, enlarged & zoomed */}
              {imageSrc && (
                <div className="flex-1 w-full min-h-[140px] relative flex items-center justify-center p-1 overflow-hidden mb-2">
                  <img 
                    src={`/company-overview/images/${imageSrc}`} 
                    alt={cat.name} 
                    className="w-full h-full object-contain scale-135 group-hover:scale-150 transition-transform duration-300 mix-blend-multiply dark:mix-blend-normal" 
                  />
                </div>
              )}
              {/* Product Details - Lower section */}
              <div className="shrink-0 pt-1 border-t border-[var(--border-color)]/30">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <div className="text-[13px] font-bold text-[var(--text-primary)] leading-tight truncate">{cat.name}</div>
                  <div className="font-bebas text-xl text-[#D71920] tracking-wide shrink-0">{cat.count}</div>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] leading-tight line-clamp-2">{cat.description}</div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

// ─── PAGE 13: LEADERSHIP ──────────────────────────────────────────────────────
function LeadershipPage() {
  const d = D.leadership;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex overflow-hidden">
      {/* Section col */}
      <div className="w-[22%] border-r border-[var(--border-color)] flex flex-col p-8">
        <Tag text={d.label} />
        <h2 className="font-bebas text-[44px] leading-none text-[var(--text-primary)] tracking-wide mb-3">{d.heading}</h2>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">{d.body}</p>
        <div className="mt-auto grid grid-cols-1 gap-2">
          {d.philosophyCards.map(p => (
            <div key={p.title} className="p-2 bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <div className="text-[13px] font-bold uppercase tracking-widest text-[#D71920] mb-0.5">{p.title}</div>
              <div className="text-[13px] text-[var(--text-muted)] leading-relaxed">{p.description.substring(0, 60)}…</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - shared image + two bios below */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Merged full-width image */}
        <div className="flex-1 relative overflow-hidden border-b border-[var(--border-color)]">
          <img src="/company-overview/images/12th page image.png" alt="Leadership" className="absolute inset-0 w-full h-full object-cover object-top" />
        </div>
        {/* Two bio blocks side by side */}
        <div className="flex shrink-0 border-t border-[var(--border-color)]">
          <div className="flex-[3] p-5 border-r border-[var(--border-color)]">
            <div className="font-bold text-sm text-[var(--text-primary)]">{d.team[0].name}</div>
            <div className="text-[13px] uppercase tracking-widest text-[#D71920] font-bold mb-2">{d.team[0].designation}</div>
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-2">{d.team[0].bio}</p>
            <div className="border-l-2 border-[#D71920] pl-2">
              <p className="text-[13px] italic text-[var(--text-muted)]">{d.team[0].quote}</p>
            </div>
          </div>
          <div className="flex-[2] p-5">
            <div className="font-bold text-sm text-[var(--text-primary)]">{d.team[1].name}</div>
            <div className="text-[13px] uppercase tracking-widest text-[#D71920] font-bold mb-2">{d.team[1].designation}</div>
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-2">{d.team[1].bio}</p>
            <div className="border-l-2 border-[var(--border-secondary)] pl-2">
              <p className="text-[13px] italic text-[var(--text-muted)]">{d.team[1].vision}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─── PAGE 14: MANAGEMENT & PEOPLE ───────────────────────────────────────────────
function ManagementPage() {
  const depts = [
    { title: "Leading with Vision", purpose: "Strategic direction, governance and long-term planning for Bushra Impex." },
    { title: "Driving Sales", purpose: "Expanding our dealer network and driving nationwide revenue growth." },
    { title: "Empowering People", purpose: "Building a capable workforce and focusing on operational excellence." },
    { title: "Shaping Culture", purpose: "Fostering an environment of integrity, innovation and continuous learning." },
  ];
  const hierarchy = ["Chairman", "Deputy Director", "Management", "Sales", "Operations", "Dealer Support"];
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex overflow-hidden">
      {/* LEFT - org chart */}
      <div className="w-48 border-r border-[var(--border-color)] flex flex-col p-6">
        <Tag text="11 - Management" />
        <h3 className="font-bebas text-2xl text-[var(--text-primary)] tracking-wide mb-4">People Behind Every Partnership</h3>
        <div className="flex flex-col items-center gap-0 flex-1">
          {hierarchy.map((h, i) => (
            <div key={h} className="flex flex-col items-center w-full">
              <div className={`w-full text-center px-2 py-1.5 text-[13px] font-medium border ${i === 0 ? "bg-[#D71920] text-white border-[#D71920]"
                : i === 1 ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)]"
                }`}>{h}</div>
              {i < hierarchy.length - 1 && <div className="w-px h-2 bg-[var(--border-secondary)]" />}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - dept cards + quote */}
      <div className="flex-1 flex flex-col p-8 gap-4">
        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
          {depts.map(d => (
            <div key={d.title} className="border border-[var(--border-color)] p-5 hover:border-[#D71920]/30 transition-colors bg-[var(--bg-secondary)]">
              <div className="text-[12px] font-bold text-[#D71920] mb-2 uppercase tracking-widest">{d.title}</div>
              <div className="text-[13px] text-[var(--text-muted)] leading-relaxed">{d.purpose}</div>
            </div>
          ))}
        </div>
        <div className="border-l-2 border-[#D71920] pl-4 py-2 bg-[var(--bg-secondary)] pr-4">
          <p className="text-[13px] italic text-[var(--text-muted)]">"Our greatest strength is the people who turn ideas into reliable products and lasting partnerships."</p>
        </div>
      </div>

    </div>
  );
}

// ─── PAGE 15: INFRASTRUCTURE ──────────────────────────────────────────────────
function InfrastructurePage() {
  const d = D.infrastructure;
  const cards = [
    { title: "Bushra Impex Early Days", sub: "Where it all began", img: "/company-overview/images/PAGE 13 FILE 10A.jpg" },
    { title: "Head Office", sub: "Bengaluru, Karnataka", img: "/company-overview/images/PAGE 13 IMAGE 10B.jpg" },
    { title: "Experience Centre", sub: "Product Showcase", img: "/company-overview/images/PAGE 13 IMAGE 3.jpg" },
  ];
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex flex-col overflow-hidden p-8">
      {/* Header */}
      <div className="mb-5">
        <Tag text={d.label} />
        <h2 className="font-bebas text-[48px] leading-none text-[var(--text-primary)] tracking-wide">{d.heading}</h2>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mt-2 max-w-2xl">{d.body}</p>
      </div>
      <RedLine />

      {/* 3 image cards grid */}
      <div className="flex-1 grid grid-cols-3 gap-4 mt-4 min-h-0">
        {cards.map(c => (
          <div key={c.title} className="relative overflow-hidden group">
            {/* Full bleed image */}
            <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            {/* Floating white label box at bottom */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[var(--bg-primary)]/95 p-4 shadow-lg backdrop-blur-sm">
              <div className="text-[15px] font-bold text-[var(--text-primary)] leading-tight">{c.title}</div>
              <div className="text-[12px] text-[var(--text-muted)] mt-0.5">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE 16: FUTURE ROADMAP ──────────────────────────────────────────────────
function FuturePage() {
  const d = D.future;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex flex-col overflow-hidden p-8">
      <div className="flex items-end justify-between mb-4">
        <div>
          <Tag text={d.label} />
          <h2 className="font-bebas text-[44px] leading-none text-[var(--text-primary)] tracking-wide">{d.heading}</h2>
        </div>
        <p className="text-[13px] text-[var(--text-muted)] max-w-xs text-right leading-relaxed">{d.body}</p>
      </div>
      <RedLine />
      {/* Horizontal roadmap phases */}
      <div className="flex gap-3 mt-4 mb-3">
        {d.roadmap.map((phase) => (
          <div key={phase.period} className="flex-1 border border-[var(--border-color)] p-4 hover:border-[#D71920]/40 transition-colors bg-[var(--bg-secondary)]">
            <div className="font-bebas text-2xl text-[#D71920] tracking-wide mb-2">{phase.period}</div>
            {phase.milestones.map(m => (
              <div key={m} className="flex gap-1.5 mb-1">
                <span className="text-[#D71920] text-[13px] shrink-0 mt-0.5">→</span>
                <span className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{m}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Vision cards strip */}
      <div className="flex gap-3 mb-3">
        {d.visionCards.map(v => (
          <div key={v.title} className="flex-1 border border-[var(--border-color)] p-3 hover:border-[#D71920]/30 transition-colors">
            <div className="text-[13px] font-bold text-[var(--text-primary)] mb-1">{v.title}</div>
            <div className="text-[13px] text-[var(--text-muted)] leading-relaxed">{v.description}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="border-l-2 border-[#D71920] pl-3">
          <p className="text-[13px] italic text-[var(--text-muted)]">{d.quote}</p>
        </div>
        <div className="flex gap-3">
          <Link href={d.cta.primary.href} className="bg-[#D71920] text-white text-[13px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-[#b0151b] transition-colors">{d.cta.primary.label}</Link>
          <Link href={d.cta.secondary.href} className="border border-[var(--border-secondary)] text-[var(--text-secondary)] text-[13px] font-bold uppercase tracking-widest px-4 py-2 hover:border-[#D71920] hover:text-[#D71920] transition-colors">{d.cta.secondary.label}</Link>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 17: CONTACT ─────────────────────────────────────────────────────────
function ContactPage() {
  const d = D.contact;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex overflow-hidden">
      {/* LEFT - heading + first 2 cards */}
      <div className="w-[40%] flex flex-col p-8 border-r border-[var(--border-color)]">
        <Tag text={d.label} />
        <h2 className="font-bebas text-[42px] leading-none text-[var(--text-primary)] tracking-wide mb-2">{d.heading}</h2>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-5">{d.body}</p>
        <div className="flex flex-col gap-2 flex-1">
          {d.contactCards.slice(0, 3).map(card => (
            <div key={card.title} className="border border-[var(--border-color)] p-4 flex gap-3 hover:border-[#D71920]/30 transition-colors">
              <div className="w-0.5 bg-[#D71920] shrink-0" />
              <div>
                <div className="text-[13px] font-bold text-[var(--text-primary)] mb-0.5">{card.title}</div>
                <div className={`text-[13px] mb-1 ${card.detail.includes("TODO") ? "text-amber-500 font-medium" : "text-[var(--text-muted)]"}`}>{card.detail}</div>
                {card.action && card.href && <a href={card.href} className="text-[13px] text-[#D71920] font-bold uppercase tracking-widest hover:underline">{card.action} →</a>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - remaining cards + enquiry types */}
      <div className="flex-1 flex flex-col p-8 gap-3">
        <div className="flex flex-col gap-2">
          {d.contactCards.slice(3).map(card => (
            <div key={card.title} className="border border-[var(--border-color)] p-4 flex gap-3 hover:border-[#D71920]/30 transition-colors">
              <div className="w-0.5 bg-[#D71920] shrink-0" />
              <div>
                <div className="text-[13px] font-bold text-[var(--text-primary)] mb-0.5">{card.title}</div>
                <div className={`text-[13px] ${card.detail.includes("TODO") ? "text-amber-500 font-medium" : "text-[var(--text-muted)]"}`}>{card.detail}</div>
                {card.action && card.href && <a href={card.href} className="text-[13px] text-[#D71920] font-bold uppercase tracking-widest hover:underline">{card.action} →</a>}
              </div>
            </div>
          ))}
        </div>
        <div className="border border-[var(--border-color)] p-4 flex-1 flex flex-col">
          <div className="text-[13px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Enquiry Types</div>
          <div className="flex flex-wrap gap-2">
            {d.enquiryTypes.map(t => (
              <span key={t} className="text-[13px] border border-[var(--border-color)] px-2 py-1 text-[var(--text-secondary)] hover:border-[#D71920] hover:text-[#D71920] cursor-pointer transition-colors">{t}</span>
            ))}
          </div>
        </div>
        <Link href="/contact" className="bg-[#D71920] text-white text-[13px] font-bold uppercase tracking-widest px-5 py-2.5 text-center hover:bg-[#b0151b] transition-colors">
          Send an Enquiry →
        </Link>
      </div>

    </div>
  );
}

// ─── PAGE 18: CLOSING ─────────────────────────────────────────────────────────
function ClosingPage() {
  const d = D.closing;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex overflow-hidden">
      {/* LEFT - content */}
      <div className="w-[50%] flex flex-col justify-between p-12 border-r border-[var(--border-color)]">
        <div>
          <div className="w-10 h-px bg-[#D71920] mb-5" />
          <div className="text-[13px] font-bold tracking-[0.3em] uppercase text-[#D71920] mb-4">{d.label}</div>
          <h2 className="font-bebas text-[60px] leading-none text-[var(--text-primary)] tracking-wide mb-5">{d.heading}</h2>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">{d.body}</p>
          <p className="text-[13px] italic text-[var(--text-muted)]">"Together, we are shaping a stronger future for agriculture through engineering, partnership and continuous innovation."</p>
        </div>

        {/* Brand signatures */}
        <div>
          <div className="flex items-center gap-8 py-5 border-t border-[var(--border-color)]">
            <div>
              <Image src="/images/bushraimpex-new logo.png" alt="Bushra Impex" width={110} height={32} className="object-contain mb-1" />
              <div className="text-[13px] text-[var(--text-muted)] uppercase tracking-widest">Est. 2012</div>
            </div>
            <div className="w-px h-8 bg-[var(--border-color)]" />
            <div>
              <Image src="/images/x1power-new logo.png" alt="X1 Power" width={80} height={28} className="object-contain dark:brightness-200 mb-1" />
              <div className="text-[13px] text-[var(--text-muted)] uppercase tracking-widest">Agricultural Machinery</div>
            </div>
            <div className="ml-auto">
              <Link href="/products" className="border border-[var(--border-secondary)] text-[var(--text-secondary)] text-[13px] font-bold uppercase tracking-widest px-4 py-2 hover:border-[#D71920] hover:text-[#D71920] transition-all">
                {d.cta.label} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT - cinematic image */}
      <div className="flex-1 bg-[var(--bg-secondary)] relative overflow-hidden">
        <img src="/company-overview/images/1a.png" alt="Bushra Impex" className="absolute inset-0 w-full h-full object-cover" />
      </div>

    </div>
  );
}

// ─── SECTION DIVIDERS ─────────────────────────────────────────────────────────
function DividerPage({ title, num }: { title: string; num: string }) {
  return (
    <div className="w-full h-full bg-[#0d0d0d] flex flex-col justify-between p-16 relative overflow-hidden text-white select-none">
      {/* Background blueprint graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[var(--bg-secondary)]" />

      <div className="flex items-center gap-3">
        <div className="w-12 h-px bg-[#D71920]" />
        <span className="font-mono text-[12px] uppercase tracking-[0.4em] text-gray-400">Section {num}</span>
      </div>

      <div className="my-auto">
        <div className="font-mono text-2xl text-[#D71920] mb-2">{num}</div>
        <h2 className="font-bebas text-[72px] tracking-wide leading-none text-white uppercase">{title}</h2>
      </div>

      <div className="flex items-center justify-between text-gray-500 text-[10px] font-mono tracking-widest uppercase">
        <span>Bushra Impex × X1 Power</span>
        <span>Corporate Profile · 2026-2027</span>
      </div>
    </div>
  );
}

function Divider1Page() { return <DividerPage title="Facts & Figures" num="01" />; }
function Divider2Page() { return <DividerPage title="Story of Success" num="02" />; }
function Divider3Page() { return <DividerPage title="People & Network" num="03" />; }
function Divider4Page() { return <DividerPage title="Future Plans" num="04" />; }

// ─── NEW PAGE: PLANS & GOALS ──────────────────────────────────────────────────
function GoalsPage() {
  const d = D.goals;
  return (
    <div className="w-full h-full bg-[var(--bg-primary)] flex flex-col overflow-hidden p-8">
      <div className="flex items-end justify-between mb-4">
        <div>
          <Tag text={d.label} />
          <h2 className="font-bebas text-[48px] leading-none text-[var(--text-primary)] tracking-wide">{d.heading}</h2>
        </div>
        <p className="text-[11px] text-[var(--text-muted)] max-w-sm text-right leading-relaxed">{d.body}</p>
      </div>
      <RedLine />
      <div className="grid grid-cols-2 gap-4 flex-1 content-start mt-6">
        {d.targets.map(t => (
          <div key={t.title} className="border border-[var(--border-color)] p-6 hover:border-[#D71920]/40 transition-colors bg-[var(--bg-secondary)] flex gap-4">
            <div className="font-bebas text-[36px] text-[#D71920] tracking-wide leading-none shrink-0 w-24 border-r border-[var(--border-color)] pr-4 flex items-center justify-center">
              {t.metric}
            </div>
            <div>
              <div className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-primary)] mb-1.5">{t.title}</div>
              <div className="text-[11px] text-[var(--text-muted)] leading-relaxed">{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ALL PAGES ────────────────────────────────────────────────────────────────
const PAGES = [
  CoverPage, TocPage,
  Divider1Page, CompanyOverviewPage, FinancialPage, RndPage, SustainabilityPage, IndiaPage, FactsPage, BrandsPage, ProductsPage,
  Divider2Page, InfrastructurePage, StoryPage,
  Divider3Page, LeadershipPage, ManagementPage, DealerPage,
  Divider4Page, FuturePage, GoalsPage, ContactPage, ClosingPage,
];

// ─── PRINT LAYOUT ─────────────────────────────────────────────────────────────
function PrintLayout() {
  return (
    <div id="cp-print-layout" style={{ display: "none" }}>
      {PAGES.map((PageComp, i) => (
        <div key={i} className="cp-print-page relative">
          <PageComp goTo={() => { }} />
          {i > 1 && (
            <div className="absolute bottom-5 right-6 font-mono text-[12px] font-bold text-gray-500 z-[9999]" style={{ printColorAdjust: 'exact' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN VIEWER ──────────────────────────────────────────────────────────────
export default function CompanyProfileViewer() {
  const [current, setCurrent] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const total = PAGES.length;

  const goTo = useCallback((i: number) => {
    setCurrent(Math.max(0, Math.min(total - 1, i)));
    setSidebarOpen(false);
  }, [total]);

  // ─── NATIVE BROWSER PRINT / PUPPETEER EXPORT ────────────────────────────
  const downloadPDF = useCallback(() => {
    // Native print leverages our perfect @media print CSS rules.
    window.print();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(current - 1);
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "f" || e.key === "F") setFullscreen(v => !v);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  const PageComponent = PAGES[current];

  return (
    <>
      {/* Portrait mode hint — CSS media query shows this only in portrait on small screens */}
      <style>{`
        @media (max-width: 767px) and (orientation: portrait) {
          .rotate-hint { display: flex !important; }
        }
      `}</style>
      <div className="rotate-hint hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full items-center gap-2 pointer-events-none">
        <span>🔄</span> Rotate for best view
      </div>
      <div
        className={`flex flex-col bg-[#111] ${fullscreen ? "fixed inset-0 z-[999]" : "w-full h-full"}`}
        style={fullscreen ? { height: "100svh" } : { height: "100%" }}
      >
        {/* ── VIEWER TOP BAR ──────────────────────────────── */}
        <div className="h-11 bg-[#0d0d0d] border-b border-gray-800 flex items-center gap-3 px-5 shrink-0">
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-[13px] uppercase tracking-widest transition-colors"
          >
            ☰ <span>Contents</span>
          </button>

          <div className="flex-1" />
          <span className="hidden sm:block text-[13px] text-gray-600 font-mono tracking-wider">
            Bushra Impex × X1 Power · Corporate Profile
          </span>
          {/* Download PDF */}
          <button
            onClick={downloadPDF}
            disabled={isDownloading}
            className={`flex items-center gap-1.5 text-white text-[13px] font-bold uppercase tracking-widest px-3 py-1.5 transition-all ${isDownloading
              ? "bg-[#D71920]/60 cursor-wait"
              : "bg-[#D71920] hover:bg-[#b0151b]"
              }`}
          >
            {isDownloading ? (
              <><span className="animate-spin">⟳</span> {downloadProgress}%</>
            ) : (
              <>⬇ Download PDF</>
            )}
          </button>

          {/* Theme toggle */}
          <ThemeToggle />

          <button onClick={() => setFullscreen(v => !v)}
            className="text-gray-500 hover:text-white text-[13px] px-2 py-1 border border-gray-800 hover:border-gray-600 transition-colors">
            {fullscreen ? "⊡" : "⊞"}
          </button>
          <div className="w-px h-3 bg-gray-800" />
          <button onClick={() => goTo(current - 1)} disabled={current === 0}
            className="text-gray-500 hover:text-white disabled:opacity-20 text-sm px-2 transition-colors">‹</button>
          <span className="font-mono text-[13px] text-gray-400 w-14 text-center">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button onClick={() => goTo(current + 1)} disabled={current === total - 1}
            className="text-gray-500 hover:text-white disabled:opacity-20 text-sm px-2 transition-colors">›</button>
        </div>

        {/* ── MAIN AREA ───────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden">

          {/* Sidebar TOC */}
          {sidebarOpen && (
            <div className="w-52 bg-[#0f0f0f] border-r border-gray-800 flex flex-col overflow-y-auto shrink-0">
              <div className="p-3 border-b border-gray-800">
                <div className="text-[13px] uppercase tracking-widest text-gray-500 font-bold">Chapters</div>
              </div>
              <div className="py-1">
                {CHAPTERS.map((ch, i) => (
                  <button key={ch.id} onClick={() => goTo(i)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-gray-900 transition-colors ${i === current ? "bg-gray-800 border-l-2 border-[#D71920]" : "border-l-2 border-transparent"}`}>
                    <span className="font-mono text-[13px] text-[#D71920] w-4 shrink-0">{ch.num}</span>
                    <span className={`text-[13px] flex-1 leading-tight ${i === current ? "text-white" : "text-gray-400"}`}>{ch.label}</span>
                    <span className="font-mono text-[13px] text-gray-600">{String(i + 1).padStart(2, "0")}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Page - Bulletproof Scaled Slide */}
          <div className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden relative">
            <ScaledSlide>
              <PageComponent goTo={goTo} />
            </ScaledSlide>
          </div>

          {/* Right dot rail */}
          <div className="w-8 flex flex-col items-center justify-center gap-1 shrink-0">
            {PAGES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`rounded-full transition-all ${i === current ? "w-1.5 h-5 bg-[#D71920]" : "w-1 h-1 bg-gray-800 hover:bg-gray-600"}`}
                title={CHAPTERS[i]?.label} />
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ─────────────────────────────────── */}
        <div className="h-8 bg-[#0d0d0d] border-t border-gray-800 flex items-center justify-between px-5 shrink-0">
          <span className="font-mono text-[13px] text-gray-600">{CHAPTERS[current]?.label}</span>
          <div className="flex items-center gap-1">
            {PAGES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`h-0.5 rounded-full transition-all ${i === current ? "w-5 bg-[#D71920]" : "w-1 bg-gray-800 hover:bg-gray-700"}`} />
            ))}
          </div>
          <span className="font-mono text-[13px] text-gray-600">← → keys · F fullscreen · ⬇ PDF</span>
        </div>
      </div>

      <PrintLayout />
    </>
  );
}
