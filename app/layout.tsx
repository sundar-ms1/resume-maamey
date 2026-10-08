import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

const SITE_URL = "https://www.resumemaamey.in";
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
      <body className="min-h-screen bg-canvas text-ink antialiased flex flex-col">
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

        {/* Main Content View */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="w-full bg-white border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8 mt-auto print:hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <span className="font-semibold text-slate-800">Resume Maamey</span>
              <span className="hidden sm:inline">•</span>
              <span>© {new Date().getFullYear()} All rights reserved.</span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium">
              <Link href="/guides" className="hover:text-slate-900 transition-colors">
                Guides
              </Link>
              <Link href="/templates" className="hover:text-slate-900 transition-colors">
                Templates
              </Link>
              <Link href="/about" className="hover:text-slate-900 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-slate-900 transition-colors">
                Contact Us
              </Link>
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-slate-900 transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}