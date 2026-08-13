import { Suspense } from "react";
import { PRODUCTS, CATEGORIES, getProductBySlug, getOptimizedProductTitle } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

// Required for static export / SSG
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const catName = CATEGORIES.find((c) => c.slug === product.category)?.name ?? product.categoryName;
  const canonicalUrl = `https://bushraimpex.com/products/${product.category}/${product.slug}`;

  // Build category-specific keyword variants
  const categoryKeywords: Record<string, string[]> = {
    weeders: ["power weeder India", "petrol weeder", "mini tiller India", "agricultural tiller", "paddy weeder", "weeder machine price India"],
    chainsaws: ["chainsaw India", "petrol chainsaw", "agricultural chainsaw", "tree cutting machine"],
    "chaff-cutters": ["chaff cutter machine", "fodder cutter India", "cattle feed machine", "chaff cutter price"],
    "wood-chippers": ["wood chipper India", "branch chipper", "garden chipper machine"],
    harvesters: ["crop harvester India", "paddy harvester", "wheat harvester", "reaper machine India"],
    sprayers: ["agricultural sprayer India", "HTP pump", "power sprayer", "knapsack sprayer India"],
    "water-pumps": ["water pump India", "agricultural water pump", "petrol water pump", "centrifugal pump"],
    "earth-augers": ["earth auger India", "post hole digger", "fence post driller India"],
    "lawn-mowers": ["lawn mower India", "petrol lawn mower", "grass cutting machine India"],
    "tea-harvesters": ["tea harvester India", "tea leaf picking machine", "tea garden machine"],
    "pressure-washers": ["pressure washer India", "high pressure cleaner", "jet washer India"],
    "rice-mills": ["rice mill India", "mini rice mill", "paddy husker machine"],
  };

  const catKws = categoryKeywords[product.category] ?? [];
  const optimized = getOptimizedProductTitle(product.name, product.modelCode, product.category);

  return {
    title: optimized.metaTitle,
    description: `${product.name} (Model: ${product.modelCode}) — ${product.description} FMTTI-tested X1 Power ${catName.toLowerCase()} by Bushra Impex. Specs: ${Object.entries(product.specs).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(", ")}.`,
    keywords: [
      product.name,
      product.modelCode,
      `X1 Power ${product.name}`,
      `Bushra Impex ${product.name}`,
      `${product.modelCode} specifications`,
      `${product.modelCode} price India`,
      `${product.name} ${product.fuelType.toLowerCase()}`,
      catName,
      "X1 Power", "Bushra Impex",
      ...catKws,
      ...product.features.map((f) => f.toLowerCase()),
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${product.name} (${product.modelCode}) | X1 Power`,
      description: `${product.description} Available from X1 Power by Bushra Impex — FMTTI tested, ISO 9001 certified.`,
      url: canonicalUrl,
      siteName: "Bushra Impex — X1 Power",
      locale: "en_IN",
      type: "website",
      images: product.image
        ? [
            {
              url: `https://bushraimpex.com${product.image}`,
              alt: `X1 Power ${product.name} — ${catName} by Bushra Impex`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | X1 Power by Bushra Impex`,
      description: product.description,
      images: product.image ? [`https://bushraimpex.com${product.image}`] : [],
    },
  };
}

// ─── Generate product-specific FAQ Q&A from verified data ──────
function buildFaqItems(product: ReturnType<typeof getProductBySlug>) {
  if (!product) return [];

  const catName = CATEGORIES.find((c) => c.slug === product.category)?.name ?? product.categoryName;
  const fuelLabel = product.fuelType === "Petrol/2T" ? "a petrol 2-stroke" : `a ${product.fuelType.toLowerCase()}`;

  const faqs: { q: string; a: string }[] = [
    {
      q: `What is the ${product.name}?`,
      a: `The ${product.name} (Model: ${product.modelCode}) is ${fuelLabel} ${catName.toLowerCase()} manufactured under the X1 Power brand by Bushra Impex. It is designed for agricultural and commercial use in Indian farm conditions.`,
    },
    {
      q: `What are the key specifications of the ${product.modelCode}?`,
      a: Object.entries(product.specs)
        .map(([k, v]) => `${k}: ${v}`)
        .join(". ") + ". All specifications are sourced from the official X1 Power product catalogue.",
    },
    {
      q: `What are the main features of the ${product.name}?`,
      a: `Key features of the ${product.name} include: ${product.features.join(", ")}.`,
    },
  ];

  // Add accessories FAQ if present
  if (product.accessories.length > 0) {
    faqs.push({
      q: `What accessories are available for the ${product.modelCode}?`,
      a: `The ${product.modelCode} is compatible with the following accessories as listed in the official catalogue: ${product.accessories.join(", ")}.`,
    });
  }

  // Category-specific Q&A
  const catFaqs: Record<string, { q: string; a: string }[]> = {
    weeders: [
      {
        q: `Is the ${product.modelCode} suitable for paddy field weeding?`,
        a: `Yes. The ${product.modelCode} power weeder is designed for inter-row weeding in wet and dry paddy cultivation, soil aeration, and bed preparation. Its ${product.specs["Tilling Width"] ?? "adjustable tilling width"} makes it suitable for standard paddy row spacing.`,
      },
      {
        q: `Is the ${product.modelCode} power weeder eligible for government subsidy in India?`,
        a: `X1 Power machines including the ${product.modelCode} are FMTTI tested and registered with multiple state agriculture departments in India for applicable government subsidy programs. Buyers should verify current subsidy eligibility with their state agriculture department.`,
      },
    ],
    chainsaws: [
      {
        q: `What is the recommended use of the ${product.modelCode} chainsaw?`,
        a: `The ${product.modelCode} is designed for tree felling, branch trimming, timber cutting, and land clearing operations. It is suitable for agricultural, forestry, and plantation use.`,
      },
    ],
    "chaff-cutters": [
      {
        q: `What type of fodder can the ${product.modelCode} chaff cutter process?`,
        a: `The ${product.modelCode} chaff cutter is used to chop paddy straw, wheat straw, green fodder, and silage material for cattle, goat, and sheep feeding.`,
      },
    ],
    harvesters: [
      {
        q: `Which crops can be harvested using the ${product.modelCode}?`,
        a: `The ${product.modelCode} is suitable for harvesting paddy, wheat, and grass, as well as weed management in uncultivated land. Tea garden variants are designed for tea pruning and skiffing.`,
      },
    ],
    sprayers: [
      {
        q: `What is the spray reach of the ${product.modelCode}?`,
        a: `Spray reach and pressure specifications for the ${product.modelCode} are listed in the technical specifications section. X1 Power sprayers are used for pesticide, fungicide, fertilizer, and herbicide application on field crops, orchards, and plantations.`,
      },
    ],
  };

  const extraFaqs = catFaqs[product.category] ?? [];

  faqs.push({
    q: `Where can I buy the ${product.name} in India?`,
    a: `The ${product.name} is available through the authorised X1 Power dealer network operated by Bushra Impex, which spans 500+ dealers across all 29 Indian states. Contact Bushra Impex at +91-76248-69606 or visit bushraimpex.com to find your nearest dealer.`,
  });

  faqs.push({
    q: `Is the ${product.name} covered by a warranty?`,
    a: `Please contact our office for more details on how warranty and guarantees work.`,
  });

  return [...faqs, ...extraFaqs];
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product = getProductBySlug(slug);
  const catName = product
    ? (CATEGORIES.find((c) => c.slug === product.category)?.name ?? product.categoryName)
    : "";
  const canonicalUrl = product
    ? `https://bushraimpex.com/products/${product.category}/${product.slug}`
    : "";

  const optimized = product ? getOptimizedProductTitle(product.name, product.modelCode, product.category) : null;

  // ─── Product JSON-LD ────────────────────────────────────────
  const productSchema = product && optimized
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        name: optimized.h1Title,
        alternateName: optimized.modelSub,
        image: product.images
          ? product.images.map((img) => `https://bushraimpex.com${img}`)
          : product.image
          ? [`https://bushraimpex.com${product.image}`]
          : [],
        description: `${product.description} Model: ${product.modelCode}. Category: ${catName}. Fuel type: ${product.fuelType}. Key features: ${product.features.join(", ")}.`,
        sku: product.modelCode,
        mpn: product.modelCode,
        brand: {
          "@type": "Brand",
          "@id": "https://bushraimpex.com/#brand",
          name: "X1 Power",
        },
        manufacturer: {
          "@type": "Organization",
          "@id": "https://bushraimpex.com/#organization",
          name: "Bushra Impex",
        },
        category: catName,
        additionalProperty: Object.entries(product.specs).map(([name, value]) => ({
          "@type": "PropertyValue",
          name,
          value,
        })),
        url: canonicalUrl,
        isRelatedTo: {
          "@type": "Brand",
          name: "X1 Power",
        },
      }
    : null;

  // ─── BreadcrumbList JSON-LD ─────────────────────────────────
  const breadcrumbSchema = product
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://bushraimpex.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: "https://bushraimpex.com/products",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: catName,
            item: `https://bushraimpex.com/products/${product.category}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: product.name,
            item: canonicalUrl,
          },
        ],
      }
    : null;

  // ─── FAQPage JSON-LD ────────────────────────────────────────
  const faqItems = buildFaqItems(product);
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: {
              "@type": "Answer",
              text: a,
            },
          })),
        }
      : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Suspense fallback={null}>
        <ProductDetailClient category={category} slug={slug} />
      </Suspense>
    </>
  );
}
