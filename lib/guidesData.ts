export interface Guide {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
}

export const GUIDES: Guide[] = [
  {
    slug: "ats-resume-optimization-guide",
    title: "How to Build an ATS-Friendly Resume (Step-by-Step)",
    description: "Learn how Applicant Tracking Systems filter job applications and how to design your resume to pass automated screens.",
    date: "October 2026",
    readTime: "6 min read",
    content: [
      {
        heading: "What Is an Applicant Tracking System (ATS)?",
        paragraphs: [
          "An Applicant Tracking System (ATS) is recruitment software used by hiring teams to organize, search, and rank job applications. Before a recruiter ever lays eyes on your document, an ATS algorithm converts your PDF or Word file into plain text and parses it into distinct categories such as Work Experience, Education, and Skills.",
          "If your resume uses complex tables, multi-layered icons, or non-standard fonts, the parser may fail to read your data correctly, resulting in an automatic rejection even if you are fully qualified for the role."
        ]
      },
      {
        heading: "Key Rules for High-Scoring ATS Resumes",
        paragraphs: [
          "To maximize parsing accuracy and ensure your qualifications get matched with the job description, adhere to these fundamental formatting rules:"
        ],
        bullets: [
          "Use clean single-column or standard two-column layouts without nested tables or floating text boxes.",
          "Stick to universal, readable web fonts such as Inter, Roboto, Arial, or Georgia.",
          "Use conventional section headings (e.g., 'Work Experience', 'Education', 'Skills') rather than decorative titles.",
          "Avoid putting critical contact information inside document headers or footers, which many parsers skip.",
          "Integrate keywords directly from the target job posting into your achievement bullet points."
        ]
      },
      {
        heading: "Writing Quantifiable Achievement Bullets",
        paragraphs: [
          "Recruiters look for outcomes rather than generic task lists. Rather than writing 'Responsible for handling customer issues,' reframe your experience using the Action + Context + Result formula:",
          "'Resolved 40+ daily technical customer inquiries while maintaining a 98% customer satisfaction score across 6 consecutive months.'"
        ]
      }
    ]
  },
  {
    slug: "action-verbs-for-resumes",
    title: "100+ High-Impact Action Verbs to Strengthen Your Resume",
    description: "Replace passive phrases like 'responsible for' with powerful action verbs that highlight leadership and measurable results.",
    date: "October 2026",
    readTime: "5 min read",
    content: [
      {
        heading: "Why Action Verbs Matter on a Modern Resume",
        paragraphs: [
          "Passive phrasing dilutes the perceived value of your contributions. Starting your bullet points with dynamic, decisive verbs immediately anchors the hiring manager's attention to your direct impact.",
          "Strong verbs provide clearer context on your level of ownership, whether you led an initiative, optimized an existing workflow, or resolved a critical technical challenge."
        ]
      },
      {
        heading: "Verbs for Leadership & Ownership",
        paragraphs: [
          "When describing initiatives where you directed teams, managed projects, or owned strategic goals, leverage verbs such as:"
        ],
        bullets: [
          "Spearheaded, Orchestrated, Directed, Championed, Founded",
          "Mobilized, Overhauled, Streamlined, Governed, Mentored"
        ]
      },
      {
        heading: "Verbs for Technical & Quantitative Achievements",
        paragraphs: [
          "For technical roles, engineers, and data specialists, showcase your direct engineering output:"
        ],
        bullets: [
          "Architected, Automated, Deployed, Engineered, Integrated",
          "Optimized, Debugged, Modeled, Benchmarked, Restructured"
        ]
      }
    ]
  },
  {
    slug: "fresher-resume-guide",
    title: "How to Write a Resume with No Experience (For Freshers & Students)",
    description: "A comprehensive guide on leveraging college projects, internships, certifications, and technical skills when starting out.",
    date: "October 2026",
    readTime: "7 min read",
    content: [
      {
        heading: "Rethinking 'Experience' as an Entry-Level Candidate",
        paragraphs: [
          "One of the biggest hurdles fresh college graduates face is the requirement for prior experience. However, relevant experience is not limited strictly to full-time corporate employment.",
          "Coursework projects, open-source contributions, academic competitions, and freelance gigs all count as legitimate evidence of your practical abilities."
        ]
      },
      {
        heading: "Structuring an Entry-Level Resume",
        paragraphs: [
          "When you lack years of commercial employment, order your resume sections to place your strongest selling points at the top:"
        ],
        bullets: [
          "Professional Summary: 2–3 sentences highlighting your specialization, core skills, and career objective.",
          "Education & Coursework: Mention your degree, relevant academic honors, and foundational modules.",
          "Projects & Portfolio: Detail 2–3 complete projects, listing the tech stack, problem solved, and live links.",
          "Technical & Soft Skills: Group skills logically into Languages, Frameworks, and Tools.",
          "Certifications & Extracurriculars: Highlight proof of continuous learning."
        ]
      }
    ]
  }
];