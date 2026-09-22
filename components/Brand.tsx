import React from 'react';

export function Logo({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-label="Resume Maamey logo"
      role="img"
    >
      <rect x="4.5" y="2.5" width="23" height="27" rx="3.5" stroke="currentColor" strokeWidth="2.2" />
      <path d="M10 22V13l6 6 6-6v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M10 9h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-ink">
      <span className="text-brand">
        <Logo size={compact ? 22 : 26} />
      </span>
      <span className="font-extrabold tracking-[-0.02em]" style={{ fontSize: compact ? 15 : 17 }}>
        Resume <span className="text-brand">Maamey</span>
      </span>
    </span>
  );
}
