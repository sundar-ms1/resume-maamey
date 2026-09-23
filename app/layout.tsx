import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
// @ts-ignore
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Resume Maamey — Free Resume Builder & CV Maker',
  description:
    'Build modern, ATS-friendly resumes in minutes. Completely free with instant PDF export, no sign-up required.',
  metadataBase: new URL('https://resumemaamey.in'),
  openGraph: {
    title: 'Resume Maamey — Free Resume Builder',
    description: 'Create a professional resume in 10 minutes. 100% free.',
    url: 'https://resumemaamey.in',
    siteName: 'Resume Maamey',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resume Maamey Builder Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Maamey — Free Resume Builder',
    description: 'Create a professional resume in 10 minutes. 100% free.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google AdSense Script */}
        {/* Replace ca-pub-XXXXXXXXXXXXXXXX with your actual publisher ID from Google AdSense */}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50`}>
        {children}
      </body>
    </html>
  );
}