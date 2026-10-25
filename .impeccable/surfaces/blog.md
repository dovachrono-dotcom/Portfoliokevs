# Blog

Mode: Read. Targets: app/blog/ and components/features/blog/.

Extend the established portfolio rather than creating a separate visual identity. Kevin requested simple first-person stories about making HerbalAI, capstone struggles, and working-student life, with no decorative symbols or elaborate English. Three local drafts live in lib/blog.ts. Everyday scenes/reflections are creative writing requested by Kevin; do not treat them as independently verified biographical evidence.

The index uses flat article rows, familiar category links, short summaries, and clear Read story actions. Articles use a 760px maximum outer width and a 68ch prose measure, 16px body text with 1.8 leading, and restrained headings. Phones keep the same reading order. Use existing surface, foreground, muted, border, primary and focus tokens in both themes. No extra animation, dependencies, or invented project metrics.

All posts share data, reading-time calculation, UTC-formatted publication dates, metadata, and static params. Unknown post slugs return the existing 404. Category and date archive routes remain available; no matches show an empty state with a route back to all stories. Related stories and Back to all stories support navigation. Authoring/editing information is in docs/blog-content.md. Keep changes local until Kevin requests publication.
