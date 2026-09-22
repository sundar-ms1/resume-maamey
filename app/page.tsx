'use client';

import { NavLink } from '@/components/NavLink';
import { useState } from 'react';
import { SiteFooter, SiteHeader } from '@/components/SiteHeader';
import { TemplateThumb } from '@/components/TemplateThumb';
import { TEMPLATES } from '@/lib/templates';
import { SAMPLE_RESUME } from '@/lib/sampleData';

const FEATURES = [
  {
    title: 'Canva-style editor',
    body: 'Edit on the left, watch the page update on the right. Drag sections up or down, hide what you do not need, rename any heading.',
    icon: (
      <>
        <rect x="3" y="4" width="7" height="16" rx="1.5" />
        <rect x="13" y="4" width="8" height="10" rx="1.5" />
        <path d="M13 17.5h8" />
      </>
    ),
  },
  {
    title: 'True A4 canvas',
    body: 'The preview is a real 210×297mm page with page-break guides, so what you see is exactly what prints.',
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
  {
    title: 'Vector PDF download',
    body: 'Export goes through the browser print engine, so text stays selectable and sharp — not a blurry screenshot.',
    icon: (
      <>
        <path d="M12 3v11" />
        <path d="M8 10.5 12 14.5l4-4" />
        <path d="M4 17.5v2a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19.5v-2" />
      </>
    ),
  },
  {
    title: 'Switch template anytime',
    body: 'Your content is separate from the design. Try all 28 templates with one click and keep every word you wrote.',
    icon: (
      <>
        <path d="M4 7h11l-2.5-2.5M20 17H9l2.5 2.5" />
        <path d="M20 7h-2M4 17h2" />
      </>
    ),
  },
  {
    title: 'ATS-safe structure',
    body: 'Clean semantic text, real headings, no text inside images. Parsers read it the same way a recruiter does.',
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4 4" />
      </>
    ),
  },
  {
    title: 'No login, ever',
    body: 'No account, no email, no paywall at the download button. Your draft stays in your own browser.',
    icon: (
      <>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
        <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0" />
      </>
    ),
  },
];

const STEPS = [
  { n: '01', t: 'Pick a template', d: 'Start from any of the 28 designs. Sample content is already filled in so you are never staring at an empty page.' },
  { n: '02', t: 'Write your content', d: 'Replace the sample text section by section. Add experience, projects, skills, certifications and more.' },
  { n: '03', t: 'Tune the design', d: 'Accent colour, fonts, text size, margins and section spacing — all live on the A4 canvas.' },
  { n: '04', t: 'Download the PDF', d: 'Hit download, choose "Save as PDF", and you have a print-ready A4 resume in seconds.' },
];

const FAQ = [
  { q: 'Is Resume Maamey really free?', a: 'Yes. Every template and the PDF export are free. There is no account, no trial, no watermark and no paywall at the download step.' },
  { q: 'How do I get the best PDF quality?', a: 'Click Download PDF, then pick "Save as PDF" as the destination, set margins to None and keep scale at 100%. The export is vector, so the text stays selectable and crisp at any zoom.' },
  { q: 'Will my resume pass an ATS?', a: 'The single-column templates — Chennai, Velankanni, Dindigul, Kanchi and Tenkasi among them — use plain text order, real headings and no tables or images, which is what applicant tracking systems parse best.' },
  { q: 'Does my data get uploaded anywhere?', a: 'No. The editor runs entirely in your browser and your draft is stored locally on your device. Nothing is sent to a server.' },
  { q: 'Can I make a two-page resume?', a: 'Yes. Keep typing and the canvas grows, with a dashed guide showing where page two begins. The PDF will contain both pages.' },
  { q: 'Does it work on my phone?', a: 'Yes. On small screens the editor stacks — edit content, then flip to the preview tab to check the page before you download.' },
];

export default function HomePage() {
  const featured = TEMPLATES.slice(0, 8);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* hero */}
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
              28 templates · No login · Free PDF
            </span>
            <h1 className="mt-5 text-[2.4rem] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[3.3rem]">
              Your resume, ready
              <br />
              in ten minutes.
              <span className="block text-brand">Seriously, maamey.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-500">
              A Canva-style editor for resumes. Type on the left, see a real A4 page on the right, switch between 28
              designs whenever you feel like it, and download a sharp vector PDF. No signup, no watermark, nothing to pay.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <NavLink to="editor" className="btn btn-primary px-5 py-2.5 text-[14px]">
                Start building — it&apos;s free
              </NavLink>
              <NavLink to="templates" className="btn btn-ghost px-5 py-2.5 text-[14px]">
                Browse all 28 templates
              </NavLink>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                ['28', 'Templates'],
                ['A4', 'True page size'],
                ['0', 'Signup steps'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-extrabold tracking-[-0.02em] text-ink">{v}</dt>
                  <dd className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-300">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="rotate-[-2deg] rounded-xl2 border border-line bg-white p-2 shadow-page">
              <TemplateThumb template={TEMPLATES[3]} data={SAMPLE_RESUME} width={300} />
            </div>
            <div className="absolute -bottom-6 -left-2 rotate-[4deg] rounded-xl2 border border-line bg-white p-2 shadow-page sm:left-6 lg:left-0">
              <TemplateThumb template={TEMPLATES[11]} data={SAMPLE_RESUME} width={190} />
            </div>
          </div>
        </div>
      </section>

      {/* templates */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink">Templates people actually use</h2>
            <p className="mt-2 max-w-xl text-[14px] text-ink-500">
              Every design is built from the same content model, so switching never breaks your text.
            </p>
          </div>
          <NavLink to="templates" className="btn btn-ghost">
            See all 28
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
                  <TemplateThumb template={t} data={SAMPLE_RESUME} width={240} />
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-[13px] font-bold text-ink">{t.name}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-300 group-hover:text-brand">
                  {t.category}
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* features */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink">Built like a design tool, not a form</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand-dark">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                    {f.icon}
                  </svg>
                </span>
                <h3 className="mt-3.5 text-[15px] font-bold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* how */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
        <h2 className="text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink">Four steps, no detours</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="border-t-2 border-ink pt-4">
              <span className="font-mono text-[12px] font-bold tracking-[0.1em] text-brand">{s.n}</span>
              <h3 className="mt-1 text-[15px] font-bold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* faq */}
      <section id="faq" className="border-t border-line bg-white">
        <div className="mx-auto max-w-3xl scroll-mt-20 px-5 py-16">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink">Questions, answered</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {FAQ.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={open === i}
                >
                  <span className="text-[14.5px] font-bold text-ink">{f.q}</span>
                  <span className="text-ink-300">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && <p className="-mt-1 pb-4 pr-8 text-[13.5px] leading-relaxed text-ink-500">{f.a}</p>}
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-xl2 bg-ink px-6 py-8 text-center">
            <h3 className="text-[1.4rem] font-extrabold tracking-[-0.02em] text-white">Ready when you are</h3>
            <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-white/70">
              Open the editor, keep the sample content as a guide, and replace it line by line.
            </p>
            <NavLink to="editor" className="btn mt-5 bg-white px-5 py-2.5 text-[14px] text-ink hover:bg-white/90">
              Open the editor
            </NavLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
