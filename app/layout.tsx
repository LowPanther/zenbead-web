import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ZENBEAD_THEME_STORAGE_KEY } from "./themeConstants";
import { SiteHeader } from "./SiteHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZenBead — One moment. Every day.",
  description:
    "A daily mindfulness app built around a single, quiet ritual. One insight. One breath. One bead. Coming soon to the App Store.",
  metadataBase: new URL("https://zenbead.io"),
  openGraph: {
    title: "ZenBead — One moment. Every day.",
    description:
      "A daily mindfulness app built around a single, quiet ritual. One insight. One breath. One bead.",
    url: "https://zenbead.io",
    siteName: "ZenBead",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZenBead — One moment. Every day.",
    description:
      "A daily mindfulness app built around a single, quiet ritual. One insight. One breath. One bead.",
  },
  // Add app/favicon.ico or public/favicon.ico when you have assets; broken /favicon.png
  // caused slow 404 + Turbopack compiles on every load in dev.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeBootstrap = `(function(){try{var k=${JSON.stringify(ZENBEAD_THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <Script id="zenbead-theme-init" strategy="beforeInteractive">
          {themeBootstrap}
        </Script>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
