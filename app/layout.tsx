import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://resumemaamey.in";
const GA_MEASUREMENT_ID = "G-X9NX4Z76Y9";
const ADSENSE_PUB_ID = "ca-pub-6119006421731405";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Resume Maamey | Free Modern ATS Resume Builder Online",
    template: "%s | Resume Maamey",
  },
  description:
    "Create professional, ATS-friendly resumes in minutes with Resume Maamey. Real-time preview, modern templates, instant high-quality PDF downloads, completely free.",
  keywords: [
    "resume builder",
    "free resume builder",
    "ats friendly resume builder",
    "create resume online",
    "free resume maker",
    "resume generator pdf",
    "resume maamey",
  ],
  authors: [{ name: "Resume Maamey", url: SITE_URL }],
  creator: "Resume Maamey",
  publisher: "Resume Maamey",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Resume Maamey | Free Modern ATS Resume Builder Online",
    description:
      "Create professional, ATS-friendly resumes in minutes with live preview and instant free PDF download.",
    siteName: "Resume Maamey",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Maamey - Free Online Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Maamey | Free Modern ATS Resume Builder Online",
    description:
      "Create professional, ATS-friendly resumes in minutes with live preview and instant free PDF download.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google6892558ecfa363b8.html",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Resume Maamey",
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    description:
      "Free modern ATS resume builder online. Instant live preview and PDF generation.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google AdSense */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {children}
      </body>
    </html>
  );
}