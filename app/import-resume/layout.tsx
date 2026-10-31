import { ResumeProvider } from "@/lib/store";

export default function ImportResumeLayout({ children }: { children: React.ReactNode }) {
  return <ResumeProvider>{children}</ResumeProvider>;
}
