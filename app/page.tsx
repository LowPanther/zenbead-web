"use client";

import { useState } from "react";
import Link from "next/link";
import "./landing.css";

const INSIGHTS = [
  "The present moment is the only moment available to us, and it is the door to all moments.",
  "Wherever you are, be there completely.",
  "In the middle of difficulty lies opportunity.",
  "The quieter you become, the more you are able to hear.",
  "Each morning we are born again. What we do today matters most.",
];

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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav__inner">
            <Link href="/" className="nav__brand">
              <div className="nav__bead" aria-hidden="true" />
              <span className="nav__wordmark">zenbead</span>
            </Link>

            <div className="nav__links">
              <Link href="#how-it-works" className="nav__link">How it works</Link>
              <Link href="#features" className="nav__link">Features</Link>
              <Link href="/press" className="nav__link">Press</Link>
              <Link href="/contact" className="nav__cta">Contact</Link>
            </div>

            <button
              className="nav__mobile-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`} role="dialog" aria-modal="true">
        <button
          className="mobile-menu__close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        <Link href="#how-it-works" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>How it works</Link>
        <Link href="#features" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>Features</Link>
        <Link href="/press" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>Press</Link>
        <Link href="/contact" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>Contact</Link>
        <Link href="/privacy" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>Privacy</Link>
      </div>

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
                  Each day a new insight appears — word by word, quietly. Find the bead.
                  Hold it. Breathe. There&apos;s no target, no streak, no score.
                  Just one minute, and wherever your mind goes from there.
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

        {/* ── Philosophy ────────────────────────────────────────── */}
        <section className="section">
          <div className="container--narrow">
            <div className="philosophy">
              <p className="philosophy__quote">
                &ldquo;There&apos;s no target here. Just one invitation — stay for at least
                one minute and see where your mind goes.&rdquo;
              </p>
              <div className="philosophy__lines">
                <p className="philosophy__line">
                  <strong>A timer will guide you,</strong> then quietly disappear.
                </p>
                <p className="philosophy__line">
                  <strong>Stay as long as feels right.</strong> Come back tomorrow.
                </p>
                <p className="philosophy__line">
                  <strong>A new insight will be here,</strong> just for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────── */}
        <section className="section section--alt" id="how-it-works">
          <div className="container">
            <p className="section__label">How it works</p>
            <h2 className="section__title">Three gestures. No instructions needed.</h2>
            <p className="section__body">
              Zenbead is designed to get out of your way. The whole practice
              fits in the palm of your hand.
            </p>

            <div className="steps">
              <div className="step">
                <div className="step__number">01</div>
                <div>
                  <p className="step__title">Read today&apos;s insight</p>
                  <p className="step__body">
                    A new mindfulness insight is waiting each morning, revealed one word
                    at a time so you actually read it — not just glance.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step__number">02</div>
                <div>
                  <p className="step__title">Swipe up. Find the bead.</p>
                  <p className="step__body">
                    Swipe up to reveal a glowing bead. Hold it to begin your practice.
                    The bead breathes with you. Release when you&apos;re done.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step__number">03</div>
                <div>
                  <p className="step__title">Reflect, if something surfaced</p>
                  <p className="step__body">
                    You might find something has come up. There&apos;s a quiet space to
                    write it down — or not. No pressure. Just possibility.
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
              Every design decision in Zenbead asks the same question:
              does this serve the practice, or distract from it?
            </p>

            <div className="features">
              <div className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <p className="feature-card__title">The timer that disappears</p>
                <p className="feature-card__body">
                  A timer guides your first minute, then quietly fades. You meditate
                  without clock-watching — just presence.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2a9 9 0 1 0 9 9" />
                    <path d="M12 6v6l4 2M20 2l-5 5" />
                  </svg>
                </div>
                <p className="feature-card__title">Daily insights, deterministic</p>
                <p className="feature-card__body">
                  30 carefully chosen mindfulness insights, mapped to dates. The same
                  insight on the same day, every year. Predictable, not algorithmic.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <p className="feature-card__title">Reflection journal</p>
                <p className="feature-card__body">
                  After each session, a quiet prompt: <em>What came up for you?</em>
                  Write freely. Your words are saved privately and sync across devices.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <p className="feature-card__title">Private by design</p>
                <p className="feature-card__body">
                  No social features, no engagement metrics, no notifications designed
                  to pull you back. Your journal never leaves your hands without consent.
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
                  Your beads and reflections travel with you. Opt into a private account
                  and everything syncs silently across your devices.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                </div>
                <p className="feature-card__title">A living bead</p>
                <p className="feature-card__body">
                  The bead is never still — a subtle living swirl of sage and teal at
                  rest, breathing gently as you hold it. Crafted haptics mark the end
                  like a struck gong.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why ZenBead ──────────────────────────────────────── */}
        <section className="section section--alt">
          <div className="container">
            <p className="section__label">Why Zenbead</p>
            <h2 className="section__title">Mindfulness without the noise.</h2>
            <p className="section__body">
              The other apps are built to keep you inside them. Zenbead is built to
              put your phone down.
            </p>

            <div className="compare">
              <div className="compare-card compare-card--them">
                <p className="compare-card__label">Other apps</p>
                <p className="compare-card__title">More is always more</p>
                <ul className="compare-list">
                  <li className="compare-list__item">Guided programmes and tracks to unlock</li>
                  <li className="compare-list__item">Streaks, badges, and achievement systems</li>
                  <li className="compare-list__item">Notifications engineered to re-engage</li>
                  <li className="compare-list__item">Subscriptions with paywalled core features</li>
                  <li className="compare-list__item">Sleep stories, breathing exercises, masterclasses</li>
                </ul>
              </div>

              <div className="compare-card compare-card--us">
                <p className="compare-card__label">Zenbead</p>
                <p className="compare-card__title">One thing, done well</p>
                <ul className="compare-list">
                  <li className="compare-list__item">One daily insight, one bead, one practice</li>
                  <li className="compare-list__item">No streaks. The practice exists without reward</li>
                  <li className="compare-list__item">One optional, gentle daily reminder</li>
                  <li className="compare-list__item">No paywall. The full practice, free</li>
                  <li className="compare-list__item">Quiet minimalism — designed to disappear</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Insights preview ─────────────────────────────────── */}
        <section className="section">
          <div className="container">
            <p className="section__label">Daily insights</p>
            <h2 className="section__title">Something to sit with.</h2>
            <p className="section__body">
              30 rotating insights, thoughtfully chosen. Each one a door into stillness,
              not a performance goal.
            </p>

            <div className="insights-preview">
              {INSIGHTS.map((insight, i) => (
                <blockquote key={i} className="insight-item">
                  &ldquo;{insight}&rdquo;
                </blockquote>
              ))}
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
              Take your time with it. There&apos;s no rush. Let it settle before you move on.
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
              <span className="footer__name">zenbead</span>
            </div>

            <div className="footer__links">
              <Link href="/privacy" className="footer__link">Privacy</Link>
              <Link href="/terms" className="footer__link">Terms</Link>
              <Link href="/contact" className="footer__link">Contact</Link>
              <Link href="/press" className="footer__link">Press</Link>
            </div>

            <p className="footer__copy">
              © {new Date().getFullYear()} Zenbead
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
