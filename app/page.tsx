import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Packages } from "@/components/Packages";
import { Work } from "@/components/Work";
import { Pricing } from "@/components/Pricing";
import { HowItWorks } from "@/components/HowItWorks";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

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
      <main>
        <Hero />
        <Services />
        <Packages />
        <Work />
        <Pricing />
        <HowItWorks />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
