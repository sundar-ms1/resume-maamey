import React from 'react';
import type { LayoutId, SectionKey } from '@/lib/types';
import { RenderProps, SectionHeading, Sections, contactItems, visibleSections, SectionBody } from './blocks';

const SIDE: SectionKey[] = ['skills', 'languages', 'certifications'];
const MAIN: SectionKey[] = ['summary', 'experience', 'projects', 'education', 'achievements'];

const PAD = 40;

/* ---------- shared header pieces ---------- */

function NameBlock({ data, design, align = 'left', light = false, big = 1 }: RenderProps & { align?: 'left' | 'center'; light?: boolean; big?: number }) {
  return (
    <div style={{ textAlign: align }}>
      <h1
        style={{
          margin: 0,
          fontFamily: design.headingFont,
          fontSize: `${1.95 * big}em`,
          lineHeight: 1.12,
          fontWeight: 800,
          letterSpacing: '-0.015em',
          color: light ? '#fff' : '#111827',
        }}
      >
        {data.basics.name}
      </h1>
      {data.basics.title ? (
        <div
          style={{
            marginTop: 2,
            fontFamily: design.headingFont,
            fontSize: '1.02em',
            fontWeight: 600,
            letterSpacing: design.uppercaseHeadings ? '0.12em' : '0.01em',
            textTransform: design.uppercaseHeadings ? 'uppercase' : 'none',
            color: light ? 'rgba(255,255,255,.88)' : design.accent,
          }}
        >
          {data.basics.title}
        </div>
      ) : null}
    </div>
  );
}

function ContactLine({ data, design, align = 'left', light = false }: RenderProps & { align?: 'left' | 'center'; light?: boolean }) {
  const items = contactItems(data);
  if (!items.length) return null;
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2px 12px',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        fontSize: '0.88em',
        color: light ? 'rgba(255,255,255,.85)' : '#374151',
        marginTop: 6,
      }}
    >
      {items.map((t, i) => (
        <span key={i} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
          {i > 0 && <span style={{ opacity: 0.45 }}>|</span>}
          <span>{t}</span>
        </span>
      ))}
    </div>
  );
}

function ContactStack({ data, design, light }: RenderProps & { light?: boolean }) {
  const b = data.basics;
  const rows = [
    ['Email', b.email],
    ['Phone', b.phone],
    ['Location', b.location],
    ['Website', b.website],
    ['LinkedIn', b.linkedin],
    ['GitHub', b.github],
  ].filter(([, v]) => v);
  if (!rows.length) return null;
  return (
    <section style={{ marginBottom: design.sectionGap }}>
      <SectionHeading design={design} variant="sidebar" light={light}>
        Contact
      </SectionHeading>
      <div style={{ display: 'grid', gap: 4, fontSize: '0.88em' }}>
        {rows.map(([label, value]) => (
          <div key={label}>
            <div style={{ fontWeight: 700, fontSize: '0.86em', opacity: light ? 0.7 : 0.55, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {label}
            </div>
            <div style={{ wordBreak: 'break-word' }}>{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- layouts ---------- */

function Classic(p: RenderProps) {
  return (
    <div>
      <header style={{ marginBottom: 14, paddingBottom: 10, borderBottom: `2px solid ${p.design.accent}` }}>
        <NameBlock {...p} align="center" />
        <ContactLine {...p} align="center" />
      </header>
      <Sections {...p} headingVariant="underline" />
    </div>
  );
}

function Executive(p: RenderProps) {
  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <NameBlock {...p} big={1.08} />
        <div style={{ height: 3, width: 64, background: p.design.accent, margin: '8px 0' }} />
        <ContactLine {...p} />
      </header>
      <Sections {...p} headingVariant="rule" bodyVariant="stack" />
    </div>
  );
}

function Elegant(p: RenderProps) {
  return (
    <div>
      <header style={{ textAlign: 'center', marginBottom: 18 }}>
        <NameBlock {...p} align="center" big={1.1} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center', margin: '8px 0 0' }}>
          <span style={{ width: 28, height: 1, background: p.design.accent }} />
          <span style={{ width: 5, height: 5, borderRadius: 5, background: p.design.accent }} />
          <span style={{ width: 28, height: 1, background: p.design.accent }} />
        </div>
        <ContactLine {...p} align="center" />
      </header>
      <Sections {...p} headingVariant="centered" />
    </div>
  );
}

function Minimal(p: RenderProps) {
  return (
    <div>
      <header style={{ marginBottom: 18 }}>
        <NameBlock {...p} />
        <ContactLine {...p} />
      </header>
      <Sections {...p} headingVariant="plain" />
    </div>
  );
}

function Compact(p: RenderProps) {
  return (
    <div>
      <header style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, borderBottom: `1px solid ${p.design.accent}55`, paddingBottom: 8 }}>
        <NameBlock {...p} big={0.88} />
        <div style={{ textAlign: 'right', fontSize: '0.84em', color: '#374151', display: 'grid', gap: 1 }}>
          {contactItems(p.data).map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </header>
      <Sections {...p} headingVariant="bar" bodyVariant="compact" />
    </div>
  );
}

function Timeline(p: RenderProps) {
  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <NameBlock {...p} />
        <ContactLine {...p} />
      </header>
      <Sections {...p} headingVariant="bar" bodyVariant="timeline" />
    </div>
  );
}

function Academic(p: RenderProps) {
  const order: SectionKey[] = ['summary', 'education', 'experience', 'projects', 'achievements', 'certifications', 'skills', 'languages'];
  const data = { ...p.data, sectionOrder: order.filter((k) => p.data.sectionOrder.includes(k)) };
  return (
    <div>
      <header style={{ textAlign: 'center', marginBottom: 16 }}>
        <NameBlock {...p} align="center" big={1.02} />
        <ContactLine {...p} align="center" />
        <div style={{ height: 1, background: '#d1d5db', marginTop: 12 }} />
      </header>
      <Sections data={data} design={p.design} headingVariant="rule" />
    </div>
  );
}

function TechGrid(p: RenderProps) {
  const { data, design } = p;
  const left = visibleSections(data, ['summary', 'experience', 'projects']);
  const right = visibleSections(data, ['skills', 'education', 'certifications', 'achievements', 'languages']);
  return (
    <div>
      <header
        style={{
          marginBottom: 14,
          padding: '10px 12px',
          background: design.accent + '0f',
          borderLeft: `3px solid ${design.accent}`,
        }}
      >
        <NameBlock {...p} big={0.92} />
        <ContactLine {...p} />
      </header>
      <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 62%', minWidth: 0 }}>
          {left.map((k) => (
            <section key={k} style={{ marginBottom: design.sectionGap }} className="rm-section">
              <SectionHeading design={design} variant="bar">{data.sectionTitles[k]}</SectionHeading>
              <SectionBody k={k} data={data} design={design} />
            </section>
          ))}
        </div>
        <div style={{ flex: '1 1 38%', minWidth: 0 }}>
          {right.map((k) => (
            <section key={k} style={{ marginBottom: design.sectionGap }} className="rm-section">
              <SectionHeading design={design} variant="bar">{data.sectionTitles[k]}</SectionHeading>
              <SectionBody k={k} data={data} design={design} variant="stack" />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function Creative(p: RenderProps) {
  const { design } = p;
  return (
    <div>
      <header style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
        <div
          style={{
            width: 62,
            height: 62,
            flex: '0 0 auto',
            borderRadius: 62,
            background: design.accent,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: design.headingFont,
            fontWeight: 800,
            fontSize: '1.5em',
            letterSpacing: '0.02em',
          }}
        >
          {p.data.basics.name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join('')}
        </div>
        <div style={{ minWidth: 0 }}>
          <NameBlock {...p} big={0.95} />
          <ContactLine {...p} />
        </div>
      </header>
      <Sections {...p} headingVariant="boxed" bodyVariant="stack" />
    </div>
  );
}

function Banner(p: RenderProps) {
  const { data, design } = p;
  return (
    <div>
      <header style={{ background: design.accent, color: '#fff', padding: `26px ${PAD}px 22px` }}>
        <NameBlock {...p} light big={1.05} />
        <ContactLine {...p} light />
      </header>
      <div style={{ padding: `18px ${PAD}px 28px` }}>
        <Sections {...p} headingVariant="rule" />
      </div>
    </div>
  );
}

function SidebarLeft(p: RenderProps) {
  const { data, design } = p;
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', flex: 1, minHeight: 0 }}>
      <aside
        style={{
          flex: '0 0 33%',
          background: design.accent,
          color: '#fff',
          padding: '30px 22px',
        }}
      >
        <NameBlock {...p} light big={0.82} />
        <div style={{ height: 14 }} />
        <ContactStack {...p} light />
        <Sections {...p} only={SIDE} headingVariant="sidebar" bodyVariant="stack" light />
      </aside>
      <main style={{ flex: 1, padding: '30px 26px', minWidth: 0 }}>
        <Sections {...p} only={MAIN} headingVariant="rule" />
      </main>
    </div>
  );
}

function SidebarRight(p: RenderProps) {
  const { design } = p;
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', flex: 1, minHeight: 0 }}>
      <main style={{ flex: 1, padding: '30px 26px', minWidth: 0 }}>
        <header style={{ marginBottom: 14, paddingBottom: 10, borderBottom: `2px solid ${design.accent}` }}>
          <NameBlock {...p} />
        </header>
        <Sections {...p} only={MAIN} headingVariant="rule" />
      </main>
      <aside
        style={{
          flex: '0 0 32%',
          background: design.accent + '0f',
          borderLeft: `2px solid ${design.accent}`,
          padding: '30px 20px',
        }}
      >
        <ContactStack {...p} />
        <Sections {...p} only={SIDE} headingVariant="sidebar" bodyVariant="stack" />
      </aside>
    </div>
  );
}

export const LAYOUTS: Record<LayoutId, (p: RenderProps) => JSX.Element> = {
  classic: Classic,
  executive: Executive,
  elegant: Elegant,
  minimal: Minimal,
  compact: Compact,
  timeline: Timeline,
  academic: Academic,
  techGrid: TechGrid,
  creative: Creative,
  banner: Banner,
  sidebarLeft: SidebarLeft,
  sidebarRight: SidebarRight,
};
