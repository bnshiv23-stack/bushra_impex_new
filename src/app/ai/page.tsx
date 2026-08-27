"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { respond } from "@/lib/chatbot-engine";
import type { ChatMessage } from "@/lib/chatbot-engine";
import type { Product } from "@/data/products";

// ── //  Markdown
function Md({ text }: { text: string }) {
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("|") && lines[i + 1]?.match(/^\|[\s\-|]+\|/)) {
      const headers = line.split("|").filter(Boolean).map((c) => c.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(lines[i].split("|").filter(Boolean).map((c) => c.trim()));
        i++;
      }
      out.push(
        <div key={i} className="overflow-x-auto my-3 rounded-lg border border-[var(--border-color)]">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                {headers.map((h, j) => (
                  <th key={j} className="px-3 py-1.5 text-left font-semibold text-[var(--text-muted)] uppercase tracking-wide text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[var(--border-color)] last:border-0">
                  {row.map((cell, ci) => <td key={ci} className="px-3 py-1.5 text-[var(--text-secondary)]">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }
    if (!line.trim()) { out.push(<div key={i} className="h-2" />); i++; continue; }
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith("**") && p.endsWith("**")
        ? <strong key={j} className="font-semibold text-[var(--text-primary)]">{p.slice(2, -2)}</strong>
        : <span key={j}>{p}</span>
    );
    out.push(<p key={i} className="text-[14px] leading-relaxed text-[var(--text-secondary)]">{parts}</p>);
    i++;
  }
  return <>{out}</>;
}

// ── //  Product Card
function ProductCard({ p }: { p: Product }) {
  return (
    <div className="flex-shrink-0 w-52 border border-[var(--border-color)] hover:border-[#D71920] transition-colors group overflow-hidden">
      {p.image && (
        <div className="relative h-32 bg-[var(--bg-secondary)]">
          <Image src={p.image} alt={p.name} fill className="object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-3.5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#D71920] mb-1">{p.categoryName}</p>
        <p className="text-[13px] font-semibold text-[var(--text-primary)] leading-snug mb-2.5">{p.name}</p>
        {Object.entries(p.specs).slice(0, 3).map(([k, v]) => (
          <p key={k} className="text-[11px] text-[var(--text-muted)] mb-0.5">{k}: <span className="text-[var(--text-secondary)]">{v}</span></p>
        ))}
        <div className="mt-3 space-y-1.5">
          <Link href={`/products/${p.category}/${p.slug}`}
            className="block text-center text-[11px] font-bold uppercase tracking-wider bg-[var(--text-primary)] text-[var(--bg-primary)] py-1.5 hover:bg-[#D71920] hover:text-white transition-colors">
            View Product
          </Link>
          <a href={`/api/pdf/product?slug=${p.slug}`} download
            className="block text-center text-[11px] font-bold uppercase tracking-wider border border-[var(--border-color)] text-[var(--text-muted)] py-1.5 hover:border-[#D71920] hover:text-[#D71920] transition-colors">
            Download Brochure
          </a>
        </div>
      </div>
    </div>
  );
}

// ── //  Field style
const fCls = "w-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2 text-[13px] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)] transition-colors rounded";

// ── //  Inline Form
function ChatForm({ type, onDone }: { type: "enquiry" | "callback" | "dealer" | "catalogue"; onDone: (msg: string) => void }) {
  const [d, setD] = useState({ name: "", phone: "", state: "", product: "", qty: "1", message: "", bizName: "", location: "", exp: "", slot: "Anytime" });
  const [done, setDone] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setD((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let body = "";
    if (type === "enquiry") body = `*Product Enquiry*\nName: ${d.name}\nPhone: ${d.phone}\nState: ${d.state}\nProduct: ${d.product || "General"}\nQty: ${d.qty}\nMessage: ${d.message}`;
    else if (type === "callback") body = `*Callback Request*\nName: ${d.name}\nPhone: ${d.phone}\nBest time: ${d.slot}`;
    else if (type === "dealer") body = `*Dealer Application*\nBusiness: ${d.bizName}\nLocation: ${d.location}\nExperience: ${d.exp} yrs\nContact: ${d.name} - ${d.phone}`;
    if (body) window.open(`https://wa.me/917624869606?text=${encodeURIComponent(body)}`, "_blank");
    setDone(true);
    onDone("Submitted! Our team will reach out via WhatsApp shortly.");
  };

  if (type === "catalogue") {
    return (
      <div className="mt-3 border border-[var(--border-color)] space-y-px">
        <a href="https://drive.google.com/file/d/1vahURP1XZpRr-ZApCTdhdKmEkAaaHWAN/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-2.5 text-[13px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <span>X1 Power Full Catalogue</span><span className="text-[var(--text-muted)] text-[11px]">PDF ↓</span>
        </a>
        <Link href="/company-overview" className="flex items-center justify-between px-4 py-2.5 text-[13px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors border-t border-[var(--border-color)]">
          <span>Company Profile</span><span className="text-[var(--text-muted)] text-[11px]">View →</span>
        </Link>
        <button onClick={() => onDone("Please share price list and subsidy details")} className="flex items-center justify-between w-full px-4 py-2.5 text-[13px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors border-t border-[var(--border-color)] text-left">
          <span>Request Price List</span><span className="text-[var(--text-muted)] text-[11px]">Request →</span>
        </button>
      </div>
    );
  }

  if (done) return <p className="mt-3 text-[13px] text-emerald-600 dark:text-emerald-400">Submitted - our team will contact you on WhatsApp shortly.</p>;

  return (
    <form onSubmit={submit} className="mt-3 space-y-2 border border-[var(--border-color)] p-4">
      {type === "callback" && <p className="text-[12px] text-[var(--text-muted)] italic mb-2">Would you like an X1 representative to call you?</p>}
      {type === "dealer" && (
        <>
          <input value={d.bizName} onChange={set("bizName")} placeholder="Business / Shop Name *" required className={fCls} />
          <input value={d.location} onChange={set("location")} placeholder="City & State *" required className={fCls} />
          <input value={d.exp} onChange={set("exp")} placeholder="Years in agribusiness" className={fCls} />
        </>
      )}
      <input value={d.name} onChange={set("name")} placeholder="Your name *" required className={fCls} />
      <input type="tel" value={d.phone} onChange={set("phone")} placeholder="Mobile number *" required className={fCls} />
      {type === "enquiry" && (
        <>
          <input value={d.state} onChange={set("state")} placeholder="State / District *" required className={fCls} />
          <input value={d.product} onChange={set("product")} placeholder="Product interested in" className={fCls} />
          <input type="number" value={d.qty} onChange={set("qty")} placeholder="Quantity" min="1" className={fCls} />
          <textarea value={d.message} onChange={set("message")} placeholder="Message (optional)" rows={2} className={`${fCls} resize-none`} />
        </>
      )}
      {type === "callback" && (
        <select value={d.slot} onChange={set("slot")} className={fCls}>
          {["Anytime", "Morning (9-12 AM)", "Afternoon (12-4 PM)", "Evening (4-7 PM)"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      )}
      <button type="submit" className="w-full py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[12px] font-bold uppercase tracking-wider hover:bg-[#D71920] hover:text-white transition-colors mt-1">
        {type === "enquiry" && "Submit Enquiry"}
        {type === "callback" && "Request Callback"}
        {type === "dealer" && "Submit Application"}
      </button>
    </form>
  );
}

// ── //  Pair
interface Pair { q: string; a: ChatMessage | null }

const SUGGESTIONS = [
  "Products", "Submit Enquiry", "Become a Dealer",
  "Request a Callback", "Catalogue Downloads", "Contact Us",
];

export default function AIPage() {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [pairs, busy]);

  const ask = useCallback((q: string) => {
    if (!q.trim() || busy) return;
    setInput("");
    setPairs((prev) => [...prev, { q, a: null }]);
    setBusy(true);
    setTimeout(() => {
      const a = respond(q);
      setPairs((prev) => { const n = [...prev]; n[n.length - 1].a = a; return n; });
      setBusy(false);
    }, 500);
  }, [busy]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">

      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-50 h-12 border-b border-[var(--border-color)] bg-[var(--bg-primary)] flex items-center px-6">
        <Link href="/" className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          &larr; Back
        </Link>
        <span className="mx-auto text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)]">
          X1 Power &middot; Product Assistant
        </span>
        <Link href="/contact" className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[#D71920] transition-colors">
          Contact
        </Link>
      </header>

      {/* Body */}
      <div className="flex-1 flex flex-col pt-12 pb-24">

        {/* Empty state */}
        {pairs.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">Product Assistant</p>
            <h1 className="text-[30px] md:text-[40px] font-black text-[var(--text-primary)] tracking-tight mb-3 leading-tight">
              How can I help you?
            </h1>
            <p className="text-[13px] text-[var(--text-muted)] mb-10 max-w-xs">
              Search products, download brochures, submit enquiries, or find your nearest dealer.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => ask(s)}
                  className="text-[12px] px-4 py-2 border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conversation */}
        {pairs.length > 0 && (
          <div className="max-w-2xl w-full mx-auto px-6 py-8 flex flex-col gap-10">
            {pairs.map((pair, i) => (
              <div key={i}>
                <p className="text-[13px] font-semibold text-[var(--text-primary)] mb-5 text-right">{pair.q}</p>
                {pair.a ? (
                  <div>
                    <div className="mb-4"><Md text={pair.a.content} /></div>

                    {pair.a.formType && <ChatForm type={pair.a.formType} onDone={ask} />}

                    {pair.a.products && pair.a.products.length > 0 && (
                      <div className="flex gap-3 overflow-x-auto pb-2 mb-4 -mx-1 px-1" style={{ scrollbarWidth: "thin" }}>
                        {pair.a.products.map((p) => <ProductCard key={p.slug} p={p} />)}
                      </div>
                    )}

                    {pair.a.quickReplies && pair.a.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {pair.a.quickReplies.map((r) => (
                          <button key={r} onClick={() => ask(r)}
                            className="text-[11px] px-3 py-1.5 border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors">
                            {r}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-1.5 items-center h-6">
                    {[0, 1, 2].map((j) => (
                      <span key={j} className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: `${j * 150}ms` }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Fixed input */}
      <div className="fixed bottom-0 inset-x-0 border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-4">
        <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="max-w-2xl mx-auto flex gap-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search products, ask about specs, enquire..."
            disabled={busy}
            autoFocus
            className="flex-1 bg-transparent border-b border-[var(--border-color)] focus:border-[var(--text-primary)] pb-2 text-[14px] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
          />
          <button type="submit" disabled={!input.trim() || busy}
            className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors pb-2 flex-shrink-0">
            Send →
          </button>
        </form>
      </div>
    </div>
  );
}
