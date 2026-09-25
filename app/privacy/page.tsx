import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-sm font-bold text-white">
              RM
            </div>

            {/* Brand Name */}
            <div>
              <div className="text-sm font-bold tracking-tight">
                <span className="text-[#101a3a]">Resume </span>
                <span className="bg-gradient-to-r from-[#168cff] via-[#3158ed] to-[#6d16e8] bg-clip-text text-transparent">
                  Maamey
                </span>
              </div>

              <div className="text-[11px] text-ink-500">
                Free ATS Resume Maker
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/templates"
              className="text-sm font-medium text-ink-500 hover:text-ink"
            >
              Templates
            </Link>

            <Link href="/editor" className="btn btn-primary">
              Build My Resume
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-20 text-center sm:px-6 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <span className="rounded-full bg-brand-light px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-dark">
              100% Free · No Sign-up Required
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-ink sm:text-6xl">
              Create an ATS-Friendly Resume <br className="hidden sm:inline" />
              That Lands Job Interviews.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-500">
              Clean layout, professional ATS-tested templates, live
              side-by-side editing, and one-click high-resolution PDF
              download.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/editor"
                className="btn btn-primary px-8 py-3.5 text-base"
              >
                Create My Resume Now →
              </Link>

              <Link
                href="/templates"
                className="btn btn-ghost border border-line px-8 py-3.5 text-base"
              >
                View Templates
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="border-t border-line bg-canvas px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                <div className="mb-4 text-2xl font-bold text-brand">01</div>

                <h3 className="text-lg font-bold text-ink">
                  ATS-Optimized Formatting
                </h3>

                <p className="mt-2 text-sm text-ink-500">
                  Engineered strictly around standard parsing structures so
                  applicant tracking systems never drop your qualifications.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                <div className="mb-4 text-2xl font-bold text-brand">02</div>

                <h3 className="text-lg font-bold text-ink">
                  Live Visual Feedback
                </h3>

                <p className="mt-2 text-sm text-ink-500">
                  See real-time changes reflected directly on an A4 preview
                  with auto page-count warnings and automatic zoom scaling.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                <div className="mb-4 text-2xl font-bold text-brand">03</div>

                <h3 className="text-lg font-bold text-ink">
                  Private & Fast PDF Output
                </h3>

                <p className="mt-2 text-sm text-ink-500">
                  Your details never leave your browser. Resumes compile
                  client-side into clean, vector-rendered PDFs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-line px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-extrabold text-ink">
              Frequently Asked Questions
            </h2>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-line p-5">
                <h3 className="font-bold text-ink">
                  Is Resume Maamey completely free?
                </h3>

                <p className="mt-2 text-sm text-ink-500">
                  Yes. You can build, edit, and export your resume as a clean
                  PDF without paying or creating an account.
                </p>
              </div>

              <div className="rounded-xl border border-line p-5">
                <h3 className="font-bold text-ink">
                  Are these templates readable by ATS?
                </h3>

                <p className="mt-2 text-sm text-ink-500">
                  Yes, every template is structured using semantic headings
                  and clean text hierarchy designed to pass recruiter
                  scanners.
                </p>
              </div>

              <div className="rounded-xl border border-line p-5">
                <h3 className="font-bold text-ink">Is my data secure?</h3>

                <p className="mt-2 text-sm text-ink-500">
                  All your data stays local in your browser session. We do not
                  store or sell personal resumes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
    </div>
  );
}