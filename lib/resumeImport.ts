import type { ResumeData } from "@/lib/types";

/* ------------------------------------------------------------------ *
 * Old-resume import: turns the plain text of a resume into ResumeData.
 *
 * No AI is used. The text is split into sections by their headings, and
 * each section is read with simple, predictable rules. Anything the
 * rules cannot read is left empty (never filled with sample data), so the
 * person can fix it in the editor.
 * ------------------------------------------------------------------ */

type SectionName =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "achievements"
  | "contact"
  | "ignore";

interface Line {
  text: string;
  bullet: boolean;
}

const makeId = () => Math.random().toString(36).slice(2, 10);

/* ----------------------------- text prep ---------------------------- */

const BULLET_START = /^(?:[•●▪◦◆◇■□➢➤►▶‣⁃·*]|[\uF0B7\uF0A7\uF076\uF0D8\uF0FC\uF0A8]|[-–—](?=\s))\s*/;

export function normaliseImportedText(value: string): string {
  return value
    .replace(/\u0000/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\r\n?/g, "\n")
    .replace(/\uFB00/g, "ff")
    .replace(/\uFB01/g, "fi")
    .replace(/\uFB02/g, "fl")
    .replace(/\uFB03/g, "ffi")
    .replace(/\uFB04/g, "ffl")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[©®™]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function tidy(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function trimEdges(value: string): string {
  return tidy(value).replace(/^[\s,;:|–—-]+|[\s,;:|–—-]+$/g, "").trim();
}

function toLines(raw: string): Line[] {
  const lines: Line[] = [];

  for (const original of normaliseImportedText(raw).split("\n")) {
    let text = original.trim();

    if (!text) continue;

    let bullet = false;

    while (BULLET_START.test(text)) {
      bullet = true;
      text = text.replace(BULLET_START, "");
    }

    text = tidy(text);

    if (text) lines.push({ text, bullet });
  }

  return lines;
}

/* ---------------------------- headings ------------------------------ */

const SECTION_ALIASES: Record<SectionName, string[]> = {
  summary: [
    "summary", "professional summary", "career summary", "executive summary",
    "profile", "professional profile", "profile summary", "career objective",
    "objective", "career objectives", "about me", "about", "summary of qualifications",
  ],
  experience: [
    "experience", "work experience", "professional experience", "employment",
    "employment history", "work history", "career history", "internship",
    "internships", "internship experience", "relevant experience",
    "industrial experience", "industry experience", "professional background",
    "experience summary", "job experience",
  ],
  education: [
    "education", "educational qualification", "educational qualifications",
    "education and training", "academic background", "academic qualifications",
    "academics", "qualifications", "academic profile", "educational background",
    "education qualification", "academic details", "educational details",
  ],
  skills: [
    "skills", "technical skills", "core skills", "key skills", "skills and tools",
    "skills and abilities", "areas of expertise", "core competencies",
    "competencies", "technical proficiency", "technical expertise",
    "professional skills", "soft skills", "it skills", "computer skills",
    "skill set", "tools and technologies", "technologies", "technical summary",
  ],
  projects: [
    "projects", "personal projects", "academic projects", "key projects",
    "notable projects", "project experience", "selected projects",
    "major projects", "mini projects", "project work",
  ],
  certifications: [
    "certifications", "certification", "certificates", "licenses",
    "licenses and certifications", "courses", "training", "trainings",
    "courses and certifications", "professional certifications",
    "training and certifications", "online courses", "certifications and training",
  ],
  languages: [
    "languages", "language", "languages known", "language proficiency",
    "language skills",
  ],
  achievements: [
    "achievements", "awards", "honors", "honours", "accomplishments",
    "awards and achievements", "awards and honors", "honors and awards",
    "achievements and awards", "extra curricular activities",
    "extracurricular activities", "co curricular activities", "activities",
    "publications", "key achievements",
  ],
  ignore: [
    "declaration", "personal details", "personal information", "personal profile",
    "personal data", "references", "reference", "interests", "hobbies",
    "hobbies and interests", "interests and hobbies", "extra activities",
    "volunteer", "volunteering", "volunteer experience", "strengths",
    "availability",
  ],
  contact: ["contact", "contact details", "contact information", "contact me"],
};

const HEADING_LOOKUP = new Map<string, SectionName>();

(Object.keys(SECTION_ALIASES) as SectionName[]).forEach((name) => {
  SECTION_ALIASES[name].forEach((alias) => HEADING_LOOKUP.set(alias, name));
});

const SHOUTED_KEYWORDS: Array<[RegExp, SectionName]> = [
  [/declaration|reference|interest|hobbies|personal (details|information|data)/, "ignore"],
  [/experience|employment|internship/, "experience"],
  [/education|academic|qualification/, "education"],
  [/skill|competenc|expertise|technolog/, "skills"],
  [/project/, "projects"],
  [/certif|licen[sc]e|course|training/, "certifications"],
  [/language/, "languages"],
  [/achievement|award|honou?r|accomplishment/, "achievements"],
  [/summary|objective|profile|about/, "summary"],
];

function normaliseHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function headingOf(line: Line): SectionName | null {
  if (line.bullet || line.text.length > 45) return null;

  const normalised = normaliseHeading(line.text);

  if (!normalised) return null;

  const exact = HEADING_LOOKUP.get(normalised);

  if (exact) return exact;

  const letters = line.text.replace(/[^A-Za-z]/g, "");
  const shouted =
    letters.length >= 4 &&
    line.text === line.text.toUpperCase() &&
    !/\d/.test(line.text) &&
    normalised.split(" ").length <= 5;

  if (shouted) {
    for (const [pattern, name] of SHOUTED_KEYWORDS) {
      if (pattern.test(normalised)) return name;
    }
  }

  return null;
}

const HUMAN_LANGUAGES =
  /\b(english|hindi|tamil|telugu|malayalam|kannada|marathi|gujarati|bengali|punjabi|urdu|odia|oriya|assamese|french|german|spanish|italian|portuguese|russian|arabic|chinese|mandarin|japanese|korean|dutch|sinhala|nepali)\b/i;

/** "Skills: Java, Python" -> heading "skills" + content "Java, Python". */
function inlineHeading(
  line: Line
): { section: SectionName; rest: string } | null {
  if (line.bullet) return null;

  const match = line.text.match(/^([A-Za-z &]{4,30}?)\s*:\s*(.+)$/);

  if (!match) return null;

  const section = HEADING_LOOKUP.get(normaliseHeading(match[1]));

  if (!section || section === "ignore") return null;

  if (section === "languages" && !HUMAN_LANGUAGES.test(match[2])) return null;

  if (
    section !== "skills" &&
    section !== "summary" &&
    section !== "languages"
  ) {
    return null;
  }

  return { section, rest: match[2] };
}

function splitSections(lines: Line[]): {
  header: Line[];
  sections: Record<SectionName, Line[]>;
} {
  const sections: Record<SectionName, Line[]> = {
    summary: [],
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    achievements: [],
    contact: [],
    ignore: [],
  };

  const header: Line[] = [];
  let current: SectionName | null = null;

  for (const line of lines) {
    const heading = headingOf(line);

    if (heading) {
      current = heading;
      continue;
    }

    const inline = inlineHeading(line);

    if (inline && current !== "skills") {
      current = inline.section;
      sections[current].push({ text: inline.rest, bullet: false });
      continue;
    }

    if (current) {
      sections[current].push(line);
    } else {
      header.push(line);
    }
  }

  return { header, sections };
}

/* ------------------------------ dates ------------------------------- */

const MONTHS =
  "jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?";

const DATE_PART = `(?:(?:${MONTHS})\\.?(?:\\s*,?\\s*(?:19|20)\\d{2}|\\s*['’]\\s*\\d{2})|\\d{1,2}\\s*[/.-]\\s*(?:19|20)\\d{2}|(?:19|20)\\d{2})`;
const END_PART = `(?:present|current|till date|to date|till now|now|ongoing|today|${DATE_PART})`;

const DATE_RANGE = new RegExp(
  `[(\\[]?\\s*(${DATE_PART})\\s*(?:-|–|—|to|till|until)\\s*(${END_PART})\\s*[)\\]]?`,
  "i"
);

const SINGLE_DATE = new RegExp(`[(\\[]?\\s*(${DATE_PART})\\s*[)\\]]?`, "i");

function findDateRange(
  text: string
): { start: string; end: string; rest: string } | null {
  const match = text.match(DATE_RANGE);

  if (!match) return null;

  const rest = text.replace(match[0], " ");

  return { start: tidy(match[1]), end: tidy(match[2]), rest: trimEdges(rest) };
}

const isDateOnly = (text: string): boolean => {
  const range = findDateRange(text);

  if (range) return range.rest === "";

  const single = text.match(SINGLE_DATE);

  return !!single && trimEdges(text.replace(single[0], " ")) === "";
};

/* --------------------------- classification ------------------------- */

const ROLE_WORDS =
  /\b(engineer|developer|manager|accountant|analyst|assistant|technician|intern|trainee|executive|officer|lead|designer|consultant|teacher|lecturer|professor|architect|administrator|coordinator|supervisor|specialist|associate|director|head|clerk|tester|programmer|operator|representative|agent|advisor|auditor|writer|editor|nurse|doctor|scientist|researcher|owner|founder|president|freelancer|apprentice|fellow|sales|marketing|support|qa|sde|swe|cashier|driver|mechanic|electrician|accounts|hr|recruiter|admin|secretary|tutor|trainer|counsellor|counselor|pharmacist|salesman)\b/gi;

const COMPANY_WORDS =
  /\b(ltd|limited|pvt|private|inc|llc|llp|corp|corporation|co|company|technologies|technology|solutions|systems|services|software|labs|industries|enterprises|group|bank|university|college|school|institute|hospital|foods|motors|consulting|associates|agency|studio|infotech|softech|global|international|ventures|works|stores|traders|textiles|ice creams?)\b/gi;

const countMatches = (text: string, pattern: RegExp): number =>
  (text.match(pattern) || []).length;

const roleScore = (text: string) => countMatches(text, ROLE_WORDS);
const companyScore = (text: string) => countMatches(text, COMPANY_WORDS);

/** "Chennai", "San Francisco", "Chennai, IN" - not a role or company. */
function placeLike(text: string): boolean {
  const value = trimEdges(text);

  if (!value || value.length > 40 || /\d/.test(value)) return false;
  if (roleScore(value) || companyScore(value)) return false;

  const words = value.split(/[\s,]+/).filter(Boolean);

  return (
    words.length >= 1 &&
    words.length <= 4 &&
    words.every((word) => /^[A-Z][A-Za-z.'-]*$/.test(word))
  );
}

const endsSentence = (text: string) => /[.!?;:]$/.test(text.trim());
const startsLower = (text: string) => /^[a-z]/.test(text.trim());

/** A short line that could be a job title, company or place. */
function headerLike(text: string): boolean {
  return (
    text.length <= 70 &&
    tidy(text).split(" ").length <= 9 &&
    !endsSentence(text) &&
    !startsLower(text)
  );
}

/* ------------------------------ contact ----------------------------- */

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

function findPhone(lines: Line[]): string {
  const candidates = /(?:\+\d{1,3}[\s.-]?)?(?:\(\d{2,4}\)[\s.-]?)?\d[\d\s.-]{7,15}\d/g;

  for (const line of lines) {
    const withoutDates = line.text.replace(
      new RegExp(`${DATE_PART}\\s*(?:-|–|—|to)\\s*${END_PART}`, "gi"),
      " "
    );

    for (const match of withoutDates.match(candidates) || []) {
      const digits = match.replace(/\D/g, "");

      if (digits.length >= 10 && digits.length <= 13) {
        return tidy(match);
      }
    }
  }

  return "";
}

const LINKEDIN = /(?:https?:\/\/)?(?:[a-z]{2,3}\.)?linkedin\.com\/[^\s,)|]+/i;
const GITHUB = /(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s,)|]+/i;
const WEBSITE =
  /(?:https?:\/\/)?(?:www\.)?[A-Za-z0-9][A-Za-z0-9-]*(?:\.[A-Za-z0-9-]+)*\.(?:com|in|org|net|io|dev|me|co|app|tech|design|xyz|ai)(?:\/[^\s,)|]*)?/g;

function findWebsite(lines: Line[]): string {
  const text = lines
    .map((line) => line.text.replace(new RegExp(EMAIL.source, "gi"), " "))
    .join("\n");

  for (const match of text.match(WEBSITE) || []) {
    if (/linkedin\.com|github\.com/i.test(match)) continue;

    return match.replace(/[.,;]+$/, "");
  }

  return "";
}

const CONTACT_LABEL =
  /^(?:e-?mail|mobile|phone|ph|tel|contact|cell|address|location|place|city|dob|date of birth|linkedin|github|website|portfolio|url|nationality|gender|marital status)\b/i;

const isContactLine = (text: string): boolean =>
  EMAIL.test(text) ||
  /https?:\/\/|www\.|linkedin\.com|github\.com/i.test(text) ||
  /\d[\d\s.-]{7,}\d/.test(text) ||
  CONTACT_LABEL.test(text);

function findName(header: Line[]): string {
  const skip = /^(curriculum vitae|resume|cv|bio.?data|résumé)$/i;

  const found = header.slice(0, 8).find((line) => {
    const text = line.text;
    const words = text.split(" ");

    return (
      !line.bullet &&
      text.length >= 3 &&
      text.length <= 45 &&
      words.length <= 5 &&
      /^[A-Za-z][A-Za-z.' -]*$/.test(text) &&
      !skip.test(text) &&
      !isContactLine(text) &&
      !roleScore(text)
    );
  });

  if (found) return found.text;

  // A name can look like a job title ("Sales Kumar"): fall back to line one.
  const first = header.find(
    (line) => !isContactLine(line.text) && !skip.test(line.text)
  );

  return first ? first.text.slice(0, 45) : "";
}

function findTitle(header: Line[], name: string): string {
  const index = header.findIndex((line) => line.text === name);
  const after = header.slice(index + 1, index + 6).filter(
    (line) =>
      !line.bullet &&
      !isContactLine(line.text) &&
      line.text.length >= 3 &&
      line.text.length <= 70 &&
      !/\d/.test(line.text)
  );

  const withRole = after.find((line) => roleScore(line.text) > 0);

  if (withRole) return withRole.text;

  const next = header[index + 1];

  if (
    next &&
    after[0] === next &&
    next.text.split(" ").length >= 2 &&
    !next.text.includes(",") &&
    !placeLike(next.text)
  ) {
    return next.text;
  }

  return "";
}

function findLocation(header: Line[], name: string, title: string): string {
  const labelled = header.find((line) =>
    /^(?:address|location|place|city)\b/i.test(line.text)
  );

  if (labelled) {
    const value = trimEdges(
      labelled.text
        .replace(/^(?:address|location|place|city)\s*[:\-]?\s*/i, "")
        .replace(new RegExp(EMAIL.source, "gi"), " ")
    );

    if (value) return value.slice(0, 70);
  }

  const cityState =
    /^[A-Z][A-Za-z.'-]+(?: [A-Z][A-Za-z.'-]+){0,2}(?:,\s*[A-Z][A-Za-z.'-]+(?: [A-Z][A-Za-z.'-]+){0,2}){1,3}(?:[\s-]\d{5,6})?$/;

  let lone = "";

  for (const line of header.slice(0, 12)) {
    if (line.text === name || line.text === title) continue;

    const cleaned = line.text
      .replace(new RegExp(EMAIL.source, "gi"), "|")
      .replace(/https?:\/\/\S+|www\.\S+/gi, "|")
      .replace(/(?:linkedin|github)\.com\/\S*/gi, "|")
      .replace(/\+?\d[\d\s.()-]{7,}\d/g, "|");

    for (const raw of cleaned.split(/[|•·]/)) {
      const segment = trimEdges(raw.replace(/^[A-Za-z ]{3,12}:\s*/, ""));

      if (!segment || segment.length > 50) continue;

      if (cityState.test(segment) && !roleScore(segment) && !companyScore(segment)) {
        return segment;
      }

      if (
        !lone &&
        header.length <= 12 &&
        /^[A-Z][A-Za-z.'-]+(?: [A-Z][A-Za-z.'-]+)?$/.test(segment) &&
        placeLike(segment) &&
        segment.length >= 3
      ) {
        lone = segment;
      }
    }
  }

  return lone;
}

/* ---------------------------- experience ---------------------------- */

function splitParts(text: string): string[] {
  return text
    .split(/\s+[–—|@]\s+|\s+-\s+|\s*\|\s*|\s+at\s+/i)
    .map(trimEdges)
    .filter(Boolean);
}

function assignHeader(strings: string[]): {
  role: string;
  company: string;
  location: string;
} {
  const candidates: string[] = [];
  let location = "";

  for (const text of strings) {
    for (const part of splitParts(text)) {
      // "London, UK" on its own is a place, not a company with a suffix.
      if (part.includes(",") && placeLike(part) && !location) {
        location = trimEdges(part);
        continue;
      }

      const pieces = part.split(/\s*,\s*/).filter(Boolean);

      if (pieces.length >= 2) {
        const last = pieces[pieces.length - 1];

        if (placeLike(last) && !location) {
          location = last;

          const before = pieces.slice(0, -1);

          // "Brand Manager, Sunrise Foods Pvt Ltd" -> role and company
          if (before.length >= 2 && before.some((piece) => roleScore(piece) > 0)) {
            candidates.push(...before);
          } else {
            candidates.push(before.join(", "));
          }

          continue;
        }

        const mixed =
          pieces.some((piece) => roleScore(piece) > 0) &&
          pieces.some((piece) => roleScore(piece) === 0);

        if (mixed) {
          candidates.push(...pieces);
          continue;
        }
      }

      candidates.push(part);
    }
  }

  const unique = [...new Set(candidates.map(trimEdges).filter(Boolean))].slice(0, 4);

  let role = "";
  let company = "";

  const byRole = [...unique].sort((a, b) => roleScore(b) - roleScore(a));

  if (byRole.length && roleScore(byRole[0]) > 0) role = byRole[0];

  const rest = unique.filter((item) => item !== role);
  const byCompany = [...rest].sort((a, b) => companyScore(b) - companyScore(a));

  if (byCompany.length && companyScore(byCompany[0]) > 0) company = byCompany[0];

  if (!role) role = unique.find((item) => item !== company) || "";

  if (!company) company = unique.find((item) => item !== role) || "";

  if (!location) {
    const place = unique.find(
      (item) => item !== role && item !== company && placeLike(item)
    );

    if (place) location = place;
  }

  return { role, company, location };
}

function mergeBullets(lines: Line[]): string[] {
  const bullets: string[] = [];

  for (const line of lines) {
    const previous = bullets[bullets.length - 1];

    // A wrapped line (PDF/Word line break) continues the bullet above it.
    if (!line.bullet && previous !== undefined && startsLower(line.text)) {
      bullets[bullets.length - 1] = tidy(`${previous} ${line.text}`);
    } else {
      bullets.push(line.text);
    }
  }

  return bullets.map(trimEdges).filter(Boolean).slice(0, 12);
}

function parseExperience(lines: Line[]): ResumeData["experience"] {
  const dateIndexes = lines
    .map((line, index) => (!line.bullet && findDateRange(line.text) ? index : -1))
    .filter((index) => index >= 0);

  const makeItem = (
    headerStrings: string[],
    start: string,
    end: string,
    body: Line[]
  ): ResumeData["experience"][number] => {
    const { role, company, location } = assignHeader(headerStrings);

    return {
      id: makeId(),
      role,
      company,
      location,
      start,
      end,
      bullets: mergeBullets(body),
    };
  };

  if (dateIndexes.length === 0) {
    const items: ResumeData["experience"] = [];
    let headers: string[] = [];
    let body: Line[] = [];

    const flush = () => {
      if (headers.length || body.length) {
        items.push(makeItem(headers, "", "", body));
      }

      headers = [];
      body = [];
    };

    for (const line of lines) {
      const isHeader = !line.bullet && headerLike(line.text);

      if (isHeader && (body.length > 0 || headers.length === 0)) {
        flush();
        headers = [line.text];
      } else if (isHeader && headers.length < 3 && body.length === 0) {
        headers.push(line.text);
      } else {
        body.push(line);
      }
    }

    flush();

    return items.filter((item) => item.role || item.company).slice(0, 12);
  }

  const items: ResumeData["experience"] = [];
  let bodyStart = 0;
  let pending:
    | { headers: string[]; start: string; end: string; bodyFrom: number }
    | null = null;

  dateIndexes.forEach((dateIndex, position) => {
    const range = findDateRange(lines[dateIndex].text);

    if (!range) return;

    const remainder = range.rest;

    // Lines directly above the date line that belong to this entry's header.
    let preStart = dateIndex;
    const floor = pending ? pending.bodyFrom : bodyStart;
    const remainderGivesBoth =
      roleScore(remainder) > 0 && companyScore(remainder) > 0;

    if (!remainderGivesBoth) {
      while (
        preStart - 1 >= floor &&
        dateIndex - preStart < 2 &&
        !lines[preStart - 1].bullet &&
        headerLike(lines[preStart - 1].text) &&
        !isDateOnly(lines[preStart - 1].text)
      ) {
        preStart -= 1;
      }
    }

    if (pending) {
      items.push(
        makeItem(
          pending.headers,
          pending.start,
          pending.end,
          lines.slice(pending.bodyFrom, preStart)
        )
      );
    }

    const headers: string[] = [];

    for (let i = preStart; i < dateIndex; i++) headers.push(lines[i].text);

    if (remainder) headers.push(remainder);

    // Lines directly below the date line (company / place), if still needed.
    let cursor = dateIndex + 1;
    const nextDate = dateIndexes[position + 1] ?? lines.length;

    for (let taken = 0; taken < 2 && cursor < nextDate; taken++) {
      const candidate = lines[cursor];
      const haveRole = headers.some((item) => roleScore(item) > 0);
      const haveCompany = headers.some((item) => companyScore(item) > 0);

      if (
        candidate.bullet ||
        !headerLike(candidate.text) ||
        isDateOnly(candidate.text) ||
        (haveRole && haveCompany && !placeLike(candidate.text)) ||
        (headers.length >= 3 && !placeLike(candidate.text))
      ) {
        break;
      }

      headers.push(candidate.text);
      cursor += 1;
    }

    pending = { headers, start: range.start, end: range.end, bodyFrom: cursor };
    bodyStart = cursor;
  });

  if (pending) {
    const last: {
      headers: string[];
      start: string;
      end: string;
      bodyFrom: number;
    } = pending;

    items.push(makeItem(last.headers, last.start, last.end, lines.slice(last.bodyFrom)));
  }

  return items.filter((item) => item.role || item.company).slice(0, 12);
}

/* ----------------------------- education ---------------------------- */

const DEGREE_WORDS =
  /\b(?:b\.?\s?tech|b\.?\s?e|b\.?\s?sc|b\.?\s?com|b\.?\s?a|b\.?\s?b\.?\s?a|b\.?\s?c\.?\s?a|b\.?\s?s|b\.?\s?pharm|m\.?\s?tech|m\.?\s?e|m\.?\s?sc|m\.?\s?com|m\.?\s?a|m\.?\s?b\.?\s?a|m\.?\s?c\.?\s?a|m\.?\s?s|m\.?\s?phil|ph\.?\s?d|bachelor|bachelors|master|masters|diploma|associate degree|hsc|ssc|sslc|10th|12th|xii|higher secondary|secondary school|matriculation|intermediate|high school|mbbs|llb|llm|pgdm|iti|post graduate|postgraduate|under graduate|undergraduate)\b/i;

const INSTITUTION_WORDS =
  /\b(university|college|institute|institution|school|academy|polytechnic|vidyalaya|iit|nit|iiit|campus|board|matric)\b/i;

const GRADE_WORDS =
  /^(?:first class|second class|distinction|honou?rs?|merit|cum laude|summa cum laude|magna cum laude)(?: with .*)?$/i;

function extractScore(text: string): { score: string; rest: string } {
  const patterns: Array<[RegExp, (m: RegExpMatchArray) => string]> = [
    [/(?:cgpa|gpa)\s*[:=-]?\s*(\d+(?:\.\d+)?(?:\s*\/\s*\d+(?:\.\d+)?)?)/i, (m) => `${m[1].replace(/\s+/g, "")} ${/cgpa/i.test(m[0]) ? "CGPA" : "GPA"}`],
    [/(\d+(?:\.\d+)?(?:\s*\/\s*\d+(?:\.\d+)?)?)\s*(cgpa|gpa)\b/i, (m) => `${m[1].replace(/\s+/g, "")} ${m[2].toUpperCase()}`],
    [/(?:percentage|percent|marks|score|aggregate)\s*[:=-]?\s*(\d+(?:\.\d+)?)\s*%?/i, (m) => `${m[1]}%`],
    [/\b(\d{2}(?:\.\d+)?)\s*%/, (m) => `${m[1]}%`],
  ];

  for (const [pattern, format] of patterns) {
    const match = text.match(pattern);

    if (match) {
      return { score: format(match), rest: trimEdges(text.replace(match[0], " ")) };
    }
  }

  return { score: "", rest: text };
}

function parseEducation(lines: Line[]): ResumeData["education"] {
  const items: ResumeData["education"] = [];

  const blank = () => ({
    id: makeId(),
    degree: "",
    school: "",
    location: "",
    start: "",
    end: "",
    score: "",
  });

  let current: ResumeData["education"][number] | null = null;

  const applyDates = (item: ResumeData["education"][number], text: string): string => {
    const range = findDateRange(text);

    if (range) {
      item.start = range.start;
      item.end = range.end;

      return range.rest;
    }

    const single = text.match(SINGLE_DATE);

    if (single) {
      if (!item.end) item.end = tidy(single[1]);

      return trimEdges(text.replace(single[0], " "));
    }

    return text;
  };

  for (const line of lines) {
    let text = line.text;
    const hasDegree = DEGREE_WORDS.test(text);
    const hasSchool = INSTITUTION_WORDS.test(text);

    // A line that names a school belongs to the entry above when that entry
    // still has no school ("HSC" then "St. John's Higher Secondary School").
    const schoolForPreviousEntry =
      hasSchool && !!current && !!current.degree && !current.school;

    // "University of Leeds" on one line, "BSc Computer Science" on the next.
    const degreeForPreviousEntry =
      hasDegree &&
      !hasSchool &&
      !!current &&
      !!current.school &&
      !current.degree &&
      !current.start &&
      !current.end;

    if (
      (hasDegree && !schoolForPreviousEntry && !degreeForPreviousEntry) ||
      !current
    ) {
      current = blank();
      items.push(current);
    }

    const item: ResumeData["education"][number] = current;

    const scored = extractScore(text);

    if (scored.score && !item.score) item.score = scored.score;

    text = applyDates(item, scored.rest);

    if (!text) continue;

    const parts = text
      .split(/\s*(?:,|–|—|\||\s-\s|\bfrom\b|\bat\b)\s*/i)
      .map(trimEdges)
      .filter(Boolean);

    const degreeParts: string[] = [];

    for (const part of parts) {
      if (GRADE_WORDS.test(part)) {
        if (!item.score) item.score = part;
      } else if (INSTITUTION_WORDS.test(part) && !item.school) {
        item.school = part;
      } else if (INSTITUTION_WORDS.test(part)) {
        item.school = `${item.school}, ${part}`;
      } else if (placeLike(part) && (item.degree || degreeParts.length) && !DEGREE_WORDS.test(part)) {
        if (!item.location) item.location = part;
      } else if (!hasDegree && !hasSchool && item.degree) {
        if (!item.school) item.school = part;
        else if (!item.location && placeLike(part)) item.location = part;
      } else {
        degreeParts.push(part);
      }
    }

    if (degreeParts.length) {
      const joined = degreeParts.join(", ").replace(/\.,\s/g, ". ");

      item.degree = item.degree ? `${item.degree}, ${joined}` : joined;
    }
  }

  return items
    .map((item) => ({
      ...item,
      degree: trimEdges(item.degree),
      school: trimEdges(item.school),
    }))
    .filter((item) => item.degree || item.school)
    .slice(0, 10);
}

/* ------------------------------ skills ------------------------------ */

function cleanItems(value: string): string {
  const seen = new Set<string>();

  return value
    .replace(/[•·●▪|;]+/g, ",")
    .split(",")
    .map(trimEdges)
    .filter((item) => item && item.length <= 60)
    .filter((item) => {
      const key = item.toLowerCase();

      if (seen.has(key)) return false;

      seen.add(key);

      return true;
    })
    .slice(0, 60)
    .join(", ");
}

function parseSkills(lines: Line[]): ResumeData["skills"] {
  const groups: ResumeData["skills"] = [];
  const loose: string[] = [];

  for (const line of lines) {
    const match = line.text.match(/^([A-Za-z][A-Za-z &/+.#()-]{1,32}?)\s*:\s*(.+)$/);

    if (match) {
      const items = cleanItems(match[2]);

      if (items) {
        groups.push({ id: makeId(), label: trimEdges(match[1]), items });
      }
    } else {
      loose.push(line.text);
    }
  }

  const looseItems = cleanItems(loose.join(", "));

  if (looseItems) {
    groups.push({ id: makeId(), label: "", items: looseItems });
  }

  return groups.slice(0, 10);
}

/* ------------------------- projects & others ------------------------ */

const URL_IN_TEXT = /(?:https?:\/\/|www\.)[^\s,)|]+/i;

function splitNameAndDescription(text: string): { name: string; description: string; stack: string } {
  const match = text.match(/^(.{2,70}?)\s+(?:[–—-]|\||:)\s+(.+)$/);

  if (match) {
    const separator = text.slice(match[1].length, text.indexOf(match[2])).trim();

    if (separator === "|") {
      return { name: trimEdges(match[1]), description: "", stack: trimEdges(match[2]) };
    }

    return { name: trimEdges(match[1]), description: trimEdges(match[2]), stack: "" };
  }

  return { name: trimEdges(text), description: "", stack: "" };
}

function parseProjects(lines: Line[]): ResumeData["projects"] {
  const items: ResumeData["projects"] = [];
  const everyLineIsBullet = lines.length > 0 && lines.every((line) => line.bullet);
  let previousText = "";

  const startProject = (text: string) => {
    const link = text.match(URL_IN_TEXT)?.[0] || "";
    const parts = splitNameAndDescription(text.replace(URL_IN_TEXT, " "));

    items.push({
      id: makeId(),
      name: parts.name,
      stack: parts.stack,
      link,
      description: parts.description,
    });
  };

  for (const line of lines) {
    const text = line.text;
    const current = items[items.length - 1];

    const stack = text.match(
      /^(?:tech(?:nologies)?(?: stack)?|tools?|stack|built with|technologies used)\s*[:\-]\s*(.+)$/i
    );

    const urlOnly =
      URL_IN_TEXT.test(text) && text.replace(URL_IN_TEXT, "").trim().length < 4;

    // Lines that belong to the project above: bullets, wrapped lines and
    // long sentences. A short title-like line starts the next project.
    const continues =
      !everyLineIsBullet &&
      (line.bullet ||
        startsLower(text) ||
        /,$|\b(?:and|or|of|with|to|for|in)$/i.test(previousText) ||
        !headerLike(text));

    if (current && stack) {
      current.stack = trimEdges(stack[1]);
    } else if (current && urlOnly) {
      current.link = text.match(URL_IN_TEXT)?.[0] || "";
    } else if (current && continues) {
      current.description = tidy(`${current.description} ${text}`);
    } else {
      startProject(text);
    }

    previousText = text;
  }

  return items.filter((item) => item.name).slice(0, 10);
}

function mergeWrapped(lines: Line[]): string[] {
  const result: string[] = [];

  for (const line of lines) {
    const previous = result[result.length - 1];

    if (previous !== undefined && !line.bullet && startsLower(line.text)) {
      result[result.length - 1] = tidy(`${previous} ${line.text}`);
    } else {
      result.push(line.text);
    }
  }

  return result.map(trimEdges).filter(Boolean);
}

function parseCertifications(lines: Line[]): ResumeData["certifications"] {
  return mergeWrapped(lines)
    .slice(0, 12)
    .map((text) => {
      const yearMatch = text.match(/[(\[]?\b((?:19|20)\d{2})\b[)\]]?/);
      const year = yearMatch ? yearMatch[1] : "";
      const withoutYear = trimEdges(yearMatch ? text.replace(yearMatch[0], " ") : text);

      const parts = withoutYear
        .split(/\s+[–—|-]\s+|\s+(?:by|from|issued by)\s+/i)
        .map(trimEdges)
        .filter(Boolean);

      let name = parts[0] || withoutYear;
      let issuer = parts.slice(1).join(", ");

      if (!issuer) {
        const comma = name.match(/^(.{6,}?),\s*([^,]{2,40})$/);

        if (comma) {
          name = comma[1];
          issuer = comma[2];
        }
      }

      return { id: makeId(), name: trimEdges(name), issuer: trimEdges(issuer), year };
    })
    .filter((item) => item.name);
}

const LEVEL_WORDS =
  /\b(native|fluent|proficient|professional|bilingual|beginner|intermediate|advanced|basic|conversational|elementary|mother tongue|working proficiency|read|write|speak)\b/i;

function parseLanguages(lines: Line[]): ResumeData["languages"] {
  const seen = new Set<string>();
  const result: ResumeData["languages"] = [];

  const text = lines
    .map((line) => line.text)
    .join(", ")
    .replace(/\(([^)]*)\)/g, (_all, inner: string) => ` (${inner.replace(/[,/]/g, " ")})`);

  for (const token of text.split(/[,;|/•·]+|\s+and\s+/i)) {
    const value = trimEdges(token);

    if (!value) continue;

    let name = value;
    let level = "";

    const paren = value.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    const dashed = value.match(/^([A-Za-z ]+?)\s*[:–—-]\s*(.+)$/);

    if (paren) {
      name = trimEdges(paren[1]);
      level = trimEdges(paren[2]);
    } else if (dashed) {
      name = trimEdges(dashed[1]);
      level = trimEdges(dashed[2]);
    } else {
      const trailing = value.match(/^([A-Za-z]+)\s+(native|fluent|proficient|professional|beginner|intermediate|advanced|basic|conversational)$/i);

      if (trailing) {
        name = trailing[1];
        level = trailing[2];
      }
    }

    const key = name.toLowerCase();

    if (!name || name.length > 25 || /\d/.test(name) || seen.has(key)) continue;

    if (LEVEL_WORDS.test(name) && !HUMAN_LANGUAGES.test(name)) continue;

    seen.add(key);

    result.push({
      id: makeId(),
      name,
      level: level ? level.charAt(0).toUpperCase() + level.slice(1) : "",
    });
  }

  return result.slice(0, 12);
}

function parseAchievements(lines: Line[]): ResumeData["achievements"] {
  return mergeWrapped(lines)
    .slice(0, 12)
    .map((text) => ({ id: makeId(), text: text.slice(0, 300) }));
}

/* ---------------------- PDF text (column aware) --------------------- */

export interface PdfTextItem {
  text: string;
  x: number;
  y: number;
  width: number;
  size: number;
}

export interface PdfPageText {
  items: PdfTextItem[];
  width: number;
}

function groupRows(items: PdfTextItem[]): PdfTextItem[][] {
  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);
  const rows: PdfTextItem[][] = [];

  for (const item of sorted) {
    const row = rows[rows.length - 1];

    if (
      row &&
      Math.abs(row[0].y - item.y) <= Math.max(2, Math.min(row[0].size, item.size) * 0.45)
    ) {
      row.push(item);
    } else {
      rows.push([item]);
    }
  }

  return rows;
}

function itemsToLines(items: PdfTextItem[]): string[] {
  return groupRows(items)
    .map((row) => {
      const ordered = [...row].sort((a, b) => a.x - b.x);
      let line = "";
      let previous: PdfTextItem | null = null;

      for (const item of ordered) {
        const text = item.text.trim();

        // Empty items (stray spaces) must not hide the gap between words.
        if (!text) continue;

        if (previous) {
          const gap = item.x - (previous.x + previous.width);

          if (gap > Math.max(1.2, previous.size * 0.12)) line += " ";
        }

        line += text;
        previous = item;
      }

      return tidy(line);
    })
    .filter(Boolean);
}

/** The x position of the empty strip between two columns, or null. */
function findGutter(items: PdfTextItem[], pageWidth: number): number | null {
  if (items.length < 30 || !(pageWidth > 0)) return null;

  const rows = groupRows(items);

  if (rows.length < 12) return null;

  const BINS = 120;
  const emptyRows = new Array<number>(BINS).fill(0);

  for (const row of rows) {
    const covered = new Array<boolean>(BINS).fill(false);

    for (const item of row) {
      const from = Math.max(0, Math.floor((item.x / pageWidth) * BINS));
      const to = Math.min(BINS - 1, Math.floor(((item.x + item.width) / pageWidth) * BINS));

      for (let bin = from; bin <= to; bin++) covered[bin] = true;
    }

    covered.forEach((isCovered, bin) => {
      if (!isCovered) emptyRows[bin] += 1;
    });
  }

  // The widest run of bins (inside the middle of the page) that is empty
  // in at least 80% of the rows.
  let best: { from: number; to: number } | null = null;
  let runStart = -1;

  for (let bin = Math.floor(BINS * 0.2); bin <= Math.floor(BINS * 0.8) + 1; bin++) {
    const empty = bin <= Math.floor(BINS * 0.8) && emptyRows[bin] / rows.length >= 0.8;

    if (empty && runStart < 0) runStart = bin;

    if (!empty && runStart >= 0) {
      if (!best || bin - 1 - runStart > best.to - best.from) {
        best = { from: runStart, to: bin - 1 };
      }

      runStart = -1;
    }
  }

  if (!best || best.to - best.from + 1 < 3) return null;

  const gutter = (((best.from + best.to + 1) / 2) / BINS) * pageWidth;

  const left = items.filter((item) => item.x < gutter);
  const right = items.filter((item) => item.x >= gutter);

  if (left.length < items.length * 0.15 || right.length < items.length * 0.15) {
    return null;
  }

  // A real second column has several lines that all start at the same x.
  const rightRows = groupRows(right);

  if (rightRows.length < 8) return null;

  const starts = rightRows.map((row) => Math.min(...row.map((item) => item.x)));
  const tolerance = pageWidth * 0.015;
  const aligned = Math.max(
    ...starts.map((start) => starts.filter((other) => Math.abs(other - start) <= tolerance).length)
  );

  return aligned >= rightRows.length * 0.6 ? gutter : null;
}

/**
 * Builds the text of a PDF. A two-column page is read one column at a time
 * (the column with the biggest text, normally the name, first) instead of
 * mixing the columns line by line.
 */
export function pdfPagesToText(pages: PdfPageText[]): string {
  const first: string[] = [];
  const second: string[] = [];
  let firstIsLeft: boolean | null = null;

  for (const page of pages) {
    const gutter = findGutter(page.items, page.width);

    if (gutter === null) {
      first.push(...itemsToLines(page.items));
      continue;
    }

    const left = page.items.filter((item) => item.x < gutter);
    const right = page.items.filter((item) => item.x >= gutter);

    if (firstIsLeft === null) {
      const biggest = (list: PdfTextItem[]) =>
        list.reduce((max, item) => Math.max(max, item.size), 0);

      firstIsLeft = biggest(left) >= biggest(right);
    }

    first.push(...itemsToLines(firstIsLeft ? left : right));
    second.push(...itemsToLines(firstIsLeft ? right : left));
  }

  // "Contact" is an ignored heading: it stops the first column's last
  // section from swallowing the start of the second column.
  return [...first, ...(second.length ? ["Contact", ...second] : [])].join("\n");
}

/* ------------------------------- main ------------------------------- */

/**
 * Reads the text of an old resume. Only the design and section order of
 * `current` are kept; every piece of content comes from the imported text.
 */
export function parseResumeText(raw: string, current: ResumeData): ResumeData {
  const lines = toLines(raw);
  const { header, sections } = splitSections(lines);

  const contactBlock = [...header, ...sections.contact];
  const searchable = contactBlock.length ? contactBlock : lines.slice(0, 15);
  const everything = lines.map((line) => line.text).join("\n");

  const name = findName(header.length ? header : lines);
  const title = findTitle(header, name);

  const summary = tidy(sections.summary.map((line) => line.text).join(" "));

  const data: ResumeData = {
    ...current,
    basics: {
      name,
      title,
      email: everything.match(EMAIL)?.[0] || "",
      phone: findPhone(searchable) || findPhone(lines.slice(0, 25)),
      location: findLocation(contactBlock, name, title),
      website: findWebsite(searchable),
      linkedin: everything.match(LINKEDIN)?.[0] || "",
      github: everything.match(GITHUB)?.[0] || "",
      summary,
    },
    experience: parseExperience(sections.experience),
    education: parseEducation(sections.education),
    projects: parseProjects(sections.projects),
    skills: parseSkills(sections.skills),
    certifications: parseCertifications(sections.certifications),
    languages: parseLanguages(sections.languages),
    achievements: parseAchievements(sections.achievements),
  };

  const filled: Record<string, boolean> = {
    summary: !!summary,
    experience: data.experience.length > 0,
    education: data.education.length > 0,
    projects: data.projects.length > 0,
    skills: data.skills.length > 0,
    certifications: data.certifications.length > 0,
    languages: data.languages.length > 0,
    achievements: data.achievements.length > 0,
  };

  // A section that now has content must not stay hidden.
  data.hiddenSections = current.hiddenSections.filter((key) => !filled[key]);

  return data;
}
