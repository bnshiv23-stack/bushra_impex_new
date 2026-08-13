"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR skeleton — matches final size so no layout shift
    return (
      <div className="w-14 h-7 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-14 h-7 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 transition-colors duration-300 overflow-hidden shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-slate-900"
        initial={false}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Icons always visible */}
      <div className="relative z-10 flex items-center justify-between w-full px-2 pointer-events-none">
        <Moon
          className="w-3.5 h-3.5 transition-colors duration-300"
          style={{ color: isDark ? "#93c5fd" : "#94a3b8" }}
        />
        <Sun
          className="w-3.5 h-3.5 transition-colors duration-300"
          style={{ color: isDark ? "#94a3b8" : "#f59e0b" }}
        />
      </div>

      {/* Sliding knob */}
      <motion.div
        className="absolute top-1 w-5 h-5 rounded-full shadow-md z-20"
        style={{ background: isDark ? "#1e40af" : "#fff" }}
        initial={false}
        animate={{ x: isDark ? 30 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
