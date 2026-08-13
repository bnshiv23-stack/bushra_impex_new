"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ChevronDown, Check, Mail } from "lucide-react";

const BENEFITS = [
  { num: "01", title: "Premium Product Range", desc: "Over 100 FMTTI tested agricultural machines across 10 categories. High demand across India." },
  { num: "02", title: "Marketing Support", desc: "Ready-made dealer brochures, social media creatives, banners and exhibition materials at no cost." },
  { num: "03", title: "Technical Training", desc: "Regular on-site product training sessions and demo field runs for your team and service staff." },
  { num: "04", title: "Reliable Supply Chain", desc: "North and South India stock hubs ensure fast delivery even to remote districts." },
  { num: "05", title: "Subsidy Assistance", desc: "We guide dealers through state government subsidy paperwork and approvals for every state." },
  { num: "06", title: "Spare Parts Access", desc: "Exclusive dealer access to original X1 Power spare parts at competitive margins." },
];

const STATES = [
  "Karnataka", "Tamil Nadu", "Andhra Pradesh", "Telangana", "Kerala",
  "Maharashtra", "Goa", "Rajasthan", "Uttar Pradesh", "Punjab",
  "Haryana", "Delhi NCR", "West Bengal", "Odisha", "Assam",
  "Gujarat", "Madhya Pradesh", "Chhattisgarh", "Bihar", "Jharkhand",
];

const FAQS = [
  { q: "How do I become an authorised X1 Power dealer?", a: "Fill in the Dealer Application form below. Our team will contact you within 48 business hours to discuss territory, product range, and investment requirements." },
  { q: "What is the minimum investment required?", a: "Minimum investment varies by product category and state. Our sales team will guide you based on your local market potential during the initial call." },
  { q: "What dealer margin does X1 Power offer?", a: "X1 Power offers competitive margins structured to ensure dealers build a profitable, sustainable agricultural machinery business." },
  { q: "Do you provide product training for our staff?", a: "Yes. All new dealers receive comprehensive product training including engine handling, routine maintenance, and troubleshooting." },
  { q: "How quickly can I expect spare parts delivery?", a: "Spare parts are dispatched from our Bengaluru or North India stock points within 24 hours of confirmed orders." },
  { q: "Are X1 Power machines subsidy approved?", a: "Yes. X1 Power machines are FMTTI tested and registered with multiple state agriculture departments for applicable subsidy programs." },
];

export default function DealerPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", state: "", city: "", message: "" });

  function validateForm() {
    if (!form.name || !form.phone || !form.city || !form.state) {
      alert("Please fill in all required fields (Name, Phone, City, and State).");
      return false;
    }
    return true;
  }

  function handleWhatsApp(e: React.MouseEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    const text = `NEW DEALER APPLICATION - X1 POWER\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email || "N/A"}\n` +
      `Location: ${form.city}, ${form.state}\n` +
      `Business Details: ${form.message || "N/A"}`;

    window.open(`https://wa.me/917624869606?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  }

  function handleEmail(e: React.MouseEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = `New Dealer Application: ${form.name} (${form.city}, ${form.state})`;
    const body = `NEW DEALER APPLICATION - X1 POWER\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email || "N/A"}\n` +
      `City: ${form.city}\n` +
      `State: ${form.state}\n\n` +
      `Business Background:\n${form.message || "N/A"}`;

    window.open(`mailto:bushrapowertools@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_self");
    setSent(true);
  }

  return (
    <>
      <Navbar />

      {/* ─── HEADER ──────────────────────────────────────── */}
      <section className="pt-16 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <div className="container-site px-0 sm:px-4 grid grid-cols-1 lg:grid-cols-[1fr_400px]">
          <div className="px-5 sm:px-10 py-10 sm:py-14 lg:border-r border-[var(--border-color)]">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-7">
              <Link href="/" className="hover:text-[#D71920] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#D71920]">Dealer Network</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920] block mb-3">Join Our</span>
            <h1 className="font-bebas text-[clamp(44px,7vw,72px)] text-[var(--text-primary)] leading-none tracking-tight">Dealer Network</h1>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mt-4 max-w-[480px]">
              Partner with us and grow your business with high-quality products, excellent support, and a brand that farmers trust. X1 Power is actively expanding across India.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border-color)]">
            {[
              { num: "500+", label: "Dealers" },
              { num: "29",  label: "States" },
              { num: "100%", label: "Support" },
              { num: "10+",  label: "Categories" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center p-8 gap-1.5">
                <span className="font-bebas text-[40px] text-[var(--text-primary)] leading-none">{s.num}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEALER BENEFITS ─────────────────────────────── */}
      <section className="bg-[var(--bg-primary)] py-14 border-b border-[var(--border-color)]">
        <div className="container-site">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920]">Why Partner With X1 Power</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.num} className="border border-[var(--border-color)] p-7 flex gap-5 hover:border-[#D71920] transition-colors group">
                <span className="font-bebas text-[36px] text-[#D71920]/20 group-hover:text-[#D71920]/40 leading-none shrink-0 transition-colors">{b.num}</span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bebas text-[18px] text-[var(--text-primary)] tracking-tight">{b.title}</h3>
                  <p className="text-[11px] text-[#777] leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATES COVERED ──────────────────────────────── */}
      <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] py-12">
        <div className="container-site">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920]">Active In</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {STATES.map((s) => (
              <span key={s} className="flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] bg-[var(--bg-primary)] text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 bg-[#D71920] shrink-0" />
                {s}
              </span>
            ))}
          </div>
          <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] p-6 max-w-4xl">
            <h3 className="font-bebas text-[20px] text-[var(--text-primary)] mb-3">PAN India Dealer & Technical Service Availability</h3>
            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed mb-3">
              Whether you are looking for an authorized **brush cutter dealer in Karnataka**, a **power weeder dealer in Bengaluru**, a **crop harvester dealer in Punjab**, or a **power sprayer dealer in Andhra Pradesh**, the X1 Power distribution network by Bushra Impex has you covered. We have established stocking points in North India and South India to support local dealerships with rapid machine dispatch.
            </p>
            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
              Every local X1 Power dealer is equipped to handle customer requests for **FMTTI subsidy documentation**, provide hands-on field demonstration trials, perform regular machinery maintenance services, and supply 100% genuine spare parts (carburetors, gearboxes, recoil starters, blades, and fittings). Contact our central customer support desk at **+91-76248-69606** to get details of the authorized dealer closest to your location.
            </p>
          </div>
        </div>
      </section>

      {/* ─── INDIA MAP ────────────────────────────────────── */}
      <section className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] py-16">
        <div className="container-site">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D71920]">Our Presence</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Across India</span>
          </div>
          <div className="relative w-full max-w-4xl mx-auto">
            <Image
              src="/images/dealer-network-map.jpg"
              alt="X1 Power Dealer Network Across India — 500+ Dealers in all 29 States"
              width={1080}
              height={1080}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* ─── DEALER APPLICATION FORM ─────────────────────── */}
      <section id="become-dealer" className="bg-[var(--bg-primary)] py-14">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-14">

            {/* Left: Why join checklist */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920] block mb-3">Apply Now</span>
                <h2 className="font-bebas text-[44px] text-[var(--text-primary)] leading-none tracking-tight">Become a Dealer</h2>
              </div>
              <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                Fill in your details and send your application directly to our team via WhatsApp or Email. We will contact you within 48 business hours.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                {[
                  "No hidden charges",
                  "Dedicated sales territory",
                  "Training & demo support",
                  "Subsidy approval guidance",
                  "Fast spare parts delivery",
                  "Marketing material provided",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-[#D71920] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-[12px] text-[var(--text-secondary)] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div>
              {sent ? (
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-12 flex flex-col items-center gap-4 text-center">
                  <div className="w-12 h-12 bg-[#D71920] flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bebas text-[32px] text-[var(--text-primary)] tracking-tight">Application Sent</h3>
                  <p className="text-[12px] text-[var(--text-secondary)] max-w-[320px]">Your pre-filled details have been prepared and dispatched. Our sales team will follow up shortly!</p>
                  <button onClick={() => setSent(false)} className="btn-outline mt-2">Submit Another</button>
                </div>
              ) : (
                <form className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Full Name *</label>
                      <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D71920] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Phone *</label>
                      <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D71920] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Email</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D71920] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">City *</label>
                      <input required type="text" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Your city" className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D71920] transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">State *</label>
                    <select required value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[#D71920] transition-colors appearance-none">
                      <option value="">Select state…</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Business Background</label>
                    <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your current business, experience, and which product categories interest you…" className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D71920] transition-colors resize-none" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[var(--border-color)]">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#D71920] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 hover:bg-[#b01419] transition-colors"
                    >
                      Submit via WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={handleEmail}
                      className="flex-1 inline-flex items-center justify-center gap-2 border border-[var(--border-color)] text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      Submit via Email
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────── */}
      <section className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] py-14">
        <div className="container-site">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920]">Dealer FAQ</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
          </div>
          <div className="max-w-3xl border border-[var(--border-color)] bg-[var(--bg-primary)]">
            {FAQS.map((f, i) => (
              <div key={i} className="border-b border-[var(--border-color)] last:border-0">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                  <span className="text-[12px] font-bold text-[var(--text-primary)]">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
