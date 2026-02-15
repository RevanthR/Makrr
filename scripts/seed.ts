import "dotenv/config";
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
];

const seedTestimonials = [
  {
    clientName: "Arjun M.",
    clientTitle: "Brew & Co.",
    quote:
      "They delivered our cafe website in 6 days and it looked better than what we expected. Customers actually use the reservation form now — we used to just take calls.",
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
  await db.insert(projects).values(seedProjects).onConflictDoNothing();
  console.log("Seeding testimonials...");
  await db.insert(testimonials).values(seedTestimonials).onConflictDoNothing();
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
