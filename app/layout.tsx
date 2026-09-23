import type { Metadata } from 'next';
// @ts-ignore
import './globals.css';
import { ResumeProvider } from '@/lib/store';

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
  verification: {
    google: 'khJZj_QltCDOGnCk9OxXFy9M5TCFwYwpnbSl6WtPUGQ',
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
        {/* Google AdSense direct tag */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6119006421731405"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 font-sans antialiased dark:bg-slate-950 dark:text-slate-50">
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}