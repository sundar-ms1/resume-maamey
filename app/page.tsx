import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free ATS Resume Builder Online — Resume Maamey',
  description:
    'Create an ATS-friendly resume online in minutes. Free modern resume builder with instant PDF download for freshers and professionals. No registration needed.',
  keywords: [
    'resume builder',
    'free resume maker',
    'ATS resume templates',
    'CV maker India',
    'resume builder for freshers',
    'download resume PDF free',
  ],
};

const faqs = [
  {
    q: 'Is Resume Maamey completely free to use?',
    a: 'Yes, Resume Maamey is 100% free. You can choose any template, input your details, and download your resume as a clean PDF without hidden paywalls, fees, or watermarks.',
  },
  {
    q: 'What makes a resume ATS-friendly?',
    a: 'An ATS-friendly resume features standard single-column or clean two-column structures, standard web fonts, and clear semantic headings so Applicant Tracking Systems can parse your skills and experience without layout errors.',
  },
  {
    q: 'Is my personal career data stored on your servers?',
    a: 'No. All your personal data and resume drafts are saved locally in your own browser using local storage. We do not store your private resume files on any external databases.',
  },
  {
    q: 'Can freshers use Resume Maamey for entry-level jobs?',
    a: 'Yes, our templates are optimized for both fresh graduates highlighting academic projects and coursework, as well as experienced professionals detailing specialized work history.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Navigation */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-blue-600 dark:text-blue-400">
            Resume Maamey
          </Link>
          <Link
            href="/editor"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Create Resume &rarr;
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300 rounded-full mb-4">
            100% Free &bull; No Sign-Up Needed
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Build ATS-Ready Resumes <br className="hidden sm:inline" />
            <span className="text-blue-600 dark:text-blue-400">That Get You Hired.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Craft a professional, interview-ready CV in minutes with automated formatting, live preview, and instant clean PDF downloads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/editor"
              className="px-8 py-4 text-base font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg shadow-blue-500/25"
            >
              Start Building Now — Free
            </Link>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-12 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4">
              ✓
            </div>
            <h3 className="text-lg font-bold mb-2">ATS-Optimized Formatting</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Engineered with clean semantic structures and scannable sections that pass corporate Applicant Tracking Systems.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center font-bold mb-4">
              ⚡
            </div>
            <h3 className="text-lg font-bold mb-2">Instant Local PDF Export</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Generate pixel-perfect PDFs directly in your browser without waiting in server rendering queues or seeing watermarks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-4">
              🔒
            </div>
            <h3 className="text-lg font-bold mb-2">Complete Privacy First</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Your resume information stays on your device. We store drafts strictly in your browser’s local storage.
            </p>
          </div>
        </section>

        {/* Indexable SEO Content Block */}
        <section className="py-16 max-w-4xl mx-auto px-4 border-t border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Why Use Resume Maamey for Your Job Search?
          </h2>
          <p>
            Securing an interview begins with getting past corporate Applicant Tracking Systems (ATS). Many modern resume builders insert non-standard fonts, complex graphic tables, or hidden paywalls that block candidates from downloading their CVs.
          </p>
          <p>
            Resume Maamey provides job seekers, college graduates, and working professionals with a fast, zero-friction resume creation platform. With our live editor, you can update your professional summary, add key technical competencies, arrange education milestones, and instantly export an ATS-compliant PDF document.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="py-16 max-w-4xl mx-auto px-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; 2026 Resume Maamey. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}