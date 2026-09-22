'use client';

import React from 'react';
import type { ResumeData, TemplateDef } from '@/lib/types';
import { A4_HEIGHT_PX, A4_WIDTH_PX, ResumeDocument } from './resume/ResumeDocument';

/** Non-interactive miniature of a template, rendered from the real layout engine. */
export function TemplateThumb({
  template,
  data,
  width = 210,
}: {
  template: TemplateDef;
  data: ResumeData;
  width?: number;
}) {
  const scale = width / A4_WIDTH_PX;
  const preview: ResumeData = {
    ...data,
    design: {
      ...data.design,
      templateId: template.id,
      accent: template.accent,
      headingFont: template.headingFont,
      bodyFont: template.bodyFont,
      fontScale: template.fontScale,
      uppercaseHeadings: template.uppercaseHeadings,
      showDividers: template.showDividers,
      pageMargin: template.pageMargin,
    },
  };

  return (
    <div
      style={{ width, height: A4_HEIGHT_PX * scale, overflow: 'hidden', position: 'relative', background: '#fff' }}
      aria-hidden
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: A4_WIDTH_PX, position: 'absolute', inset: 0 }}>
        <ResumeDocument data={preview} />
      </div>
    </div>
  );
}
