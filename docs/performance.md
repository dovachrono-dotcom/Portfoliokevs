# Performance cleanup

Completed October 25, 2026. The approved layout, copy, palette, pictures, portrait transition, folder interaction, grid background and footer drawings were preserved.

## Changes

- Scoped Motion's provider to Home, About and Projects, which use that library. Blog and Contact keep their existing browser-based animations without loading unused Motion features.
- Moved the footer's repeated inline CSS into `components/ui/doodle-crew-footer.css`, which Next.js serves as a cacheable stylesheet. Its declarations are unchanged. The offscreen pause selector's numeric attribute value was quoted to make it valid stylesheet syntax.
- Batched scroll-reveal measurements before style writes, and read footer bounds before updating eye transforms. Animation timings and visible effects remain the same.
- Removed five unused source/style files and nine unused public assets, including old project pictures, starter SVGs and an unused audio track. Recoverable copies are in the ignored `review/debloat-backup/` folder on this PC.
- Removed unused `class-variance-authority` and `tw-animate-css` dependencies. Kept the shadcn CLI as a development dependency rather than a production dependency.
- Excluded local review/export artifacts from TypeScript, lint and Vercel uploads. Original pointer photos stay in `source` locally and in Git; website assets remain in `public`.
- Added `npm run typecheck` and `npm run preview`. `Start Portfolio.cmd` builds before starting the production preview, avoiding development compilation delays on the first visit to each page. Live editing still uses `npm run dev`.

## Measured sizes

These are gzip sizes of the JavaScript files referenced by each production HTML page, not Lighthouse scores, real-user timings or a measurement of every later prefetch request.

| Page | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Home | 290.6 KiB | 284.4 KiB | 2.2% |
| About | 279.5 KiB | 273.1 KiB | 2.3% |
| Projects | 283.1 KiB | 277.0 KiB | 2.2% |
| Contact | 270.7 KiB | 218.3 KiB | 19.4% |
| Blog and coffee article | 265.9 KiB | 213.5 KiB | 19.7% |

Public assets went from 22,984,751 to 15,383,395 bytes, removing 7,601,356 bytes (about 7.6 MB) of unused files. Used photos, screenshots, CV, music and video were not recompressed or replaced. Compressed page HTML shrank by about 3.8 KiB per route. Stylesheet transfer grew by about 1.1 KiB because footer styles now live in a cacheable resource instead of being repeated in HTML and JavaScript.

## Verification

- Production build, TypeScript and lint passed. Lint retains one pre-existing raw-image warning on the 404 page.
- Six before/after production pages retained the same visible text, links, images/video, form controls, SVG geometry, one footer and one grid background.
- Eight production routes returned HTTP 200. Project previews, CV availability and MP4 byte-range delivery passed.
- Initial browser checks confirmed the desktop Home and Projects layouts, theme switch, Digicam folder selection, transparent footer and visible grid. The mobile Home layout and navigation opened correctly without horizontal overflow.
- Production-preview server responses for About, Projects, Contact and Blog measured 35–48 ms locally in one run; Home's first response was 372 ms. These are local HTTP response measurements, not full browser navigation or internet performance guarantees.

Before/after reports, route checks, saved HTML and screenshots are under the ignored `review/` folder. No design changes were introduced as part of this cleanup.
