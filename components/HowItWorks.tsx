import { PROCESS_STEPS } from "@/data/constants";

export function HowItWorks() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
          Simple process. No back-and-forth.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.title} className="relative">
              <span className="font-heading text-4xl font-bold text-violet-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-heading text-lg font-semibold text-[var(--text)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                {step.description}
              </p>
              {i < PROCESS_STEPS.length - 1 && (
                <div className="absolute -right-5 top-8 hidden h-px w-10 bg-[var(--border)] md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
