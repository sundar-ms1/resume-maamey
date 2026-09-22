'use client';

import React, { useState } from 'react';
import { useResume } from '@/lib/store';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/lib/templates';
import { TemplateThumb } from '@/components/TemplateThumb';

export function TemplatePanel() {
  const { data, applyTemplate } = useResume();
  const [cat, setCat] = useState<string>('All');
  const list = cat === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.category === cat);

  return (
    <div className="p-4">
      <div className="-mx-1 mb-3 flex flex-wrap gap-1.5">
        {TEMPLATE_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition ${
              cat === c ? 'bg-ink text-white' : 'bg-canvas text-ink-500 hover:text-ink'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="mb-3 text-[11.5px] text-ink-300">{list.length} templates · your content stays intact</p>
      <div className="grid grid-cols-2 gap-3">
        {list.map((t) => {
          const active = data.design.templateId === t.id;
          return (
            <button
              key={t.id}
              onClick={() => applyTemplate(t.id)}
              className={`overflow-hidden rounded-xl2 border bg-white text-left transition ${
                active ? 'border-brand ring-2 ring-brand/25' : 'border-line hover:border-ink-300'
              }`}
            >
              <div className="overflow-hidden border-b border-line bg-canvas">
                <TemplateThumb template={t} data={data} width={156} />
              </div>
              <div className="flex items-center justify-between gap-1 px-2 py-1.5">
                <span className="truncate text-[11.5px] font-bold text-ink">{t.name}</span>
                {active ? (
                  <span className="text-[10px] font-bold uppercase tracking-[0.05em] text-brand">Active</span>
                ) : (
                  <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: t.accent }} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
