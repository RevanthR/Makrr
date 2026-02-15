import Link from "next/link";
import { NAV_LINKS } from "@/data/constants";
import type { SocialLinks } from "@/lib/social-links";

export function Footer({ socialLinks }: { socialLinks: SocialLinks }) {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <span className="font-heading text-lg font-semibold text-[var(--text)]">
          Makrr
        </span>
        <nav className="flex flex-wrap justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-muted)] hover:text-violet-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-6 text-sm font-medium text-[var(--text-muted)]">
          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
          >
            WhatsApp
          </a>
          <a
            href={socialLinks.email}
            className="transition hover:text-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
          >
            Email
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
          >
            Instagram
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-sm"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
        © 2026 Makrr. Made in Hyderabad.
      </p>
    </footer>
  );
}
