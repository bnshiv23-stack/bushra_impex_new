"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { respond } from "@/lib/chatbot-engine";
import type { ChatMessage } from "@/lib/chatbot-engine";
import { PRODUCTS, Product } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

// ─── Markdown: bold + tables ────────────────────────────────────────────────
function Md({ text }: { text: string }) {
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("|") && lines[i + 1]?.match(/^\|[\s\-|]+\|/)) {
      const headers = line.split("|").filter((c) => c.trim()).map((c) => c.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(lines[i].split("|").filter((c) => c.trim()).map((c) => c.trim()));
        i++;
      }
      out.push(
        <div key={i} className="overflow-x-auto my-2 rounded-lg border border-white/10">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {headers.map((h, j) => (
                  <th key={j} className="px-3 py-1.5 text-left font-medium text-white/70 uppercase tracking-wide text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-white/5 last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-1.5 text-white/80">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (!line.trim()) { out.push(<div key={i} className="h-1.5" />); i++; continue; }

    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith("**") && p.endsWith("**")
        ? <strong key={j} className="text-white font-semibold">{p.slice(2, -2)}</strong>
        : <span key={j}>{p}</span>
    );
    out.push(<p key={i} className="text-[13px] leading-relaxed text-white/80">{parts}</p>);
    i++;
  }
  return <>{out}</>;
}

// ─── Product Card inside Chat ───────────────────────────────────────────────
function ProductCard({ p }: { p: Product }) {
  return (
    <div className="flex-shrink-0 w-44 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors overflow-hidden group">
      {p.image && (
        <div className="relative h-24 bg-black/30">
          <Image src={p.image} alt={p.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-300" sizes="176px" />
        </div>
      )}
      <div className="p-2.5">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-red-400 mb-0.5">{p.categoryName}</p>
        <p className="text-[11px] font-bold text-white leading-snug mb-2">{p.name}</p>
        {Object.entries(p.specs).slice(0, 2).map(([k, v]) => (
          <p key={k} className="text-[10px] text-white/50 mb-0.5">{k}: <span className="text-white/70">{v}</span></p>
        ))}
        <div className="mt-2 space-y-1">
          <Link
            href={`/products/${p.category}/${p.slug}`}
            className="block text-center text-[10px] font-semibold py-1 rounded bg-[#D71920] hover:bg-red-700 text-white transition-colors"
          >
            View Product
          </Link>
          <a
            href={`/products/${p.category}/${p.slug}?print=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-[10px] font-semibold py-1 rounded border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors"
          >
            Brochure (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Input field shared style ───────────────────────────────────────────────
const fieldCls = "w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-[12px] text-white placeholder-white/35 focus:outline-none focus:border-white/40 transition-colors";

// ─── Forms ──────────────────────────────────────────────────────────────────
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
    else if (type === "dealer") body = `*Dealer Application*\nBusiness: ${d.bizName}\nLocation: ${d.location}\nExperience: ${d.exp} yrs\nContact: ${d.name} — ${d.phone}`;
    if (body) window.open(`https://wa.me/917624869606?text=${encodeURIComponent(body)}`, "_blank");
    setDone(true);
    onDone("Submitted! Our team will reach out shortly via WhatsApp.");
  };

  if (type === "catalogue") {
    return (
      <div className="mt-2 space-y-2 bg-white/5 rounded-xl border border-white/10 p-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-red-400">Official Downloads</p>
        
        {/* Master PDF */}
        <a
          href="https://drive.google.com/file/d/1vahURP1XZpRr-ZApCTdhdKmEkAaaHWAN/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[12px] text-white hover:bg-red-500/20 transition-colors"
        >
          <span className="font-semibold">Master X1 Power Catalogue</span>
          <span className="text-white/60 text-[10px] font-bold">PDF ↓</span>
        </a>

        {/* Company Profile */}
        <Link
          href="/company-overview"
          className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-[12px] text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <span>Bushra Impex Company Profile</span>
          <span className="text-white/40 text-[10px]">View & Download →</span>
        </Link>

        {/* Category Specific Brochures */}
        <div className="pt-2 border-t border-white/10 space-y-1">
          <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Category Brochures & Specs:</p>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => onDone("Power Weeders")}
              className="text-left text-[11px] px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
            >
              🌾 Power Weeders
            </button>
            <button
              onClick={() => onDone("Chainsaws")}
              className="text-left text-[11px] px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
            >
              🪵 Chainsaws
            </button>
            <button
              onClick={() => onDone("Crop Harvesters")}
              className="text-left text-[11px] px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
            >
              🌾 Crop Harvesters
            </button>
            <button
              onClick={() => onDone("Power Sprayers")}
              className="text-left text-[11px] px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
            >
              💧 Power Sprayers
            </button>
            <button
              onClick={() => onDone("Earth Augers")}
              className="text-left text-[11px] px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
            >
              🔩 Earth Augers
            </button>
            <button
              onClick={() => onDone("2-Stroke vs 4-Stroke")}
              className="text-left text-[11px] px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
            >
              ⚙️ 2-Stroke vs 4-Stroke Guide
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (done) return (
    <p className="mt-2 text-[12px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
      Submitted — our team will contact you on WhatsApp shortly.
    </p>
  );

  return (
    <form onSubmit={submit} className="mt-2 space-y-2 bg-white/5 rounded-xl border border-white/10 p-3">
      {type === "callback" && (
        <p className="text-[11px] text-white/50 mb-1 italic">Would you like an X1 representative to call you?</p>
      )}
      {type === "dealer" && (
        <>
          <input value={d.bizName} onChange={set("bizName")} placeholder="Business / Shop Name *" required className={fieldCls} />
          <input value={d.location} onChange={set("location")} placeholder="City & State *" required className={fieldCls} />
          <input value={d.exp} onChange={set("exp")} placeholder="Years in agribusiness" className={fieldCls} />
        </>
      )}
      <input value={d.name} onChange={set("name")} placeholder="Your name *" required className={fieldCls} />
      <input type="tel" value={d.phone} onChange={set("phone")} placeholder="Mobile number *" required className={fieldCls} />
      {type === "enquiry" && (
        <>
          <input value={d.state} onChange={set("state")} placeholder="State / District *" required className={fieldCls} />
          <input value={d.product} onChange={set("product")} placeholder="Product interested in" className={fieldCls} />
          <input type="number" value={d.qty} onChange={set("qty")} placeholder="Quantity" min="1" className={fieldCls} />
          <textarea value={d.message} onChange={set("message")} placeholder="Message (optional)" rows={2} className={`${fieldCls} resize-none`} />
        </>
      )}
      {type === "callback" && (
        <select value={d.slot} onChange={set("slot")} className={fieldCls}>
          {["Anytime", "Morning (9–12 AM)", "Afternoon (12–4 PM)", "Evening (4–7 PM)"].map((s) => (
            <option key={s} value={s} className="bg-[#0f172a]">{s}</option>
          ))}
        </select>
      )}
      <button type="submit" className="w-full py-2 rounded-lg bg-[#D71920] hover:bg-red-700 text-white text-[12px] font-semibold transition-colors mt-1">
        {type === "enquiry" && "Submit Enquiry"}
        {type === "callback" && "Request Callback"}
        {type === "dealer" && "Submit Application"}
      </button>
    </form>
  );
}

// ─── Message Bubble ─────────────────────────────────────────────────────────
function Bubble({ msg, onAction }: { msg: ChatMessage; onAction: (t: string) => void }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-[#D71920] flex items-center justify-center flex-shrink-0 text-[9px] font-black text-white mt-0.5">
          X1
        </div>
      )}
      <div className={`max-w-[87%] flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}>
        <div className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
          isUser
            ? "bg-[#D71920] text-white rounded-tr-sm"
            : "bg-white/8 text-white/85 rounded-tl-sm border border-white/10"
        }`}>
          {isUser ? msg.content : <Md text={msg.content} />}
        </div>

        {msg.formType && <ChatForm type={msg.formType} onDone={onAction} />}

        {msg.products && msg.products.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "thin", maxWidth: 320 }}>
            {msg.products.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        )}

        {msg.quickReplies && msg.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {msg.quickReplies.map((r) => (
              <button key={r} onClick={() => onAction(r)}
                className="text-[11px] px-3 py-1.5 rounded-full border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-colors">
                {r}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Typing Indicator ───────────────────────────────────────────────────────
function Typing() {
  return (
    <div className="flex gap-2.5">
      <div className="w-6 h-6 rounded-full bg-[#D71920] flex items-center justify-center flex-shrink-0 text-[9px] font-black text-white">X1</div>
      <div className="flex gap-1 items-center h-9 px-3.5 bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
        ))}
      </div>
    </div>
  );
}

// ─── Welcome message ────────────────────────────────────────────────────────
const WELCOME: ChatMessage = {
  role: "assistant",
  content: "Welcome to Bushra Impex / X1 Power. How can I help you today?",
  quickReplies: [
    "View Products", "Catalogue Downloads", "2-Stroke vs 4-Stroke", "Paddy Weeders",
    "Become a Dealer", "Request a Callback", "Submit Enquiry",
  ],
};

// ─── Quick nav pills ────────────────────────────────────────────────────────
const QUICK_PILLS = ["Catalogue", "Enquiry", "Callback", "Dealer", "Quit"];
const PILL_MAP: Record<string, string> = {
  Catalogue: "Catalogue Downloads",
  Enquiry: "Submit Enquiry",
  Callback: "Request a Callback",
  Dealer: "Become a Dealer",
  Quit: "QUIT_ACTION",
};

// ─── Main Component ─────────────────────────────────────────────────────────
export default function DraggableWidgets() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [msgs, setMsgs] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 150); }, [open]);

  const send = useCallback((text: string) => {
    if (text === "QUIT_ACTION") {
      setOpen(false);
      return;
    }
    if (!text.trim()) return;
    setMsgs((p) => [...p, { role: "user", content: text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((p) => [...p, respond(text)]);
      setTyping(false);
    }, 400);
  }, []);

  return (
    <>
      {/* ── Collapsed Minimal Button ── */}
      {collapsed && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={() => setCollapsed(false)}
          className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 bg-[var(--bg-primary)]/90 backdrop-blur-md border border-[var(--border-color)] px-3.5 py-2.5 rounded-full shadow-2xl hover:border-[#D71920] group transition-all"
          title="Open Quick Contact & Chat"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">Help & Contact</span>
          <div className="w-5 h-5 rounded-full bg-[#D71920] text-white flex items-center justify-center text-[10px] font-bold">
            💬
          </div>
        </motion.button>
      )}

      {/* ── Expanded Launcher Strip ── */}
      {!collapsed && (
        <motion.div drag dragMomentum={false}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2.5 items-center bg-[var(--bg-primary)]/80 backdrop-blur-md border border-[var(--border-color)] p-2 rounded-2xl shadow-xl cursor-grab active:cursor-grabbing">
          {/* Top Collapse / Close Action Bar */}
          <div className="flex items-center justify-between w-full px-1">
            <div className="w-3 h-0.5 rounded-full bg-white/30" />
            <button
              onClick={(e) => { e.stopPropagation(); setCollapsed(true); }}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-[var(--text-muted)] hover:text-white hover:bg-white/15 transition-colors"
              title="Minimize / Hide Quick Buttons"
            >
              ✕
            </button>
          </div>

          {/* WhatsApp */}
          <a href="https://wa.me/917624869606" target="_blank" rel="noopener noreferrer"
            draggable={false} onPointerDown={(e) => e.stopPropagation()}
            className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform pointer-events-auto shadow-md"
            title="WhatsApp">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>

          {/* Call */}
          <a href="tel:+917624869606" draggable={false} onPointerDown={(e) => e.stopPropagation()}
            className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform pointer-events-auto shadow-md"
            title="Call Us">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
            </svg>
          </a>

          {/* Chat toggle */}
          <button onClick={() => setOpen((o) => !o)} onPointerDown={(e) => e.stopPropagation()}
            className="w-12 h-12 rounded-xl bg-[#D71920] hover:bg-red-700 flex items-center justify-center transition-colors relative pointer-events-auto shadow-md"
            style={{ boxShadow: "0 0 0 3px rgba(215,25,32,0.2)" }}
            aria-label="Open assistant">
            {open ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            )}
            {!open && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black/40" />}
          </button>
        </motion.div>
      )}

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[5.5rem] right-4 sm:right-6 z-[1000] w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[560px] max-h-[82vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #0f172a 0%, #030712 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 flex-shrink-0 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D71920] flex items-center justify-center text-[10px] font-black text-white">X1</div>
                <div>
                  <p className="text-[13px] font-semibold text-white leading-none">X1 Power Assistant</p>
                  <p className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMsgs([WELCOME])}
                  className="px-2 py-1 text-[10px] rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  title="Clear conversation"
                >
                  Clear
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-red-600/80 text-white font-bold transition-colors text-[11px] flex items-center gap-1"
                  aria-label="Quit & Close">
                  <span>Quit</span>
                  <span>✕</span>
                </button>
              </div>
            </div>

            {/* Quick pills */}
            <div className="flex gap-1.5 px-3 py-2 border-b border-white/5 overflow-x-auto flex-shrink-0 bg-black/20" style={{ scrollbarWidth: "none" }}>
              {QUICK_PILLS.map((p) => (
                <button key={p} onClick={() => send(PILL_MAP[p])}
                  className={`whitespace-nowrap text-[10px] font-medium px-2.5 py-1 rounded-full border transition-colors flex-shrink-0 ${
                    p === "Quit"
                      ? "border-red-500/30 text-red-400 hover:bg-red-500/20"
                      : "border-white/12 text-white/70 hover:border-white/25 hover:text-white"
                  }`}>
                  {p}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3.5 py-4 flex flex-col gap-4" style={{ scrollbarWidth: "thin" }}>
              {msgs.map((m, i) => <Bubble key={i} msg={m} onAction={send} />)}
              {typing && <Typing />}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex gap-2 px-3 py-3 border-t border-white/8 flex-shrink-0 bg-black/40">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about 2-stroke/4-stroke, machines, catalogues..."
                className="flex-1 bg-white/6 border border-white/12 rounded-xl px-3.5 py-2 text-[13px] text-white placeholder-white/35 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button type="submit" disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-[#D71920] hover:bg-red-700 disabled:opacity-30 flex items-center justify-center transition-colors flex-shrink-0">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


