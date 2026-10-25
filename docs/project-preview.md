# Static folder previews

Kevin confirmed that the non-scrollable project feature means the folders on `/projects`, not the Home fan or Blog archive.

The browser-style screenshot is now static. Its former `overflow-y-auto`, `overscroll-auto`, focusable screenshot region, and custom `.archive-preview` scrollbar rules were removed. The screenshot uses `object-fit: contain` inside a full-width 16:9 frame, so it remains a complete image without an inner scrollbar. A previous viewport-height clamp squeezed laptop previews to 140px tall; that clamp has been removed. The image now determines the frame height from its width on desktop and mobile, with its space reserved before loading. The old `min-h-[520px]` panel floor, large archive margins and duplicate desktop title row were also removed. The page keeps compact surrounding spacing and grows naturally around the preview; normal document scrolling leads to the existing footer without clipping controls or locking page scrolling.

The four Radix folder tabs, Motion transitions, mobile accordion, descriptions, technology tags and external project links remain. Background, theme, Home cards and footer implementations are unchanged.

When selecting another desktop folder, the project name now shares a per-project Motion `layoutId` between the inactive vertical tab and the open panel title. It follows the same spring as the folder surface: the incoming name travels into the panel, and the outgoing name travels back to its tab. Names use position-only layout projection so glyphs are not stretched by the panel expansion. The title sits outside the screenshot/detail entrance animation, so it can move immediately with the folder rather than waiting for content to fade. Details switch to the latest project immediately and then enter; there is no outgoing wait that could leave an old project's link active during a rapid selection. Initial server-rendered content remains visible. The mobile accordion keeps its existing labels and entrance.

Implementation files:
- `app/projects/page.tsx`
- `components/features/projects/ProjectsList.tsx`
- `components/features/projects/Projects.module.css`
- `components/common/RouteFrame.tsx`
- `app/secondary-pages.css`

Verification: production build and TypeScript passed; lint has no errors and one existing 404 image warning. Production markup retains the static preview, folder controls, live-project actions and one footer. The local Projects URL returned HTTP 200. Source checks confirm the old inner-scroll rules and fixed panel minimum are absent. Live wheel, keyboard and viewport inspection could not run because local browser access is disabled in Work settings.
