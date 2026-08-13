// chatbot-engine.ts — smart catalog search, no external API needed
// ponytail: pure in-memory keyword match; upgrade path = replace respond() with Gemini/OpenAI call

import { PRODUCTS, CATEGORIES, Product } from "@/data/products";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  products?: Product[];
  quickReplies?: string[];
  formType?: "enquiry" | "callback" | "dealer" | "catalogue";
}

// ── helpers ──────────────────────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function score(product: Product, tokens: string[]): number {
  const haystack = [
    product.name,
    product.category,
    product.categoryName,
    product.description,
    product.fuelType,
    ...Object.entries(product.specs).flatMap(([k, v]) => [k, v]),
    ...product.features,
    ...product.accessories,
  ]
    .join(" ")
    .toLowerCase();

  return tokens.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0);
}

function searchProducts(query: string, limit = 6): Product[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  return PRODUCTS.map((p) => ({ p, s: score(p, tokens) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}

// ── intent detection ──────────────────────────────────────────────────────────

type Intent =
  | "greeting"
  | "categories"
  | "contact"
  | "about"
  | "dealer"
  | "callback"
  | "enquiry"
  | "catalogue"
  | "price"
  | "product_search";

function detectIntent(tokens: string[]): Intent {
  const t = tokens.join(" ");
  if (/\b(hi|hello|hey|namaste|hlo|hii|menu|welcome|start)\b/.test(t)) return "greeting";
  if (/\b(dealers?|dealership|distributor|partner|become.*dealer|apply.*dealer)\b/.test(t)) return "dealer";
  if (/\b(callbacks?|call me|call back|representative|speak.*sales)\b/.test(t)) return "callback";
  if (/\b(enquir|inquir|quote|order|buy|book|purchase|form|interested)\b/.test(t)) return "enquiry";
  if (/\b(catalogues?|catalogs?|brochures?|profile|pdfs?|downloads?|document)\b/.test(t)) return "catalogue";
  if (/\b(contact|whatsapp|phone|call|email|reach|address|location)\b/.test(t)) return "contact";
  if (/\b(about|company|bushra|x1 power|who are|story|history|founded)\b/.test(t)) return "about";
  if (/\b(prices?|costs?|rates?|how much|mrp|₹|rupee|price.*list)\b/.test(t)) return "price";
  // Only exact matches for categories menu to avoid catching specific product searches
  if (/\b(categories|category|product.*list|show.*all|all.*products?)\b/.test(t) || t === "products") return "categories";
  
  return "product_search";
}

// ── response builder ──────────────────────────────────────────────────────────

export function respond(userMessage: string): ChatMessage {
  const tokens = tokenize(userMessage);
  const intent = detectIntent(tokens);

  switch (intent) {
    case "greeting":
      return {
        role: "assistant",
        content: "Welcome to Bushra Impex / X1 Power. How can I help you today?",
        quickReplies: [
          "Products",
          "Catalogue Downloads",
          "Become a Dealer",
          "Submit Enquiry",
          "Request a Callback",
          "About X1 Power",
          "Contact Us",
        ],
      };

    case "categories":
      return {
        role: "assistant",
        content:
          "**X1 Power Product Categories**\n\n" +
          "• **Power Weeders & Tillers**\n" +
          "• **Chainsaws**\n" +
          "• **Crop Harvesters & Brush Cutters**\n" +
          "• **Power Sprayers**\n" +
          "• **Earth Augers**\n" +
          "• **Accessories & Spare Parts**\n\n" +
          "Select a category below to view products and download brochures:",
        quickReplies: [
          "Power Weeders",
          "Chainsaws",
          "Crop Harvesters",
          "Power Sprayers",
          "Earth Augers",
        ],
      };

    case "enquiry":
      return {
        role: "assistant",
        content:
          "**Enquiry Form**\n\nFill in the details below and our team will get back to you with pricing and availability.",
        formType: "enquiry",
        quickReplies: ["Request a Callback", "Become a Dealer", "Catalogue Downloads"],
      };

    case "callback":
      return {
        role: "assistant",
        content:
          "**Request a Callback**\n\nWould you like an X1 representative to call you? Leave your details below.",
        formType: "callback",
        quickReplies: ["Submit Enquiry", "Become a Dealer"],
      };

    case "dealer":
      return {
        role: "assistant",
        content:
          "**Become an Authorized X1 Power Dealer**\n\nJoin our 500+ dealer network across 29 states. Submit your details below.",
        formType: "dealer",
        quickReplies: ["Catalogue Downloads", "Contact Us"],
      };

    case "catalogue":
      return {
        role: "assistant",
        content:
          "**Catalogue Downloads**\n\nDownload our main catalogue below. \n\n**For individual machine brochures, please select a product category:**",
        formType: "catalogue",
        quickReplies: ["Power Weeders", "Chainsaws", "Crop Harvesters", "Power Sprayers", "Earth Augers"],
      };

    case "contact":
      return {
        role: "assistant",
        content:
          "**Contact Bushra Impex / X1 Power**\n\n" +
          "Head Office: Bengaluru, Karnataka, India\n" +
          "Phone / WhatsApp: +91 76248 69606\n" +
          "Email: info@bushraimpex.com\n" +
          "Hours: Mon–Sat, 9:00 AM – 6:00 PM IST",
        quickReplies: ["Request a Callback", "Submit Enquiry", "Become a Dealer"],
      };

    case "about":
      return {
        role: "assistant",
        content:
          "**About Bushra Impex & X1 Power**\n\n" +
          "Established in 2012 in Bengaluru, Karnataka, Bushra Impex is a leading **distributor and wholesaler** of high-performance agricultural machinery under the brand **X1 Power**.\n\n" +
          "500+ dealers across 29 states · FMTTI certified · ISO 9001:2015 · 5M+ farmers impacted",
        quickReplies: ["Become a Dealer", "Catalogue Downloads", "Submit Enquiry"],
      };

    case "price":
      return {
        role: "assistant",
        content:
          "**Pricing**\n\nPrices vary by model and are eligible for state subsidies. Submit an enquiry or request a callback for exact pricing with delivery options.",
        formType: "enquiry",
        quickReplies: ["Submit Enquiry", "Request a Callback"],
      };

    default:
    case "product_search": {
      const found = searchProducts(userMessage);

      if (!found.length) {
        return {
          role: "assistant",
          content:
            "No exact match found. Try searching for:\n\n" +
            "• Power Weeders (e.g. 750 PTO Kibao)\n" +
            "• Chainsaws (e.g. X1-5900)\n" +
            "• Crop Harvesters (e.g. BCH-430)\n" +
            "• Chaff Cutters or Earth Augers",
          quickReplies: ["Products", "Submit Enquiry", "Request a Callback"],
        };
      }

      const top = found[0];
      const specLines = Object.entries(top.specs)
        .slice(0, 5)
        .map(([k, v]) => `| ${k} | ${v} |`)
        .join("\n");
      const specTable = specLines
        ? `\n\n**${top.name} — Key Specs:**\n| Spec | Value |\n| --- | --- |\n${specLines}`
        : "";

      const intro =
        found.length === 1
          ? `Found 1 result for "${userMessage}":`
          : `Found ${found.length} results for "${userMessage}":`;

      return {
        role: "assistant",
        content: `${intro}${specTable}`,
        products: found,
        quickReplies: ["Submit Enquiry", "Request a Callback", "Catalogue Downloads"],
      };
    }
  }
}
