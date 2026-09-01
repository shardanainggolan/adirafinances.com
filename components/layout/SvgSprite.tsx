import { SPRITE_MARKUP } from "./sprite-markup";

/**
 * The template's inline `<symbol>` library. Every icon in the markup is a
 * `<svg><use href="#id" /></svg>`, so the sprite has to live in the same
 * document — it is injected verbatim to keep the ids and viewBoxes identical
 * to the original file.
 */
export default function SvgSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "none" }}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: SPRITE_MARKUP }}
    />
  );
}
