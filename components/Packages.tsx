"use client";

import Link from "next/link";
import { PACKAGES } from "@/data/constants";
import { MotionIn } from "@/components/MotionIn";
import { motion } from "framer-motion";

const PACKAGE_META: Array<{ label: string; tagline: string; accent: string; featured?: boolean }> = [
  { label: "Starter", tagline: "Website only", accent: "violet" },
  { label: "Most popular", tagline: "Website + content + AI", accent: "emerald", featured: true },
  { label: "Custom build", tagline: "Apps & MVPs", accent: "slate" },
];

export function Packages() {
  return (
    <section id="packages" className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--bg)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <MotionIn variant="up">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
            Pick a package. Or tell us what you need.
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-muted)] leading-relaxed">
            Each package is built for a specific situation. You get what you need, nothing you don&apos;t.
          </p>
        </MotionIn>
        <MotionIn stagger={0.1} className="mt-12 grid gap-6 lg:gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => {
            const meta = PACKAGE_META[i];
            const isFeatured = meta?.featured ?? false;
            return (
              <motion.article
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 shadow-sm transition hover:shadow-lg ${
                  isFeatured
                    ? "border-emerald-500/60 ring-2 ring-emerald-500/15"
                    : "border-[var(--border)] hover:border-violet-500/40"
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-semibold text-white">
                    {meta?.label}
                  </span>
                )}
                {!isFeatured && meta?.label && (
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">
                    {meta.label}
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold text-[var(--text)] mt-1">
                  {pkg.name}
                </h3>
                {meta?.tagline && (
                  <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                    {meta.tagline}
                  </p>
                )}
                <p className="mt-4 text-2xl font-bold text-violet-600">
                  {pkg.price}
                </p>
                <div className="mt-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-subtle)] mb-1">
                    Best for
                  </p>
                  <p className="text-sm text-[var(--text)] leading-snug">
                    {pkg.forYouIf.replace(/^This is for you if:\s*/i, "").trim()}
                  </p>
                </div>
                <ul className="mt-5 flex-1 space-y-3 text-sm text-[var(--text-muted)]">
                  {pkg.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-bold">✓</span>
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-lg bg-violet-50/80 border border-violet-100 px-3 py-2">
                  <p className="text-xs font-medium text-violet-700">
                    {pkg.timeline}
                  </p>
                </div>
                <p className="mt-3 text-sm text-[var(--text)] leading-snug">
                  {pkg.tagline}
                </p>
                <Link
                  href="#contact"
                  className={`mt-6 block w-full rounded-xl py-3.5 text-center text-sm font-semibold transition ${
                    isFeatured
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-900/20"
                      : "bg-gradient-to-r from-violet-800 to-violet-600 text-white hover:from-violet-900 hover:to-violet-700 shadow-sm"
                  }`}
                >
                  {pkg.cta}
                </Link>
              </motion.article>
            );
          })}
        </MotionIn>
        <MotionIn>
        <p className="mt-10 text-center text-[var(--text-muted)]">
          Not sure which one fits? Tell us what you&apos;re trying to do and we&apos;ll recommend the right path.
        </p>
        <div className="mt-4 flex justify-center">
          <Link
            href="#contact"
            className="text-sm font-semibold text-violet-600 hover:underline"
          >
            Talk to Us →
          </Link>
        </div>
        </MotionIn>
      </div>
    </section>
  );
}
