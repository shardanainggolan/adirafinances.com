/**
 * React/Next port of the template's `public/js/grid-reveal.js`.
 *
 * The markup contract is unchanged: any element carrying `data-grid-reveal`
 * (plus the optional `data-cols`, `data-rows`, `data-animation`, ... options)
 * gets a grid of coloured masks appended to it, which then fade out in the
 * requested pattern when the element scrolls into view.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { getGsap, getScrollTrigger } from "./vendor";

type PatternFn = (cols: number, rows: number) => number[];

const patterns: Record<string, PatternFn> = {
  wave(cols, rows) {
    const order: number[] = [];
    const seen = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(false));

    for (let diagonal = 0; diagonal < rows + cols - 1; diagonal++) {
      for (let row = Math.max(0, diagonal - cols + 1); row <= Math.min(diagonal, rows - 1); row++) {
        const col = diagonal - row;
        if (col < cols && !seen[row][col]) {
          order.push(row * cols + col);
          seen[row][col] = true;
        }
      }
    }
    return order;
  },

  spiral(cols, rows) {
    const order: number[] = [];
    const seen = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(false));

    let direction = 0;
    let stepLimit = 1;
    let row = Math.floor(rows / 2);
    let col = Math.floor(cols / 2);
    let stepsTaken = 0;
    let turns = 0;

    while (order.length < cols * rows) {
      if (row >= 0 && row < rows && col >= 0 && col < cols && !seen[row][col]) {
        order.push(row * cols + col);
        seen[row][col] = true;
      }
      switch (direction) {
        case 0:
          col++;
          break;
        case 1:
          row++;
          break;
        case 2:
          col--;
          break;
        case 3:
          row--;
          break;
      }
      stepsTaken++;
      if (stepsTaken >= stepLimit) {
        direction = (direction + 1) % 4;
        turns++;
        stepsTaken = 0;
        if (turns % 2 === 0) stepLimit++;
      }
    }
    return order;
  },

  random(cols, rows) {
    const total = cols * rows;
    const order = Array.from({ length: total }, (_, index) => index);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  },

  horizontal(cols, rows) {
    const order: number[] = [];
    for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) order.push(row * cols + col);
    return order;
  },

  vertical(cols, rows) {
    const order: number[] = [];
    for (let col = 0; col < cols; col++) for (let row = 0; row < rows; row++) order.push(row * cols + col);
    return order;
  },
};

/** Reads the breakpoint-specific `data-cols*` / `data-rows*` attributes. */
function readGridSize(el: HTMLElement) {
  const width = window.innerWidth;
  let cols: number;
  let rows: number;

  if (width <= 640 && el.hasAttribute("data-cols-sm")) {
    cols = parseInt(el.getAttribute("data-cols-sm") || "", 10) || parseInt(el.getAttribute("data-cols") || "", 10) || 10;
    rows = el.hasAttribute("data-rows-sm")
      ? parseInt(el.getAttribute("data-rows-sm") || "", 10)
      : parseInt(el.getAttribute("data-rows") || "", 10) || 20;
  } else if (width <= 1024 && el.hasAttribute("data-cols-lg")) {
    cols = parseInt(el.getAttribute("data-cols-lg") || "", 10) || parseInt(el.getAttribute("data-cols") || "", 10) || 10;
    rows = el.hasAttribute("data-rows-lg")
      ? parseInt(el.getAttribute("data-rows-lg") || "", 10)
      : parseInt(el.getAttribute("data-rows") || "", 10) || 20;
  } else {
    cols = parseInt(el.getAttribute("data-cols") || "", 10) || 10;
    rows = parseInt(el.getAttribute("data-rows") || "", 10) || 20;
  }

  return { cols, rows };
}

export class GridReveal {
  element: HTMLElement;
  masks: HTMLElement[] = [];
  maskContainer!: HTMLElement;
  config: {
    cols: number;
    rows: number;
    animation: string;
    bgColor: string;
    trigger: string;
    stagger: number;
    duration: number;
    bgImageSelector: string | null;
    playOnce: boolean;
    ease: string;
  };
  totalMasks: number;
  uniqueId: string;

  private timeline: any = null;
  private scrollTrigger: any = null;
  private isRevealed = false;
  private isAnimating = false;
  private hasPlayedOnce = false;

  constructor(element: HTMLElement) {
    this.element = element;

    const { cols, rows } = readGridSize(element);
    this.config = {
      cols,
      rows,
      animation: element.dataset.animation || "wave",
      bgColor: element.dataset.bgColor || "#003A96",
      trigger: element.dataset.trigger || "top 60%",
      stagger: parseFloat(element.dataset.stagger || "") || 0.01,
      duration: parseFloat(element.dataset.duration || "") || 0.5,
      bgImageSelector: element.dataset.bgImage || null,
      playOnce: element.dataset.playOnce !== "false",
      ease: element.dataset.ease || "power3.out",
    };
    this.totalMasks = this.config.cols * this.config.rows;
    this.uniqueId = `grid-reveal-${Math.random().toString(36).slice(2, 11)}`;

    this.createMaskContainer();
    this.generateMasks();
    this.generateCSS();
    this.setupBackground();
    this.setupAnimation();
    this.setupScrollTrigger();
  }

  private createMaskContainer() {
    let container = this.element.querySelector<HTMLElement>(".grid-reveal-masks");
    if (!container) {
      container = document.createElement("div");
      container.className = "grid-reveal-masks";
      container.setAttribute("data-unique-id", this.uniqueId);
      this.element.style.position = "relative";
      this.element.appendChild(container);
    }
    this.maskContainer = container;
  }

  private generateMasks() {
    this.maskContainer.innerHTML = "";
    this.masks = [];

    for (let i = 0; i < this.totalMasks; i++) {
      const mask = document.createElement("div");
      mask.className = "grid-reveal-mask";
      mask.setAttribute("data-mask-index", String(i));
      mask.style.backgroundColor = this.config.bgColor;
      this.maskContainer.appendChild(mask);
      this.masks.push(mask);
    }
  }

  private generateCSS() {
    const colWidth = 100 / this.config.cols;
    const rowHeight = 100 / this.config.rows;
    const overlap = 0.1;

    let style = document.getElementById(`grid-reveal-styles-${this.uniqueId}`);
    if (!style) {
      style = document.createElement("style");
      style.id = `grid-reveal-styles-${this.uniqueId}`;
      document.head.appendChild(style);
    }

    let css = `
      [data-unique-id="${this.uniqueId}"] {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 10;
        overflow: hidden;
      }
      [data-unique-id="${this.uniqueId}"] .grid-reveal-mask {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        will-change: opacity;
        pointer-events: none;
        transform: translateZ(0);
        backface-visibility: hidden;
      }
    `;

    for (let i = 1; i <= this.totalMasks; i++) {
      const col = ((i - 1) % this.config.cols) + 1;
      const row = Math.floor((i - 1) / this.config.cols) + 1;
      const left = Math.max(0, (col - 1) * colWidth - overlap);
      const right = Math.min(100, col * colWidth + overlap);
      const top = Math.max(0, (row - 1) * rowHeight - overlap);
      const bottom = Math.min(100, row * rowHeight + overlap);

      css += `[data-unique-id="${this.uniqueId}"] .grid-reveal-mask[data-mask-index="${i - 1}"] {
        clip-path: polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%);
      }\n`;
    }

    style.textContent = css;
  }

  private setupBackground() {
    let source = "";
    const bgImageAttr = this.element.getAttribute("data-bg-image");
    if (!this.element.hasAttribute("data-bg-image") || !bgImageAttr || bgImageAttr.trim() === "") return;

    if (this.config.bgImageSelector) {
      const target = this.element.querySelector<HTMLElement>(this.config.bgImageSelector);
      if (target) {
        if (target.tagName === "IMG" && (target as HTMLImageElement).src) {
          source = (target as HTMLImageElement).src;
        } else {
          const bg = window.getComputedStyle(target).backgroundImage;
          const match = bg && bg !== "none" ? bg.match(/url\(['"]?([^'"]+)['"]?\)/) : null;
          if (match) source = match[1];
        }
      }
    }

    if (!source) {
      const img = this.element.querySelector("img");
      if (img?.src) source = img.src;
    }

    if (!source) {
      const bg = window.getComputedStyle(this.element).backgroundImage;
      const match = bg && bg !== "none" ? bg.match(/url\(['"]?([^'"]+)['"]?\)/) : null;
      if (match) source = match[1];
    }

    if (!source) return;

    this.masks.forEach((mask) => {
      mask.style.backgroundImage = `url(${source})`;
      mask.style.backgroundSize = "cover";
      mask.style.backgroundPosition = "center";
    });
  }

  private setupAnimation() {
    getGsap()?.set(this.masks, { opacity: 1 });
  }

  private setupScrollTrigger() {
    const ScrollTrigger = getScrollTrigger();
    if (!ScrollTrigger) return;

    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.element,
      start: this.config.trigger,
      onEnter: () => this.playAnimation(),
      onEnterBack: () => {
        if (!(this.config.playOnce && this.hasPlayedOnce)) this.playAnimation();
      },
      once: false,
    });
  }

  playAnimation() {
    const gsap = getGsap();
    if (!gsap) return;
    if (this.config.playOnce && this.hasPlayedOnce) return;
    if (this.isRevealed && !this.isAnimating) return;

    const pattern = patterns[this.config.animation];
    if (!pattern) return;

    this.killAllAnimations();
    this.isAnimating = true;

    const order = pattern(this.config.cols, this.config.rows);
    this.timeline = gsap.timeline({
      onComplete: () => {
        this.isAnimating = false;
        this.isRevealed = true;
        this.hasPlayedOnce = true;
      },
    });

    order.forEach((maskIndex, position) => {
      const mask = this.masks[maskIndex];
      if (!mask) return;
      gsap.set(mask, { force3D: true, willChange: "opacity, transform" });
      this.timeline.to(
        mask,
        { opacity: 0, scale: 1, duration: this.config.duration, ease: this.config.ease, force3D: true },
        position * this.config.stagger,
      );
    });
  }

  killAllAnimations() {
    const gsap = getGsap();
    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }
    this.masks.forEach((mask) => gsap?.killTweensOf(mask));
    this.isAnimating = false;
  }

  destroy() {
    this.killAllAnimations();
    this.scrollTrigger?.kill();
    this.maskContainer?.remove();
    document.getElementById(`grid-reveal-styles-${this.uniqueId}`)?.remove();
  }
}

type RevealElement = HTMLElement & { gridRevealInstance?: GridReveal | null };

/**
 * Every live instance, including ones whose element has since been detached by
 * a client-side navigation. `destroyGridReveal()` used to re-query the DOM,
 * which by definition cannot reach those — so their ScrollTriggers and their
 * injected <style> blocks survived every route change.
 */
const instances = new Set<GridReveal>();

export function initGridReveal(): GridReveal[] {
  const created: GridReveal[] = [];
  document.querySelectorAll<RevealElement>("[data-grid-reveal]").forEach((el) => {
    if (el.gridRevealInstance) return;
    const instance = new GridReveal(el);
    el.gridRevealInstance = instance;
    instances.add(instance);
    created.push(instance);
  });
  return created;
}

/** Rebuilds the grids whose column/row count changed after a resize. */
export function updateGridRevealResponsive() {
  document.querySelectorAll<RevealElement>("[data-grid-reveal]").forEach((el) => {
    const instance = el.gridRevealInstance;
    if (!instance) return;

    const next = readGridSize(el);
    if (instance.config.cols === next.cols && instance.config.rows === next.rows) return;

    instance.destroy();
    instances.delete(instance);

    const rebuilt = new GridReveal(el);
    el.gridRevealInstance = rebuilt;
    instances.add(rebuilt);
  });
}

export function destroyGridReveal() {
  instances.forEach((instance) => {
    instance.destroy();
    (instance.element as RevealElement).gridRevealInstance = null;
  });
  instances.clear();
}

/**
 * Route-change cleanup: drops the grids whose element left the DOM, and keeps
 * the ones that live in the layout.
 *
 * The footer is the whole reason for the distinction. Rebuilding it on every
 * navigation would re-cover it with opaque masks and replay the reveal each
 * time; leaving it alone costs nothing, because a `ScrollTrigger.refresh()`
 * after the new page mounts re-measures the surviving trigger against the new
 * document.
 */
export function destroyDetachedGridReveal() {
  instances.forEach((instance) => {
    if (document.contains(instance.element)) return;
    instance.destroy();
    (instance.element as RevealElement).gridRevealInstance = null;
    instances.delete(instance);
  });
}
