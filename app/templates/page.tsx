"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import { NavLink } from "@/components/NavLink";
import { SiteHeader } from "@/components/SiteHeader";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/templates";
import { SAMPLE_RESUME } from "@/lib/sampleData";

const TemplateThumb = dynamic(
  () =>
    import("@/components/TemplateThumb").then(
      (mod) => mod.TemplateThumb
    ),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="flex h-[350px] w-[250px] items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200"
      >
        <div className="h-[280px] w-[210px] rounded-sm border border-slate-200 bg-white shadow-sm">
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

/*
 * The template preview only needs a small amount of resume content.
 *
 * We keep the real ResumeData structure used by the application,
 * but intentionally reduce the amount of sample content rendered
 * inside the gallery.
 */
const TEMPLATE_PREVIEW_DATA = {
  ...SAMPLE_RESUME,

  basics: {
    ...SAMPLE_RESUME.basics,
    name: "Alex Morgan",
    label: "Software Professional",
    email: "alex@example.com",
    phone: "+91 90000 00000",
    location: "Chennai, India",
    summary:
      "Results-focused professional with experience delivering reliable digital solutions and measurable results.",
  },

  experience: SAMPLE_RESUME.experience.slice(0, 1),
  certifications: SAMPLE_RESUME.certifications.slice(0, 1),
  achievements: SAMPLE_RESUME.achievements.slice(0, 1),
  education: SAMPLE_RESUME.education.slice(0, 1),
  skills: SAMPLE_RESUME.skills.slice(0, 2),
  projects: SAMPLE_RESUME.projects.slice(0, 1),

  sectionTitles: {
    ...SAMPLE_RESUME.sectionTitles,
  },
};

const TEMPLATE_DESCRIPTIONS: Record<string, string> = {
  professional:
    "A polished layout for experienced professionals, office roles, and corporate applications.",

  modern:
    "A clean contemporary design with strong visual hierarchy for modern job applications.",

  creative:
    "A distinctive layout for creative professionals who want their resume to stand out.",

  minimal:
    "A simple, focused design that keeps attention on your experience, skills, and achievements.",

  academic:
    "A structured resume style suited to students, graduates, researchers, and academic applications.",

  tech:
    "A technology-focused layout designed to highlight technical skills, projects, and experience.",
};

function getTemplateDescription(category: string): string {
  const normalizedCategory = category.toLowerCase();

  return (
    TEMPLATE_DESCRIPTIONS[normalizedCategory] ??
    "A professional resume layout designed to keep your experience, skills, and achievements easy to read."
  );
}

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates =
    activeCategory === "All"
      ? TEMPLATES
      : TEMPLATES.filter(
          (template) => template.category === activeCategory
        );

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Free professional resume templates
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {TEMPLATES.length} resume templates
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Choose a professional resume design, customize your content,
              and create a polished resume that is ready for job applications.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <NavLink to="editor">
                Create your resume
              </NavLink>

              <Link
                href="/guides"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Resume guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Category filters */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === "All"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              All templates
            </button>

            {TEMPLATE_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Template count */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Choose your design
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              {filteredTemplates.length} template
              {filteredTemplates.length === 1 ? "" : "s"} available
            </p>
          </div>
        </div>

        {/* Template gallery */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTemplates.map((template) => (
            <article
              key={template.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Preview */}
              <div className="relative overflow-hidden border-b border-slate-200 bg-slate-100">
                <div className="flex justify-center p-4">
                  <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-md">
                    <TemplateThumb
                      template={template}
                      data={TEMPLATE_PREVIEW_DATA}
                    />
                  </div>
                </div>

                {/* Hover CTA */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full justify-center bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent px-4 pb-4 pt-10 transition-transform duration-200 group-hover:translate-y-0">
                  <NavLink
                    to="editor"
                    query={`template=${template.id}`}
                  >
                    Use this template
                  </NavLink>
                </div>
              </div>

              {/* Template information */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {template.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-blue-600">
                      {template.category}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    Free
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {getTemplateDescription(template.category)}
                </p>

                <Link
                  href={`/editor?template=${template.id}`}
                  className="mt-4 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Customize template &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Helpful content */}
        <section className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Pick a resume style that fits your career
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Resume Maamey gives you multiple professional layouts so you
              can focus on your experience, skills, education, and
              achievements instead of spending hours formatting a document.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div
                aria-hidden="true"
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700"
              >
                &#10003;
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                ATS-friendly options
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Choose clean layouts that keep important resume information
                easy to read and organize.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div
                aria-hidden="true"
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700"
              >
                &#10022;
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Modern professional designs
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Select a visual style that works for fresh graduates,
                experienced professionals, career changes, and different
                industries.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div
                aria-hidden="true"
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"
              >
                &#8635;
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Change templates anytime
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your resume content can be used with different designs, so
                you can compare layouts before downloading your final resume.
              </p>
            </div>
          </div>
        </section>

        {/* Guide section */}
        <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                Resume help
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Not sure how to improve your resume?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Read our practical resume guides for ATS optimization,
                stronger action verbs, fresher resumes, and other job-search
                tips.
              </p>
            </div>

            <Link
              href="/guides"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Read resume guides &rarr;
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-center text-white sm:px-10">
          <h2 className="text-3xl font-bold">
            Ready to build your resume?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Choose a template, add your information, preview your resume,
            and download your finished document.
          </p>

          <div className="mt-7">
            <NavLink to="editor">
              Start building your resume
            </NavLink>
          </div>
        </section>
      </main>
    </div>
  );
}