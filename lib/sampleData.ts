import type { ResumeData, SectionKey } from './types';
import { getTemplate } from './templates';

export const SECTION_LABELS: Record<SectionKey, string> = {
  summary: 'Profile',
  experience: 'Experience',
  education: 'Education',
  projects: 'Projects',
  skills: 'Skills',
  certifications: 'Certifications',
  languages: 'Languages',
  achievements: 'Achievements',
};

export const DEFAULT_ORDER: SectionKey[] = [
  'summary',
  'experience',
  'projects',
  'education',
  'skills',
  'certifications',
  'achievements',
  'languages',
];

const base = getTemplate('chennai');

export const SAMPLE_RESUME: ResumeData = {
  basics: {
    name: 'Arun Kumar',
    title: 'Senior Frontend Engineer',
    email: 'arun.kumar@email.com',
    phone: '+91 98765 43210',
    location: 'Sivakasi, Tamil Nadu',
    website: 'arunkumar.dev',
    linkedin: 'linkedin.com/in/arunkumar',
    github: 'github.com/arunkumar',
    summary:
      'Frontend engineer with 7 years building performant product interfaces for fintech and SaaS teams. Specialises in React, TypeScript and design systems, and has shipped interfaces used by 2M+ monthly users. Comfortable owning a feature from spec to measurement.',
  },
  experience: [
    {
      id: 'e1',
      role: 'Senior Frontend Engineer',
      company: 'Zenpay Technologies',
      location: 'Chennai, IN',
      start: 'Mar 2022',
      end: 'Present',
      bullets: [
        'Led the rebuild of the merchant dashboard in Next.js, cutting first-load JS by 48% and improving LCP from 4.1s to 1.6s.',
        'Designed a 60-component design system adopted by four product squads, reducing UI review cycles by a third.',
        'Mentored five engineers and introduced a Playwright suite that caught 90% of regressions before release.',
      ],
    },
    {
      id: 'e2',
      role: 'Frontend Engineer',
      company: 'Freshworks',
      location: 'Chennai, IN',
      start: 'Jul 2019',
      end: 'Feb 2022',
      bullets: [
        'Built a real-time analytics module in React and WebSockets serving 40k concurrent support agents.',
        'Migrated a legacy AngularJS console to React incrementally with zero customer downtime.',
        'Improved accessibility to WCAG 2.1 AA across 30 screens, unlocking two enterprise contracts.',
      ],
    },
    {
      id: 'e3',
      role: 'Web Developer',
      company: 'Pixelmint Studio',
      location: 'Madurai, IN',
      start: 'Jun 2017',
      end: 'Jun 2019',
      bullets: ['Delivered 20+ client sites with an average Lighthouse score of 96 and automated the build pipeline.'],
    },
  ],
  education: [
    {
      id: 'ed1',
      degree: 'B.E. Computer Science and Engineering',
      school: 'Thiagarajar College of Engineering',
      location: 'Madurai, IN',
      start: '2013',
      end: '2017',
      score: 'CGPA 8.7 / 10',
    },
  ],
  projects: [
    {
      id: 'p1',
      name: 'Resume Maamey',
      stack: 'Next.js, TypeScript, Tailwind',
      link: 'github.com/arunkumar/resume-maamey',
      description:
        'Open-source resume builder with 28 print-ready templates, a live A4 canvas and vector PDF export. 3k GitHub stars.',
    },
    {
      id: 'p2',
      name: 'Kanini UI',
      stack: 'React, Radix, Storybook',
      link: 'kanini-ui.dev',
      description:
        'Accessible component library with 40 primitives, 18k weekly npm downloads and full keyboard coverage.',
    },
  ],
  skills: [
    { id: 's1', label: 'Languages', items: 'TypeScript, JavaScript, Python, SQL, HTML, CSS' },
    { id: 's2', label: 'Frameworks', items: 'React, Next.js, Remix, Node.js, Express, Tailwind CSS' },
    { id: 's3', label: 'Tooling', items: 'Vite, Webpack, Playwright, Vitest, Figma, Git, Docker' },
    { id: 's4', label: 'Practices', items: 'Design systems, Web performance, Accessibility, CI/CD, Code review' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', year: '2024' },
    { id: 'c2', name: 'Professional Frontend Architecture', issuer: 'Frontend Masters', year: '2023' },
  ],
  languages: [
    { id: 'l1', name: 'Tamil', level: 'Native' },
    { id: 'l2', name: 'English', level: 'Professional' },
    { id: 'l3', name: 'Hindi', level: 'Conversational' },
  ],
  achievements: [
    { id: 'a1', text: 'Speaker at ReactIndia 2024 on shipping design systems in regulated fintech.' },
    { id: 'a2', text: 'Winner, Smart India Hackathon 2016 — civic grievance tracking platform.' },
  ],
  sectionTitles: { ...SECTION_LABELS },
  hiddenSections: [],
  sectionOrder: DEFAULT_ORDER,
  design: {
    templateId: base.id,
    accent: base.accent,
    headingFont: base.headingFont,
    bodyFont: base.bodyFont,
    fontScale: base.fontScale,
    lineHeight: 1.45,
    pageMargin: base.pageMargin,
    sectionGap: 16,
    uppercaseHeadings: base.uppercaseHeadings,
    showDividers: base.showDividers,
  },
};

export const EMPTY_RESUME: ResumeData = {
  ...SAMPLE_RESUME,
  basics: {
    name: 'Your Name',
    title: 'Your Job Title',
    email: 'you@email.com',
    phone: '+91 00000 00000',
    location: 'City, State',
    website: '',
    linkedin: '',
    github: '',
    summary: 'A two or three line summary of who you are, what you build and the impact you have had.',
  },
  experience: [
    {
      id: 'x1',
      role: 'Job Title',
      company: 'Company Name',
      location: 'City',
      start: 'Jan 2023',
      end: 'Present',
      bullets: ['Describe an achievement with a number attached to it.', 'Describe what you owned and the outcome.'],
    },
  ],
  education: [
    { id: 'xe1', degree: 'Your Degree', school: 'Your College', location: 'City', start: '2019', end: '2023', score: '' },
  ],
  projects: [
    { id: 'xp1', name: 'Project Name', stack: 'Tech used', link: '', description: 'What the project does and its result.' },
  ],
  skills: [{ id: 'xs1', label: 'Skills', items: 'Skill one, Skill two, Skill three' }],
  certifications: [],
  languages: [],
  achievements: [],
};
