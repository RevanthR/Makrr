import { ABOUT_COPY } from "@/data/constants";

export function About() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
          A small team that does big work.
        </h2>
        <p className="mt-6 text-[var(--text-muted)] leading-relaxed">
          {ABOUT_COPY.paragraph1}
        </p>
        <p className="mt-4 text-[var(--text-muted)] leading-relaxed">
          {ABOUT_COPY.paragraph2}
        </p>
        <p className="mt-4 text-[var(--text-muted)] leading-relaxed">
          {ABOUT_COPY.founderPlaceholder}
        </p>
      </div>
    </section>
  );
}
