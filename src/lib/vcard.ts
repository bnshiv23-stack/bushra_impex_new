/**
 * RFC-2426 vCard 3.0 generator for Bushra Impex & X1 Power
 * Enables instant one-tap contact saving to iOS and Android address books.
 */

export interface ContactData {
  fullName: string;
  organization: string;
  title: string;
  phones: { type: string; number: string; pref?: boolean }[];
  emails: { type: string; address: string; pref?: boolean }[];
  urls: { type: string; url: string }[];
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  note: string;
}

export const DEFAULT_COMPANY_CONTACT: ContactData = {
  fullName: "Bushra Impex - X1 Power",
  organization: "Bushra Impex / X1 Power Agricultural Machinery",
  title: "Official Agricultural Equipment & Machinery",
  phones: [
    { type: "CELL,VOICE", number: "+91 76248 69606", pref: true },
    { type: "WORK,VOICE", number: "080 41503394" },
  ],
  emails: [
    { type: "WORK,INTERNET", address: "bushrapowertools@gmail.com", pref: true },
  ],
  urls: [
    { type: "WORK", url: "https://bushraimpex.com" },
    { type: "WORK", url: "https://x1power.in" },
    { type: "Connect", url: "https://bushraimpex.com/connect" },
  ],
  address: {
    street: "Old No 98, New No 11, 1st Floor 4th Cross, Kalasipalya New Extension",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560002",
    country: "India",
  },
  note: "India's trusted agricultural machinery company. Power weeders, chainsaws, sprayers, crop harvesters, chaff cutters, wood chippers. FMTTI tested & ISO 9001:2015 certified.",
};

export function generateVCardString(contact: ContactData = DEFAULT_COMPANY_CONTACT): string {
  const phoneLines = (contact.phones || [])
    .map((p) => `TEL;TYPE=${p.type}${p.pref ? ",PREF" : ""}:${p.number}`)
    .join("\r\n");

  const emailLines = (contact.emails || [])
    .map((e) => `EMAIL;TYPE=${e.type}${e.pref ? ",PREF" : ""}:${e.address}`)
    .join("\r\n");

  const urlLines = (contact.urls || [])
    .map((u) => `URL;TYPE=${u.type}:${u.url}`)
    .join("\r\n");

  const adr = contact.address;
  const addressLine = `ADR;TYPE=WORK,POSTAL,PARCEL,PREF:;;${adr.street};${adr.city};${adr.region};${adr.postalCode};${adr.country}`;
  const labelLine = `LABEL;TYPE=WORK,PREF:${adr.street}\\n${adr.city}, ${adr.region} - ${adr.postalCode}\\n${adr.country}`;

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Power;Bushra Impex & X1;;;",
    `FN:${contact.fullName}`,
    `ORG:${contact.organization}`,
    `TITLE:${contact.title}`,
    phoneLines,
    emailLines,
    urlLines,
    addressLine,
    labelLine,
    `NOTE:${contact.note}`,
    `REV:${new Date().toISOString()}`,
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function downloadVCard(filename = "Bushra_Impex_X1_Power.vcf", contact = DEFAULT_COMPANY_CONTACT) {
  if (typeof window === "undefined") return;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIOS) {
    // On iOS Safari, navigating directly to the .vcf endpoint triggers the native Add Contact sheet
    window.location.href = "/contact.vcf";
    return;
  }

  const vcard = generateVCardString(contact);
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
