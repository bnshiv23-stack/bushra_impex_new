import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect & Contact Hub | Bushra Impex & X1 Power",
  description:
    "Official digital link hub and direct contact page for Bushra Impex and X1 Power Agricultural Machinery. Direct phone, WhatsApp, location, product catalogue, and one-tap contact download.",
  alternates: {
    canonical: "https://bushraimpex.com/connect",
  },
  openGraph: {
    title: "Let's Connect | Bushra Impex & X1 Power",
    description:
      "Everything you need to reach us in one place. Call, WhatsApp, digital catalogue, directions, and instant contact save.",
    url: "https://bushraimpex.com/connect",
    siteName: "Bushra Impex — X1 Power",
    images: [
      {
        url: "https://bushraimpex.com/images/750%20PTO-SERIES-new.png",
        width: 1200,
        height: 630,
        alt: "Bushra Impex & X1 Power Digital Connect Hub",
      },
    ],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://bushraimpex.com/connect#webpage",
  url: "https://bushraimpex.com/connect",
  name: "Bushra Impex & X1 Power Digital Connect Hub",
  description:
    "Permanent contact hub, digital visiting card, and product catalogue access for Bushra Impex and X1 Power.",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "Bushra Impex — X1 Power",
    telephone: "+91-76248-69606",
    email: "bushrapowertools@gmail.com",
    url: "https://bushraimpex.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "#11, SJP Road Cross, Behind Jamia Masjid, City Market",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560002",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:30",
      },
    ],
  },
};

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
