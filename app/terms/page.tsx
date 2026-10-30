import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: 'Terms and conditions for using Resume Maamey.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
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
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">4. Your responsibility</h2>
          <p>You are responsible for the accuracy of the information you enter, checking the exported resume before sharing it, and following the application instructions of each employer. Do not use the tool to create deceptive documents or submit information that you do not have permission to share.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">5. Privacy and third-party services</h2>
          <p>Use of the website is also subject to our <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link>. The website may rely on third-party providers for analytics, advertising or other site features; those providers may have separate terms and privacy practices.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">6. Availability and accuracy</h2>
          <p>We aim to keep the website and its templates useful, but features may change, be unavailable or contain errors. You should review any downloaded document before using it. We do not guarantee that a resume will pass an applicant tracking system, result in an interview or lead to employment.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">7. Modifications</h2>
          <p>
            We reserve the right to modify or discontinue features, templates, or aspects of the site at any time without prior notice.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">8. Contact</h2>
          <p>Questions about these terms can be sent to <a href="mailto:sundar15072002@gmail.com" className="text-blue-600 underline">sundar15072002@gmail.com</a>.</p>
        </div>
      </section>
    </div>
    </>
  );
}