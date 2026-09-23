"use client";

import React from "react";
import { useResume } from "@/lib/store";

const PRESET_COLORS = [
  "#1d4ed8",
  "#2563eb",
  "#0284c7",
  "#0f766e",
  "#047857",
  "#15803d",
  "#4d7c0f",
  "#b45309",
  "#c2410c",
  "#e11d48",
  "#be123c",
  "#7c3aed",
  "#6d28d9",
  "#334155",
  "#0f172a",
  "#111827",
];

export const FONT_OPTIONS = [
  // --- Modern & Clean Sans-Serif (Top ATS Choices) ---
  { label: "Inter (Standard ATS)", value: "Inter, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
  { label: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', sans-serif" },
  { label: "DM Sans", value: "'DM Sans', sans-serif" },
  { label: "Manrope", value: "Manrope, sans-serif" },
  { label: "Raleway", value: "Raleway, sans-serif" },
  { label: "Source Sans 3", value: "'Source Sans 3', sans-serif" },
  { label: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
  { label: "Geist Sans", value: "'Geist', sans-serif" },

  // --- Executive, Academic & Classic Serif ---
  { label: "Merriweather", value: "Merriweather, serif" },
  { label: "Lora", value: "Lora, serif" },
  { label: "EB Garamond", value: "'EB Garamond', serif" },
  { label: "PT Serif", value: "'PT Serif', serif" },
  { label: "Cinzel", value: "Cinzel, serif" },
  { label: "Newsreader", value: "Newsreader, serif" },

  // --- Tech & Developer Monospace ---
  { label: "JetBrains Mono", value: "'JetBrains Mono', monospace" },
  { label: "Fira Code", value: "'Fira Code', monospace" },
];

export function DesignPanel() {
  const { data, updateDesign } = useResume();
  const design = data.design || {};

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* ACCENT COLOUR */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-ink-500">
          Accent Colour
        </label>
        <div className="mt-3 grid grid-cols-8 gap-2">
          {PRESET_COLORS.map((c) => {
            const isSelected = (design.accent || "#111827").toLowerCase() === c.toLowerCase();
            return (
              <button
                key={c}
                type="button"
                onClick={() => updateDesign({ accent: c })}
                className={`h-7 w-7 rounded-md transition hover:scale-110 ${
                  isSelected ? "ring-2 ring-ink ring-offset-2" : ""
                }`}
                style={{ backgroundColor: c }}
                title={c}
              />
            );
          })}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <input
            type="color"
            value={design.accent || "#111827"}
            onChange={(e) => updateDesign({ accent: e.target.value })}
            className="h-8 w-8 cursor-pointer rounded border border-line bg-white p-0.5"
          />
          <span className="text-xs text-ink-500">
            Custom colour ({design.accent || "#111827"})
          </span>
        </div>
      </div>

      {/* HEADING FONT */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-ink-500">
          Heading Font
        </label>
        <select
          value={design.headingFont || "Inter, sans-serif"}
          onChange={(e) => updateDesign({ headingFont: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.label} value={f.value} style={{ fontFamily: f.value }}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* BODY FONT */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-ink-500">
          Body Font
        </label>
        <select
          value={design.bodyFont || "Inter, sans-serif"}
          onChange={(e) => updateDesign({ bodyFont: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.label} value={f.value} style={{ fontFamily: f.value }}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* TEXT SIZE (FONT SCALE) */}
      <div>
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-ink-500">
          <span>Text Size</span>
          <span className="text-ink">
            {Math.round((design.fontScale || 1.0) * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0.8"
          max="1.4"
          step="0.01"
          value={design.fontScale ?? 1.0}
          onChange={(e) =>
            updateDesign({ fontScale: parseFloat(e.target.value) })
          }
          className="mt-2 w-full accent-ink"
        />
      </div>

      {/* PAGE MARGIN */}
      <div>
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-ink-500">
          <span>Page Margin</span>
          <span className="text-ink">
            {design.pageMargin ?? 48}px
          </span>
        </div>
        <input
          type="range"
          min="20"
          max="80"
          step="4"
          value={design.pageMargin ?? 48}
          onChange={(e) =>
            updateDesign({ pageMargin: parseInt(e.target.value, 10) })
          }
          className="mt-2 w-full accent-ink"
        />
      </div>

      {/* TOGGLES */}
      <div className="space-y-3 pt-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={!!design.uppercaseHeadings}
            onChange={(e) => updateDesign({ uppercaseHeadings: e.target.checked })}
            className="h-4 w-4 rounded border-line accent-ink"
          />
          <span className="text-xs font-bold text-ink">Uppercase Headings</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={!!design.showDividers}
            onChange={(e) => updateDesign({ showDividers: e.target.checked })}
            className="h-4 w-4 rounded border-line accent-ink"
          />
          <span className="text-xs font-bold text-ink">Show Section Dividers</span>
        </label>
      </div>
    </div>
  );
}