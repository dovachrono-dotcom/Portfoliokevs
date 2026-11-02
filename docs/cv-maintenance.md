# CV and profile updates

`lib/profile.json` is the shared source for About copy, contact details, education, the existing catering role, and the portfolio's technical skills. `lib/cv.json` holds the general-purpose CV's headline, summary, practical skills, additional work experience, and selected project names. This keeps CV wording independent of the website's developer introduction. The capstone skills were checked against the local HerbalAI frontend/backend package manifests, database schema, and RAG implementation. The project descriptions and CV links come from the portfolio's existing verified project information.

Edit shared facts in `lib/profile.json`, CV-only content in `lib/cv.json`, and project descriptions in `scripts/build_cv.py`, then run `python scripts/build_cv.py` with Python, ReportLab, and pypdf. It creates `output/pdf/Kevin_Mercado_CV.pdf` and a readable text copy at `docs/kevin-mercado-cv.md`. The script checks that the CV remains one page. It uses the Arial fonts installed on Windows.

Render and visually review the PDF before copying it to `public/Kevin_Mercado_CV.pdf`. All website CV buttons use that existing public URL. The original download is backed up locally under the ignored `review/cv/` directory.

The supplied classroom profile informed the education, class councilor role, interests, and confirmed phone number. Private demographic details were omitted. The CV includes college education; the About page also lists the earlier schools from the supplied profile. No graduation date or proficiency rating has been inferred.

## General-purpose revision - November 2, 2026

The CV leads with service work, followed by Microsoft Office and a concise web-development skill group. Kevin confirmed Word, PowerPoint, and Excel, ticket sales for carnival rides at Cinias Carnival, and fryer/cashier/all-around work at Fry 8. The reported dates were approximately July 18 to August 18, 2026 for Cinias Carnival and February 4 to June 18, 2024 for Fry 8. The CV uses month/year ranges to reflect that uncertainty. No cash totals, sales figures, job locations, or proficiency levels were added. The existing Head Waiter role is retained from the supplied profile.

HerbalAI and Porma Studio remain as two short examples of web-development work. The full project list and technical background stay on the portfolio. The CV's portfolio link points to the current live site, `https://portfoliokevs.vercel.app/`.
