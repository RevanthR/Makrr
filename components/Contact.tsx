"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import {
  CONTACT_SERVICE_OPTIONS,
  CONTACT_BUDGET_OPTIONS,
  SOCIAL_LINKS,
} from "@/data/constants";

export function Contact() {
  const [state, setState] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setState(null);
    const result = await submitContactForm(formData);
    setState(result);
    setIsPending(false);
  }

  if (state?.success) {
    return (
      <section id="contact" className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
            Let&apos;s get started.
          </h2>
          <p className="mt-8 text-lg text-[var(--text)]">
            We&apos;ve got it. Expect to hear from us within 24 hours.
          </p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Check your email (and WhatsApp if you shared it).
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
          Let&apos;s get started.
        </h2>
        <p className="mt-4 text-[var(--text-muted)]">
          Tell us what you&apos;re working on. We&apos;ll respond within 24 hours.
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit(new FormData(e.currentTarget));
          }}
          className="mt-8 space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--text)]">
              Your Name <span className="text-violet-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text)]">
              Email <span className="text-violet-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[var(--text)]">
              WhatsApp Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              placeholder="+91 98765 43210"
            />
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Fastest way to reach you
            </p>
          </div>
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-[var(--text)]">
              What are you looking for?
            </label>
            <select
              id="serviceType"
              name="serviceType"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            >
              {CONTACT_SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--text)]">
              Anything else you&apos;d like to share?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              placeholder="What's the project about? Any timeline in mind? Just give us a rough idea."
            />
          </div>
          <div>
            <label htmlFor="budgetRange" className="block text-sm font-medium text-[var(--text)]">
              Budget
            </label>
            <select
              id="budgetRange"
              name="budgetRange"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            >
              {CONTACT_BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          {state?.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-gradient-to-r from-violet-600 to-amber-500 px-6 py-4 font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:opacity-95 disabled:opacity-50"
          >
            {isPending ? "Sending…" : "Send →"}
          </button>
        </form>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-muted)]">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-violet-600"
          >
            WhatsApp
          </a>
          <a
            href={SOCIAL_LINKS.email}
            className="font-medium hover:text-violet-600"
          >
            hello@makrr.in
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-violet-600"
          >
            @makrr.in
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-violet-600"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
