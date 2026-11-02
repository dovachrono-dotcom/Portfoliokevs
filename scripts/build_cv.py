"""Build Kevin's general-purpose CV from his profile and CV-specific content.

Requires ReportLab and pypdf. Run from any directory with Python.
The public download is updated only after reviewing the generated PDF.
"""

import json
from html import escape
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
PROFILE = json.loads((ROOT / "lib/profile.json").read_text(encoding="utf-8"))
CV = json.loads((ROOT / "lib/cv.json").read_text(encoding="utf-8"))
OUTPUT = ROOT / "output/pdf/Kevin_Mercado_CV.pdf"
EDITABLE = ROOT / "docs/kevin-mercado-cv.md"
PROJECTS = [
    {
        "name": "HerbalAI",
        "category": "Capstone thesis project",
        "url": "https://www.herbalai.site/",
        "host": "herbalai.site",
        "description": "An educational Philippine medicinal-plant library with a source-grounded AI assistant and community features.",
        "stack": "Next.js, Express, PostgreSQL, Prisma, Gemini API, pgvector",
    },
    {
        "name": "Porma Studio",
        "category": "Side project",
        "url": "https://porma-studio.vercel.app/",
        "host": "porma-studio.vercel.app",
        "description": "A browser-based ID photo editor for fitting formal attire and creating print-ready sheets, with processing kept on the user's device.",
        "stack": "React, TypeScript, Vite, PWA",
    },
    {
        "name": "Digicam",
        "category": "Side project",
        "url": "https://digicam-pocket.vercel.app/",
        "host": "digicam-pocket.vercel.app",
        "description": "A film-inspired camera and photo editor with local projects, available as an Android beta and web edition.",
        "stack": "Flutter, Kotlin, CameraX",
    },
    {
        "name": "FCFS Scheduler",
        "category": "School project",
        "url": "https://fcfs-nine.vercel.app/",
        "host": "fcfs-nine.vercel.app",
        "description": "A First-Come-First-Serve scheduling visualizer with real-time Gantt charts.",
        "stack": "Next.js, React, Tailwind CSS",
    },
]
LINKS = [
    ("Portfolio", "https://portfoliokevs.vercel.app/"),
    ("GitHub / ultrakevin143", "https://github.com/ultrakevin143"),
    ("LinkedIn", "https://www.linkedin.com/in/mercado-kevin-5957713b2/"),
]


def plain(text):
    return text.replace("\u2019", "'").replace("\u2013", "-").replace("\u2014", "-")


def safe(text):
    return escape(plain(text))


def link(label, url):
    return f'<link href="{escape(url, quote=True)}"><u>{safe(label)}</u></link>'


def build():
    font_dir = Path("C:/Windows/Fonts")
    pdfmetrics.registerFont(TTFont("CVArial", str(font_dir / "arial.ttf")))
    pdfmetrics.registerFont(TTFont("CVArialBold", str(font_dir / "arialbd.ttf")))
    pdfmetrics.registerFontFamily("CVArial", normal="CVArial", bold="CVArialBold")
    body = ParagraphStyle(
        "Body", fontName="CVArial", fontSize=10.2, leading=14.2,
        textColor=colors.HexColor("#202329"), alignment=TA_LEFT,
        spaceAfter=0,
    )
    styles = {
        "body": body,
        "name": ParagraphStyle("Name", parent=body, fontName="CVArialBold", fontSize=25, leading=29, textColor=colors.black),
        "role": ParagraphStyle("Role", parent=body, fontSize=10.5, leading=17),
        "meta": ParagraphStyle("Meta", parent=body, fontSize=9, leading=13.5),
        "section": ParagraphStyle("Section", parent=body, fontName="CVArialBold", fontSize=10.5, leading=14, textColor=colors.black, spaceBefore=12, spaceAfter=4),
        "project": ParagraphStyle("Project", parent=body, fontName="CVArialBold", fontSize=10, leading=14),
        "small": ParagraphStyle("Small", parent=body, fontSize=9, leading=12.5),
    }
    story = []
    markdown = [f'# {PROFILE["name"]}', "", CV["headline"], "",
                f'{PROFILE["location"]} | {PROFILE["phone"]["display"]} | {PROFILE["email"]}', "",
                " | ".join(f"[{label}]({url})" for label, url in LINKS), ""]

    def p(text, style="body"):
        return Paragraph(text, styles[style])

    def section(title, first):
        content = first if isinstance(first, list) else [first]
        story.append(KeepTogether([p(title, "section"), *content]))
        markdown.extend([f"## {title}", ""])

    story.extend([
        p(safe(PROFILE["name"]), "name"),
        p(safe(CV["headline"]), "role"),
        Spacer(1, 5),
        p(f'{safe(PROFILE["location"])} &nbsp; | &nbsp; {link(PROFILE["phone"]["display"], PROFILE["phone"]["href"])} &nbsp; | &nbsp; {link(PROFILE["email"], "mailto:" + PROFILE["email"])}', "meta"),
        p(" &nbsp; | &nbsp; ".join(link(label, url) for label, url in LINKS), "meta"),
        Spacer(1, 10),
        HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#9b9fa6")),
    ])

    section("Profile", p(safe(CV["summary"])))
    markdown.extend([plain(CV["summary"]), ""])

    # Keep the existing, ongoing catering role first, then completed roles.
    experience = [PROFILE["experience"], *CV["additionalExperience"]]
    for index, work in enumerate(experience):
        block = [
            p(f'<b>{safe(work["role"])}</b> | {safe(work["company"])}', "project"),
            p(safe(work["period"]), "small"),
            p(safe(work["description"])),
        ]
        if index == 0:
            section("Work experience", block)
        else:
            story.extend([Spacer(1, 8), KeepTogether(block)])
        markdown.extend([
            f'### {work["role"]} | {work["company"]}', "",
            work["period"], "", work["description"], "",
        ])

    skill_lines = [
        f'<b>{safe(group["title"])}:</b> {safe(", ".join(group["skills"]))}'
        for group in CV["skillGroups"]
    ]
    section("Skills", p("<br/>".join(skill_lines)))
    markdown.extend([f'- **{group["title"]}:** {", ".join(group["skills"])}' for group in CV["skillGroups"]])
    markdown.append("")

    college = PROFILE["education"][0]
    leadership = PROFILE["leadership"]
    education = f'<b>{safe(college["qualification"])}</b><br/>{safe(college["school"])} | {safe(college["period"])} | {safe(college["detail"])}<br/>{safe(leadership["role"])} - {safe(leadership["organization"])}'
    section("Education & leadership", p(education))
    markdown.extend([f'**{college["qualification"]}**', "",
                     f'{college["school"]} | {college["period"]} | {college["detail"]}', "",
                     f'{leadership["role"]} - {leadership["organization"]}', ""])

    certificates = [f'{safe(cert["title"])} | {safe(cert["issuer"])} | {safe(cert["date"])}' for cert in PROFILE["certifications"]]
    section("Certifications", p("<br/>".join(certificates)))
    markdown.extend([f'- {cert["title"]} | {cert["issuer"]} | {cert["date"]}' for cert in PROFILE["certifications"]])
    markdown.append("")

    for index, name in enumerate(CV["selectedProjects"]):
        project = next(project for project in PROJECTS if project["name"] == name)
        block = [
            p(f'{safe(project["name"])} <font name="CVArial">| {safe(project["category"])} | {link(project["host"], project["url"])}</font>', "project"),
            p(safe(project["description"])),
        ]
        if index == 0:
            section("Selected web projects", block)
        else:
            story.extend([Spacer(1, 7), KeepTogether(block)])
        markdown.extend([f'### {project["name"]} | {project["category"]}', "",
                         f'[{project["host"]}]({project["url"]})', "", project["description"], ""])

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=A4, rightMargin=42, leftMargin=42,
        topMargin=36, bottomMargin=34, title=f'{PROFILE["name"]} - CV',
        author=PROFILE["name"], subject="General-purpose CV - customer service, office tools, and web development",
        allowSplitting=1,
    )
    doc.build(story)
    pages = len(PdfReader(str(OUTPUT)).pages)
    if pages != 1:
        raise RuntimeError(f"Expected a one-page CV; generated {pages} pages. Review the layout.")
    EDITABLE.parent.mkdir(parents=True, exist_ok=True)
    EDITABLE.write_text(plain("\n".join(markdown)).rstrip() + "\n", encoding="utf-8")
    print(f"Created one-page PDF: {OUTPUT}")
    print(f"Saved editable content: {EDITABLE}")


if __name__ == "__main__":
    build()
