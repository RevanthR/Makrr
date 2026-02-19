export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export const SERVICES = [
  {
    title: "Websites",
    description:
      "A site that actually represents your business: fast to load, easy to navigate, and looks the way you always wanted it to.",
    tags: ["Business Sites", "Landing Pages", "Cafe & Restaurant Sites", "Portfolio Sites"],
  },
  {
    title: "Web Applications",
    description:
      "Custom-built tools that fit the way you work. Booking systems, dashboards, or something you're launching: we build it.",
    tags: ["Dashboards", "Booking Systems", "MVPs", "Internal Tools"],
  },
  {
    title: "AI Agents",
    description:
      "The stuff you do 30 times a day on your phone? We make it happen automatically: replies, scheduling, notifications.",
    tags: ["Auto-DM Replies", "WhatsApp Bots", "Social Scheduling", "AI Chatbots"],
  },
  {
    title: "Instagram Content",
    description:
      "Posts, carousels, and reels that look like you have a full design team. (Now you kind of do.)",
    tags: ["Posts", "Carousels", "Reels", "Story Templates"],
  },
  {
    title: "Video Editing",
    description:
      "Send us raw footage, get back polished reels and shorts. Edited to keep people watching.",
    tags: ["Instagram Reels", "YouTube Shorts", "Short-Form Edits"],
  },
  {
    title: "YouTube Thumbnails",
    description:
      "The thumbnail decides if someone clicks. We make ones that stop the scroll.",
    tags: ["Custom Thumbnails", "A/B Variants", "Channel Branding"],
  },
] as const;

export const PACKAGES = [
  {
    name: "Online in a Week",
    price: "₹20,000",
    forYouIf:
      "This is for you if: you need a website and you need it soon.",
    bullets: [
      "A clean, professional website (up to 3 pages)",
      "Mobile-optimized. Looks great on every screen.",
      "Contact or enquiry form that messages you on WhatsApp",
      "Google-ready. Basic SEO, sitemap, indexing.",
      "One round of revisions included",
    ],
    timeline: "Delivered in 5-7 days.",
    tagline:
      "You'll have a website you're proud to share in the time it takes most agencies to send a proposal.",
    cta: "Get Started →",
  },
  {
    name: "Full Presence",
    price: "₹30,000",
    forYouIf:
      "This is for you if you want to show up properly: website, content, and your first AI agent.",
    bullets: [
      "Multi-page website (up to 5 pages) with custom design",
      "10 Instagram posts or carousels, designed to match your brand",
      "1 AI agent setup (auto-reply DMs, WhatsApp notification, or social scheduling)",
      "Google Business profile setup",
      "SEO + analytics setup",
    ],
    timeline: "Delivered in 10-14 days.",
    tagline:
      "Your website, your socials, and your first AI agent. One invoice, one team.",
    cta: "Get Started →",
  },
  {
    name: "Build & Launch",
    price: "₹50,000+",
    forYouIf:
      "This is for you if you're building something custom: an app, a tool, an MVP.",
    bullets: [
      "Custom web application scoped to your needs",
      "User-friendly design. No \"it works but looks terrible\".",
      "Hosting and deployment setup",
      "1 month of post-launch support",
      "Scope and price locked before we start. No surprises.",
    ],
    timeline: "Timeline depends on complexity. We'll tell you exactly how long after scoping.",
    tagline:
      "For founders, operators, and businesses that need something built from scratch.",
    cta: "Let's Scope This →",
  },
] as const;

export const PRICING_ROWS = [
  {
    category: "Websites & Landing Pages",
    items: [
      { name: "Single-page landing page", range: "₹8,000 – ₹15,000", timeline: "3-5 days" },
      { name: "Business website (3-5 pages)", range: "₹18,000 – ₹30,000", timeline: "7-14 days" },
      { name: "Cafe/restaurant website with menu", range: "₹20,000 – ₹28,000", timeline: "5-7 days" },
      { name: "Portfolio/creator website", range: "₹12,000 – ₹20,000", timeline: "5-7 days" },
    ],
  },
  {
    category: "Web Applications",
    items: [
      { name: "Custom web app (dashboard/tool/MVP)", range: "₹50,000 – ₹2,00,000", timeline: "2-8 weeks" },
    ],
  },
  {
    category: "AI Agents",
    items: [
      { name: "Instagram/WhatsApp auto-reply bot", range: "₹8,000 – ₹15,000", timeline: "3-5 days" },
      { name: "Social media auto-posting setup", range: "₹5,000 – ₹10,000", timeline: "2-3 days" },
      { name: "AI chatbot for your website", range: "₹10,000 – ₹20,000", timeline: "5-7 days" },
    ],
  },
  {
    category: "Content & Design",
    items: [
      { name: "Instagram content pack (20 posts)", range: "₹8,000 – ₹15,000", timeline: "5-7 days" },
      { name: "Reels/Shorts editing (10 videos)", range: "₹6,000 – ₹12,000", timeline: "5-7 days" },
      { name: "YouTube thumbnails (10)", range: "₹3,000 – ₹6,000", timeline: "3-5 days" },
    ],
  },
] as const;

export const PROCESS_STEPS = [
  {
    title: "You tell us what you need",
    description:
      "Fill the form or message us on WhatsApp. Two minutes. No 30-page brief needed.",
  },
  {
    title: "We get back with a clear plan",
    description: "Scope, price, and timeline in writing within 48 hours.",
  },
  {
    title: "We build. You stay in the loop.",
    description: "Regular updates as we work. You give feedback, we refine.",
  },
  {
    title: "It goes live. We stick around.",
    description:
      "We handle deployment and give you 6 months of free support after launch.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "How quickly can you start?",
    a: "Usually within 2-3 days of confirming the project. For urgent requests, we've started the same week.",
  },
  {
    q: "What if I need changes after delivery?",
    a: "Every project comes with one round of revisions plus 2 weeks of support. After that, we're happy to help. Just reach out.",
  },
  {
    q: "Can I update the website myself?",
    a: "Yes. We can set it up so you can change text, photos, and menu items without needing us. We'll walk you through it.",
  },
  {
    q: "I'm not in Hyderabad. Can we work together?",
    a: "Of course. Most of our work happens over WhatsApp and video calls. We've worked with people across India.",
  },
  {
    q: "How do payments work?",
    a: "50% to start, 50% on delivery. UPI or bank transfer, whatever is easier. For bigger projects we do milestone-based payments.",
  },
  {
    q: "What's an AI agent? Is it relevant for my business?",
    a: "If you're doing the same task repeatedly (answering DMs, posting on a schedule, follow-ups), an AI agent can handle it. It saves real time every day.",
  },
  {
    q: "My budget is limited. Can we still work together?",
    a: "Our smallest projects start at ₹3,000. If you have a tight budget, we'll figure out what gives you the most value within it.",
  },
] as const;

export const ABOUT_COPY = {
  paragraph1:
    "Makrr is a digital studio in Hyderabad. We kept seeing good businesses stuck with outdated sites, creators wasting hours on repeat tasks, and startups waiting months for something that should take weeks. So we started Makrr.",
  paragraph2:
    "We keep the team small on purpose. It means every project gets our full attention, and you always know who's working on your stuff. We're fast because we're focused, and we're good because we care about the details.",
  founderPlaceholder:
    "Founded by ISB alumni with over 10 years in tech. Real experience on every project, not just templates.",
} as const;

export const CONTACT_SERVICE_OPTIONS = [
  "Website",
  "Web application",
  "AI agents & automation",
  "Content & design",
  "Package (bundle)",
  "Exploring options",
] as const;

export const CONTACT_BUDGET_OPTIONS = [
  "Under ₹10K",
  "₹10K – ₹25K",
  "₹25K – ₹50K",
  "₹50K – ₹1L",
  "₹1L+",
] as const;

export const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/919876543210",
  email: "mailto:hello@makrr.in",
  instagram: "https://instagram.com/makrr.in",
  linkedin: "https://linkedin.com/company/makrr",
} as const;
