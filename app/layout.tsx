import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenbead — One moment. Every day.",
  description:
    "A daily mindfulness app built around a single, quiet ritual. One insight. One breath. One bead. Coming soon to the App Store.",
  metadataBase: new URL("https://zenbead.io"),
  openGraph: {
    title: "Zenbead — One moment. Every day.",
    description:
      "A daily mindfulness app built around a single, quiet ritual. One insight. One breath. One bead.",
    url: "https://zenbead.io",
    siteName: "Zenbead",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenbead — One moment. Every day.",
    description:
      "A daily mindfulness app built around a single, quiet ritual. One insight. One breath. One bead.",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
