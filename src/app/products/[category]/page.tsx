import { CATEGORIES, getProductsByCategory } from "@/data/products";
import CategoryClient from "./CategoryClient";
import type { Metadata } from "next";

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const catData = CATEGORIES.find((c) => c.slug === category);
  
  if (!catData) {
    return { title: "Category Not Found | X1 Power" };
  }

  const canonicalUrl = `https://bushraimpex.com/products/${category}`;

  return {
    title: `${catData.name} | Agricultural Machinery | Bushra Impex`,
    description: `Explore X1 Power ${catData.name.toLowerCase()} by Bushra Impex. FMTTI-tested, ISO 9001:2015 certified agricultural machinery with full technical specifications, feature breakdown, attachments, and nationwide dealer availability.`,
    keywords: [
      catData.name,
      `X1 Power ${catData.name}`,
      `Bushra Impex ${catData.name}`,
      `${catData.name} price India`,
      `${catData.name} specifications`,
      "X1 Power", "Bushra Impex", "agricultural machinery India",
      "FMTTI tested agri equipment",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${catData.name} | Agricultural Machinery | Bushra Impex`,
      description: `Explore X1 Power ${catData.name.toLowerCase()} by Bushra Impex. FMTTI tested & ISO 9001 certified.`,
      url: canonicalUrl,
      siteName: "Bushra Impex — X1 Power",
      locale: "en_IN",
      type: "website",
      images: catData.bannerImage ? [{ url: `https://bushraimpex.com${catData.bannerImage}` }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${catData.name} | X1 Power`,
      description: `Explore X1 Power ${catData.name.toLowerCase()} by Bushra Impex.`,
      images: catData.bannerImage ? [`https://bushraimpex.com${catData.bannerImage}`] : [],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const catData = CATEGORIES.find((c) => c.slug === category);
  const products = getProductsByCategory(category);
  const canonicalUrl = `https://bushraimpex.com/products/${category}`;

  // ItemList / CollectionPage schema for category
  const collectionSchema = catData ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonicalUrl}#collectionpage`,
    "name": `${catData.name} by X1 Power`,
    "description": `Comprehensive catalogue of ${catData.name.toLowerCase()} manufactured and distributed by Bushra Impex under the X1 Power brand.`,
    "url": canonicalUrl,
    "publisher": { "@id": "https://bushraimpex.com/#organization" },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": products.length,
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": product.name,
        "url": `https://bushraimpex.com/products/${category}/${product.slug}`
      }))
    }
  } : null;

  // BreadcrumbList schema
  const breadcrumbSchema = catData ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://bushraimpex.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://bushraimpex.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": catData.name,
        "item": canonicalUrl
      }
    ]
  } : null;

  return (
    <>
      {collectionSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <CategoryClient categorySlug={category} />
    </>
  );
}
