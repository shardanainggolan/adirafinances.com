import Marquee from "@/components/ui/Marquee";

/** Ticker layanan di bawah hero. */
const ticker: { label: string; starClass: string }[] = [
  { label: "Gadai BPKB Mobil", starClass: "rotate w-4.5 h-4.5 min-w-4.5 min-h-4.5" },
  { label: "Gadai BPKB Motor", starClass: "rotate w-4.5 h-4.5 min-w-4.5 min-h-4.5" },
  { label: "Take Over Leasing", starClass: "rotate w-4.5 h-4.5 min-w-4.5 min-h-4.5" },
  { label: "Top Up Pinjaman", starClass: "rotate w-4.5 h-4.5 min-w-4.5 min-h-4.5" },
  { label: "Kredit Mobil Bekas", starClass: "rotate w-4.5 h-4.5 min-w-4.5 min-h-4.5" },
  { label: "Kredit Motor Bekas", starClass: "rotate w-4.5 h-4.5 min-w-4.5 min-h-4.5" },
];

export default function BannerTextSlider() {
  const items = ticker.flatMap((entry, index) => [
    <div className=" whitespace-nowrap" key={`star-${index}`}>
      <img className={entry.starClass} src="/icons/start.svg" alt="" loading="lazy" />
    </div>,
    <div
      className=" whitespace-nowrap text-base sm:text-lg leading-none! font-semibold text-white"
      key={`label-${index}`}
    >
      {entry.label}
    </div>,
  ]);

  return (
    <div className="py-6 bg-primary overflow-hidden">
      <div className="">
        <Marquee className="marquee-slider flex gap-9 will-change-transform" items={items} />
      </div>
    </div>
  );
}
