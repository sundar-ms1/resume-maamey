'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Check, ChevronDown, FileText, Sparkles, WandSparkles } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { SiteHeader } from '@/components/SiteHeader';
import { TemplateThumb } from '@/components/TemplateThumb';
import { TEMPLATES } from '@/lib/templates';
import { SAMPLE_RESUME } from '@/lib/sampleData';
import { GUIDES } from '@/lib/guidesData';

const FEATURES = [
  { title: 'Visual resume editor', body: 'Edit personal details, experience, education, projects and skills in a focused visual workspace.', icon: 'edit' },
  { title: 'Live A4 preview', body: 'See your resume on a realistic A4 page while you work, including spacing and page-break decisions.', icon: 'page' },
  { title: 'High-quality PDF', body: 'Download a clean PDF that you can open, review and share with employers.', icon: 'pdf' },
  { title: 'Flexible templates', body: 'Switch between resume designs without rewriting your content from scratch.', icon: 'switch' },
  { title: 'Organised sections', body: 'Build a clear structure for your summary, experience, education, skills, projects and certifications.', icon: 'search' },
  { title: 'No account required', body: 'Start building without registration or a paid subscription. Keep a copy of your finished PDF.', icon: 'lock' },
];

const STEPS = [
  ['01', 'Choose a design', 'Browse the available templates and choose a layout that fits your experience and target role.'],
  ['02', 'Add your information', 'Enter contact details, summary, education, experience, projects, skills and other relevant information.'],
  ['03', 'Polish the layout', 'Customise the design and use the live A4 preview to check spacing, dates, headings and page breaks.'],
  ['04', 'Download your PDF', 'Generate the PDF, open it once more and verify your content before sending it to an employer.'],
];

const FAQ = [
  ['Is Resume Maamey free to use?', 'Yes. Resume Maamey provides free resume templates and PDF downloading without requiring an account or paid subscription.'],
  ['Can freshers create a resume without work experience?', 'Yes. Students and freshers can highlight education, academic projects, internships, practical training, certifications, skills and relevant achievements.'],
  ['Can experienced professionals use Resume Maamey?', 'Yes. Experienced candidates can organise employment history, responsibilities, achievements, qualifications, skills and career summaries.'],
  ['How do I download my resume?', 'Complete your resume in the editor, review the A4 preview and select Download PDF. Open the downloaded PDF and check the final page layout.'],
  ['Are the templates ATS-friendly?', 'The templates use organised layouts and readable sections, but no template can guarantee compatibility with every applicant tracking system. Use clear headings and accurate, relevant information.'],
  ['Can I create a resume for jobs outside India?', 'Yes. You can prepare a resume for different job markets, but requirements vary by country and employer, so check the local application instructions.'],
  ['Does the editor require an account?', 'No. You can use the editor without registration. Download your completed resume when you finish so you have a copy of your work.'],
  ['Does Resume Maamey guarantee a job?', 'No. A resume builder helps you present your qualifications, but hiring decisions depend on your experience, skills, the role and the employer.'],
  ['Can I use the editor on a mobile phone?', 'Yes. The editor supports mobile layouts so you can enter information and check the preview before downloading.'],
  ['How do I get the best PDF result?', 'Review your name, contact details, spelling, dates, headings and page breaks before downloading. Open the PDF afterwards to confirm everything is displayed correctly.'],
];

function FeatureIcon({ type }: { type: string }) {
  if (type === 'page') return <FileText size={20} strokeWidth={1.8} />;
  if (type === 'pdf') return <span className="text-[11px] font-black tracking-tight">PDF</span>;
  if (type === 'switch') return <WandSparkles size={20} strokeWidth={1.8} />;
  if (type === 'search') return <span className="text-lg font-black">✓</span>;
  if (type === 'lock') return <span className="text-lg font-black">∞</span>;
  return <Sparkles size={20} strokeWidth={1.8} />;
}

export default function HomePage() {
  const [open, setOpen] = useState(0);
  const featured = TEMPLATES.slice(0, 6);

  return (
    <main className="overflow-hidden bg-[#070b18] text-white">
      <SiteHeader />

      {/* Premium hero */}
      <section className="relative isolate border-b border-white/10 bg-[#070b18]">
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-grid" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:pb-28 lg:pt-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-200 shadow-[0_0_30px_rgba(99,102,241,.15)]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.9)]" />
              Free · No login · PDF download
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.35rem]">
              Build a resume that looks
              <span className="hero-gradient block">ready for your next job.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-slate-300 sm:text-base">
              Resume Maamey is a free online resume builder for students, freshers and experienced professionals. Choose a modern template, add your information, customise the design, preview your A4 document and download a polished PDF without creating an account.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <NavLink to="editor" className="btn hero-primary px-5 py-3 text-sm font-extrabold">
                Create my free resume <ArrowRight size={16} />
              </NavLink>
              <NavLink to="templates" className="btn hero-secondary px-5 py-3 text-sm font-extrabold">
                Explore templates
              </NavLink>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-slate-400">
              {['No registration', 'Live A4 preview', 'Free PDF export'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check size={14} className="text-cyan-300" /> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
            <div className="resume-stage rounded-[30px] border border-white/10 bg-white/[0.055] p-4 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-xl sm:p-6">
              <div className="mb-4 flex items-center justify-between px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                <span>Live resume preview</span>
                <span className="rounded-full bg-cyan-300/10 px-2 py-1 text-cyan-200">A4 ready</span>
              </div>
              <div className="relative flex justify-center">
                <div className="resume-card-main rotate-[-2deg] rounded-lg bg-white p-2 shadow-2xl">
                  <TemplateThumb template={TEMPLATES[3]} data={SAMPLE_RESUME} width={300} />
                </div>
                <div className="resume-card-float absolute -bottom-5 -left-1 rotate-[5deg] rounded-lg bg-white p-2 shadow-2xl sm:left-5">
                  <TemplateThumb template={TEMPLATES[11]} data={SAMPLE_RESUME} width={160} />
                </div>
              </div>
            </div>
            <div className="absolute -right-3 -top-4 rounded-2xl border border-white/10 bg-[#11182d]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-5">
              <div className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">Templates</div>
              <div className="mt-0.5 text-xl font-black text-white">{TEMPLATES.length}+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / product strip */}
      <section className="border-b border-white/10 bg-[#0b1021]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 px-5 sm:grid-cols-4 sm:px-6">
          {[
            [String(TEMPLATES.length), 'Resume templates'],
            ['A4', 'Live page preview'],
            ['PDF', 'Ready-to-share export'],
            ['₹0', 'Subscription required'],
          ].map(([value, label]) => (
            <div key={label} className="bg-[#0b1021] px-4 py-7 text-center">
              <div className="text-2xl font-black tracking-tight text-white sm:text-3xl">{value}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[.13em] text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-[#f7f8fc] py-20 text-[#0b1021] sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <span className="section-kicker">Everything you need</span>
            <h2 className="section-title mt-3">A focused resume builder, without the clutter.</h2>
            <p className="section-copy mt-4">Create your resume in one place, keep the content organised and make design changes without rebuilding the document from scratch.</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <article key={feature.title} className="premium-card group p-6">
                <div className="icon-tile"><FeatureIcon type={feature.icon} /></div>
                <div className="mt-5 text-xs font-black text-indigo-500">0{i + 1}</div>
                <h3 className="mt-1 text-lg font-black tracking-tight text-[#0b1021]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <span className="section-kicker">Built for real job seekers</span>
              <h2 className="section-title mt-3">One builder for different career stages.</h2>
            </div>
            <p className="section-copy max-w-2xl lg:justify-self-end">Your resume should reflect your actual experience. Use the sections that matter to you and focus on accurate, relevant information instead of filling space with generic claims.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['Students & freshers', 'Highlight education, projects, internships, practical training, certifications, skills and genuine achievements.', '/guides/fresher-resume-guide'],
              ['Experienced professionals', 'Organise employment history, responsibilities, measurable achievements, skills and relevant qualifications.', '/guides'],
              ['Career changers', 'Present transferable skills, relevant projects, training and a clear summary that connects your previous work to the new role.', '/guides'],
            ].map(([title, body, href]) => (
              <article key={title} className="audience-card">
                <div className="text-xs font-black uppercase tracking-[.14em] text-indigo-500">Resume strategy</div>
                <h3 className="mt-3 text-xl font-black tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
                <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-indigo-600 hover:text-indigo-800">Read guidance <ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="bg-[#0b1021] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-kicker dark">Template gallery</span>
              <h2 className="section-title dark mt-3">Pick a look. Keep your content.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">Switch between designs while keeping your resume information organised in the same editor.</p>
            </div>
            <Link href="/templates" className="btn hero-secondary w-fit px-5 py-3 text-sm font-extrabold">View all templates <ArrowRight size={16} /></Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {featured.map((template) => (
              <Link key={template.id} href="/templates" className="template-tile group">
                <div className="overflow-hidden rounded-xl bg-white p-1.5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgba(99,102,241,.25)]">
                  <TemplateThumb template={template} data={SAMPLE_RESUME} width={170} />
                </div>
                <div className="mt-2 text-[11px] font-bold text-slate-300">{template.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-[#f7f8fc] py-20 text-[#0b1021] sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <span className="section-kicker">How it works</span>
          <h2 className="section-title mt-3">From blank page to finished PDF in four steps.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([n, title, body]) => (
              <article key={n} className="step-card">
                <div className="step-number">{n}</div>
                <h3 className="mt-5 text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
          <NavLink to="editor" className="btn btn-primary mt-9 px-5 py-3 text-sm font-extrabold">Start creating my resume <ArrowRight size={16} /></NavLink>
        </div>
      </section>

      {/* Guidance + guides */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <span className="section-kicker">Practical resume guidance</span>
            <h2 className="section-title mt-3">Good design helps. Good content matters more.</h2>
            <p className="section-copy mt-4">Use the builder to organise your information, then use these practical principles to make the finished document clearer and more useful.</p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              ['Choose relevant information', 'Freshers can focus on education, projects, internships and practical skills. Experienced candidates should prioritise recent work and achievements relevant to the target role.'],
              ['Describe achievements honestly', 'Explain what you worked on and what you accomplished. Use numbers and measurable results only when they are accurate and you can support them.'],
              ['Keep the layout readable', 'Use clear headings, consistent dates, readable text and sensible spacing. Always follow the file and application instructions provided by the employer.'],
            ].map(([title, body]) => (
              <article key={title} className="premium-card p-6">
                <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                <h3 className="mt-5 text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-kicker">Free guides</span>
              <h2 className="section-title mt-3 text-3xl">Learn before you apply.</h2>
            </div>
            <Link href="/guides" className="btn btn-ghost w-fit px-5 py-3 font-extrabold">Browse all guides <ArrowRight size={16} /></Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {GUIDES.slice(0, 3).map((guide) => (
              <article key={guide.slug} className="guide-card">
                <div className="text-[10px] font-black uppercase tracking-[.15em] text-indigo-500">{guide.readTime}</div>
                <h3 className="mt-3 text-lg font-black leading-tight">{guide.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{guide.description}</p>
                <Link href={`/guides/${guide.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-indigo-600">Read guide <ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#f7f8fc] py-20 text-[#0b1021] sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <span className="section-kicker">Questions</span>
          <h2 className="section-title mt-3">Frequently asked questions.</h2>
          <p className="section-copy mt-4">Answers about templates, editing, PDFs, ATS-friendly formatting and using Resume Maamey without an account.</p>

          <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,.06)]">
            {FAQ.map(([question, answer], index) => (
              <div key={question} className="border-b border-slate-200 last:border-b-0">
                <button type="button" onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7" aria-expanded={open === index}>
                  <span className="text-sm font-extrabold sm:text-[15px]">{question}</span>
                  <ChevronDown size={18} className={`shrink-0 text-slate-400 transition ${open === index ? 'rotate-180' : ''}`} />
                </button>
                {open === index && <p className="px-5 pb-5 pr-12 text-sm leading-6 text-slate-600 sm:px-7 sm:pb-6">{answer}</p>}
              </div>
            ))}
          </div>

          <div className="cta-panel mt-12 rounded-[28px] p-8 text-center sm:p-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-200"><Sparkles size={22} /></div>
            <h3 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">Your next application starts here.</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">Choose a template, enter your information and create a professional resume with the free Resume Maamey editor.</p>
            <NavLink to="editor" className="btn mt-7 bg-white px-5 py-3 text-sm font-extrabold text-[#0b1021] hover:bg-slate-100">Open the free resume editor <ArrowRight size={16} /></NavLink>
          </div>
        </div>
      </section>
    </main>
  );
}
