"use client";
import { useCompare } from "./CompareContext";
import { useRouter, usePathname } from "next/navigation";
import { X, GitCompareArrows, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CompareTray() {
  const { items, remove, clear } = useCompare();
  const router = useRouter();
  const pathname = usePathname();

  if (items.length === 0 || pathname === "/compare") return null;

  const canCompare = items.length >= 2;

  return (
    <AnimatePresence>
      <motion.div
        key="compare-tray"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        className="fixed bottom-0 left-0 right-0 z-[99] bg-[var(--bg-primary)] border-t-2 border-[#D71920] shadow-[0_-8px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_-8px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="container-site py-3 flex flex-col sm:flex-row items-center gap-3">
          {/* Label */}
          <div className="flex items-center gap-2 shrink-0">
            <GitCompareArrows className="w-4 h-4 text-[#D71920]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)]">
              Compare ({items.length}/3)
            </span>
          </div>

          {/* Product chips */}
          <div className="flex flex-1 flex-wrap gap-2 justify-center">
            {items.map((p) => (
              <div
                key={p.slug}
                className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-sm"
              >
                {p.image && (
                  <img src={p.image} alt={p.name} className="w-7 h-7 object-contain" />
                )}
                <span className="text-[11px] font-bold text-[var(--text-primary)] max-w-[120px] truncate">{p.name}</span>
                <button
                  onClick={() => remove(p.slug)}
                  className="text-[var(--text-muted)] hover:text-[#D71920] transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 3 - items.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="flex items-center gap-2 px-3 py-1.5 border border-dashed border-[var(--border-color)] rounded-sm opacity-40"
              >
                <span className="text-[11px] font-bold text-[var(--text-muted)]">+ Add product</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clear}
              className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[#D71920] transition-colors border border-[var(--border-color)] hover:border-[#D71920]"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
            <button
              disabled={!canCompare}
              onClick={() => {
                const slugs = items.map((p) => p.slug).join(",");
                router.push(`/compare?p=${slugs}`);
              }}
              className={`flex items-center gap-1.5 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all ${
                canCompare
                  ? "bg-[#D71920] hover:bg-[#b71420] cursor-pointer"
                  : "bg-[var(--text-muted)] cursor-not-allowed opacity-50"
              }`}
            >
              <GitCompareArrows className="w-3.5 h-3.5" />
              Compare Now
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}