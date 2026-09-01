// Ambient declarations for the vendor libraries that are loaded as plain
// <script> tags from /public/js (GSAP, ScrollTrigger, SplitText, Lenis,
// Swiper, Matter.js, Chart.js).
//
// They are kept as static files instead of npm packages on purpose: the
// compiled CSS shipped with the template (public/css/plugins.min.css) is built
// against these exact versions, so swapping them for newer releases would
// change the visual result.
//
// Everything in the app reaches them through `window.*`, never through a bare
// global identifier, so a missing script degrades to a no-op instead of a
// ReferenceError.

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface GsapLike {
  registerPlugin: (...plugins: unknown[]) => void;
  set: (target: unknown, vars: Record<string, unknown>) => unknown;
  to: (target: unknown, vars: Record<string, unknown>) => any;
  from: (target: unknown, vars: Record<string, unknown>) => any;
  fromTo: (target: unknown, from: Record<string, unknown>, to: Record<string, unknown>) => any;
  timeline: (vars?: Record<string, unknown>) => any;
  killTweensOf: (target: unknown) => void;
  parseEase: (ease: string) => (progress: number) => number;
  utils: { clamp: (min: number, max: number, value: number) => number };
}

declare global {
  interface Window {
    gsap?: GsapLike;
    ScrollTrigger?: any;
    SplitText?: any;
    CustomEase?: any;
    Lenis?: any;
    lenis?: any;
    Swiper?: any;
    Matter?: any;
    Chart?: any;
    /** Set by lib/animations.ts once the hero "enter" timeline has been built. */
    initHeroAnimation?: () => void;
  }
}
