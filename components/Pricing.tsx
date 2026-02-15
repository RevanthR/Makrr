import { PRICING_ROWS } from "@/data/constants";

const CATEGORY_CONFIG: Record<
  string,
  { bg: string; text: string; label: string; description?: string }
> = {
  "Websites & Landing Pages": {
    bg: "bg-violet-100",
    text: "text-violet-700",
    label: "Websites & Landing Pages",
    description: "From a single page to a full business site",
  },
  "Web Applications": {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    label: "Web Applications",
    description: "Custom tools, dashboards, and MVPs",
  },
  "AI Agents": {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    label: "AI Agents",
    description: "Bots, scheduling, and smart replies",
  },
  "Content & Design": {
    bg: "bg-amber-100",
    text: "text-amber-800",
    label: "Content & Design",
    description: "Social content, video edits, and thumbnails",
  },
};

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--bg)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
          What things cost
        </h2>
        <p className="mt-4 text-[var(--text-muted)]">
          Real prices. No &quot;let&apos;s hop on a call first.&quot;
        </p>

        <div className="mt-12 space-y-14">
          {PRICING_ROWS.map((group) => {
            const config = CATEGORY_CONFIG[group.category] ?? {
              bg: "bg-slate-100",
              text: "text-slate-700",
              label: group.category,
            };
            return (
              <div key={group.category}>
                <div className="mb-4">
                  <h3
                    className={`inline-block rounded-full px-4 py-1.5 font-heading text-sm font-semibold ${config.bg} ${config.text}`}
                  >
                    {config.label}
                  </h3>
                  {config.description && (
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {config.description}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((item) => (
                    <article
                      key={item.name}
                      className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm transition hover:shadow-md"
                    >
                      <h4 className="font-heading font-semibold text-[var(--text)]">
                        {item.name}
                      </h4>
                      <p className="mt-2 text-lg font-semibold text-violet-600">
                        {item.range}
                      </p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {item.timeline}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-sm text-[var(--text-muted)]">
          Every project includes one round of revisions. 50% upfront, 50% on
          delivery. No hidden costs.
        </p>
      </div>
    </section>
  );
}
