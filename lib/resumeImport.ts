import type { ResumeData } from "@/lib/types";

const id = () => Math.random().toString(36).slice(2, 10);
const clean = (s: string) => s.replace(/\\s+/g, " ").trim();
const section = (lines: string[], names: string[]) => {
  const start = lines.findIndex((line) => names.some((n) => new RegExp("^" + n + "$", "i").test(line.trim())));
  if (start < 0) return [];
  const next = lines.findIndex((line, i) => i > start && /^(experience|work experience|employment|education|academic|skills|technical skills|projects|certifications|summary|profile|objective|achievements|languages)$/i.test(line.trim()));
  return lines.slice(start + 1, next < 0 ? undefined : next).filter(Boolean);
};

export function parseResumeText(raw: string, current: ResumeData): ResumeData {
  const lines = raw.split(/\\r?\\n/).map((s) => s.trim()).filter(Boolean);
  const all = lines.join("\\n");
  const email = all.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}/i)?.[0] || "";
  const phone = all.match(/(?:\\+?\\d[\\d ().-]{7,}\\d)/)?.[0] || "";
  const urls = all.match(/(?:https?:\\/\\/)?(?:www\\.)?(?:linkedin\\.com\\/[^\\s]+|github\\.com\\/[^\\s]+|[\\w-]+\\.com)/gi) || [];
  const nameLine = lines.find((line) => line.length > 2 && line.length < 55 && !/@|\\d{4}|resume|curriculum vitae/i.test(line) && !/^(experience|education|skills|profile|summary|projects)$/i.test(line)) || current.basics.name;
  const summaryLines = section(lines, ["summary", "professional summary", "profile", "career objective", "objective"]);
  const expLines = section(lines, ["experience", "work experience", "employment", "professional experience"]);
  const eduLines = section(lines, ["education", "academic background", "qualifications"]);
  const skillLines = section(lines, ["skills", "technical skills", "core skills"]);
  const projectLines = section(lines, ["projects", "personal projects"]);
  const certifications = section(lines, ["certifications", "certificates"]);
  const experience = expLines.length ? expLines.reduce<Array<{id:string;role:string;company:string;location:string;start:string;end:string;bullets:string[]}>>((acc, line) => {
    if (/^[•*–-]/.test(line)) { if (acc.length) acc[acc.length-1].bullets.push(line.replace(/^[•*–-]+\\s*/, "")); return acc; }
    if (acc.length && !acc[acc.length-1].role) { acc[acc.length-1].role = line; return acc; }
    acc.push({id:id(),role:line,company:"",location:"",start:"",end:"",bullets:[]}); return acc;
  }, []).slice(0,8) : [];
  const education = eduLines.filter((l) => !/^[•*–-]/.test(l)).slice(0,6).map((line) => ({id:id(),degree:line,school:"",location:"",start:(line.match(/(?:19|20)\\d{2}/g)||[])[0]||"",end:(line.match(/(?:19|20)\\d{2}/g)||[]).slice(-1)[0]||"",score:""}));
  const skillText = skillLines.map((l)=>l.replace(/^[•*–-]+\\s*/,"")).join(", ");
  const projects = projectLines.filter((l)=>!/^[-•*]/.test(l)).slice(0,6).map((line)=>({id:id(),name:line,stack:"",link:"",description:""}));
  return {
    ...current,
    basics: {...current.basics,name:nameLine,email,phone,website:urls.find(u=>!u.includes("linkedin")&&!u.includes("github"))||"",linkedin:urls.find(u=>u.includes("linkedin"))||"",github:urls.find(u=>u.includes("github"))||"",summary:clean(summaryLines.join(" "))},
    experience,
    education,
    skills: skillText ? [{id:id(),label:"Skills",items:clean(skillText)}] : [],
    projects,
    certifications: certifications.filter((l)=>!/^[-•*]/.test(l)).slice(0,8).map((line)=>({id:id(),name:line,issuer:"",year:(line.match(/20\\d{2}/)||[])[0]||""})),
    achievements: [],
    languages: [],
    hiddenSections: [],
  };
}

export function normaliseImportedText(text: string) {
  return text.replace(/\\u0000/g, "").replace(/[ \\t]+/g, " ").replace(/\\n{3,}/g, "\\n\\n").trim();
}
