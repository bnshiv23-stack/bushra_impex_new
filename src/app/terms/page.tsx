import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service – Bushra Impex",
  description: "Terms and conditions for use of Bushra Impex website and X1 Power products.",
};

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: "By accessing and using the Bushra Impex website (bushraimpex.com), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this website.",
  },
  {
    title: "Product Information",
    body: "All product specifications, images, and descriptions on this website are provided for informational purposes. While we strive for accuracy, specifications may vary due to manufacturing updates. Please confirm specifications with your authorised dealer before purchase.",
  },
  {
    title: "Dealer & Enquiry Forms",
    body: "Submissions made via our contact or dealer application forms are non-binding enquiries. A formal business relationship with Bushra Impex as an authorised dealer requires a separate signed dealer agreement.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this website — including the Bushra Impex logo, X1 Power brand mark, product images, text, and design — is the intellectual property of Bushra Impex. Unauthorised reproduction or commercial use is prohibited.",
  },
  {
    title: "Warranty Terms",
    body: "Product warranty terms are governed by the warranty certificate provided at point of sale and the X1 Power warranty policy. Website content does not constitute a warranty agreement. Warranty claims must be processed through authorised dealers.",
  },
  {
    title: "Limitation of Liability",
    body: "Bushra Impex shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from the use or inability to use this website, or from reliance on information presented herein.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.",
  },
  {
    title: "Contact",
    body: "For questions regarding these terms, contact us at: bushrapowertools@gmail.com | +91 76248 69606 | Bengaluru – 560002, Karnataka, India.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <section className="pt-16 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <div className="container-site px-[80px] py-12">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[#D71920] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#D71920]">Terms of Service</span>
          </div>
          <h1 className="font-bebas text-[60px] text-[var(--text-primary)] leading-none tracking-tight">Terms of Service</h1>
          <p className="text-[12px] text-[var(--text-muted)] mt-3">Last updated: July 2025</p>
        </div>
      </section>

      <section className="bg-[var(--bg-primary)] py-14">
        <div className="container-site px-[80px]">
          <div className="max-w-3xl flex flex-col gap-0">
            {SECTIONS.map((s, i) => (
              <div key={i} className="grid grid-cols-[1px_1fr] gap-8 pb-10">
                <div className="flex flex-col items-center">
                  <div className="w-px bg-[#D71920] flex-1" />
                  <div className="w-2 h-2 bg-[#D71920] shrink-0 my-1" />
                  <div className="w-px bg-[var(--border-color)] flex-1" />
                </div>
                <div className="flex flex-col gap-2 pt-1 pb-2">
                  <h2 className="font-bebas text-[22px] text-[var(--text-primary)] tracking-tight">{s.title}</h2>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
