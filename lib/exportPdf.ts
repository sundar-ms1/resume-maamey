"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/* ------------------------------------------------------------------ *
 * Page geometry
 *
 * Strategy (ONE consistent margin strategy):
 *  - The resume is captured with its own page padding removed, 794px wide.
 *  - Every slice is placed on the A4 page at (15mm, 15mm), 180mm wide.
 *  - So margins are identical on every page and never applied twice.
 * ------------------------------------------------------------------ */

const A4_WIDTH_PX = 794;
const PAGE_MARGIN_MM = 15;
const PDF_CONTENT_WIDTH_MM = 210 - PAGE_MARGIN_MM * 2;
const PDF_CONTENT_HEIGHT_MM = 297 - PAGE_MARGIN_MM * 2;

/* Browsers (notably iPhone Safari) refuse canvases larger than ~16.7M px. */
const MAX_CANVAS_PIXELS = 16000000;
const MAX_SCALE = 3;
const MIN_SCALE = 1.5;

function safeFileName(name: string): string {
  const cleaned = name
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return cleaned || "resume";
}

function nextFrame(): Promise<void> {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}

async function waitForFonts(root: HTMLElement): Promise<void> {
  if (!("fonts" in document)) {
    return;
  }

  try {
    // Web fonts only download when something asks for them. Ask for every
    // font (and weight) this resume uses, so none is still loading when the
    // page is captured.
    const families = new Set<string>();

    for (const element of [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))]) {
      const family = window.getComputedStyle(element).fontFamily;

      if (family) {
        families.add(family);
      }
    }

    const requests: Promise<unknown>[] = [];

    families.forEach((family) => {
      ["400", "500", "600", "700", "800"].forEach((weight) => {
        requests.push(
          document.fonts.load(`${weight} 16px ${family}`).catch(() => [])
        );
      });
    });

    await Promise.all(requests);
    await document.fonts.ready;
  } catch {
    // Continue if a font fails to load.
  }
}

async function waitForImages(element: HTMLElement): Promise<void> {
  const images = Array.from(element.querySelectorAll("img"));

  await Promise.all(
    images.map(async (img) => {
      if (!img.complete) {
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      }

      if (img.decode) {
        try {
          await img.decode();
        } catch {
          // Continue if an image cannot be decoded.
        }
      }
    })
  );
}

function getResumeElement(): HTMLElement {
  const element = document.getElementById("resume-pdf-root");

  if (!element) {
    throw new Error(
      "Resume PDF element was not found. Make sure PrintRoot is mounted."
    );
  }

  return element;
}

/**
 * html2canvas draws a flex container's bare text (for example the section
 * headings of the "bar" style) with a wrong gap after the first letter
 * ("P ROFILE"). Wrapping that bare text in a <span> does not change the
 * layout, but makes html2canvas measure it correctly.
 */
function wrapBareFlexText(root: HTMLElement): void {
  const all = [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))];

  for (const element of all) {
    const display = window.getComputedStyle(element).display;

    if (
      display !== "flex" &&
      display !== "inline-flex" &&
      display !== "grid" &&
      display !== "inline-grid"
    ) {
      continue;
    }

    for (const node of Array.from(element.childNodes)) {
      if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent &&
        node.textContent.trim() !== ""
      ) {
        const span = document.createElement("span");
        element.insertBefore(span, node);
        span.appendChild(node);
      }
    }
  }
}

function prepareExportClone(original: HTMLElement): {
  clone: HTMLElement;
  cleanup: () => void;
} {
  const wrapper = document.createElement("div");

  wrapper.id = "resume-pdf-export-wrapper";

  wrapper.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: ${A4_WIDTH_PX}px;
    margin: 0;
    padding: 0;
    background: #ffffff;
    opacity: 1;
    visibility: visible;
    pointer-events: none;
    z-index: -1;
    overflow: visible;
  `;

  const clone = original.cloneNode(true) as HTMLElement;

  clone.style.cssText = `
    position: relative;
    display: block;
    left: 0;
    top: 0;
    width: ${A4_WIDTH_PX}px;
    min-width: ${A4_WIDTH_PX}px;
    max-width: ${A4_WIDTH_PX}px;
    height: auto;
    min-height: 0;
    max-height: none;
    margin: 0;
    padding: 0;
    overflow: visible;
    background: #ffffff;
    color: #1f2937;
    opacity: 1;
    visibility: visible;
    transform: none;
    zoom: 1;
    box-shadow: none;
  `;

  const style = document.createElement("style");

  style.textContent = `
    #resume-pdf-export-wrapper,
    #resume-pdf-export-wrapper * {
      box-sizing: border-box !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
    }

    #resume-pdf-export-wrapper #resume-pdf-root {
      position: relative !important;
      display: block !important;
      left: 0 !important;
      top: 0 !important;
      width: ${A4_WIDTH_PX}px !important;
      min-width: ${A4_WIDTH_PX}px !important;
      max-width: ${A4_WIDTH_PX}px !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      transform: none !important;
      zoom: 1 !important;
      background: #ffffff !important;
      opacity: 1 !important;
      visibility: visible !important;
    }

    #resume-pdf-export-wrapper .resume-pdf-page {
      display: block !important;
      width: ${A4_WIDTH_PX}px !important;
      min-width: ${A4_WIDTH_PX}px !important;
      max-width: ${A4_WIDTH_PX}px !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      transform: none !important;
      zoom: 1 !important;
      box-shadow: none !important;
      background: #ffffff !important;
    }

    #resume-pdf-export-wrapper .rm-page {
      padding: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      width: ${A4_WIDTH_PX}px !important;
      min-width: ${A4_WIDTH_PX}px !important;
      max-width: ${A4_WIDTH_PX}px !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      margin: 0 !important;
      overflow: visible !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      transform: none !important;
      zoom: 1 !important;
      background: #ffffff !important;
    }

    #resume-pdf-export-wrapper .rm-section,
    #resume-pdf-export-wrapper section,
    #resume-pdf-export-wrapper .rm-item {
      overflow: visible !important;
      max-height: none !important;
    }

    #resume-pdf-export-wrapper img {
      max-width: 100% !important;
      height: auto !important;
    }

    #resume-pdf-export-wrapper svg {
      max-width: 100% !important;
    }

    #resume-pdf-export-wrapper .rm-break,
    #resume-pdf-export-wrapper .no-print,
    #resume-pdf-export-wrapper .no-pdf,
    #resume-pdf-export-wrapper .pdf-hidden,
    #resume-pdf-export-wrapper button {
      display: none !important;
    }

    #resume-pdf-export-wrapper [contenteditable="true"] {
      outline: none !important;
      caret-color: transparent !important;
    }

    #resume-pdf-export-wrapper a {
      text-decoration: none !important;
      overflow-wrap: anywhere !important;
    }

    #resume-pdf-export-wrapper h1,
    #resume-pdf-export-wrapper h2,
    #resume-pdf-export-wrapper p {
      max-width: 100%;
    }
  `;

  wrapper.appendChild(style);
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // Needs the clone to be in the document (computed styles).
  wrapBareFlexText(clone);

  return {
    clone,
    cleanup: () => wrapper.remove(),
  };
}

/** Picks a capture scale that keeps the canvas under the browser limit. */
function chooseScale(cssHeight: number): number {
  if (!(cssHeight > 0)) {
    return MAX_SCALE;
  }

  const limit = Math.sqrt(MAX_CANVAS_PIXELS / (A4_WIDTH_PX * cssHeight));
  const scale = Math.floor(Math.min(MAX_SCALE, limit) * 20) / 20;

  return Math.max(MIN_SCALE, scale);
}

/** Cheap sanity check: does the canvas contain anything but white? */
function canvasHasVisibleContent(canvas: HTMLCanvasElement): boolean {
  const context = canvas.getContext("2d");

  if (!context || canvas.width === 0 || canvas.height === 0) {
    return false;
  }

  const rowCount = Math.min(80, canvas.height);
  const stepX = Math.max(1, Math.floor(canvas.width / 400));

  for (let i = 0; i < rowCount; i++) {
    const y = Math.min(
      canvas.height - 1,
      Math.floor(((i + 0.5) * canvas.height) / rowCount)
    );

    const { data } = context.getImageData(0, y, canvas.width, 1);

    for (let x = 0; x < canvas.width; x += stepX) {
      const index = x * 4;

      if (
        data[index + 3] > 10 &&
        (data[index] < 235 || data[index + 1] < 235 || data[index + 2] < 235)
      ) {
        return true;
      }
    }
  }

  return false;
}

/* ------------------------------------------------------------------ *
 * Page-break planning
 *
 * All numbers below are canvas pixels.
 *
 * Two sources of information are combined:
 *  1. The DOM tells us what must stay together (a section heading with its
 *     first content, individual items, bullets).
 *  2. The captured pixels tell us where a cut is physically safe. html2canvas
 *     draws text a few pixels away from where the DOM says it is, so a cut
 *     based on the DOM alone slices through letters. Every cut is therefore
 *     moved to a band of blank pixel rows.
 * ------------------------------------------------------------------ */

export interface PdfBlock {
  top: number;
  bottom: number;
}

export interface PdfItemInfo {
  block: PdfBlock;
  /** Nested items (bullets) inside this item. */
  nested: PdfBlock[];
  /** Head (header + first bullet) and tail (last two bullets) protection. */
  edges: PdfBlock[];
}

export interface PdfLayoutModel {
  /** Section heading + its first content unit. Never split. */
  groups: PdfBlock[];
  /** Top-level items only. Nested items are not treated as page boundaries. */
  items: PdfItemInfo[];
}

export interface PdfRowProbe {
  /** True when the pixel row contains no content (only background). */
  isClean(y: number): boolean;
}

export interface PdfPlanInput {
  canvasHeight: number;
  /** Printable page height in canvas px. */
  pageHeight: number;
  /** Canvas px per CSS px. */
  scale: number;
  model: PdfLayoutModel;
  probe: PdfRowProbe;
}

export interface PdfSlice {
  start: number;
  end: number;
}

function lineHeightPx(element: HTMLElement): number {
  const style = window.getComputedStyle(element);
  const parsed = parseFloat(style.lineHeight);

  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }

  const fontSize = parseFloat(style.fontSize);

  return (Number.isFinite(fontSize) && fontSize > 0 ? fontSize : 14) * 1.4;
}

function buildLayoutModel(
  root: HTMLElement,
  scale: number,
  pageHeight: number
): PdfLayoutModel {
  const rootRect = root.getBoundingClientRect();

  const position = (element: HTMLElement): PdfBlock => {
    const rect = element.getBoundingClientRect();

    return {
      top: Math.round((rect.top - rootRect.top) * scale),
      bottom: Math.round((rect.bottom - rootRect.top) * scale),
    };
  };

  const isValid = (block: PdfBlock): boolean => block.bottom > block.top;

  const groups: PdfBlock[] = [];
  const items: PdfItemInfo[] = [];

  const sections = Array.from(root.querySelectorAll<HTMLElement>("section"));

  for (const section of sections) {
    const heading = section.querySelector<HTMLElement>("h2");

    if (!heading) {
      continue;
    }

    const headingBlock = position(heading);

    // Only top-level items: a nested .rm-item (a bullet inside an experience
    // entry) must never be treated as an independent page boundary.
    const topLevel = Array.from(
      section.querySelectorAll<HTMLElement>(".rm-item")
    ).filter((item) => !item.parentElement?.closest(".rm-item"));

    const sectionItems: PdfItemInfo[] = [];

    for (const item of topLevel) {
      const block = position(item);

      if (!isValid(block)) {
        continue;
      }

      const nested = Array.from(
        item.querySelectorAll<HTMLElement>(".rm-item")
      )
        .map(position)
        .filter(isValid)
        .sort((a, b) => a.top - b.top);

      const edges: PdfBlock[] = [];

      if (nested.length >= 1) {
        edges.push({ top: block.top, bottom: nested[0].bottom });
      }

      if (nested.length >= 3) {
        edges.push({
          top: nested[nested.length - 2].top,
          bottom: block.bottom,
        });
      }

      sectionItems.push({ block, nested, edges });
    }

    items.push(...sectionItems);

    // The "first content unit" that stays with the heading.
    const smallUnit = pageHeight * 0.28;
    let unitBottom = headingBlock.bottom;

    if (sectionItems.length > 0) {
      const first = sectionItems[0];
      const height = first.block.bottom - first.block.top;

      if (height <= smallUnit) {
        unitBottom = first.block.bottom;
      } else if (first.nested.length > 0) {
        // Big entry: heading + entry header + its first bullet.
        unitBottom = first.nested[0].bottom;
      } else {
        const sample = topLevel[0];
        unitBottom = Math.min(
          first.block.bottom,
          first.block.top + Math.round(3 * lineHeightPx(sample) * scale)
        );
      }
    } else {
      const body = heading.nextElementSibling as HTMLElement | null;

      if (body) {
        const bodyBlock = position(body);

        if (isValid(bodyBlock)) {
          const height = bodyBlock.bottom - bodyBlock.top;

          unitBottom =
            height <= smallUnit
              ? bodyBlock.bottom
              : Math.min(
                  bodyBlock.bottom,
                  bodyBlock.top + Math.round(3 * lineHeightPx(body) * scale)
                );
        }
      }
    }

    groups.push({
      top: headingBlock.top,
      bottom: Math.max(headingBlock.bottom, unitBottom),
    });
  }

  return { groups: groups.filter(isValid), items };
}

/**
 * Blocks that must not be cut, for a given strictness tier.
 *  1: groups + every item
 *  2: groups + small items; big items may split between bullets
 *  3: groups + single-line-type items (no bullets); entries with bullets
 *     may split between their bullets
 *  4: groups + bullets (nothing else)
 *  5: groups only
 *  6: nothing (blank pixel rows only)
 */
function blocksForTier(
  model: PdfLayoutModel,
  tier: number,
  bigItemHeight: number
): PdfBlock[] {
  if (tier >= 6) {
    return [];
  }

  const blocks: PdfBlock[] = [...model.groups];

  if (tier === 5) {
    return blocks;
  }

  for (const item of model.items) {
    const height = item.block.bottom - item.block.top;
    const hasBullets = item.nested.length > 0;
    const isBig = height > bigItemHeight;

    if (tier === 1) {
      blocks.push(item.block);
    } else if (tier === 2) {
      if (isBig) {
        blocks.push(...item.nested, ...item.edges);
      } else {
        blocks.push(item.block);
      }
    } else if (tier === 3) {
      if (hasBullets) {
        blocks.push(...item.nested, ...item.edges);
      } else if (!isBig) {
        blocks.push(item.block);
      }
    } else {
      blocks.push(...item.nested);

      if (!hasBullets && !isBig) {
        blocks.push(item.block);
      }
    }
  }

  return blocks;
}

const TIERS: Array<{ tier: number; maxWaste: number }> = [
  { tier: 1, maxWaste: 0.15 },
  { tier: 2, maxWaste: 0.3 },
  { tier: 3, maxWaste: 0.45 },
  { tier: 4, maxWaste: 0.55 },
  { tier: 5, maxWaste: 0.6 },
  { tier: 6, maxWaste: 0.5 },
];

/**
 * Decides where each PDF page starts and ends.
 * Guarantees: slices are in order, never empty, never overlap, never taller
 * than one printable page (plus a ~1mm tolerance on the last page).
 */
export function planPageBreaks(input: PdfPlanInput): PdfSlice[] {
  const { canvasHeight, pageHeight, scale, model, probe } = input;

  const minRun = Math.max(3, Math.round(scale * 1.5));
  const snapRadius = Math.round(12 * scale);
  const tolerance = Math.round(9 * scale);
  const lastPageSlack = Math.round(4 * scale);
  const bigItemHeight = pageHeight * 0.22;

  /** Extent of the blank band that contains row y. */
  const runAround = (y: number): PdfSlice => {
    let a = y;
    let b = y;

    while (a > 0 && y - a < 400 && probe.isClean(a - 1)) a--;
    while (b < canvasHeight - 1 && b - y < 400 && probe.isClean(b + 1)) b++;

    return { start: a, end: b };
  };

  /** Centre of the blank band nearest to `target`, inside [lo, hi]. */
  const snapNearest = (
    target: number,
    lo: number,
    hi: number
  ): number | null => {
    const reach = Math.max(target - lo, hi - target);

    for (let d = 0; d <= reach; d++) {
      const candidates = d === 0 ? [target] : [target - d, target + d];

      for (const row of candidates) {
        if (row < lo || row > hi || row < 0 || row >= canvasHeight) continue;
        if (!probe.isClean(row)) continue;

        const run = runAround(row);

        if (run.end - run.start + 1 < minRun) continue;

        const middle = Math.floor((run.start + run.end) / 2);

        return Math.min(hi, Math.max(lo, middle));
      }
    }

    return null;
  };

  /** Blank band at or above `from`, never above `floor`. */
  const snapUp = (from: number, floor: number): number | null => {
    for (let row = from; row >= floor; row--) {
      if (row < 0 || row >= canvasHeight || !probe.isClean(row)) continue;

      const run = runAround(row);

      if (run.end - run.start + 1 < minRun) continue;

      const middle = Math.floor((run.start + Math.min(run.end, from)) / 2);

      return Math.min(from, Math.max(floor, middle));
    }

    return null;
  };

  const straddles = (
    block: PdfBlock,
    start: number,
    y: number,
    margin: number
  ): boolean =>
    block.top > start &&
    block.bottom - block.top <= pageHeight * 0.9 &&
    block.top + margin < y &&
    block.bottom - margin > y;

  /** Moves y up until it is not inside any protected block. */
  const liftAbove = (
    blocks: PdfBlock[],
    start: number,
    from: number,
    floor: number
  ): number | null => {
    let y = from;

    for (let guard = 0; guard < 500; guard++) {
      let hit: PdfBlock | null = null;

      for (const block of blocks) {
        if (straddles(block, start, y, 0) && (!hit || block.top < hit.top)) {
          hit = block;
        }
      }

      if (!hit) return y;

      y = hit.top;

      if (y < floor) return null;
    }

    return null;
  };

  const planTier = (
    start: number,
    limit: number,
    blocks: PdfBlock[],
    maxWasteFraction: number
  ): number | null => {
    const floor = Math.max(
      start + 1,
      limit - Math.floor(pageHeight * maxWasteFraction)
    );

    let y = limit;

    for (let round = 0; round < 8; round++) {
      const lifted = liftAbove(blocks, start, y, floor);

      if (lifted === null) return null;

      const snapped =
        lifted === limit
          ? snapUp(limit, floor)
          : snapNearest(
              lifted,
              Math.max(floor, lifted - snapRadius),
              Math.min(limit, lifted + snapRadius)
            ) ?? snapUp(lifted, floor);

      if (snapped === null || snapped < floor) return null;

      let violation: PdfBlock | null = null;

      for (const block of blocks) {
        if (
          straddles(block, start, snapped, tolerance) &&
          (!violation || block.top < violation.top)
        ) {
          violation = block;
        }
      }

      if (!violation) return snapped;

      // Drift moved the cut into another block: protect that one too.
      y = Math.min(violation.top, snapped - 1);
    }

    return null;
  };

  const chooseEnd = (start: number, limit: number): number => {
    for (const { tier, maxWaste } of TIERS) {
      const blocks = blocksForTier(model, tier, bigItemHeight);
      const end = planTier(start, limit, blocks, maxWaste);

      if (end !== null && end > start) {
        return end;
      }
    }

    return limit;
  };

  /** Skips the blank rows at the top of a new page (consistent top margin). */
  const trimLeadingBlank = (from: number): number => {
    const scanLimit = Math.min(canvasHeight - 1, from + Math.round(40 * scale));
    const pad = Math.round(4 * scale);

    for (let row = from; row <= scanLimit; row++) {
      if (!probe.isClean(row)) {
        return Math.max(from, row - pad);
      }
    }

    return from;
  };

  const slices: PdfSlice[] = [];
  let start = 0;

  for (let guard = 0; guard < 500 && start < canvasHeight; guard++) {
    let end: number;

    if (canvasHeight - start <= pageHeight + lastPageSlack) {
      end = canvasHeight;
    } else {
      end = chooseEnd(start, start + pageHeight);
    }

    if (end <= start || end - start > pageHeight + lastPageSlack) {
      end = Math.min(canvasHeight, start + pageHeight);
    }

    slices.push({ start, end });

    if (end >= canvasHeight) break;

    start = Math.max(end, trimLeadingBlank(end));
  }

  return slices;
}

/**
 * Reads pixel rows of the captured canvas. A row is "clean" when every pixel
 * is one of the background colours of its column (white page, coloured
 * sidebar, tinted panel, a vertical timeline rule...). A column can have up to
 * three background colours: those that fill a meaningful part of its height.
 * Text and graphics are never that common in one column, so they count as
 * content.
 */
function createRowProbe(canvas: HTMLCanvasElement): PdfRowProbe {
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not read the captured resume.");
  }

  const width = canvas.width;
  const height = canvas.height;

  const sampleCount = Math.min(300, height);
  const samples = new Int32Array(sampleCount * width);

  for (let i = 0; i < sampleCount; i++) {
    const y = Math.min(height - 1, Math.floor(((i + 0.5) * height) / sampleCount));
    const { data } = context.getImageData(0, y, width, 1);

    for (let x = 0; x < width; x++) {
      const index = x * 4;
      samples[i * width + x] =
        (data[index] << 16) | (data[index + 1] << 8) | data[index + 2];
    }
  }

  const SLOTS = 3;
  const NONE = -1;
  const minShare = Math.max(6, Math.round(sampleCount * 0.12));

  // backgrounds[x * SLOTS + n] = packed colour, or NONE
  const backgrounds = new Int32Array(width * SLOTS).fill(NONE);
  const column = new Int32Array(sampleCount);

  for (let x = 0; x < width; x++) {
    for (let i = 0; i < sampleCount; i++) {
      column[i] = samples[i * width + x];
    }

    column.sort();

    const found: Array<{ colour: number; count: number }> = [];
    let run = 1;

    for (let i = 1; i <= sampleCount; i++) {
      if (i < sampleCount && column[i] === column[i - 1]) {
        run++;
      } else {
        found.push({ colour: column[i - 1], count: run });
        run = 1;
      }
    }

    found.sort((a, b) => b.count - a.count);

    for (let n = 0; n < SLOTS && n < found.length; n++) {
      if (n === 0 || found[n].count >= minShare) {
        backgrounds[x * SLOTS + n] = found[n].colour;
      }
    }
  }

  const cache = new Map<number, boolean>();
  const INK_DIFFERENCE = 18;
  const INK_PIXELS_ALLOWED = 2;

  return {
    isClean(y: number): boolean {
      if (y < 0 || y >= height) return false;

      const cached = cache.get(y);

      if (cached !== undefined) return cached;

      const { data } = context.getImageData(0, y, width, 1);
      let ink = 0;
      let clean = true;

      for (let x = 0; x < width; x++) {
        const index = x * 4;
        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];
        let isBackground = false;

        for (let n = 0; n < SLOTS; n++) {
          const colour = backgrounds[x * SLOTS + n];

          if (colour === NONE) break;

          const difference =
            Math.abs(red - ((colour >> 16) & 255)) +
            Math.abs(green - ((colour >> 8) & 255)) +
            Math.abs(blue - (colour & 255));

          if (difference <= INK_DIFFERENCE) {
            isBackground = true;
            break;
          }
        }

        if (!isBackground && ++ink > INK_PIXELS_ALLOWED) {
          clean = false;
          break;
        }
      }

      cache.set(y, clean);

      return clean;
    },
  };
}

function addCanvasToPdf(
  pdf: jsPDF,
  canvas: HTMLCanvasElement,
  resumeElement: HTMLElement
): void {
  const rootWidth = resumeElement.getBoundingClientRect().width;

  if (!(rootWidth > 0)) {
    throw new Error("The resume has no width to export.");
  }

  const scale = canvas.width / rootWidth;

  const pageSliceHeight = Math.floor(
    (canvas.width * PDF_CONTENT_HEIGHT_MM) / PDF_CONTENT_WIDTH_MM
  );

  const slices = planPageBreaks({
    canvasHeight: canvas.height,
    pageHeight: pageSliceHeight,
    scale,
    model: buildLayoutModel(resumeElement, scale, pageSliceHeight),
    probe: createRowProbe(canvas),
  });

  slices.forEach((slice, pageIndex) => {
    const sourceHeight = slice.end - slice.start;

    const pageCanvas = document.createElement("canvas");

    pageCanvas.width = canvas.width;
    pageCanvas.height = sourceHeight;

    const context = pageCanvas.getContext("2d");

    if (!context) {
      throw new Error("Could not prepare a PDF page.");
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

    context.drawImage(
      canvas,
      0,
      slice.start,
      canvas.width,
      sourceHeight,
      0,
      0,
      canvas.width,
      sourceHeight
    );

    const imageData = pageCanvas.toDataURL("image/png");

    const imageHeightMM = (sourceHeight * PDF_CONTENT_WIDTH_MM) / canvas.width;

    if (pageIndex > 0) {
      pdf.addPage("a4", "portrait");
    }

    pdf.addImage(
      imageData,
      "PNG",
      PAGE_MARGIN_MM,
      PAGE_MARGIN_MM,
      PDF_CONTENT_WIDTH_MM,
      imageHeightMM
    );
  });
}

export async function downloadResumePdf(
  fileName = "resume"
): Promise<void> {
  const original = getResumeElement();

  const { clone, cleanup } = prepareExportClone(original);

  try {
    await waitForFonts(clone);
    await waitForImages(clone);
    await nextFrame();

    const scale = chooseScale(clone.getBoundingClientRect().height);

    const canvas = await html2canvas(clone, {
      scale,
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: false,
      imageTimeout: 30000,
      logging: false,
      foreignObjectRendering: false,
      windowWidth: A4_WIDTH_PX,
      scrollX: 0,
      scrollY: 0,
    });

    if (!canvasHasVisibleContent(canvas)) {
      throw new Error(
        "The resume could not be captured. Please refresh the editor and try again."
      );
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
      precision: 16,
    });

    addCanvasToPdf(pdf, canvas, clone);

    pdf.save(`${safeFileName(fileName)}.pdf`);
  } catch (error) {
    console.error("Resume PDF export failed:", error);

    throw new Error(
      error instanceof Error
        ? `PDF download failed: ${error.message}`
        : "PDF download failed. Please try again."
    );
  } finally {
    cleanup();
  }
}
