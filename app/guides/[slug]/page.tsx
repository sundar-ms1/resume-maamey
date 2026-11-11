import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES } from "@/lib/guidesData";
import { SiteHeader } from "@/components/SiteHeader";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const guide = GUIDES.find((g) => g.slug === params.slug);

  if (!guide) {
    return {
      title: "Guide Not Found",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: `${guide.title} | Resume Maamey`,
    description: guide.description,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url: `/guides/${guide.slug}`,
    },
  };
}

export default function GuideDetailPage({ params }: Props) {
  const guide = GUIDES.find((g) => g.slug === params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-slate-50">
        {/* Article Header */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <Link
              href="/guides"
              className="mb-8 inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              &larr; Back to Resume Guides
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-blue-600">
              <span className="rounded-full bg-blue-50 px-3 py-1.5">
                Resume Maamey Guide
              </span>

              <span className="text-slate-300">|</span>

              <span className="text-slate-500">{guide.date}</span>

              <span className="text-slate-300">|</span>

              <span className="text-slate-500">{guide.readTime}</span>
            </div>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              {guide.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              {guide.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Build Your Resume
                <span className="ml-2" aria-hidden="true">
                  &rarr;
                </span>
              </Link>

              <Link
                href="/templates"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Explore Templates
              </Link>
            </div>
          </div>
        </section>

        {/* Article */}
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
              {/* Table of Contents */}
              <aside
                aria-label="Guide contents"
                className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">
                  In this guide
                </h2>

                <nav>
                  <ol className="space-y-2">
                    {guide.content.map((section, idx) => (
                      <li key={idx}>
                        <a
                          href={`#section-${idx + 1}`}
                          className="text-sm leading-6 text-slate-600 transition hover:text-blue-600"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              {/* Article Content */}
              <div className="space-y-12">
                {guide.content.map((section, idx) => (
                  <section
                    key={idx}
                    id={`section-${idx + 1}`}
                    className="scroll-mt-24"
                  >
                    <h2 className="mb-5 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                      {section.heading}
                    </h2>

                    <div className="space-y-5 text-base leading-8 text-slate-700 sm:text-lg">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex}>{paragraph}</p>
                      ))}
                    </div>

                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-5 pl-10 text-base leading-7 text-slate-700 sm:text-lg">
                        {section.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* End CTA */}
              <div className="mt-14 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  Ready to improve your resume?
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                  Apply the ideas from this guide using Resume Maamey. Create,
                  edit, preview, and download your resume without needing a
                  complicated setup.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/editor"
                    className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Open Resume Builder
                    <span className="ml-2" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>

                  <Link
                    href="/templates"
                    className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    View Resume Templates
                  </Link>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/guides"
                  className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
                >
                  &larr; Browse all resume guides
                </Link>

                <Link
                  href="/"
                  className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
                >
                  Back to Resume Maamey
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                  Resume Maamey
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Free Resume Builder
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Create a professional resume with editable sections,
                  templates, live preview, and PDF export.
                </p>

                <Link
                  href="/editor"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Create Your Resume
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">
                  More Resume Guides
                </h2>

                <div className="mt-4 space-y-3">
                  {GUIDES.filter(
                    (otherGuide) => otherGuide.slug !== guide.slug
                  )
                    .slice(0, 4)
                    .map((otherGuide) => (
                      <Link
                        key={otherGuide.slug}
                        href={`/guides/${otherGuide.slug}`}
                        className="block rounded-lg border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                      >
                        <span className="text-sm font-semibold leading-5 text-slate-800">
                          {otherGuide.title}
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                          {otherGuide.readTime}
                        </span>
                      </Link>
                    ))}
                </div>

                <Link
                  href="/guides"
                  className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View all guides &rarr;
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}