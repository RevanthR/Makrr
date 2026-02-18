"use client";

import { SERVICES } from "@/data/constants";
import { ServiceIcon } from "@/components/icons/ServiceIcons";
import { MotionIn } from "@/components/MotionIn";
import { motion } from "framer-motion";

const PILL_COLORS = [
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-amber-100", text: "text-amber-800" },
  { bg: "bg-emerald-100", text: "text-emerald-800" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-sky-100", text: "text-sky-700" },
  { bg: "bg-violet-100", text: "text-violet-700" },
] as const;

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <MotionIn variant="up">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
            Everything you need to look great online.
          </h2>
        </MotionIn>
        <MotionIn stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const pillStyle = PILL_COLORS[i % PILL_COLORS.length];
            return (
              <motion.article
                key={service.title}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition-shadow hover:border-violet-500/30 hover:shadow-lg"
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${pillStyle.bg} ${pillStyle.text}`}>
                  <ServiceIcon title={service.title} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[var(--text)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${pillStyle.bg} ${pillStyle.text}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </MotionIn>
      </div>
    </section>
  );
}
