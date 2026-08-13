import type { Metadata } from "next";
import { CATEGORIES } from "@/data/products";

export const metadata: Metadata = {
  title: "X1 Power Agricultural Machinery | All Products — Bushra Impex",
  description:
    "Browse the complete X1 Power agricultural machinery range by Bushra Impex: power weeders, chainsaws, chaff cutters, wood chippers, crop harvesters, sprayers & HTP pumps, water pumps, earth augers, lawn mowers, tea harvesters, pressure washers, rice mills. FMTTI tested. 500+ dealers across India.",
  keywords: [
    "X1 Power machines India", "agricultural machinery catalogue India",
    "power weeder price India", "chainsaw India", "chaff cutter price India",
    "wood chipper India", "crop harvester India", "agricultural sprayer India",
    "water pump India", "earth auger India", "lawn mower India",
    "tea harvester India", "pressure washer India", "rice mill India",
    "Bushra Impex products", "X1 Power catalogue",
    "petrol agricultural machines India", "diesel agricultural machines India",
    "FMTTI tested agricultural machinery", "government subsidy agri machines India",
    "farm machinery price India 2024", "best agricultural machinery brand India",
  ],
  alternates: { canonical: "https://bushraimpex.com/products" },
  openGraph: {
    title: "X1 Power Agricultural Machinery | All Products",
    description:
      "Complete X1 Power range — 12 categories, 100+ FMTTI-tested machines. Browse specs, features, accessories and get quotes.",
    url: "https://bushraimpex.com/products",
    siteName: "Bushra Impex — X1 Power",
    locale: "en_IN",
    type: "website",
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://bushraimpex.com/products#collectionpage",
    name: "X1 Power Agricultural Machinery — Full Product Range",
    description:
      "Browse all X1 Power agricultural machinery by Bushra Impex: 12 categories of FMTTI-tested, ISO 9001-certified farm equipment available across India.",
    url: "https://bushraimpex.com/products",
    publisher: { "@id": "https://bushraimpex.com/#organization" },
    hasPart: CATEGORIES.map((cat) => ({
      "@type": "CollectionPage",
      name: cat.name,
      url: `https://bushraimpex.com/products/${cat.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />
      {children}
    </>
  );
}
