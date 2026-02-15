"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/data/constants";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Ensure body is scrollable on mount (e.g. after navigation or if state was stuck)
  useEffect(() => {
    document.body.style.overflow = "";
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="#"
            className="font-heading text-xl font-semibold tracking-tight text-[var(--text)]"
            onClick={closeMenu}
          >
            Makrr
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--text-muted)] transition hover:text-violet-600"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="rounded-full bg-gradient-to-r from-violet-800 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:from-violet-900 hover:to-violet-700"
            >
              Start a Project
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="relative z-[60] flex flex-col gap-1.5 p-2 -m-2 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span
              className={`block h-0.5 w-6 bg-[var(--text)] transition duration-200 ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--text)] transition duration-200 ${
                mobileOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--text)] transition duration-200 ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay: above content, below hamburger (z-[60]) */}
      <div
        className={`fixed inset-0 z-[55] bg-white transition-opacity duration-200 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex min-h-full flex-col items-center justify-center gap-8 px-6 pt-20 pb-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-2xl font-medium text-[var(--text)] hover:text-violet-600 active:text-violet-600"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="rounded-full bg-gradient-to-r from-violet-800 to-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-sm"
            onClick={closeMenu}
          >
            Start a Project
          </Link>
        </div>
      </div>
    </>
  );
}
