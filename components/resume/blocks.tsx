import React from 'react';
import type { Design, ResumeData, SectionKey } from '@/lib/types';

export interface RenderProps {
  data: ResumeData;
  design: Design;
}

export type HeadingVariant = 'underline' | 'plain' | 'bar' | 'boxed' | 'sidebar' | 'centered' | 'rule';

export const px = (n: number) => `${n}px`;

export function contactItems(data: ResumeData): string[] {
  const b = data.basics;
  return [b.email, b.phone, b.location, b.website, b.linkedin, b.github].filter(Boolean);
}

export function SectionHeading({
  children,
  design,
  variant = 'underline',
  light = false,
}: {
  children: React.ReactNode;
  design: Design;
  variant?: HeadingVariant;
  light?: boolean;
}) {
  const accent = design.accent;
  const color = light ? '#ffffff' : accent;
  const common: React.CSSProperties = {
    fontFamily: design.headingFont,
    textTransform: design.uppercaseHeadings ? 'uppercase' : 'none',
    letterSpacing: design.uppercaseHeadings ? '0.09em' : '0.01em',
    fontWeight: 700,
    fontSize: '1.02em',
    color,
    margin: 0,
  };

  if (variant === 'bar') {
    return (
      <h2 style={{ ...common, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ width: 4, height: '0.95em', background: accent, display: 'inline-block', borderRadius: 2 }} />
        {children}
      </h2>
    );
  }
  if (variant === 'boxed') {
    return (
      <h2
        style={{
          ...common,
          color: '#fff',
          background: accent,
          padding: '3px 8px',
          marginBottom: 7,
          borderRadius: 3,
        }}
      >
        {children}
      </h2>
    );
  }
  if (variant === 'centered') {
    return (
      <h2 style={{ ...common, textAlign: 'center', marginBottom: 7 }}>
        {children}
        {design.showDividers && (
          <span style={{ display: 'block', width: 42, height: 2, background: accent, margin: '5px auto 0' }} />
        )}
      </h2>
    );
  }
  if (variant === 'sidebar') {
    return (
      <h2
        style={{
          ...common,
          color,
          paddingBottom: 4,
          marginBottom: 7,
          borderBottom: design.showDividers ? `1px solid ${light ? 'rgba(255,255,255,.35)' : accent + '55'}` : 'none',
        }}
      >
        {children}
      </h2>
    );
  }
  if (variant === 'rule') {
    return (
      <h2 style={{ ...common, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
        <span style={{ whiteSpace: 'nowrap' }}>{children}</span>
        <span style={{ flex: 1, height: 1, background: accent + '55' }} />
      </h2>
    );
  }
  if (variant === 'plain') {
    return <h2 style={{ ...common, marginBottom: 6 }}>{children}</h2>;
  }
  return (
    <h2
      style={{
        ...common,
        borderBottom: `1.4px solid ${accent}`,
        paddingBottom: 3,
        marginBottom: 7,
      }}
    >
      {children}
    </h2>
  );
}

const Row = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline', ...style }}>{children}</div>
);

const Meta = ({ children, design }: { children: React.ReactNode; design: Design }) => (
  <span style={{ fontSize: '0.86em', color: '#4b5563', whiteSpace: 'nowrap', fontFamily: design.bodyFont }}>{children}</span>
);

function Bullets({ items, accent }: { items: string[]; accent: string }) {
  const clean = items.filter((b) => b.trim());
  if (!clean.length) return null;
  return (
    <ul style={{ margin: '4px 0 0', paddingLeft: 0, listStyle: 'none' }}>
      {clean.map((b, i) => (
        <li key={i} style={{ display: 'flex', gap: 7, marginBottom: 2.5 }} className="rm-item">
          <span style={{ color: accent, lineHeight: 1.35, flex: '0 0 auto' }}>•</span>
          <span style={{ flex: 1 }}>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function SectionBody({
  k,
  data,
  design,
  variant = 'default',
  light = false,
}: {
  k: SectionKey;
  data: ResumeData;
  design: Design;
  variant?: 'default' | 'timeline' | 'compact' | 'stack';
  light?: boolean;
}) {
  const accent = light ? '#ffffff' : design.accent;
  const strong = light ? '#ffffff' : '#111827';
  const gap = variant === 'compact' ? 7 : 10;

  switch (k) {
    case 'summary':
      return <p style={{ margin: 0, textAlign: 'justify' }}>{data.basics.summary}</p>;

    case 'experience':
      return (
        <div>
          {data.experience.map((e) => (
            <div
              key={e.id}
              className="rm-item"
              style={{
                marginBottom: gap,
                paddingLeft: variant === 'timeline' ? 16 : 0,
                position: 'relative',
                borderLeft: variant === 'timeline' ? `1.5px solid ${design.accent}33` : undefined,
              }}
            >
              {variant === 'timeline' && (
                <span
                  style={{
                    position: 'absolute',
                    left: -5.5,
                    top: 4,
                    width: 9,
                    height: 9,
                    borderRadius: 9,
                    background: design.accent,
                  }}
                />
              )}
              {variant === 'stack' ? (
                <>
                  <div style={{ fontWeight: 700, color: strong, fontFamily: design.headingFont }}>{e.role}</div>
                  <Row>
                    <span style={{ color: accent, fontWeight: 600 }}>
                      {e.company}
                      {e.location ? ` · ${e.location}` : ''}
                    </span>
                    <Meta design={design}>{[e.start, e.end].filter(Boolean).join(' – ')}</Meta>
                  </Row>
                </>
              ) : (
                <>
                  <Row>
                    <span style={{ fontWeight: 700, color: strong, fontFamily: design.headingFont }}>{e.role}</span>
                    <Meta design={design}>{[e.start, e.end].filter(Boolean).join(' – ')}</Meta>
                  </Row>
                  <Row>
                    <span style={{ color: accent, fontWeight: 600 }}>{e.company}</span>
                    {e.location ? <Meta design={design}>{e.location}</Meta> : null}
                  </Row>
                </>
              )}
              <Bullets items={e.bullets} accent={accent} />
            </div>
          ))}
        </div>
      );

    case 'education':
      return (
        <div>
          {data.education.map((e) => (
            <div key={e.id} className="rm-item" style={{ marginBottom: gap - 3 }}>
              <Row>
                <span style={{ fontWeight: 700, color: strong, fontFamily: design.headingFont }}>{e.degree}</span>
                <Meta design={design}>{[e.start, e.end].filter(Boolean).join(' – ')}</Meta>
              </Row>
              <Row>
                <span style={{ color: accent, fontWeight: 600 }}>
                  {e.school}
                  {e.location ? ` · ${e.location}` : ''}
                </span>
                {e.score ? <Meta design={design}>{e.score}</Meta> : null}
              </Row>
            </div>
          ))}
        </div>
      );

    case 'projects':
      return (
        <div>
          {data.projects.map((p) => (
            <div key={p.id} className="rm-item" style={{ marginBottom: gap - 2 }}>
              <Row>
                <span style={{ fontWeight: 700, color: strong, fontFamily: design.headingFont }}>{p.name}</span>
                {p.link ? <Meta design={design}>{p.link}</Meta> : null}
              </Row>
              {p.stack ? (
                <div style={{ color: accent, fontWeight: 600, fontSize: '0.9em' }}>{p.stack}</div>
              ) : null}
              {p.description ? <div style={{ marginTop: 2 }}>{p.description}</div> : null}
            </div>
          ))}
        </div>
      );

    case 'skills':
      if (variant === 'stack' || light) {
        return (
          <div>
            {data.skills.map((s) => (
              <div key={s.id} className="rm-item" style={{ marginBottom: 7 }}>
                <div style={{ fontWeight: 700, color: strong, fontSize: '0.92em', fontFamily: design.headingFont }}>
                  {s.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 3 }}>
                  {s.items
                    .split(',')
                    .map((i) => i.trim())
                    .filter(Boolean)
                    .map((i, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.82em',
                          padding: '1.5px 6px',
                          borderRadius: 3,
                          background: light ? 'rgba(255,255,255,.16)' : design.accent + '14',
                          color: light ? '#fff' : '#1f2937',
                        }}
                      >
                        {i}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        );
      }
      return (
        <div>
          {data.skills.map((s) => (
            <div key={s.id} className="rm-item" style={{ display: 'flex', gap: 8, marginBottom: 3 }}>
              <span style={{ fontWeight: 700, color: strong, minWidth: 92, fontFamily: design.headingFont }}>
                {s.label}
              </span>
              <span style={{ flex: 1 }}>{s.items}</span>
            </div>
          ))}
        </div>
      );

    case 'certifications': {
      const stacked = variant === 'stack' || light;
      return (
        <div>
          {data.certifications.map((c) => (
            <div key={c.id} className="rm-item" style={{ marginBottom: stacked ? 6 : 3 }}>
              {stacked ? (
                <>
                  <div style={{ fontWeight: 600, color: strong }}>{c.name}</div>
                  <div style={{ fontSize: '0.86em', color: light ? 'rgba(255,255,255,.78)' : '#4b5563' }}>
                    {[c.issuer, c.year].filter(Boolean).join(' · ')}
                  </div>
                </>
              ) : (
                <Row>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ fontWeight: 600, color: strong }}>{c.name}</span>
                    {c.issuer ? <span style={{ color: '#4b5563' }}> — {c.issuer}</span> : null}
                  </span>
                  {c.year ? <Meta design={design}>{c.year}</Meta> : null}
                </Row>
              )}
            </div>
          ))}
        </div>
      );
    }

    case 'languages':
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px 14px', flexDirection: light ? 'column' : 'row' }}>
          {data.languages.map((l) => (
            <span key={l.id} className="rm-item">
              <span style={{ fontWeight: 600, color: strong }}>{l.name}</span>
              {l.level ? <span style={{ color: light ? 'rgba(255,255,255,.75)' : '#4b5563' }}> — {l.level}</span> : null}
            </span>
          ))}
        </div>
      );

    case 'achievements':
      return <Bullets items={data.achievements.map((a) => a.text)} accent={accent} />;

    default:
      return null;
  }
}

function hasContent(k: SectionKey, data: ResumeData): boolean {
  switch (k) {
    case 'summary':
      return Boolean(data.basics.summary.trim());
    case 'experience':
      return data.experience.length > 0;
    case 'education':
      return data.education.length > 0;
    case 'projects':
      return data.projects.length > 0;
    case 'skills':
      return data.skills.length > 0;
    case 'certifications':
      return data.certifications.length > 0;
    case 'languages':
      return data.languages.length > 0;
    case 'achievements':
      return data.achievements.length > 0;
    default:
      return false;
  }
}

export function visibleSections(data: ResumeData, only?: SectionKey[]): SectionKey[] {
  return data.sectionOrder.filter(
    (k) => !data.hiddenSections.includes(k) && hasContent(k, data) && (!only || only.includes(k)),
  );
}

export function Sections({
  data,
  design,
  only,
  headingVariant = 'underline',
  bodyVariant = 'default',
  light = false,
}: RenderProps & {
  only?: SectionKey[];
  headingVariant?: HeadingVariant;
  bodyVariant?: 'default' | 'timeline' | 'compact' | 'stack';
  light?: boolean;
}) {
  const keys = visibleSections(data, only);
  return (
    <>
      {keys.map((k) => (
        <section key={k} style={{ marginBottom: design.sectionGap }} className="rm-section">
          <SectionHeading design={design} variant={headingVariant} light={light}>
            {data.sectionTitles[k]}
          </SectionHeading>
          <SectionBody k={k} data={data} design={design} variant={bodyVariant} light={light} />
        </section>
      ))}
    </>
  );
}
