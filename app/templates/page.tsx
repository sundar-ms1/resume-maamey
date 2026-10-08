'use client';

import { NavLink } from '@/components/NavLink';
import { useState } from 'react';
import { SiteFooter, SiteHeader } from '@/components/SiteHeader';
import { TemplateThumb } from '@/components/TemplateThumb';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/lib/templates';
import { SAMPLE_RESUME } from '@/lib/sampleData';

export default function TemplatesPage() {
  const [cat, setCat] = useState<string>('All');
  const list = cat === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.category === cat);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h1 className="text-[2rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[2.6rem]">
            {TEMPLATES.length} resume templates
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            Single-column classics for ATS screening, sidebar layouts for design-forward roles, serif editorial sets for
            senior and academic profiles. Pick one to open it in the editor — you can switch later without losing a word.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {TEMPLATE_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                  cat === c ? 'bg-ink text-white' : 'border border-line bg-white text-ink-500 hover:text-ink'
                }`}
              >
                {c}
                <span className="ml-1.5 text-[11px] opacity-60">
                  {c === 'All' ? TEMPLATES.length : TEMPLATES.filter((t) => t.category === c).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((t) => (
            <div key={t.id} className="card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-panel">
              <div className="relative overflow-hidden border-b border-line bg-canvas">
                <div className="mx-auto w-fit">
                  <TemplateThumb template={t} data={SAMPLE_RESUME} width={250} />
                </div>
                <NavLink
                  to="editor"
                  query={`t=${t.id}`}
                  className="absolute inset-0 flex items-center justify-center bg-ink/55 opacity-0 transition group-hover:opacity-100"
                >
                  <span className="btn bg-white text-ink">Use this template</span>
                </NavLink>
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                <span className="text-[13px] font-bold text-ink">{t.name}</span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-300">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.accent }} />
                  {t.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
