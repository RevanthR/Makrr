"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/data/constants";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
          Common questions
        </h2>
        <div className="mt-10 space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={item.q}
              className="rounded-xl border border-[var(--border)] bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-inset rounded-xl"
                aria-expanded={openIndex === i}
              >
                {item.q}
                <span
                  className={`text-[var(--text-muted)] transition ${openIndex === i ? "rotate-180" : ""}`}
                >
                  ↓
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="border-t border-[var(--border)] px-5 py-4 text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
