"use client";

import { useEffect, useState } from "react";
import { useResume } from "@/lib/store";
import { downloadResumePdf } from "@/lib/exportPdf";
import { trackPdfDownload } from "@/lib/analytics";

import { Brand } from "@/components/Brand";
import { A4Preview } from "@/components/resume/A4Preview";
import { ContentPanel } from "@/components/editor/ContentPanel";
import { DesignPanel } from "@/components/editor/DesignPanel";
import { SectionsPanel } from "@/components/editor/SectionsPanel";
import { TemplatePanel } from "@/components/editor/TemplatePanel";
import PrintRoot from "@/components/PrintRoot";

type Panel = "content" | "design" | "sections" | "templates";

const PANELS: Array<{
  id: Panel;
  label: string;
}> = [
  { id: "content", label: "Content" },
  { id: "design", label: "Design" },
  { id: "sections", label: "Sections" },
  { id: "templates", label: "Templates" },
];

export default function EditorPage() {
  const [mounted, setMounted] = useState(false);
  const [activePanel, setActivePanel] = useState<Panel>("content");
  const [zoom, setZoom] = useState<number | "fit">("fit");
  const [pageCount, setPageCount] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    data,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useResume();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownloadPdf = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);

      // Track conversion event in Google Analytics
      trackPdfDownload("Resume Maamey Template");

      // Allow the latest editor change to render before capturing.
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });

      await downloadResumePdf(
        `${data.basics.name || "Resume"}-Resume-Maamey`
      );
    } catch (error) {
      console.error("PDF export failed:", error);
      window.alert(
        "Unable to generate the PDF. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    // Track print action as conversion
    trackPdfDownload("Print to PDF");
    window.print();
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-canvas">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-sm text-ink-500">
            Loading editor...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-canvas">
      {/* Hidden high-resolution PDF source */}
      <PrintRoot />

      {/* Top navigation with larger logo branding */}
      <header className="no-print sticky top-0 z-50 border-b border-line bg-white">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <Brand size="md" />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={undo}
              disabled={!canUndo}
              className="btn btn-ghost hidden sm:inline-flex disabled:cursor-not-allowed disabled:opacity-40"
              title="Undo"
            >
              ↶
            </button>

            <button
              type="button"
              onClick={redo}
              disabled={!canRedo}
              className="btn btn-ghost hidden sm:inline-flex disabled:cursor-not-allowed disabled:opacity-40"
              title="Redo"
            >
              ↷
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="btn btn-ghost hidden sm:inline-flex"
            >
              Print
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <span
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    aria-hidden="true"
                  />
                  <span>Creating PDF...</span>
                </>
              ) : (
                <>
                  <span aria-hidden="true">↓</span>
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main editor */}
      <div className="no-print">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-[minmax(340px,1fr)_minmax(500px,794px)]">
            {/* LEFT EDITOR */}
            <aside className="border-r border-line bg-white">
              <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
                <div className="border-b border-line px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h1 className="text-lg font-extrabold tracking-[-0.02em] text-ink">
                        Edit your resume
                      </h1>

                      <p className="mt-1 text-[12px] text-ink-500">
                        Make changes and see them update instantly.
                      </p>
                    </div>

                    <div className="hidden rounded-full bg-brand-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-dark sm:block">
                      Auto saved
                    </div>
                  </div>
                </div>

                {/* Editor tabs */}
                <div className="border-b border-line bg-white px-3 pt-3">
                  <div className="grid grid-cols-4 gap-1 rounded-xl bg-canvas p-1">
                    {PANELS.map((panel) => {
                      const active = activePanel === panel.id;

                      return (
                        <button
                          key={panel.id}
                          type="button"
                          onClick={() => setActivePanel(panel.id)}
                          className={`rounded-lg px-2 py-2 text-[11px] font-bold transition ${
                            active
                              ? "bg-white text-ink shadow-sm"
                              : "text-ink-500 hover:text-ink"
                          }`}
                        >
                          {panel.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active editor panel */}
                <div>
                  {activePanel === "content" && <ContentPanel />}
                  {activePanel === "design" && <DesignPanel />}
                  {activePanel === "sections" && <SectionsPanel />}
                  {activePanel === "templates" && <TemplatePanel />}
                </div>
              </div>
            </aside>

            {/* RIGHT PREVIEW */}
            <section className="min-w-0 bg-canvas">
              <div className="sticky top-20 z-20 border-b border-line bg-white/95 backdrop-blur">
                <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
                  <div>
                    <div className="text-sm font-bold text-ink">
                      Live preview
                    </div>

                    <div className="text-[11px] text-ink-300">
                      A4 · {pageCount}{" "}
                      {pageCount === 1 ? "page" : "pages"}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg border border-line bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setZoom("fit")}
                      className={`rounded-md px-2.5 py-1.5 text-[11px] font-bold ${
                        zoom === "fit"
                          ? "bg-ink text-white"
                          : "text-ink-500 hover:text-ink"
                      }`}
                    >
                      Fit
                    </button>

                    <button
                      type="button"
                      onClick={() => setZoom(0.75)}
                      className={`rounded-md px-2.5 py-1.5 text-[11px] font-bold ${
                        zoom === 0.75
                          ? "bg-ink text-white"
                          : "text-ink-500 hover:text-ink"
                      }`}
                    >
                      75%
                    </button>

                    <button
                      type="button"
                      onClick={() => setZoom(1)}
                      className={`rounded-md px-2.5 py-1.5 text-[11px] font-bold ${
                        zoom === 1
                          ? "bg-ink text-white"
                          : "text-ink-500 hover:text-ink"
                      }`}
                    >
                      100%
                    </button>
                  </div>
                </div>
              </div>

              <div className="min-h-[calc(100vh-8rem)] overflow-auto px-3 py-6 sm:px-6 sm:py-8">
                <A4Preview
                  data={data}
                  zoom={zoom}
                  onPageCount={setPageCount}
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Mobile download bar */}
      <div className="no-print fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-white p-3 shadow-lg lg:hidden">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-ghost flex-1"
          >
            Print
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="btn btn-primary flex-[2]"
          >
            {isDownloading
              ? "Creating PDF..."
              : "↓ Download PDF"}
          </button>
        </div>
      </div>
    </main>
  );
}