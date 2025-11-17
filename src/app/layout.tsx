import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { SITE_CONFIG } from "@/constants/site";
import Providers from "./providers";

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
    icon: SITE_CONFIG.favicon,
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
