# Shared grid and pixel background

Kevin requested the existing home hero background across the whole portfolio, with visible graphite/black pixels in light mode and the existing blue treatment in dark mode. This extends that implementation; the rejected 21st.dev Boxes effect is not used.

## Integration

- `components/common/SiteBackground.tsx`: one decorative, fixed viewport layer mounted in `app/layout.tsx` for every route. The former hero component was moved here, and its local Home instance was removed.
- `components/common/SiteBackground.module.css`: the existing 28px grid, orbs, sweep, noise and pixel styling, adapted to a full viewport without a bottom cutoff. Root theme tokens remain the source of truth.
- `components/common/site-background-motion.ts`: the existing animation controller, adapted to viewport dimensions and a passive document pointer listener. It observes the main content's visibility so it keeps working below the hero, then pauses if main content leaves view or the document is hidden.

The old ambient spotlight is no longer mounted. There is one background/controller across routes, rather than one per section. Following Kevin's footer update, this layer mounts inside the isolated site shell so it continues behind both main content and the transparent KEVIN footer. The controller observes that shell and accepts pointer movement throughout it. The header, form and project surfaces keep their existing materials. Page content, spacing, theme state, portrait transition and contact form behavior are unchanged. No dependencies or images were added.

## Appearance and interaction

Light mode uses the existing graphite foreground for pixels, darker neutral grid lines, and a neutral cursor spotlight. Dark mode keeps blue pixels and lighting. Both color sets blend through the existing theme system. A uniform base-color guard softens ambient lighting behind reading content; the grid and a separate hover-pixel layer remain visible above that guard. Hover cells are inset by one pixel so they do not darken the grid lines again.

The fixed layer covers the viewport on short and long pages without creating a content-width rectangle. Pointer coordinates stay relative to that viewport as the page scrolls. Moving over page content draws fading pixel cells; the background itself has `pointer-events: none` and never captures clicks, selections, scrolling, or keyboard focus. Moving outside main content or into a portal hides the cursor spotlight. Scrolling clears the active cursor position.

Existing timings remain: 11/14-second orb motion, seven-second sweep, 900ms pointer trails, three runners, and 16 desktop / seven phone pop cells. Trails are bounded at 90 nodes. Phones have one orb, fewer pixels, and no hover cursor. Timers, dynamic nodes, animations, observers, frames and listeners clean up on unmount. Animations still start automatically, with no on/off switch.

## Verification

- Production build and TypeScript passed. ESLint reported zero errors and the existing raw-image warning in `app/not-found.tsx`.
- Generated HTML contains exactly one shared background and cursor layer on Home, About, Projects, Contact, Blog, all three blog articles, and the 404 page. Nested blog category/filter routes inherit the same root layout. No local hero background, old ambient layer, or animation toggle remains mounted.
- A controller test exercised a 12,000px-tall main area with a viewport-sized background: pointer-cell alignment below the hero, bounded trails, scroll reset, hidden/offscreen pause, resuming, mobile behavior, and full cleanup passed.
- Conservative color calculations for muted text, assuming maximum ambient overlap, remain at least 4.74:1 over light grid lines and 4.58:1 over light cursor pixels; dark equivalents are 6.37:1 and 5.38:1. These are calculated bounds, not browser screenshot measurements.
- The portrait implementation still matches the saved earlier transition, apart from its existing hover-glow attributes.
- Live desktop/mobile visual inspection was unavailable because local browser access was disabled in Work settings. No new screenshots or interactive browser verification are claimed.

Changes remain local for Kevin's manual review.
