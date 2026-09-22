'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Design, ResumeData, SectionKey } from './types';
import { SAMPLE_RESUME, EMPTY_RESUME } from './sampleData';
import { getTemplate } from './templates';

type ListKey = 'experience' | 'education' | 'projects' | 'skills' | 'certifications' | 'languages' | 'achievements';

interface Ctx {
  data: ResumeData;
  setData: (next: ResumeData) => void;
  updateBasics: (patch: Partial<ResumeData['basics']>) => void;
  updateDesign: (patch: Partial<Design>) => void;
  applyTemplate: (id: string) => void;
  addItem: (key: ListKey) => void;
  updateItem: (key: ListKey, id: string, patch: Record<string, unknown>) => void;
  removeItem: (key: ListKey, id: string) => void;
  moveItem: (key: ListKey, id: string, dir: -1 | 1) => void;
  moveSection: (key: SectionKey, dir: -1 | 1) => void;
  toggleSection: (key: SectionKey) => void;
  renameSection: (key: SectionKey, title: string) => void;
  loadSample: () => void;
  clearAll: () => void;
  exportDraft: () => void;
  importDraft: (file: File) => Promise<void>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ResumeContext = createContext<Ctx | null>(null);

const uid = () => Math.random().toString(36).slice(2, 9);

const BLANKS: Record<ListKey, () => Record<string, unknown>> = {
  experience: () => ({ id: uid(), role: 'Job Title', company: 'Company', location: '', start: '', end: '', bullets: ['Describe your impact here.'] }),
  education: () => ({ id: uid(), degree: 'Degree', school: 'Institution', location: '', start: '', end: '', score: '' }),
  projects: () => ({ id: uid(), name: 'Project', stack: '', link: '', description: '' }),
  skills: () => ({ id: uid(), label: 'Category', items: '' }),
  certifications: () => ({ id: uid(), name: 'Certification', issuer: '', year: '' }),
  languages: () => ({ id: uid(), name: 'Language', level: '' }),
  achievements: () => ({ id: uid(), text: 'Something you are proud of.' }),
};

/** /editor?t=<templateId> opens straight into that template. */
function withUrlTemplate(base: ResumeData): ResumeData {
  if (typeof window === 'undefined') return base;
  const wanted = new URLSearchParams(window.location.search).get('t');
  if (!wanted) return base;
  const t = getTemplate(wanted);
  if (t.id !== wanted) return base;
  return {
    ...base,
    design: {
      ...base.design,
      templateId: t.id,
      accent: t.accent,
      headingFont: t.headingFont,
      bodyFont: t.bodyFont,
      fontScale: t.fontScale,
      uppercaseHeadings: t.uppercaseHeadings,
      showDividers: t.showDividers,
      pageMargin: t.pageMargin,
    },
  };
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataRaw] = useState<ResumeData>(SAMPLE_RESUME);

  const urlApplied = useRef(false);
  const past = useRef<ResumeData[]>([]);
  const future = useRef<ResumeData[]>([]);
  const [version, setVersion] = useState(0);
  /* deep link: /editor?t=<templateId>. Runs after mount so SSR and client markup match. */
  useEffect(() => {
    if (urlApplied.current) return;
    urlApplied.current = true;
    setDataRaw((prev) => withUrlTemplate(prev));
  }, []);

  const commit = useCallback((updater: (prev: ResumeData) => ResumeData) => {
    setDataRaw((prev) => {
      past.current = [...past.current.slice(-49), prev];
      future.current = [];
      setVersion((v) => v + 1);
      return updater(prev);
    });
  }, []);

  const setData = useCallback((next: ResumeData) => commit(() => next), [commit]);

  const updateBasics: Ctx['updateBasics'] = useCallback(
    (patch) => commit((p) => ({ ...p, basics: { ...p.basics, ...patch } })),
    [commit],
  );

  const updateDesign: Ctx['updateDesign'] = useCallback(
    (patch) => commit((p) => ({ ...p, design: { ...p.design, ...patch } })),
    [commit],
  );

  const applyTemplate: Ctx['applyTemplate'] = useCallback(
    (id) =>
      commit((p) => {
        const t = getTemplate(id);
        return {
          ...p,
          design: {
            ...p.design,
            templateId: t.id,
            accent: t.accent,
            headingFont: t.headingFont,
            bodyFont: t.bodyFont,
            fontScale: t.fontScale,
            uppercaseHeadings: t.uppercaseHeadings,
            showDividers: t.showDividers,
            pageMargin: t.pageMargin,
          },
        };
      }),
    [commit],
  );

  const addItem: Ctx['addItem'] = useCallback(
    (key) => commit((p) => ({ ...p, [key]: [...(p[key] as unknown[]), BLANKS[key]()] }) as ResumeData),
    [commit],
  );

  const updateItem: Ctx['updateItem'] = useCallback(
    (key, id, patch) =>
      commit((p) => ({
        ...p,
        [key]: (p[key] as Array<{ id: string }>).map((it) => (it.id === id ? { ...it, ...patch } : it)),
      }) as ResumeData),
    [commit],
  );

  const removeItem: Ctx['removeItem'] = useCallback(
    (key, id) =>
      commit((p) => ({ ...p, [key]: (p[key] as Array<{ id: string }>).filter((it) => it.id !== id) }) as ResumeData),
    [commit],
  );

  const moveItem: Ctx['moveItem'] = useCallback(
    (key, id, dir) =>
      commit((p) => {
        const list = [...(p[key] as Array<{ id: string }>)];
        const i = list.findIndex((it) => it.id === id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= list.length) return p;
        [list[i], list[j]] = [list[j], list[i]];
        return { ...p, [key]: list } as ResumeData;
      }),
    [commit],
  );

  const moveSection: Ctx['moveSection'] = useCallback(
    (key, dir) =>
      commit((p) => {
        const order = [...p.sectionOrder];
        const i = order.indexOf(key);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= order.length) return p;
        [order[i], order[j]] = [order[j], order[i]];
        return { ...p, sectionOrder: order };
      }),
    [commit],
  );

  const toggleSection: Ctx['toggleSection'] = useCallback(
    (key) =>
      commit((p) => ({
        ...p,
        hiddenSections: p.hiddenSections.includes(key)
          ? p.hiddenSections.filter((k) => k !== key)
          : [...p.hiddenSections, key],
      })),
    [commit],
  );

  const renameSection: Ctx['renameSection'] = useCallback(
    (key, title) => commit((p) => ({ ...p, sectionTitles: { ...p.sectionTitles, [key]: title } })),
    [commit],
  );

  const loadSample = useCallback(() => commit(() => SAMPLE_RESUME), [commit]);
  const clearAll = useCallback(
    () => commit((p) => ({ ...EMPTY_RESUME, design: p.design, sectionOrder: p.sectionOrder })),
    [commit],
  );

  const exportDraft = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(data.basics.name || 'resume').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-resume-maamey.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importDraft = useCallback(
    async (file: File) => {
      const text = await file.text();
      const parsed = JSON.parse(text) as ResumeData;
      if (!parsed || !parsed.basics) throw new Error('Not a Resume Maamey draft');
      commit((p) => ({ ...SAMPLE_RESUME, ...parsed, design: { ...p.design, ...parsed.design } }));
    },
    [commit],
  );

  const undo = useCallback(() => {
    setDataRaw((cur) => {
      const prev = past.current.pop();
      if (!prev) return cur;
      future.current = [cur, ...future.current].slice(0, 50);
      setVersion((v) => v + 1);
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    setDataRaw((cur) => {
      const [next, ...rest] = future.current;
      if (!next) return cur;
      future.current = rest;
      past.current = [...past.current, cur];
      setVersion((v) => v + 1);
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      data,
      setData,
      updateBasics,
      updateDesign,
      applyTemplate,
      addItem,
      updateItem,
      removeItem,
      moveItem,
      moveSection,
      toggleSection,
      renameSection,
      loadSample,
      clearAll,
      exportDraft,
      importDraft,
      undo,
      redo,
      canUndo: past.current.length > 0,
      canRedo: future.current.length > 0,
    }),
    // version forces recompute of canUndo/canRedo
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, version, setData, updateBasics, updateDesign, applyTemplate, addItem, updateItem, removeItem, moveItem, moveSection, toggleSection, renameSection, loadSample, clearAll, exportDraft, importDraft, undo, redo],
  );

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
}
