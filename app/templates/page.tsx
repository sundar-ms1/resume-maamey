'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Link from 'next/link';
import { NavLink } from '@/components/NavLink';
import { SiteHeader } from '@/components/SiteHeader';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/lib/templates';
import { SAMPLE_RESUME } from '@/lib/sampleData';

const TemplateThumb = dynamic(
  () =>
    import('@/components/TemplateThumb').then(
      (mod) => mod.TemplateThumb
    ),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="flex h-[350px] w-[250px] items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200"
      >
        <div className="h-[280px] w-[210px] animate-pulse rounded-sm border border-slate-200 bg-white shadow-sm">
          <div className="mx-5 mt-6 h-3 w-24 rounded bg-slate-200" />
          <div className="mx-5 mt-3 h-2 w-32 rounded bg-slate-100" />

          <div className="mx-5 mt-8 space-y-2">
            <div className="h-2 rounded bg-slate-100" />
            <div className="h-2 w-11/12 rounded bg-slate-100" />
            <div className="h-2 w-10/12 rounded bg-slate-100" />
          </div>

          <div className="mx-5 mt-7 h-2 w-20 rounded bg-slate-200" />

          <div className="mx-5 mt-3 space-y-2">
            <div className="h-2 rounded bg-slate-100" />
            <div className="h-2 w-9/12 rounded bg-slate-100" />
            <div className="h-2 w-10/12 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    ),
  }
);

export default function TemplatesPage() {
  const [cat, setCat] = useState<string>('All');

  const list =
    cat === 'All'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === cat);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        {/* Hero / SEO content */}
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:py-14">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center rounded-full border border-line bg-canvas px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">
                Resume template gallery
              </div>

              <h1 className="text-[2rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[2.6rem]">
                {TEMPLATES.length} resume templates
              </h1>

              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-500">
                Choose a professional resume layout designed for different
                career needs. Use an ATS-friendly single-column format,
                a modern sidebar design, or a polished editorial style.
                Start with a template and switch designs later without
                losing your resume content.
              </p>
            </div>

            {/* Category filters */}
            <div
              className="mt-7 flex flex-wrap gap-2"
              aria-label="Resume template categories"
            >
              {TEMPLATE_CATEGORIES.map((category) => {
                const count =
                  category === 'All'
                    ? TEMPLATES.length
                    : TEMPLATES.filter(
                        (template) =>
                          template.category === category
                      ).length;

                const active = cat === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setCat(category)}
                    aria-pressed={active}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                      active
                        ? 'bg-ink text-white'
                        : 'border border-line bg-white text-ink-500 hover:border-ink-300 hover:text-ink'
                    }`}
                  >
                    {category}
                    <span className="ml-1.5 text-[11px] opacity-60">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Template gallery */}
        <section
          aria-label="Resume templates"
          className="mx-auto max-w-6xl px-5 py-12"
        >
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">
                Choose your starting design
              </h2>

              <p className="mt-1 text-sm text-ink-500">
                Preview a template, then open it in the free resume editor.
              </p>
            </div>

            <span className="hidden text-xs font-semibold text-ink-300 sm:block">
              {list.length} template{list.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((template) => (
              <article
                key={template.id}
                className="card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-panel"
              >
                {/* Visual preview is intentionally client-rendered.
                    This keeps the initial HTML lightweight and avoids
                    repeating the full sample resume text for every card. */}
                <div
                  className="relative overflow-hidden border-b border-line bg-canvas"
                  aria-label={`${template.name} resume template preview`}
                >
                  <div className="mx-auto w-fit">
                    <TemplateThumb
                      template={template}
                      data={SAMPLE_RESUME}
                      width={250}
                    />
                  </div>

                  <NavLink
                    to="editor"
                    query={`t=${template.id}`}
                    className="absolute inset-0 flex items-center justify-center bg-ink/55 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100"
                  >
                    <span className="btn bg-white text-ink">
                      Use this template
                    </span>
                  </NavLink>
                </div>

                {/* Crawlable, useful template information */}
                <div className="flex min-h-[58px] items-center justify-between gap-2 px-3 py-2.5">
                  <div className="min-w-0">
                    <h3 className="truncate text-[13px] font-bold text-ink">
                      {template.name}
                    </h3>

                    <p className="mt-0.5 text-[11px] leading-tight text-ink-400">
                      Professional resume layout
                    </p>
                  </div>

                  <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-300">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: template.accent }}
                      aria-hidden="true"
                    />
                    {template.category}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Helpful content */}
        <section className="border-t border-line bg-canvas">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:py-14">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-line bg-white p-6">
                <h2 className="text-base font-extrabold text-ink">
                  ATS-friendly options
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  Start with a clean layout when you want your education,
                  experience, skills, and achievements to remain easy for
                  applicant tracking systems to read.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6">
                <h2 className="text-base font-extrabold text-ink">
                  Modern professional designs
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  Choose a contemporary layout when visual hierarchy,
                  section spacing, and a polished presentation matter for
                  your target role.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6">
                <h2 className="text-base font-extrabold text-ink">
                  Change templates anytime
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  Your resume content is separate from the visual template,
                  so you can experiment with different designs before
                  downloading your final resume.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-5 py-12 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Ready to build your resume?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
              Pick a design and continue to the Resume Maamey editor.
              You can customize your content, change the design, and
              prepare your resume for download.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <NavLink
                to="editor"
                className="btn bg-ink px-5 py-2.5 text-white hover:bg-ink-700"
              >
                Create my resume
              </NavLink>

              <Link
  href="/guides"
  className="btn border border-line bg-white px-5 py-2.5 text-ink hover:border-ink-300"
>
  Read resume guides
</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}