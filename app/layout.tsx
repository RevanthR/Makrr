import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Makrr — Websites, apps, and content. Built fast, built right.",
  description:
    "Makrr is a digital studio in Hyderabad. We help businesses and creators go from idea to launch — websites, web apps, AI agents, and content.",
  metadataBase: new URL("https://makrr.in"),
  openGraph: {
    title: "Makrr — We make it happen.",
    description:
      "A digital studio in Hyderabad. Websites, web apps, AI agents, and content — built fast, built right.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Makrr — We make it happen.",
    description:
      "A digital studio in Hyderabad. Websites, web apps, AI agents, and content.",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Makrr",
  description:
    "A digital studio in Hyderabad that builds websites, web apps, AI agents, and social media content for local businesses, creators, and startups in India.",
  url: "https://makrr.in",
  areaServed: { "@type": "Country", name: "India" },
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
