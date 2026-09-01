import type { GsapLike } from "@/types/vendor";

/**
 * Small accessors for the libraries that are loaded as plain <script> tags.
 * Every call site is expected to handle `undefined` (script not ready yet /
 * running on the server).
 */

export const getGsap = (): GsapLike | undefined =>
  typeof window === "undefined" ? undefined : window.gsap;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getScrollTrigger = (): any =>
  typeof window === "undefined" ? undefined : window.ScrollTrigger;

export const getSplitText = (): any =>
  typeof window === "undefined" ? undefined : window.SplitText;

export const getSwiper = (): any => (typeof window === "undefined" ? undefined : window.Swiper);

export const getMatter = (): any => (typeof window === "undefined" ? undefined : window.Matter);

export const getChart = (): any => (typeof window === "undefined" ? undefined : window.Chart);
/* eslint-enable @typescript-eslint/no-explicit-any */

/** `osmo-ease` is registered by the boot sequence when CustomEase is available. */
export const ease = (fallback = "power3.out") =>
  typeof window !== "undefined" && window.CustomEase ? "osmo-ease" : fallback;

/**
 * Resolves once every vendor script listed in `keys` is present on `window`.
 * next/script `beforeInteractive` normally has them ready before hydration,
 * but the deferred ones (matter, chart) can still be in flight.
 */
export function whenVendorReady(
  keys: Array<"gsap" | "ScrollTrigger" | "SplitText" | "Lenis" | "Swiper" | "Matter" | "Chart">,
  callback: () => void,
  options: { timeoutMs?: number; onTimeout?: () => void } = {},
): () => void {
  if (typeof window === "undefined") return () => {};

  const { timeoutMs = 10000, onTimeout } = options;
  let cancelled = false;
  const started = performance.now();

  const check = () => {
    if (cancelled) return;
    if (keys.every((key) => window[key] !== undefined)) {
      callback();
      return;
    }
    if (performance.now() - started > timeoutMs) {
      onTimeout?.();
      return;
    }
    window.setTimeout(check, 50);
  };

  check();
  return () => {
    cancelled = true;
  };
}

export function stopLenis() {
  const lenis = typeof window === "undefined" ? undefined : window.lenis;
  if (!lenis) return;
  try {
    if (typeof lenis.stop === "function") lenis.stop();
  } catch {
    /* noop */
  }
}

export function startLenis() {
  const lenis = typeof window === "undefined" ? undefined : window.lenis;
  if (!lenis) return;
  try {
    if (typeof lenis.start === "function") lenis.start();
    document.documentElement?.classList.remove("lenis-stopped");
  } catch {
    /* noop */
  }
}
