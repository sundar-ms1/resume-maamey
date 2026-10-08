export type SectionKey =
  | 'summary'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'languages'
  | 'achievements';

export interface Basics {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  start: string;
  end: string;
  score: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  stack: string;
  link: string;
  description: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string;
}

export interface CertItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface AchievementItem {
  id: string;
  text: string;
}

export interface Design {
  templateId: string;
  accent: string;
  headingFont: string;
  bodyFont: string;
  fontScale: number;
  lineHeight: number;
  pageMargin: number;
  sectionGap: number;
  uppercaseHeadings: boolean;
  showDividers: boolean;
}

export interface ResumeData {
  basics: Basics;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  certifications: CertItem[];
  languages: LanguageItem[];
  achievements: AchievementItem[];
  sectionTitles: Record<SectionKey, string>;
  hiddenSections: SectionKey[];
  sectionOrder: SectionKey[];
  design: Design;
}

export type LayoutId =
  | 'classic'
  | 'sidebarLeft'
  | 'sidebarRight'
  | 'banner'
  | 'timeline'
  | 'minimal'
  | 'elegant'
  | 'compact'
  | 'creative'
  | 'executive'
  | 'techGrid'
  | 'academic';

export interface TemplateDef {
  id: string;
  name: string;
  category: 'Professional' | 'Modern' | 'Creative' | 'Minimal' | 'Academic' | 'Tech';
  layout: LayoutId;
  accent: string;
  headingFont: string;
  bodyFont: string;
  fontScale: number;
  uppercaseHeadings: boolean;
  showDividers: boolean;
  pageMargin: number;
}
