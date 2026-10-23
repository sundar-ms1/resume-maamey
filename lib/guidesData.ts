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
    title: "How to Build an ATS-Friendly Resume: A Practical Checklist",
    description: "Understand resume parsing, choose readable formatting, and tailor your application without relying on promises of an ATS score.",
    date: "October 2026",
    readTime: "8 min read",
    content: [
      {
        heading: "What an applicant tracking system does",
        paragraphs: [
          "An applicant tracking system (ATS) helps an employer collect applications, organise candidate records and search application information. Different employers configure their systems differently. Some parse a resume into fields, while recruiters may also search the text or review the original document.",
          "There is no universal ATS test and no resume format can guarantee an interview or automatic acceptance. Your practical goal is to make your qualifications easy to identify, both for software and for the person reviewing your application."
        ]
      },
      {
        heading: "Use a clear structure",
        paragraphs: ["Choose formatting that keeps your information in a logical reading order. A simple design is often a sensible default when you do not know which system an employer uses."],
        bullets: [
          "Use conventional headings such as Professional Summary, Work Experience, Education, Skills and Projects.",
          "Keep important contact details in the main document body rather than relying only on a header, footer or decorative icon.",
          "Use consistent date formats and list work experience in reverse chronological order unless another order better explains your background.",
          "Avoid complex tables, text boxes, charts and image-only text when reliable parsing is important.",
          "Use a readable font size, strong contrast and enough spacing to make the page comfortable to scan."
        ]
      },
      {
        heading: "Tailor the resume to the actual vacancy",
        paragraphs: [
          "Read the job description before editing your resume. Note the skills, tools, qualifications and responsibilities that are genuinely relevant to your experience. Use the employer's terminology when it accurately describes what you have done; do not add keywords for skills you do not possess.",
          "For example, if a role asks for inventory reporting and you have maintained stock records, describe that work directly. Do not claim that you used a named software package unless you really used it."
        ],
        bullets: [
          "Move the most relevant experience or project higher on the page.",
          "Spell out an acronym the first time if readers may not know it.",
          "Mirror the job title only when it accurately represents the role you held or the role you are applying for.",
          "Follow the employer's requested file format and file-naming instructions."
        ]
      },
      {
        heading: "Write evidence-based bullet points",
        paragraphs: [
          "A useful bullet describes an action, the work involved and the result or purpose. Numbers can help explain scale, but only include figures you can honestly support. If you do not have reliable metrics, a specific description of the task is better than an invented percentage.",
          "Less informative: 'Responsible for customer service.' More specific: 'Answered customer enquiries, recorded complaints and followed up on unresolved orders.' If you have verified data, you could add the typical volume or a documented outcome."
        ]
      },
      {
        heading: "Check the exported file before applying",
        paragraphs: ["Open the downloaded file and check it at normal size. Make sure the text is selectable where appropriate, contact details are correct, bullets have not moved, and page breaks have not separated a heading from its content."],
        bullets: [
          "Copy the text into a plain-text editor to check that the reading order still makes sense.",
          "Check spelling, phone number, email address, dates and links.",
          "Keep a version tailored to each important application instead of sending the same generic resume everywhere."
        ]
      }
    ]
  },
  {
    slug: "action-verbs-for-resumes",
    title: "40 Action Verbs for Resume Bullet Points, With Examples",
    description: "Choose precise verbs for real achievements and responsibilities, with examples for administration, service, projects and technical work.",
    date: "October 2026",
    readTime: "6 min read",
    content: [
      {
        heading: "Choose verbs that describe what you actually did",
        paragraphs: [
          "Action verbs can make a resume easier to scan, but the verb should match your level of responsibility. Use 'led' when you directed work, 'supported' when you assisted, and 'created' when you produced something. Strong wording does not require exaggeration.",
          "A practical bullet often follows this pattern: action + task or context + outcome. Not every bullet needs a metric; a clear description of the work is useful when the result cannot be measured reliably."
        ]
      },
      {
        heading: "Leadership and coordination",
        paragraphs: ["Use these when you genuinely guided people, coordinated work or took responsibility for a process."],
        bullets: ["Led", "Coordinated", "Organised", "Delegated", "Mentored", "Trained", "Scheduled", "Facilitated", "Supervised", "Prioritised"]
      },
      {
        heading: "Customer service and communication",
        paragraphs: ["These verbs can help describe how you assisted customers, explained information or handled requests."],
        bullets: ["Resolved", "Answered", "Advised", "Explained", "Documented", "Presented", "Negotiated", "Responded", "Clarified", "Followed up"]
      },
      {
        heading: "Analysis and improvement",
        paragraphs: ["Use these for work involving checking information, finding patterns, improving a process or solving a problem."],
        bullets: ["Analysed", "Reviewed", "Audited", "Compared", "Investigated", "Improved", "Streamlined", "Updated", "Verified", "Reconciled"]
      },
      {
        heading: "Projects and technical work",
        paragraphs: ["These verbs suit hands-on delivery. Add the tool, method or deliverable when it helps a reader understand your contribution."],
        bullets: ["Built", "Designed", "Created", "Tested", "Implemented", "Maintained", "Automated", "Configured", "Launched", "Delivered"]
      },
      {
        heading: "Before and after examples",
        paragraphs: [
          "Before: 'Responsible for updating stock records.' After: 'Updated daily stock records and flagged discrepancies for review.' The revised version tells the reader what the person did and why it mattered without inventing a result.",
          "Before: 'Worked on a college website project.' After: 'Built a college project website with a responsive layout and tested the main forms on mobile and desktop.' Use the second style only if it accurately describes your own contribution."
        ]
      }
    ]
  },
  {
    slug: "fresher-resume-guide",
    title: "How to Write a Resume With No Experience: A Guide for Freshers",
    description: "Build a credible first resume from education, projects, internships, volunteering, practical skills and coursework.",
    date: "October 2026",
    readTime: "8 min read",
    content: [
      {
        heading: "You can show relevant ability without a full-time job",
        paragraphs: [
          "A fresher resume does not need to pretend that you have years of experience. It should make your education, practical work, reliability and willingness to learn visible. Coursework, college projects, internships, volunteering, family-business responsibilities and relevant personal projects may all provide useful evidence when described honestly.",
          "Start by reading the vacancy and identifying its essential requirements. Choose the strongest real examples you have that relate to those requirements."
        ]
      },
      {
        heading: "A useful section order for a fresher",
        paragraphs: ["Put your strongest evidence near the top. The best order depends on the role and on whether your education, projects or work experience is most relevant."],
        bullets: [
          "Name and contact details: use a professional email address and a phone number you check.",
          "Short profile: two or three specific lines about your course or skills and the type of role you are seeking.",
          "Education: course, institution, location if useful, and completion date or expected graduation date.",
          "Projects or internships: describe the goal, your personal contribution, tools used and what you learned or delivered.",
          "Skills: list skills you can discuss or demonstrate in an interview.",
          "Certifications, volunteering or achievements: include only relevant and accurate items."
        ]
      },
      {
        heading: "How to describe a college project",
        paragraphs: ["Explain the problem or goal, what you personally did and the tools or methods used. Avoid presenting a team result as if you completed every part alone."],
        bullets: [
          "Project: Student attendance tracker.",
          "Contribution: Designed the form flow and created a basic attendance report using the tools actually used in the project.",
          "Evidence: Include a portfolio link, demo or repository only if it is available and safe to share."
        ]
      },
      {
        heading: "Write a profile that says something specific",
        paragraphs: [
          "Avoid unsupported phrases such as 'best candidate', 'expert in all areas' or 'hard-working person seeking a challenging job'. State your current status, relevant knowledge and the role you want.",
          "Example: 'Recent B.Com graduate familiar with spreadsheet-based record keeping and basic account reconciliation. Seeking an entry-level accounts assistant role where I can support accurate records and learn established finance processes.' Adapt the example to your actual course and skills; do not copy it if it is not true for you."
        ]
      },
      {
        heading: "Common fresher resume mistakes",
        paragraphs: ["A first resume is usually stronger when it is focused and easy to verify."],
        bullets: [
          "Do not invent internships, grades, certifications, project results or software skills.",
          "Do not include personal details that are not requested or relevant to the job.",
          "Avoid long paragraphs; use concise bullets for projects and responsibilities.",
          "Proofread names, dates and contact details before exporting.",
          "Follow the employer's application instructions instead of assuming every employer wants the same format."
        ]
      }
    ]
  },
  {
    slug: "resume-summary-examples",
    title: "How to Write a Resume Summary: A Simple Formula and Examples",
    description: "Learn when to use a summary, what to include, and how to write a short introduction without generic claims.",
    date: "October 2026",
    readTime: "6 min read",
    content: [
      {
        heading: "What a resume summary should do",
        paragraphs: ["A resume summary is a short introduction near the top of a resume. It should help a reader understand your professional background, strongest relevant skills and the value you can bring to the particular role. It is optional; a fresher may use a short profile, while a candidate with relevant experience may summarise their specialisation and evidence." ]
      },
      {
        heading: "Use this three-part formula",
        paragraphs: ["Write two or three concise sentences using the following prompts. You do not need to force every part into a single long sentence."],
        bullets: [
          "Current identity: your role, qualification or area of experience.",
          "Relevant strengths: two or three skills, tools or types of work that match the vacancy.",
          "Evidence or direction: a real accomplishment, responsibility or the kind of contribution you are prepared to make."
        ]
      },
      {
        heading: "Examples to adapt, not copy blindly",
        paragraphs: [
          "Fresher example: 'Recent diploma graduate with classroom and project experience in basic electrical wiring principles and safety procedures. Seeking a trainee technician role to apply foundational knowledge and develop practical skills under supervision.' Use only the qualification and knowledge you actually have.",
          "Administrative example: 'Administrative assistant with experience maintaining digital records, arranging appointments and responding to routine enquiries. Comfortable with spreadsheet-based tracking and careful document handling.' Adapt the wording to your own work history.",
          "Customer service example: 'Customer support professional experienced in answering product questions, recording issues and following up on pending requests. Focused on clear communication and accurate case notes.' Add a metric only if you have reliable evidence for it."
        ]
      },
      {
        heading: "Phrases to replace with evidence",
        paragraphs: ["Generic claims take up space without showing what you can do. Replace them with a skill, task or example that a reader can understand."],
        bullets: [
          "Instead of 'hard-working individual', describe a responsibility you handled consistently.",
          "Instead of 'excellent communication', mention the audiences you communicated with or the type of information you explained.",
          "Instead of 'results-driven expert', name the process or outcome you contributed to and how you know it was successful."
        ]
      },
      {
        heading: "Review the summary against the job description",
        paragraphs: ["After drafting, compare your summary with the vacancy. Keep the details that are relevant, remove claims you cannot support, and check that the summary agrees with the experience and skills listed elsewhere on the resume. A summary should introduce the evidence, not replace it."]
      }
    ]
  },
  {
    slug: "resume-for-career-change",
    title: "How to Write a Resume for a Career Change",
    description: "Connect transferable skills, relevant projects and past work to a new role without hiding your employment history.",
    date: "October 2026",
    readTime: "7 min read",
    content: [
      {
        heading: "Start with the target role",
        paragraphs: ["A career-change resume works best when it makes the connection between your previous work and the new role clear. Read several relevant job descriptions and identify the repeated responsibilities, tools and skills. Separate requirements you already meet from those you still need to develop." ]
      },
      {
        heading: "Identify transferable skills with examples",
        paragraphs: ["Transferable skills are abilities you used in one setting that can also help in another. Do not simply list words such as communication, teamwork or problem-solving. Attach each skill to a real task or outcome."],
        bullets: [
          "Retail to administration: scheduling, record keeping, handling enquiries and resolving routine problems.",
          "Teaching to training: explaining complex information, preparing learning materials and tracking progress.",
          "Operations to project coordination: following timelines, documenting tasks, coordinating people and escalating risks.",
          "Customer support to quality assurance: categorising issues, documenting repeat problems and checking whether fixes work."
        ]
      },
      {
        heading: "Choose the right resume structure",
        paragraphs: ["A chronological resume is still useful for showing work history. You can place a focused summary and a relevant-skills section near the top, then describe past roles using bullets that emphasise transferable responsibilities. Do not remove dates or disguise your previous job titles to make the transition appear more direct than it was." ]
      },
      {
        heading: "Show evidence that you are preparing for the change",
        paragraphs: ["Relevant coursework, a portfolio, a volunteer assignment or a small project can help demonstrate your interest in the new field. Clearly label training and personal projects so that readers do not mistake them for paid employment."],
        bullets: [
          "Name the course or certification accurately and include the provider if useful.",
          "Describe your personal contribution to a project and link to it if the link is working.",
          "List tools you have actually used and be ready to explain your level of proficiency.",
          "If a job requires a licence or credential, verify the exact requirement before applying."
        ]
      },
      {
        heading: "Write a direct career-change summary",
        paragraphs: ["Briefly state the direction you are moving toward, which existing skills are relevant and what evidence supports the transition. Avoid apologising for your previous career or claiming expertise you have not yet developed. Tailor the summary to each role and make sure the rest of the resume backs it up."]
      }
    ]
  }
];
