import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become an X1 Power Dealer | Agricultural Machinery Distributor India",
  description:
    "Join the X1 Power dealer network by Bushra Impex. 500+ authorised dealers across all 29 Indian states. FMTTI-tested agricultural machinery, government subsidy approved. Apply to become a dealer today.",
  keywords: [
    "X1 Power dealer India", "Bushra Impex dealer", "agricultural machinery dealer India",
    "power weeder dealer India", "agri equipment dealer", "become X1 Power distributor",
    "government subsidy agricultural machinery dealer", "FMTTI approved machine dealer",
    "agricultural machinery franchise India", "agri dealer Karnataka",
    "X1 Power dealer network", "farming equipment dealer India",
  ],
  alternates: { canonical: "https://bushraimpex.com/dealer" },
  openGraph: {
    title: "Become an X1 Power Dealer | Bushra Impex Dealer Network",
    description:
      "Join 500+ X1 Power dealers across India. Premium agricultural machinery, government subsidy support, marketing materials, and technical training provided.",
    url: "https://bushraimpex.com/dealer",
    siteName: "Bushra Impex — X1 Power",
    locale: "en_IN",
    type: "website",
  },
};

export default function DealerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
