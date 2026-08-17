// chatbot-engine.ts — smart catalog search & conversational AI engine
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

  return tokens.reduce((acc, t) => {
    if (haystack.includes(t)) {
      return acc + (t.length > 3 ? 2 : 1);
    }
    return acc;
  }, 0);
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

// ── intent detection & conversational queries ───────────────────────────────────

export function respond(userMessage: string): ChatMessage {
  const cleanMsg = userMessage.trim();
  const lower = cleanMsg.toLowerCase();
  const tokens = tokenize(lower);
  const t = tokens.join(" ");

  // 1. GREETINGS
  if (/^(hi|hello|hey|namaste|good morning|good afternoon|good evening|hlo|hii|start|menu|help)$/.test(lower) || tokens.length === 1 && ["hi", "hello", "hey", "namaste"].includes(tokens[0])) {
    return {
      role: "assistant",
      content: "Hello! Welcome to **Bushra Impex / X1 Power**.\n\nI can help you explore agricultural machinery, download full catalogues, compare 2-stroke vs 4-stroke engines, or connect with an authorized dealer near you. What are you looking for today?",
      quickReplies: [
        "View Products",
        "Catalogue Downloads",
        "2-Stroke vs 4-Stroke",
        "Paddy Weeders",
        "Become a Dealer",
        "Request a Callback",
      ],
    };
  }

  // 2. ENGINE TYPE: 2-STROKE VS 4-STROKE COMPARISON & QUERIES
  if (
    lower.includes("2 stroke") ||
    lower.includes("4 stroke") ||
    lower.includes("2-stroke") ||
    lower.includes("4-stroke") ||
    lower.includes("2t") ||
    lower.includes("4t") ||
    lower.includes("stroke") ||
    lower.includes("engine type") ||
    lower.includes("difference between 2")
  ) {
    if (lower.includes("difference") || lower.includes("vs") || lower.includes("which is better") || lower.includes("compare") || lower.includes("better")) {
      return {
        role: "assistant",
        content:
          "**2-Stroke vs 4-Stroke Engine Comparison**\n\n" +
          "| Feature | 2-Stroke Engine | 4-Stroke Engine |\n" +
          "| --- | --- | --- |\n" +
          "| **Weight** | Lightweight & Portable | Heavy-duty / Balanced |\n" +
          "| **Power Output** | High RPM & Fast Acceleration | High Low-End Torque |\n" +
          "| **Fuel Mix** | Petrol mixed with 2-Stroke Oil (1:25) | Pure Petrol or Diesel (Separate Engine Oil) |\n" +
          "| **Maintenance** | Simple Design, Fewer Moving Parts | Low Vibration, Long Life & Quiet Operation |\n" +
          "| **Best Suited For** | Chainsaws, Brush Cutters & Backpack Sprayers | Heavy Power Weeders, Tillers & Water Pumps |\n\n" +
          "• **2-Stroke Machines**: Ideal for hill slopes, tree trimming, tea gardening, and fast clearing where light weight is critical.\n" +
          "• **4-Stroke Machines**: Highest fuel efficiency, minimal smoke, high tilling torque, and long continuous operation without mixing oil in petrol.",
        quickReplies: ["Power Weeders", "Chainsaws", "Crop Harvesters", "Submit Enquiry"],
      };
    }

    if (lower.includes("2") || lower.includes("two") || lower.includes("2t")) {
      const prods = PRODUCTS.filter(p => p.specs["Engine Type"]?.toLowerCase().includes("2-stroke") || p.fuelType?.toLowerCase().includes("2-stroke") || p.specs["Engine"]?.toLowerCase().includes("2-stroke")).slice(0, 4);
      return {
        role: "assistant",
        content:
          "**X1 Power 2-Stroke Agricultural Equipment**\n\n" +
          "Our 2-stroke engines deliver high power-to-weight ratio, rapid cutting RPM, and exceptional handling across rough terrains.\n\n" +
          "Popular 2-stroke models include:\n" +
          "• **X1-5900 Chainsaw** (58cc 2-Stroke High-Power Engine)\n" +
          "• **BCH-430 / BCH-520 Crop Harvesters & Brush Cutters** (Heavy-Duty 2-Stroke)\n" +
          "• **Backpack Power Sprayers & Earth Augers**",
        products: prods.length ? prods : undefined,
        quickReplies: ["Chainsaws", "Crop Harvesters", "4-Stroke Engines", "Catalogue Downloads"],
      };
    }

    if (lower.includes("4") || lower.includes("four") || lower.includes("4t")) {
      const prods = PRODUCTS.filter(p => p.specs["Engine Type"]?.toLowerCase().includes("4-stroke") || p.fuelType?.toLowerCase().includes("4-stroke") || p.specs["Engine"]?.toLowerCase().includes("4-stroke")).slice(0, 4);
      return {
        role: "assistant",
        content:
          "**X1 Power 4-Stroke Agricultural Equipment**\n\n" +
          "Our 4-stroke agricultural machinery provides maximum fuel savings, quiet operation, and heavy torque for hard soil tilling.\n\n" +
          "Popular 4-stroke models include:\n" +
          "• **750 PTO Kibao / Master Power Weeder** (7 HP 4-Stroke Petrol Engine)\n" +
          "• **750D Diesel Power Tiller** (6 HP 4-Stroke Diesel with Electric Start)\n" +
          "• **4-Stroke Sidepack & Backpack Brush Cutters**",
        products: prods.length ? prods : undefined,
        quickReplies: ["Power Weeders", "Chainsaws", "Crop Harvesters", "Submit Enquiry"],
      };
    }
  }

  // 3. APPLICATION-SPECIFIC RECOMMENDATIONS (Paddy, Sugarcane, Hills, Weeding, Digging)
  if (lower.includes("paddy") || lower.includes("wetland") || lower.includes("wet field") || lower.includes("rice")) {
    const paddyProds = PRODUCTS.filter(p => p.category === "weeders" || p.category === "harvesters").slice(0, 3);
    return {
      role: "assistant",
      content:
        "**Best Machines for Paddy & Wetland Farming**\n\n" +
        "For paddy fields, we recommend:\n" +
        "1. **X1 Power 750 PTO Weeder with Wetland/Cage Wheels**: Excellent traction in muddy puddles and de-weeding without sinking.\n" +
        "2. **BCH-430 / BCH-520 Crop Harvester with Paddy Blade**: Fast and clean paddy crop harvesting.\n\n" +
        "All models feature anti-corrosion gearboxes and splash-proof air filters.",
      products: paddyProds,
      quickReplies: ["Power Weeders", "Crop Harvesters", "Request a Callback", "Submit Enquiry"],
    };
  }

  if (lower.includes("sugarcane") || lower.includes("inter cultivation") || lower.includes("horticulture") || lower.includes("cotton") || lower.includes("intercultivation")) {
    const weeders = PRODUCTS.filter(p => p.category === "weeders").slice(0, 3);
    return {
      role: "assistant",
      content:
        "**Best Machines for Inter-Cultivation & Row Crops**\n\n" +
        "For sugarcane, cotton, vegetables, and fruit orchards:\n" +
        "• **750 PTO Series Power Weeders**: Adjustable tilling width (800–1000 mm) with PTO shaft for sprayers and ridger attachments.\n" +
        "• **Ridger & Ditcher Blades**: Perfect for making earthing-up furrows in sugarcane rows.",
      products: weeders,
      quickReplies: ["Power Weeders", "Catalogue Downloads", "Request a Callback"],
    };
  }

  if (lower.includes("digging") || lower.includes("fencing") || lower.includes("plantation") || lower.includes("auger") || lower.includes("post hole")) {
    const augers = PRODUCTS.filter(p => p.category === "augers" || p.category === "earth-augers");
    return {
      role: "assistant",
      content:
        "**Earth Augers for Fencing & Tree Plantation**\n\n" +
        "X1 Power Earth Augers drill holes from 4 inches to 12 inches in diameter in seconds, ideal for teak/fruit plantation, solar fencing, and pole installations.",
      products: augers.length ? augers : PRODUCTS.slice(0, 2),
      quickReplies: ["Earth Augers", "Submit Enquiry", "Catalogue Downloads"],
    };
  }

  // 4. SUBSIDY & GOVERNMENT TESTING (FMTTI)
  if (lower.includes("subsidy") || lower.includes("gov") || lower.includes("fmtti") || lower.includes("scheme") || lower.includes("test report")) {
    return {
      role: "assistant",
      content:
        "**Government Subsidy & Testing Certification**\n\n" +
        "• **FMTTI Tested**: X1 Power agricultural equipment is tested and certified by the Farm Machinery Training and Testing Institute (FMTTI), Govt of India.\n" +
        "• **State Subsidies**: Eligible for central & state horticulture/agriculture DBT subsidies across all Indian states.\n" +
        "• **ISO 9001:2015**: Manufactured under strict global quality control standards.\n\n" +
        "Submit an enquiry with your state to receive exact subsidy rates and required documents.",
      quickReplies: ["Submit Enquiry", "Request a Callback", "Become a Dealer"],
    };
  }

  // 5. CATALOGUE DOWNLOADS
  if (/\b(catalogues?|catalogs?|brochures?|profile|pdfs?|downloads?|document|manual)\b/.test(t) || lower.includes("catalogue download")) {
    return {
      role: "assistant",
      content:
        "**X1 Power Catalogue & Brochure Downloads**\n\n" +
        "You can download the **Master X1 Power Catalogue**, view the **Company Profile**, or download brochures for specific categories below:",
      formType: "catalogue",
      quickReplies: [
        "Power Weeders",
        "Chainsaws",
        "Crop Harvesters",
        "Power Sprayers",
        "Earth Augers",
        "About X1 Power",
      ],
    };
  }

  // 6. DEALERSHIP & PARTNERSHIP
  if (/\b(dealers?|dealership|distributor|partner|franchise|become.*dealer|apply.*dealer)\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "**Join the 500+ Authorized X1 Power Dealer Network**\n\n" +
        "Bushra Impex partners with agricultural machinery dealers across 29 states, providing:\n" +
        "✓ Direct wholesale pricing & high margins\n" +
        "✓ 100% genuine spare parts availability\n" +
        "✓ Marketing materials & technical warranty support\n\n" +
        "Fill out the dealer application below to get started:",
      formType: "dealer",
      quickReplies: ["Catalogue Downloads", "Contact Us", "Request a Callback"],
    };
  }

  // 7. CALLBACK REQUEST
  if (/\b(callbacks?|call me|call back|representative|talk|speak.*sales|phone call)\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "**Request a Call from our Agricultural Machinery Specialists**\n\n" +
        "Select your preferred time slot and leave your phone number. Our team in Bengaluru will call you back promptly.",
      formType: "callback",
      quickReplies: ["Submit Enquiry", "Become a Dealer", "Catalogue Downloads"],
    };
  }

  // 8. GENERAL ENQUIRY / PRICING
  if (/\b(prices?|costs?|rates?|how much|mrp|rupee|quote|order|buy|book|purchase)\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "**Price Quote & Availability**\n\n" +
        "X1 Power machines are priced competitively with regional warranty and subsidy eligibility. Submit your enquiry below or connect via WhatsApp for immediate quotes with transport options.",
      formType: "enquiry",
      quickReplies: ["Request a Callback", "Become a Dealer", "View Products"],
    };
  }

  // 9. ABOUT BUSHRA IMPEX
  if (/\b(about|company|bushra|x1 power|who are|story|history|founded|office|headquarter)\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "**About Bushra Impex & X1 Power**\n\n" +
        "Established in 2012 in Bengaluru, Karnataka, **Bushra Impex** is a premier distributor and wholesaler of heavy-duty farm machinery under the flagship brand **X1 Power**.\n\n" +
        "• **500+ Active Dealers** across 29 Indian states\n" +
        "• **5M+ Farmers** empowered with modern mechanization\n" +
        "• **FMTTI Tested & ISO 9001:2015** certified\n" +
        "• Complete spares backup and after-sales service network.",
      quickReplies: ["Become a Dealer", "Catalogue Downloads", "View Products", "Contact Us"],
    };
  }

  // 10. CONTACT US
  if (/\b(contact|whatsapp|phone|call|email|reach|address|location|pin|city)\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "**Contact Bushra Impex / X1 Power**\n\n" +
        "📍 **Head Office**: Bengaluru, Karnataka, India\n" +
        "📞 **Phone / WhatsApp**: +91 76248 69606\n" +
        "✉️ **Email**: info@bushraimpex.com\n" +
        "⏰ **Hours**: Mon – Sat, 9:00 AM – 6:00 PM IST",
      quickReplies: ["Request a Callback", "Submit Enquiry", "Catalogue Downloads"],
    };
  }

  // 11. CATEGORIES LIST
  if (/\b(categories|category|product.*list|show.*all|all.*products?)\b/.test(t) || t === "products" || t === "view products") {
    return {
      role: "assistant",
      content:
        "**X1 Power Product Catalog**\n\n" +
        "• **Power Weeders & Tillers** (Petrol 4-Stroke, Diesel 4-Stroke)\n" +
        "• **Chainsaws** (58cc 2-Stroke, Guide Bars up to 22 inches)\n" +
        "• **Crop Harvesters & Brush Cutters** (2-Stroke and 4-Stroke)\n" +
        "• **Power Sprayers** (Backpack, HTP & Portable Sprayers)\n" +
        "• **Earth Augers** (Tree plantation & Fencing)\n" +
        "• **Spare Parts & Attachments** (Rotary blades, Ridgers, Tiller Wheels)\n\n" +
        "Select any category below to view models:",
      quickReplies: [
        "Power Weeders",
        "Chainsaws",
        "Crop Harvesters",
        "Power Sprayers",
        "Earth Augers",
      ],
    };
  }

  // 12. DEFAULT DYNAMIC PRODUCT SEARCH
  const found = searchProducts(cleanMsg);

  if (!found.length) {
    return {
      role: "assistant",
      content:
        `I couldn't find an exact match for "${cleanMsg}".\n\n` +
        "You can search by machine type or model name:\n" +
        "• **Power Weeders** (e.g. 750 PTO Kibao, 750D Diesel)\n" +
        "• **Chainsaws** (e.g. X1-5900)\n" +
        "• **Crop Harvesters** (e.g. BCH-430, BCH-520)\n" +
        "• **Engine Types** (e.g. 2-stroke, 4-stroke)",
      quickReplies: ["View Products", "2-Stroke vs 4-Stroke", "Catalogue Downloads", "Submit Enquiry"],
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
      ? `Found 1 result for "${cleanMsg}":`
      : `Found ${found.length} results for "${cleanMsg}":`;

  return {
    role: "assistant",
    content: `${intro}${specTable}`,
    products: found,
    quickReplies: ["Download Brochure", "Submit Enquiry", "Request a Callback", "Catalogue Downloads"],
  };
}

