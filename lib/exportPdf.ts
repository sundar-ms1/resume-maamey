"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

function waitForImages(element: HTMLElement): Promise<void> {
  const images = Array.from(element.querySelectorAll("img"));

  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }

          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  ).then(() => undefined);
}

async function waitForFonts(): Promise<void> {
  if (typeof document === "undefined") return;

  if ("fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font loading errors.
    }
  }
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
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

function prepareClone(
  original: HTMLElement
): { wrapper: HTMLElement; cleanup: () => void } {
  const wrapper = document.createElement("div");

  wrapper.style.position = "fixed";
  wrapper.style.left = "-100000px";
  wrapper.style.top = "0";
  wrapper.style.width = `${A4_WIDTH_PX}px`;
  wrapper.style.background = "#ffffff";
  wrapper.style.zIndex = "-999999";
  wrapper.style.pointerEvents = "none";
  wrapper.style.opacity = "1";
  wrapper.style.overflow = "visible";

  const clone = original.cloneNode(true) as HTMLElement;

  clone.style.position = "relative";
  clone.style.left = "0";
  clone.style.top = "0";
  clone.style.width = `${A4_WIDTH_PX}px`;
  clone.style.height = "auto";
  clone.style.minHeight = `${A4_HEIGHT_PX}px`;
  clone.style.maxWidth = "none";
  clone.style.transform = "none";
  clone.style.zoom = "1";
  clone.style.margin = "0";
  clone.style.padding = "0";
  clone.style.background = "#ffffff";
  clone.style.boxShadow = "none";
  clone.style.overflow = "visible";

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  const style = document.createElement("style");

  style.textContent = `
    *,
    *::before,
    *::after {
      box-sizing: border-box !important;
    }

    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
    }

    #resume-pdf-root {
      width: ${A4_WIDTH_PX}px !important;
      min-width: ${A4_WIDTH_PX}px !important;
      max-width: ${A4_WIDTH_PX}px !important;
      transform: none !important;
    }

    #resume-pdf-root .resume-pdf-page {
      width: ${A4_WIDTH_PX}px !important;
      min-height: ${A4_HEIGHT_PX}px !important;
      max-width: ${A4_WIDTH_PX}px !important;
      transform: none !important;
      zoom: 1 !important;
      margin: 0 !important;
      box-shadow: none !important;
    }

    img {
      max-width: 100% !important;
    }

    svg {
      max-width: 100% !important;
    }

    [contenteditable="true"] {
      outline: none !important;
    }

    button,
    textarea,
    input,
    select {
      appearance: none !important;
    }
  `;

  wrapper.appendChild(style);

  return {
    wrapper,
    cleanup: () => {
      wrapper.remove();
    },
  };
}

function safeFileName(name: string): string {
  const cleaned = name
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return cleaned || "resume";
}

export async function downloadResumePdf(
  fileName = "resume"
): Promise<void> {
  const original = getResumeElement();

  const { wrapper, cleanup } = prepareClone(original);

  try {
    const clone = wrapper.querySelector(
      "#resume-pdf-root"
    ) as HTMLElement | null;

    if (!clone) {
      throw new Error("Unable to prepare resume for PDF export.");
    }

    await waitForFonts();
    await waitForImages(clone);
    await nextFrame();

    const canvas = await html2canvas(clone, {
      scale: 4,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      imageTimeout: 30000,
      logging: false,
      removeContainer: true,
      foreignObjectRendering: false,
      windowWidth: A4_WIDTH_PX,
      windowHeight: A4_HEIGHT_PX,
      scrollX: 0,
      scrollY: 0,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
      putOnlyUsedFonts: true,
    });

    const pageHeightPx = Math.round(
      (canvas.width * A4_HEIGHT_MM) / A4_WIDTH_MM
    );

    let sourceY = 0;
    let pageNumber = 0;

    while (sourceY < canvas.height) {
      const remainingHeight = canvas.height - sourceY;
      const currentPageHeight = Math.min(pageHeightPx, remainingHeight);

      const pageCanvas = document.createElement("canvas");

      pageCanvas.width = canvas.width;
      pageCanvas.height = currentPageHeight;

      const context = pageCanvas.getContext("2d");

      if (!context) {
        throw new Error("Unable to create PDF canvas.");
      }

      context.fillStyle = "#ffffff";
      context.fillRect(
        0,
        0,
        pageCanvas.width,
        pageCanvas.height
      );

      context.drawImage(
        canvas,
        0,
        sourceY,
        canvas.width,
        currentPageHeight,
        0,
        0,
        canvas.width,
        currentPageHeight
      );

      const imageData = pageCanvas.toDataURL(
        "image/jpeg",
        0.98
      );

      const renderedHeightMm =
        (currentPageHeight / canvas.width) * A4_WIDTH_MM;

      if (pageNumber > 0) {
        pdf.addPage("a4", "portrait");
      }

      pdf.addImage(
        imageData,
        "JPEG",
        0,
        0,
        A4_WIDTH_MM,
        renderedHeightMm,
        undefined,
        "FAST"
      );

      sourceY += currentPageHeight;
      pageNumber += 1;
    }

    const finalName = `${safeFileName(fileName)}.pdf`;

    pdf.save(finalName);
  } finally {
    cleanup();
  }
}