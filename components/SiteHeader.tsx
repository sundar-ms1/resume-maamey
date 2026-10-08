"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand with enlarged logo */}
        <Link href="/" className="flex items-center gap-3.5 transition hover:opacity-90">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-canvas sm:h-14 sm:w-14">
            <Image
              src="/logo.png"
              alt="Resume Maamey Logo"
              width={56}
              height={56}
              priority
              className="h-full w-full object-contain p-1"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-ink sm:text-lg">
              Resume Maamey
            </span>
            <span className="text-[11px] font-medium text-ink-500">
              Free ATS Resume Maker
            </span>
          </div>
        </Link>

        {/* Right Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/templates"
            className="text-sm font-semibold text-ink-500 transition hover:text-ink"
          >
            Templates
          </Link>
          <Link
            href="/#how-it-works"
            className="hidden text-sm font-semibold text-ink-500 transition hover:text-ink sm:inline-block"
          >
            How it works
          </Link>
          <Link
            href="/editor"
            className="btn btn-primary px-4 py-2.5 text-xs font-bold sm:px-5 sm:text-sm"
          >
            Build my resume
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <p className="text-xs text-ink-500">
          © {new Date().getFullYear()} Resume Maamey. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-ink-500">
          <Link href="/privacy" className="hover:text-ink">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms of Service
          </Link>
          <Link href="/sitemap.xml" className="hover:text-ink">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}