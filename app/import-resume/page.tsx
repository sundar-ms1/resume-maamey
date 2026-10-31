"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useResume } from "@/lib/store";
import { parseResumeText, normaliseImportedText } from "@/lib/resumeImport";

const MAX_BYTES = 12 * 1024 * 1024;

async function readFile(file: File, setProgress: (s:string)=>void): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "txt") return file.text();
  if (ext === "docx") {
    setProgress("Reading Word document…");
    const mammoth = await import("mammoth/mammoth.browser");
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return result.value;
  }
  if (ext === "pdf") {
    setProgress("Reading PDF pages…");
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/legacy/build/pdf.worker.mjs", import.meta.url).toString();
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const pages: string[] = [];
    for (let i=1;i<=Math.min(pdf.numPages,8);i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      pages.push(content.items.map((item:any)=>"str" in item ? item.str : "").join(" "));
    }
    const extracted = pages.join("\\n");
    if (extracted.replace(/\\s/g,"").length > 80) return extracted;
    setProgress("This looks like a scanned PDF. Running on-device OCR…");
    const worker = await (await import("tesseract.js")).createWorker("eng");
    try {
      const ocrPages: string[] = [];
      for (let i=1;i<=Math.min(pdf.numPages,5);i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({scale:1.5});
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width; canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        await page.render({canvasContext:ctx,viewport,canvas} as any).promise;
        const result = await worker.recognize(canvas);
        ocrPages.push(result.data.text);
      }
      return ocrPages.join("\\n");
    } finally { await worker.terminate(); }
  }
  if (["jpg","jpeg","png","webp"].includes(ext || "")) {
    setProgress("Reading image with on-device OCR…");
    const worker = await (await import("tesseract.js")).createWorker("eng");
    try { const result = await worker.recognize(file); return result.data.text; }
    finally { await worker.terminate(); }
  }
  throw new Error("Please upload PDF, DOCX, TXT, JPG, JPEG, PNG or WEBP.");
}

export default function ImportResumePage() {
  const { data, setData } = useResume();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [raw,setRaw] = useState("");
  const [status,setStatus] = useState("");
  const [error,setError] = useState("");
  const [busy,setBusy] = useState(false);
  const [review,setReview] = useState(false);
  const [draft,setDraft] = useState(data);

  async function handleFile(file?:File) {
    if (!file) return;
    setError(""); setReview(false);
    if (file.size > MAX_BYTES) { setError("File is too large. Please choose a file smaller than 12 MB."); return; }
    setBusy(true); setStatus("Preparing your file…");
    try {
      const text = normaliseImportedText(await readFile(file,setStatus));
      if (text.length < 25) throw new Error("We could not find enough readable text. Try a clearer scan or a text-based PDF.");
      setRaw(text);
      setDraft(parseResumeText(text,data));
      setReview(true);
      setStatus("Text extracted. Please review the fields before importing.");
    } catch(e) { setError(e instanceof Error ? e.message : "Could not read this file."); }
    finally { setBusy(false); }
  }

  function applyImport() {
    setData(draft);
    router.push("/editor");
  }

  return <main className="min-h-screen bg-canvas px-4 py-8 sm:px-6">
    <div className="mx-auto max-w-3xl">
      <Link href="/" className="text-sm font-bold text-brand">← Resume Maamey</Link>
      <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand">No AI · Free · Private</p>
        <h1 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">Import your old resume</h1>
        <p className="mt-3 text-sm leading-6 text-ink-500">Upload your existing resume and move its text into a fresh Resume Maamey template. Files are processed in your browser and are not uploaded to our server.</p>
        <div className="mt-6 rounded-xl border-2 border-dashed border-line bg-canvas p-7 text-center">
          <div className="text-3xl">📄</div>
          <h2 className="mt-3 font-bold text-ink">Choose your resume file</h2>
          <p className="mt-1 text-xs text-ink-500">PDF, DOCX, TXT, JPG, JPEG, PNG or WEBP · Up to 12 MB</p>
          <input ref={inputRef} type="file" accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.webp" className="sr-only" onChange={(e)=>handleFile(e.target.files?.[0])}/>
          <button onClick={()=>inputRef.current?.click()} disabled={busy} className="btn btn-primary mt-5">{busy ? "Processing…" : "Upload old resume"}</button>
          {status && <p className="mt-4 text-xs text-ink-500">{status}</p>}
          {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["1. Upload your file","2. Review extracted details","3. Choose a new template"].map((s)=><div key={s} className="rounded-lg bg-canvas p-3 text-xs font-semibold text-ink-500">{s}</div>)}
        </div>
        {review && <section className="mt-8 border-t border-line pt-6">
          <h2 className="text-lg font-extrabold text-ink">Review extracted information</h2>
          <p className="mt-1 text-xs leading-5 text-ink-500">Automatic parsing is not perfect. Check and correct these fields before continuing. Your original resume is not changed.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {([["name","Full name"],["title","Job title"],["email","Email"],["phone","Phone"],["location","Location"],["website","Website"],["linkedin","LinkedIn"],["github","GitHub"]] as const).map(([key,label])=><label key={key} className="block text-xs font-bold text-ink-500">{label}<input value={draft.basics[key]} onChange={e=>setDraft(p=>({...p,basics:{...p.basics,[key]:e.target.value}}))} className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm font-normal text-ink outline-none focus:border-brand"/></label>)}
          </div>
          <label className="mt-4 block text-xs font-bold text-ink-500">Professional summary<textarea value={draft.basics.summary} onChange={e=>setDraft(p=>({...p,basics:{...p.basics,summary:e.target.value}}))} rows={4} className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm font-normal text-ink"/></label>
          <label className="mt-4 block text-xs font-bold text-ink-500">Extracted resume text (edit if needed)<textarea value={raw} onChange={e=>setRaw(e.target.value)} rows={7} className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-normal text-ink"/></label>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={applyImport} className="btn btn-primary">Use this information in my resume</button>
            <button onClick={()=>{setReview(false);setRaw("");}} className="btn btn-ghost">Cancel</button>
          </div>
        </section>}
      </div>
      <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-5 text-ink-300">Privacy note: text extraction and OCR run locally in this browser tab. OCR may download the English recognition model when first used. Complex layouts and handwriting may need manual correction. Original formatting is not copied.</p>
    </div>
  </main>;
}
