"use client";

import Image from "next/image";
import { Product, getAccessoryImage } from "@/data/products";

// ─── Application areas (duplicated from ProductDetailClient to keep this
//     component self-contained and avoid circular concerns) ─────────────────
const BASE_APPLICATIONS: Record<string, { label: string; desc: string }[]> = {
  weeders: [
    { label: "Paddy / Rice Fields", desc: "Ideal for inter-row weeding and soil aeration in wet and dry paddy cultivation." },
    { label: "Vegetable Farming", desc: "Used for bed preparation and weed management in vegetable plots." },
    { label: "Orchard Cultivation", desc: "Suitable for inter-row soil cultivation under mango, coconut and arecanut trees." },
    { label: "Sugarcane Fields", desc: "Effective for earthing up and weed control in sugarcane rows." },
    { label: "Groundnut & Soybean", desc: "Used for inter-crop cultivation and row weeding in oilseed crops." },
    { label: "Ridging & Furrow Making", desc: "Ridger rod attachment enables seed bed preparation and furrow formation." },
  ],
  chainsaws: [
    { label: "Tree Felling", desc: "Designed for clean, controlled felling of trees up to large diameters." },
    { label: "Branch Trimming", desc: "Used for limbing and pruning branches from standing or felled trees." },
    { label: "Timber Cutting", desc: "Suitable for cutting logs into lengths for firewood and timber processing." },
    { label: "Land Clearing", desc: "Effective for clearing shrubs, dense undergrowth and small trees." },
    { label: "Forestry Operations", desc: "Used by forest departments and plantation companies for periodic clearing." },
  ],
  "chaff-cutters": [
    { label: "Cattle Feed Preparation", desc: "Chops paddy straw, wheat straw and green fodder for dairy cattle." },
    { label: "Goat & Sheep Fodder", desc: "Cuts grass and silage into small lengths suitable for small ruminants." },
    { label: "Silage Making", desc: "Chops corn stalk and green material to uniform size for silage storage." },
    { label: "Compost Preparation", desc: "Used to shred crop residues into small pieces to accelerate composting." },
    { label: "Poultry Bedding", desc: "Cuts straw to fine lengths for use as poultry litter material." },
  ],
  "wood-chippers": [
    { label: "Garden Waste Management", desc: "Chips branches, twigs and prunings into fine mulch for garden beds." },
    { label: "Mulch Production", desc: "Produces wood chip mulch to reduce soil moisture loss and suppress weeds." },
    { label: "Farm Waste Disposal", desc: "Clears crop waste, orchard prunings and hedge trimmings efficiently." },
    { label: "Compost Feedstock", desc: "Wood chip output acts as a high-carbon material in compost systems." },
    { label: "Municipal Maintenance", desc: "Used by municipalities for roadside tree trimming and park maintenance." },
  ],
  harvesters: [
    { label: "Paddy Harvesting", desc: "Cuts paddy stalks at base level for efficient manual-collection harvest." },
    { label: "Wheat Harvesting", desc: "Used for cut-and-drop harvesting of wheat before manual bundling." },
    { label: "Grass Cutting", desc: "Cuts road-side grass, bunds and embankment grass quickly." },
    { label: "Weed Management", desc: "Effective for cutting dense weed growth in uncultivated land." },
    { label: "Tea Garden Maintenance", desc: "BCH side-pack series used in tea gardens for pruning and skiffing." },
    { label: "Vegetable Plots", desc: "Precise cutting for harvesting legume and leafy vegetable crops." },
  ],
  sprayers: [
    { label: "Pest Control", desc: "High-pressure spray for effective contact and systemic pesticide application." },
    { label: "Fungicide Application", desc: "Fine mist coverage for foliar fungicide spraying on field crops." },
    { label: "Fertilizer Spraying", desc: "Micro-nutrient and liquid fertilizer application via foliar spray." },
    { label: "Weed Killer Application", desc: "Directed herbicide spray for inter-row and bund weed management." },
    { label: "Disinfection", desc: "High-pressure HTP models used for farm, poultry and animal shed disinfection." },
    { label: "Fruit Crop Spraying", desc: "Long-reach spray for mango, citrus, arecanut and tall fruit crops." },
  ],
  "water-pumps": [
    { label: "Field Irrigation", desc: "Pumps water from wells, ponds and canals for crop irrigation." },
    { label: "Water Transfer", desc: "Transfers water between storage tanks and overhead reservoirs." },
    { label: "Flood Drainage", desc: "Used for emergency de-watering of flooded fields and basements." },
    { label: "Construction Sites", desc: "Supplies water for concrete mixing, dust suppression and worker use." },
    { label: "Fish Pond Management", desc: "Used for filling, emptying and water circulation in aquaculture ponds." },
  ],
  "earth-augers": [
    { label: "Fence Post Holes", desc: "Drills clean, straight holes for barbed wire and electric fence posts." },
    { label: "Tree Planting", desc: "Prepares planting pits for saplings in orchards and afforestation drives." },
    { label: "Soil Sampling", desc: "Used to extract core soil samples for lab testing and survey work." },
    { label: "Sign Post Installation", desc: "Drills holes for road signs, marker posts and boundary pillars." },
    { label: "Foundation Surveys", desc: "Used in construction for preliminary soil bore-hole investigation." },
  ],
  "lawn-mowers": [
    { label: "Garden Maintenance", desc: "Used for regular mowing of home gardens, lawns and turf areas." },
    { label: "Sports Turf", desc: "Maintains cutting height precision for football, cricket and golf turf." },
    { label: "Park Maintenance", desc: "Used by municipalities and institutions for large open-area grass management." },
    { label: "Commercial Properties", desc: "Regular mowing of commercial premises, factory grounds and resorts." },
    { label: "Road Medians", desc: "Used for maintaining road dividers and highway green belt grass." },
  ],
  "tea-harvesters": [
    { label: "Tea Leaf Harvesting", desc: "Harvests tea shoots to precise blade-set height for two-leaf-one-bud standard." },
    { label: "Tea Garden Skiffing", desc: "Used for level-cut skiffing of tea bushes to rejuvenate growth." },
    { label: "Pruning Operations", desc: "Battery-powered models ideal for systematic pruning of tea bushes." },
    { label: "Hedge Trimming", desc: "Suitable for trimming tea bush rows to uniform height across estates." },
  ],
};

function getApplications(product: Product) {
  const base = BASE_APPLICATIONS[product.category] ?? [];
  const extras: { label: string; desc: string }[] = [];
  const featStr = product.features.join(" ").toLowerCase();
  const specStr = JSON.stringify(product.specs).toLowerCase();
  if (featStr.includes("headlight") || featStr.includes("headlights"))
    extras.push({ label: "Night / Dusk Operation", desc: "Built-in headlights allow continued operation after sunset, extending productive hours during peak farming seasons." });
  if (featStr.includes("atv") || featStr.includes("dual shock") || featStr.includes("rough terrain"))
    extras.push({ label: "Hilly & Rough Terrain", desc: "ATV tyres and dual shock absorbers make this model suitable for uneven, sloped and rocky agricultural land." });
  if (product.fuelType === "Diesel" || featStr.includes("diesel"))
    extras.push({ label: "Extended Duration Work", desc: "Diesel fuel economy enables all-day continuous operation without frequent refuelling stops." });
  if (specStr.includes("135 cms") || specStr.includes("135cm"))
    extras.push({ label: "Large Commercial Estates", desc: "Wide 135 cm tilling width makes this model efficient for large paddy estates, plantations and commercial farms." });
  if (featStr.includes("electric start"))
    extras.push({ label: "Operator Comfort", desc: "Electric start removes the physical effort of manual recoil starting, making it suitable for older or less able-bodied operators." });
  if (featStr.includes("backpack"))
    extras.push({ label: "Steep Slope Operation", desc: "Backpack mounting keeps the centre of gravity close to the operator's body, improving stability on steep terrain." });
  return [...extras, ...base].slice(0, 6);
}

// ─── Section heading utility ─────────────────────────────────────────────────
function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
      <span style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)", fontSize: "13px", color: "#D71920", letterSpacing: "0.15em", minWidth: "28px" }}>{num}</span>
      <div style={{ flex: 1, height: "1px", background: "#EBEBEB" }} />
      <h2 style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)", fontSize: "22px", color: "#111111", letterSpacing: "0.04em", margin: 0, textTransform: "uppercase" }}>{title}</h2>
      <div style={{ width: "40px", height: "1px", background: "#D71920" }} />
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function PrintBrochure({ product }: { product: Product }) {
  const images = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
  const specEntries = Object.entries(product.specs);
  const applications = getApplications(product);

  return (
    <div
      className="print-brochure-root"
      style={{
        width: "210mm",
        margin: "0 auto",
        fontFamily: "var(--font-sans, 'Inter', sans-serif)",
        background: "#fff",
        color: "#111",
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: BRANDED HEADER                                         */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div
        className="pdf-section"
        style={{
          background: "#111111",
          color: "#fff",
          padding: "28px 36px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D71920", marginBottom: "6px" }}>
            Bushra Impex · X1 Power
          </div>
          <div style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)", fontSize: "40px", lineHeight: 0.9, letterSpacing: "0.02em", color: "#fff" }}>
            {product.name}
          </div>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#888", marginTop: "6px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Model: {product.modelCode} · {product.categoryName}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
          <span style={{ background: "#D71920", color: "#fff", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 12px" }}>
            {product.fuelType}
          </span>
          <span style={{ fontSize: "8px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            x1power.in
          </span>
        </div>
      </div>

      <div style={{ padding: "32px 36px 0" }}>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: ALL PRODUCT PICTURES                                 */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div className="pdf-section" style={{ marginBottom: "32px" }}>
          <SectionHeading num="01" title="Product Pictures" />
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {/* Primary image — larger */}
            {images[0] && (
              <div style={{
                flex: "0 0 calc(60% - 5px)",
                aspectRatio: "4/3",
                background: "#F8F8F8",
                border: "1px solid #EBEBEB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}>
                <img
                  src={images[0]}
                  alt={product.name}
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", padding: "16px" }}
                />
              </div>
            )}
            {/* Secondary images grid */}
            {images.length > 1 && (
              <div style={{ flex: "0 0 calc(40% - 5px)", display: "flex", flexDirection: "column", gap: "10px" }}>
                {images.slice(1, 4).map((img, i) => (
                  <div key={i} style={{
                    flex: 1,
                    background: "#F8F8F8",
                    border: "1px solid #EBEBEB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    minHeight: "80px",
                  }}>
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 2}`}
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", padding: "8px" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: OVERVIEW                                             */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div className="pdf-section" style={{ marginBottom: "32px" }}>
          <SectionHeading num="02" title="Overview" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              <p style={{ fontSize: "12px", color: "#333", lineHeight: 1.7, borderLeft: "3px solid #D71920", paddingLeft: "12px", margin: "0 0 12px" }}>
                The <strong>{product.modelCode}</strong> is a professional-grade {product.categoryName.toLowerCase()} manufactured under the X1 Power brand by Bushra Impex. Designed and tested for agricultural and commercial use in Indian field conditions.
              </p>
              <p style={{ fontSize: "12px", color: "#555", lineHeight: 1.7, margin: 0 }}>
                {product.description}
              </p>
            </div>
            {/* Quick spec cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", alignContent: "start" }}>
              {specEntries.slice(0, 6).map(([k, v]) => (
                <div key={k} style={{ background: "#F8F8F8", border: "1px solid #EBEBEB", padding: "10px 12px" }}>
                  <div style={{ fontSize: "8px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#999", marginBottom: "3px" }}>{k}</div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#111" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* SECTION 4: TECHNICAL SPECIFICATIONS                             */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div className="pdf-section" style={{ marginBottom: "32px" }}>
          <SectionHeading num="03" title="Technical Specifications" />
          <div style={{ border: "1px solid #EBEBEB" }}>
            <div style={{ display: "flex", background: "#111111", padding: "8px 16px" }}>
              <span style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", width: "45%" }}>Parameter</span>
              <span style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", width: "55%" }}>Specification</span>
            </div>
            {specEntries.map(([k, v], i) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  padding: "8px 16px",
                  background: i % 2 === 0 ? "#fff" : "#F8F8F8",
                  borderTop: "1px solid #EBEBEB",
                }}
              >
                <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", width: "45%" }}>{k}</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#111", width: "55%" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* SECTION 5: KEY FEATURES                                         */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div className="pdf-section" style={{ marginBottom: "32px" }}>
          <SectionHeading num="04" title="Key Features" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {product.features.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  background: "#F8F8F8",
                  border: "1px solid #EBEBEB",
                  padding: "10px 12px",
                }}
              >
                <span style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)", fontSize: "20px", color: "rgba(215,25,32,0.25)", lineHeight: 1, minWidth: "28px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#222", lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* SECTION 6: ACCESSORIES & ATTACHMENTS                           */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {product.accessories.length > 0 && (
          <div className="pdf-section" style={{ marginBottom: "32px" }}>
            <SectionHeading num="05" title="Accessories & Attachments" />
            <p style={{ fontSize: "10px", color: "#888", marginBottom: "14px", marginTop: 0 }}>
              Compatible with <strong>{product.modelCode}</strong> as listed in the official X1 Power catalogue.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              {product.accessories.map((acc, i) => {
                const imgSrc = getAccessoryImage(acc, product.accessoryImages);
                return (
                  <div
                    key={i}
                    style={{
                      border: "1px solid #EBEBEB",
                      background: "#fff",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ aspectRatio: "1", background: "#F8F8F8", borderBottom: "1px solid #EBEBEB", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px" }}>
                      {imgSrc ? (
                        <img src={imgSrc} alt={acc} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                      ) : (
                        <span style={{ fontSize: "9px", color: "#bbb", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Image<br />N/A</span>
                      )}
                    </div>
                    <div style={{ padding: "6px 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "5px", height: "5px", background: "#D71920", flexShrink: 0 }} />
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#333", textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.3 }}>{acc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* SECTION 7: APPLICATIONS                                         */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div className="pdf-section" style={{ marginBottom: "32px" }}>
          <SectionHeading num={product.accessories.length > 0 ? "06" : "05"} title="Applications" />
          <p style={{ fontSize: "10px", color: "#888", marginBottom: "14px", marginTop: 0 }}>
            Recommended application areas for the <strong>{product.modelCode}</strong> based on engine capacity, attachments and design specifications.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "16px" }}>
            {applications.map((app, i) => (
              <div
                key={i}
                style={{
                  background: "#F8F8F8",
                  border: "1px solid #EBEBEB",
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)", fontSize: "12px", color: "#D71920" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ width: "1px", height: "12px", background: "#EBEBEB" }} />
                  <span style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)", fontSize: "14px", color: "#111", letterSpacing: "0.03em" }}>{app.label}</span>
                </div>
                <p style={{ fontSize: "10px", color: "#666", lineHeight: 1.55, margin: 0, paddingLeft: "28px" }}>{app.desc}</p>
              </div>
            ))}
          </div>

          {/* Model operational note */}
          <div style={{ background: "#111111", padding: "16px 20px" }}>
            <div style={{ fontSize: "8px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>Model Note</div>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>
              The <strong style={{ color: "#fff" }}>{product.modelCode}</strong> with{" "}
              {product.specs["Displacement"] ?? product.specs["Battery Voltage"] ?? "its"}{" "}
              {product.specs["Displacement"] ? "displacement" : product.specs["Battery Voltage"] ? "battery" : "engine"}{" "}
              {product.specs["Power"] ?? product.specs["Rotated Power"] ?? product.specs["Rated Power"]
                ? `and ${product.specs["Power"] ?? product.specs["Rotated Power"] ?? product.specs["Rated Power"]} power output`
                : ""}{" "}
              is specifically suited for {applications[0]?.label.toLowerCase()} and {applications[1]?.label.toLowerCase()}.
              {product.fuelType === "Diesel" ? " Being a diesel model, it offers lower operating costs per hour and is preferred for extended daily use." : ""}
              {product.fuelType === "Petrol" ? " Its petrol engine provides quick start-up and is ideal for short to medium duration daily operations." : ""}
              {product.fuelType === "Electric" ? " The electric motor eliminates fuel costs and emissions, making it ideal for enclosed or noise-sensitive areas." : ""}
            </p>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* CORPORATE FOOTER                                                  */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div
        className="pdf-section"
        style={{
          background: "#1a1a1a",
          borderTop: "3px solid #D71920",
          padding: "20px 36px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)", fontSize: "16px", color: "#fff", letterSpacing: "0.08em", marginBottom: "4px" }}>
            BUSHRA IMPEX
          </div>
          <div style={{ fontSize: "8px", color: "#888", letterSpacing: "0.12em", textTransform: "uppercase" }}>Official X1 Power Distributor</div>
        </div>
        <div style={{ display: "flex", gap: "32px", fontSize: "10px", color: "#aaa" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: "2px", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Phone</div>
            <div>+91 76248 69606</div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: "2px", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Email</div>
            <div>sales@bushraimpex.com</div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: "2px", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Website</div>
            <div>www.x1power.in</div>
          </div>
        </div>
        <div style={{ fontSize: "8px", color: "#555", maxWidth: "140px", lineHeight: 1.5 }}>
          Specifications are subject to change without prior notice. For dealer enquiries contact our sales team.
        </div>
      </div>
    </div>
  );
}
