import type { ReactNode } from "react";

type SectionTitleProps = {
  /** Small uppercase eyebrow above the heading. */
  eyebrow: string;
  title: ReactNode;
  excerpt: ReactNode;
  /** `dark` is the variant used on the deep-green sections. */
  variant?: "light" | "dark";
};

/**
 * The repeated two-column section heading.
 *
 * `data-section-title` / `data-content` are the hooks the GSAP SplitText
 * timelines in `lib/animations.ts` look for — they must stay on these nodes.
 */
export default function SectionTitle({ eyebrow, title, excerpt, variant = "light" }: SectionTitleProps) {
  const isDark = variant === "dark";

  return (
    <div
      className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full"
      data-section-title
    >
      <div className="md:max-w-170 w-full">
        {/* Ikon `img.rotate` bawaan template dihapus. `lib/animations.ts`
            mencarinya lewat `querySelector("img.rotate")` dan sudah dijaga
            `if (icon)`, jadi timeline reveal tetap jalan tanpa ikon ini. */}
        <div className="flex items-center gap-2.5">
          <span
            className={
              isDark
                ? "text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase"
                : "text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block"
            }
          >
            {eyebrow}
          </span>
        </div>
        <h2
          className={`text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight mt-4 ${
            isDark ? "text-title_white" : "text-title_black"
          }`}
          data-content
        >
          {title}
        </h2>
      </div>
      <p
        className={`md:max-w-115 w-full text-base sm:text-lg ${
          isDark ? "text-paragraph_white" : "text-paragraph_black"
        }`}
        data-content
      >
        {excerpt}
      </p>
    </div>
  );
}
