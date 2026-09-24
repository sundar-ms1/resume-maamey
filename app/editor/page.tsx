import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-3.5 transition hover:opacity-95"
          >
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 sm:h-14 sm:w-14">
              <Image
                src="/logo.png"
                alt="Resume Maamey Logo"
                width={56}
                height={56}
                priority
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-xl font-black tracking-tight leading-tight sm:text-2xl">
                <span style={{ color: "#0a1733" }}>Resume </span>
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #0062ff 0%, #6342f5 55%, #8f2bf5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  Maamey
                </span>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Free ATS Resume Maker
              </span>
            </div>
          </Link>

          {/* Header Action Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/templates"
              className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              Templates
            </Link>
            <Link
              href="#how-it-works"
              className="hidden text-sm font-semibold text-slate-600 transition hover:text-slate-900 sm:inline-block"
            >
              How it works
            </Link>
            <Link
              href="/editor"
              className="inline-flex items-center justify-center rounded-lg bg-[#2563eb] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1d4ed8] sm:px-5 sm:text-sm"
            >
              Build my resume
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Headings & CTA */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              28 templates · No login · Free PDF
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.1]">
              Your resume, ready in ten minutes.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #0062ff 0%, #6342f5 55%, #8f2bf5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Seriously, maamey.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              A Canva-style editor for resumes. Type on the left, see a real A4
              page on the right, switch between designs whenever you feel like
              it, and download a sharp vector PDF. No signup, no watermark,
              nothing to pay.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/editor"
                className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1d4ed8]"
              >
                Start building — it&apos;s free
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Browse all 28 templates
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
              <div>
                <div className="text-2xl font-black text-slate-900 sm:text-3xl">
                  28
                </div>
                <div className="mt-1 text-xs font-medium text-slate-500">
                  Curated Templates
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 sm:text-3xl">
                  A4
                </div>
                <div className="mt-1 text-xs font-medium text-slate-500">
                  Vector Standard
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 sm:text-3xl">
                  0
                </div>
                <div className="mt-1 text-xs font-medium text-slate-500">
                  Watermarks / Fees
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Preview Stack */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative h-[480px] w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:h-[560px] sm:max-w-[460px]">
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-slate-50">
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="space-y-3">
                    <div className="h-4 w-1/3 rounded bg-slate-200" />
                    <div className="h-7 w-3/4 rounded bg-slate-800" />
                    <div className="h-3 w-1/2 rounded bg-slate-300" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 w-full rounded bg-slate-200" />
                    <div className="h-3 w-5/6 rounded bg-slate-200" />
                    <div className="h-3 w-4/6 rounded bg-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-1/4 rounded bg-blue-500" />
                    <div className="h-3 w-full rounded bg-slate-200" />
                    <div className="h-3 w-3/4 rounded bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Resume Maamey. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-800">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-800">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-800">
              Sitemap
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}