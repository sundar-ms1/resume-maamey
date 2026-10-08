import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guidesData";

export const metadata: Metadata = {
  title: "Career & Resume Writing Guides | Resume Maamey",
  description: "Explore in-depth articles on crafting ATS-optimized resumes, writing powerful bullet points, and landing job interviews.",
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Career & Resume Writing Guides
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Actionable strategies and formatting tutorials to help you build competitive resumes.
          </p>
        </div>

        <div className="grid gap-6">
          {GUIDES.map((guide) => (
            <article
              key={guide.slug}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition"
            >
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                <span>{guide.date}</span>
                <span>•</span>
                <span>{guide.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                <Link href={`/guides/${guide.slug}`} className="hover:text-blue-600 transition">
                  {guide.title}
                </Link>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {guide.description}
              </p>
              <Link
                href={`/guides/${guide.slug}`}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
              >
                Read Article &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}