/**
 * React/Next port of the template's `public/js/animation.js`.
 *
 * The DOM contract is unchanged — everything is still driven by the same
 * `data-*` attributes that the markup carries — but the entry points are now
 * plain functions that a React effect calls, instead of global side effects
 * that fire on DOMContentLoaded.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ease, getGsap, getScrollTrigger, getSplitText } from "./vendor";

const HERO_ITEM_SELECTOR =
  "[data-subtitle], [data-title], [data-excerpt], .btn-sttr, .btn, [data-button], .thumbnail-img, .thumb-image, [data-thumb]";

let refreshTimeout: number | undefined;
let isRefreshing = false;
let isScrolling = false;

/* ------------------------------------------------------------------ *
 * Page-scoped lifetime
 *
 * Everything below is rebuilt per route. On a client-side navigation the old
 * page's DOM is thrown away while its ScrollTriggers, SplitText splits and
 * resize listeners survive — the triggers keep the start/end offsets they
 * measured against the *previous* document. Anything anchored past the new
 * document's height then never fires again (that is how the footer's
 * grid-reveal masks stayed white after going home -> /simulasi).
 *
 * So each page-scoped creator registers how to undo itself, and
 * `destroyPageAnimations()` runs those before the next page is set up.
 * ------------------------------------------------------------------ */
let pageCleanups: Array<() => void> = [];

function onTeardown(fn: () => void) {
  pageCleanups.push(fn);
}

let pluginsReady = false;

/**
 * Registers the GSAP plugins exactly once.
 *
 * Both the layout-wide effect and the per-route effect need this, and React
 * runs child effects before parent effects — so whichever fires first has to be
 * able to do it, and the second call has to be a no-op.
 */
export function ensurePlugins() {
  if (pluginsReady) return;
  const gsap = getGsap();
  if (!gsap) return;

  if (typeof window !== "undefined") {
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(window.SplitText);
    if (window.CustomEase) {
      gsap.registerPlugin(window.CustomEase);
      window.CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");
    }
  }
  pluginsReady = true;
}

export function destroyPageAnimations() {
  const cleanups = pageCleanups;
  pageCleanups = [];
  cleanups.forEach((fn) => {
    try {
      fn();
    } catch {
      /* node already detached — nothing left to undo */
    }
  });
}

/** Debounced `ScrollTrigger.refresh()` that never fires mid-scroll. */
export function optimizedRefresh() {
  if (isRefreshing || isScrolling) return;
  window.clearTimeout(refreshTimeout);
  refreshTimeout = window.setTimeout(() => {
    if (isScrolling) return;
    isRefreshing = true;
    requestAnimationFrame(() => {
      getScrollTrigger()?.refresh();
      isRefreshing = false;
    });
  }, 100);
}

function splitOrNull(target: Element | null, type: string) {
  const SplitTextCtor = getSplitText();
  if (!target || !SplitTextCtor) return null;
  try {
    const split = SplitTextCtor.create(target, {
      type,
      mask: "lines",
      linesClass: "line",
      wordsClass: "word",
      charsClass: "letter",
    });
    // Reverting matters for elements that outlive the route (header/footer):
    // splitting an already-split node nests the wrappers one level deeper each
    // time, and the accumulated `overflow: hidden` line masks start clipping.
    onTeardown(() => split?.revert?.());
    return split;
  } catch {
    return null;
  }
}

const FULL_SPLIT = "lines, words, chars";

/* ------------------------------------------------------------------ *
 * Initial (pre-paint) states
 * ------------------------------------------------------------------ */

/**
 * Puts every element the reveal timelines own into its "before" state.
 *
 * Originally `loader.js#hideSectionTitles`, which ran while the preloader
 * covered the page. The preloader is gone, so this now runs immediately before
 * `initHeroAnimation()` / `initAnimations()` play the elements back in.
 */
export function hideRevealTargets() {
  const gsap = getGsap();
  if (!gsap) return;

  // `[data-journey-section]` sengaja TIDAK disembunyikan di sini.
  // Template menyembunyikannya lalu memainkannya lewat timeline khusus journey,
  // dan timeline itu tidak ikut diport. Menyembunyikan tanpa ada yang
  // memunculkan kembali = konten hilang permanen.
  document
    .querySelectorAll("[data-section-title], [data-sttr-wrapper]")
    .forEach((el) => gsap.set(el, { opacity: 0, visibility: "hidden" }));
}

/**
 * Kebalikan `hideRevealTargets()` — mengembalikan apa pun yang masih
 * tersembunyi ke keadaan terlihat.
 *
 * Ada jeda ~600 ms antara `hideRevealTargets()` dan `initAnimations()`, dan di
 * sela itu konten sudah `opacity: 0`. Kalau pembangunan timeline gagal, tidak
 * ada lagi yang memunculkannya kembali dan bagian itu hilang selamanya — dari
 * pembaca maupun dari perender Googlebot. Fungsi ini yang dipanggil kalau
 * pemasangan gagal, jadi mode gagalnya "tanpa animasi", bukan "tanpa konten".
 */
export function revealHiddenTargets() {
  const gsap = getGsap();
  document.querySelectorAll<HTMLElement>("[data-section-title], [data-sttr-wrapper]").forEach((el) => {
    if (gsap) gsap.set(el, { opacity: 1, visibility: "visible" });
    else {
      el.style.opacity = "1";
      el.style.visibility = "visible";
    }
  });
}

/** Port of the module-level `gsap.set` calls at the bottom of animation.js. */
export function presetHeroBanner() {
  const gsap = getGsap();
  if (!gsap) return;

  document.querySelectorAll("[data-hero-banner]").forEach((wrapper) => {
    wrapper
      .querySelectorAll(HERO_ITEM_SELECTOR)
      .forEach((el) => gsap.set(el, { y: 40, opacity: 0, filter: "blur(6px)", visibility: "hidden" }));
  });
}

/* ------------------------------------------------------------------ *
 * Hero timeline (above-the-fold entrance, played on boot)
 * ------------------------------------------------------------------ */

export function initHeroAnimation() {
  const gsap = getGsap();
  if (!gsap) return;

  document.querySelectorAll("[data-hero-banner]").forEach((wrapper) => {
    const items = wrapper.querySelectorAll(HERO_ITEM_SELECTOR);
    if (items.length === 0) return;

    items.forEach((el) => gsap.set(el, { y: 60, opacity: 0, filter: "blur(6px)", visibility: "hidden" }));

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    onTeardown(() => tl.kill());
    items.forEach((el, index) => {
      tl.fromTo(
        el,
        { y: 60, opacity: 0, filter: "blur(6px)", visibility: "hidden" },
        { y: 0, opacity: 1, filter: "blur(0px)", visibility: "visible", ease: "power2.out", duration: 0.6 },
        index === 0 ? 0 : "-=0.5",
      );
    });
  });

  initBannerSectionTitleAnimation();
  initBannerSttrWrapperAnimation();
}

/**
 * The very first `[data-section-title]` is above the fold, so it is played
 * straight away rather than being wired to a ScrollTrigger.
 */
function initBannerSectionTitleAnimation() {
  const gsap = getGsap();
  const SplitTextCtor = getSplitText();
  if (!gsap || !SplitTextCtor) return;

  const wrappers = document.querySelectorAll<HTMLElement>("[data-section-title]");
  if (wrappers.length === 0) return;

  const wrapper = wrappers[0];
  const headerHeight = document.querySelector<HTMLElement>(".header-area")?.offsetHeight || 0;
  if (!(wrapper.offsetTop < 1.2 * (window.innerHeight + headerHeight))) return;

  const icon = wrapper.querySelector("img.rotate");
  const subtitle = wrapper.querySelector("span");
  const title = wrapper.querySelector("h3[data-content], h2[data-content]");
  const excerpt = wrapper.querySelector("p[data-content]");
  if (!title && !excerpt) return;

  const splitSubtitle = splitOrNull(subtitle, FULL_SPLIT);
  const splitTitle = splitOrNull(title, FULL_SPLIT);
  const splitExcerpt = splitOrNull(excerpt, FULL_SPLIT);

  if (icon) gsap.set(icon, { scale: 0, opacity: 0, rotation: -180, transformOrigin: "center center" });
  if (splitSubtitle?.chars?.length) gsap.set(splitSubtitle.chars, { yPercent: 110 });
  if (splitTitle?.words?.length) gsap.set(splitTitle.words, { yPercent: 110 });
  if (splitExcerpt?.lines?.length) gsap.set(splitExcerpt.lines, { yPercent: 110 });

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  onTeardown(() => tl.kill());
  tl.set(wrapper, { visibility: "visible", opacity: 1 }, 0);

  if (icon) tl.to(icon, { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: ease() });
  if (splitSubtitle?.chars?.length) {
    tl.fromTo(splitSubtitle.chars, { yPercent: 110 }, { yPercent: 0, duration: 0.4, stagger: 0.008, ease: ease() }, "-=0.8");
  }
  if (splitTitle?.words?.length) {
    tl.fromTo(splitTitle.words, { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.06, ease: ease() }, "-=0.6");
  }
  if (splitExcerpt?.lines?.length) {
    tl.fromTo(splitExcerpt.lines, { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.08, ease: ease() }, "-=0.5");
  }

  wrapper.dataset.bannerAnimated = "true";
}

/** Same idea for the first `[data-sttr-wrapper]` when it sits above the fold. */
function initBannerSttrWrapperAnimation() {
  const gsap = getGsap();
  if (!gsap) return;

  const wrappers = document.querySelectorAll<HTMLElement>("[data-sttr-wrapper]");
  if (wrappers.length === 0) return;

  const wrapper = wrappers[0];
  const headerHeight = document.querySelector<HTMLElement>(".header-area")?.offsetHeight || 0;
  if (!(wrapper.offsetTop < 1.2 * (window.innerHeight + headerHeight))) return;

  const cards = wrapper.querySelectorAll("[data-sttr-card]");
  if (cards.length === 0) return;

  cards.forEach((card) =>
    gsap.set(card, {
      force3D: true,
      willChange: "transform, opacity, filter",
      y: 50,
      opacity: 0,
      filter: "blur(10px)",
    }),
  );

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  onTeardown(() => tl.kill());
  tl.set(wrappers, { visibility: "visible", opacity: 1 }, 0);
  cards.forEach((card, index) => {
    tl.fromTo(
      card,
      { y: 50, opacity: 0, filter: "blur(10px)", force3D: true },
      { y: 0, opacity: 1, filter: "blur(0px)", ease: "power3.out", duration: 0.6, force3D: true },
      index === 0 ? 0 : "-=0.4",
    );
  });

  wrapper.dataset.bannerAnimated = "true";
}

/* ------------------------------------------------------------------ *
 * Scroll-driven animations
 * ------------------------------------------------------------------ */

export function initAnimations() {
  const gsap = getGsap();
  const ScrollTrigger = getScrollTrigger();
  if (!gsap || !ScrollTrigger) return;

  sectionTitleFade(gsap, ScrollTrigger);
  sectionTitleSplit(gsap);
  borderlessBanking(gsap);
  sttrWrappers(gsap, ScrollTrigger);
  stickyVideo(gsap, ScrollTrigger);

  // Deferred to the next frame so the pins are measured after the reveals have
  // settled — but a navigation can land in between, and the callback would then
  // register its cleanups against the *next* page's registry.
  const pinFrame = requestAnimationFrame(() => stickyElements(ScrollTrigger));
  const refreshFrame = requestAnimationFrame(optimizedRefresh);
  onTeardown(() => {
    cancelAnimationFrame(pinFrame);
    cancelAnimationFrame(refreshFrame);
  });
}

const FADE_FROM = { y: 60, opacity: 0, filter: "blur(16px)", force3D: true };
const FADE_TO = { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.4, ease: "power3.out", force3D: true };

function sectionTitleFade(gsap: NonNullable<ReturnType<typeof getGsap>>, ScrollTrigger: any) {
  const wrappers = document.querySelectorAll<HTMLElement>("[data-section-title]");
  if (!wrappers.length) return;

  wrappers.forEach((wrapper) => {
    const subtitle = wrapper.querySelector("[data-subtitle]");
    const title = wrapper.querySelector("[data-title]");
    const excerpt = wrapper.querySelector("[data-excerpt]");
    const tl = gsap.timeline({ paused: true });

    // This `set` is what makes the wrapper visible again after
    // hideRevealTargets() hid it — it must run even when the three optional
    // children are absent.
    tl.set(wrapper, { visibility: "visible", opacity: 1, duration: 0 }, 0);
    if (subtitle) tl.fromTo(subtitle, { ...FADE_FROM, scale: 0.8 }, { ...FADE_TO, scale: 1 }, 0);
    if (title) tl.fromTo(title, FADE_FROM, { ...FADE_TO }, "-=0.5");
    if (excerpt) tl.fromTo(excerpt, FADE_FROM, { ...FADE_TO }, "-=0.5");

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top 80%",
      end: "top 40%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
    });
    onTeardown(() => {
      trigger.kill();
      tl.kill();
    });
  });

  optimizedRefresh();
}

function sectionTitleSplit(gsap: NonNullable<ReturnType<typeof getGsap>>) {
  if (!getSplitText()) return;

  document.querySelectorAll<HTMLElement>("[data-section-title]").forEach((wrapper) => {
    if (wrapper.dataset.bannerAnimated === "true") return;

    const icon = wrapper.querySelector("img.rotate");
    const subtitle = wrapper.querySelector("span");
    const title = wrapper.querySelector("h2[data-content]");
    const excerpt = wrapper.querySelector("p[data-content]");
    if (!title && !excerpt) return;

    const splitSubtitle = splitOrNull(subtitle, FULL_SPLIT);
    const splitTitle = splitOrNull(title, FULL_SPLIT);
    const splitExcerpt = splitOrNull(excerpt, FULL_SPLIT);

    if (icon) gsap.set(icon, { scale: 0, opacity: 0, rotation: -180, transformOrigin: "center center" });
    if (splitSubtitle?.chars?.length) gsap.set(splitSubtitle.chars, { yPercent: 110 });
    if (splitTitle?.words?.length) gsap.set(splitTitle.words, { yPercent: 110 });
    if (splitExcerpt?.lines?.length) gsap.set(splitExcerpt.lines, { yPercent: 110 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrapper, start: "top 75%", once: true, invalidateOnRefresh: true },
    });
    onTeardown(() => {
      tl.scrollTrigger?.kill();
      tl.kill();
    });
    tl.set(wrapper, { visibility: "visible", opacity: 1 }, 0);

    if (icon) tl.to(icon, { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: ease() });
    if (splitSubtitle?.chars?.length) {
      tl.fromTo(splitSubtitle.chars, { yPercent: 110 }, { yPercent: 0, duration: 0.4, stagger: 0.008, ease: ease() }, "-=0.8");
    }
    if (splitTitle?.words?.length) {
      tl.fromTo(splitTitle.words, { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.06, ease: ease() }, "-=0.6");
    }
    if (splitExcerpt?.lines?.length) {
      tl.fromTo(splitExcerpt.lines, { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.08, ease: ease() }, "-=0.5");
    }
  });
}

function borderlessBanking(gsap: NonNullable<ReturnType<typeof getGsap>>) {
  if (!getSplitText()) return;

  document.querySelectorAll<HTMLElement>("[data-borderless-banking]").forEach((wrapper) => {
    const icon = wrapper.querySelector("img.rotate");
    const subtitle = wrapper.querySelector("span");
    const title = wrapper.querySelector("h3[data-content]");
    const excerpt = wrapper.querySelector("p[data-content]");
    const button = wrapper.querySelector(".btn-sttr");
    const thumb = wrapper.querySelector(".thumbnail-img");
    const animatedThumb = wrapper.querySelector(".thumb-animated");

    const row = wrapper.closest(".flex");
    const cardStack = row ? row.querySelector(".max-w-165") : null;
    const card1 = cardStack ? cardStack.querySelector(".item-1") : null;
    const card2 = cardStack ? cardStack.querySelector(".item-2") : null;
    const card3 = cardStack ? cardStack.querySelector(".item-3") : null;

    if (!title && !excerpt && !button) return;

    const splitSubtitle = splitOrNull(subtitle, FULL_SPLIT);
    const splitTitle = splitOrNull(title, FULL_SPLIT);
    const splitExcerpt = splitOrNull(excerpt, FULL_SPLIT);

    if (icon) gsap.set(icon, { scale: 0, opacity: 0, rotation: -180, transformOrigin: "center center" });
    if (splitSubtitle?.chars?.length) gsap.set(splitSubtitle.chars, { yPercent: 110 });
    if (splitTitle?.words?.length) gsap.set(splitTitle.words, { yPercent: 110 });
    if (splitExcerpt?.lines?.length) gsap.set(splitExcerpt.lines, { yPercent: 110 });
    if (thumb) gsap.set(thumb, { y: 50, opacity: 0, scale: 0.95, filter: "blur(10px)" });
    if (animatedThumb) gsap.set(animatedThumb, { y: 50, opacity: 0, scale: 0.95, filter: "blur(10px)" });
    if (button) gsap.set(button, { y: 50, opacity: 0 });

    if (card1 && card2 && card3) {
      const base = { rotation: 45, skewX: -20, skewY: 0, opacity: 1, scale: 1, x: 0, y: 0 };
      gsap.set(card3, { ...base, zIndex: 3 });
      gsap.set(card2, { ...base, zIndex: 2 });
      gsap.set(card1, { ...base, zIndex: 1 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 75%",
        end: "+=100%",
        once: true,
        invalidateOnRefresh: true,
        markers: false,
      },
    });
    onTeardown(() => {
      tl.scrollTrigger?.kill();
      tl.kill();
    });

    if (icon) tl.to(icon, { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: ease() });
    if (animatedThumb) {
      tl.to(
        animatedThumb,
        { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: ease() },
        "-=0.8",
      );
    }
    if (splitSubtitle?.chars?.length) {
      tl.fromTo(splitSubtitle.chars, { yPercent: 110 }, { yPercent: 0, duration: 0.4, stagger: 0.008, ease: ease() }, "-=0.8");
    }
    if (splitTitle?.words?.length) {
      tl.fromTo(splitTitle.words, { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.06, ease: ease() }, "-=0.6");
    }
    if (splitExcerpt?.lines?.length) {
      tl.fromTo(splitExcerpt.lines, { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.06, ease: ease() }, "-=0.5");
    }
    if (button) tl.to(button, { y: 0, opacity: 1, duration: 0.6, ease: ease() }, "-=0.4");
    if (thumb) {
      tl.to(thumb, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: ease() }, "-=0.8");
    }

    if (card1 && card2 && card3) {
      const scrub = gsap.timeline({
        scrollTrigger: { trigger: wrapper, start: "top 50%", end: "top 20%", scrub: 0.5, invalidateOnRefresh: true },
      });
      onTeardown(() => {
        scrub.scrollTrigger?.kill();
        scrub.kill();
      });
      gsap.set([card1, card2, card3], { force3D: true, willChange: "transform" });
      scrub.to(card3, { rotation: 85, skewX: -10, skewY: -7, y: -55, x: 10, duration: 1, ease: "none", force3D: true }, 0);
      scrub.to(card2, { rotation: 67, skewX: -15, skewY: -3, duration: 1, ease: "none", force3D: true }, 0);
      scrub.to(card1, { rotation: 70, skewX: -5, skewY: -22, y: 20, x: -15, duration: 1, ease: "none", force3D: true }, 0);
    }
  });
}

function sttrWrappers(gsap: NonNullable<ReturnType<typeof getGsap>>, ScrollTrigger: any) {
  document.querySelectorAll<HTMLElement>("[data-sttr-wrapper]").forEach((wrapper) => {
    if (wrapper.dataset.bannerAnimated === "true") return;

    gsap.set(wrapper, { visibility: "visible", opacity: 1 });

    const cards = wrapper.querySelectorAll("[data-sttr-card]");
    const tl = gsap.timeline({ paused: true });

    cards.forEach((card) => {
      gsap.set(card, { force3D: true, willChange: "transform, opacity, filter" });
      tl.fromTo(
        card,
        { y: 50, opacity: 0, filter: "blur(10px)", force3D: true },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 0.6,
          stagger: 0.04,
          force3D: true,
        },
        "-=0.4",
      );
    });

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top 75%",
      end: "top 20%",
      animation: tl,
      toggleActions: "play none none none",
      invalidateOnRefresh: true,
    });
    onTeardown(() => {
      trigger.kill();
      tl.kill();
    });
  });

  optimizedRefresh();
}

/** Desktop-only "video grows to full-bleed while you scroll" effect. */
function stickyVideo(gsap: NonNullable<ReturnType<typeof getGsap>>, ScrollTrigger: any) {
  const wrapper = document.getElementById("video-sticky-wrapper");
  const container = wrapper
    ? wrapper.querySelector<HTMLElement>("#video-container")
    : document.getElementById("video-container");
  if (!wrapper || !container) return;

  let startWidth: number | null = null;
  let startRadius: number | null = null;
  let trigger: any = null;

  // The template only checked `innerWidth >= 1024`, but the wrapper itself is
  // `2xl:block hidden` (>= 1536px). Between those two breakpoints that used to
  // attach a scrubbed trigger to a `display: none` element, which throws inside
  // ScrollTrigger when the triggers are built at a non-zero scroll position
  // (previously impossible, because the preloader reset the scroll first).
  const isDesktop = () => window.innerWidth >= 1024 && wrapper.getClientRects().length > 0;
  const measureWidth = () => Math.min(1280, window.innerWidth);
  const measureRadius = () => {
    const radius = window.getComputedStyle(container).borderRadius;
    if (!radius || radius === "0px") return 0;
    const value = parseFloat(radius);
    return radius.includes("rem") ? 16 * value : value;
  };

  gsap.set(container, { force3D: true, willChange: "width,borderRadius" });

  const apply = (progress: number) => {
    const clamped = gsap.utils.clamp(0, 1, progress);
    const eased = gsap.parseEase("power2.inOut")(clamped);
    const width = (startWidth as number) + (window.innerWidth - (startWidth as number)) * eased;
    const radius = (startRadius as number) * (1 - eased);
    gsap.set(container, { width: `${width}px`, borderRadius: `${radius}px`, opacity: 1, force3D: true });
  };

  const setup = () => {
    if (isDesktop()) {
      if (trigger) return;
      startWidth = measureWidth();
      startRadius = measureRadius();
      gsap.set(container, { width: `${startWidth}px`, borderRadius: `${startRadius}px`, opacity: 1 });
      trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top 65%",
        end: "+=120%",
        scrub: 0.8,
        onUpdate: (self: any) => requestAnimationFrame(() => apply(self.progress)),
        invalidateOnRefresh: true,
      });
    } else {
      if (trigger) {
        trigger.kill();
        trigger = null;
      }
      gsap.set(container, { clearProps: "width,borderRadius,opacity" });
    }
  };

  setup();

  let resizeTimeout: number | undefined;
  const onResize = () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      const wasActive = trigger !== null;
      const shouldBeActive = isDesktop();
      if (wasActive !== shouldBeActive) {
        if (trigger) {
          trigger.kill();
          trigger = null;
        }
        setup();
      } else if (shouldBeActive && trigger) {
        startWidth = measureWidth();
        startRadius = measureRadius();
        ScrollTrigger.refresh();
      }
    }, 250);
  };
  window.addEventListener("resize", onResize);

  onTeardown(() => {
    window.removeEventListener("resize", onResize);
    window.clearTimeout(resizeTimeout);
    trigger?.kill();
    trigger = null;
  });
}

/** Generic `[data-sticky]` pinning helper (kept for the inner pages). */
function stickyElements(ScrollTrigger: any) {
  document.querySelectorAll<HTMLElement>("[data-sticky]").forEach((el) => {
    const section = el.closest("section");
    const parent = el.parentElement;
    if (!section || !parent) return;

    const start = el.dataset.stickyStart || "top top";
    const fallbackEnd = el.dataset.stickyEnd || "bottom bottom";
    const minWidth = el.dataset.stickyMinWidth ? parseInt(el.dataset.stickyMinWidth, 10) : 0;
    const maxWidth = el.dataset.stickyMaxWidth ? parseInt(el.dataset.stickyMaxWidth, 10) : Infinity;

    let trigger: any = null;

    const sync = () => {
      const width = window.innerWidth;
      const enabled = width >= minWidth && width <= maxWidth;

      if (enabled && !trigger) {
        const sibling = Array.from(parent.children || []).find((child) => child !== el) as HTMLElement | undefined;
        let end = fallbackEnd;
        if (sibling) {
          const delta = sibling.scrollHeight - el.scrollHeight;
          end = delta > 0 ? `+=${delta}` : "bottom bottom";
        }
        trigger = ScrollTrigger.create({
          trigger: parent,
          start,
          end,
          pin: el,
          pinSpacing: false,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        });
        ScrollTrigger.refresh();
      } else if (!enabled && trigger) {
        trigger.kill();
        trigger = null;
        ScrollTrigger.refresh();
      }
    };

    const frame = requestAnimationFrame(sync);

    let resizeTimeout: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(sync, 150);
    };
    window.addEventListener("resize", onResize);

    onTeardown(() => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimeout);
      trigger?.kill();
      trigger = null;
    });
  });
}

/* ------------------------------------------------------------------ *
 * Smooth scroll + sticky header
 * ------------------------------------------------------------------ */

export function initLenis() {
  const gsap = getGsap();
  if (typeof window === "undefined" || !window.Lenis || !gsap || window.lenis) return;

  try {
    window.gsap = gsap;
    const lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, smoothTouch: false, anchors: true });
    window.lenis = lenis;

    let rafId: number | null = null;
    let lastUpdate = 0;
    let scrollEndTimeout: number | undefined;

    lenis.on("scroll", () => {
      isScrolling = true;
      window.clearTimeout(scrollEndTimeout);
      scrollEndTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 150);

      if (performance.now() - lastUpdate >= 16) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          getScrollTrigger()?.update();
          lastUpdate = performance.now();
          rafId = null;
        });
      }
    });

    const raf = (time: number) => {
      window.lenis?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  } catch {
    /* noop */
  }
}

/** Sticky / auto-hiding header, plus the body padding that compensates for it. */
export function initHeader(): () => void {
  const gsap = getGsap();
  const ScrollTrigger = getScrollTrigger();
  const header = document.querySelector<HTMLElement>(".header-area");
  const body = document.body;
  if (!gsap || !ScrollTrigger || !header || !body) return () => {};

  let lastHeight = 0;
  let resizeTimeout: number | undefined;

  const syncPadding = (refresh = true) => {
    const height = header.offsetHeight;
    if (height > 0 && height !== lastHeight) {
      body.style.paddingTop = `${height}px`;
      lastHeight = height;
      if (refresh) optimizedRefresh();
    }
  };

  requestAnimationFrame(() => {
    syncPadding(true);
    window.setTimeout(() => syncPadding(true), 100);
  });

  const onResize = () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => syncPadding(true), 200);
  };
  window.addEventListener("resize", onResize);

  let lastScroll = window.scrollY;
  let hidden = false;

  gsap.set(header, { willChange: "transform", force3D: true });
  const trigger = ScrollTrigger.create({
    onUpdate: (self: any) => {
      const scroll = self.scroll();

      if (scroll > 0) header.classList.add("sticky-header");
      else header.classList.remove("sticky-header");

      if (scroll > lastScroll && scroll > header.offsetHeight) {
        if (!hidden) {
          gsap.to(header, { y: -header.offsetHeight, duration: 0.2, ease: "power1.inOut", force3D: true });
          hidden = true;
        }
      } else if (scroll < lastScroll && hidden) {
        gsap.to(header, { y: 0, duration: 0.4, ease: "power2.out", force3D: true });
        hidden = false;
      }

      lastScroll = scroll;
    },
  });

  optimizedRefresh();

  return () => {
    window.removeEventListener("resize", onResize);
    window.clearTimeout(resizeTimeout);
    trigger?.kill();
  };
}
