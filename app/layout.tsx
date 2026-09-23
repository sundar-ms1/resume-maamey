import type { Metadata } from 'next';
import Script from 'next/script';
// @ts-ignore
import './globals.css';

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
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Maamey — Free Resume Builder',
    description: 'Create a professional resume in 10 minutes. 100% free.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 font-sans antialiased dark:bg-slate-950 dark:text-slate-50">
        {/* Google AdSense Script */}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6119006421731405"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}