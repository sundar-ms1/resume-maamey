'use client';

import React from 'react';
import { useResume } from '@/lib/store';
import { Accordion, AddButton, Field, IconBtn, ItemCard } from './ui';

export function ContentPanel() {
  const { data, updateBasics, addItem, updateItem, removeItem, moveItem } = useResume();
  const b = data.basics;

  return (
    <div>
      <Accordion title="Personal details" defaultOpen>
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <Field label="Full name" value={b.name} onChange={(v) => updateBasics({ name: v })} />
            <Field label="Job title" value={b.title} onChange={(v) => updateBasics({ title: v })} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Field label="Email" value={b.email} onChange={(v) => updateBasics({ email: v })} />
            <Field label="Phone" value={b.phone} onChange={(v) => updateBasics({ phone: v })} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Field label="Location" value={b.location} onChange={(v) => updateBasics({ location: v })} />
            <Field label="Website" value={b.website} onChange={(v) => updateBasics({ website: v })} placeholder="yoursite.com" />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Field label="LinkedIn" value={b.linkedin} onChange={(v) => updateBasics({ linkedin: v })} placeholder="linkedin.com/in/you" />
            <Field label="GitHub" value={b.github} onChange={(v) => updateBasics({ github: v })} placeholder="github.com/you" />
          </div>
        </div>
      </Accordion>

      <Accordion title={data.sectionTitles.summary}>
        <Field
          label="Professional summary"
          textarea
          rows={6}
          value={b.summary}
          onChange={(v) => updateBasics({ summary: v })}
          placeholder="Two or three lines about what you do and the impact you have had."
        />
        <p className="mt-2 text-[11.5px] leading-relaxed text-ink-300">
          Tip: lead with your role and years of experience, then one measurable result.
        </p>
      </Accordion>

      <Accordion title={data.sectionTitles.experience} count={data.experience.length}>
        {data.experience.map((e, idx) => (
          <ItemCard
            key={e.id}
            title={e.role}
            subtitle={[e.company, [e.start, e.end].filter(Boolean).join(' – ')].filter(Boolean).join(' · ')}
            defaultOpen={idx === 0}
            onUp={() => moveItem('experience', e.id, -1)}
            onDown={() => moveItem('experience', e.id, 1)}
            onRemove={() => removeItem('experience', e.id)}
          >
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Role" value={e.role} onChange={(v) => updateItem('experience', e.id, { role: v })} />
              <Field label="Company" value={e.company} onChange={(v) => updateItem('experience', e.id, { company: v })} />
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <Field label="Start" value={e.start} onChange={(v) => updateItem('experience', e.id, { start: v })} placeholder="Jan 2022" />
              <Field label="End" value={e.end} onChange={(v) => updateItem('experience', e.id, { end: v })} placeholder="Present" />
              <Field label="Location" value={e.location} onChange={(v) => updateItem('experience', e.id, { location: v })} />
            </div>
            <div>
              <span className="field-label">Highlights</span>
              {e.bullets.map((bl, i) => (
                <div key={i} className="mb-2 flex items-start gap-1.5">
                  <textarea
                    className="field"
                    rows={2}
                    value={bl}
                    onChange={(ev) => {
                      const next = [...e.bullets];
                      next[i] = ev.target.value;
                      updateItem('experience', e.id, { bullets: next });
                    }}
                  />
                  <div className="pt-1">
                    <IconBtn
                      label="Remove highlight"
                      danger
                      onClick={() => updateItem('experience', e.id, { bullets: e.bullets.filter((_, j) => j !== i) })}
                    >
                      <path d="M6 12h12" />
                    </IconBtn>
                  </div>
                </div>
              ))}
              <AddButton label="Add highlight" onClick={() => updateItem('experience', e.id, { bullets: [...e.bullets, ''] })} />
            </div>
          </ItemCard>
        ))}
        <AddButton label="Add experience" onClick={() => addItem('experience')} />
      </Accordion>

      <Accordion title={data.sectionTitles.projects} count={data.projects.length}>
        {data.projects.map((p) => (
          <ItemCard
            key={p.id}
            title={p.name}
            subtitle={p.stack}
            onUp={() => moveItem('projects', p.id, -1)}
            onDown={() => moveItem('projects', p.id, 1)}
            onRemove={() => removeItem('projects', p.id)}
          >
            <Field label="Project name" value={p.name} onChange={(v) => updateItem('projects', p.id, { name: v })} />
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Tech / stack" value={p.stack} onChange={(v) => updateItem('projects', p.id, { stack: v })} />
              <Field label="Link" value={p.link} onChange={(v) => updateItem('projects', p.id, { link: v })} />
            </div>
            <Field label="Description" textarea rows={3} value={p.description} onChange={(v) => updateItem('projects', p.id, { description: v })} />
          </ItemCard>
        ))}
        <AddButton label="Add project" onClick={() => addItem('projects')} />
      </Accordion>

      <Accordion title={data.sectionTitles.education} count={data.education.length}>
        {data.education.map((e) => (
          <ItemCard
            key={e.id}
            title={e.degree}
            subtitle={e.school}
            onUp={() => moveItem('education', e.id, -1)}
            onDown={() => moveItem('education', e.id, 1)}
            onRemove={() => removeItem('education', e.id)}
          >
            <Field label="Degree" value={e.degree} onChange={(v) => updateItem('education', e.id, { degree: v })} />
            <Field label="Institution" value={e.school} onChange={(v) => updateItem('education', e.id, { school: v })} />
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Start" value={e.start} onChange={(v) => updateItem('education', e.id, { start: v })} />
              <Field label="End" value={e.end} onChange={(v) => updateItem('education', e.id, { end: v })} />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Location" value={e.location} onChange={(v) => updateItem('education', e.id, { location: v })} />
              <Field label="Score" value={e.score} onChange={(v) => updateItem('education', e.id, { score: v })} placeholder="CGPA 8.7 / 10" />
            </div>
          </ItemCard>
        ))}
        <AddButton label="Add education" onClick={() => addItem('education')} />
      </Accordion>

      <Accordion title={data.sectionTitles.skills} count={data.skills.length}>
        {data.skills.map((s) => (
          <ItemCard
            key={s.id}
            title={s.label}
            subtitle={s.items}
            onUp={() => moveItem('skills', s.id, -1)}
            onDown={() => moveItem('skills', s.id, 1)}
            onRemove={() => removeItem('skills', s.id)}
          >
            <Field label="Category" value={s.label} onChange={(v) => updateItem('skills', s.id, { label: v })} />
            <Field
              label="Skills (comma separated)"
              textarea
              rows={2}
              value={s.items}
              onChange={(v) => updateItem('skills', s.id, { items: v })}
            />
          </ItemCard>
        ))}
        <AddButton label="Add skill group" onClick={() => addItem('skills')} />
      </Accordion>

      <Accordion title={data.sectionTitles.certifications} count={data.certifications.length}>
        {data.certifications.map((c) => (
          <ItemCard
            key={c.id}
            title={c.name}
            subtitle={c.issuer}
            onUp={() => moveItem('certifications', c.id, -1)}
            onDown={() => moveItem('certifications', c.id, 1)}
            onRemove={() => removeItem('certifications', c.id)}
          >
            <Field label="Name" value={c.name} onChange={(v) => updateItem('certifications', c.id, { name: v })} />
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Issuer" value={c.issuer} onChange={(v) => updateItem('certifications', c.id, { issuer: v })} />
              <Field label="Year" value={c.year} onChange={(v) => updateItem('certifications', c.id, { year: v })} />
            </div>
          </ItemCard>
        ))}
        <AddButton label="Add certification" onClick={() => addItem('certifications')} />
      </Accordion>

      <Accordion title={data.sectionTitles.achievements} count={data.achievements.length}>
        {data.achievements.map((a) => (
          <ItemCard
            key={a.id}
            title={a.text.slice(0, 40) || 'Achievement'}
            onUp={() => moveItem('achievements', a.id, -1)}
            onDown={() => moveItem('achievements', a.id, 1)}
            onRemove={() => removeItem('achievements', a.id)}
          >
            <Field label="Achievement" textarea rows={2} value={a.text} onChange={(v) => updateItem('achievements', a.id, { text: v })} />
          </ItemCard>
        ))}
        <AddButton label="Add achievement" onClick={() => addItem('achievements')} />
      </Accordion>

      <Accordion title={data.sectionTitles.languages} count={data.languages.length}>
        {data.languages.map((l) => (
          <ItemCard
            key={l.id}
            title={l.name}
            subtitle={l.level}
            onUp={() => moveItem('languages', l.id, -1)}
            onDown={() => moveItem('languages', l.id, 1)}
            onRemove={() => removeItem('languages', l.id)}
          >
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Language" value={l.name} onChange={(v) => updateItem('languages', l.id, { name: v })} />
              <Field label="Level" value={l.level} onChange={(v) => updateItem('languages', l.id, { level: v })} placeholder="Native" />
            </div>
          </ItemCard>
        ))}
        <AddButton label="Add language" onClick={() => addItem('languages')} />
      </Accordion>
    </div>
  );
}
