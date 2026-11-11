
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ResumeData } from "@/lib/types";
import { useResume } from "@/lib/store";
import {
  normaliseImportedText,
  parseResumeText,
  pdfPagesToText,
  type PdfPageText,
} from "@/lib/resumeImport";

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

async function readPdf(
  file: File,
  setProgress: ProgressSetter
): Promise<string> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

  // The PDF reader worker is a plain file in the /public folder
  // (public/pdf.worker.min.mjs), so no outside download is needed.
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const pdf = await pdfjs.getDocument({
    data: new Uint8Array(await file.arrayBuffer()),
  }).promise;

  const pages: PdfPageText[] = [];

  for (
    let pageNumber = 1;
    pageNumber <= Math.min(pdf.numPages, 8);
    pageNumber++
  ) {
    setProgress(`Extracting text from PDF page ${pageNumber}…`);

    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();

    const items: PdfPageText["items"] = [];

    for (const item of content.items) {
      if ("str" in item && "transform" in item) {
        items.push({
          text: item.str,
          x: item.transform[4],
          y: item.transform[5],
          width: item.width,
          size: Math.abs(item.transform[3]) || item.height,
        });
      }
    }

    pages.push({ items, width: viewport.width });
  }

  // Two-column resumes are read one column at a time.
  const extracted = pdfPagesToText(pages);


  if (extracted.replace(/\s/g, "").length >= 60) {
    return extracted;
  }

  setProgress("Scanned PDF detected. Reading up to 5 pages with OCR…");

  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng");

  try {
    const ocrPages: string[] = [];

    for (
      let pageNumber = 1;
      pageNumber <= Math.min(pdf.numPages, 5);
      pageNumber++
    ) {
      setProgress(`Recognising scanned PDF page ${pageNumber}…`);

      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);

      const context = canvas.getContext("2d");
      if (!context) continue;

      await page.render({
        canvasContext: context,
        viewport,
        canvas,
      } as never).promise;

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

async function extractResumeText(
  file: File,
  setProgress: ProgressSetter
): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (extension === "doc") {
    throw new Error(
      "Old .doc files cannot be read. Please open it in Word and save it as DOCX or PDF, then upload it again."
    );
  }

  if (!ACCEPTED.includes(extension)) {
    throw new Error(
      "Please choose a PDF, DOCX, TXT, JPG, JPEG, PNG or WEBP file."
    );
  }

  if (extension === "txt") {
    return file.text();
  }

  if (extension === "docx") {
    setProgress("Extracting text from Word document…");

    const mammoth = await import("mammoth/mammoth.browser");
    const result = await mammoth.extractRawText({
      arrayBuffer: await file.arrayBuffer(),
    });

    return result.value;
  }

  if (extension === "pdf") {
    return readPdf(file, setProgress);
  }

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
  const { data, setData } = useResume();
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
    setRawText("");

    if (file.size > MAX_BYTES) {
      setError("This file is larger than 12 MB. Please choose a smaller file.");
      return;
    }

    setBusy(true);
    setProgress("Preparing your file…");

    try {
      const text = await extractResumeText(file, setProgress);
      const extracted = normaliseImportedText(text);

      if (extracted.length < 25) {
        throw new Error(
          "We could not find enough readable text. Try a clearer image or a text-based PDF."
        );
      }

      setRawText(extracted);
      setDraft(parseResumeText(extracted, data));
      setReview(true);
      setProgress(
        "Text extracted. Review the details below before importing."
      );
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We could not read this file. Please try another file."
      );
    } finally {
      setBusy(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function updateBasics(
    key: keyof ResumeData["basics"],
    value: string
  ) {
    setDraft((previous) => ({
      ...previous,
      basics: {
        ...previous.basics,
        [key]: value,
      },
    }));
  }

  function continueToEditor() {
    try {
      // Save the imported resume directly into the shared editor state.
      setData(draft);
      router.push("/editor");
    } catch {
      setError(
        "We could not transfer this resume. Please try again."
      );
    }
  }

  return (
    <main className="min-h-screen bg-canvas px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-bold text-brand">
          ← Resume Maamey home
        </Link>

        <section className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            Free · No AI · Browser processing
          </p>

          <h1 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">
            Import your old resume
          </h1>

          <p className="mt-3 text-sm leading-6 text-ink-500">
            Upload an existing resume to move its information into a new
            Resume Maamey template. Your resume file is processed in this
            browser; it is not sent to our application server.
          </p>

          <div className="mt-6 rounded-xl border-2 border-dashed border-line bg-canvas p-7 text-center">
            <div className="text-3xl" aria-hidden="true">
              📄
            </div>

            <h2 className="mt-3 font-bold text-ink">
              Choose your existing resume
            </h2>

            <p className="mt-1 text-xs text-ink-500">
              PDF, DOCX, TXT, JPG, PNG or WEBP · Maximum 12 MB
            </p>

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

            {progress && (
              <p className="mt-4 text-xs text-ink-500" aria-live="polite">
                {progress}
              </p>
            )}

            {error && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
            Importing replaces the content of the resume in your editor. Your
            chosen template, colours and fonts are kept, and you can press
            Undo (↶) in the editor to go back.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              "1. Upload your file",
              "2. Review extracted details",
              "3. Choose a new template",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg bg-canvas p-3 text-xs font-semibold text-ink-500"
              >
                {item}
              </div>
            ))}
          </div>

          {review && (
            <section className="mt-8 border-t border-line pt-6">
              <h2 className="text-lg font-extrabold text-ink">
                Review extracted information
              </h2>

              <p className="mt-1 text-xs leading-5 text-ink-500">
                Check the basic details below. Everything else can be edited
                in the editor after importing. Automatically extracted details
                may need manual correction.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full name"
                  value={draft.basics.name}
                  onChange={(value) => updateBasics("name", value)}
                />

                <Field
                  label="Job title"
                  value={draft.basics.title}
                  onChange={(value) => updateBasics("title", value)}
                />

                <Field
                  label="Email"
                  value={draft.basics.email}
                  onChange={(value) => updateBasics("email", value)}
                />

                <Field
                  label="Phone"
                  value={draft.basics.phone}
                  onChange={(value) => updateBasics("phone", value)}
                />

                <Field
                  label="Location"
                  value={draft.basics.location}
                  onChange={(value) => updateBasics("location", value)}
                />

                <Field
                  label="Website"
                  value={draft.basics.website}
                  onChange={(value) => updateBasics("website", value)}
                />

                <Field
                  label="LinkedIn"
                  value={draft.basics.linkedin}
                  onChange={(value) => updateBasics("linkedin", value)}
                />

                <Field
                  label="GitHub"
                  value={draft.basics.github}
                  onChange={(value) => updateBasics("github", value)}
                />
              </div>

              <label className="mt-4 block text-xs font-bold text-ink-500">
                Professional summary
                <textarea
                  value={draft.basics.summary}
                  onChange={(event) =>
                    updateBasics("summary", event.target.value)
                  }
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm font-normal text-ink"
                />
              </label>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-line p-4">
                  <h3 className="font-bold text-ink">Experience</h3>
                  <p className="mt-1 text-xs text-ink-500">
                    {draft.experience.length}{" "}
                    {draft.experience.length === 1 ? "experience entry" : "experience entries"} detected
                  </p>
                  {draft.experience.map((item) => (
                    <div key={item.id} className="mt-3 text-sm">
                      <p className="font-semibold">{item.role}</p>
                      <p className="text-xs text-ink-500">
                        {item.company} {item.start && `· ${item.start}`}
                        {item.end && ` – ${item.end}`}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-line p-4">
                  <h3 className="font-bold text-ink">Education</h3>
                  <p className="mt-1 text-xs text-ink-500">
                    {draft.education.length}{" "}
                    {draft.education.length === 1 ? "education entry" : "education entries"} detected
                  </p>
                  {draft.education.map((item) => (
                    <div key={item.id} className="mt-3 text-sm">
                      <p className="font-semibold">{item.degree}</p>
                      <p className="text-xs text-ink-500">
                        {item.school} {item.start && `· ${item.start}`}
                        {item.score && ` · ${item.score}`}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-line p-4 sm:col-span-2">
                  <h3 className="font-bold text-ink">Skills</h3>
                  {draft.skills.length === 0 && (
                    <p className="mt-2 text-sm text-ink-500">
                      No skills detected
                    </p>
                  )}
                  {draft.skills.map((skill) => (
                    <p key={skill.id} className="mt-2 text-sm text-ink-500">
                      {skill.label && skill.label !== "Skills" && (
                        <span className="font-semibold text-ink">
                          {skill.label}:{" "}
                        </span>
                      )}
                      {skill.items}
                    </p>
                  ))}
                </div>

                <div className="rounded-xl border border-line p-4">
                  <h3 className="font-bold text-ink">Projects</h3>
                  <p className="mt-1 text-xs text-ink-500">
                    {draft.projects.length}{" "}
                    {draft.projects.length === 1 ? "project" : "projects"} detected
                  </p>
                  {draft.projects.map((item) => (
                    <p key={item.id} className="mt-2 text-sm font-semibold">
                      {item.name}
                    </p>
                  ))}
                </div>

                <div className="rounded-xl border border-line p-4">
                  <h3 className="font-bold text-ink">
                    Certifications and languages
                  </h3>
                  <p className="mt-1 text-xs text-ink-500">
                    {draft.certifications.length} certifications ·{" "}
                    {draft.languages.length} languages detected
                  </p>
                  {draft.certifications.map((item) => (
                    <p key={item.id} className="mt-2 text-sm">
                      {item.name}
                      {item.issuer && (
                        <span className="text-ink-500"> · {item.issuer}</span>
                      )}
                    </p>
                  ))}
                  {draft.languages.length > 0 && (
                    <p className="mt-2 text-sm text-ink-500">
                      {draft.languages
                        .map((item) =>
                          item.level ? `${item.name} (${item.level})` : item.name
                        )
                        .join(", ")}
                    </p>
                  )}
                </div>
              </div>

              <label className="mt-5 block text-xs font-bold text-ink-500">
                Extracted text (fix it here, then press "Re-read details")
                <textarea
                  value={rawText}
                  onChange={(event) => setRawText(event.target.value)}
                  rows={8}
                  className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-normal text-ink"
                />
              </label>

              <button
                type="button"
                onClick={() =>
                  setDraft(parseResumeText(normaliseImportedText(rawText), data))
                }
                className="btn btn-ghost mt-2 text-xs"
              >
                Re-read details from this text
              </button>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={continueToEditor}
                  className="btn btn-primary"
                >
                  Use this information in my resume
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setReview(false);
                    setRawText("");
                  }}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </section>
          )}
        </section>

        <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-5 text-ink-300">
          Privacy: document text extraction and OCR run in this browser tab.
          OCR may download the English recognition model the first time it is
          used. Complex layouts, handwriting and scanned quality can require
          manual correction. Original formatting is not copied.
        </p>
      </div>
    </main>
  );
}
