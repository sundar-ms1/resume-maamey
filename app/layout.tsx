import type { Metadata } from "next";
import "./globals.css";
import { ResumeProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "Resume Maamey — Free Resume Builder",
  description:
    "Create professional resumes with Resume Maamey. Choose from beautiful templates, edit your content, and download your resume as PDF.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  );
}