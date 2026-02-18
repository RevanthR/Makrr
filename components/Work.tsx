"use client";

import type { Project } from "@/lib/db/schema";
import { MotionIn } from "@/components/MotionIn";
import { motion } from "framer-motion";

const GRADIENT_MAP: Record<string, string> = {
  "from-amber-900/30 to-amber-700/20": "from-amber-900/30 to-amber-700/20",
  "from-emerald-900/30 to-teal-700/20": "from-emerald-900/30 to-teal-700/20",
  "from-slate-700/30 to-slate-500/20": "from-slate-700/30 to-slate-500/20",
  "from-orange-900/30 to-amber-800/20": "from-orange-900/30 to-amber-800/20",
  "from-violet-900/30 to-indigo-700/20": "from-violet-900/30 to-indigo-700/20",
  "from-stone-800/30 to-amber-900/20": "from-stone-800/30 to-amber-900/20",
  "from-slate-700/30 to-slate-600/20": "from-slate-700/30 to-slate-600/20",
  "from-neutral-800/30 to-zinc-700/20": "from-neutral-800/30 to-zinc-700/20",
};

function getGradientClass(colors: string | null) {
  if (!colors || !GRADIENT_MAP[colors]) return "from-violet-100 to-violet-50";
  return GRADIENT_MAP[colors];
}

export function Work({
  projects = [],
}: {
  projects: Project[];
}) {
  return (
    <section id="work" className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <MotionIn variant="up">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
            Recent work
          </h2>
        </MotionIn>
        <MotionIn stagger={0.09} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.article
              key={project.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div
                className={`relative flex h-40 items-end overflow-hidden bg-gradient-to-br p-4 ${getGradientClass(project.gradientColors)}`}
              >
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                  />
                ) : null}
                <span className="relative font-heading text-2xl font-semibold text-[var(--text)]">
                  {project.projectName}
                </span>
              </div>
              <div className="p-5">
                <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                  {project.projectType}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-[var(--text)]">
                  {project.projectName}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                {project.resultMetric && (
                  <p className="mt-3 text-sm font-semibold text-violet-600">
                    → {project.resultMetric}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </MotionIn>
        <MotionIn>
          <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
            We&apos;re adding new projects regularly. If you want to see more, just
            ask.
          </p>
        </MotionIn>
      </div>
    </section>
  );
}
