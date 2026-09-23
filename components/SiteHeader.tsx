'use client';

import Link from 'next/link';
import { NavLink } from '@/components/NavLink';
import { Wordmark } from './Brand';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <NavLink to="home" aria-label="Resume Maamey home">
          <Wordmark />
        </NavLink>
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="templates" className="btn btn-quiet hidden sm:inline-flex">
            Templates
          </NavLink>
          <NavLink to="home" hash="how" className="btn btn-quiet hidden sm:inline-flex">
            How it works
          </NavLink>
          <NavLink to="editor" className="btn btn-primary">
            Build my resume
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Wordmark compact />
          <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-ink-500">
            A free resume builder made for people who just want a clean PDF without signing up for anything.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink-500">
          <NavLink to="templates" className="hover:text-ink">Templates</NavLink>
          <NavLink to="editor" className="hover:text-ink">Editor</NavLink>
          <NavLink to="home" hash="faq" className="hover:text-ink">FAQ</NavLink>
          <Link href="/privacy" className="hover:text-ink">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-ink">Terms</Link>
          <span>No login · No watermark</span>
        </div>
      </div>
    </footer>
  );
}