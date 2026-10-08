import type { TemplateDef } from './types';

const SANS = "'Inter', sans-serif";
const MANROPE = "'Manrope', sans-serif";
const FIGTREE = "'Figtree', sans-serif";
const POPPINS = "'Poppins', sans-serif";
const DMSANS = "'DM Sans', sans-serif";
const GROTESK = "'Space Grotesk', sans-serif";
const ARCHIVO = "'Archivo', sans-serif";
const PLEX = "'IBM Plex Sans', sans-serif";
const LORA = "'Lora', serif";
const PLAYFAIR = "'Playfair Display', serif";
const MERRI = "'Merriweather', serif";
const SOURCE = "'Source Serif 4', serif";
const BASKER = "'Libre Baskerville', serif";
const GARAMOND = "'EB Garamond', serif";
const MONO = "'JetBrains Mono', monospace";

export const TEMPLATES: TemplateDef[] = [
  { id: 'chennai',     name: 'Classic Standard',  category: 'Professional', layout: 'classic',     accent: '#1f3a8a', headingFont: SANS,     bodyFont: SANS,     fontScale: 1,    uppercaseHeadings: true,  showDividers: true,  pageMargin: 44 },
  { id: 'madurai',     name: 'Corporate Serif',   category: 'Professional', layout: 'classic',     accent: '#0f766e', headingFont: SOURCE,   bodyFont: SOURCE,   fontScale: 1.02, uppercaseHeadings: true,  showDividers: true,  pageMargin: 46 },
  { id: 'sivakasi',    name: 'Vibrant Banner',    category: 'Creative',     layout: 'banner',      accent: '#e2562b', headingFont: POPPINS,  bodyFont: DMSANS,   fontScale: 1,    uppercaseHeadings: true,  showDividers: false, pageMargin: 0  },
  { id: 'kodai',       name: 'Modern Sidebar',    category: 'Modern',       layout: 'sidebarLeft', accent: '#155e75', headingFont: MANROPE,  bodyFont: SANS,     fontScale: 0.98, uppercaseHeadings: true,  showDividers: false, pageMargin: 0  },
  { id: 'ooty',        name: 'Clean Sidebar',     category: 'Modern',       layout: 'sidebarLeft', accent: '#3f6212', headingFont: FIGTREE,  bodyFont: FIGTREE,  fontScale: 0.98, uppercaseHeadings: true,  showDividers: false, pageMargin: 0  },
  { id: 'marina',      name: 'Dynamic Split',     category: 'Modern',       layout: 'sidebarRight',accent: '#1d4ed8', headingFont: ARCHIVO,  bodyFont: SANS,     fontScale: 0.98, uppercaseHeadings: true,  showDividers: false, pageMargin: 0  },
  { id: 'nilgiri',     name: 'Structured Flow',   category: 'Modern',       layout: 'sidebarRight',accent: '#065f46', headingFont: MANROPE,  bodyFont: DMSANS,   fontScale: 0.98, uppercaseHeadings: false, showDividers: true,  pageMargin: 0  },
  { id: 'thanjavur',   name: 'Scholar Elite',     category: 'Academic',     layout: 'academic',    accent: '#7c2d12', headingFont: GARAMOND, bodyFont: GARAMOND, fontScale: 1.06, uppercaseHeadings: false, showDividers: true,  pageMargin: 50 },
  { id: 'kanchi',      name: 'Academic Heritage', category: 'Academic',     layout: 'academic',    accent: '#334155', headingFont: BASKER,   bodyFont: SOURCE,   fontScale: 1,    uppercaseHeadings: true,  showDividers: true,  pageMargin: 50 },
  { id: 'velankanni',  name: 'Minimal Clean',     category: 'Minimal',      layout: 'minimal',     accent: '#111827', headingFont: SANS,     bodyFont: SANS,     fontScale: 0.98, uppercaseHeadings: true,  showDividers: false, pageMargin: 52 },
  { id: 'pondy',       name: 'Contemporary Pure', category: 'Minimal',      layout: 'minimal',     accent: '#4c1d95', headingFont: GROTESK,  bodyFont: SANS,     fontScale: 0.98, uppercaseHeadings: false, showDividers: true,  pageMargin: 54 },
  { id: 'trichy',      name: 'Executive Leader',  category: 'Professional', layout: 'executive',   accent: '#0c4a6e', headingFont: PLAYFAIR, bodyFont: LORA,     fontScale: 1.02, uppercaseHeadings: true,  showDividers: true,  pageMargin: 46 },
  { id: 'coimbatore',  name: 'Executive Slate',   category: 'Professional', layout: 'executive',   accent: '#3f3f46', headingFont: MERRI,    bodyFont: SANS,     fontScale: 0.98, uppercaseHeadings: true,  showDividers: true,  pageMargin: 46 },
  { id: 'salem',       name: 'Tech Grid',         category: 'Tech',         layout: 'techGrid',    accent: '#0e7490', headingFont: GROTESK,  bodyFont: PLEX,     fontScale: 0.96, uppercaseHeadings: true,  showDividers: true,  pageMargin: 44 },
  { id: 'hosur',       name: 'Developer Mono',    category: 'Tech',         layout: 'techGrid',    accent: '#4338ca', headingFont: MONO,     bodyFont: PLEX,     fontScale: 0.94, uppercaseHeadings: true,  showDividers: false, pageMargin: 44 },
  { id: 'erode',       name: 'Timeline Flow',     category: 'Modern',       layout: 'timeline',    accent: '#be123c', headingFont: MANROPE,  bodyFont: SANS,     fontScale: 0.98, uppercaseHeadings: true,  showDividers: false, pageMargin: 46 },
  { id: 'tirupur',     name: 'Milestone Path',    category: 'Modern',       layout: 'timeline',    accent: '#1e40af', headingFont: FIGTREE,  bodyFont: DMSANS,   fontScale: 0.98, uppercaseHeadings: false, showDividers: false, pageMargin: 46 },
  { id: 'rameswaram',  name: 'Creative Pulse',    category: 'Creative',     layout: 'creative',    accent: '#7e22ce', headingFont: POPPINS,  bodyFont: SANS,     fontScale: 0.98, uppercaseHeadings: true,  showDividers: false, pageMargin: 40 },
  { id: 'yercaud',     name: 'Artisan Wave',      category: 'Creative',     layout: 'creative',    accent: '#0891b2', headingFont: GROTESK,  bodyFont: FIGTREE,  fontScale: 0.98, uppercaseHeadings: false, showDividers: false, pageMargin: 40 },
  { id: 'dindigul',    name: 'Compact Direct',    category: 'Professional', layout: 'compact',     accent: '#1f2937', headingFont: SANS,     bodyFont: SANS,     fontScale: 0.92, uppercaseHeadings: true,  showDividers: true,  pageMargin: 38 },
  { id: 'karur',       name: 'Compact Dense',     category: 'Professional', layout: 'compact',     accent: '#166534', headingFont: PLEX,     bodyFont: PLEX,     fontScale: 0.92, uppercaseHeadings: true,  showDividers: true,  pageMargin: 38 },
  { id: 'vellore',     name: 'Editorial Luxe',    category: 'Minimal',      layout: 'elegant',     accent: '#831843', headingFont: PLAYFAIR, bodyFont: SOURCE,   fontScale: 1.04, uppercaseHeadings: false, showDividers: true,  pageMargin: 52 },
  { id: 'kumbakonam',  name: 'Serif Elegance',    category: 'Minimal',      layout: 'elegant',     accent: '#134e4a', headingFont: BASKER,   bodyFont: LORA,     fontScale: 1,    uppercaseHeadings: true,  showDividers: true,  pageMargin: 52 },
  { id: 'tuticorin',   name: 'Ocean Header',      category: 'Modern',       layout: 'banner',      accent: '#0369a1', headingFont: ARCHIVO,  bodyFont: SANS,     fontScale: 0.98, uppercaseHeadings: true,  showDividers: true,  pageMargin: 0  },
  { id: 'palani',      name: 'Accent Top',        category: 'Creative',     layout: 'banner',      accent: '#c2410c', headingFont: MANROPE,  bodyFont: FIGTREE,  fontScale: 0.98, uppercaseHeadings: false, showDividers: false, pageMargin: 0  },
  { id: 'chidambaram', name: 'Traditional CV',    category: 'Academic',     layout: 'classic',     accent: '#312e81', headingFont: MERRI,    bodyFont: SOURCE,   fontScale: 1,    uppercaseHeadings: true,  showDividers: true,  pageMargin: 48 },
  { id: 'nagercoil',   name: 'Software Stack',    category: 'Tech',         layout: 'sidebarLeft', accent: '#111827', headingFont: GROTESK,  bodyFont: SANS,     fontScale: 0.96, uppercaseHeadings: true,  showDividers: false, pageMargin: 0  },
  { id: 'tenkasi',     name: 'Ultra Simple',      category: 'Minimal',      layout: 'minimal',     accent: '#0f172a', headingFont: DMSANS,   bodyFont: DMSANS,   fontScale: 0.98, uppercaseHeadings: true,  showDividers: true,  pageMargin: 56 },
];

export const TEMPLATE_CATEGORIES = ['All', 'Professional', 'Modern', 'Creative', 'Minimal', 'Academic', 'Tech'] as const;

export function getTemplate(id: string): TemplateDef {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

export const ACCENT_SWATCHES = [
  '#1f3a8a', '#1d4ed8', '#0369a1', '#0e7490', '#0f766e', '#166534',
  '#3f6212', '#a16207', '#c2410c', '#e2562b', '#be123c', '#831843',
  '#7e22ce', '#4338ca', '#334155', '#111827',
];