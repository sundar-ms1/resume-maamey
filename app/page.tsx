
'use client';

import { NavLink } from '@/components/NavLink';
import Link from 'next/link';
import { useState } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { TemplateThumb } from '@/components/TemplateThumb';
import { TEMPLATES } from '@/lib/templates';
import { SAMPLE_RESUME } from '@/lib/sampleData';
import { GUIDES } from '@/lib/guidesData';

const FEATURES = [
  {
    title: 'Easy resume editor',
    body: 'Edit your resume using a simple visual editor. Update your personal details, work experience, education, projects and skills while viewing your changes.',
    icon: (
      <>
        <rect x="3" y="4" width="7" height="16" rx="1.5" />
        <rect x="13" y="4" width="8" height="10" rx="1.5" />
        <path d="M13 17.5h8" />
      </>
    ),
  },
  {
    title: 'A4 resume preview',
    body: 'Preview your resume on a standard 210 × 297 mm A4 page. Check your layout, text and page breaks before downloading your PDF.',
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
  {
    title: 'PDF download',
    body: 'Download your completed resume as a PDF file. Open the downloaded document and check that your details and formatting are correct before sharing it.',
    icon: (
      <>
        <path d="M12 3v11" />
        <path d="M8 10.5 12 14.5l4-4" />
        <path d="M4 17.5v2a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-2" />
      </>
    ),
  },
  {
    title: 'Multiple resume templates',
    body: 'Explore different resume designs and change templates without starting again. Your resume content stays separate from the selected design.',
    icon: (
      <>
        <path d="M4 7h11l-2.5-2.5M20 17H9l2.5 2.5" />
        <path d="M20 7h-2M4 17h2" />
      </>
    ),
  },
  {
    title: 'Organised resume sections',
    body: 'Arrange your information with familiar headings such as professional summary, work experience, education, skills, projects and certifications.',
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4 4" />
      </>
    ),
  },
  {
    title: 'No account required',
    body: 'Start creating your resume without registering or paying for an account. Download a copy of your resume when you finish.',
    icon: (
      <>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
        <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0" />
      </>
    ),
  },
];

const STEPS = [
  {
    n: '01',
    t: 'Choose a resume template',
    d: 'Explore the available resume designs and choose a layout that suits your experience, career goals and personal preferences.',
  },
  {
    n: '02',
    t: 'Enter your information',
    d: 'Add your contact details, professional summary, education, work experience, skills, projects and other relevant information.',
  },
  {
    n: '03',
    t: 'Customise and preview',
    d: 'Adjust the design and review your resume using the live A4 preview. Check your spelling, dates, headings and page layout.',
  },
  {
    n: '04',
    t: 'Download your PDF',
    d: 'Select Download PDF to generate and save your completed resume. Open the file to verify its appearance before sending it to employers.',
  },
];

const FAQ = [
  {
    q: 'Is Resume Maamey free to use?',
    a: 'Yes. Resume Maamey provides free resume templates and PDF downloading without requiring an account or paid subscription. You can create your resume using the available editor features.',
  },
  {
    q: 'Can freshers create a resume without work experience?',
    a: 'Yes. Students and freshers can include their education, academic projects, internships, practical training, certifications, skills and relevant extracurricular activities. You do not need to invent work experience to create a useful fresher resume.',
  },
  {
    q: 'Can experienced professionals use Resume Maamey?',
    a: 'Yes. Experienced candidates can organise their employment history, responsibilities, professional achievements, skills, qualifications and career summaries using the available resume templates.',
  },
  {
    q: 'How do I download my resume?',
    a: 'Complete your resume in the editor, review the A4 preview and select the Download PDF button. Open the downloaded PDF and check the content and page layout before sharing it.',
  },
  {
    q: 'Are the resume templates ATS-friendly?',
    a: 'The templates are designed to provide organised resume layouts, but no template can guarantee that every applicant tracking system will correctly read a resume. Use clear headings, relevant information and readable formatting. Follow the employer’s application instructions.',
  },
  {
    q: 'Can I create a resume for jobs outside India?',
    a: 'Yes. You can use the resume builder to prepare a document for different job markets. However, resume and CV expectations vary by country and employer. Check the local application requirements before submitting your document.',
  },
  {
    q: 'Does the editor require an account?',
    a: 'No account or registration is required to use the resume editor. Download your resume when you finish so you have a copy of your work.',
  },
  {
    q: 'Does Resume Maamey guarantee that I will get a job?',
    a: 'No. A resume builder can help you organise and present your qualifications, but employment decisions depend on your experience, skills, the position and the employer. Always provide accurate information in your application.',
  },
  {
    q: 'Can I use the editor on a mobile phone?',
    a: 'Yes. The editor supports mobile layouts. You can enter your information and switch to the preview to check your resume before downloading.',
  },
  {
    q: 'How do I get the best PDF result?',
    a: 'Review the completed resume before downloading. Check your name, contact details, spelling, employment dates, section headings and page breaks. Open the downloaded PDF to confirm that everything is displayed correctly.',
  },
];

export default function HomePage() {
  const featured = TEMPLATES.slice(0, 8);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            background:
              'radial-gradient(60rem 30rem at 82% -10%, #ede9ff 0%, transparent 60%), radial-gradient(40rem 24rem at 5% 10%, #fff1ec 0%, transparent 55%)',
          }}
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[12px] font-semibold text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-mango" />
              Free resume builder · No login · PDF download
            </span>

            <h1 className="mt-5 text-[2.4rem] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[3.3rem]">
              Create your professional resume
              <br />
              <span className="text-brand">for free online.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-500">
              Build a professional resume with Resume Maamey. Choose from
              modern resume templates, add your education and work
              experience, customise your design, preview your A4 document
              and download your resume as a PDF. Whether you are a student,
              fresher or experienced professional, get started without
              creating an account or paying a subscription.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <NavLink
                to="editor"
                className="btn btn-primary px-5 py-2.5 text-[14px]"
              >
                Create your free resume
              </NavLink>

              <NavLink
                to="templates"
                className="btn btn-ghost px-5 py-2.5 text-[14px]"
              >
                Explore resume templates
              </NavLink>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                [String(TEMPLATES.length), 'Templates'],
                ['A4', 'Page preview'],
                ['Free', 'No subscription'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-extrabold tracking-[-0.02em] text-ink">
                    {v}
                  </dt>
                  <dd className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-300">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="rotate-[-2deg] rounded-xl2 border border-line bg-white p-2 shadow-page">
              <TemplateThumb
                template={TEMPLATES[3]}
                data={SAMPLE_RESUME}
                width={300}
              />
            </div>

            <div className="absolute -bottom-6 -left-2 rotate-[4deg] rounded-xl2 border border-line bg-white p-2 shadow-page sm:left-6 lg:left-0">
              <TemplateThumb
                template={TEMPLATES[11]}
                data={SAMPLE_RESUME}
                width={190}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHO CAN USE RESUME MAAMEY */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
            Resume builder for different career stages
          </p>

          <h2 className="mt-2 text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink">
            Who can create a resume with Resume Maamey?
          </h2>

          <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
            A resume should present information that is relevant to the job
            you want. Students, first-time job applicants and experienced
            professionals may need different sections and examples. Choose
            the information that best represents your own background.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="card p-5">
            <h3 className="text-[16px] font-bold text-ink">
              Students and freshers
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
              Create a fresher resume using your education, academic
              achievements, projects, internships, certifications,
              technical skills and practical training. Focus on what you
              have learned and what you can contribute.
            </p>
            <Link
              href="/guides/fresher-resume-guide"
              className="mt-4 inline-flex text-[13px] font-bold text-brand"
            >
              Read the fresher resume guide →
            </Link>
          </article>

          <article className="card p-5">
            <h3 className="text-[16px] font-bold text-ink">
              Experienced professionals
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
              Organise your professional experience, career progression,
              responsibilities, measurable achievements, qualifications
              and relevant skills. Highlight evidence that relates to the
              position you are applying for.
            </p>
            <Link
              href="/guides"
              className="mt-4 inline-flex text-[13px] font-bold text-brand"
            >
              Explore career writing guides →
            </Link>
          </article>

          <article className="card p-5">
            <h3 className="text-[16px] font-bold text-ink">
              International job seekers
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
              Prepare a resume for your job search and check the document
              requirements of the country and employer. Terminology,
              personal information expectations and CV conventions can
              differ between job markets.
            </p>
            <Link
              href="/guides"
              className="mt-4 inline-flex text-[13px] font-bold text-brand"
            >
              Read resume writing advice →
            </Link>
          </article>
        </div>
      </section>

      {/* TEMPLATES */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink">
                Explore resume templates
              </h2>

              <p className="mt-2 max-w-xl text-[14px] text-ink-500">
                Browse different resume designs for your career needs.
                Choose a template and customise it with your own information.
              </p>
            </div>

            <NavLink to="templates" className="btn btn-ghost">
              View all templates
            </NavLink>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((t) => (
              <NavLink
                key={t.id}
                to="editor"
                query={`t=${t.id}`}
                className="card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-panel"
              >
                <div className="overflow-hidden border-b border-line bg-canvas">
                  <div className="mx-auto w-fit">
                    <TemplateThumb
                      template={t}
                      data={SAMPLE_RESUME}
                      width={240}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between px-3 py-2.5">
                  <span className="text-[13px] font-bold text-ink">
                    {t.name}
                  </span>

                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-300 group-hover:text-brand">
                    {t.category}
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink">
            Resume building tools and features
          </h2>

          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-500">
            Use the available editing and design tools to organise your
            resume, review its appearance and prepare a PDF document.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card bg-white p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand-dark">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  >
                    {f.icon}
                  </svg>
                </span>

                <h3 className="mt-3.5 text-[15px] font-bold text-ink">
                  {f.title}
                </h3>

                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16"
      >
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
          Getting started
        </p>

        <h2 className="mt-2 text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink">
          How to create your resume in four steps
        </h2>

        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-500">
          You can create a resume by choosing a design, entering your
          information, checking the preview and downloading your completed
          document.
        </p>

        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="border-t-2 border-ink pt-4">
              <span className="font-mono text-[12px] font-bold tracking-[0.1em] text-brand">
                {s.n}
              </span>

              <h3 className="mt-1 text-[15px] font-bold text-ink">
                {s.t}
              </h3>

              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">
                {s.d}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <NavLink to="editor" className="btn btn-primary">
            Start creating your resume
          </NavLink>
        </div>
      </section>

      {/* PRACTICAL RESUME GUIDANCE */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Resume writing advice
            </p>

            <h2 className="mt-2 text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink">
              How to write a clear and useful resume
            </h2>

            <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
              A resume gives employers an overview of your qualifications
              and suitability for a position. Its structure should help
              readers understand your background without searching through
              unnecessary information. The best content depends on your
              experience and the requirements of the job.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="card p-5">
              <h3 className="text-[15px] font-bold text-ink">
                1. Choose relevant information
              </h3>

              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
                Freshers can highlight education, projects, internships
                and practical skills. Experienced candidates should give
                suitable attention to recent employment, responsibilities
                and achievements relevant to the role.
              </p>
            </article>

            <article className="card p-5">
              <h3 className="text-[15px] font-bold text-ink">
                2. Describe your achievements accurately
              </h3>

              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
                Explain what you worked on and what you accomplished.
                Use real examples and measurable results only when you
                can support them with accurate information.
              </p>

              <p className="mt-3 rounded-lg bg-canvas p-3 text-[12.5px] leading-relaxed text-ink-500">
                <strong>Example:</strong> Assisted customers with product
                enquiries and maintained daily order records.
              </p>
            </article>

            <article className="card p-5">
              <h3 className="text-[15px] font-bold text-ink">
                3. Keep the layout readable
              </h3>

              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
                Use clear section headings, consistent dates, readable
                text and appropriate spacing. Follow the file format
                and application instructions provided by the employer.
              </p>
            </article>
          </div>

          {/* FRESHER AND PROFESSIONAL ADVICE */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl2 border border-line p-5">
              <h3 className="text-[16px] font-bold text-ink">
                Resume tips for freshers
              </h3>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-[13.5px] leading-relaxed text-ink-500">
                <li>Include your relevant educational qualifications.</li>
                <li>Describe academic and personal projects.</li>
                <li>Mention internships and practical training.</li>
                <li>List skills that you can genuinely demonstrate.</li>
                <li>Include relevant certifications and achievements.</li>
              </ul>

              <Link
                href="/guides/fresher-resume-guide"
                className="mt-4 inline-flex text-[13px] font-bold text-brand"
              >
                Read the fresher resume guide →
              </Link>
            </article>

            <article className="rounded-xl2 border border-line p-5">
              <h3 className="text-[16px] font-bold text-ink">
                Resume tips for experienced professionals
              </h3>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-[13.5px] leading-relaxed text-ink-500">
                <li>Summarise your relevant professional background.</li>
                <li>List employment history in a clear order.</li>
                <li>Describe responsibilities and real achievements.</li>
                <li>Highlight job-related technical and professional skills.</li>
                <li>Remove outdated or irrelevant information.</li>
              </ul>

              <Link
                href="/guides"
                className="mt-4 inline-flex text-[13px] font-bold text-brand"
              >
                Explore career guides →
              </Link>
            </article>
          </div>

          {/* GUIDES */}
          <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-[1.35rem] font-extrabold tracking-[-0.02em] text-ink">
                Free resume writing guides
              </h2>

              <p className="mt-2 text-[14px] text-ink-500">
                Explore practical advice for writing and improving your
                resume.
              </p>
            </div>

            <Link href="/guides" className="btn btn-ghost">
              Browse all guides
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.slice(0, 3).map((guide) => (
              <article key={guide.slug} className="card p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-300">
                  {guide.readTime}
                </p>

                <h3 className="mt-2 text-[15px] font-bold leading-snug text-ink">
                  {guide.title}
                </h3>

                <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
                  {guide.description}
                </p>

                <Link
                  href={`/guides/${guide.slug}`}
                  className="mt-4 inline-flex text-[13px] font-bold text-brand"
                >
                  Read guide →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-line bg-canvas">
        <div className="mx-auto max-w-3xl scroll-mt-20 px-5 py-16">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink">
            Frequently asked questions
          </h2>

          <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
            Find answers about creating resumes, using templates,
            editing your information and downloading PDF documents.
          </p>

          <div className="mt-6 divide-y divide-line border-y border-line">
            {FAQ.map((f, i) => (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={open === i}
                >
                  <span className="text-[14.5px] font-bold text-ink">
                    {f.q}
                  </span>

                  <span className="text-ink-300">
                    {open === i ? '−' : '+'}
                  </span>
                </button>

                {open === i && (
                  <p className="-mt-1 pb-4 pr-8 text-[13.5px] leading-relaxed text-ink-500">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl2 bg-ink px-6 py-8 text-center">
            <h3 className="text-[1.4rem] font-extrabold tracking-[-0.02em] text-white">
              Start building your resume
            </h3>

            <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-white/70">
              Choose a template, enter your information and prepare your
              resume using the free Resume Maamey editor.
            </p>

            <NavLink
              to="editor"
              className="btn mt-5 bg-white px-5 py-2.5 text-[14px] text-ink hover:bg-white/90"
            >
              Open the free resume editor
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
