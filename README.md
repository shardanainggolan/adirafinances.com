# adirafinances.com

Next.js 16 (App Router) port of the SecureVest HTML template that lives in
`public/index.html`. The template's jQuery-based scripts have been replaced by
React components and hooks; the compiled stylesheet is used untouched.

## Getting Started

```bash
bun dev      # or npm run dev
```

Open http://localhost:3000.

## ⚠️ Required: image assets

The template's markup references images that are **not in the repo yet**.
Copy the theme's `assets/img` folder to **`public/img/`**:

```
public/
  css/   ← already here (plugins.min.css, style.css)
  js/    ← already here (vendor libraries)
  img/   ← ADD THIS: contents of the theme's assets/img folder
```

`public/img` (not `public/assets/img`) is required because `style.css` resolves
its three background images relatively — `url('../img/...')` from `/css/`.

Until the folder is added the page renders and every interaction works, but all
`<img>` tags 404.

## Structure

```
app/
  layout.tsx              root layout: <head>, vendor <Script>s, header, footer, sprite
  page.tsx                homepage — composes the 12 sections
components/
  layout/                 Header, MegaMenu, Footer, SvgSprite, SiteEffects, menu-data
  sections/               one component per section of index.html
  ui/                     reusable pieces (SectionTitle, Marquee, NiceSelect, calculators, …)
hooks/                    useCollapse, useEmailSignup
lib/
  animations.ts           port of public/js/animation.js
  grid-reveal.ts          port of public/js/grid-reveal.js
  format.ts               currency / EMI helpers from public/js/main.js
  vendor.ts               typed access to the window-global libraries
types/vendor.d.ts         ambient types for those globals
```

`public/index.html` and the original `public/js/*.js` are kept as the reference
source; nothing in the app imports `main.js`, `animation.js`, `loader.js`,
`grid-reveal.js`, `apexcharts.js` or any jQuery file any more.

### Preloader

The template's intro screen (`loader.js` + `.preloader-area`) has been removed —
the homepage renders straight away and the page is never scroll-locked. The hero
entrance and the scroll reveals still run; `SiteEffects` starts them directly
instead of waiting for the loader wipe.

### Images

The hero visual (`components/sections/HeroBanner.tsx`) uses `next/image` with a
static import of `public/images/bg/hero-1.webp`: intrinsic 860x704 baked in (no
layout shift), a build-time blur placeholder, `priority` so it is preloaded as
the LCP element, and `sizes` matching the column (100vw stacked, ~45vw beside
the copy, 517px from xl up).

Every other `<img>` that sits below the fold carries `loading="lazy"`. That is
not only a bandwidth win: React 19 emits a `<link rel="preload" as="image">` for
each eagerly-rendered `<img>`, so without it 64 preloads competed with the hero.
It is now 10 (logo, two hero shapes, the hero itself, and the benefit slider).

Kept eager on purpose:

- header logo and the two hero background shapes — above the fold;
- the six benefit-slider images — Swiper measures those slides for `autoHeight`
  on init, so deferring them can mis-size the first slide.

### Styling

`public/css/style.css` is the template's **pre-compiled Tailwind v4 build** and is
linked directly from `<head>` rather than imported through PostCSS, so its custom
theme (`text-title_black`, `bg-secondary`, `pt-16.5`, …) stays byte-identical.

Consequence: **new Tailwind classes that the template never used will not exist.**
To add them, either extend `public/css/style.css` by hand or set up a Tailwind
build that includes the theme's `@theme` block.

### Vendor libraries

GSAP + ScrollTrigger + SplitText, Lenis, Swiper, Chart.js and Matter.js are loaded
from `public/js` via `next/script` with `strategy="beforeInteractive"` (Next loads
them in order and waits for them before hydrating). They are deliberately not npm
packages: `public/css/plugins.min.css` is compiled against these exact versions.

Removed: `jquery`, `jquery.nice-select`, `jquery.toc`, `fslightbox`, `email.min` —
their behaviour is now React (see `components/ui/NiceSelect.tsx` for the
nice-select replacement, which reproduces the plugin's DOM so the CSS still
applies).
