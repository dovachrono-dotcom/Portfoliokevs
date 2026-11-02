"""Build Kevin's one-page resume with his approved formatting.

Requires ReportLab and pypdf. Run from any directory with Python.
Review the rendered PDF before updating the public website download.
"""

import argparse
import json
from html import escape
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
PROFILE = json.loads((ROOT / "lib/profile.json").read_text(encoding="utf-8"))
CV = json.loads((ROOT / "lib/cv.json").read_text(encoding="utf-8"))
OUTPUT = ROOT / "output/pdf/Kevin_Mercado_CV.pdf"
EDITABLE = ROOT / "docs/kevin-mercado-cv.md"


def plain(text):
    return text.replace("\u2019", "'").replace("\u2013", "-").replace("\u2014", "-")


def safe(text):
    return escape(plain(text))


def build(output=OUTPUT):
    font_dir = Path("C:/Windows/Fonts")
    pdfmetrics.registerFont(TTFont("CVArial", str(font_dir / "arial.ttf")))
    pdfmetrics.registerFont(TTFont("CVArialBold", str(font_dir / "arialbd.ttf")))
    pdfmetrics.registerFontFamily("CVArial", normal="CVArial", bold="CVArialBold")
    body = ParagraphStyle(
        "Body", fontName="CVArial", fontSize=10.5, leading=14,
        textColor=colors.black, spaceAfter=0,
    )
    styles = {
        "body": body,
        "name": ParagraphStyle("Name", parent=body, fontName="CVArialBold", fontSize=16, leading=22),
        "intro_label": ParagraphStyle("IntroLabel", parent=body, fontName="CVArialBold", spaceBefore=14, spaceAfter=3),
        "section": ParagraphStyle("Section", parent=body, fontName="CVArialBold", fontSize=11.5, leading=16, spaceBefore=13, spaceAfter=7),
        "job": ParagraphStyle("Job", parent=body, fontName="CVArialBold", leading=15),
        "bullet": ParagraphStyle("Bullet", parent=body, leftIndent=19, bulletIndent=4, bulletFontName="CVArial", bulletFontSize=10.5),
    }
    story = []
    markdown = [
        f'# {PROFILE["name"].upper()}', "",
        PROFILE["location"], "",
        f'Mobile no.: {PROFILE["phone"]["display"]}', "",
        f'Email: {PROFILE["email"]}', "",
    ]

    def p(text, style="body", bullet=False):
        return Paragraph(text, styles[style], bulletText="\u2022" if bullet else None)

    def section(title, first, style="section"):
        content = first if isinstance(first, list) else [first]
        story.append(KeepTogether([p(title, style), *content]))
        markdown.extend([f"## {title}", ""])

    story.extend([
        p(safe(PROFILE["name"].upper()), "name"),
        Spacer(1, 2),
        p(safe(PROFILE["location"])),
        p(f'Mobile no.: {safe(PROFILE["phone"]["display"])}'),
        p(f'Email: {safe(PROFILE["email"])}'),
        Spacer(1, 9),
    ])

    section("Objective:", p(safe(CV["objective"])), "intro_label")
    markdown.extend([plain(CV["objective"]), ""])
    section("Summary of Qualifications:", p(safe(CV["summary"])), "intro_label")
    markdown.extend([plain(CV["summary"]), ""])

    experience = [PROFILE["experience"], *CV["additionalExperience"]]
    for index, work in enumerate(experience):
        block = [
            p(f'{safe(work["role"])}, {safe(work["company"])}', "job"),
            p(safe(work["period"])),
            Spacer(1, 2),
            p(safe(work["description"]), "bullet", bullet=True),
        ]
        if index == 0:
            section("WORK EXPERIENCE:", block)
        else:
            story.extend([Spacer(1, 9), KeepTogether(block)])
        markdown.extend([
            f'### {work["role"]}, {work["company"]}', "",
            work["period"], "", f'- {work["description"]}', "",
        ])

    college = PROFILE["education"][0]
    college_text = (
        f'<b>College:</b> {safe(college["school"])}<br/>'
        f'{safe(college["qualification"])}<br/>{safe(college["period"])}'
    )
    section("EDUCATIONAL BACKGROUND:", p(college_text, "bullet", bullet=True))
    markdown.extend([
        f'- **College:** {college["school"]}',
        f'  {college["qualification"]}', f'  {college["period"]}', "",
    ])
    for label, school in zip(["Secondary", "Primary"], PROFILE["education"][1:]):
        graduation = school["period"].removeprefix("Graduated ")
        school_text = f'<b>{label}:</b> {safe(school["school"])}<br/>Graduated: {safe(graduation)}'
        story.extend([Spacer(1, 4), p(school_text, "bullet", bullet=True)])
        markdown.extend([f'- **{label}:** {school["school"]}', f'  Graduated: {graduation}', ""])

    for index, group in enumerate(CV["skillGroups"]):
        line = p(f'<b>{safe(group["title"])}:</b> {safe(", ".join(group["skills"]))}')
        if index == 0:
            section("TECHNICAL SKILLS:", line)
        else:
            story.extend([Spacer(1, 2), line])
        markdown.extend([f'- **{group["title"]}:** {", ".join(group["skills"])}', ""])

    for index, cert in enumerate(PROFILE["certifications"]):
        line = p(f'{safe(cert["title"])} | {safe(cert["issuer"])} | {safe(cert["date"])}')
        if index == 0:
            section("CERTIFICATIONS:", line)
        else:
            story.append(line)
        markdown.extend([f'- {cert["title"]} | {cert["issuer"]} | {cert["date"]}', ""])

    output.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(output), pagesize=letter, rightMargin=72, leftMargin=72,
        topMargin=48, bottomMargin=48, title=f'{PROFILE["name"]} - Resume',
        author=PROFILE["name"], subject="Customer service, food service, office tools, and web development",
        allowSplitting=1,
    )
    doc.build(story)
    reader = PdfReader(str(output))
    if len(reader.pages) != 1:
        raise RuntimeError(f"Expected a one-page resume; generated {len(reader.pages)} pages. Review the layout.")
    text = reader.pages[0].extract_text()
    for unwanted in ["CURRICULUM VITAE", "Fourth-year", "GitHub", "LinkedIn", "Profile"]:
        if unwanted.casefold() in text.casefold():
            raise RuntimeError(f"Unexpected text in resume: {unwanted}")
    if reader.pages[0].get("/Annots"):
        raise RuntimeError("The supplied format should not contain hyperlinks.")
    EDITABLE.parent.mkdir(parents=True, exist_ok=True)
    EDITABLE.write_text(plain("\n".join(markdown)).rstrip() + "\n", encoding="utf-8")
    print(f"Created one-page PDF: {output}")
    print(f"Saved editable content: {EDITABLE}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build Kevin's one-page resume.")
    parser.add_argument("--output", type=Path, default=OUTPUT, help="PDF export path; use a new filename if an existing PDF is open.")
    build(parser.parse_args().output.resolve())
