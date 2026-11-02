# CV and profile updates

`lib/profile.json` is the shared source for About copy, contact details, education, the existing catering role, and the portfolio's technical skills. `lib/cv.json` holds the general-purpose resume's objective, qualifications summary, practical skills, and additional work experience. This keeps resume wording independent of the website's developer introduction. The web skills come from Kevin's existing verified project work.

Edit shared facts in `lib/profile.json` and resume-only content in `lib/cv.json`, then run `python scripts/build_cv.py` with Python, ReportLab, and pypdf. It creates `output/pdf/Kevin_Mercado_CV.pdf` and a readable text copy at `docs/kevin-mercado-cv.md`. The script checks that the resume remains one page and omits the unwanted title, student introduction, social links, and hyperlinks. It uses the Arial fonts installed on Windows.

Render and visually review the PDF before copying it to `public/Kevin_Mercado_CV.pdf`. All website CV buttons use that existing public URL. The original download is backed up locally under the ignored `review/cv/` directory.

If a PDF viewer locks the default export on Windows, use `python scripts/build_cv.py --output output/pdf/Kevin_Mercado_CV_Updated.pdf` to save a fresh copy without closing the viewer. Review that copy, then copy it to the same public download path.

The supplied classroom profile informed the education, existing catering role, and confirmed phone number. Private demographic details were omitted. The resume includes Kevin's college, secondary, and primary schools. Secondary graduation is shown as 2020-2021 and primary graduation as 2016-2017, matching the school years supplied in the original document. No exact graduation day, month, or proficiency rating has been inferred.

## General-purpose revision - November 2, 2026

The CV leads with service work, followed by Microsoft Office and a concise web-development skill group. Kevin confirmed Word, PowerPoint, and Excel, ticket sales for carnival rides at Cinias Carnival, and fryer/cashier/all-around work at Fry 8. The reported dates were approximately July 18 to August 18, 2026 for Cinias Carnival and February 4 to June 18, 2024 for Fry 8. The CV uses month/year ranges to reflect that uncertainty. No cash totals, sales figures, job locations, or proficiency levels were added. The existing Head Waiter role is retained from the supplied profile.

## Resume layout

The resume uses a US Letter page, bold uppercase name, stacked contact information, plain body text, bold section headings, and bullet descriptions based on a supplied reference. Kevin requested a borderless page with normal reading margins. No enclosing box or page border is drawn. The reference's personal information, jobs, and claims are not copied.

Kevin explicitly excluded the centered title, social links, the Profile label, and the fourth-year BSIT introduction. The resume starts with his name and uses Objective, Summary of Qualifications, Work Experience, Educational Background, Technical Skills, and Certifications sections. Project descriptions and social links remain on the website rather than the printed resume. Service skills remain demonstrated in the work descriptions and qualifications summary; the Technical Skills section contains Microsoft Office and web development.
