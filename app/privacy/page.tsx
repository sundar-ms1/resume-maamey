import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Resume Maamey',
  description: 'Privacy policy for Resume Maamey. Learn how your data is handled.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-slate-800 dark:text-slate-200">
      <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
        &larr; Back to Resume Maamey
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: 2026</p>

      <section className="space-y-6 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">1. Overview</h2>
          <p>
            Welcome to Resume Maamey (resumemaamey.in). We respect your privacy and are committed to protecting any information you provide while using our online resume builder.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">2. Resume Data & Storage</h2>
          <p>
            Your resume content is stored locally within your browser using modern client-side storage technologies (such as localStorage). We do not store, view, or sell your personal career data, resume drafts, or uploaded details on external database servers without your explicit consent.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">3. Google AdSense & Cookies</h2>
          <p>
            We use Google AdSense to serve advertisements when you visit our website. Google and its partner advertising networks may use cookies and web beacons (such as the DoubleClick cookie) to serve ads based on your prior visits to our website or other sites on the Internet.
          </p>
          <p className="mt-2">
            You may opt out of personalized advertising by visiting Google's Ads Settings (<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">google.com/settings/ads</a>) or via <a href="https://aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">aboutads.info</a>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">4. Google Analytics</h2>
          <p>
            We use Google Analytics to monitor aggregated, anonymized web traffic and user behavior trends. This service collects standard internet log information such as device type, browser version, and approximate location to help us improve website functionality.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">5. Contact Us</h2>
          <p>
            If you have any questions or feedback regarding this Privacy Policy, please contact us at <span className="font-mono text-blue-600 dark:text-blue-400">contact@resumemaamey.in</span>.
          </p>
        </div>
      </section>
    </div>
  );
}