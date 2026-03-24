import type { Metadata } from "next";
import Link from "next/link";
import { FeedbackForm } from "./FeedbackForm";
import "../landing.css";

export const metadata: Metadata = {
  title: "Feedback — ZenBead",
  description:
    "Share ideas, bugs, or suggestions. Optional email if you would like a reply.",
};

export default function FeedbackPage() {
  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="nav__inner">
            <Link href="/" className="nav__brand">
              <div className="nav__bead" aria-hidden="true" />
              <span className="nav__wordmark">ZenBead</span>
            </Link>
            <div className="nav__links">
              <Link href="/privacy" className="nav__link">
                Privacy
              </Link>
              <Link href="/contact" className="nav__link">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="legal">
        <div className="container--narrow">
          <h1 className="legal__title">Feedback</h1>
          <p className="legal__updated">
            Ideas, rough edges, or anything that would make ZenBead better for you.
            If you want a reply, leave your email — we only use it to follow up.
          </p>

          <FeedbackForm />

          <div className="legal__body" style={{ marginTop: "var(--space-16)" }}>
            <div className="legal__section">
              <p className="contact-card__note">
                Sending feedback doesn&apos;t create an account. See our{" "}
                <Link
                  href="/privacy"
                  className="contact-card__value"
                  style={{ fontSize: "inherit" }}
                >
                  Privacy Policy
                </Link>{" "}
                for how we handle data.
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
              <span className="footer__name">ZenBead</span>
            </div>
            <div className="footer__links">
              <Link href="/" className="footer__link">
                Home
              </Link>
              <Link href="/privacy" className="footer__link">
                Privacy
              </Link>
              <Link href="/terms" className="footer__link">
                Terms
              </Link>
              <Link href="/feedback" className="footer__link">
                Feedback
              </Link>
              <Link href="/contact" className="footer__link">
                Contact
              </Link>
            </div>
            <p className="footer__copy">© {new Date().getFullYear()} ZenBead</p>
          </div>
        </div>
      </footer>
    </>
  );
}
