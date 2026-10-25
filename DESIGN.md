---
name: Kevin Mercado Portfolio
description: A personal project studio with responsive card and folder interactions.
colors:
  paper: "hsl(220 14% 97%)"
  graphite: "hsl(225 16% 12%)"
  blue: "hsl(223 73% 45%)"
  muted: "hsl(220 9% 40%)"
  border: "hsl(220 10% 82%)"
  surface: "hsl(0 0% 100%)"
  project-stage: "hsl(220 17% 92%)"
  dark-paper: "hsl(225 12% 7%)"
  dark-ink: "hsl(220 14% 94%)"
  dark-blue: "hsl(220 100% 76%)"
  dark-surface: "hsl(225 11% 11%)"
  archive-dark-surface: "#14161b"
  archive-dark-tab: "#1a1d23"
  archive-dark-accent: "#7aa2ff"
  archive-dark-border: "rgba(255,255,255,0.06)"
typography:
  display:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(3.5rem, 6.8vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    lineHeight: 1.8
rounded:
  control: "8px"
  image: "14px"
  stage: "16px"
spacing:
  mobile-gutter: "20px"
  tablet-gutter: "32px"
  desktop-gutter: "56px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    height: "50px"
    padding: "0 23px"
---

# Kevin Mercado — Implemented Design System

## Overview
**Creative North Star: "Independent builder's studio"**

Real project interfaces carry the visual evidence, with a personal portrait giving the work a human anchor. This revision records Kevin's requested three-card fan, folder archive, and separate light/dark portraits. It remains a local preview for his manual design critique.

## Colors
Neutral paper and graphite in light mode; charcoal and pale text in dark mode. Blue is the single interaction accent. Surfaces, stages, foregrounds, inputs, and navigation states use semantic HSL tokens in `app/globals.css`. Tailwind dark variants follow the same root class as custom CSS. The icon-only sun/moon control switches modes directly and preserves the selection.

## Typography
Sora is the display voice; Inter supports paragraphs and controls. Both are self-hosted through Next.js font optimization. Display tracking stops at -0.04em. Metadata is subordinate to project names and descriptions.

## Layout
A 1200px maximum content width. Desktop gutters are 56px, tablet 32px, phone 20px. Main sections use the section spacing token on desktop and 64px on phones. The homepage presents three equal 460 × 510px cards in a fan. Below 700px, the three cards share a content-sized grid row; their screenshots peek behind the active card. Controls use a separate two-row grid without negative margins. The mobile hero pairs a compact name and portrait, then a full-width introduction and two equal actions. Supporting About content uses the same compact portrait-and-heading arrangement. The Projects page shows a 75% desktop preview and four layered vertical tabs; below 701px it becomes a vertical accordion with one expanded folder. Every existing page and dynamic blog route remains. Mobile navigation takes over below 900px.

## Elevation & Depth
The project fan uses rotation, overlap, scale, and stacking order for depth. The archive follows Kevin's supplied prompt: folder notches, fine borders, soft offset shadows, a faint inner top highlight, and a 3% grain overlay. Its single-component implementation declares local color roles for both themes. The header uses an opaque background for predictable contrast.

## Shapes
Controls have 8px corners, project cards 16px, and portraits 14px. Desktop navigation uses a pill group. Folder geometry uses rounded tabs and offset edges. Circles are reserved for small copy, audio, and directional controls.

## Components
Project links open the verified public product in a new tab. Native buttons and Radix primitives provide keyboard project selection, folder tabs, capability accordions, and mobile navigation. The mobile dialog supports focus containment, Escape, and focus return. Homepage contact exposes a visible email, mailto action, and clipboard feedback. The retained contact form opens an explicitly labeled email draft without implying delivery. Audio remains optional, user-triggered, and never preloaded. The CV uses the original repository PDF.

Motion uses `motion/react` for the visible hero sequence, project fan, folder reveal, and capability image crossfade. CSS handles small hovers and the two-photo theme transition: opacity blends for 1.5 seconds while the photo gently moves over 1.8 seconds. Theme colors transition over 0.8 seconds only during a user-triggered switch; the temporary transition marker clears after 1.9 seconds. Initial page rendering has no theme animation. Reduced motion removes the animated transitions. No continuous portrait loop or animated GIF is needed: changing theme triggers the photo transition.

Kevin's existing hero grid and pixel background now runs as one shared, fixed viewport layer across Home and all subpages, including lower sections and blog details. It retains the 28px grid, 11/14-second orbs, seven-second sweep, bounded pixel activity and fading cursor trail. Light mode uses graphite pixels and neutral grid lines for visibility; dark mode retains blue. A base-color overlay protects text contrast while a separate cursor layer keeps hover cells visible. The previous ambient layer and the local hero background are no longer mounted. Existing root theme tokens drive all colors. Motion pauses when main content is offscreen or the document is hidden; phones use one orb, fewer pixels and no cursor spotlight. Implementation and verification notes are in `docs/site-background.md`.

The project fan has a once-only scroll entrance on a separate wrapper; the settled card geometry is unchanged. Desktop preview images have a 1.2 crop for bounded parallax, while mobile/reduced motion keep the original crop. Static headings and prose across pages use once-only word reveals as they enter the viewport. Already-visible text, forms, status messages, navigation and project-card content stay steady. Accent hover glows also apply to keyboard focus, preserving focus rings. Touch devices do not receive hover effects. Reduced motion removes entrances, parallax and button lift, and shortens glow transitions to 150ms. No animation dependencies or portrait-sequence changes were added.

Kevin subsequently requested automatic animation without an on/off control. The footer motion switch and saved preference have been removed. Full motion is declared on the root from the initial HTML, and React/CSS controllers use the same automatic playback policy. Old saved motion choices are discarded. Fresh page headings use a readable word entrance; restored visits remain steady. Decorative loops still pause offscreen and in hidden tabs. Theme and sound controls remain separate.

The portrait retains its earlier transition behavior independently of page autoplay: a theme-triggered one-second slide/reveal, or its original 300ms opacity crossfade when the device requests reduced motion. Global animation changes must not force the portrait onto a different transition path.

The shared footer uses Kevin's supplied Doodle Crew component with the wordmark **KEVIN**, five interactive drawn characters, real portfolio links, CV/email text links, existing optional sound and back-to-top. Artwork and navigation share a compact desktop row above one copyright/utility row; phones stack the same content with 24px gaps. The repeated small brand header, duplicate action buttons and forced minimum height are removed. It uses Sora/Inter and the existing theme tokens. Its surface is transparent: the one shared grid/pixel background mounts at site-shell level so it stays visible behind the footer as well as main content. Links and content remain visible before the entrance animation begins. Footer loops stop offscreen and in hidden documents. Details are in `docs/kevin-footer.md`.

## Do's and Don'ts

The Blog archive follows Kevin's supplied image-led reference: centered heading, existing category filters, one large featured card plus two stacked cards on desktop, with more stories continuing below. Narrow screens preserve the same story order in one column. Single/two-result filters use appropriate layouts without empty slots. Covers use the real HerbalAI screenshot, existing catering-team photo and Kevin's supplied defense-day photo; titles sit above a contrast scrim, and the entire card is one accessible link. The original three stories remain unchanged; two newer stories cover defense day and capstone nights with friends. The defense article includes the uncropped group photo. Cover-editing notes are in `docs/blog-content.md`.

The Projects archive uses a static, full-width 16:9 screenshot preview without an inner scrollbar. The screenshot leads the folder; its height follows the available width rather than a viewport-height cap. Compact surrounding spacing keeps the controls together while the document grows naturally toward the shared footer. Folder selection, transition motion, the mobile accordion and live-project links are preserved.

- Do retain all existing page content and routes; Kevin intends to populate these pages further.
- Do use real project screenshots and retain sample-image labels and source attribution.
- Do keep content visible before animation and honor reduced motion.
- Do stop after the local handoff for Kevin's manual critique.
- Don't fabricate testimonials, client names, metrics, or native-iOS release claims.
- Don't publish, push, or deploy this local implementation without a later request.
