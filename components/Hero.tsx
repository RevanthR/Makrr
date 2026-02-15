"use client";

import Link from "next/link";

function getBookingMonths() {
  const now = new Date();
  const current = now.toLocaleString("en-IN", { month: "long" });
  const next = new Date(now.getFullYear(), now.getMonth() + 1).toLocaleString(
    "en-IN",
    { month: "long" }
  );
  return `${current} and ${next}`;
}

export function Hero() {
  const bookingMonths = getBookingMonths();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Full-screen gradient mesh background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% -20%, var(--hero-from), transparent 50%),
            radial-gradient(ellipse 80% 60% at 80% 50%, var(--hero-via), transparent 45%),
            radial-gradient(ellipse 70% 50% at 20% 80%, var(--hero-to), transparent 45%),
            linear-gradient(180deg, var(--bg) 0%, transparent 50%, var(--bg) 100%)
          `,
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="font-heading text-4xl font-bold leading-[1.12] tracking-tight text-[var(--text)] md:text-5xl lg:text-6xl xl:text-7xl">
          Websites, apps, and content — built fast, built right.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-[var(--text-muted)] leading-relaxed md:text-xl">
          Makrr is a digital studio in Hyderabad. We help businesses and
          creators go from idea to launch — without the long timelines or the
          guesswork.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#contact"
            className="w-full rounded-full bg-gradient-to-r from-violet-800 to-violet-600 px-8 py-4 text-center font-semibold text-white shadow-md shadow-violet-900/20 transition hover:from-violet-900 hover:to-violet-700 sm:w-auto"
          >
            Start a Project →
          </Link>
          <Link
            href="#work"
            className="w-full rounded-full border-2 border-[var(--border-strong)] bg-white/80 px-8 py-4 text-center font-medium text-[var(--text)] backdrop-blur-sm transition hover:border-violet-500 hover:bg-white hover:text-violet-600 sm:w-auto"
          >
            See our work ↓
          </Link>
        </div>
        <p className="mt-6 text-sm text-[var(--text-muted)]" suppressHydrationWarning>
          Currently booking projects for {bookingMonths}.
        </p>
        <button
          type="button"
          onClick={() => {
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-12 inline-flex flex-col items-center gap-2 text-[var(--text-subtle)] transition hover:text-violet-600"
          aria-label="Scroll to content"
        >
          <span className="text-xs font-medium">Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
