import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES } from "@/lib/guidesData";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = GUIDES.find((g) => g.slug === params.slug);
  if (!guide) return { title: "Guide Not Found" };

  return {
    title: `${guide.title} | Resume Maamey`,
    description: guide.description,
  };
}

export default function GuideDetailPage({ params }: Props) {
  const guide = GUIDES.find((g) => g.slug === params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
        <Link
          href="/guides"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 inline-block"
        >
          &larr; Back to all guides
        </Link>

        <header className="mb-8 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span>{guide.date}</span>
            <span>•</span>
            <span>{guide.readTime}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight mb-4">
            {guide.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {guide.description}
          </p>
        </header>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          {guide.content.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
              {section.bullets && (
                <ul className="list-disc pl-5 space-y-2 pt-2">
                  {section.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <Link
            href="/editor"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Build Your Resume Now
          </Link>
          <Link
            href="/guides"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Browse More Guides &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}