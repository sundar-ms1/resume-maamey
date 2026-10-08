import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Resume Maamey",
  description: "Learn more about Resume Maamey and our mission to provide free, high-quality resume building tools.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mb-6">
          About Resume Maamey
        </h1>

        <div className="space-y-6 text-slate-600 leading-relaxed text-base">
          <p>
            Welcome to <strong>Resume Maamey</strong>, a dedicated career resource and intuitive resume-crafting tool built to empower job seekers, students, and professionals across the globe.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
            Our Purpose
          </h2>
          <p>
            Landing an interview in today's competitive job market is challenging. Most candidates get filtered out by automated Applicant Tracking Systems (ATS) simply due to poor formatting or lack of relevant keyword structuring. We built Resume Maamey to eliminate that barrier by offering clean, industry-standard resume templates alongside practical, expert-backed writing advice.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
            What We Provide
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Clean & Modern Builder:</strong> A streamlined, client-side editor focused on readability and print-perfect A4 formatting.
            </li>
            <li>
              <strong>ATS Compatibility:</strong> Layouts structured so automated recruitment software parses your details cleanly.
            </li>
            <li>
              <strong>Educational Guides:</strong> Up-to-date career advice, resume breakdown tutorials, and actionable tips for modern hiring standards.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
            Privacy & Trust
          </h2>
          <p>
            We believe your career data is yours alone. Our browser-based editor is designed to prioritize data privacy without unnecessary tracking or third-party sharing.
          </p>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/editor"
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Try the Resume Builder
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 underline"
            >
              Get in Touch &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}