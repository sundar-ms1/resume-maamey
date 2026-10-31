"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ResumeData } from "@/lib/types";
import { useResume } from "@/lib/store";
import { normaliseImportedText, parseResumeText } from "@/lib/resumeImport";

const MAX_BYTES = 12 * 1024 * 1024;
const ACCEPTED = ["pdf", "docx", "txt", "jpg", "jpeg", "png", "webp"];

type ProgressSetter = (message: string) => void;

async function readImageWithOcr(file: File): Promise<string> {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng");
  try {
    const result = await worker.recognize(file);
    return result.data.text;
  } finally {
    await worker.terminate();
  }
}

async function readPdf(file: File, setProgress: ProgressSetter): Promise<string> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.mjs",
    import.meta.url
  ).toString();

  const pdf = await pdfjs.getDocument({
    data: new Uint8Array(await file.arrayBuffer()),
  }).promise;

  const textPages: string[] = [];
  for (let pageNumber = 1; pageNumber <= Math.min(pdf.numPages, 8); pageNumber++) {
    setProgress("Extracting text from PDF page " + pageNumber + "…");
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    textPages.push(pageText);
  }

  const extracted = textPages.join("\n");
  if (extracted.replace(/\s/g, "").length >= 60) return extracted;

  setProgress("Scanned PDF detected. Reading up to 5 pages with OCR…");
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng");
  try {
    const ocrPages: string[] = [];
    for (let pageNumber = 1; pageNumber <= Math.min(pdf.numPages, 5); pageNumber++) {
      setProgress("Recognising scanned PDF page " + pageNumber + "…");
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const context = canvas.getContext("2d");
      if (!context) continue;
      await page.render({ canvasContext: context, viewport, canvas } as never).promise;
      const result = await worker.recognize(canvas);
      ocrPages.push(result.data.text);
      canvas.width = 0;
      canvas.height = 0;
    }
    return ocrPages.join("\n");
  } finally {
    await worker.terminate();
  }
}

async function extractResumeText(file: File, setProgress: ProgressSetter): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ACCEPTED.includes(extension)) {
    throw new Error("Please choose a PDF, DOCX, TXT, JPG, JPEG, PNG or WEBP file.");
  }
  if (extension === "txt") return file.text();

  if (extension === "docx") {
    setProgress("Extracting text from Word document…");
    const mammoth = await import("mammoth/mammoth.browser");
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return result.value;
  }

  if (extension === "pdf") return readPdf(file, setProgress);

  setProgress("Reading image with browser-based OCR…");
  return readImageWithOcr(file);
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-xs font-bold text-ink-500">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-brand"
      />
    </label>
  );
}

export default function ImportResumePage() {
  const { data } = useResume();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<ResumeData>(data);
  const [rawText, setRawText] = useState("");
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [review, setReview] = useState(false);

  async function handleFile(file?: File) {
    if (!file) return;
    setError("");
    setReview(false);
    if (file.size > MAX_BYTES) {
      setError("This file is larger than 12 MB. Please choose a smaller file.");
      return;
    }
    setBusy(true);
    setProgress("Preparing your file…");
    try {
      const extracted = normaliseImportedText(await extractResumeText(file, setProgress));
      if (extracted.length < 25) {
        throw new Error("We could not find enough readable text. Try a clearer image or a text-based PDF.");
      }
      setRawText(extracted);
      setDraft(parseResumeText(extracted, data));
      setReview(true);
      setProgress("Text extracted. Review the details below before importing.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not read this file. Please try another file.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function updateBasics(key: keyof ResumeData["basics"], value: string) {
    setDraft((previous) => ({
      ...previous,
      basics: { ...previous.basics, [key]: value },
    }));
  }

  function continueToEditor() {
    try {
      sessionStorage.setItem("resume-maamey-pending-import", JSON.stringify(draft));
      router.push("/editor");
    } catch {
      setError("Your browser could not prepare this resume. Please check available browser storage and try again.");
    }
  }

  return (
    <main className="min-h-screen bg-canvas px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-bold text-brand">← Resume Maamey home</Link>
        <section className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">Free · No AI · Browser processing</p>
          <h1 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">Import your old resume</h1>
          <p className="mt-3 text-sm leading-6 text-ink-500">
            Upload an existing resume to move its information into a new Resume Maamey template.
            Your resume file is processed in this browser; it is not sent to our application server.
          </p>

          <div className="mt-6 rounded-xl border-2 border-dashed border-line bg-canvas p-7 text-center">
            <div className="text-3xl" aria-hidden="true">📄</div>
            <h2 className="mt-3 font-bold text-ink">Choose your existing resume</h2>
            <p className="mt-1 text-xs text-ink-500">PDF, DOCX, TXT, JPG, JPEG, PNG or WEBP · Maximum 12 MB</p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.webp"
              className="sr-only"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="btn btn-primary mt-5 disabled:opacity-50"
            >
              {busy ? "Reading your resume…" : "Upload old resume"}
            </button>
            {progress && <p className="mt-4 text-xs text-ink-500" aria-live="polite">{progress}</p>}
            {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["1. Upload your file", "2. Review extracted details", "3. Choose a new template"].map((item) => (
              <div key={item} className="rounded-lg bg-canvas p-3 text-xs font-semibold text-ink-500">{item}</div>
            ))}
          </div>

          {review && (
            <section className="mt-8 border-t border-line pt-6">
              <h2 className="text-lg font-extrabold text-ink">Review extracted information</h2>
              <p className="mt-1 text-xs leading-5 text-ink-500">
                Automatic extraction can make mistakes. Check these fields and correct them before continuing.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" value={draft.basics.name} onChange={(v) => updateBasics("name", v)} />
                <Field label="Job title" value={draft.basics.title} onChange={(v) => updateBasics("title", v)} />
                <Field label="Email" value={draft.basics.email} onChange={(v) => updateBasics("email", v)} />
                <Field label="Phone" value={draft.basics.phone} onChange={(v) => updateBasics("phone", v)} />
                <Field label="Location" value={draft.basics.location} onChange={(v) => updateBasics("location", v)} />
                <Field label="Website" value={draft.basics.website} onChange={(v) => updateBasics("website", v)} />
                <Field label="LinkedIn" value={draft.basics.linkedin} onChange={(v) => updateBasics("linkedin", v)} />
                <Field label="GitHub" value={draft.basics.github} onChange={(v) => updateBasics("github", v)} />
              </div>
              <label className="mt-4 block text-xs font-bold text-ink-500">
                Professional summary
                <textarea
                  value={draft.basics.summary}
                  onChange={(event) => updateBasics("summary", event.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm font-normal text-ink"
                />
              </label>
              <label className="mt-4 block text-xs font-bold text-ink-500">
                Extracted text (you can edit or copy it)
                <textarea
                  value={rawText}
                  onChange={(event) => setRawText(event.target.value)}
                  rows={8}
                  className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-normal text-ink"
                />
              </label>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" onClick={continueToEditor} className="btn btn-primary">
                  Use this information in my resume
                </button>
                <button type="button" onClick={() => { setReview(false); setRawText(""); }} className="btn btn-ghost">
                  Cancel
                </button>
              </div>
            </section>
          )}
        </section>

        <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-5 text-ink-300">
          Privacy: document text extraction and OCR run in this browser tab. OCR may download the English recognition model the first time it is used. Complex layouts, handwriting and scanned quality can require manual correction. Original formatting is not copied.
        </p>
      </div>
    </main>
  );
}
