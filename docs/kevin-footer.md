# KEVIN doodle footer

Integrated Kevin's supplied `doodle-crew-footer.tsx` React/SVG component from the attached prompt. The project already has the requested TypeScript, Tailwind and shadcn `components/ui` structure. This component needs no external animation package, fetched image, stock asset, or new theme provider.

## Content and appearance

- `components/ui/doodle-crew-footer.tsx` retains the provided drawings, rough ink lettering, letter entrance, crew reactions, gaze, blinks, doodles and back-to-top behavior.
- `components/common/Footer.tsx` supplies **KEVIN**, five characters placed across its five letters, the portfolio's existing copy, real navigation and social links, CV download, mailto action, copyright and optional sound control. Demo store, game, legal and placeholder links are not shown.
- The wordmark uses the existing self-hosted Sora face; supporting text uses Inter. Canvas text measurement resolves the existing font variable and remeasures after fonts load.
- Existing foreground, background and primary tokens drive both themes. The footer surface is transparent while the characters' paper fills remain opaque and readable.
- Footer links remain visible before JavaScript/scroll animation begins. Keyboard focus also bypasses delayed entry for actions. Crew buttons support Enter/Space and speech feedback.

## Grid visibility

`SiteBackground` now mounts once inside the isolated site shell, before the header, main content and footer. Its interaction/visibility boundary is that shell, so the grid and mouse pixels continue behind the footer. The header keeps its existing opaque surface. The footer has no full-width solid fill or independent background instance. It stays in normal document flow, with an anchor at `#site-footer`.

## Motion and performance

The footer uses the site's automatic animation policy. Its entrance plays when it scrolls into view. Its animation frame loop stops when offscreen or the document is hidden; CSS loops pause too. The source's deterministic layout, bounded gaze, seeded doodle drift, resize handling and cleanup are retained. Five crew members and eight doodles keep the scene suited to the shorter wordmark. The portrait transition is unchanged.

## Verification

- TypeScript passed; the added component passed lint after removing two unused suppressions from the supplied code.
- Pure-function checks passed for deterministic placement, five-letter spacing, crew seats, gaze limits, storyboard order and doodle wrap/pop behavior.
- Production build passed for every existing route. Generated HTML checks confirmed one transparent `#site-footer`, the five KEVIN letter glyphs and crew buttons, real CV/email/social actions, preserved sound control and one shared grid at shell level on Home, About, Projects, Contact, Blog, all blog articles and the 404 output. The portrait source still matches its earlier transition.
- Live visual inspection was unavailable because local browser access was disabled in Work settings. No desktop/mobile screenshot, live hover check, or pixel-level visual confirmation is claimed.

The footer remains local for Kevin's manual design review.

The performance pass moved the same styling into `components/ui/doodle-crew-footer.css` so it can be cached separately. The visible declarations and drawing geometry are preserved. Bounds are read before eye-transform writes, and the offscreen pause selector uses a quoted attribute value for valid CSS. See `docs/performance.md` for measurements.

## Compact single-footer layout

Kevin's screenshots showed that the stacked navigation band, large artwork and repeated action buttons looked like two footers. The component now uses its compact variant: KEVIN artwork and navigation sit beside each other on desktop, with one utility/copyright row below. Phones stack these parts with 24px gaps. The repeated small brand header and blurb are omitted because the wordmark already identifies the footer. Duplicate CV/contact buttons are removed; CV download and email remain as text links. There is no forced 640px minimum height. The transparent surface, shared grid, crew interactions, sound control and back-to-top behavior are retained.
