"use client";

import Link from "next/link";
import { useState } from "react";
import { NavJournalQrIcon } from "./NavJournalQrIcon";
import { ThemeToggle } from "./ThemeToggle";
import "./landing.css";

const JOURNAL_LINK_LABEL =
  "Journal on your computer — pair with the ZenBead app using a QR code";

/**
 * Shared top navigation (home, reflect / journal entry, etc.) for all pages.
 */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="nav__inner">
            <Link href="/" className="nav__brand">
              <div className="nav__bead" aria-hidden="true" />
              <span className="nav__wordmark">ZenBead</span>
            </Link>

            <div className="nav__right">
              <div className="nav__links">
                <Link href="/#how-it-works" className="nav__link">
                  How it works
                </Link>
                <Link href="/#features" className="nav__link">
                  Features
                </Link>
                <Link href="/feedback" className="nav__link">
                  Feedback
                </Link>
                <Link href="/contact" className="nav__cta">
                  Contact
                </Link>
              </div>
              <Link
                href="/reflect"
                className="nav__link nav__journal-qr"
                aria-label={JOURNAL_LINK_LABEL}
                title={JOURNAL_LINK_LABEL}
              >
                <NavJournalQrIcon />
              </Link>
              <button
                type="button"
                className="nav__mobile-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <span />
                <span />
                <span />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-menu${mobileOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="mobile-menu__close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        <Link
          href="/#how-it-works"
          className="mobile-menu__link"
          onClick={() => setMobileOpen(false)}
        >
          How it works
        </Link>
        <Link
          href="/#features"
          className="mobile-menu__link"
          onClick={() => setMobileOpen(false)}
        >
          Features
        </Link>
        <Link
          href="/reflect"
          className="mobile-menu__link mobile-menu__journal-qr"
          aria-label={JOURNAL_LINK_LABEL}
          title={JOURNAL_LINK_LABEL}
          onClick={() => setMobileOpen(false)}
        >
          <NavJournalQrIcon />
        </Link>
        <Link
          href="/contact"
          className="mobile-menu__link"
          onClick={() => setMobileOpen(false)}
        >
          Contact
        </Link>
        <Link
          href="/feedback"
          className="mobile-menu__link"
          onClick={() => setMobileOpen(false)}
        >
          Feedback
        </Link>
        <Link
          href="/privacy"
          className="mobile-menu__link"
          onClick={() => setMobileOpen(false)}
        >
          Privacy
        </Link>
        <div className="mobile-menu__theme">
          <span className="mobile-menu__theme-label">Appearance</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
