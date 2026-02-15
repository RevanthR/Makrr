import Link from "next/link";
import { PACKAGES } from "@/data/constants";

export function Packages() {
  return (
    <section id="packages" className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--bg)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
          Pick a package. Or tell us what you need.
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--text-muted)] leading-relaxed">
          These are our most popular combinations. Each one is designed for a
          specific situation — so you get exactly what you need, nothing you
          don&apos;t.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.name}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-heading text-xl font-semibold text-[var(--text)]">
                {pkg.name}
              </h3>
              <p className="mt-1 font-semibold text-violet-600">{pkg.price}</p>
              <p className="mt-3 text-sm italic text-[var(--text-muted)]">
                {pkg.forYouIf}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-[var(--text-muted)]">
                {pkg.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-violet-600">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                {pkg.timeline}
              </p>
              <p className="mt-2 text-sm text-[var(--text)]">{pkg.tagline}</p>
              <Link
                href="#contact"
                className="mt-6 inline-block rounded-full bg-gradient-to-r from-violet-600 to-amber-500 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:opacity-95"
              >
                {pkg.cta}
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-[var(--text-muted)]">
          Not sure which one fits? Just tell us what you&apos;re trying to do —
          we&apos;ll recommend the right path.
        </p>
        <div className="mt-4 flex justify-center">
          <Link
            href="#contact"
            className="text-sm font-semibold text-violet-600 hover:underline"
          >
            Talk to Us →
          </Link>
        </div>
      </div>
    </section>
  );
}
