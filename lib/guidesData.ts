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
    description:
      "Learn how applicant tracking systems handle resumes, choose readable formatting, and tailor your experience with an actionable checklist.",
    date: "October 2026",
    readTime: "10 min read",
    content: [
      {
        heading: "What an applicant tracking system does",
        paragraphs: [
          "An applicant tracking system (ATS) helps an employer collect applications, organise candidate records and search application information. Depending on the employer and its settings, a system may extract details such as contact information, work history, education and skills. Recruiters may also search the resume text or open the original document.",
          "There is no single ATS test used by every employer. No template, keyword count or online score can guarantee that a resume will pass a screening process or lead to an interview. Your practical goal is to make your relevant qualifications easy to identify for both software and the person reviewing your application."
        ]
      },
      {
        heading: "Use a clear, predictable structure",
        paragraphs: [
          "A simple one-column layout is a sensible choice when you do not know which application system an employer uses. A visually attractive resume can still be easy to read, but decorative elements should never make important information difficult to find.",
          "Use a clear hierarchy: your name and contact details, a short profile when useful, relevant experience or projects, education, skills and any additional relevant sections. Choose the order that puts your strongest evidence near the top."
        ],
        bullets: [
          "Use conventional headings such as Professional Summary, Work Experience, Education, Skills and Projects.",
          "Keep your phone number, email address and location in the main document body rather than relying only on a header, footer or icon.",
          "Use ordinary text for contact details and section headings; do not turn essential information into an image.",
          "Use consistent date formats and list roles in reverse chronological order unless another order better explains your background.",
          "Avoid complex tables, multiple columns, text boxes, charts and decorative skill bars when reliable parsing is important.",
          "Choose a readable font, sufficient contrast and comfortable spacing."
        ]
      },
      {
        heading: "Tailor the resume to the actual vacancy",
        paragraphs: [
          "Read the job description before editing your resume. Identify the qualifications, responsibilities, tools and skills that genuinely match your background. Use the employer's terminology when it accurately describes what you have done, but never add a keyword for a skill you do not possess.",
          "For example, if a vacancy asks for inventory reporting and you have maintained stock records, describe that work clearly. Do not claim experience with a named inventory platform unless you have actually used it."
        ],
        bullets: [
          "Highlight the experience, project or qualification most relevant to the role.",
          "Include the full term and its acronym where helpful, such as Customer Relationship Management (CRM).",
          "Use the job title you actually held; do not change a previous title to imply a different level of responsibility.",
          "Mention relevant tools in the context of work you completed, not as an unexplained list.",
          "Follow the employer's requested file format and file-naming instructions."
        ]
      },
      {
        heading: "Write evidence-based experience bullets",
        paragraphs: [
          "A useful bullet explains an action, the task or context, and the result or purpose. Numbers can help readers understand scale, but include only figures you can verify. If you do not have reliable metrics, a specific description of the work is better than an invented percentage.",
          "Less informative: 'Responsible for customer service.' More specific: 'Answered customer enquiries, recorded complaints and followed up on unresolved orders.' If you have accurate records, you could add the typical number of enquiries handled."
        ],
        bullets: [
          "Start with a precise verb such as prepared, maintained, analysed, coordinated or resolved.",
          "Explain what you worked on and who or what it supported.",
          "Add a result, volume, time period or tool only when it is accurate and relevant.",
          "Use separate bullets for distinct responsibilities instead of placing everything in one long paragraph."
        ]
      },
      {
        heading: "A practical before-and-after example",
        paragraphs: [
          "Before: 'Worked in office and did many tasks.' After: 'Maintained digital customer records, prepared weekly spreadsheet summaries and organised documents for the accounts team.' The revised version identifies the work and the team it supported without inventing an achievement.",
          "Before: 'Good at computers.' After: 'Used Microsoft Excel to update stock records, check entries and prepare routine summaries.' Use this wording only if it reflects your actual experience."
        ]
      },
      {
        heading: "Check the exported file before applying",
        paragraphs: [
          "A resume can look correct in an editor but change after export. Open the final file on a computer or phone and inspect every page. Check that text is readable, contact details are correct, bullets have not moved and page breaks have not separated a heading from the information below it.",
          "PDF is often suitable when an employer asks for a PDF because it helps preserve layout. Some employers or application portals specifically request DOCX or another format. Follow the vacancy instructions rather than assuming one format is always best."
        ],
        bullets: [
          "Select and copy text from the PDF into a plain-text editor to check that the reading order makes sense.",
          "Check spelling, phone number, email address, dates and working links.",
          "Make sure the document is not password-protected unless requested.",
          "Use a clear file name, for example: Ananya_Raman_Accounts_Assistant_Resume.pdf.",
          "Keep a master version and save a tailored copy for each important application."
        ]
      },
      {
        heading: "ATS-friendly resume checklist",
        paragraphs: [
          "Use this checklist before submitting an application. It is a practical review, not a guarantee of how a particular employer's software will process your document."
        ],
        bullets: [
          "My name and contact details are easy to find and are selectable text.",
          "My section headings are clear and conventional.",
          "My work history, education and dates are accurate and consistent.",
          "The skills and keywords included are supported by my real experience.",
          "My most relevant qualifications appear near the top.",
          "The exported file opens correctly and follows the employer's format instructions.",
          "I have checked spelling, links, page breaks and reading order."
        ]
      }
    ]
  },
  {
    slug: "action-verbs-for-resumes",
    title: "40 Action Verbs for Resume Bullet Points, With Examples",
    description:
      "Choose precise verbs for real achievements and responsibilities, with practical examples for administration, service, projects and technical work.",
    date: "October 2026",
    readTime: "8 min read",
    content: [
      {
        heading: "Choose verbs that describe what you actually did",
        paragraphs: [
          "Action verbs can make a resume easier to scan, but the verb should match your level of responsibility. Use 'led' when you directed work, 'supported' when you assisted, and 'created' when you produced something. Strong wording does not require exaggeration.",
          "A practical bullet often follows this pattern: action + task or context + result or purpose. Not every bullet needs a metric. A clear description of the work is useful when the result cannot be measured reliably."
        ]
      },
      {
        heading: "Leadership and coordination",
        paragraphs: [
          "Use these verbs when you genuinely guided people, coordinated work or took responsibility for a process. If you contributed as part of a team, choose a verb that describes your own part."
        ],
        bullets: [
          "Led — Led a three-person team during the daily stock-count process.",
          "Coordinated — Coordinated appointment schedules and shared updates with customers.",
          "Organised — Organised project files so team members could locate current documents.",
          "Delegated — Delegated routine tasks among team members during a busy shift.",
          "Mentored — Mentored new volunteers on the organisation's registration process.",
          "Trained — Trained two new staff members to use the booking procedure.",
          "Scheduled — Scheduled service visits and confirmed timings with clients.",
          "Facilitated — Facilitated weekly discussions to track project actions.",
          "Supervised — Supervised daily shop-floor activities during the manager's absence.",
          "Prioritised — Prioritised urgent customer requests and referred complex cases."
        ]
      },
      {
        heading: "Customer service and communication",
        paragraphs: [
          "These verbs are useful when your work involved customers, clients, colleagues or the public. Choose the ones that describe the communication you actually handled."
        ],
        bullets: [
          "Advised — Advised customers on product features and helped them compare suitable options.",
          "Assisted — Assisted visitors with registration and directed them to the correct department.",
          "Communicated — Communicated delivery updates to customers by phone and email.",
          "Consulted — Consulted with team members to clarify customer requirements.",
          "Resolved — Resolved routine service issues and recorded cases requiring further support.",
          "Responded — Responded to customer enquiries and followed up on pending requests.",
          "Presented — Presented weekly progress updates to the project team.",
          "Negotiated — Negotiated delivery schedules with suppliers to meet agreed deadlines.",
          "Documented — Documented customer feedback and shared recurring issues with the supervisor.",
          "Collaborated — Collaborated with colleagues to complete customer orders accurately."
        ]
      },
      {
        heading: "Analysis and administration",
        paragraphs: [
          "Use these verbs for work involving records, reports, information, accuracy and office processes."
        ],
        bullets: [
          "Analysed — Analysed monthly sales records to identify frequently requested products.",
          "Audited — Audited data entries and corrected discrepancies before report submission.",
          "Calculated — Calculated invoice totals and checked supporting figures.",
          "Compiled — Compiled weekly attendance information into a summary report.",
          "Maintained — Maintained digital files and updated records when details changed.",
          "Monitored — Monitored pending orders and notified the team about delays.",
          "Prepared — Prepared invoices, letters and routine spreadsheet reports.",
          "Processed — Processed purchase requests and checked required supporting documents.",
          "Recorded — Recorded stock movements and updated inventory registers.",
          "Verified — Verified customer details before updating account records."
        ]
      },
      {
        heading: "Technical work and project delivery",
        paragraphs: [
          "These verbs can help describe technical tasks, practical projects and improvements. Add the tool, system or method only if you have used it."
        ],
        bullets: [
          "Built — Built a simple website page using HTML and CSS for a course project.",
          "Configured — Configured user settings on office computers under supervision.",
          "Created — Created a spreadsheet template to organise monthly expense entries.",
          "Designed — Designed a poster layout for a college event.",
          "Developed — Developed a basic inventory tracker as a personal project.",
          "Implemented — Implemented an updated filing procedure agreed by the team.",
          "Improved — Improved the document naming process so files were easier to locate.",
          "Installed — Installed approved software on workstations following instructions.",
          "Tested — Tested website forms and recorded issues before submission.",
          "Updated — Updated product information and checked the changes on the website."
        ]
      },
      {
        heading: "Turn a weak bullet into a specific one",
        paragraphs: [
          "Weak: 'Handled office work.' More specific: 'Prepared invoices, updated customer records and organised documents for monthly account reviews.'",
          "Weak: 'Worked with customers.' More specific: 'Answered product enquiries, checked order details and shared delivery updates with customers.'",
          "The improved examples are useful because they name the actual tasks. Add numbers only when you can confirm them from your records."
        ]
      },
      {
        heading: "Use action verbs accurately",
        paragraphs: [
          "Do not choose a more senior-sounding verb simply because it appears impressive. 'Assisted', 'contributed', 'maintained' and 'supported' are valuable when they accurately describe your role. A truthful, specific bullet is stronger than an inflated claim.",
          "Review each bullet and ask: What did I do? What was the context? What did the work support? Can I explain this example in an interview?"
        ],
        bullets: [
          "Avoid repeating the same opening verb in every bullet.",
          "Use past tense for completed roles and present tense for current responsibilities.",
          "Keep each bullet focused on one main task or contribution.",
          "Remove vague phrases such as 'responsible for' when a direct verb is clearer.",
          "Never add a result, percentage or team size that you cannot verify."
        ]
      }
    ]
  },
  {
    slug: "fresher-resume-guide",
    title: "How to Write a Resume With No Experience: A Guide for Freshers",
    description:
      "Create a clear first resume using education, projects, internships, volunteering and skills—even if you have not held a full-time job.",
    date: "October 2026",
    readTime: "9 min read",
    content: [
      {
        heading: "You can write a useful resume without a full-time job",
        paragraphs: [
          "A fresher resume should show what you have learned, practised and contributed so far. Employers hiring entry-level candidates may consider education, projects, internships, volunteering, part-time work and relevant skills. You do not need to invent employment experience to fill the page.",
          "Start by identifying the kind of role you want. A resume for an accounts assistant vacancy should highlight different coursework and skills from a resume for a junior web developer position."
        ]
      },
      {
        heading: "Choose a simple section order",
        paragraphs: [
          "Put your strongest and most relevant information near the top. A fresher may place education and projects before work experience, especially when those sections provide the clearest evidence of readiness."
        ],
        bullets: [
          "Name and contact details: use a professional email address and a reachable phone number.",
          "Career summary or objective: add two or three specific lines only if they help explain your target role.",
          "Education: include your course, institution, graduation year and relevant results if you want to share them.",
          "Projects or practical work: explain what you did, which tools or subjects you used and what you produced.",
          "Internships, volunteering or part-time work: include genuine responsibilities and contributions.",
          "Skills: list relevant technical, language and workplace skills you can demonstrate.",
          "Certifications and activities: include recent or relevant items rather than every activity you have ever joined."
        ]
      },
      {
        heading: "Describe college projects with useful detail",
        paragraphs: [
          "A project can show how you apply what you learned. Give it a clear title and briefly explain its purpose, your contribution, the tools or methods used and the output. If it was a team project, make your own responsibilities clear.",
          "For a commerce student, a project might involve organising sample financial data. For a computer science student, it might be a small website or application. For an engineering student, it might be a prototype, design exercise or laboratory project."
        ],
        bullets: [
          "Commerce example: Prepared a sample monthly expense report using spreadsheet formulas and organised entries by category.",
          "Computer science example: Developed a basic task-list website using HTML, CSS and JavaScript as an academic project.",
          "Engineering example: Worked with a team to design and test a small prototype, recording observations during each test.",
          "Use these only as patterns. Replace them with projects you actually completed."
        ]
      },
      {
        heading: "Include internships, volunteering and part-time work",
        paragraphs: [
          "Experience does not have to be a permanent full-time job to be relevant. An internship, event role, family-business responsibility, volunteer activity or part-time position may demonstrate reliability, communication, organisation or technical ability.",
          "State the organisation or setting, your role and dates where appropriate. Describe your own contribution rather than making broad claims about the whole organisation."
        ],
        bullets: [
          "Helped register attendees and answer visitor questions at a college event.",
          "Updated product and price records during a part-time shop assignment.",
          "Assisted a community group with preparing and organising event materials.",
          "Completed an internship task involving data entry and document checks."
        ]
      },
      {
        heading: "Write a concise fresher summary",
        paragraphs: [
          "A useful summary identifies your current qualification or area of study, a few relevant skills and the type of opportunity you are seeking. Avoid unsupported claims such as 'expert' or 'highly experienced' when you are applying for your first role.",
          "Example: 'B.Com graduate with academic knowledge of accounting principles and practical experience preparing spreadsheet reports for college assignments. Seeking an entry-level accounts assistant role to apply careful record keeping, basic Excel skills and a willingness to learn.' Adapt the example to your real course and abilities."
        ]
      },
      {
        heading: "Sample fresher resume structure",
        paragraphs: [
          "The outline below is a fictional example to show how sections can fit together. Replace every name, institution, project and skill with your own accurate information."
        ],
        bullets: [
          "ANANYA RAMAN — ananya.raman@email.com | +91 90000 00000 | Chennai, Tamil Nadu",
          "SUMMARY — Recent B.Com graduate seeking an entry-level accounts role, with coursework in financial accounting and experience preparing spreadsheet summaries for academic assignments.",
          "EDUCATION — Bachelor of Commerce, Example College, 2026.",
          "PROJECT — Monthly Expense Analysis: organised sample expense data in Excel, grouped entries by category and prepared a summary for a college assignment.",
          "SKILLS — Basic Microsoft Excel, document organisation, written communication and teamwork.",
          "ACTIVITIES — Volunteer registration support for a college event."
        ]
      },
      {
        heading: "Common fresher resume mistakes",
        paragraphs: [
          "A first resume does not need to look full at any cost. Clear, relevant information is more useful than filler. Keep the document easy to scan and remove details that do not support your target role."
        ],
        bullets: [
          "Do not invent internships, job titles, grades, certificates or project results.",
          "Avoid generic claims such as 'I am hardworking' without an example.",
          "Do not list every school activity if it is unrelated to the job.",
          "Check spelling, dates, contact details and the names of courses or tools.",
          "Avoid unnecessary personal details unless the employer specifically requests them.",
          "Keep the final resume concise and easy to read."
        ]
      },
      {
        heading: "Fresher resume checklist",
        paragraphs: [
          "Before applying, make sure your resume gives a clear picture of your education, practical work and readiness for the role."
        ],
        bullets: [
          "My target role is clear.",
          "My education details and dates are accurate.",
          "My projects explain my own contribution.",
          "My skills are genuine and relevant to the vacancy.",
          "I have included relevant internships, volunteering or part-time work.",
          "My contact details work and my exported file is readable.",
          "I have tailored the resume to the job description."
        ]
      }
    ]
  },
  {
    slug: "resume-summary-examples",
    title: "How to Write a Resume Summary: A Simple Formula and Examples",
    description:
      "Learn when to use a summary, what to include, and how to write a short introduction with examples for different roles.",
    date: "October 2026",
    readTime: "9 min read",
    content: [
      {
        heading: "What a resume summary should do",
        paragraphs: [
          "A resume summary is a short introduction near the top of a resume. It should help a reader understand your professional background, strongest relevant skills and the contribution you can make to the particular role.",
          "A summary is optional. A fresher may use a short profile focused on education and projects, while a candidate with relevant experience may summarise their specialisation and evidence. If the summary repeats generic claims or takes space away from useful experience, leave it out."
        ]
      },
      {
        heading: "Use this three-part formula",
        paragraphs: [
          "Write two or three concise sentences using the following prompts. You do not need to force every part into a single long sentence."
        ],
        bullets: [
          "Current identity: your role, qualification or area of experience.",
          "Relevant strengths: two or three skills, tools or types of work that match the vacancy.",
          "Evidence or direction: a real accomplishment, responsibility or the kind of contribution you are prepared to make."
        ]
      },
      {
        heading: "Examples for freshers and different professions",
        paragraphs: [
          "Fresher: 'Recent diploma graduate with classroom and project experience in basic electrical wiring principles and safety procedures. Seeking a trainee technician role to apply foundational knowledge and develop practical skills under supervision.' Use only the qualification and knowledge you actually have.",
          "Accounts: 'Accounts assistant with experience entering purchase details, organising invoices and checking routine records. Familiar with spreadsheet-based tracking and careful document handling.'",
          "IT support: 'Entry-level IT support candidate with practical coursework in operating systems, basic network troubleshooting and user support. Interested in helping users resolve routine technical issues and documenting solutions.'",
          "Sales: 'Sales executive with experience explaining product features, following up on customer enquiries and maintaining lead records. Focused on clear communication and consistent customer follow-up.'",
          "Customer service: 'Customer support professional experienced in answering product questions, recording issues and following up on pending requests. Focused on clear communication and accurate case notes.'",
          "Experienced manager: 'Operations manager with experience coordinating daily workflows, supporting team schedules and monitoring service processes. Uses operational reports to identify delays and coordinate practical improvements.'",
          "Adapt every example to your own history. Do not claim a qualification, tool, result or level of responsibility you cannot support."
        ]
      },
      {
        heading: "Phrases to replace with evidence",
        paragraphs: [
          "Generic claims take up space without showing what you can do. Replace them with a skill, task or example that a reader can understand."
        ],
        bullets: [
          "Instead of 'hard-working individual', describe a responsibility you handled consistently.",
          "Instead of 'excellent communication', mention the audiences you communicated with or the type of information you explained.",
          "Instead of 'results-driven expert', name the process or outcome you contributed to and how you know it was successful.",
          "Instead of 'proficient in everything', identify the specific tools you have used and your actual level."
        ]
      },
      {
        heading: "Tailor your summary to the job description",
        paragraphs: [
          "After drafting, compare your summary with the vacancy. Keep the details that are relevant, remove claims you cannot support, and check that the summary agrees with the experience and skills listed elsewhere on the resume. A summary should introduce the evidence, not replace it.",
          "You may keep a master summary and adjust it for different applications. For an accounts role, emphasise accurate records and reconciliation if those are genuine strengths. For a customer service role, focus on enquiry handling and communication instead."
        ]
      },
      {
        heading: "A simple editing exercise",
        paragraphs: [
          "Draft a summary using this sentence pattern: ' [Your role or qualification] with experience or knowledge in [two relevant areas]. Seeking to contribute to [type of role or team] through [specific relevant strength].' Remove the brackets and make the wording natural.",
          "Then check each phrase. Can you point to a job, project, course or responsibility that supports it? If not, make the statement more precise or remove it."
        ],
        bullets: [
          "Keep the summary brief—usually two or three sentences.",
          "Use the target role's language only when it accurately describes your skills.",
          "Avoid first-person pronouns if you prefer a concise resume style.",
          "Do not include salary expectations, personal appeals or unrelated career objectives.",
          "Make sure the summary matches the rest of your resume."
        ]
      }
    ]
  },
  {
    slug: "resume-for-career-change",
    title: "How to Write a Resume for a Career Change",
    description:
      "Connect transferable skills, relevant projects and past work to a new role without hiding your employment history.",
    date: "October 2026",
    readTime: "9 min read",
    content: [
      {
        heading: "Start with the target role",
        paragraphs: [
          "A career-change resume works best when it makes the connection between your previous work and the new role clear. Read several relevant job descriptions and identify the repeated responsibilities, tools and skills. Separate requirements you already meet from those you still need to develop.",
          "Choose a realistic target role. A move from retail supervision to office administration may draw on scheduling, record keeping and customer communication. A move into a technical profession may also require new training or demonstrable project work."
        ]
      },
      {
        heading: "Identify transferable skills with examples",
        paragraphs: [
          "Transferable skills are abilities you used in one setting that can also help in another. Do not simply list words such as communication, teamwork or problem-solving. Attach each skill to a real task or outcome."
        ],
        bullets: [
          "Retail to administration: scheduling, record keeping, handling enquiries and resolving routine problems.",
          "Teaching to training: explaining complex information, preparing learning materials and tracking progress.",
          "Operations to project coordination: following timelines, documenting tasks, coordinating people and escalating risks.",
          "Customer support to quality assurance: categorising issues, documenting repeat problems and checking whether fixes work.",
          "Hospitality to customer success: handling requests, explaining services, coordinating with colleagues and responding calmly to complaints."
        ]
      },
      {
        heading: "Build a transferable-skills evidence table",
        paragraphs: [
          "Before writing, make a short table for yourself. In the first column, write a requirement from the new role. In the second, identify a task from your previous work that demonstrates a related ability. In the third, write the evidence you can honestly describe."
        ],
        bullets: [
          "New-role requirement: organise schedules. Previous evidence: prepared staff shift rosters in a retail store.",
          "New-role requirement: maintain accurate records. Previous evidence: updated daily stock and delivery records.",
          "New-role requirement: communicate with clients. Previous evidence: answered customer questions and followed up on service requests.",
          "New-role requirement: coordinate tasks. Previous evidence: checked delivery progress with suppliers and colleagues."
        ]
      },
      {
        heading: "Choose a resume structure that makes the transition clear",
        paragraphs: [
          "A chronological resume is still useful for showing work history. You can place a focused summary and a relevant-skills section near the top, then describe past roles using bullets that emphasise transferable responsibilities.",
          "Do not remove dates or disguise your previous job titles to make the transition appear more direct than it was. Clear and honest work history helps readers understand your experience."
        ],
        bullets: [
          "Start with a targeted summary that explains the direction you are moving toward.",
          "Add a relevant skills section supported by examples elsewhere in the document.",
          "Keep your actual job titles, employers and dates accurate.",
          "Rewrite experience bullets to highlight tasks relevant to the target role.",
          "Include recent training or projects that demonstrate preparation for the new field."
        ]
      },
      {
        heading: "Show evidence that you are preparing for the change",
        paragraphs: [
          "Relevant coursework, a portfolio, a volunteer assignment or a small project can help demonstrate your interest in the new field. Clearly label training and personal projects so that readers do not mistake them for paid employment."
        ],
        bullets: [
          "Name the course or certification accurately and include the provider if useful.",
          "Describe your personal contribution to a project and link to it if the link works.",
          "List tools you have actually used and be ready to explain your level of proficiency.",
          "If a job requires a licence or credential, verify the exact requirement before applying.",
          "Do not imply that a short course is equivalent to professional experience or a required qualification."
        ]
      },
      {
        heading: "Before-and-after career-change bullet example",
        paragraphs: [
          "Previous wording: 'Worked as a shop supervisor and handled daily work.' More relevant wording for an administration application: 'Prepared staff schedules, maintained daily stock records and coordinated supplier updates to support store operations.'",
          "This version makes relevant tasks visible without changing the person's job title or pretending the work was an office-administration position. Use it only if those duties match your real experience."
        ]
      },
      {
        heading: "Write a direct career-change summary",
        paragraphs: [
          "Briefly state the direction you are moving toward, which existing skills are relevant and what evidence supports the transition. Avoid apologising for your previous career or claiming expertise you have not yet developed. Tailor the summary to each role and make sure the rest of the resume backs it up.",
          "Example: 'Retail supervisor transitioning toward office administration, with experience coordinating schedules, maintaining records and responding to customer enquiries. Recently completed practical training in spreadsheet reporting and seeking an administration role where these organisational skills can support daily operations.' Adapt this example to your actual experience and training."
        ]
      },
      {
        heading: "Career-change resume checklist",
        paragraphs: [
          "A strong transition resume helps the reader see both your previous experience and your preparation for the new role. Review these points before applying."
        ],
        bullets: [
          "I have chosen a clear and realistic target role.",
          "My summary explains the transition in direct language.",
          "My transferable skills are supported by specific examples.",
          "My previous job titles, employers and dates are accurate.",
          "My training and personal projects are labelled honestly.",
          "The resume focuses on requirements from the actual vacancy.",
          "I can explain every claim and example in an interview."
        ]
      }
    ]
  }
];