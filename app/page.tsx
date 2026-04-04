"use client";

import Link from "next/link";
import "./landing.css";

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <>
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="hero">
          <div className="container">
            <div className="hero__inner">
              <div className="hero__content">
                <div className="hero__eyebrow">
                  <span className="hero__eyebrow-dot" aria-hidden="true" />
                  Coming soon to iPhone
                </div>

                <h1 className="hero__title">
                  One moment.<br />
                  <em>Every day.</em>
                </h1>

                <p className="hero__body">
                  Simple enough to disappear into. Just you, a thought worth sitting
                  with, and as long as you need.
                </p>

                <div className="hero__actions">
                  <div className="hero__store-badge" aria-label="App Store — coming soon">
                    <AppleLogo />
                    <div className="hero__store-badge-label">
                      <span className="hero__store-badge-sub">Download on the</span>
                      <span className="hero__store-badge-name">App Store</span>
                    </div>
                  </div>
                  <span className="hero__coming-soon">iOS — coming soon</span>
                </div>
              </div>

              <div className="hero__visual" aria-hidden="true">
                <div className="bead-scene">
                  <div className="bead-glow" />
                  <div className="bead-ring" />
                  <div className="bead-ring" />
                  <div className="bead-ring" />
                  <div className="bead" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────── */}
        <section className="section section--tight">
          <div className="container--narrow">
            <div className="about">
              <h2 className="about__title">Not another meditation app.</h2>
              <p className="about__body">
                Each day, something waits for you. A single insight — something to
                sit with, to turn over slowly, and carry quietly through your day.
              </p>
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────── */}
        <section className="section section--alt" id="how-it-works">
          <div className="container">
            <p className="section__label">How it works</p>
            <h2 className="section__title">Everything fits in the palm of your hand.</h2>
            <p className="section__body">
              The insight, the stillness, the space to write. The whole practice,
              in one quiet moment.
            </p>

            <div className="steps">
              <div className="step">
                <div className="step__number">01</div>
                <div>
                  <p className="step__title">Something waits for you</p>
                  <p className="step__body">
                    Open the app. There&apos;s always something here for today.
                    Take your time with it — there&apos;s no rush.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step__number">02</div>
                <div>
                  <p className="step__title">Be still for a moment</p>
                  <p className="step__body">
                    Find the Bead. Hold it briefly to begin, then let go and simply
                    be with your thoughts, for as long as you need.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step__number">03</div>
                <div>
                  <p className="step__title">Let it settle</p>
                  <p className="step__body">
                    When you&apos;re done, you may find something has surfaced.
                    There&apos;s a space to write it down — a word, a sentence,
                    or nothing at all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────── */}
        <section className="section" id="features">
          <div className="container">
            <p className="section__label">Features</p>
            <h2 className="section__title">Built with intention. Not addiction.</h2>
            <p className="section__body">
              Every decision in ZenBead asks the same question:
              does this serve the practice, or distract from it?
            </p>

            <div className="features">
              <div className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <p className="feature-card__title">Private by design</p>
                <p className="feature-card__body">
                  Your journal is stored privately and securely. Your personal identity
                  is never attached to anything you do in the app — you&apos;re known
                  here only by a name the app chose for you. Feel free to explore
                  yourself fully, without judgment.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <p className="feature-card__title">A space to reflect</p>
                <p className="feature-card__body">
                  After each session, a quiet space to write down anything that surfaced.
                  Your reflections are saved and travel with you if you choose to
                  create an account.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <p className="feature-card__title">Cross-device sync</p>
                <p className="feature-card__body">
                  Your history and reflections travel with you. Opt into a private
                  account and everything syncs silently across your devices.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <p className="feature-card__title">One gentle reminder</p>
                <p className="feature-card__body">
                  A single daily notification lets you know when a new insight has
                  arrived. Turn it on or off — entirely your call.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <p className="feature-card__title">Free to begin.</p>
                <p className="feature-card__body">
                  The full daily practice is free. ZenBead is built on the belief
                  that the practice itself shouldn&apos;t cost anything.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Standalone statement ──────────────────────────────── */}
        <section className="section section--statement">
          <div className="container--narrow">
            <p className="standalone-statement">
              Every other app is trying to keep you. ZenBead is trying to release you.
            </p>
          </div>
        </section>

        {/* ── About the Insights ───────────────────────────────── */}
        <section className="section section--tight">
          <div className="container--narrow">
            <div className="insights-about">
              <p className="section__label">About the insights</p>
              <h2 className="insights-about__title">One voice, drawn from many.</h2>
              <p className="insights-about__body">
                Each day&apos;s insight is drawn from the broad range of human wisdom —
                philosophy, contemplative tradition, psychology, poetry. No single school
                of thought. No doctrine. Only ideas that have proven, across time and
                culture, to be worth sitting with.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="cta-section">
          <div className="container--narrow">
            <div className="cta-section__bead" aria-hidden="true" />
            <h2 className="cta-section__title">
              Your moment is waiting.
            </h2>
            <p className="cta-section__body">
              Come back tomorrow. A new insight will be here, just for you.
            </p>
            <div className="cta-section__badge-wrap">
              <div className="cta-badge" aria-label="App Store — coming soon">
                <AppleLogo />
                <div className="cta-badge__label">
                  <span className="cta-badge__sub">Download on the</span>
                  <span className="cta-badge__name">App Store</span>
                </div>
              </div>
              <p className="cta-section__soon">iOS — coming soon</p>
            </div>
        </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__brand">
              <div className="footer__bead" aria-hidden="true" />
              <span className="footer__name">ZenBead</span>
            </div>

            <div className="footer__links">
              <Link href="/reflect" className="footer__link">Journal</Link>
              <Link href="/privacy" className="footer__link">Privacy</Link>
              <Link href="/terms" className="footer__link">Terms</Link>
              <Link href="/feedback" className="footer__link">Feedback</Link>
              <Link href="/contact" className="footer__link">Contact</Link>
            </div>

            <p className="footer__copy">
              © {new Date().getFullYear()} ZenBead
            </p>
          </div>
    </div>
      </footer>
    </>
  );
}
