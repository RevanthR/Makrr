import { MetadataRoute } from "next";

const BASE = "https://makrr.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/admin`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.1 },
  ];
}
