'use client';

import React from 'react';
import { useResume } from '@/lib/store';
import type { SectionKey } from '@/lib/types';
import { IconBtn } from './ui';

export function SectionsPanel() {
  const { data, moveSection, toggleSection, renameSection, loadSample, clearAll, exportDraft, importDraft } = useResume();
  const fileRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="p-4">
      <p className="mb-3 text-[11.5px] leading-relaxed text-ink-300">
        Reorder sections, rename any heading, or hide what you do not need. Empty sections never print.
      </p>
      <div className="space-y-2">
        {data.sectionOrder.map((k: SectionKey, i) => {
          const hidden = data.hiddenSections.includes(k);
          return (
            <div
              key={k}
              className={`flex items-center gap-1 rounded-xl2 border border-line bg-white px-2 py-1.5 ${hidden ? 'opacity-50' : ''}`}
            >
              <span className="flex-none text-ink-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 7h8M8 12h8M8 17h8" />
                </svg>
              </span>
              <input
                className="min-w-0 flex-1 bg-transparent px-1 py-1 text-[13px] font-semibold text-ink outline-none"
                value={data.sectionTitles[k]}
                onChange={(e) => renameSection(k, e.target.value)}
              />
              <IconBtn label="Move up" onClick={() => moveSection(k, -1)}>
                <path d="m6 15 6-6 6 6" />
              </IconBtn>
              <IconBtn label="Move down" onClick={() => moveSection(k, 1)}>
                <path d="m6 9 6 6 6-6" />
              </IconBtn>
              <IconBtn label={hidden ? 'Show section' : 'Hide section'} onClick={() => toggleSection(k)} active={!hidden}>
                {hidden ? (
                  <>
                    <path d="M3 3l18 18" />
                    <path d="M10.6 5.2A9 9 0 0 1 21 12a17 17 0 0 1-2.2 2.9M6.3 6.4A17 17 0 0 0 3 12a9 9 0 0 0 12.5 4.6" />
                  </>
                ) : (
                  <>
                    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </IconBtn>
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-2 border-t border-line pt-4">
        <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-slate-400">Draft file</p>
        <button onClick={exportDraft} className="btn btn-ghost w-full">
          Save draft (.json)
        </button>
        <button onClick={() => fileRef.current?.click()} className="btn btn-ghost w-full">
          Open draft file
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            e.target.value = '';
            if (!f) return;
            try {
              await importDraft(f);
            } catch {
              window.alert('That file is not a Resume Maamey draft.');
            }
          }}
        />
        <p className="mb-1 pt-3 text-[11px] uppercase tracking-[0.14em] text-slate-400">Content</p>
        <button onClick={loadSample} className="btn btn-ghost w-full">
          Load sample content
        </button>
        <button
          onClick={() => {
            if (window.confirm('Clear all content and start from a blank resume?')) clearAll();
          }}
          className="btn btn-ghost w-full text-red-600 hover:border-red-200 hover:bg-red-50"
        >
          Start from blank
        </button>
      </div>
    </div>
  );
}
