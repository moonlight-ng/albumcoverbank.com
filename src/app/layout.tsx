import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import { SITE_CONFIG } from "@/constants/site";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.title} - Explore 5000+ Nigerian Album Covers`,
    template: `%s - ${SITE_CONFIG.title}`,
  },
  metadataBase: new URL(SITE_CONFIG.url),
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords.join(", "),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.title,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.openGraphImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    site: SITE_CONFIG.url,
    card: "summary_large_image",
    images: [
      {
        url: SITE_CONFIG.openGraphImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/icon0.svg", type: "image/svg+xml" },
      { url: "/icon1.png", type: "image/png" },
      { url: SITE_CONFIG.favicon },
    ],
    shortcut: "/icon1.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://plausible.io/js/pa-mgX9mxc4zCwGKdL0417kI.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible = window.plausible || function() {
              (plausible.q = plausible.q || []).push(arguments);
            };
            plausible.init = plausible.init || function(i) {
              plausible.o = i || {};
            };
            plausible.init();
          `}
        </Script>
        {process.env.NODE_ENV === "production" && (
          <Script
            src="https://cdn.visitors.now/v.js"
            data-token="ec5ddf84-4ae4-43cd-b5be-2ffa4a240e1d"
            async
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
