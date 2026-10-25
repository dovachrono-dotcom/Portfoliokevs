# Blog content

The five local posts are stored as structured sections and paragraphs in `lib/blog.ts`:

- `/blog/capstone-defense-day`: Defense day: we could finally breathe
- `/blog/capstone-nights-with-friends`: Coffee, complaints, and capstone nights
- `/blog/building-herbalai`: How HerbalAI became my capstone project
- `/blog/herbalai-struggles`: The parts of HerbalAI that tested my patience
- `/blog/life-as-a-working-student`: Life as a working student is not always neat

Kevin explicitly requested made-up first-person blogs in simple language. The technology, school/work context, and interests use supplied project/profile information; everyday scenes and reflections are creative draft material. They are not research evidence or a source for future resume claims. The drafts include no invented awards, commercial results, or medical advice.

Edit titles, excerpts, paragraphs, category and publication date in that one file. Reading time is calculated from the body. The authored date is October 25, 2026, using Kevin's Asia/Manila date. Nothing has been pushed or deployed.

The two newest stories use Kevin's account of defense day and overnight work with friends: coffee, complaints, laughter, and relief afterward. They do not claim a grade, award, exact defense date, or shared authorship of HerbalAI. October 25 is the publication date, not an asserted defense date. The supplied defense-day photograph is unchanged at `public/blog/capstone-defense-day.png`. Its optional `photo` metadata also displays it uncropped inside the article, with its original dimensions reserved. The overnight story uses a real frame extracted from Kevin's supplied video, replacing the temporary HerbalAI screenshot.

## Coffee-story video

`/blog/capstone-nights-with-friends` has optional `video` metadata in `lib/blog.ts`. The native HTML player appears after the article header, with controls, inline mobile playback, an accessible label and a visible descriptive caption. It does not autoplay or loop, and `preload="none"` avoids loading the clip before playback. Its original 720 × 1280 portrait proportions are reserved, and the player is centered at up to 360px wide rather than stretching across the article. The fallback link opens the MP4 in unsupported browsers. Other stories do not render a player.

The video is copied unchanged to `public/blog/capstone-nights-with-friends.mp4` (about 27 seconds, 6.3 MB, H.264/AAC). `public/blog/capstone-nights-cover.webp` is a 720 × 1280 frame extracted at 00:06 with FFmpeg; it is both the blog cover and player poster. The source in Downloads is untouched. Audio is preserved; no transcript or subtitles have been invented. The descriptive caption describes the clip and is not a speech transcript. No dependency or external media host was added.

Verification: production build (including TypeScript) and targeted lint passed. FFmpeg decoded the complete video/audio without errors; SHA-256 confirmed the public MP4 matches the original. The local server returned `206 Partial Content` with `video/mp4` for a byte-range request, supporting seeking. Article and index returned HTTP 200: the article contains one player with controls, poster and no autoplay/loop, while the index uses the extracted cover without a player. The extracted frame was visually inspected. Live browser playback and responsive layout checks remain unavailable because browser access is disabled.

The index, category archives, date archives, related-story links, page metadata and static post routes share the same data. Unmatched archives offer all stories; unknown article slugs use the portfolio's 404 page.

## Image-led archive

Kevin chose real project/workplace photos for the reference-inspired archive. Each post now has `cover` metadata in `lib/blog.ts`: local `src`, descriptive `alt`, optional focal `position`, and optional crop `scale`.

- The first HerbalAI story uses the existing verified project homepage screenshot.
- The second uses a closer, right-focused crop of that same screenshot, showing the assistant panel. It is not presented as a separate photograph or a fabricated debugging screen.
- The working-student story uses the existing catering-team photo at `public/virt.jpg`.
- The coffee story uses `public/blog/capstone-nights-cover.webp`, a frame from Kevin's own video; its cover focal point can be adjusted in `lib/blog.ts`.

The archive centers its existing heading and intro above the category filters. Three or more stories form one large feature on the left and two stacked cards on the right, with further stories continuing below. Two filtered results use equal columns; one fills a single feature; zero keeps the existing empty state. At 850px and below, cards stack in their original DOM order. Titles wrap without line clamping, and each card has one link with a visible keyboard focus ring. The original three stories are unchanged; the two new entries appear first. Existing article reading layouts, the grid background and the KEVIN footer are preserved.

Card text uses a lower dark scrim for readability over both the screenshot and bright workplace photo. The images themselves remain the supplied originals; CSS handles crops. No generated art, stock images, new dependencies, popularity claims or rating counts were added.

Verification covered TypeScript, lint, 0/1/2/3-result server rendering, valid image paths, unique card links and metadata. The initial and final Impeccable layout scans reported zero findings. A 72% dark scrim over a white image yields calculated title contrast above 4.5:1, with metadata also above 4.5:1. Live layout/hover inspection was unavailable because local browser access was disabled in Work settings; visual crop verification remains for Kevin's manual review.

After adding the defense and overnight stories, production build, TypeScript and lint passed (one existing raw-image warning on the 404 page). Data checks confirmed five unique stories, all image paths, three capstone/two student-life entries, and unchanged content for the original three stories. The defense photo's SHA-256 matches the supplied original. Production markup includes all five article links, the uncropped article photo/caption, and one shared footer. Both new local article URLs returned HTTP 200. Browser visual checks remain unavailable.
