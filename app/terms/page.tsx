import type { Metadata } from "next";
import Link from "next/link";
import "../landing.css";

export const metadata: Metadata = {
  title: "Terms of Service — Zenbead",
  description: "Terms governing your use of Zenbead.",
};

export default function TermsPage() {
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
              <Link href="/contact" className="nav__link">Contact</Link>
              <Link href="/press" className="nav__link">Press</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="legal">
        <div className="container--narrow">
          <h1 className="legal__title">Terms of Service</h1>
          <p className="legal__updated">Last updated: March 2026</p>

          <div className="legal__body">
            <div className="legal__section">
              <h2>Acceptance</h2>
              <p>
                By downloading or using Zenbead ("the App"), you agree to these Terms
                of Service. If you do not agree, please do not use the App. These terms
                apply to all users of the App and this website.
              </p>
            </div>

            <div className="legal__section">
              <h2>What Zenbead is</h2>
              <p>
                Zenbead is a personal mindfulness and journalling application. It is
                designed to support a personal practice of presence and reflection.
                It is not a medical device, a therapy tool, or a substitute for
                professional mental health support.
              </p>
              <p>
                If you are experiencing a mental health crisis, please contact a qualified
                healthcare professional or a crisis support service in your region.
              </p>
            </div>

            <div className="legal__section">
              <h2>Your account</h2>
              <p>
                Zenbead can be used without an account. If you choose to create one,
                you are responsible for maintaining the security of your credentials
                and for all activity that occurs under your account. You must provide
                accurate information and keep it up to date.
              </p>
              <p>
                We reserve the right to suspend or terminate accounts that violate these
                terms or that we reasonably believe pose a risk to the service or other users.
              </p>
            </div>

            <div className="legal__section">
              <h2>Your content</h2>
              <p>
                Any reflections, notes, or other content you write in Zenbead ("User
                Content") remain yours. We claim no ownership over your User Content.
              </p>
              <p>
                By storing User Content through the App, you grant us a limited licence
                to store and transmit that content solely to provide the sync service to
                you. We do not use your content for any other purpose.
              </p>
            </div>

            <div className="legal__section">
              <h2>Acceptable use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the App for any unlawful purpose</li>
                <li>Attempt to reverse-engineer, decompile, or tamper with the App</li>
                <li>Circumvent any security or access controls</li>
                <li>Use the App in a way that could damage or impair the service</li>
                <li>Misrepresent your identity when creating an account</li>
              </ul>
            </div>

            <div className="legal__section">
              <h2>Intellectual property</h2>
              <p>
                The App, its design, graphics, animations, copy, and code are the
                intellectual property of Zenbead and its creators. Nothing in these
                terms grants you any right to use our trademarks, brand marks, or
                proprietary content beyond your personal use of the App.
              </p>
            </div>

            <div className="legal__section">
              <h2>Disclaimer of warranties</h2>
              <p>
                The App is provided "as is" and "as available", without warranty of any
                kind, express or implied. We do not warrant that the App will be
                uninterrupted, error-free, or free of harmful components. We make no
                warranty regarding the accuracy or completeness of the insights provided.
              </p>
            </div>

            <div className="legal__section">
              <h2>Limitation of liability</h2>
              <p>
                To the fullest extent permitted by applicable law, Zenbead and its
                creators shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from your use of or inability
                to use the App. Our total liability shall not exceed the amount you have
                paid to us in the twelve months preceding any claim (which in most cases
                will be zero, as the App is free).
              </p>
            </div>

            <div className="legal__section">
              <h2>Changes to the service</h2>
              <p>
                We may modify, suspend, or discontinue any part of the App at any time.
                We will endeavour to provide reasonable notice of any significant changes.
                Continued use of the App after changes constitutes acceptance of the
                updated Terms.
              </p>
            </div>

            <div className="legal__section">
              <h2>Governing law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of
                South Africa, without regard to conflict of law principles.
              </p>
            </div>

            <div className="legal__section">
              <h2>Contact</h2>
              <p>
                Questions about these Terms? Write to us at{" "}
                <a href="mailto:hello@zenbead.io" style={{ color: 'var(--color-sage)' }}>hello@zenbead.io</a>.
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
              <Link href="/contact" className="footer__link">Contact</Link>
              <Link href="/press" className="footer__link">Press</Link>
            </div>
            <p className="footer__copy">© {new Date().getFullYear()} Zenbead</p>
          </div>
        </div>
      </footer>
    </>
  );
}
