'use client';

import React from 'react';
import { useResume } from '@/lib/store';
import { ACCENT_SWATCHES, getTemplate } from '@/lib/templates';
import { FONT_FAMILIES } from '@/lib/fonts';
import { Select, Slider, Toggle } from './ui';

export function DesignPanel() {
  const { data, updateDesign, applyTemplate } = useResume();
  const d = data.design;
  const t = getTemplate(d.templateId);
  const fullBleed = t.pageMargin === 0;

  return (
    <div className="space-y-5 p-4">
      <div>
        <span className="field-label">Accent colour</span>
        <div className="grid grid-cols-8 gap-1.5">
          {ACCENT_SWATCHES.map((c) => (
            <button
              key={c}
              onClick={() => updateDesign({ accent: c })}
              aria-label={`Accent ${c}`}
              className={`h-6 w-6 rounded-md transition ${d.accent === c ? 'ring-2 ring-offset-2 ring-ink' : 'hover:scale-110'}`}
              style={{ background: c }}
            />
          ))}
        </div>
        <label className="mt-2.5 flex items-center gap-2 text-[12px] font-semibold text-ink-500">
          <input
            type="color"
            value={d.accent}
            onChange={(e) => updateDesign({ accent: e.target.value })}
            className="h-8 w-10 cursor-pointer rounded border border-line bg-white p-0.5"
          />
          Custom colour ({d.accent})
        </label>
      </div>

      <div className="grid gap-2.5">
        <Select label="Heading font" value={d.headingFont} options={FONT_FAMILIES} onChange={(v) => updateDesign({ headingFont: v })} />
        <Select label="Body font" value={d.bodyFont} options={FONT_FAMILIES} onChange={(v) => updateDesign({ bodyFont: v })} />
      </div>

      <div className="space-y-4">
        <Slider
          label="Text size"
          min={0.85}
          max={1.2}
          step={0.01}
          value={d.fontScale}
          onChange={(v) => updateDesign({ fontScale: v })}
          display={`${Math.round(d.fontScale * 100)}%`}
        />
        <Slider
          label="Line height"
          min={1.2}
          max={1.8}
          step={0.02}
          value={d.lineHeight}
          onChange={(v) => updateDesign({ lineHeight: v })}
          display={d.lineHeight.toFixed(2)}
        />
        <Slider
          label="Space between sections"
          min={6}
          max={30}
          step={1}
          value={d.sectionGap}
          onChange={(v) => updateDesign({ sectionGap: v })}
          suffix="px"
        />
        {!fullBleed && (
          <Slider
            label="Page margin"
            min={24}
            max={72}
            step={1}
            value={d.pageMargin}
            onChange={(v) => updateDesign({ pageMargin: v })}
            suffix="px"
          />
        )}
      </div>

      <div className="space-y-2">
        <Toggle label="Uppercase headings" checked={d.uppercaseHeadings} onChange={(v) => updateDesign({ uppercaseHeadings: v })} />
        <Toggle label="Show divider lines" checked={d.showDividers} onChange={(v) => updateDesign({ showDividers: v })} />
      </div>

      <button onClick={() => applyTemplate(d.templateId)} className="btn btn-ghost w-full">
        Reset design to {t.name} defaults
      </button>
    </div>
  );
}
