import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import Script from "next/script";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import JsonLd from "@/components/layout/JsonLd";
import SiteEffects from "@/components/layout/SiteEffects";
import SvgSprite from "@/components/layout/SvgSprite";
import TombolWhatsApp from "@/components/layout/TombolWhatsApp";
import { GA_ID, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pinjaman Jaminan BPKB Mobil & Motor — Adira Finance",
    template: "%s | adirafinances.com",
  },
  description:
    "Informasi pinjaman dana dengan jaminan BPKB mobil dan motor melalui Adira Finance. Lihat tabel angsuran, syarat, dan alur pengajuannya.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "adirafinances.com",
    title: "Pinjaman Jaminan BPKB Mobil & Motor — Adira Finance",
    description:
      "Informasi pinjaman dana dengan jaminan BPKB mobil dan motor melalui Adira Finance. Lihat tabel angsuran, syarat, dan alur pengajuannya.",
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/img/favicon.svg", type: "image/svg+xml", sizes: "18x18" }] },
};

/**
 * Vendor libraries, in the same order the template loaded them.
 *
 * They stay as static files under /public/js rather than npm packages because
 * `public/css/plugins.min.css` is compiled against these exact versions.
 * jQuery, jquery.nice-select, jquery.toc, fslightbox and emailjs are gone —
 * their behaviour is now React.
 *
 * chart.min.js, matter.min.js and swiper.min.js were dropped together with the
 * sections that used them (ROI chart, integrations canvas, benefits slider) —
 * ~415 KB of JS no longer loaded.
 */
const VENDOR_SCRIPTS = [
  "/js/gsap-latest-beta.min.js",
  "/js/ScrollTrigger.min.js",
  "/js/Lenis.min.js",
  "/js/SplitText.min.js",
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        {/* DNS Prefetch for External Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Fonts — kept as the template's own <link> (not next/font) so the
            @font-face names the compiled stylesheet references still resolve. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap" rel="stylesheet" />
        {/* Stylesheets — the template's compiled Tailwind v4 build is linked
            as-is instead of imported through PostCSS, so its custom theme
            (colors, spacing scale, arbitrary values) stays byte-identical. */}
        {/* eslint-disable @next/next/no-css-tags */}
        <link rel="stylesheet" type="text/css" href="/css/plugins.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        {/* eslint-enable @next/next/no-css-tags */}
      </head>
      <body className="pt-16.5 sm:pt-18.5 lg:pt-22">
        {VENDOR_SCRIPTS.map((src) => (
          <Script key={src} src={src} strategy="beforeInteractive" />
        ))}

        <Header />
        <main id="main-content">{children}</main>
        <Footer />

        <TombolWhatsApp />
        <SvgSprite />
        <JsonLd />
        <SiteEffects />

        {/* Google Analytics lewat @next/third-parties — pembungkus resmi Next.
            Ia memuat gtag.js dengan strategy `afterInteractive`, jadi skripnya
            tidak ikut menghambat render awal seperti kalau <script async>
            ditempel langsung di <head>.

            Dibatasi ke produksi supaya `bun run dev` dan uji Playwright tidak
            mengotori laporan dengan kunjungan yang bukan pengunjung. */}
        {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
