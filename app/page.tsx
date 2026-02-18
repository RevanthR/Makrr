import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import {
  getSiteSettings,
  getPublishedProjects,
  getPublishedTestimonials,
} from "@/lib/db/queries";
import { getSocialLinks } from "@/lib/social-links";
import { SOCIAL_LINKS } from "@/data/constants";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Packages } from "@/components/Packages";
import { Contact } from "@/components/Contact";
import { Work } from "@/components/Work";
import { AboutAndProcess } from "@/components/AboutAndProcess";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ScrollLineAndCubes } from "@/components/ScrollLineAndCubes";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DATA_TIMEOUT_MS = 5_000;

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

const getCachedSettings = unstable_cache(getSiteSettings, ["site-settings"], {
  revalidate: 60,
  tags: ["site-settings"],
});
const getCachedProjects = unstable_cache(getPublishedProjects, ["projects"], {
  revalidate: 60,
  tags: ["projects"],
});
const getCachedTestimonials = unstable_cache(
  getPublishedTestimonials,
  ["testimonials"],
  { revalidate: 60, tags: ["testimonials"] }
);

const defaultSocialLinks = {
  whatsapp: SOCIAL_LINKS.whatsapp,
  email: SOCIAL_LINKS.email,
  instagram: SOCIAL_LINKS.instagram,
  linkedin: SOCIAL_LINKS.linkedin,
};

async function getHomeData(): Promise<{
  socialLinks: ReturnType<typeof getSocialLinks>;
  projects: Awaited<ReturnType<typeof getPublishedProjects>>;
  testimonials: Awaited<ReturnType<typeof getPublishedTestimonials>>;
}> {
  const isDev = process.env.NODE_ENV === "development";
  const getSettings = isDev ? getSiteSettings : getCachedSettings;
  const getProjects = isDev ? getPublishedProjects : getCachedProjects;
  const getTestimonials = isDev ? getPublishedTestimonials : getCachedTestimonials;

  try {
    const [settings, projects, testimonials] = await Promise.all([
      withTimeout(
        Promise.resolve().then(() => getSettings()).catch(() => null),
        DATA_TIMEOUT_MS,
        null
      ),
      withTimeout(
        Promise.resolve().then(() => getProjects()).catch(() => []),
        DATA_TIMEOUT_MS,
        []
      ),
      withTimeout(
        Promise.resolve().then(() => getTestimonials()).catch(() => []),
        DATA_TIMEOUT_MS,
        []
      ),
    ]);
    return {
      socialLinks: getSocialLinks(settings),
      projects: Array.isArray(projects) ? projects : [],
      testimonials: Array.isArray(testimonials) ? testimonials : [],
    };
  } catch {
    return {
      socialLinks: defaultSocialLinks,
      projects: [],
      testimonials: [],
    };
  }
}

function HomeContent({
  socialLinks,
  projects,
  testimonials,
}: {
  socialLinks: ReturnType<typeof getSocialLinks>;
  projects: Awaited<ReturnType<typeof getPublishedProjects>>;
  testimonials: Awaited<ReturnType<typeof getPublishedTestimonials>>;
}) {
  return (
    <>
      <Contact socialLinks={socialLinks} />
      <Work projects={projects} />
      <AboutAndProcess />
      <Testimonials testimonials={testimonials} />
      <FAQ />
      <Footer socialLinks={socialLinks} />
    </>
  );
}

async function HomeData() {
  const data = await getHomeData();
  return <HomeContent {...data} />;
}

export default function Home() {
  return (
    <>
      <noscript>
        <div style={{ padding: "2rem", textAlign: "center", fontFamily: "system-ui" }}>
          <h1>Makrr</h1>
          <p>We make it happen. A digital studio in Hyderabad.</p>
          <p>Please enable JavaScript to view this site, or contact us at hello@makrr.in</p>
        </div>
      </noscript>
      <Navbar />
      <ScrollLineAndCubes />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Packages />
        <Suspense
          fallback={
            <HomeContent
              socialLinks={defaultSocialLinks}
              projects={[]}
              testimonials={[]}
            />
          }
        >
          <HomeData />
        </Suspense>
      </main>
    </>
  );
}
