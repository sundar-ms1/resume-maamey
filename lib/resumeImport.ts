import type { ResumeData } from "@/lib/types";

const makeId = () => Math.random().toString(36).slice(2, 10);
const clean = (value: string) => value.replace(/\s+/g, " ").trim();

const HEADINGS: Record<string, string[]> = {
  summary: ["summary", "professional summary", "profile", "career objective", "objective"],
  experience: ["experience", "work experience", "employment", "professional experience", "work history"],
  education: ["education", "academic background", "qualifications"],
  skills: ["skills", "technical skills", "core skills", "key skills"],
  projects: ["projects", "personal projects"],
  certifications: ["certifications", "certificates", "licenses"],
  languages: ["languages"],
  achievements: ["achievements", "awards", "honors"],
};

const ALL_HEADINGS = new Set(Object.values(HEADINGS).flat().map((v) => v.toLowerCase()));

function getSection(lines: string[], headingNames: string[]): string[] {
  const start = lines.findIndex((line) => headingNames.includes(line.trim().toLowerCase()));
  if (start < 0) return [];
  let end = lines.findIndex((line, index) => index > start && ALL_HEADINGS.has(line.trim().toLowerCase()));
  if (end < 0) end = lines.length;
  return lines.slice(start + 1, end).filter(Boolean);
}

function stripBullet(line: string) {
  return line.replace(/^\s*[•●▪*-]\s*/, "").trim();
}

export function parseResumeText(raw: string, current: ResumeData): ResumeData {
  const lines = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const allText = lines.join("\n");

  const email = allText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
  const phone = allText.match(/(?:\+\s?\d{1,3}[\s.-]?)?(?:\(?\d{2,5}\)?[\s.-]?)?\d[\d\s().-]{6,}\d/)?.[0]?.trim() ?? "";
  const linkedin = allText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s,)]+/i)?.[0] ?? "";
  const github = allText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s,)]+/i)?.[0] ?? "";
  const website = allText.match(/(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+\.(?:com|in|org|net|io)(?:\/[^\s]*)?/i)?.[0] ?? "";

  const name = lines.find((line) =>
    line.length >= 3 &&
    line.length <= 55 &&
    !/@|https?:|www\.|\d{4}|resume|curriculum vitae/i.test(line) &&
    !ALL_HEADINGS.has(line.toLowerCase()) &&
    !/\d/.test(line)
  ) ?? current.basics.name;

  const summary = clean(getSection(lines, HEADINGS.summary).join(" "));
  const experienceLines = getSection(lines, HEADINGS.experience);
  const educationLines = getSection(lines, HEADINGS.education);
  const skillLines = getSection(lines, HEADINGS.skills);
  const projectLines = getSection(lines, HEADINGS.projects);
  const certificationLines = getSection(lines, HEADINGS.certifications);
  const languageLines = getSection(lines, HEADINGS.languages);
  const achievementLines = getSection(lines, HEADINGS.achievements);

  const experience: ResumeData["experience"] = [];
  for (const line of experienceLines) {
    if (/^[•●▪*-]/.test(line)) {
      if (experience.length) experience[experience.length - 1].bullets.push(stripBullet(line));
      continue;
    }
    const years = line.match(/(?:19|20)\d{2}\s*(?:-|–|to)\s*(?:present|current|(?:19|20)\d{2})/i);
    const dateText = years?.[0] ?? "";
    const withoutDates = clean(line.replace(dateText, "").replace(/[|,–-]+$/, ""));
    const parts = withoutDates.split(/\s+[|@]\s+|,\s*/);
    experience.push({
      id: makeId(),
      role: parts[0] || line,
      company: parts[1] || "",
      location: "",
      start: dateText.split(/\s*(?:-|–|to)\s*/i)[0] || "",
      end: dateText.split(/\s*(?:-|–|to)\s*/i)[1] || "",
      bullets: [],
    });
  }

  const education: ResumeData["education"] = educationLines
    .filter((line) => !/^[•●▪*-]/.test(line))
    .slice(0, 8)
    .map((line) => {
      const years = line.match(/(?:19|20)\d{2}/g) ?? [];
      return {
        id: makeId(),
        degree: line,
        school: "",
        location: "",
        start: years[0] ?? "",
        end: years[years.length - 1] ?? "",
        score: "",
      };
    });

  const skillText = clean(skillLines.map(stripBullet).join(", "));
  const projects: ResumeData["projects"] = projectLines
    .filter((line) => !/^[•●▪*-]/.test(line))
    .slice(0, 8)
    .map((line) => ({ id: makeId(), name: line, stack: "", link: "", description: "" }));

  const certifications: ResumeData["certifications"] = certificationLines
    .filter((line) => !/^[•●▪*-]/.test(line))
    .slice(0, 10)
    .map((line) => ({ id: makeId(), name: line, issuer: "", year: (line.match(/(?:19|20)\d{2}/) ?? [""])[0] }));

  const languages: ResumeData["languages"] = languageLines
    .map(stripBullet)
    .filter(Boolean)
    .slice(0, 10)
    .map((line) => ({ id: makeId(), name: line, level: "" }));

  const achievements: ResumeData["achievements"] = achievementLines
    .map(stripBullet)
    .filter(Boolean)
    .slice(0, 10)
    .map((line) => ({ id: makeId(), text: line }));

  return {
    ...current,
    basics: {
      ...current.basics,
      name,
      email,
      phone,
      linkedin,
      github,
      website: website && !website.includes("linkedin.com") && !website.includes("github.com") ? website : "",
      summary,
    },
    experience,
    education,
    skills: skillText ? [{ id: makeId(), label: "Skills", items: skillText }] : [],
    projects,
    certifications,
    languages,
    achievements,
  };
}

export function normaliseImportedText(value: string) {
  return value
    .replace(/\u0000/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
