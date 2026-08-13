# Studio portal

A second, standalone "design world" at `/studio/`, reachable from a gesture on the
homepage or by direct URL. Everything here is additive — the existing portfolio was not
restyled, restructured or edited.

## What was added

| Path | What it is |
| --- | --- |
| `public/studio/index.html` | The studio page. Plain HTML, served straight out of `public/`. |
| `public/studio/studio.css` | Its styles. Shares nothing with the app. |
| `public/studio/studio.js` | Product config, WebGL aurora, cursor, reveals. No dependencies. |
| `src/components/StudioPortal.tsx` | The right-edge seam on the homepage. |
| `src/components/StudioPortal.module.css` | Its styles, scoped by CSS modules. |

**The only edit to existing code is two added lines in `src/app/page.tsx`** — an import
and `<StudioPortal />`. Nothing existing was modified. Delete those two lines and the
`public/studio/` folder and the site is exactly as it was.

### A correction to the original brief

This repository is **not a Framer export**. It is a hand-authored Next.js 16 App Router
app (TypeScript, Tailwind 4, static export). `framer-motion` is the React animation
library, unrelated to Framer the design tool, and `public/images/framer/` is just image
assets with hashed filenames.

That means there is **no Framer Custom Code panel** to paste a snippet into — and equally,
**no re-export can ever overwrite this work**. The "keep the snippet alive across
re-exports" concern does not apply.

## Editing the product cards

Open `public/studio/studio.js` and edit the `PRODUCTS` array at the top. To publish a
product, paste its URL and flip the status:

```js
{
  title: "SyncSpace",
  tagline: "Real-time collaboration platform — shared canvas, live presence.",
  tags: ["Product Design", "Realtime", "Full-stack"],
  thumbnail: null,                       // path or URL; null renders a monogram
  url: "https://anuragpatwardhan.github.io/syncspace/",
  status: "live",                        // was "coming-soon"
}
```

Nothing else changes. A `live` card with a URL becomes an anchor that opens in a new tab
with `rel="noopener noreferrer"`; anything else renders an inert card with a "Coming
soon" badge, not focusable and not announced as a link.

Cards with no `thumbnail` show a monogram on a gradient, so a card without artwork still
looks deliberate. Real thumbnails are lazy-loaded. The grid reflows from one card to
twenty without changes.

`APPROACH` and `CAPABILITIES` in the same file drive the other two sections.

## Tuning the shader

All the dials are in the `SHADER` object near the top of `studio.js`:

| Key | Effect |
| --- | --- |
| `speed` | Morph rate. Lower is calmer. |
| `scale` | Noise zoom. **The most important one** — above ~1.4 the ribbons break into busy filaments and stop reading as sky. |
| `ribbonSharpness` | Band contrast. Higher gives thinner, brighter ribbons with more dark space between them, which is what keeps type legible. |
| `brightness` | Overall gain on the aurora. |
| `centreFalloff` | How dark the middle stays, so the hero type always has a bed. |
| `parallax` | How far the field leans toward the pointer. `0` disables it. |
| `maxDpr` | Device-pixel-ratio cap — the single biggest performance lever. |

Colours live in `PALETTE` (linear RGB, 0–1) and are mirrored by the CSS custom properties
at the top of `studio.css`. Change both together.

### Fallbacks

- **No WebGL** → the CSS gradient on `body::before` shows instead. Never blank.
- **`prefers-reduced-motion`** → the shader never starts; the gradient stands in, and all
  reveal animations are disabled.
- The render loop pauses when the tab is hidden or the canvas scrolls offscreen.

## Tuning the gesture

In `src/components/StudioPortal.tsx`:

- `COMMIT_RATIO` — fraction of viewport width the drag must travel to commit (default
  `0.28`).
- `DRAG_SLOP_PX` — below this, the interaction is treated as a click instead of a drag.

Three ways through, so it is never a dead end:

1. Drag or swipe the seam leftward past the threshold.
2. Click it, or focus it and press Enter.
3. Press `d` anywhere on the page (ignored while typing in a field).

Return paths from `/studio/`: the "back to dev" control, or `Esc`.

## Gotcha worth knowing

Content on `/studio/` is **visible by default**. The hidden starting state only applies
once `studio.js` adds `js-reveal` to `<html>`. If the script ever fails to load, the page
still reads normally instead of staying blank waiting for a class that never arrives.
Reveals use a `forwards`-filling animation rather than a transition, because a transition
can be stranded mid-flight at opacity 0 if the element is re-composited.

## Deploying

`.github/workflows/deploy.yml` builds on push to `main` and uploads `out/` as the Pages
artifact. `public/` is copied verbatim into `out/`, so `public/studio/` ships with no
workflow changes. `.nojekyll` is already created by the workflow.

GitHub Pages resolves `/studio/` to `/studio/index.html` via directory indexing. Note
that `next dev` does **not** do this — during local development the page is at
`/studio/index.html`.
