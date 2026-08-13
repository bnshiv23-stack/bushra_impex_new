import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileViewer from "./ProfileViewer";

export const metadata: Metadata = {
  title: "Company Profile & Overview | Bushra Impex — X1 Power",
  description:
    "Official Bushra Impex corporate overview and company profile presentation. Est. 2012, Bengaluru. Discover our journey, manufacturing vision, FMTTI certifications, and 500+ dealer network.",
  keywords: [
    "Bushra Impex company profile", "X1 Power presentation", "Bushra Impex overview",
    "agricultural machinery manufacturer profile", "FMTTI certified company India",
  ],
  alternates: { canonical: "https://bushraimpex.com/company-overview" },
  openGraph: {
    title: "Company Profile & Overview | Bushra Impex",
    description: "Official corporate overview and company presentation of Bushra Impex (X1 Power).",
    url: "https://bushraimpex.com/company-overview",
    siteName: "Bushra Impex — X1 Power",
    locale: "en_IN",
    type: "website",
  },
};

export default function CompanyOverviewPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[var(--bg-primary)]">
        <ProfileViewer />
      </main>
      <Footer />
    </>
  );
}
