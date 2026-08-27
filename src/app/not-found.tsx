import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { homedir } from "os";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="pt-16 min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center">
        <div className="container-site flex flex-col items-center text-center gap-8 py-24">
          {/* Giant 404 */}
          <div className="relative">
            <span className="font-bebas text-[200px] md:text-[280px] text-[#F0F0F0] leading-none select-none">404</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-0.5 bg-[#D71920]" />
                <span className="font-bebas text-[24px] text-[var(--text-primary)] tracking-widest">Page Not Found</span>
              </div>
            </div>
          </div>

          <p className="text-[13px] text-[#777] max-w-[400px] leading-relaxed">
            The page you are looking for doesn't exist or has been moved. Let us point you in the right direction.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/" className="btn-primary">
              Go Home <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/products" className="btn-outline">
              Browse Products
            </Link>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {[
              { label: "Power Weeders", href: "/products?category=weeders" },
              { label: "Chainsaws", href: "/products?category=chainsaws" },
              { label: "Chaff Cutters", href: "/products?category=chaff-cutters" },
              { label: "Dealer Network", href: "/dealer" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 border border-[var(--border-color)] text-[10px] font-bold uppercase tracking-widest text-[#777] hover:border-[#D71920] hover:text-[#D71920] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}