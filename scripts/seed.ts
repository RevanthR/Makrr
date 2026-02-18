import "dotenv/config";
import * as dotenv from "dotenv";

// Load .env.local so POSTGRES_URL is available when running npm run db:seed
dotenv.config({ path: ".env.local" });

import { getDb } from "../lib/db";
import { projects, testimonials, siteSettings } from "../lib/db/schema";

const seedProjects = [
  {
    projectName: "Brew & Co.",
    clientName: "Brew & Co.",
    projectType: "Website",
    description:
      "A specialty cafe in Jubilee Hills that went from 'just an Instagram page' to a proper online presence with menu, location, and reservations.",
    resultMetric: "Online reservations went from 0 to 40+ per week",
    gradientColors: "from-amber-900/30 to-amber-700/20",
    displayOrder: 0,
  },
  {
    projectName: "FitWithRiya",
    clientName: "Riya S.",
    projectType: "AI Agents + Content",
    description:
      "A fitness creator spending hours on repetitive DMs. We automated the common replies and redesigned her Instagram grid.",
    resultMetric: "Saved 10+ hours a week on DMs alone",
    gradientColors: "from-emerald-900/30 to-teal-700/20",
    displayOrder: 1,
  },
  {
    projectName: "QuickHaul",
    clientName: "QuickHaul",
    projectType: "Web App",
    description:
      "A logistics startup needed an internal dashboard to track shipments. Built and shipped in 3 weeks.",
    resultMetric: "Replaced 4 spreadsheets with one dashboard",
    gradientColors: "from-slate-700/30 to-slate-500/20",
    displayOrder: 2,
  },
  {
    projectName: "The Cumin Trail",
    clientName: "The Cumin Trail",
    projectType: "Website + Content",
    description:
      "A new restaurant in Banjara Hills launching with zero online presence. We built the site and designed their first month of Instagram content.",
    resultMetric: "200+ reservations in their opening month",
    gradientColors: "from-orange-900/30 to-amber-800/20",
    displayOrder: 3,
  },
  {
    projectName: "NoteNest",
    clientName: "NoteNest",
    projectType: "MVP",
    description:
      "An EdTech idea that needed a working product to test with real users. We built the MVP and helped launch to an initial waitlist.",
    resultMetric: "500 signups in the first 2 weeks",
    gradientColors: "from-violet-900/30 to-indigo-700/20",
    displayOrder: 4,
  },
  {
    projectName: "Wallchemy",
    clientName: "Wallchemy",
    projectType: "Website",
    description:
      "Wallchemy.in needed a clean, visual site to showcase their wall art and interior decor range. We built a fast, image-led site that reflects their brand and drives enquiries.",
    resultMetric: "Enquiries up and site loads in under 2 seconds",
    gradientColors: "from-stone-800/30 to-amber-900/20",
    displayOrder: 5,
  },
  {
    projectName: "The Interior OS",
    clientName: "interiorOS.com",
    projectType: "Website",
    description:
      "The Interior OS wanted a professional web presence that matched their design-led offering. We delivered a modern site with clear service pages and a smooth contact flow.",
    resultMetric: "Clean launch and positive feedback from clients",
    gradientColors: "from-slate-700/30 to-slate-600/20",
    displayOrder: 6,
  },
  {
    projectName: "Thought Studios",
    clientName: "thoughtstudios.co",
    projectType: "Website",
    description:
      "Thought Studios needed a portfolio site that felt as considered as their creative work. We built a minimal, responsive site that puts their projects front and centre.",
    resultMetric: "A site they're proud to send to clients",
    gradientColors: "from-neutral-800/30 to-zinc-700/20",
    displayOrder: 7,
  },
];

const seedTestimonials = [
  {
    clientName: "Arjun M.",
    clientTitle: "Brew & Co.",
    quote:
      "They delivered our cafe website in 6 days and it looked better than we expected. Customers actually use the reservation form now. We used to just take calls.",
    displayOrder: 0,
  },
  {
    clientName: "Riya S.",
    clientTitle: "Fitness Creator",
    quote:
      "I needed a portfolio site and help with my Instagram. They handled both, and the auto-reply they set up for my DMs has been a lifesaver.",
    displayOrder: 1,
  },
  {
    clientName: "Vikram P.",
    clientTitle: "QuickHaul",
    quote:
      "We came to them with a rough idea for an internal tool. Two weeks later, we had a working product. That kind of turnaround is rare.",
    displayOrder: 2,
  },
  {
    clientName: "Kavya R.",
    clientTitle: "Wallchemy.in",
    quote:
      "We wanted a site that felt as good as our products. Makrr got it: clean, quick, and easy to update. Enquiries have been much better since we went live.",
    displayOrder: 3,
  },
  {
    clientName: "Aditya S.",
    clientTitle: "The Interior OS",
    quote:
      "Professional and no fuss. They understood our aesthetic and delivered a site we're happy to share with clients. Would work with them again.",
    displayOrder: 4,
  },
  {
    clientName: "Priya N.",
    clientTitle: "Thought Studios",
    quote:
      "Our new site actually represents our work properly. Fast to load, simple to use, and we get compliments on it. Exactly what we needed.",
    displayOrder: 5,
  },
];

const defaultSiteSettings = {
  whatsappNumber: "919876543210",
  whatsappMessage: "Hi, I'd like to discuss a project with Makrr.",
  email: "hello@makrr.in",
  instagramUrl: "https://instagram.com/makrr.in",
  linkedinUrl: "https://linkedin.com/company/makrr",
};

async function seed() {
  const db = getDb();
  console.log("Seeding projects...");
  await db.insert(projects).values(seedProjects.map((p) => ({ ...p, isPublished: true })));
  console.log("Seeding testimonials...");
  await db.insert(testimonials).values(seedTestimonials.map((t) => ({ ...t, isPublished: true })));
  const [existing] = await db.select().from(siteSettings).limit(1);
  if (!existing) {
    console.log("Seeding site settings...");
    await db.insert(siteSettings).values(defaultSiteSettings);
  }
  console.log("Seed complete.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
