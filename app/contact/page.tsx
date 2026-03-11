import type { Metadata } from "next";
import Link from "next/link";
import "../landing.css";

export const metadata: Metadata = {
  title: "Contact — Zenbead",
  description: "Get in touch with the Zenbead team.",
};

export default function ContactPage() {
  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="nav__inner">
            <Link href="/" className="nav__brand">
              <div className="nav__bead" aria-hidden="true" />
              <span className="nav__wordmark">zenbead</span>
            </Link>
            <div className="nav__links">
              <Link href="/privacy" className="nav__link">Privacy</Link>
              <Link href="/press" className="nav__link">Press</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="legal">
        <div className="container--narrow">
          <h1 className="legal__title">Contact</h1>
          <p className="legal__updated">
            We&apos;re a small team. We read every message — just give us a day or two.
          </p>

          <div className="contact-cards">
            <div className="contact-card">
              <p className="contact-card__label">General enquiries</p>
              <a href="mailto:hello@zenbead.io" className="contact-card__value">hello@zenbead.io</a>
              <p className="contact-card__note">
                Questions about the app, feedback, or anything else.
              </p>
            </div>

            <div className="contact-card">
              <p className="contact-card__label">Press &amp; media</p>
              <a href="mailto:press@zenbead.io" className="contact-card__value">press@zenbead.io</a>
              <p className="contact-card__note">
                Interview requests, review copies, brand assets. See also the{" "}
                <Link href="/press" style={{ color: 'var(--color-sage)' }}>Press page</Link>.
              </p>
            </div>

            <div className="contact-card">
              <p className="contact-card__label">Privacy &amp; data</p>
              <a href="mailto:privacy@zenbead.io" className="contact-card__value">privacy@zenbead.io</a>
              <p className="contact-card__note">
                Data requests, account deletion, or privacy questions.
              </p>
            </div>

            <div className="contact-card">
              <p className="contact-card__label">Support</p>
              <a href="mailto:support@zenbead.io" className="contact-card__value">support@zenbead.io</a>
              <p className="contact-card__note">
                Technical issues or bug reports.
              </p>
            </div>
          </div>

          <div className="legal__body" style={{ marginTop: 'var(--space-16)' }}>
            <div className="legal__section">
              <h2>A note from us</h2>
              <p>
                Zenbead was made by a very small team who care deeply about getting it
                right. If something isn&apos;t working, or you have an idea that would
                make the practice better, we genuinely want to hear it.
              </p>
              <p>
                We won&apos;t always be able to reply individually, but we read everything
                and it all informs how the app grows.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__brand">
              <div className="footer__bead" aria-hidden="true" />
              <span className="footer__name">zenbead</span>
            </div>
            <div className="footer__links">
              <Link href="/" className="footer__link">Home</Link>
              <Link href="/privacy" className="footer__link">Privacy</Link>
              <Link href="/terms" className="footer__link">Terms</Link>
              <Link href="/press" className="footer__link">Press</Link>
            </div>
            <p className="footer__copy">© {new Date().getFullYear()} Zenbead</p>
          </div>
        </div>
      </footer>
    </>
  );
}
