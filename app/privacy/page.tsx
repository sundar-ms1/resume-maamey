import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | Resume Maamey",
  description:
    "Read how Resume Maamey handles resume information, website analytics, cookies and advertising technologies.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-800 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <Link href="/" className="mb-6 inline-block text-sm font-medium text-blue-700 hover:underline">
          &larr; Back to Resume Maamey
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: October 23, 2026</p>
        <p className="mt-6 leading-7">
          This policy explains how Resume Maamey ("we", "our" or "the website") handles information when you visit
          resumemaamey.in and use our resume-building tools. Please read it together with our <Link href="/terms" className="text-blue-700 underline">Terms of Service</Link>.
        </p>

        <div className="mt-8 space-y-8 leading-7">
          <section>
            <h2 className="text-xl font-bold text-slate-900">1. Resume information you enter</h2>
            <p className="mt-2">The resume editor is designed to create and format your resume in your browser. The project does not provide an account-based resume database or a server-side resume submission feature. Your draft is held in the editor while you use it; the editor also lets you download a draft file to your own device if that feature is available in your version.</p>
            <p className="mt-2">Avoid entering information you do not want displayed in a resume. You are responsible for where you store, share or upload exported files.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">2. Analytics and technical information</h2>
            <p className="mt-2">The website uses Google Analytics 4 to understand site usage, such as which pages are visited and how visitors interact with the website. Analytics providers may use cookies or similar technologies and may process technical information such as browser, device, approximate location and page interaction data according to their own terms and settings.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">3. Advertising and cookies</h2>
            <p className="mt-2">The website loads Google AdSense and may use other advertising services. These providers may use cookies, identifiers or similar technologies to deliver, measure and personalise ads, subject to your location, consent choices and the provider's policies. Third-party vendors, including Google, may use cookies to serve ads based on visits to this website or other websites.</p>
            <p className="mt-2">You can manage available ad personalisation and cookie choices through Google's ad settings and the controls provided by your browser. Blocking cookies may affect some website or advertising features.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">4. Third-party services and links</h2>
            <p className="mt-2">The website may load services provided by third parties, including analytics, advertising or fonts. Those providers process data under their own privacy policies. We do not control the privacy practices of external websites linked from our pages.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">5. Data sharing and security</h2>
            <p className="mt-2">We do not sell the resume text you enter in the editor. We do not operate a user account system for storing resumes. No internet service can guarantee absolute security, so please keep downloaded drafts and exported resumes in a secure location.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">6. Children's privacy</h2>
            <p className="mt-2">Resume Maamey is a general-purpose career tool and is not designed to collect personal information from children. If you believe a child has submitted personal information to us through a contact channel, please contact us so we can assess the request.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">7. Your choices and policy updates</h2>
            <p className="mt-2">You can stop using the website at any time, clear browser data using your browser controls, and manage available Google ad settings. We may update this policy when the website or applicable requirements change. The date at the top indicates the latest revision.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">8. Contact</h2>
            <p className="mt-2">For privacy questions, email <a className="text-blue-700 underline" href="mailto:sundar15072002@gmail.com">sundar15072002@gmail.com</a> or visit our <Link href="/contact" className="text-blue-700 underline">Contact Us</Link> page.</p>
          </section>
        </div>
      </article>
    </main>
    </>
  );
}

