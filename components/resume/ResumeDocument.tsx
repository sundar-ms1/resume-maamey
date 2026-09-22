'use client';

import React from 'react';
import type { ResumeData } from '@/lib/types';
import { getTemplate } from '@/lib/templates';
import { LAYOUTS } from './layouts';

export const A4_WIDTH_PX = 793.7;
export const A4_HEIGHT_PX = 1122.5;

export const ResumeDocument = React.forwardRef<HTMLDivElement, { data: ResumeData; id?: string }>(
  function ResumeDocument({ data, id }, ref) {
    const design = data.design;
    const template = getTemplate(design.templateId);
    const Layout = LAYOUTS[template.layout];
    const fullBleed = design.pageMargin === 0;

    return (
      <div
        id={id}
        ref={ref}
        className="rm-page"
        style={{
          width: `${A4_WIDTH_PX}px`,
          minHeight: `${A4_HEIGHT_PX}px`,
          background: '#fff',
          color: '#1f2937',
          fontFamily: design.bodyFont,
          fontSize: `${10.4 * design.fontScale}pt`,
          lineHeight: design.lineHeight,
          padding: fullBleed ? 0 : design.pageMargin,
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Layout data={data} design={design} />
      </div>
    );
  },
);
