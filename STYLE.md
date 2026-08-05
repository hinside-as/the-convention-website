# Design system

Visual and interaction rules for The Convention site. Read this before touching layout, color, spacing, or adding a new interactive element — it exists so the same decisions don't have to get re-derived (or accidentally reversed) in a later session.

## Colors

Tokens live in `src/styles/global.css` under `@theme` and are used as Tailwind utilities (`bg-purple-950`, `text-cyan-100`, `text-magenta`, etc).

| Token | Hex |
|---|---|
| `cyan-100` | `#D6FFFF` |
| `cyan-200` | `#A8FFFF` |
| `cyan-400` | `#00FFFF` |
| `magenta` | `#FF00FF` |
| `purple-600` | `#940094` |
| `purple-900` | `#290029` |
| `purple-950` | `#140014` |

### WCAG contrast rules (verified, do not deviate)

- **Body/heading text:** any `cyan-*` on `purple-900` or `purple-950` — 14.8–18.9:1. This is the default site look (dark background, light cyan text).
- **Magenta text:** only ever on `purple-900` or `purple-950` — 5.95–6.44:1 (passes AA). Reserve for large display type, buttons, borders, glows/accents — not body copy.
- **Never** put `magenta` text on `purple-600` — 2.49:1, fails.
- **Never** put `magenta` text on any `cyan-*` background — 2.5–2.93:1, fails.
- `purple-600` as a background works with `cyan-*` text — 6.23–7.30:1. Use it as a secondary panel background, cyan text only.
- If a light (`cyan-*`) background panel is ever introduced, pair it with `purple-900`/`purple-950` text — 14.8–18.9:1.
- Sponsor logos: the `dark` SVG variant (`#290029` fill) is for light backgrounds; the `light` variant (`#D6FFFF` fill) is for dark backgrounds. `SponsorLogo.astro`'s `background` prop picks the correct one automatically — always pass it rather than importing a logo variant directly.

## Fonts

Self-hosted via `@fontsource` (not Google's CDN) so there's no external request and no FOUC/privacy concern:

- **Titles:** Nunito Black, weight 900 — `font-title` (headings default to this via the global `h1–h4` rule).
- **Body:** Nunito Sans (variable, regular + bold) — `font-body`.
- **Countdown timer & crew names:** Tiny5 (pixel font) — `font-pixel`.

**All three are `<link rel="preload">`ed in `BaseLayout.astro`'s `<head>`, using their `latin` subset specifically** (imported with Vite's `?url` suffix, e.g. `@fontsource/nunito/files/nunito-latin-900-normal.woff2?url`, so the preloaded URL is guaranteed to be byte-identical to whatever hashed asset the compiled CSS's `@font-face` ends up requesting — verified after every build by grepping the hash out of both the HTML and the CSS). `@fontsource`'s generated CSS ships `font-display: swap`, which is normally fine, but self-hosting doesn't make the font free to fetch — without preloading, the browser doesn't discover the font is needed until it's parsed the stylesheet and started layout, so on a cold cache the fallback system font paints first and visibly swaps to Nunito/Tiny5 moments later, reflowing text (worst on the bold/black nav, since Nunito Black's glyph widths differ a lot from generic sans fallbacks). This was reported as a "jittery/janky" flash. Preloading fetches the font in parallel with HTML parsing instead of waiting for CSSOM, so it's normally fully downloaded before first paint even on a throttled connection (measured: ~350-460ms font download vs. ~600ms first paint on a throttled 4G profile) — confirmed via Playwright + CDP network emulation, checking `performance.getEntriesByType('resource')` timing against the `first-paint` entry. **The `latin` subset (`U+0000-00FF`) is the one that matters** — it covers æøå, unlike `latin-ext` — so that's the only subset worth preloading; don't preload every language subset fontsource ships, that would just add unnecessary blocking requests. If a new self-hosted font is ever added, apply the same preload pattern rather than letting it fall back to swap-only.

## Spacing

- Major page sections use `py-32` (or a proportionally smaller value for the first/last section on a page, which already has the nav's `pt-16` or a heading block above it). Don't drop below `py-24` for a full-width section — it reads as cramped. (Bumped up from an original `py-16`/`py-24` baseline, then `py-24`→`py-32` across the board, per client requests for progressively more breathing room — if asked again, keep scaling every section together rather than cherry-picking one page, so vertical rhythm stays consistent site-wide.)
- Within a section, group tightly-related elements close together (`mt-1`–`mt-2` between a value and its immediate label, e.g. `DateVenueBlock`'s venue name → city) and put clear air (`mt-8`+) between distinct conceptual groups (e.g. the "when" cluster vs. the "where" cluster in the same block). This is the law of proximity — visual distance should mirror conceptual distance.
- Card/grid gaps: `gap-6`–`gap-8` between cards, `gap-4` max within a card's own stacked content.
- When adding a new section, copy the spacing from the most similar existing one (`FeatureSection`, `SponsorGrid`, etc.) rather than inventing a new scale.

## Images

**Every image must render at its own native aspect ratio — never stretch/distort by forcing mismatched `h-*` and `w-*` together.** Cropping is allowed, but only via `object-cover` inside a fixed-aspect container (never by squashing), and only where uniform area matters more than showing the full frame:

- **Illustrations** (`src/assets/illustrations/`) have wildly different native aspect ratios (checked: from 2:1 to 1:2) and are never cropped. They're pixel-grid SVGs rendered via `Illustration.astro`, sized by an integer `scale` prop rather than a Tailwind `h-*`/`w-*` class — see "Illustrations are pixel-grid SVGs, not PNGs" below for why arbitrary CSS dimensions aren't safe to use on them.
- **Competition photos** (`src/assets/competitions/`, currently all a consistent 960×779) *are* cropped to a uniform card size, since the Konkurranser grid needs even rows regardless of what a future upload's exact dimensions are: wrap in `<div class="aspect-[4/3] w-full overflow-hidden">` and render the `<Image>` with `class="h-full w-full object-cover"`. `object-cover` never distorts the source — it scales uniformly and crops overflow, so "native aspect within the crop" always holds.
- **The hero** uses the same crop pattern at `aspect-[21/9]` for a wide banner treatment, `object-cover`, no distortion.
- **Sponsor logos** are never cropped — `h-10 w-auto max-w-[140px] object-contain` in `SponsorLogo.astro` — copy that pattern for any new logo-like asset.
- Before adding a new image usage, check its real dimensions (`sips -g pixelWidth -g pixelHeight <file>`) rather than assuming it's square, and decide illustration-style (no crop) vs. photo-grid-style (uniform crop) based on which of the above it's replacing.

## Interaction patterns

### Navigation

- The header (`Nav.astro`) is `fixed`, not `sticky` — page content gets `pt-16` on `<main>` in `BaseLayout.astro` to compensate. If the nav's height (`h-16`) ever changes, update that padding and `AnchorNav`'s `top-16` together.
- It hides on scroll-down and reappears on scroll-up, past an 80px threshold, via a small vanilla-JS scroll listener in `Nav.astro` (`requestAnimationFrame`-throttled, no dependency). Easing is `cubic-bezier(0.22,1,0.36,1)` over 500ms — deliberately slower/softer than a default `ease-out`, for an "elegant" feel rather than a snap.
- No border/separator line under the header or above the footer, by design — the glass blur (`backdrop-blur-lg`) plus a soft drop shadow does the separation instead of a hard rule.
- **The header and the mobile full-screen menu share the same background opacity**: `bg-[rgba(20,0,20,0.92)]` on both. An earlier version had the header much more see-through (`/0.4`, for a "dynamic" look) but that made a full-screen panel at the same low opacity read as barely-there over the busy hero image, so the mobile menu was bumped to `0.92` — the client then asked for that same darker, more legible look on the header too, so both now match. Don't split them apart again without checking; keep them the same value.
- **The "Kjøp billett" CTA sits first in the mobile full-screen menu, last in the desktop inline nav** — one `<Button>`, not two: `class="order-first lg:order-none"` on it flips its flex order only below `lg`. The primary nav links themselves carry no `order-*` class (default `order: 0`), so `order-none` on desktop just falls back to normal DOM order (last), matching where it already sat. If another item ever needs a different position per breakpoint, use this same `order-*` + breakpoint-reset pattern rather than duplicating the element.
- **Both `Nav.astro` and `Footer.astro` mark the current page's link `text-magenta` (plus `aria-current="page"`)**, computed via a local `isActive(href)` helper comparing `Astro.url.pathname` (trailing slash stripped) against each link's `href`. External links (`Shop`, `Kjøp billett`, both pointing at `shop.convention.no`) are always excluded — the helper short-circuits on any `href` starting with `http` — since they're never "the current page" on this site. Both components compute this independently (no shared nav-state component exists), so if a new nav surface is ever added, replicate the same `isActive` helper rather than trying to factor it out prematurely for two call sites.
- Nav items get generous gaps (`gap-10` on desktop) — don't let them crowd.
- **Mobile menu**: the dropdown panel (`peer-checked:flex` block in `Nav.astro`) expands to fill the full remaining viewport height using `h-[calc(100dvh-4rem)]` (not `100vh` — `dvh` tracks the real visible viewport as mobile browser chrome shows/hides; `100vh` alone leaves a gap on iOS Safari) — this is deliberate so the panel always reaches the bottom of the screen regardless of content length.
- Both translucent nav backgrounds use literal `bg-[rgba(20,0,20,…)]` rather than Tailwind's `bg-purple-950/NN` opacity-slash utility. Tailwind v4 compiles `/NN` opacity into an `oklab()`/`color-mix()` value; this app has no confirmed cross-browser rendering problem with that syntax specifically, but using plain `rgba()` here removes one variable while debugging translucency-over-images issues, and is safer to keep given `backdrop-filter` + exotic color functions is a known fragile combo in some browser versions. If you need a new translucent-over-image surface, follow this same `rgba()` pattern rather than the opacity-slash utility.

### Logo

- Header and footer logo render at the same responsive size (`h-5 w-auto sm:h-7`) — if you resize one, resize the other to match.
- The logo SVG's native aspect is ~10:1 (wide wordmark) — this is why it needs `w-auto` rather than a fixed width, or it silently overflows on narrow viewports (this exact bug shipped once — see git history — don't reintroduce it by setting both `h-*` and a fixed `w-*`).
- Both logo instances get a subtle hover effect: `transition-transform duration-300 hover:scale-105`.

### Text link hover

Plain text links (nav, footer, `AnchorNav`, and any inline link like the Discord/Lichess links in `FactList`) currently use a simple `transition-colors hover:text-magenta`. A previous version of this used a pixel/glitch RGB-split hover effect — it was removed at the client's request pending a better visual reference, so **don't reintroduce a glitch/jitter text effect** until a new one is explicitly requested and specced. Keep new plain-text links consistent with the current simple color-swap hover until then.

### Buttons

- `Button.astro` has two variants: `primary` (magenta fill, dark text, swaps to cyan fill on hover) and `outline` (cyan border/text, fills cyan on hover). Both are explicit `cursor-pointer` regardless of the browser default, for clarity.
- External links (`external` prop) auto-add `target="_blank"`, `rel="noopener noreferrer"`, and a trailing `↗`.

### Cursor

Every clickable element should read as clickable at a glance: `cursor-pointer` is set explicitly on `Button`, `SponsorLogo`, the email form's submit button, and all plain-text links (nav, footer, `AnchorNav`, `FactList`) — don't rely on browser defaults alone when adding new interactive elements, especially anything that isn't a native `<a>`/`<button>`.

### Auto-linking known URL patterns

`FactList.astro` detects bare domain-like strings (e.g. `discord.gg/hPf8kPM`, `lichess.org/tournament/x`) in competition facts and renders them as real `https://` links automatically, rather than requiring every data entry to be hand-wrapped in markup. If a new competition's `pameldng` value is a URL, it just needs to be a plain bare-domain string in `competitions.ts` — no extra markup needed.

## Known content placeholders (confirmed with client, not bugs)

- `sponsor-nettstudio.svg` exists in `src/assets/sponsors/` but is intentionally excluded from `src/data/sponsors.ts` (not a current sponsor).
- Competition `premier` (prize) fields were cleared across the board on 2026-08-03 pending confirmed 2026 amounts — don't re-add specific kr amounts without a source.
- Three competition photos (CS2 Wingman, Fortnite Duo Build, Smash Bros. Ultimate) are third-party publisher promotional art (Valve/Epic/Nintendo) used with the client's explicit sign-off on handling licensing themselves — see the `imageCredit` field on each `Competition` entry in `competitions.ts`, rendered as a small caption via `CompetitionCard`. Follow the same pattern (`imageCredit`) for any future third-party competition image.
- Friday's "Åpningsshow?" program entry keeps its source's trailing `?` deliberately — it's marked tentative in Jan's notes, not yet confirmed. Don't remove the `?` without confirming the show is locked in.
- **`program.ts` and `competitions.ts` are two separate hand-maintained files with no shared source of truth.** The 5 game-track entries in the Program master schedule (Conventions Beste Gamer, Fortnite – Duo Build, Smash Bros. Ultimate, Minecraft Creative, Counter Strike 2: Wingman) correspond 1:1 to entries in `competitions.ts`'s `tidspunkt` field — when either changes, check the other. The one conflict found on 2026-08-03 (Minecraft Creative: master schedule said 13:00–14:00, `competitions.ts` said 13:00–16:00) was resolved in favor of Jan Elling's per-game notes (13:00–16:00, 3 timer) — both files now agree.
- Program events carry a `crew` field, typed as the `CrewName` union in `program.ts`: `Core`, `Cosplay`, `Design`, `Game`, `Laser tag`, `Media`, `Scene`, `Security`, `Shop`, `Support`, `Technical` — plus the one non-crew special case `"Hele arrangementet"` for whole-event milestones (doors open/close). This is which crew runs the activity, **not a physical location**. Write "Laser tag" exactly like that (capital L, lowercase t) everywhere on the site — as a crew tag, in event titles, in competition titles — never "Laser Tag" or "LASER TAG". The `ProgramDay.astro` crew badge renders in `font-pixel` (Tiny5) and is right-aligned on each row (time+title on the left, crew badge pushed to the end via `sm:order-3`/`flex-1` on the title) since it reads as a small crew label, not primary content.
- Friday's "Åpningsshow?" was tagged `Cosplay / scene` in the raw schedule (not a valid single crew) — simplified to `Scene` alone as a judgment call; confirm with Jan if Cosplay should co-own it.
- **`/stotte` page has two unconfirmed content gaps**, written around rather than filled with invented numbers: the "Drevet av frivillighet" section doesn't state a volunteer count or hour total (the brief asked for these but none were given), and "Dette trenger vi nå" has no real needs list yet — it just says the list is updated continuously. Fill both in once the client provides real figures/items; don't estimate.

## Anchor-linkable sections

`FeatureSection.astro`, `SponsorGrid.astro`, and `GrasrotSection.astro` all accept an optional `id` prop and set `scroll-mt-32` themselves — pass an `id` to make any section a jump target (used heavily on `/stotte`, and by the homepage Hero's "Jeg vil støtte The Convention" button, which links to `/stotte#slik-kan-du-stotte`). When adding a new anchor target, use one of these components rather than hand-rolling a wrapper div with its own `scroll-mt`.

## Scroll-triggered fade-in (`.reveal`)

Add the `reveal` class to any section-level element (or repeated card, like `CompetitionCard`/`ProgramDay`) to have it fade + rise into place the first time it scrolls into view. The CSS lives in `global.css`; a single `IntersectionObserver` in `BaseLayout.astro` watches every `.reveal` element on the page, adds `.is-visible` once (then stops observing it), and respects `prefers-reduced-motion`. Nothing else to wire up — just add the class. Don't add `.reveal` to something that's never meant to be hidden initially (e.g. the fixed nav) — it starts at `opacity: 0`.

## Same-page smooth scroll

`BaseLayout.astro` has a single delegated click listener that intercepts any `<a href="#…">` pointing at an element on the *same page* (comparing normalized pathnames) and animates the scroll with a custom `easeOutCubic` curve instead of relying on native `scroll-behavior: smooth` (which can't be curve-matched to the rest of the site's easing). It reads the target's own `scroll-margin-top` to land in the right place, so it automatically respects whatever `scroll-mt-*` a section already declares — no per-link configuration needed. This covers `AnchorNav` links and any other in-page hash link automatically.

## Logo rendering (currentColor SVG)

The logo is inlined as raw SVG (`import logoRaw from ".../logo.svg?raw"`, then `.replaceAll('fill="white"', 'fill="currentColor"')`) rather than rendered via `astro:assets`'s `<Image>`, specifically so its hover color can be controlled the same way as a text link (`text-cyan-100 hover:text-magenta`) instead of a scale/opacity trick. Because the raw SVG carries hardcoded `width`/`height` attributes, sizing is forced via CSS on the child element (`[&>svg]:h-[30px] [&>svg]:w-auto`) on both `Nav.astro` and `Footer.astro` — keep these two in sync if the logo size ever changes.

**Logo aspect ratio constrains how big it can go.** The logo's native ratio is ~10:1 (wide wordmark) — at any given height, its rendered width is ~10x that, so a "bigger logo" request always needs a width budget check, not just a size bump. Current size is a flat `h-[30px]` (no responsive variation) in both `Nav.astro` and `Footer.astro`, per the client's explicit "30px tall" spec — this happened to fit safely everywhere it's used, but that's not guaranteed for every future size request. Two structural changes were needed along the way to make a bigger logo fit without breaking layout, and remain in place:

- **Nav**: the inline-desktop-nav breakpoint is `lg` (1024px), not `md` (768px) — at 768px there isn't enough room for 6 links + CTA + *any* reasonably-sized logo, independent of logo size (this was a latent bug uncovered while sizing the logo). Link gap is `lg:gap-6`. The nav CTA uses `Button`'s `size="xs"` (`px-3 py-1.5 text-xs`) specifically because this row has no width to spare.
- **Footer**: grid is 5 columns at `lg` (not 4), with the logo spanning 2 of those 5 (`lg:col-span-2`) — a single narrow column (~150-250px) can't fit this logo at a visibly-bigger-than-original size no matter where the breakpoint sits, since width scales with height at a fixed ratio.

Before changing the logo size again: recompute the width at the new height (`height × 10.2`) against the actual available space at the narrowest width it needs to fit (mobile viewport for the hamburger-row case, the `lg` breakpoint width for the inline-nav case, the footer's column width for the footer case) — don't just bump the number and eyeball one screenshot at 1440px, the tight spots are at the breakpoint edges.

## Mobile menu icon

The hamburger/close icon in `Nav.astro` is three `<span>` bars (not text glyphs) that morph into an X via `peer-checked:[&>.bar-1]:...` arbitrary-variant transforms on the `<label>` — this keeps the open and closed states visually identical in weight/shape/position (literally the same elements, just rotated/faded), which two different glyphs (☰ / ✕) couldn't guarantee. If this icon ever needs to change, keep the "same elements morph" approach rather than swapping to different glyphs/icons for each state.

## Button `size` prop

`Button.astro` has a `size` prop (`"md"` default, `"sm"`, `"xs"`) controlling padding — added because passing padding-overriding utility classes via `class` doesn't reliably win the CSS specificity battle against the component's own base classes (same-specificity Tailwind utilities, order-dependent). Font size is still fine to override via `class` (e.g. Hero's `text-lg`) since the base classes don't set a font size *unless* the chosen `size` already sets one (see below) — don't try to shrink a `Button` via ad-hoc `class="px-2 py-1"` overrides, extend the `sizes` map instead if a new size is needed.

**`size="xs"` is itself responsive, not a single fixed size** — it's used only by the nav CTA ("Kjøp billett"), which is one `<Button>` that gets repositioned by breakpoint (compact inline badge in the desktop nav; a full-width item in the mobile full-screen menu), not two separate instances. Its class string is `"px-8 py-4 text-2xl lg:px-3 lg:py-1.5 lg:text-xs"` — large below `lg` to read at the same scale as the mobile menu's other `text-2xl` links (client feedback: it looked jarringly small next to them), compact at `lg`+ to stay a small badge next to the inline nav links. If a new `size` is ever context-dependent like this, bake the responsive variants directly into that one `sizes` map entry rather than trying to override them from the call site — same specificity-order problem as above.

## Program row layout (CSS Grid, not `display: contents`)

`ProgramDay.astro`'s timeslot rows use an explicit CSS Grid (`grid-cols-[auto_1fr]` on mobile, `sm:grid-cols-[8rem_1fr_auto]` on desktop) with each cell given explicit `col-start`/`row-start` placement, rather than the earlier flex + `sm:contents` trick. `items-center` on the grid container is what guarantees the time/crew-badge/title are always vertically centered against each other and against the row's separator lines, at every breakpoint and regardless of how many lines any one cell wraps to. If you need to rearrange these columns again, keep using explicit grid placement — don't reintroduce a `display: contents` wrapper to reorder content between breakpoints, it made the previous vertical-alignment bug hard to reason about.

## `/kontakt` page placeholders (Styret + crew)

The Styret section is 6 empty `PersonCard` seats (name defaults to "Navn kommer") and the crew section is one `PersonCard` per `CrewName` (excluding `"Core"`, which doesn't get a public listing) with placeholder email/phone text. `PersonCard.astro` renders a generic inline-SVG person-silhouette avatar — deliberately generic rather than reusing a game illustration, so it reads unambiguously as "photo not yet supplied" rather than a themed choice. Real names/photos/emails/phone numbers are still pending from the client — when they arrive, populate `PersonCard` props per person rather than changing the placeholder's look.

## Button variants: "glass" fill, not solid magenta

`Button.astro`'s `primary` variant fills with a translucent, backdrop-blurred dark purple (`bg-[rgba(148,0,148,0.85)] backdrop-blur-md`) and light cyan text at rest, swapping to solid `bg-magenta`/dark text only on hover. This replaced an earlier version that was solid magenta with dark text at rest — technically well within WCAG contrast (6.44:1) but reported as "hard to read" in practice; two highly saturated near-complementary colors (magenta bg, near-black text) can look like they're vibrating even when the contrast ratio is fine. Light-text-on-dark-glass reads more comfortably and matches the nav bar's own glass treatment (the client explicitly asked for this consistency). `outline` got the same glass treatment at rest (`bg-[rgba(20,0,20,0.5)] backdrop-blur-md`), keeping its cyan border/text, and still solidifies to `bg-cyan-100`/dark text on hover. Don't revert to solid opaque fills at rest for either variant.

**`hideArrow` prop**: `external` still controls `target="_blank"`/`rel` (the actual new-tab behavior); `hideArrow` independently suppresses the trailing `↗` glyph. Used on both "Kjøp billett" buttons (Hero and nav) — the client wanted the external-link affordance gone from that specific CTA without changing where it opens. Don't conflate the two props; a button can be `external` with `hideArrow`, or (rare) show an arrow on an internal link if a future need arises.

**Mobile menu open/close is now a transition, not a `hidden`/`flex` snap.** The panel is always `display: flex`/rendered (via `fixed` positioning, so it doesn't affect layout when hidden) and toggles `opacity`/`translate-y`/`pointer-events` via `peer-checked:`, animated with `transition-[opacity,transform] duration-300`. This was a fix for a reported "buttons jump in size when clicked" complaint — the old `hidden → flex` swap combined with the mobile menu's much larger link text (`text-2xl` vs. the desktop `text-base`) had no transition, so content appeared to "pop" in at a different size instantly.

**The open/close transition must never use a `scale` transform.** An earlier version animated `scale-95 → scale-100` alongside opacity, which was reported as the text still "jumping in size" — because it was: scaling the whole panel scales its text too, so a `0.95 → 1.0` transform is a real (if small) font-size change during the animation, not just a perceived one. Swapped to `-translate-y-2 → translate-y-0` instead — a slide, not a zoom — which changes position without ever touching rendered glyph size. If this needs restyling again, keep the transition to `opacity`/`translate`/`color`, never `scale`, on anything containing text.

## Section background alternation (no two adjacent bands the same color)

Full-bleed section backgrounds must alternate between `purple-950` (the page default — pass nothing, or `bg="default"`) and `purple-900` (`bg="panel"`) so consecutive sections are never visually identical. `VideoTextSection`, `CountdownTimer`, `FeatureSection`, `InstagramSection`, and `SponsorGrid` all accept a `bg?: "default" | "panel"` prop (default `"default"`) — pass it explicitly per page based on that page's actual section order, since the same component gets reused in different sequences on different pages (e.g. `GrasrotSection` and `SponsorGrid` both appear on Home and `/stotte` with different neighbors each time). `GrasrotSection` and `EmailSignupSection` default to `bg="panel"` (their original look) since most of their call sites want that, but override with `bg="default"` wherever the preceding section is already a panel.

This rule applies to **full-bleed color bands** — a section whose own background spans the full viewport width with no visible page-background gutter on either side. It does **not** apply to constrained content blocks that just sit on the plain page background inside a `max-w-*` container with gap spacing (e.g. `/kontakt`'s Kart/Styret/Crew sections) — those rely on whitespace for separation, not color, and several in a row is fine. When adding a new full-bleed section to a page, check the section immediately before and after it and make sure the `bg` values differ.

**`/info`'s eight sections are the one exception that got upgraded to full-bleed color bands** (per client request — text-only whitespace separation wasn't enough there). Each `<section>` cycles through `purple-900` / `purple-600` / `purple-950` in page order (no adjacent repeats) with an inner `max-w-4xl` content div, matching the outer-full-bleed/inner-constrained pattern used elsewhere. `pakkeliste` (which has `text-magenta` "TC Protip" body copy) is deliberately pinned to `purple-950`, not `purple-600` — magenta only passes WCAG contrast on the two darkest purples, never on `purple-600`. If a ninth section is ever added, keep the 3-color cycle going and re-check adjacent colors don't repeat; if magenta body text is added to a different section, pin that one off `purple-600` too.

Each section is a two-column `grid md:grid-cols-2 md:items-start` (stacked on mobile) with a decorative illustration from `src/assets/illustrations/` in one column and the heading/copy in the other — picked to loosely match the section's theme (`treasure-map` for Tid og sted, `vault-boy` for Aldersgrenser og trygghet, `hotdog` for Mat og drikke, etc.). The illustration column alternates sides down the page (`md:order-2` on every other section) for rhythm, the same alternation `FeatureSection`'s `reverse` prop does elsewhere. An earlier version put a small icon inline next to the `<h2>` instead — dropped because it read as an afterthought crammed next to the heading rather than a real layout element; the two-column split gives it actual visual weight.

Each section's inner `max-w-4xl` div uses `py-24` (bumped up from an initial `py-16`, per client request for a "lighter", more breathing-room feel) — this also matches the vertical rhythm `FeatureSection` and other full-bleed sections already use elsewhere, so don't drop it back down to special-case `/info` as more cramped than the rest of the site.

## `VideoHero` (Program, Konkurranser)

`VideoHero.astro` is the same visual shape as the homepage `Hero` (a `aspect-[21/9] rounded-3xl` banner) but for an autoplaying background video instead of the ticket image. It takes an optional `videoSrc` (+ `poster`) — until the client supplies a real video file, omit it and the component shows a plain "Video kommer snart" placeholder on a `bg-purple-900` box, so the page layout is already correct and won't need restructuring once the video arrives. The `<video>` tag is always `autoplay muted loop playsinline` with no visible controls — `muted` is required for autoplay to be allowed by any browser, don't drop it.

## `VideoTextSection`'s Vimeo embed is a click-to-play facade, not a live iframe

The homepage "Der lidenskap og fellesskap møtes" video used to be a bare `<iframe src="https://player.vimeo.com/...">` rendered unconditionally — meaning Vimeo's player (and its own thumbnail/chrome) loaded on every homepage visit whether or not anyone watched it. It's now a static `<img>` (Vimeo's thumbnail via `https://vumbnail.com/{id}.jpg`, a no-auth redirect service — no API key, no build-time fetch) with a `bg-purple-950/55` color-tint overlay (same technique as `Hero.astro`'s image overlay, for a consistent branded look on any thumbnail) and a custom play button matching `Button.astro`'s `primary` glass style (`bg-[rgba(148,0,148,0.85)] backdrop-blur-md` at rest → solid `bg-magenta` + `scale-110` on hover). A click-handler in the component's own inline `<script>` swaps the facade's *contents* for a real `<iframe src=".../{id}?autoplay=1">` via `facade.replaceChildren(iframe)` — the actual Vimeo player only ever loads after a real click, not on page load. **Use `replaceChildren`, not `replaceWith`, on the facade element itself** — an earlier version called `facade.replaceWith(iframe)`, which swaps out the whole container, including the `aspect-video`/`overflow-hidden`/`rounded-2xl` classes that live on it; the iframe then rendered at its raw intrinsic size with square corners, a jarring jump right as the video started. Keeping the container and only replacing what's inside it preserves that shape across the click. The listener is also registered with `{ once: true }` and strips `group`/`cursor-pointer` off the container after firing, since a stray second click on the now-video-filled box has nothing left to do. If this video ID (`746292314`) is ever replaced, only the `vimeoId` const needs to change — the thumbnail URL derives from it automatically. Don't revert this to an always-on iframe; the facade is both the "branded overlay + play button" the client asked for and a real (if secondary) perf win.

## Hero parallax

The homepage Hero's ticket image moves at a different rate than the page scroll (classic parallax) via a small scroll listener in `Hero.astro`: the image is oversized (`h-[145%] -top-[22.5%]`) inside its `overflow-hidden` container, and a `translateY` is computed from the hero's scroll progress (0 to 1 as it crosses the viewport), mapped to a range that's a ratio of the hero's own rendered height (`MAX_OFFSET_RATIO = 0.18`, not a fixed px value) — this scales naturally with viewport size while staying bounded so it can't reveal empty edges. Respects `prefers-reduced-motion` (skips entirely). The ratio was bumped up from an earlier, more subtle fixed-±20px version per the client's request for a more pronounced effect. If the parallax range or oversize percentage are changed again, keep them proportional — the oversize amount must always exceed the max translation (at `0.18` ratio the max offset is always well under the `22.5%` oversize) or the image edges will show.

## Illustrations are pixel-grid SVGs, not PNGs

`src/assets/illustrations/*.svg` replaced the original `.png` versions (still present in the same folder, unused — not deleted, just superseded). Each SVG is a literal grid of 1×1 `<rect>` unit squares (one per "pixel"), so they're vector files that reproduce a pixel-art look rather than smooth vector illustrations — treat them as pixel art for sizing purposes (see below), not as scalable line art.

**Color remapping**: every fill in these SVGs uses one of the six exact hex values from `global.css`'s `@theme` block (`#290029`/purple-900, `#940094`/purple-600, `#140014`/purple-950, `#00FFFF`/cyan-400, `#A8FFFF`/cyan-200, `#D6FFFF`/cyan-100, plus `#FF00FF`/magenta). `src/components/ui/Illustration.astro` takes a raw SVG string (`import x from ".../foo.svg?raw"`) and string-replaces each of those hex literals with the matching `var(--color-*)` reference before inlining the markup — so if the palette in `@theme` ever changes, every illustration's colors follow automatically, the same way `Nav.astro`'s logo already tracks `currentColor`. If a new illustration SVG is added with a color outside that six-value set, either recolor it to one of the theme hexes or extend `Illustration.astro`'s `colorTokens` map — don't leave a literal hex in a shipped illustration, it'll silently stop tracking future palette changes.

**Sizing is native-size × integer only.** Because each "pixel" is a real 1-unit `<rect>`, displaying an illustration at a non-integer multiple of its `viewBox` size causes adjacent unit squares to round to slightly different device-pixel widths — hairline seams or blurred edges between "pixels," breaking the pixel-art look. `Illustration.astro` takes a `scale` prop (a plain integer) and sets the rendered `width`/`height` to `viewBox size × scale` exactly, plus `shape-rendering="crispEdges"` as a second guard. **Never wrap `<Illustration>` in a Tailwind height class like `h-40`** — that reintroduces a non-integer scale the moment the viewBox size doesn't divide evenly into it. Pick `scale` per call site by dividing your target pixel size by the SVG's native `viewBox` height and rounding to the nearest whole number (illustrations have wildly different native grid sizes — `play.svg` is 24×12, `punch-out.svg` is 31×75 — so the same `scale` value produces very different final sizes across illustrations; that's expected, size for the target look, not for a uniform `scale` across every use).

**On desktop, the illustration column is vertically centered against its text column** (`md:items-center` on the two-column grid) — both `/info`'s sections and `FeatureSection` do this, so a short illustration next to a tall paragraph/list sits centered on it rather than pinned to the top. Also weigh illustration size against text length when picking `scale`: a small illustration next to a long block of copy reads as an afterthought — e.g. `/info`'s `husregler` (`punch-out.svg`, native 31×75 — tall but very narrow) was bumped from `scale={2}` to `scale={3}`, and `pakkeliste` (`counter-strike.svg`, the page's longest text block) from `scale={5}` to `scale={6}`; `stotte.astro`'s `hvorfor`/`baerekraft` (its two longest paragraphs) both went from `scale={6}` to `scale={7}`. There's no formula for this, just eyeball it against neighboring sections' proportions whenever a new illustration+long-text pairing is added.

**A prior attempt at an animated SVG-filter "video grain" overlay on illustrations was tried and reverted** — it read as garbled static rather than film grain and was reported as looking bad. Don't reintroduce a grain/noise filter on illustrations without new direction on what "digital" should actually look like.

## Program day anchors

`program.astro` generates one `AnchorNav` item per entry in `programDays`, with an id from a small ASCII slug map (`Fredag→fredag`, `Lørdag→lordag`, `Søndag→sondag`, …) since Norwegian weekday names contain æøå that aren't safe as literal URL fragment ids. `ProgramDay.astro` takes a matching `id` prop. If a new weekday-like grouping is ever added, extend the `slugify` map in `program.astro` rather than relying on `.toLowerCase()` alone.
