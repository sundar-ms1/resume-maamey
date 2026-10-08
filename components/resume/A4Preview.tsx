'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ResumeData } from '@/lib/types';
import { A4_HEIGHT_PX, A4_WIDTH_PX, ResumeDocument } from './ResumeDocument';

/* a few px of tolerance keeps an exactly-full page from counting as two */
export function pageCountFor(height: number) {
  return Math.max(1, Math.ceil((height - 8) / A4_HEIGHT_PX));
}

interface Props {
  data: ResumeData;
  zoom: number | 'fit';
  onPageCount?: (n: number) => void;
}

export function A4Preview({ data, zoom, onPageCount }: Props) {
  const shellRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(0.62);
  const [height, setHeight] = useState(A4_HEIGHT_PX);

  const measure = useCallback(() => {
    if (shellRef.current) {
      const available = shellRef.current.clientWidth - 48;
      setFitScale(Math.min(1.1, Math.max(0.28, available / A4_WIDTH_PX)));
    }
    if (pageRef.current) {
      const h = Math.max(A4_HEIGHT_PX, pageRef.current.scrollHeight);
      setHeight(h);
      onPageCount?.(pageCountFor(h));
    }
  }, [onPageCount]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (shellRef.current) ro.observe(shellRef.current);
    if (pageRef.current) ro.observe(pageRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, data]);

  const scale = zoom === 'fit' ? fitScale : zoom;
  const pages = pageCountFor(height);

  return (
    <div ref={shellRef} className="rm-preview-shell">
      <div
        style={{
          width: A4_WIDTH_PX * scale,
          height: height * scale,
          margin: '0 auto',
          position: 'relative',
          transition: 'width .18s ease',
        }}
      >
        <div
          className="rm-scaler"
          style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: A4_WIDTH_PX, position: 'absolute', top: 0, left: 0 }}
        >
          <div className="rm-page-shadow" style={{ position: 'relative' }}>
            <ResumeDocument id="resume-print" ref={pageRef} data={data} />
            {/* page break guides */}
            {Array.from({ length: pages - 1 }).map((_, i) => (
              <div
                key={i}
                className="rm-break"
                style={{ position: 'absolute', left: 0, right: 0, top: (i + 1) * A4_HEIGHT_PX }}
              >
                <span>Page {i + 2}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
