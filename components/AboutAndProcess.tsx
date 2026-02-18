"use client";

import { PROCESS_STEPS } from "@/data/constants";
import { MotionIn } from "@/components/MotionIn";

export function AboutAndProcess() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <MotionIn variant="up" amount={0.2}>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            How we work
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl md:leading-tight">
            Small team. No runaround.
          </h2>
          <p className="mt-4 text-[var(--text-muted)] text-base md:text-lg max-w-xl mx-auto">
            You get our full attention. No handoffs, no long briefs. Founded by ISB alumni with 10+ years in tech.
          </p>
        </MotionIn>

        {/* 4 steps: horizontal on desktop, minimal copy */}
        <MotionIn stagger={0.1} className="mt-16 md:mt-20 relative" amount={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                {/* Connector line (desktop only) */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-gradient-to-r from-violet-200 to-transparent"
                    aria-hidden
                  />
                )}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 font-heading text-2xl font-bold text-violet-700 shadow-sm">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-heading font-semibold text-[var(--text)]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-[var(--text-muted)] leading-snug max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </MotionIn>
      </div>
    </section>
  );
}
