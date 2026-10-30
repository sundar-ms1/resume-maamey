import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact Resume Maamey",
  description:
    "Contact Resume Maamey for resume builder support, feedback, inquiries, or template suggestions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Contact Us
          </h1>

          <p className="mb-8 leading-relaxed text-slate-600">
            Have a question about using our resume builder, spotted a bug, or
            want to suggest a new template? We are here to help.
          </p>

          <div className="space-y-6">
            <section className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email Address
              </span>
              <a
                href="mailto:sundar15072002@gmail.com"
                className="break-words text-lg font-medium text-blue-700 underline underline-offset-2"
              >
                sundar15072002@gmail.com
              </a>
            </section>

            <section className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Response Information
              </span>
              <p className="text-slate-800">
                When contacting us, please include the page URL and a short
                description of your issue or question so we can assist you.
              </p>
            </section>

            <section className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Location
              </span>
              <p className="text-slate-800">Tamil Nadu, India</p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}