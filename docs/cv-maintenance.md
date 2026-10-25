# CV and profile updates

`lib/profile.json` is the shared source for About copy, contact details, education, and skills. The capstone skills were checked against the local HerbalAI frontend/backend package manifests, database schema, and RAG implementation. The project descriptions and CV links come from the portfolio's existing verified project information.

Edit `lib/profile.json` and the selected-project entries in `scripts/build_cv.py`, then run the script with Python, ReportLab, and pypdf. It creates `output/pdf/Kevin_Mercado_CV.pdf` and a readable text copy at `docs/kevin-mercado-cv.md`. The script checks that the CV remains one page. It uses the Arial fonts installed on Windows.

Render and visually review the PDF before copying it to `public/Kevin_Mercado_CV.pdf`. All website CV buttons use that existing public URL. The original download is backed up locally under the ignored `review/cv/` directory.

The supplied classroom profile informed the education, class councilor role, interests, and confirmed phone number. Private demographic details were omitted. The CV includes college education; the About page also lists the earlier schools from the supplied profile. No graduation date or proficiency rating has been inferred.
