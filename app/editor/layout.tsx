import type { Metadata } from "next";
import { ResumeProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "Resume Editor & Builder",
  description:
    "Build, edit, and tailor your resume in real time. Download print-ready, ATS-compliant PDF resumes instantly.",
  alternates: {
    canonical: "/editor",
  },
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ResumeProvider>{children}</ResumeProvider>;
}