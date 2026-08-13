// ─── DATA: Company Overview ─────────────────────────────────────────────────
// All text content for the Company Overview / Corporate Profile.
// Images are mapped as placeholder IDs (e.g., "1.a") and should be placed
// at /public/company-overview/images/{id}.png when ready.

export const COMPANY_OVERVIEW = {
  // ─── SECTION 1: Company Overview Hero ──────────────────────────────
  overview: {
    label: "01 - Company Overview",
    heading: "Engineering the Future of Indian Agriculture",
    subheading: "At Bushra Impex, we believe agriculture is more than an industry-it is the foundation upon which nations grow. Every harvest, every field, and every farming community depends on reliable technology that improves productivity while preserving sustainability.\n\nDriven by engineering excellence and innovation, Bushra Impex has emerged as one of India's rapidly growing agricultural equipment companies through its flagship brand, X1 Power. Our mission is to empower farmers, entrepreneurs, dealers, and institutions with machinery that combines performance, durability, and value.\n\nToday, our expanding product portfolio, nationwide dealer network, and commitment to quality position us to play a significant role in India's next agricultural transformation.",
    footer: "Innovation. Reliability. Performance.",
    points: [
      { icon: "map", label: "PAN India Dealers Network", desc: "One of the most connected networks from Kashmir to Kanyakumari." },
      { icon: "shield", label: "Subsidy Across 29 States", desc: "Making equipment accessible." },
      { icon: "badge-check", label: "ISO 9001:2015", desc: "Certified quality management." },
    ],
    fmtti: {
      title: "FMTTI",
      body: "Bushra Impex is proud to offer agricultural machinery that has undergone evaluation through the Farm Machinery Training & Testing Institutes (FMTTI), Government of India. This recognition reflects our commitment to engineering excellence, product reliability and compliance with recognised testing standards.\n\nFMTTI-tested products play an important role in supporting agricultural mechanisation across India and are widely referenced for various government procurement and subsidy-related programmes. Through our expanding nationwide dealer network, Bushra Impex is positioned to serve customers across 29 states, helping farmers, institutions and business partners access dependable agricultural machinery backed by recognised testing standards."
    }
  },

  // ─── SECTION 2: Story of Success ────────────────────────────────────
  story: {
    label: "02 - Story of Success",
    heading: "Every Great Journey Begins with a Single Step",
    body: "Bushra Impex has grown through consistent effort, meaningful partnerships and a belief that dependable engineering can improve the future of agriculture. From its early beginnings to the continued expansion of X1 Power, every milestone reflects a commitment to quality, innovation and long-term relationships.",
    // Image: 2.a - Early-days photo or founding moment
    // Image: 2.b - Current scale, north India stock point, modern logistics
    images: {
      early: "/company-overview/images/2.a.png",
      modern: "/company-overview/images/2.b.png",
    },
    milestones: [
      { year: "2012", title: "Established", description: "Bushra Impex founded in Bengaluru, Karnataka." },
      { year: "2016", title: "X1 Power Born", description: "Launch of the X1 Power brand - a dedicated agricultural machinery line." },
      { year: "2017", title: "Agri Spare Parts", description: "Expansion into agricultural spare parts to serve farmers directly." },
      { year: "2018", title: "Machinery Portfolio", description: "Introduction of full agricultural machinery product portfolio." },
      { year: "2021", title: "Power Weeders", description: "Power Weeder expansion. Government FMTTI testing and approvals secured." },
      { year: "2024", title: "PAN India", description: "Growing PAN India dealer network. North India stock point established." },
      { year: "Future", title: "Global Vision", description: "₹250 Crore business vision. Global expansion. Technology-driven growth." },
    ],
    futureVision: "The journey is still unfolding, and every milestone is another step toward a larger vision for Indian agriculture.",
  },

  // ─── SECTION 3: Facts & Figures ─────────────────────────────────────
  facts: {
    label: "03 - Facts & Figures",
    heading: "Bushra Impex at a Glance",
    body: "A brief look at the numbers that define our growth and impact across the agricultural landscape. Every metric represents a farmer supported, a dealer empowered and a community strengthened.",
    kpis: [
      { value: "12", suffix: "+", title: "Years of Trust", description: "Serving Indian agriculture." },
      { value: "500", suffix: "+", title: "Dealer Network", description: "Strong presence across 29 states." },
      { value: "5M", suffix: "+", title: "Farmers Impacted", description: "Empowering agriculture nationwide." },
      { value: "10", suffix: "+", title: "Product Categories", description: "Comprehensive machinery portfolio." },
      { value: "29", suffix: "", title: "States Covered", description: "A true PAN-India operational footprint." },
      { value: "2", suffix: "", title: "Stock Points", description: "Ensuring timely inventory distribution." },
      { value: "ISO", suffix: "", title: "9001:2015", description: "Quality management certified." },
      { value: "100", suffix: "%", title: "Commitment", description: "Dedicated to continuous innovation." },
    ]
  },

  // ─── SECTION 4: Financial Performance ───────────────────────────────
  financial: {
    label: "04 - Financial Performance",
    heading: "Consistent Growth, Disciplined Operations",
    body: "Bushra Impex has demonstrated consistent business development through a focused expansion of product categories, dealer partnerships and geographic reach. Financial performance reflects our long-term operational discipline.",
    note: "Verified financial data will be inserted here by the management team.",
    // Image: 4.a - Subtle professional background (warehouse scale / glass building)
    images: { bg: "/company-overview/images/4.a.png" },
    metrics: [
      { label: "Revenue Growth", value: "100% YoY", trend: "up" },
      { label: "Product Categories", value: "10+", trend: "up" },
      { label: "Dealer Expansion", value: "29 states ", trend: "up" },
      { label: "Target Revenue", value: "₹250 Cr", trend: "up" },
    ],
  },

  // ─── SECTION 5: R&D ─────────────────────────────────────────────────
  rnd: {
    label: "05 - Research & Development",
    heading: "Engineering Built for India's Fields",
    body: "X1 Power products are engineered to withstand the demands of Indian agricultural conditions. Every product goes through rigorous testing, government certification and continuous design refinement to ensure dependable performance in the field.",
    // Image: 5.a - Engineers working / CAD designs / machinery testing
    images: { feature: "/company-overview/images/5.a.png" },
    pillars: [
      { title: "FMTTI Certification", description: "All major products are tested and certified by the Farm Machinery Training and Testing Institute." },
      { title: "ISO 9001:2015", description: "Quality management systems adhering to international manufacturing standards." },
      { title: "Field Testing", description: "Products tested across diverse Indian agricultural environments before commercial release." },
      { title: "Continuous Innovation", description: "Ongoing R&D investment to improve efficiency, durability and ease of operation." },
    ],
  },

  // ─── SECTION 6: Sustainability ───────────────────────────────────────
  sustainability: {
    label: "06 - Sustainability",
    heading: "Engineering a Sustainable Future for Indian Agriculture",
    sections: [
      {
        title: "Agriculture: India's Greatest Strength",
        body: "Agriculture is the backbone of India-driving livelihoods, food security and economic growth. As farming continues to modernise, dependable mechanisation will play a vital role in increasing productivity and empowering the next generation of farmers."
      },
      {
        title: "Built to Last",
        body: "At Bushra Impex, sustainability begins with engineering. Every X1 Power machine is designed for durability, reliability and long-term performance, helping farmers maximise productivity while reducing downtime and operating costs."
      },
      {
        title: "Growing Together",
        body: "Through continuous innovation, an expanding nationwide dealer network and customer-focused support, Bushra Impex is building a stronger agricultural ecosystem-creating lasting value for farmers, dealers and communities across India."
      }
    ],
    commitments: [
      "Empower Farmers",
      "Build Reliable Products",
      "Strengthen Partnerships",
      "Drive Continuous Innovation"
    ],
    quote: "Sustainability is not just about protecting the future-it's about building products, partnerships and opportunities that help Indian agriculture thrive for generations."
  },

  // ─── SECTION 7: India Opportunity ───────────────────────────────────
  indiaOpportunity: {
    label: "07 - India Opportunity",
    heading: "The Agricultural Revolution is Here",
    body: "At Bushra Impex, we believe agriculture is more than an industry-it is the foundation upon which nations grow. Every harvest, every field, and every farming community depends on reliable technology that improves productivity while preserving sustainability.\n\nDriven by engineering excellence and innovation, Bushra Impex has emerged as one of India's rapidly growing agricultural equipment companies through its flagship brand, X1 Power. Our mission is to empower farmers, entrepreneurs, dealers, and institutions with machinery that combines performance, durability, and value.",
    // Image: 7.a - India map with dealer hotspots / dealership showroom
    images: { map: "/company-overview/images/7.a.png" },
    keyPoints: [
      "Government subsidy programmes accelerating farm mechanisation",
      "Rising labour costs increasing demand for modern machinery",
      "Growing rural infrastructure and agricultural investment",
      "Expanding irrigation, precision farming and mechanised cultivation",
      "Strong long-term opportunity across India's agricultural economy"
    ],
  },

  // ─── SECTION 9: Dealer Network ──────────────────────────────────────
  dealerNetwork: {
    label: "09 - Dealer Network",
    heading: "A Growing Network Built on Strong Partnerships",
    body: "Bushra Impex believes that lasting success is built through trusted partnerships. Our expanding dealer network brings dependable agricultural machinery closer to farmers while strengthening regional service, technical support and customer relationships.",
    // Image: 7.a is shared / or a separate 9.a if needed
    images: { showroom: "/company-overview/images/9.a.png" },
    metrics: [
      { value: "TODO", label: "States Covered" },
      { value: "TODO", label: "Active Dealers" },
      { value: "TODO", label: "Distribution Hubs" },
    ],
    benefits: [
      { icon: "package", title: "Strong Brand Portfolio", description: "Access to 100+ SKUs across 10 product categories with strong market demand." },
      { icon: "truck", title: "Reliable Supply Chain", description: "Centrally managed logistics with North India and South India distribution hubs." },
      { icon: "megaphone", title: "Sales & Marketing Support", description: "Marketing materials, digital presence and campaign support for dealer growth." },
      { icon: "wrench", title: "Technical Training", description: "Comprehensive dealer and technician training programmes." },
      { icon: "handshake", title: "Long-Term Partnership", description: "We invest in our dealers for the long term - not just a single transaction." },
      { icon: "trending-up", title: "Growth Opportunities", description: "Be part of India's fastest-growing agricultural equipment network." },
    ],
    journey: ["Enquiry", "Business Discussion", "Location Assessment", "Approval", "Training", "Product Allocation", "Launch", "Ongoing Support"],
  },

  // ─── SECTION 10: Our Brands ─────────────────────────────────────────
  brands: {
    label: "10 - Our Brands",
    heading: "Brands Built for India's Agricultural Future",
    body: "Bushra Impex operates two complementary brands - Bushra Impex as the corporate entity and X1 Power as the consumer-facing agricultural machinery brand.",
    // Image: 8.a - X1 Power logo + flagship machinery collage
    images: { collage: "/company-overview/images/8.a.png" },
    brandList: [
      {
        name: "Bushra Impex",
        tagline: "The Parent Company",
        description: "Established in 2012, Bushra Impex is the corporate entity responsible for operations, sourcing, distribution and business strategy. Built on Honesty, Integrity and Trustworthiness.",
        established: "2012",
        category: "Corporate",
      },
      {
        name: "X1 Power",
        tagline: "The Agricultural Machinery Brand",
        description: "Born in 2016, X1 Power is the flagship consumer brand delivering high-performance agricultural machinery across power weeders, crop harvesters, chainsaws, sprayers and beyond.",
        established: "2016",
        category: "Agricultural Machinery",
      },
    ],
  },

  // ─── SECTION 11: Product Ecosystem ──────────────────────────────────
  products: {
    label: "11 - Product Ecosystem",
    heading: "A Complete Agricultural Solution",
    body: "X1 Power offers a comprehensive range of agricultural machinery engineered to support every stage of farming - from soil preparation to harvesting, irrigation and maintenance. Over 100+ SKUs available across our portfolio.",
    categories: [
      { name: "Power Weeders", count: "10+", description: "Petrol and diesel weeders from 750cc to 1350cc for all soil types." },
      { name: "Crop Harvesters", count: "8", description: "Brush cutter and crop harvester range from 35cc to 63cc." },
      { name: "Chainsaws", count: "5+", description: "Petrol chainsaws for forestry, pruning and land clearing." },
      { name: "Sprayers & HTP", count: "10+", description: "Portable, power and electric sprayer systems for crop protection." },
      { name: "Water Pumps", count: "6+", description: "Petrol and diesel water pumps for irrigation and water transfer." },
      { name: "Chaff Cutters", count: "4", description: "Animal feed processing machines from basic to premium conveyor belt series." },
      { name: "Earth Augers", count: "2+", description: "Post hole diggers for plantation and construction use." },
      { name: "Lawn Mowers", count: "1+", description: "Petrol lawn mowers for professional and residential turf care." },
      { name: "Tea Harvesters", count: "2", description: "Battery-powered tea harvesters for precision leaf harvesting." },
      { name: "Wood Chippers", count: "2", description: "Gasoline wood chippers for agricultural and forestry waste." },
    ],
  },

  // ─── SECTION 12: Leadership ──────────────────────────────────────────
  leadership: {
    label: "12 - Leadership",
    heading: "Leadership That Builds the Future",
    body: "Bushra Impex is guided by a leadership team committed to responsible growth, engineering excellence and long-term partnerships. Every strategic decision is driven by a shared belief that lasting success is built through quality, trust and continuous improvement.",
    // Image: 9.a - Professional portrait of Mr. Abdul Bari
    // Image: 9.b - Professional portrait of Abdul Rafee
    images: {
      chairman: "/company-overview/images/9.a.png",
      deputy: "/company-overview/images/9.b.png",
    },
    team: [
      {
        name: "Mr. Abdul Bari",
        designation: "Chairman & Founder",
        bio: "The visionary behind Bushra Impex, Mr. Abdul Bari founded the company in 2012 with a mission to bring dependable agricultural machinery to Indian farmers. His leadership has guided Bushra Impex through more than a decade of consistent growth.",
        quote: "We built this company on the belief that honest engineering and trustworthy partnerships create lasting value.",
        philosophy: "Building trust through quality, one farmer at a time.",
      },
      {
        name: "Abdul Rafee",
        designation: "Deputy Director",
        bio: "Abdul Rafee leads strategic business operations and plays a key role in expanding the X1 Power dealer network across India. His focus on operational excellence and long-term partnerships has strengthened Bushra Impex's national presence.",
        vision: "Scaling Bushra Impex's reach through structured dealer partnerships and operational discipline.",
        philosophy: "Growth through people, processes and persistent innovation.",
      },
    ],
    philosophyCards: [
      { icon: "shield", title: "Integrity", description: "Every decision is made with honesty and transparency - in product quality, pricing and partnerships." },
      { icon: "wrench", title: "Engineering Excellence", description: "We invest in product quality, testing and continuous improvement to deliver machinery that performs." },
      { icon: "users", title: "Customer Commitment", description: "Farmers and dealers are at the centre of every business decision we make." },
      { icon: "leaf", title: "Sustainable Growth", description: "We build for the long term - not short-term gains - creating lasting value for all stakeholders." },
    ],
  },

  // ─── SECTION 13: Infrastructure ─────────────────────────────────────
  infrastructure: {
    label: "13 - Infrastructure",
    heading: "Built to Scale",
    body: "Bushra Impex has invested in the operational infrastructure needed to support a growing national business - from centrally located warehousing to regional distribution hubs and experience centres.",
    // Image: 10.a to 10.d - Warehouse / assembly / inventory / dispatch bays
    images: {
      a: "/company-overview/images/10.a.png",
      b: "/company-overview/images/10.b.png",
      c: "/company-overview/images/10.c.png",
      d: "/company-overview/images/10.d.png",
    },
    facilities: [
      { title: "Head Office", location: "Bengaluru, Karnataka", description: "Corporate headquarters managing national operations, finance, product development and dealer management." },
      { title: "North India Stock Point", location: "North India", description: "Strategic warehousing hub enabling faster delivery and support for growing northern dealer network." },
      { title: "Experience Centres", location: "Multiple Locations", description: "Physical demonstration centres where farmers and dealers can see, test and experience X1 Power machinery." },
      { title: "Spare Parts Division", location: "PAN India", description: "Dedicated spare parts availability ensuring after-sales support and minimising machine downtime." },
    ],
  },

  // ─── SECTION 14: Future Roadmap ──────────────────────────────────────
  future: {
    label: "14 - Future Vision & Roadmap",
    heading: "Building the Next Chapter of Agricultural Engineering",
    body: "Bushra Impex's future is guided by continuous improvement, strategic investment and stronger partnerships. Our roadmap focuses on expanding product categories, strengthening our nationwide dealer ecosystem, investing in infrastructure and exploring international opportunities.",
    quote: "The future belongs to organisations that continue to learn, innovate and build lasting partnerships.",
    // Image: 11.a - Sunrise over farmland / inspiring forward-looking image
    images: { feature: "/company-overview/images/11.a.png" },
    roadmap: [
      { period: "2026", milestones: ["Strengthen PAN India dealer network", "Expand product portfolio", "Deepen government partnerships", "Scale towards ₹250 Crore revenue vision"] },
      { period: "Future Plans", milestones: ["Increase infrastructure capacity", "Launch new product categories", "Strengthen North India distribution"] },
      { period: "Strategic Goals", milestones: ["Explore international markets", "Continue engineering innovation"] },
      { period: "Vision", milestones: ["Global agricultural machinery footprint", "Technology-driven product evolution", "Industry-leading dealer ecosystem"] },
    ],
    visionCards: [
      { icon: "globe", title: "Market Expansion", description: "Grow into new regions and strengthen existing dealer relationships nationwide." },
      { icon: "cpu", title: "Product Innovation", description: "Introduce new agricultural solutions and complementary product categories." },
      { icon: "building-2", title: "Infrastructure", description: "Expand experience centres, warehousing and logistics capability." },
      { icon: "globe-2", title: "Global Outlook", description: "Evaluate export and international partnership opportunities." },
    ],
    growthPillars: ["Engineering", "People", "Partnerships", "Innovation"],
    cta: {
      heading: "Let's Build the Future Together",
      primary: { label: "Become a Dealer", href: "/dealer" },
      secondary: { label: "Contact Bushra Impex", href: "/contact" },
    },
  },

  // ─── SECTION 15: Contact ─────────────────────────────────────────────
  contact: {
    label: "15 - Contact & Business Enquiries",
    heading: "Let's Build the Future of Agriculture Together",
    body: "Whether you are exploring dealership opportunities, looking for reliable agricultural machinery or seeking a long-term business partnership, our team is ready to help.",
    // Image: contact office photos can use existing 1.a or specific
    contactCards: [
      { icon: "map-pin", title: "Head Office", detail: "TODO: Bengaluru, Karnataka, India", action: "View on Maps", href: "#" },
      { icon: "phone", title: "Phone", detail: "TODO: +91 XXXXX XXXXX", action: "Call Now", href: "tel:+91XXXXXXXXXX" },
      { icon: "mail", title: "Email", detail: "TODO: info@bushraimpex.com", action: "Send Email", href: "mailto:info@bushraimpex.com" },
      { icon: "message-circle", title: "WhatsApp Business", detail: "Quick connect for dealer & product queries", action: "Message on WhatsApp", href: "https://wa.me/91XXXXXXXXXX" },
      { icon: "clock", title: "Working Hours", detail: "Monday - Saturday, 9:00 AM - 6:00 PM IST", action: null, href: null },
    ],
    enquiryTypes: ["Dealer Enquiry", "Bulk Order", "Spare Parts", "Service & Support", "Media / Press", "General Enquiry"],
  },

  // ─── SECTION 16: Closing ─────────────────────────────────────────────
  closing: {
    label: "16 - Closing",
    heading: "Powering Agriculture. Engineering Reliability.",
    tagline: "Bushra Impex · X1 Power",
    body: "Thank you for taking the time to understand our company. We look forward to building a long-term partnership with you.",
    cta: { label: "Explore Our Products", href: "/products" },
  },

  // ─── SECTION 17: Plans & Goals ───────────────────────────────────────
  goals: {
    label: "17 - Plans & Goals",
    heading: "Strategic Growth Objectives",
    body: "Our roadmap is structured around concrete operational and financial targets that drive global footprint expansion and manufacturing excellence.",
    targets: [
      { metric: "₹250 Cr", title: "Sales Benchmark", desc: "Target sales milestone in the upcoming growth phase." },
      { metric: "₹12 Cr", title: "Future Development", desc: "Investment capital secured to drive R&D and scale manufacturing." },
      { metric: "Global", title: "Exploring New Countries", desc: "Identifying and opening channels in high-opportunity agricultural regions." },
      { metric: "Exports", title: "Global Markets", desc: "Expanding distribution of X1 Power machinery internationally." },
    ]
  }
};

