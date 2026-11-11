/**
 * Fonts for the resume.
 *
 * FONT_OPTIONS        -> the 10 fonts offered in the Design panel
 *                        (Heading font and Body font dropdowns).
 * TEMPLATE_ONLY_FONTS -> extra fonts that some ready-made templates use.
 *                        They are loaded too, so every template looks right.
 * GOOGLE_FONTS_HREF   -> one stylesheet address that loads all of them.
 *
 * The values (for example "'Inter', sans-serif") are exactly the strings
 * saved in the resume design and used in lib/templates.ts.
 */

export interface FontOption {
  label: string;
  value: string;
  group: 'Clean sans-serif' | 'Classic serif';
}

export const FONT_OPTIONS: FontOption[] = [
  { label: 'Inter (Standard ATS)', value: "'Inter', sans-serif", group: 'Clean sans-serif' },
  { label: 'Roboto', value: "'Roboto', sans-serif", group: 'Clean sans-serif' },
  { label: 'Open Sans', value: "'Open Sans', sans-serif", group: 'Clean sans-serif' },
  { label: 'Lato', value: "'Lato', sans-serif", group: 'Clean sans-serif' },
  { label: 'Source Sans 3', value: "'Source Sans 3', sans-serif", group: 'Clean sans-serif' },
  { label: 'Poppins', value: "'Poppins', sans-serif", group: 'Clean sans-serif' },
  { label: 'Merriweather', value: "'Merriweather', serif", group: 'Classic serif' },
  { label: 'Lora', value: "'Lora', serif", group: 'Classic serif' },
  { label: 'EB Garamond', value: "'EB Garamond', serif", group: 'Classic serif' },
  { label: 'Playfair Display', value: "'Playfair Display', serif", group: 'Classic serif' },
];

export const FONT_GROUPS: FontOption['group'][] = [
  'Clean sans-serif',
  'Classic serif',
];

/** Used by the ready-made templates, not shown in the dropdown. */
export const TEMPLATE_ONLY_FONTS: { label: string; value: string }[] = [
  { label: 'Manrope', value: "'Manrope', sans-serif" },
  { label: 'Figtree', value: "'Figtree', sans-serif" },
  { label: 'DM Sans', value: "'DM Sans', sans-serif" },
  { label: 'Space Grotesk', value: "'Space Grotesk', sans-serif" },
  { label: 'Archivo', value: "'Archivo', sans-serif" },
  { label: 'IBM Plex Sans', value: "'IBM Plex Sans', sans-serif" },
  { label: 'Source Serif 4', value: "'Source Serif 4', serif" },
  { label: 'Libre Baskerville', value: "'Libre Baskerville', serif" },
  { label: 'JetBrains Mono', value: "'JetBrains Mono', monospace" },
];

/** Every font that is loaded (kept for older imports). */
export const FONT_FAMILIES: { label: string; value: string }[] = [
  ...FONT_OPTIONS.map(({ label, value }) => ({ label, value })),
  ...TEMPLATE_ONLY_FONTS,
];

export const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?' +
  [
    // --- the 10 Design panel fonts ---
    'family=Inter:wght@400;500;600;700',
    'family=Roboto:wght@400;500;700',
    'family=Open+Sans:wght@400;500;600;700',
    'family=Lato:wght@400;700',
    'family=Source+Sans+3:wght@400;500;600;700',
    'family=Poppins:wght@400;500;600;700',
    'family=Merriweather:wght@400;700',
    'family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400',
    'family=EB+Garamond:wght@400;500;600;700',
    'family=Playfair+Display:wght@400;600;700;800',
    // --- fonts used by templates only ---
    'family=Manrope:wght@400;500;600;700;800',
    'family=Figtree:wght@400;500;600;700;800',
    'family=DM+Sans:wght@400;500;700',
    'family=Space+Grotesk:wght@400;500;600;700',
    'family=Archivo:wght@400;500;600;700',
    'family=IBM+Plex+Sans:wght@400;500;600;700',
    'family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700',
    'family=Libre+Baskerville:wght@400;700',
    'family=JetBrains+Mono:wght@400;500;700',
  ].join('&') +
  '&display=swap';

/** "'Open Sans', sans-serif" -> "open sans" (for comparing font values). */
export function firstFontFamily(value: string | undefined): string {
  if (!value) return '';

  return value.split(',')[0].replace(/['"]/g, '').trim().toLowerCase();
}

/** The dropdown option that matches a saved font value, if there is one. */
export function findFontOption(value: string | undefined): FontOption | undefined {
  const wanted = firstFontFamily(value);

  return FONT_OPTIONS.find((option) => firstFontFamily(option.value) === wanted);
}

/** A readable name for any saved font value, e.g. "Manrope". */
export function fontLabelFor(value: string): string {
  const match =
    findFontOption(value) ??
    TEMPLATE_ONLY_FONTS.find(
      (font) => firstFontFamily(font.value) === firstFontFamily(value)
    );

  if (match) return match.label;

  return value.split(',')[0].replace(/['"]/g, '').trim() || value;
}
