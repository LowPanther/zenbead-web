"use client";

import { useCallback, useEffect, useState } from "react";
import { ZENBEAD_THEME_CHANGE_EVENT, ZENBEAD_THEME_STORAGE_KEY } from "./themeConstants";

export type ZenBeadTheme = "light" | "dark";

function readThemeFromDom(): ZenBeadTheme {
  const raw = document.documentElement.getAttribute("data-theme");
  return raw === "light" || raw === "dark" ? raw : "dark";
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M21 14.5A7.5 7.5 0 0 1 9.5 3 6 6 0 1 0 21 14.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ZenBeadTheme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(readThemeFromDom());

    const onExternalChange = (e: Event) => {
      const ce = e as CustomEvent<ZenBeadTheme>;
      if (ce.detail === "light" || ce.detail === "dark") {
        setTheme(ce.detail);
      }
    };
    window.addEventListener(ZENBEAD_THEME_CHANGE_EVENT, onExternalChange);
    return () => window.removeEventListener(ZENBEAD_THEME_CHANGE_EVENT, onExternalChange);
  }, []);

  const applyTheme = useCallback((next: ZenBeadTheme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(ZENBEAD_THEME_STORAGE_KEY, next);
    } catch {
      /* private mode */
    }
    setTheme(next);
    window.dispatchEvent(new CustomEvent(ZENBEAD_THEME_CHANGE_EVENT, { detail: next }));
  }, []);

  const toggle = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [applyTheme, theme]);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="theme-toggle__icon" data-visible={isDark}>
        <SunIcon />
      </span>
      <span className="theme-toggle__icon" data-visible={!isDark}>
        <MoonIcon />
      </span>
    </button>
  );
}
