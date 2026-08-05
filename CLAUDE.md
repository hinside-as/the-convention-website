# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The marketing/event website for The Convention, a Norwegian LAN/gaming/cosplay/tabletop convention in Kristiansund. Astro + Tailwind CSS, deployed as a fully static site to Cloudflare Pages, with a single dynamic route (the email signup form) handled by a Cloudflare Pages Function. No CMS, no backend, no database — the client is non-technical and does not touch code; all content edits happen in this repo, by Claude.

Read [STYLE.md](./STYLE.md) before touching layout, color, spacing, images, or any interactive element. Read [CONTENT.md](./CONTENT.md) before writing or editing any user-facing copy. Read [SETUP.md](./SETUP.md) before touching the email signup form or Instagram embed.

## Architecture

- **No CMS by design.** All copy and structured content lives in typed `src/data/*.ts` files (`site.ts`, `nav.ts`, `social.ts`, `sponsors.ts`, `competitions.ts`, `program.ts`). To change a sponsor, competition, program entry, date, or contact detail, edit the relevant data file directly — never hardcode content inside a `.astro` page/component.
- **6 pages, fixed structure:** `/` (index), `/program`, `/konkurranser`, `/info` (practical info — named "Info" in nav, was "Praktisk info"), `/stotte` (sponsor/volunteer support), `/kontakt` (maps, contact details, Styret/crew leads). The footer's contact block is no longer an anchor target (no `id="kontakt"`) — the nav's "Kontakt" item links straight to the `/kontakt` page.
- **Components split three ways** under `src/components/`:
  - `layout/` — `Nav`, `Footer`, `AnchorNav` (site chrome, present across pages)
  - `sections/` — one component per homepage section (`Hero`, `CountdownTimer`, `FeatureSection`, etc.), each self-contained and pulling its own data
  - `ui/` — small reusable primitives (`Button`, `CompetitionCard`, `ProgramDay`, `FactList`, `SponsorLogo`, `EmailSignupForm`)
- **Tailwind v4, CSS-first config.** There is no `tailwind.config.js` — theme tokens (colors, fonts) are declared in `src/styles/global.css` under `@theme`. Add new design tokens there, not in a JS config file.
- **Fonts are self-hosted** via `@fontsource` packages, imported in `global.css`. Don't switch to Google Fonts' CDN.
- **The only client-side JS** is the countdown timer's interval loop and the nav's scroll-direction listener — both plain inline `<script>` tags in their `.astro` components, no framework runtime. Keep it that way; don't reach for React/Vue/a signals library for something this small — it would undercut the entire reason Astro was chosen (near-zero shipped JS).
- **The only server code** is `functions/subscribe.ts`, a Cloudflare Pages Function (not an Astro adapter route — Astro's output stays `output: 'static'`). It proxies form submissions to a Google Apps Script webhook. It has its own `functions/tsconfig.json` using `@cloudflare/workers-types`, deliberately excluded from the root `tsconfig.json` (DOM lib and Workers lib both define `Request`/`Response` and would conflict if merged).

## Conventions

- **Adding a sponsor:** drop both SVG variants into `src/assets/sponsors/{dark,light}/`, import both in `sponsors.ts`, add one entry to the `sponsors` array. The `dark` variant (fill `#290029`) is for light backgrounds; `light` (fill `#D6FFFF`) is for dark backgrounds — `SponsorLogo`'s `background` prop picks the right one, don't import a variant directly into a page.
- **Adding a competition:** add one entry to `competitions.ts`'s `competitions` array, importing a photo from `src/assets/competitions/` if one exists (all current photos are a consistent 960×779 — new ones ideally match, since the grid relies on that for even row heights). If there's no photo, it belongs in `otherActivities` instead (see `Scene`/`Cosplay` for the pattern), not forced into a `CompetitionCard`.
- **Images: always preserve native aspect ratio.** Never set both a fixed height and fixed width on an `<Image>` unless the source is genuinely that ratio — check first with `sips -g pixelWidth -g pixelHeight <file>`. Full rules and the one place cropping is intentional (the hero) are in STYLE.md.
- **Text links use a simple `transition-colors hover:text-magenta`** (nav, footer, `AnchorNav`, auto-linked URLs in `FactList`). A pixel/glitch hover effect was tried and explicitly removed pending a better reference — don't reintroduce one without being asked. See STYLE.md.
- **Norwegian only.** All user-facing copy is in Norwegian (Bokmål); code, comments, and this documentation are in English. Don't mix — a stray English string on a page is a bug, not a style choice.
- **Known intentional gaps** — do not fill these in without a source, they're deliberate: cleared competition prize amounts pending 2026 confirmation, the excluded `sponsor-nettstudio.svg` logo, and on `/stotte` the volunteer count/hours and the "Dette trenger vi nå" needs list (both unconfirmed, don't invent numbers). Full context in STYLE.md's "Known content placeholders" section.
- **Third-party competition photos** (CS2 Wingman, Fortnite Duo Build, Smash Bros. Ultimate) use real publisher promotional art with an `imageCredit` caption — follow that pattern (don't use unlicensed marketing art without a credit, and check with the client before adding more).

## Commands

```
npm run dev          # local dev server
npm run build         # production build to dist/
npm run preview       # serve the production build locally
npx astro check       # type-check (run this after any non-trivial change)
```

There are no automated tests. Verification is: `astro check` passes, `npm run build` succeeds, and a manual check in a real browser (or a Playwright screenshot pass) at both desktop and mobile widths — this project has already shipped one mobile-only overflow bug (oversized logo) that only showed up in a real render, not in the type-checker or build output.

## Deployment

Cloudflare Pages. Build command `npm run build`, output directory `dist`. The `/functions` directory is auto-detected by Cloudflare Pages and deployed alongside the static build — no separate deploy step. The `SHEETS_WEBHOOK_URL` environment variable (for the signup form) must be set in the Cloudflare Pages dashboard; see SETUP.md for how it's created. Do not point this Pages project at the `shop.` subdomain — that's the existing separate Shopify store and must stay untouched.
