# About

Mode: Experience with a readable personal introduction. Target: app/about/page.tsx and components/features/about/.

Kevin chose a compact portrait/bio split with grouped resume sections and certificate accessibility fixes after an independent critique. Preserve the site's neutral surfaces, blue accent, Sora/Inter typography, all supplied personal facts, CV, portrait assets, and one-shot theme animation.

The root has its own 1040px cap rather than the shared `.container` class. Page spacing is 56px between major groups, reduced to 40px below 600px. About-specific wrapper padding is 40px/64px above/below on desktop and 24px/48px on phones. Biography measure is capped at 68ch.

Reading order: identity and biography, HerbalAI-backed skills, education and work experience, certifications, existing Projects/Contact links. Class councilor information belongs with college education. Older schooling remains visible with less emphasis. At 800px and above, three skill groups form flat columns and education/experience share two columns. Below that, both groups stack.

The existing ThemePortrait fills an explicitly sized wrapper: 112px on phones, 176px from 600px, and 240px from 800px. The name leads the DOM; the phone portrait sits beside it. Never pass conflicting width utilities into the portrait. Images and animation remain owned by the existing shared component.

Certificates use named native preview buttons and separate named external links. The existing Radix Dialog supplies title/description association, modal focus containment, Escape, outside dismissal, scroll locking, and trigger focus return. The preview has loading/error feedback and an original-image link. Interactive targets are at least 44px tall. Use semantic color/focus tokens in both themes.
