import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Resume Maamey",
  description: "Get in touch with the Resume Maamey team for feedback, inquiries, or support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mb-4">
          Contact Us
        </h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Have a question about using our resume builder, spotted a bug, or want to suggest a new template? We are here to help.
        </p>

        <div className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</span>
            <span className="text-lg font-medium text-slate-900">support@resumemaamey.in</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Response Time</span>
            <span className="text-slate-800">We respond to all genuine inquiries within 24–48 business hours.</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Location</span>
            <span className="text-slate-800">Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </div>
  );
}