'use client';

import React, { useState } from 'react';

export function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
  rows = 4,
  className = '',
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="field-label">{label}</span>}
      {textarea ? (
        <textarea className="field" rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="field" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

export function Accordion({
  title,
  count,
  children,
  defaultOpen = false,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition hover:bg-canvas"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-[13px] font-bold text-ink">
          {title}
          {typeof count === 'number' && (
            <span className="rounded-full bg-canvas px-1.5 py-0.5 text-[10.5px] font-bold text-ink-500">{count}</span>
          )}
        </span>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className={`text-ink-300 transition ${open ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export function ItemCard({
  title,
  subtitle,
  onUp,
  onDown,
  onRemove,
  children,
  defaultOpen = false,
}: {
  title: string;
  subtitle?: string;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-2.5 rounded-xl2 border border-line bg-white">
      <div className="flex items-center gap-1 px-2.5 py-2">
        <button onClick={() => setOpen(!open)} className="min-w-0 flex-1 text-left">
          <span className="block truncate text-[13px] font-semibold text-ink">{title || 'Untitled'}</span>
          {subtitle && <span className="block truncate text-[11.5px] text-ink-300">{subtitle}</span>}
        </button>
        <IconBtn label="Move up" onClick={onUp}>
          <path d="m6 15 6-6 6 6" />
        </IconBtn>
        <IconBtn label="Move down" onClick={onDown}>
          <path d="m6 9 6 6 6-6" />
        </IconBtn>
        <IconBtn label="Delete" onClick={onRemove} danger>
          <path d="M5 7h14M10 11v6M14 11v6M6 7l1 12.5a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 17 19.5L18 7M9.5 7V5h5v2" />
        </IconBtn>
        <IconBtn label={open ? 'Collapse' : 'Expand'} onClick={() => setOpen(!open)}>
          <path d={open ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'} />
        </IconBtn>
      </div>
      {open && <div className="space-y-2.5 border-t border-line px-2.5 py-3">{children}</div>}
    </div>
  );
}

export function IconBtn({
  children,
  onClick,
  label,
  danger,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  danger?: boolean;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-7 w-7 flex-none items-center justify-center rounded-md transition ${
        danger ? 'text-ink-300 hover:bg-red-50 hover:text-red-600' : active ? 'bg-brand-light text-brand-dark' : 'text-ink-300 hover:bg-canvas hover:text-ink'
      }`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-line py-2 text-[12.5px] font-semibold text-ink-500 transition hover:border-brand hover:bg-brand-light hover:text-brand-dark"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 5v14M5 12h14" />
      </svg>
      {label}
    </button>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix = '',
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  suffix?: string;
  display?: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="field-label mb-0">{label}</span>
        <span className="text-[11.5px] font-semibold tabular-nums text-ink-500">{display ?? `${value}${suffix}`}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-brand"
        style={{ accentColor: '#6c4cf1' }}
      />
    </div>
  );
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-lg border border-line px-3 py-2 text-[13px] font-semibold text-ink-700 transition hover:border-ink-300"
      role="switch"
      aria-checked={checked}
    >
      {label}
      <span className={`relative h-4.5 w-8 rounded-full transition ${checked ? 'bg-brand' : 'bg-line'}`} style={{ height: 18, width: 32 }}>
        <span
          className="absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white shadow transition-all"
          style={{ left: checked ? 16 : 2 }}
        />
      </span>
    </button>
  );
}

export function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <select className="field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ fontFamily: o.value }}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
