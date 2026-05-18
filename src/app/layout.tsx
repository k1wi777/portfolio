import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

// ─── Fonts ─────────────────────────────────────────────────────────────────
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// ─── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "jose padilla — Frontend Developer",
    template: "%s | jose padilla",
  },
  description:
    "Frontend Developer especializado en interfaces modernas, animaciones y experiencias digitales únicas.",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "UI/UX"],
  authors: [{ name: "jose padilla" }],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://josepadilla.dev",
    siteName: "jose padilla — Portfolio",
    title: "jose padilla — Frontend Developer",
    description:
      "Frontend Developer especializado en interfaces modernas, animaciones y experiencias digitales únicas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "jose padilla — Frontend Developer",
    description:
      "Frontend Developer especializado en interfaces modernas, animaciones y experiencias digitales únicas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Root Layout ───────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Lenis smooth scroll wraps everything */}
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
