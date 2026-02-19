"use client";

import type { Testimonial } from "@/lib/db/schema";
import { MotionIn } from "@/components/MotionIn";
import { motion } from "framer-motion";

export function Testimonials({
  testimonials = [],
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section id="testimonials" className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <MotionIn variant="up">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
            From people we&apos;ve worked with
          </h2>
        </MotionIn>
        <MotionIn stagger={0.08} className="mt-12 flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {testimonials.map((t) => (
            <motion.article
              key={t.id}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="min-w-[280px] flex-1 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm md:min-w-0"
            >
              <p className="text-[var(--text)] leading-relaxed">&quot;{t.quote}&quot;</p>
              <div className="mt-4 flex items-center gap-3">
                {t.avatarUrl ? (
                  <img
                    src={t.avatarUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-heading text-sm font-semibold text-violet-700">
                    {t.clientName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-[var(--text)]">{t.clientName}</p>
                  {t.clientTitle && (
                    <p className="text-sm text-[var(--text-muted)]">
                      {t.clientTitle}
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </MotionIn>
      </div>
    </section>
  );
}
