import type { Metadata } from "next";

const SITE_URL = "https://www.resumemaamey.in";

export const metadata: Metadata = {
  title: "Resume Templates",
  description:
    "Choose from professional, modern and ATS-friendly resume templates. Customize your resume online with Resume Maamey.",
  alternates: {
    canonical: `${SITE_URL}/templates`,
  },
  openGraph: {
    title: "Resume Templates | Resume Maamey",
    description:
      "Choose from professional, modern and ATS-friendly resume templates and customize your resume online.",
    url: `${SITE_URL}/templates`,
    type: "website",
  },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
