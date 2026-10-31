import type { Metadata } from "next";
import { ResumeProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "Import an Existing Resume | Free Resume Parser",
  description: "Import an existing PDF, DOCX, TXT or image resume into Resume Maamey using browser-based text extraction and OCR. No AI and no account required.",
  alternates: { canonical: "/import-resume" },
};

export default function ImportResumeLayout({ children }: { children: React.ReactNode }) {
  return <ResumeProvider>{children}</ResumeProvider>;
}
