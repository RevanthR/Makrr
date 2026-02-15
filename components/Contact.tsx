"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { CONTACT_SERVICE_OPTIONS, CONTACT_BUDGET_OPTIONS } from "@/data/constants";
import type { SocialLinks } from "@/lib/social-links";

export function Contact({ socialLinks }: { socialLinks: SocialLinks }) {
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
            Thank you
          </h2>
          <p className="mt-8 text-lg text-[var(--text)]">
            We&apos;ve received your enquiry and will be in touch within 24 hours.
          </p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            We&apos;ll respond via email or WhatsApp, depending on how you prefer to be reached.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
          Get in touch
        </h2>
        <p className="mt-4 text-[var(--text-muted)]">
          Share your project details below. We&apos;ll respond within 24 hours.
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
              Full name <span className="text-violet-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              placeholder="e.g. Priya Sharma"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text)]">
              Email address <span className="text-violet-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[var(--text)]">
              WhatsApp number <span className="text-[var(--text-muted)] font-normal">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              placeholder="+91 98765 43210"
            />
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              We may use this for a quicker response.
            </p>
          </div>
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-[var(--text)]">
              Service of interest
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
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              placeholder="Briefly describe your project, goals, and preferred timeline. All details are confidential."
            />
          </div>
          <div>
            <label htmlFor="budgetRange" className="block text-sm font-medium text-[var(--text)]">
              Budget range
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
            className="w-full rounded-full bg-gradient-to-r from-violet-800 to-violet-600 px-6 py-4 font-semibold text-white shadow-md shadow-violet-900/20 transition hover:from-violet-900 hover:to-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50"
          >
            {isPending ? "Submitting…" : "Submit enquiry"}
          </button>
        </form>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-muted)]">
          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition hover:text-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
          >
            WhatsApp
          </a>
          <a
            href={socialLinks.email}
            className="font-medium transition hover:text-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
          >
            {socialLinks.email.replace(/^mailto:/i, "") || "Email"}
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition hover:text-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
          >
            Instagram
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition hover:text-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
