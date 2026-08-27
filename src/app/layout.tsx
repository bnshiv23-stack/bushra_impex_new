import type { Metadata } from "next";
import { Inter, Sora, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import DraggableWidgets from "@/components/DraggableWidgets";
import { CompareProvider } from "@/components/CompareContext";
import CompareTray from "@/components/CompareTray";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bushraimpex.com"),
  title: {
    default: "X1 Power by Bushra Impex | Agricultural Machinery India",
    template: "%s | X1 Power — Bushra Impex",
  },
  description:
    "X1 Power is India's trusted agricultural machinery brand by Bushra Impex (est. 2012, Bengaluru). FMTTI-tested, ISO 9001:2015 certified. Products: power weeders, chainsaws, chaff cutters, wood chippers, crop harvesters, sprayers, water pumps, earth augers, lawn mowers, tea harvesters, pressure washers, rice mills. 500+ dealers across all 29 Indian states.",
  keywords: [
    // Brand & entity
    "X1 Power", "Bushra Impex", "X1 Power Bushra Impex", "X1Power India",
    // Category keywords
    "power weeder India", "power weeder price", "agricultural power weeder",
    "petrol power weeder", "diesel power weeder", "mini tiller India",
    "chainsaw India", "agricultural chainsaw", "petrol chainsaw",
    "chaff cutter India", "chaff cutter machine", "fodder cutter machine",
    "wood chipper India", "branch chipper machine",
    "crop harvester India", "paddy harvester", "wheat harvester",
    "agricultural sprayer India", "HTP pump", "knapsack sprayer",
    "water pump India", "agricultural water pump", "petrol water pump",
    "earth auger India", "post hole digger India",
    "lawn mower India", "petrol lawn mower",
    "tea harvester India", "tea leaf harvesting machine",
    "pressure washer India", "high pressure washer",
    "rice mill India", "mini rice mill",
    // GEO / entity signals
    "agricultural machinery Bengaluru", "agricultural equipment Karnataka",
    "FMTTI tested power weeder", "ISO 9001 agricultural machinery India",
    "government subsidy agricultural machinery India",
    "farm machinery dealer India", "X1 Power dealer",
    "agricultural machinery manufacturer India", "agri equipment wholesaler",
    // AEO long-tail
    "best power weeder for paddy field India",
    "power weeder vs tractor India",
    "how to choose a power weeder",
    "X1 Power 750 PTO specifications",
    "what is a chaff cutter machine",
    "earth auger for fence posts India",
  ],
  authors: [{ name: "Bushra Impex", url: "https://bushraimpex.com" }],
  creator: "Bushra Impex",
  publisher: "Bushra Impex",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://bushraimpex.com",
  },
  openGraph: {
    title: "X1 Power by Bushra Impex | Agricultural Machinery India",
    description:
      "FMTTI-tested, ISO 9001 certified agricultural machinery. Power weeders, chainsaws, sprayers, harvesters & more. 500+ dealers across India.",
    url: "https://bushraimpex.com",
    siteName: "Bushra Impex — X1 Power",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://bushraimpex.com/images/bushraimpex-new%20logo.png",
        width: 1200,
        height: 630,
        alt: "X1 Power Agricultural Machinery by Bushra Impex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "X1 Power by Bushra Impex | Agricultural Machinery India",
    description:
      "FMTTI-tested, ISO 9001 certified agricultural machinery. 500+ dealers across India.",
    images: ["https://bushraimpex.com/images/bushraimpex-new%20logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-main.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

// ─── Global JSON-LD schemas ─────────────────────────────────────
// Organization + WebSite with SearchAction + Brand
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://bushraimpex.com/#organization",
  name: "Bushra Impex",
  alternateName: ["X1 Power", "X1Power", "Bushra Impex X1 Power"],
  url: "https://bushraimpex.com",
  logo: {
    "@type": "ImageObject",
    url: "https://bushraimpex.com/images/bushraimpex-new%20logo.png",
    width: 400,
    height: 400,
  },
  description:
    "Bushra Impex, established in 2012 in Bengaluru, Karnataka, is an Indian manufacturer and distributor of X1 Power agricultural machinery including power weeders, chainsaws, chaff cutters, wood chippers, crop harvesters, sprayers, water pumps, earth augers, lawn mowers, tea harvesters, pressure washers, and rice mills. Products are FMTTI tested and ISO 9001:2015 certified. The company operates 500+ authorised dealers across all 29 Indian states.",
  foundingDate: "2012",
  foundingLocation: {
    "@type": "Place",
    name: "Bengaluru, Karnataka, India",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-76248-69606",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "kn"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-76248-69606",
      contactType: "sales",
      areaServed: "IN",
    },
  ],
  sameAs: [
    "https://www.facebook.com/bushraimpexx1power",
    "https://www.instagram.com/bushraimpexx1power",
    "https://www.youtube.com/@bushraimpexx1power",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "X1 Power Agricultural Machinery Catalogue",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Power Weeders" },
      { "@type": "OfferCatalog", name: "Chainsaws" },
      { "@type": "OfferCatalog", name: "Chaff Cutters" },
      { "@type": "OfferCatalog", name: "Wood Chippers" },
      { "@type": "OfferCatalog", name: "Crop Harvesters" },
      { "@type": "OfferCatalog", name: "Sprayers & HTP Pumps" },
      { "@type": "OfferCatalog", name: "Water Pumps" },
      { "@type": "OfferCatalog", name: "Earth Augers" },
      { "@type": "OfferCatalog", name: "Lawn Mowers" },
      { "@type": "OfferCatalog", name: "Tea Harvesters" },
      { "@type": "OfferCatalog", name: "Pressure Washers" },
      { "@type": "OfferCatalog", name: "Rice Mills" },
    ],
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://bushraimpex.com/#website",
  url: "https://bushraimpex.com",
  name: "Bushra Impex — X1 Power Agricultural Machinery",
  description:
    "Official website of X1 Power by Bushra Impex. Browse agricultural machinery, download brochures, find dealers, and get quotes.",
  publisher: { "@id": "https://bushraimpex.com/#organization" },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://bushraimpex.com/products?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const brandSchema = {
  "@context": "https://schema.org",
  "@type": "Brand",
  "@id": "https://bushraimpex.com/#brand",
  name: "X1 Power",
  description:
    "X1 Power is a proprietary agricultural machinery brand by Bushra Impex, launched in 2016. Products are FMTTI tested, ISO 9001:2015 certified, and eligible for government agricultural subsidies in India.",
  url: "https://bushraimpex.com",
  logo: "https://bushraimpex.com/images/bushraimpex-new%20logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${bebasNeue.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[#D71920] selection:text-white transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Global JSON-LD: Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          {/* Global JSON-LD: WebSite with SearchAction */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
          />
          {/* Global JSON-LD: Brand */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
          />
          <CompareProvider>
            {children}
            <DraggableWidgets />
            <CompareTray />
          </CompareProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

