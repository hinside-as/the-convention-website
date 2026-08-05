# The Convention — website

Astro + Tailwind marketing/event site for The Convention (Kristiansund LAN/gaming/cosplay event). Deployed to Cloudflare Pages.

See [CLAUDE.md](./CLAUDE.md) for architecture and conventions, [STYLE.md](./STYLE.md) for the design system, [CONTENT.md](./CONTENT.md) for brand voice/vision/mission, and [SETUP.md](./SETUP.md) for the one-time email signup setup.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the build locally |
| `npx astro check` | Type-check the project |

## Structure

- `src/data/` — typed content: sponsors, competitions, program schedule, nav/social links, site-wide facts (dates, venue, contact). No CMS — edit these files directly to change copy.
- `src/components/` — `layout/` (Nav, Footer), `sections/` (page sections), `ui/` (buttons, cards).
- `src/pages/` — the 6 routes: `/`, `/program`, `/konkurranser`, `/info`, `/stotte`, `/kontakt`.
- `functions/` — Cloudflare Pages Function for the email signup form.
