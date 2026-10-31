import type { ResumeData } from "@/lib/types";

const makeId = () => Math.random().toString(36).slice(2, 10);
const clean = (value: string) => value.replace(/\\s+/g, " ").trim();

const HEADINGS: Record<string, string[]> = {
  summary: ["summary", "professional summary", "profile", "career objective", "objective", "about me"],
  experience: ["experience", "work experience", "employment", "professional experience", "work history", "employment history"],
  education: ["education", "academic background", "qualifications", "academic qualifications"],
  skills: ["skills", "technical skills", "core skills", "key skills", "areas of expertise"],
  projects: ["projects", "personal projects", "academic projects"],
  certifications: ["certifications", "certificates", "licenses", "courses"],
  languages: ["languages", "language"],
  achievements: ["achievements", "awards", "honors", "accomplishments"],
};

const ALL_HEADINGS = new Set(Object.values(HEADINGS).flat().map((value) => value.toLowerCase()));
const DATE_RANGE = /((?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\\.?\\s+)?(?:19|20)\\d{2}\\s*(?:-|–|—|to)\\s*(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\\.?\\s+)?(?:present|current|(?:19|20)\\d{2})/i;

function getSection(lines: string[], headingNames: string[]): string[] {
  const start = lines.findIndex((line) => headingNames.includes(line.trim().toLowerCase().replace(/:$/, "")));
  if (start < 0) return [];
  let end = lines.findIndex((line, index) =>
    index > start && ALL_HEADINGS.has(line.trim().toLowerCase().replace(/:$/, ""))
  );
  if (end < 0) end = lines.length;
  return lines.slice(start + 1, end).filter(Boolean);
}

function stripBullet(line: string) {
  return line.replace(/^\\s*[•●▪◦*-]\\s*/, "").trim();
}

function findName(lines: string[], fallback: string) {
  return lines.slice(0, 8).find((line) =>
    line.length >= 3 &&
    line.length <= 55 &&
    !/@|https?:|www\\.|\\d{4}|resume|curriculum vitae/i.test(line) &&
    !ALL_HEADINGS.has(line.toLowerCase().replace(/:$/, "")) &&
    !/\\d/.test(line)
  ) ?? fallback;
}

function parseExperience(lines: string[]): ResumeData["experience"] {
  const items: ResumeData["experience"] = [];
  for (const original of lines) {
    const line = original.trim();
    if (!line) continue;
    if (/^[•●▪◦*-]/.test(line)) {
      if (items.length) items[items.length - 1].bullets.push(stripBullet(line));
      continue;
    }
    const date = line.match(DATE_RANGE)?.[0] ?? "";
    const withoutDate = clean(line.replace(date, "").replace(/[|,–—-]+$/, ""));
    const parts = withoutDate.split(/\\s+[|@]\\s+|\\s+at\\s+|\\s+[–—]\\s+|,\\s*/i);
    const role = parts[0] || line;
    const company = parts.slice(1).join(" ").trim();
    items.push({
      id: makeId(),
      role,
      company,
      location: "",
      start: date ? (date.split(/\\s*(?:-|–|—|to)\\s*/i)[0] ?? "") : "",
      end: date ? (date.split(/\\s*(?:-|–|—|to)\\s*/i)[1] ?? "") : "",
      bullets: [],
    });
  }
  return items.slice(0, 12);
}

export function parseResumeText(raw: string, current: ResumeData): ResumeData {
  const lines = raw.split(/\\r?\\n/).map((line) => line.trim()).filter(Boolean);
  const allText = lines.join("\\n");

  const email = allText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}/i)?.[0] ?? "";
  const phone = allText.match(/(?:\\+\\s?\\d{1,3}[\\s.-]?)?(?:\\(?\\d{2,5}\\)?[\\s.-]?)?\\d[\\d\\s().-]{6,}\\d/)?.[0]?.trim() ?? "";
  const linkedin = allText.match(/(?:https?:\\/\\/)?(?:www\\.)?linkedin\\.com\\/[^\\s,)]+/i)?.[0] ?? "";
  const github = allText.match(/(?:https?:\\/\\/)?(?:www\\.)?github\\.com\\/[^\\s,)]+/i)?.[0] ?? "";
  const website = allText.match(/(?:https?:\\/\\/)?(?:www\\.)?[a-z0-9-]+\\.(?:com|in|org|net|io)(?:\\/[^\\s]*)?/i)?.[0] ?? "";

  const name = findName(lines, current.basics.name);
  const headingIndex = lines.indexOf(name);
  const contactIndex = lines.findIndex((line) => /@|\\+?\\d[\\d ()-]{7,}|linkedin\\.com|github\\.com/i.test(line));
  const titleCandidate = lines.slice(Math.max(0, headingIndex + 1), contactIndex > headingIndex ? contactIndex : Math.min(lines.length, headingIndex + 4))
    .find((line) => line.length < 90 && !/@|https?:|www\\.|\\d{5,}/i.test(line) && !ALL_HEADINGS.has(line.toLowerCase()));
  const locationCandidate = lines.find((line) =>
    /\\b(india|tamil nadu|chennai|madurai|coimbatore|bengaluru|bangalore|hyderabad|mumbai|delhi|pune|kerala|usa|uk|canada|australia)\\b/i.test(line)
  ) ?? "";

  const summary = clean(getSection(lines, HEADINGS.summary).join(" "));
  const experience = parseExperience(getSection(lines, HEADINGS.experience));
  const educationLines = getSection(lines, HEADINGS.education);
  const skillLines = getSection(lines, HEADINGS.skills);
  const projectLines = getSection(lines, HEADINGS.projects);
  const certificationLines = getSection(lines, HEADINGS.certifications);
  const languageLines = getSection(lines, HEADINGS.languages);
  const achievementLines = getSection(lines, HEADINGS.achievements);

  const education: ResumeData["education"] = educationLines
    .filter((line) => !/^[•●▪◦*-]/.test(line))
    .slice(0, 10)
    .map((line) => {
      const years = line.match(/(?:19|20)\\d{2}/g) ?? [];
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
    .filter((line) => !/^[•●▪◦*-]/.test(line))
    .slice(0, 10)
    .map((line) => ({ id: makeId(), name: line, stack: "", link: "", description: "" }));

  const certifications: ResumeData["certifications"] = certificationLines
    .filter((line) => !/^[•●▪◦*-]/.test(line))
    .slice(0, 12)
    .map((line) => ({ id: makeId(), name: line, issuer: "", year: (line.match(/(?:19|20)\\d{2}/) ?? [""])[0] }));

  const languages: ResumeData["languages"] = languageLines
    .map(stripBullet).filter(Boolean).slice(0, 12)
    .map((line) => ({ id: makeId(), name: line, level: "" }));

  const achievements: ResumeData["achievements"] = achievementLines
    .map(stripBullet).filter(Boolean).slice(0, 12)
    .map((line) => ({ id: makeId(), text: line }));

  return {
    ...current,
    basics: {
      ...current.basics,
      name,
      title: titleCandidate ?? current.basics.title,
      email: email || current.basics.email,
      phone: phone || current.basics.phone,
      location: locationCandidate || current.basics.location,
      linkedin: linkedin || current.basics.linkedin,
      github: github || current.basics.github,
      website: website && !website.includes("linkedin.com") && !website.includes("github.com") ? website : current.basics.website,
      summary: summary || current.basics.summary,
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
    .replace(/\\u0000/g, "")
    .replace(/\\r\\n?/g, "\\n")
    .replace(/[ \\t]+/g, " ")
    .replace(/\\n{3,}/g, "\\n\\n")
    .trim();
}
