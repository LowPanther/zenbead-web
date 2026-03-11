import type { Metadata } from "next";
import Link from "next/link";
import "../landing.css";

export const metadata: Metadata = {
  title: "Press — Zenbead",
  description: "Brand assets, facts, and media resources for Zenbead.",
};

export default function PressPage() {
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
            </div>
          </div>
        </div>
      </nav>

      <main className="legal">
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <h1 className="legal__title">Press</h1>
            <p className="legal__updated">
              Brand assets, factsheet, and media contact for Zenbead.
              For interview requests or review copies, write to{" "}
              <a href="mailto:press@zenbead.io" style={{ color: 'var(--color-sage)' }}>press@zenbead.io</a>.
            </p>
          </div>

          {/* Factsheet */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <p className="section__label" style={{ marginBottom: 'var(--space-6)' }}>About Zenbead</p>
            <div className="press-facts">
              <div className="press-fact">
                <p className="press-fact__label">App name</p>
                <p className="press-fact__value">Zenbead</p>
              </div>
              <div className="press-fact">
                <p className="press-fact__label">Platform</p>
                <p className="press-fact__value">iOS (iPhone)</p>
              </div>
              <div className="press-fact">
                <p className="press-fact__label">Status</p>
                <p className="press-fact__value">Coming soon to the App Store</p>
              </div>
              <div className="press-fact">
                <p className="press-fact__label">Price</p>
                <p className="press-fact__value">Free</p>
              </div>
              <div className="press-fact">
                <p className="press-fact__label">Category</p>
                <p className="press-fact__value">Health &amp; Fitness / Mindfulness</p>
              </div>
              <div className="press-fact">
                <p className="press-fact__label">Developer</p>
                <p className="press-fact__value">Justin Duncan</p>
              </div>
              <div className="press-fact">
                <p className="press-fact__label">Website</p>
                <p className="press-fact__value">
                  <a href="https://zenbead.io" style={{ color: 'var(--color-sage)' }}>zenbead.io</a>
                </p>
              </div>
              <div className="press-fact">
                <p className="press-fact__label">Contact</p>
                <p className="press-fact__value">
                  <a href="mailto:press@zenbead.io" style={{ color: 'var(--color-sage)' }}>press@zenbead.io</a>
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="legal__body" style={{ marginBottom: 'var(--space-16)', maxWidth: '680px' }}>
            <div className="legal__section">
              <h2>Short description (one line)</h2>
              <p>
                Zenbead is a daily mindfulness app built around a single, quiet ritual —
                one insight, one breath, one bead.
              </p>
            </div>

            <div className="legal__section">
              <h2>Medium description (paragraph)</h2>
              <p>
                Zenbead is a minimalist iOS mindfulness app that strips daily practice
                down to its essence. Each day a new insight appears, word by word. Swipe
                up to find the Bead — a living, glowing orb. Hold it to begin meditating.
                A timer guides you for the first minute, then quietly disappears. When
                you&apos;re done, a private space waits for any thoughts that surfaced.
                No streaks, no subscriptions, no noise. Just one moment, every day.
              </p>
            </div>

            <div className="legal__section">
              <h2>Long description</h2>
              <p>
                In a market crowded with feature-heavy meditation platforms, Zenbead
                takes the opposite position: radical simplicity in service of genuine
                practice. The app offers one thing — a daily mindfulness ritual — executed
                with exceptional craft.
              </p>
              <p>
                Each morning a new insight arrives, revealed one word at a time to
                encourage genuine reading rather than skimming. A gentle swipe surfaces
                the Bead: a luminous animated orb whose colours draw from a palette of
                sage, eucalyptus, and deep teal. Pressing and holding begins the
                meditation. The app displays a timer for the first 60 seconds — long
                enough to orient, brief enough not to distract — then it silently
                disappears. There is no target. The only invitation is to stay for at
                least one minute.
              </p>
              <p>
                On release, a struck-gong haptic pattern marks the moment. If thoughts
                or feelings arose, a private reflection space is offered. Entries sync
                across devices through an optional anonymous account — nothing personal
                is shared.
              </p>
              <p>
                Zenbead is free, with no paywall, no social features, and no engagement
                mechanics. It is built to be put down.
              </p>
            </div>
          </div>

          {/* Brand assets */}
          <p className="section__label" style={{ marginBottom: 'var(--space-6)' }}>Brand assets</p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-8)' }}>
            Full brand kit available on request. Email{" "}
            <a href="mailto:press@zenbead.io" style={{ color: 'var(--color-sage)' }}>press@zenbead.io</a>.
          </p>

          <div className="press-grid">
            <div className="press-asset">
              <div className="press-asset__preview">
                <div className="press-asset__bead-preview" aria-hidden="true" />
              </div>
              <p className="press-asset__title">App Icon</p>
              <p className="press-asset__desc">
                The Zenbead icon — a glowing bead on a deep teal background.
                Available in 1024×1024 PNG.
              </p>
              <span className="press-download">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Available on request
              </span>
            </div>

            <div className="press-asset">
              <div className="press-asset__preview" style={{ background: 'var(--color-text-primary)' }}>
                <span style={{ fontFamily: 'system-ui', fontSize: '28px', fontWeight: 300, color: 'var(--color-bg)', letterSpacing: '-0.04em' }}>
                  zenbead
                </span>
              </div>
              <p className="press-asset__title">Wordmark — Dark</p>
              <p className="press-asset__desc">
                Zenbead logotype on white/light background. SVG and PNG formats.
              </p>
              <span className="press-download">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Available on request
              </span>
            </div>

            <div className="press-asset">
              <div className="press-asset__preview" style={{ background: '#080C0D' }}>
                <span style={{ fontFamily: 'system-ui', fontSize: '28px', fontWeight: 300, color: '#F0EDE8', letterSpacing: '-0.04em' }}>
                  zenbead
                </span>
              </div>
              <p className="press-asset__title">Wordmark — Light</p>
              <p className="press-asset__desc">
                Zenbead logotype on dark background. SVG and PNG formats.
              </p>
              <span className="press-download">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Available on request
              </span>
            </div>
          </div>

          {/* Colour palette */}
          <div style={{ marginTop: 'var(--space-16)' }}>
            <p className="section__label" style={{ marginBottom: 'var(--space-6)' }}>Brand colours</p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              {[
                { name: 'Sage', hex: '#84A98C' },
                { name: 'Eucalyptus', hex: '#52796F' },
                { name: 'Deep Teal', hex: '#354F52' },
                { name: 'Night Tide', hex: '#2F3E46' },
                { name: 'Mist', hex: '#CAD2C5' },
              ].map(({ name, hex }) => (
                <div key={hex} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-md)',
                    background: hex,
                    border: '1px solid rgba(255,255,255,0.06)',
                  }} aria-hidden="true" />
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{name}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{hex}</span>
                </div>
              ))}
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
              <Link href="/contact" className="footer__link">Contact</Link>
            </div>
            <p className="footer__copy">© {new Date().getFullYear()} Zenbead</p>
          </div>
        </div>
      </footer>
    </>
  );
}
