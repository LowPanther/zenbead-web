import type { Metadata } from "next";
import Link from "next/link";
import "../landing.css";

export const metadata: Metadata = {
  title: "Privacy Policy — Zenbead",
  description: "How Zenbead handles your data.",
};

export default function PrivacyPage() {
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
          <h1 className="legal__title">Privacy Policy</h1>
          <p className="legal__updated">Last updated: March 2026</p>

          <div className="legal__body">
            <div className="legal__section">
              <h2>Overview</h2>
              <p>
                Zenbead is a personal mindfulness app. We designed it to be private
                by default — your journal is yours, and we collect as little as possible
                to make the app work. This policy explains exactly what we collect, why,
                and how you can control it.
              </p>
            </div>

            <div className="legal__section">
              <h2>What we collect</h2>
              <p>
                Zenbead works fully offline for the core practice (reading the insight,
                holding the bead, writing a reflection). If you choose to create a private
                account for cross-device sync, we collect:
              </p>
              <ul>
                <li>An anonymous user ID (generated automatically — no name or email required by default)</li>
                <li>Your session history: date, duration, and any reflection text you write</li>
                <li>Your chosen notification time preference (stored locally on device)</li>
                <li>If you use Sign in with Apple or email/password: the associated email address</li>
              </ul>
              <p>
                We do not collect location data, contacts, camera or microphone access,
                advertising identifiers, or any data for the purpose of profiling or targeting.
              </p>
            </div>

            <div className="legal__section">
              <h2>How we use your data</h2>
              <p>We use the data we collect for exactly one purpose: making the app work for you.</p>
              <ul>
                <li>Session data is stored so your history persists across time and devices</li>
                <li>Reflection text is stored privately and never read by us or shared</li>
                <li>Authentication data is used only to identify your account securely</li>
              </ul>
              <p>
                We do not sell, share, or rent your data to any third party. We do not use
                your data for advertising. We do not analyse the content of your reflections.
              </p>
            </div>

            <div className="legal__section">
              <h2>Cloud storage</h2>
              <p>
                If you opt into account creation, your data is stored securely in Google
                Firebase / Firestore. Firebase is a Google Cloud product with strong security
                and compliance standards (SOC 2, ISO 27001). Data is encrypted in transit
                and at rest. We access Firebase as data processor only, under Google&apos;s
                standard terms.
              </p>
            </div>

            <div className="legal__section">
              <h2>Local-only usage</h2>
              <p>
                If you never create an account, all your data stays on your device only.
                We have no access to it. If you delete the app, that data is gone.
              </p>
            </div>

            <div className="legal__section">
              <h2>Push notifications</h2>
              <p>
                Zenbead can send one optional daily reminder: <em>"Your daily insight is here."</em>
                Notifications require your permission, are scheduled locally on your device,
                and can be turned off at any time in Settings. We do not send marketing
                or re-engagement notifications.
              </p>
            </div>

            <div className="legal__section">
              <h2>Your rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access the data we hold about you</li>
                <li>Delete your account and all associated data at any time from within the app</li>
                <li>Export your session history and reflections</li>
                <li>Use the app entirely without an account (no data leaves your device)</li>
              </ul>
              <p>To exercise any of these rights, contact us at <a href="mailto:hello@zenbead.io" style={{ color: 'var(--color-sage)' }}>hello@zenbead.io</a>.</p>
            </div>

            <div className="legal__section">
              <h2>Children</h2>
              <p>
                Zenbead is not directed at children under 13. We do not knowingly collect
                data from children under 13. If you believe a child has provided us with
                personal data, please contact us and we will delete it promptly.
              </p>
            </div>

            <div className="legal__section">
              <h2>Changes to this policy</h2>
              <p>
                We may update this policy as the app evolves. We&apos;ll note the date of
                the most recent change at the top. Continued use of the app after changes
                are posted constitutes acceptance of the updated policy.
              </p>
            </div>

            <div className="legal__section">
              <h2>Contact</h2>
              <p>
                Questions about privacy? Reach us at{" "}
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
              <Link href="/terms" className="footer__link">Terms</Link>
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
