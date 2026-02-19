import "dotenv/config";
import * as dotenv from "dotenv";

// Load .env.local so POSTGRES_URL is available when running npm run db:seed
dotenv.config({ path: ".env.local" });

import { getDb } from "../lib/db";
import { projects, testimonials, siteSettings } from "../lib/db/schema";

const seedProjects = [
  {
    projectName: "Wallchemy",
    clientName: "Wallchemy",
    projectType: "Website",
    description:
      "Wallchemy is a luxury texture studio that crafts mineral-rich wall finishes for hospitality, retail, and residences. We built wallchemy.in to match their cinematic, editorial brand: curated finish showcases (Velvet Lime, Amber Micro, Silk Concrete), featured projects, and clear paths to book a meeting or reach them on WhatsApp. The site puts surfaces and atmosphere first.",
    resultMetric: "Live at wallchemy.in. Enquiries and meeting bookings from designers and architects.",
    gradientColors: "from-stone-800/30 to-amber-900/20",
    displayOrder: 0,
  },
  {
    projectName: "The Interior OS",
    clientName: "interiorOS.com",
    projectType: "Website",
    description:
      "The Interior OS needed a web presence that reflected their design-led practice. We delivered interioros.com with clear service pages, project storytelling, and a straightforward contact flow so they can connect with clients and collaborators without friction.",
    resultMetric: "Professional site that matches the quality of their design work",
    gradientColors: "from-slate-700/30 to-slate-600/20",
    displayOrder: 1,
  },
  {
    projectName: "Thought Studios",
    clientName: "thoughtstudios.co",
    projectType: "Website",
    description:
      "Thought Studios works on clarity: decisions, ideas, and strategy for founders and executives. Their site had to feel unhurried and intentional. We built thoughtstudios.co around their philosophy: what they believe, what they explore (Decision & Idea Insights, Business & Startup Perspectives), and Studio notes. Minimal, readable, and true to their voice.",
    resultMetric: "Live at thoughtstudios.co. A site that reflects their approach.",
    gradientColors: "from-neutral-800/30 to-zinc-700/20",
    displayOrder: 2,
  },
];

const seedTestimonials = [
  {
    clientName: "Kavya R.",
    clientTitle: "Wallchemy.in",
    quote:
      "We needed a site that could carry our brand: mineral finishes, light, texture. Makrr understood that from day one. wallchemy.in is fast, easy to update, and we get serious enquiries from designers and architects. No fluff, just what we needed.",
    displayOrder: 0,
  },
  {
    clientName: "Aditya S.",
    clientTitle: "The Interior OS",
    quote:
      "We wanted a web presence that matched the level of our design work. Makrr delivered exactly that: clear, professional, and straightforward. interioros.com is something we're comfortable sharing with every client.",
    displayOrder: 1,
  },
  {
    clientName: "Priya N.",
    clientTitle: "Thought Studios",
    quote:
      "Our work is about clarity and intention. We needed a site that felt the same: unrushed, readable, true to what we do. thoughtstudios.co does that. Makrr got our voice and built something we're proud to point people to.",
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
  console.log("Clearing existing projects and testimonials...");
  await db.delete(projects);
  await db.delete(testimonials);
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
