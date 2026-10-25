# Local preview

Repository: ITelecnaha. Branch: codex/portfolio-redesign.

Run Start Portfolio.cmd, or npm run dev -- --webpack --hostname 127.0.0.1 --port 4317 from this folder. Open http://127.0.0.1:4317/ . The webpack flag avoids a stale Turbopack development stylesheet cache encountered during this iteration. Production builds use npm run build.

Live portfolio: https://diportfolionikevin.vercel.app/ . All work stays local; no push or deployment was performed.

The homepage shows HerbalAI, Porma Studio, and Digicam as three selectable cards. The mobile hero pairs the portrait with Kevin's name, project cards size to their content, and About uses a compact portrait/header arrangement. The Projects page has four layered desktop tabs, a shared-surface spring transition, static browser-style screenshots, and a mobile accordion. The preview has no inner scrollbar and uses a full-width 16:9 frame, without a viewport-height cap that would compress it on laptops. Normal document scrolling continues to the footer. Folder switching and external project links remain. FCFS remains a school project. The two portraits supplied by Kevin switch with the icon-only theme control. About, Contact, Blog, dynamic blog example routes, and the 404 page remain available.

Email actions open a mail client, with a visible address and copy feedback. The contact form opens an explicitly labeled email draft; the user sends it in their own email app. Download CV now serves a generated, selectable-text one-page PDF. About includes Kevin's supplied education, class councilor role, interests, and verified HerbalAI technology groups. The shared phone number is +63 981 251 3789. Optional user-triggered audio remains.

About now uses a compact introduction, an explicitly sized theme portrait, project-backed skills before grouped education/work, and keyboard-accessible certificate dialogs. Blog includes five local first-person stories with readable article pages, category/date archives, and related links. The newest stories cover defense day and capstone nights with friends; Kevin's supplied defense photo appears in the first. Editing notes are in docs/blog-content.md.

Every route shares the fixed grid and pointer-pixel background, including the transparent KEVIN footer. Light mode uses graphite pixels; dark mode uses blue. The background follows the existing root theme, pauses in hidden tabs, and cannot capture clicks or add scroll width. The latest blog and folder-preview changes do not alter it.

The About/blog verification includes build, TypeScript, lint and HTTP/content checks. ESLint has one retained image-optimization warning in app/not-found.tsx, with no errors. Current browser access is disabled in Work settings, so new visual and live keyboard checks could not be performed. Earlier homepage screenshots and other local review evidence remain in the ignored review folder.

Next step: Kevin's manual design critique. No new case-study routes or publication without a later request.
