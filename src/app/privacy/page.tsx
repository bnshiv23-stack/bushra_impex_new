import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy – Bushra Impex",
  description: "Privacy policy for Bushra Impex and X1 Power brand products and website.",
};

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly to us when you fill in our contact or dealer application forms. This includes your name, phone number, email address, city, state, and any message or business details you choose to share. We do not collect payment information directly — all transactions are handled offline.",
  },
  {
    title: "How We Use Your Information",
    body: "The information you provide is used solely to respond to your enquiries, process dealer applications, and provide product support. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
  },
  {
    title: "WhatsApp & Phone Communication",
    body: "If you contact us via WhatsApp or phone, the conversation is handled directly by our team and is not stored in automated systems. We retain conversation records only for the duration required to resolve your query.",
  },
  {
    title: "Cookies",
    body: "Our website uses minimal cookies required for basic functionality. We do not use advertising or tracking cookies. You may disable cookies in your browser settings without affecting your ability to browse our product catalogue.",
  },
  {
    title: "Data Security",
    body: "We take reasonable technical and organisational measures to protect your personal data against accidental loss, misuse, or unauthorised access. Our website is served over HTTPS.",
  },
  {
    title: "Your Rights",
    body: "You have the right to request access to, correction of, or deletion of your personal data held by us. To make such a request, please contact us at bushrapowertools@gmail.com or call +91 76248 69606.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this privacy policy from time to time. Material changes will be communicated via a notice on our website. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.",
  },
  {
    title: "Contact Us",
    body: "For any privacy-related queries, contact: Bushra Impex, Kalasipalya New Extension, Bengaluru – 560002, Karnataka. Email: bushrapowertools@gmail.com | Phone: +91 76248 69606.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <section className="pt-16 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <div className="container-site px-[80px] py-12">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[#D71920] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#D71920]">Privacy Policy</span>
          </div>
          <h1 className="font-bebas text-[60px] text-[var(--text-primary)] leading-none tracking-tight">Privacy Policy</h1>
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
