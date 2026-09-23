import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Resume Maamey',
  description: 'Terms and conditions for using Resume Maamey.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-slate-800 dark:text-slate-200">
      <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
        &larr; Back to Resume Maamey
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Terms of Service</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: 2026</p>

      <section className="space-y-6 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By using Resume Maamey (resumemaamey.in), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">2. Service Usage & License</h2>
          <p>
            Resume Maamey provides free CV creation and resume building tools. You retain full ownership and intellectual property rights over all personal information and resume text you compile using the tool.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">3. Disclaimer of Warranties</h2>
          <p>
            Our service is provided on an "as-is" and "as-available" basis without any express or implied warranties. We do not guarantee specific employment outcomes, interviews, or hiring results from the use of generated resumes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">4. Modifications</h2>
          <p>
            We reserve the right to modify or discontinue features, templates, or aspects of the site at any time without prior notice.
          </p>
        </div>
      </section>
    </div>
  );
}