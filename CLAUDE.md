# Songs of the Stone — Inkpot India

React (Vite) marketing/event site for "Songs of the Stone" by Inkpot India, deployed on **Vercel** at songsofthestone.com. `vercel.json` has a blanket SPA rewrite (`/(.*) → /`), so any new "real" URL that needs to work on direct load must be an actual React Router route — unmatched paths currently render a blank content area (no catch-all/404 route exists).

## Routes (`src/App.jsx`)
`/`, `/about`, `/first-chapter`, `/second-chapter`, `/third-chapter`, `/privacy-policy`, `/terms-and-conditions`, `/press`. No `/about-us` — that was a stray indexed URL, now 301-redirected to `/about` via `vercel.json`.

## Styling
- Single global stylesheet: `src/App.css`. **Tailwind is configured but has no content paths set** (build warns every time) — Tailwind utility classes render as nothing. Don't use them; reuse existing class patterns instead (`.event-*`, `.gvs-*` for galleries, `.partner-*`, `.privacy-*`, etc.)
- Partner/sponsor logos use `mix-blend-mode: multiply` on a light background — logos should be on a white/transparent background, not a colored one, or multiply will tint them oddly.
- Don't add `transform: scale()` hover effects to small raster logos — it makes browsers re-rasterize them blurry. (Removed once already from `.partner-card:hover`.)

## Chapter pages
Each chapter (`FirstChapter.jsx`, `SecondChapter.jsx`, `ThirdChapter.jsx`) is a standalone page, not a shared template — sections are hand-duplicated per file. When asked to make one chapter "match" another's structure, that means copying SecondChapter.jsx's section order (hero → opening text → edge-to-edge banner → event section → gallery → partners → contact), not refactoring into a shared component.

Once an event has happened, ticket CTAs / "register interest" copy / event-specific Terms sections should come out (see ThirdChapter.jsx post-event restructure) — the page becomes a recap (gallery + partners + generic contact), matching how SecondChapter.jsx already reads.

## Deployment / git
- Pushes sometimes fail in a non-interactive shell with `fatal: Interactive logon for '...' failed` — Git Credential Manager needs a browser popup it can't complete headlessly. If that happens, ask the user to run `git push` themselves from a normal terminal.
- Vercel redeploys automatically on push to `main`; takes roughly 30–60s to go live.

## Known loose ends (not yet resolved, flagged to user each time)
- `public/chapter_3/` has two untracked WhatsApp reference screenshots (rescheduling notice images) — intentionally never committed, never deleted. User hasn't said which they want.
- Homepage partner list (`src/pages/Home.jsx`, `allPartners`) has **Jaipur Rugs twice** — once via `partner/jaipurrugs.svg`, once via `partner/12.png` (different asset, same brand). Not deduped — wasn't asked to.
- `public/chapter_3/gallery/` has 16 landscape photos (397×240, low-res — not suitable for a full-bleed edge-to-edge banner) + 4 portrait photos (1080×1440, good res) layered into ThirdChapter.jsx's gallery grid.
