import type { Metadata, Viewport } from "next";
import { Pathway_Extreme } from "next/font/google";
import { MotionConfig } from "motion/react";

import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { contact, socials, youtubeUrl } from "@/lib/site";

const pathway = Pathway_Extreme({
  subsets: ["latin"],
  axes: ["wdth"], // enables the condensed style used by BigWord
  variable: "--font-pathway",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://afaqalbarakha.com";
const SITE_NAME = "Afaq Al Barakha Investment";
const DESCRIPTION =
  "Afaq Al Barakha Investment is a Dubai-based investment company helping individuals and businesses build, protect and grow wealth through strategic investment planning, wealth management, risk management and long-term financial guidance across the UAE.";

/* ───────────── Metadata ───────────── */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Build, Protect & Grow Your Wealth in Dubai`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "investment company Dubai",
    "investment advisory UAE",
    "wealth management Dubai",
    "risk management",
    "portfolio diversification",
    "real estate investment UAE",
    "business investment UAE",
    "financial planning Dubai",
    "Afaq Al Barakha",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "finance",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Build, Protect & Grow Your Wealth`,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}: strategic investment and wealth management in Dubai`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Build, Protect & Grow Your Wealth`,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#010403",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/* ───────────── Structured data (Google) ───────────── */

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Afaq",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description: DESCRIPTION,
  telephone: contact.phoneHref.replace("tel:", ""),
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office No. 501, Al Zarouni Business Center, Sheikh Zayed Road, Al Barsha 1",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  areaServed: { "@type": "Country", name: "United Arab Emirates" },
  hasMap: contact.mapsUrl,
  sameAs: [...socials.map((s) => s.href), youtubeUrl],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

/* ───────────── Layout ───────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pathway.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
          </SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}