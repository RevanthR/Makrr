import { MetadataRoute } from "next";

const BASE = "https://makrr.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin"] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
