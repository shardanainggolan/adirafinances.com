"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  destroyPageAnimations,
  ensurePlugins,
  hideRevealTargets,
  initAnimations,
  initHeader,
  initHeroAnimation,
  initLenis,
  presetHeroBanner,
  revealHiddenTargets,
} from "@/lib/animations";
import {
  destroyDetachedGridReveal,
  destroyGridReveal,
  initGridReveal,
  updateGridRevealResponsive,
} from "@/lib/grid-reveal";
import { getScrollTrigger, whenVendorReady } from "@/lib/vendor";

/**
 * Single boot sequence for everything that used to live as top-level side
 * effects across animation.js / grid-reveal.js.
 *
 * The template was a set of separate documents, so every navigation was a full
 * reload and each page got a fresh set of timelines. Here the layout persists,
 * which splits the work in two:
 *
 * - `SiteEffects` (this component) owns the process-wide pieces: plugin
 *   registration, Lenis, the sticky header. They must survive navigation.
 * - `PageEffects` rebuilds the scroll-driven animations on every route, because
 *   a ScrollTrigger keeps the start/end offsets it measured against the
 *   document it was created in. After a navigation those offsets describe a
 *   page that no longer exists, and any trigger anchored past the new
 *   document's height simply never fires.
 *
 * The template's preloader is gone: the page is never locked and the hero /
 * scroll timelines start as soon as GSAP is available, instead of waiting for
 * the loader wipe to finish.
 */
export default function SiteEffects() {
  useEffect(() => {
    let disposeHeader: (() => void) | undefined;

    // ScrollTrigger measures the document before images have their final size,
    // so re-measure once everything has loaded.
    const onLoad = () => getScrollTrigger()?.refresh();

    const boot = () => {
      if (!window.gsap) return;

      ensurePlugins();
      initLenis();
      disposeHeader = initHeader();

      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad, { once: true });
    };

    const cancel = whenVendorReady(["gsap", "ScrollTrigger", "SplitText"], boot);

    return () => {
      cancel();
      disposeHeader?.();
      window.removeEventListener("load", onLoad);
      // Layout-level grids (the footer) outlive every route, so they are only
      // torn down here.
      destroyGridReveal();
    };
  }, []);

  return <PageEffects />;
}

/** Rebuilt on every route change. Keyed by pathname, not by render. */
function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    let resizeTimeout: number | undefined;
    let animationsTimeout: number | undefined;
    let settleTimeout: number | undefined;

    const onResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(updateGridRevealResponsive, 250);
    };

    const setup = () => {
      if (!window.gsap) return;
      ensurePlugins();

      // Put the animated elements in their "before" state, then play them in.
      hideRevealTargets();
      presetHeroBanner();

      initGridReveal();
      window.addEventListener("resize", onResize);

      // The grids that survived the navigation (the footer) still hold offsets
      // measured against the previous document. Re-measure before anything can
      // scroll, otherwise a trigger anchored past the new document's height can
      // never fire and its masks stay drawn over the content.
      getScrollTrigger()?.refresh();

      initHeroAnimation();

      // initAnimations() runs SplitText over every section heading and builds
      // all the ScrollTriggers — a ~200ms block. In the same task as the hero
      // timeline that block eats most of the hero's entrance, so give the hero
      // a head start (the preloader used to provide it). When the browser has
      // restored a scroll position there is no hero entrance to protect, so the
      // scroll timelines are wired up immediately instead.
      animationsTimeout = window.setTimeout(() => {
        try {
          initAnimations();
        } catch {
          // Gagal memasang timeline tidak boleh berarti kontennya ikut hilang.
          revealHiddenTargets();
        }
      }, window.scrollY > 0 ? 0 : 600);

      // Fonts and images finish arriving after the route has committed and
      // shift everything below them. Without this the triggers near the bottom
      // of a freshly navigated page sit at stale offsets.
      settleTimeout = window.setTimeout(() => getScrollTrigger()?.refresh(), 1200);
    };

    const cancel = whenVendorReady(["gsap", "ScrollTrigger", "SplitText"], setup);

    return () => {
      cancel();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimeout);
      window.clearTimeout(animationsTimeout);
      window.clearTimeout(settleTimeout);
      destroyPageAnimations();
      destroyDetachedGridReveal();
    };
  }, [pathname]);

  return null;
}
