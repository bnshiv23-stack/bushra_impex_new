"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown, Check } from "lucide-react";

const CONTACTS = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone / WhatsApp",
    value: "+91 76248 69606",
    href: "https://wa.me/917624869606",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "bushrapowertools@gmail.com",
    href: "mailto:bushrapowertools@gmail.com",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Head Office",
    value: "Bengaluru, Karnataka, India",
    href: "#",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Business Hours",
    value: "Mon – Sat, 9:00 AM – 6:00 PM",
    href: "#",
  },
];

const FAQS = [
  { q: "How do I register a warranty claim?", a: "Please contact our office for more details on how warranty and guarantees work." },
  { q: "Where can I buy original X1 Power spare parts?", a: "All authorised X1 Power dealers stock genuine spare parts. You can also contact our Bengaluru office directly for bulk spare part orders." },
  { q: "Does X1 Power provide on-site servicing?", a: "Yes. For commercial and institutional buyers, we arrange on-site servicing through certified technicians. Contact our support team to schedule." },
  { q: "How do I check if my machine is eligible for a state subsidy?", a: "X1 Power weeders are registered with multiple state agriculture departments. Contact your nearest dealer or our office with your state name for subsidy status." },
];

export default function ContactPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", type: "general" });
  const [sent, setSent] = useState(false);

  function validateForm() {
    if (!form.name || !form.phone || !form.message) {
      alert("Please fill in all required fields (Name, Phone, and Message).");
      return false;
    }
    return true;
  }

  function handleWhatsApp(e: React.MouseEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    const text = `NEW WEBSITE ENQUIRY - X1 POWER\n\n` +
      `Enquiry Type: ${form.type.toUpperCase()}\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email || "N/A"}\n\n` +
      `Message: ${form.message}`;

    window.open(`https://wa.me/917624869606?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  }

  function handleEmail(e: React.MouseEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = `New ${form.type.toUpperCase()} Enquiry: ${form.name}`;
    const body = `NEW WEBSITE ENQUIRY - X1 POWER\n\n` +
      `Enquiry Type: ${form.type}\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email || "N/A"}\n\n` +
      `Message:\n${form.message}`;

    window.open(`mailto:bushrapowertools@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_self");
    setSent(true);
  }

  return (
    <>
      <Navbar />

      {/* ─── HEADER ──────────────────────────────────────── */}
      <section className="pt-16 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <div className="container-site px-0 sm:px-4 grid grid-cols-1 lg:grid-cols-[1fr_380px]">
          <div className="px-5 sm:px-10 py-10 sm:py-14 lg:border-r border-[var(--border-color)]">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-7">
              <Link href="/" className="hover:text-[#D71920] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#D71920]">Contact</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920] block mb-3">Get In Touch</span>
            <h1 className="font-bebas text-[clamp(44px,7vw,72px)] text-[var(--text-primary)] leading-none tracking-tight">Contact &amp; Support</h1>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mt-4 max-w-[480px]">
              Whether you're a farmer, dealer, distributor or institutional buyer — our team is ready to help you select, order and service your X1 Power equipment.
            </p>
          </div>

          {/* Contact info panel */}
          <div className="flex flex-col divide-y divide-[var(--border-color)]">
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-start gap-4 px-8 py-6 hover:bg-[var(--bg-secondary)] transition-colors group"
              >
                <span className="text-[var(--text-muted)] group-hover:text-[#D71920] transition-colors mt-0.5 shrink-0">{c.icon}</span>
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">{c.label}</span>
                  <span className="block text-[13px] font-bold text-[var(--text-primary)] mt-0.5">{c.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT FORM + ENQUIRY TYPES ────────────────── */}
      <section className="bg-[var(--bg-primary)] py-14">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">Enquiry Type</p>
              <div className="flex flex-col border border-[var(--border-color)]">
                {[
                  { v: "general",   label: "General Enquiry" },
                  { v: "product",   label: "Product Information" },
                  { v: "dealer",    label: "Dealer Partnership" },
                  { v: "service",   label: "Service & Warranty" },
                  { v: "spare",     label: "Spare Parts" },
                  { v: "subsidy",   label: "Subsidy Help" },
                ].map((t) => (
                  <button
                    key={t.v}
                    onClick={() => setForm({ ...form, type: t.v })}
                    className={`w-full text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-colors border-b border-[var(--border-color)] last:border-0 ${
                      form.type === t.v
                        ? "text-[#D71920] bg-[var(--bg-secondary)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {form.type === t.v && <span className="w-1 h-1 bg-[#D71920] shrink-0 rounded-full" />}
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>

              <a
                href="https://wa.me/917624869606"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[#D71920] transition-colors"
              >
                WhatsApp Us Directly →
              </a>
            </div>

            {/* Form */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-6">Send a Message</p>

              {sent ? (
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-10 flex flex-col items-center gap-3 text-center">
                  <div className="w-10 h-10 bg-[#D71920] flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bebas text-[28px] text-[var(--text-primary)] tracking-tight">Message Dispatched</h3>
                  <p className="text-[12px] text-[var(--text-secondary)]">Your pre-filled details have been prepared and sent. Our team will follow up shortly!</p>
                  <button onClick={() => setSent(false)} className="btn-outline mt-2 text-[10px]">Send Another</button>
                </div>
              ) : (
                <form className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Full Name *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D71920] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Phone *</label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D71920] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D71920] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your requirement…"
                      className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D71920] transition-colors resize-none"
                    />
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
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D71920]">FAQ</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
          </div>
          <div className="flex flex-col gap-0 max-w-3xl border border-[var(--border-color)] bg-[var(--bg-primary)]">
            {FAQS.map((f, i) => (
              <div key={i} className="border-b border-[var(--border-color)] last:border-0">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                >
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
