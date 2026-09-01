"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";

type MarqueeProps = {
  className: string;
  /** Rendered twice so the track can loop seamlessly. */
  items: ReactNode[];
};

/**
 * Port of the `.marquee-slider` loop at the bottom of `main.js`.
 *
 * The original duplicated the track's `innerHTML` and translated it with
 * requestAnimationFrame; here the duplicate is part of the render and only the
 * transform stays imperative.
 */
export default function Marquee({ className, items }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let speed = 1;
    let offset = 0;
    let frame = 0;

    const tick = () => {
      offset -= speed;
      if (Math.abs(offset) >= track.scrollWidth / 2) offset = 0;
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const pause = () => {
      speed = 0;
    };
    const resume = () => {
      speed = 1;
    };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <div className={className} ref={trackRef}>
      {[0, 1].map((copy) =>
        items.map((item, index) => <Fragment key={`${copy}-${index}`}>{item}</Fragment>),
      )}
    </div>
  );
}
