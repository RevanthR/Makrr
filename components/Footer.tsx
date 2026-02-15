import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/data/constants";

export function Footer() {
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
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-600"
          >
            WhatsApp
          </a>
          <a href={SOCIAL_LINKS.email} className="hover:text-violet-600">
            Email
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-600"
          >
            Instagram
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-600"
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
