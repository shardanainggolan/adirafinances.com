import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  JALAN_BALI,
  JARAK,
  KECAMATAN_JAKBAR,
  NAMA_PT,
  PETA_EMBED,
  PETA_URL,
  TETANGGA,
} from "@/lib/cabang-daan-mogot";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";

/**
 * Halaman cabang Adira Finance Daan Mogot – Kalideres, Jakarta Barat.
 *
 * Bentuk ketiga belas. Dua belas sebelumnya: lokasi, proses, cara sampai
 * (patokan radial), identitas, perbandingan, verifikasi pin, tanya-jawab,
 * anatomi alamat, ketersediaan kontak, catatan pengecekan, glosarium, kartu
 * kunjungan + rute satu jalan.
 *
 * Halaman ini dipimpin ZOOM BERTINGKAT: empat kotak bersarang dari yang
 * paling luas ke yang paling sempit — Jakarta Barat → Kalideres → kompleks
 * Daan Mogot Baru → Jl. Tanah Lot Blok LC 14. Tiap tingkat menjawab satu kata
 * kunci ("adira finance jakarta barat", "… kalideres", "… daan mogot") dan
 * memuat satu fakta terverifikasi yang berguna di tingkat itu. Fakta
 * terpentingnya: "Daan Mogot" di sini nama kompleks, bukan Jalan Daan Mogot.
 * Lihat `lib/cabang-daan-mogot.ts`.
 */

const JUDUL = "Adira Finance Daan Mogot Kalideres — Alamat & Telepon";
const DESKRIPSI =
  "Adira Finance Daan Mogot ada di Ruko Daan Mogot Baru, Jl. Tanah Lot No. 15, Kalideres, Jakarta Barat — bukan di Jalan Daan Mogot. Telepon kantor dan cara gadai BPKB.";

export const metadata: Metadata = {
  title: JUDUL,
  description: DESKRIPSI,
  alternates: { canonical: `/${CABANG.slug}` },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: `${SITE_URL}/${CABANG.slug}`,
    title: JUDUL,
    description: DESKRIPSI,
  },
};

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Daan Mogot";
const km = (n: number) => String(n).replace(".", ",");

export default function DaanMogotPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/${CABANG.slug}#remah`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: CABANG.nama, item: `${SITE_URL}/${CABANG.slug}` },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${CABANG.slug}#halaman`,
        url: `${SITE_URL}/${CABANG.slug}`,
        name: JUDUL,
        description: DESKRIPSI,
        inLanguage: "id-ID",
      },
      // `provider` menunjuk Adira; tidak ada Organization/LocalBusiness yang
      // mengaku mengoperasikan kantor ini — lihat SKILL.md §0.
      {
        "@type": "Service",
        "@id": `${SITE_URL}/${CABANG.slug}#layanan`,
        name: "Gadai BPKB mobil dan motor — cabang Daan Mogot, Kalideres, Jakarta Barat",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero ringkas: jawaban navigasional + telepon. */}
      <section className="py-14 md:py-20 lg:py-24 bg-white relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-paragraph_black">
              <li>
                <Link className="hover:text-primary" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Daan Mogot, Jakarta Barat</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Daan Mogot
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            Kantornya di {CABANG.kompleks}, {CABANG.jalan}, Kalideres, Jakarta Barat. Satu hal yang sering bikin orang
            nyasar: &ldquo;Daan Mogot&rdquo; di sini nama kompleksnya, bukan Jalan Daan Mogot. Jalan raya itu ada
            sekitar {km(JARAK.jalanDaanMogot)} km di selatan kantor.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            {CABANG.telepon.map((n) => (
              <a className="button-primary" href={`tel:${n.replace(/-/g, "")}`} key={n}>
                Telepon {n}
              </a>
            ))}
            <a className="text-title_black font-semibold underline hover:text-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              atau WhatsApp kami
            </a>
          </div>
        </div>
      </section>

      {/* Zoom bertingkat — empat kotak bersarang. */}
      <section className="section-spacing-lg-md bg-background" id="zoom">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Dari jauh ke dekat
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Di mana persisnya kantor ini, dari tingkat kota sampai ke bloknya
            </h2>
          </div>

          <div className="mt-10 p-4 sm:p-6 bg-white border border-border rounded-3xl">
            <p className="text-sm uppercase tracking-wide text-paragraph_black">Kota</p>
            <h3 className="text-title_black text-xl font-semibold leading-tight">Jakarta Barat</h3>
            <p className="mt-2 text-paragraph_black">
              Delapan kecamatan &mdash; {KECAMATAN_JAKBAR.join(", ")}. Di data cabang kami, Adira punya dua kantor di
              Jakarta Barat: yang ini di Kalideres, dan Latumenten di Tambora, sekitar {km(JARAK.latumenten)} km dari
              sini.
            </p>

            <div className="mt-6 p-4 sm:p-6 bg-background border border-border rounded-2xl">
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Kecamatan</p>
              <h3 className="text-title_black text-xl font-semibold leading-tight">Kalideres</h3>
              <p className="mt-2 text-paragraph_black">
                Halte Transjakarta Kalideres di Koridor 3, di kompleks Terminal Kalideres, sekitar{" "}
                {km(JARAK.halteKalideres)} km dari kantor.
              </p>

              <div className="mt-6 p-4 sm:p-6 bg-secondary rounded-2xl">
                <p className="text-sm uppercase tracking-wide text-title_black">Kompleks</p>
                <h3 className="text-title_black text-xl font-semibold leading-tight">Daan Mogot Baru</h3>
                <p className="mt-2 text-title_black">
                  Kantornya ada di deretan ruko kompleks ini. Mall Daan Mogot ada sekitar {km(JARAK.mallDaanMogot)} km dari
                  kantor. Jalan-jalan di dalamnya dinamai tempat di Bali &mdash; {JALAN_BALI.join(", ")}. Kalau papan
                  jalan di sekitar Anda sudah bernama seperti itu, Anda sudah di kompleks yang benar.
                </p>

                <div className="mt-6 p-4 sm:p-6 bg-primary rounded-2xl">
                  <p className="text-sm uppercase tracking-wide text-secondary">Kantor</p>
                  <h3 className="text-white text-xl font-semibold leading-tight">{CABANG.jalan}</h3>
                  <p className="mt-2 text-white">
                    {CABANG.kompleks}, {CABANG.rtRw}, Kalideres {CABANG.kodePos}. Di Google Maps tercatat sebagai
                    &ldquo;{CABANG.namaMaps}&rdquo;.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-paragraph_black">Semua jarak diukur lurus di peta, bukan jarak tempuh.</p>
        </div>
      </section>

      {/* Kontak + peta. */}
      <section className="section-spacing-lg-md" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Daan Mogot
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">
                  {CABANG.kompleks}, {CABANG.jalan}
                </span>
                <span className="block">
                  {CABANG.rtRw}, Kecamatan {CABANG.kecamatan}
                </span>
                <span className="block">
                  {CABANG.kota}, {CABANG.provinsi} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-6 text-paragraph_black">
                Telepon kantor cabang {CABANG.telepon.join(" dan ")}, faks {CABANG.fax}. WhatsApp {AGEN.waTampilan}{" "}
                adalah nomor kami sebagai agen AXI, bukan nomor cabang. Nomor HP lain yang beredar atas nama cabang
                ini di situs-situs lain tidak bisa kami konfirmasi.
              </p>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.namaMaps} tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Daan Mogot
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              BPKB motor atau mobil, kendaraan tetap di garasi Anda
            </h2>
            <p className="mt-4 text-paragraph_black">
              Dokumen dasarnya sama untuk keduanya &mdash; eKTP, Kartu Keluarga, bukti penghasilan, bukti tempat tinggal
              &mdash; dan untuk BPKB mobil ditambah NPWP. Kelayakannya kami cek dulu dari foto BPKB, STNK, dan eKTP
              lewat WhatsApp. Kalau lolos, kendaraannya disurvei, lalu Anda datang ke Jl. Tanah Lot untuk tanda tangan
              dan menyerahkan BPKB.
            </p>
            <p className="mt-4 text-paragraph_black">
              Rinciannya:{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                persyaratan
              </Link>
              ,{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              , dan{" "}
              <Link className="text-primary font-semibold underline" href="/#alur">
                alur pengajuan
              </Link>
              .
            </p>
            {/* Ditulis ulang 2026-10-19: versi pertama identik kata per kata
                dengan kalimat yang sama di halaman Ciledug (22 kata). */}
            <p className="mt-4 text-paragraph_black">
              Kalau di dokumen Anda tertulis {NAMA_PT}, itu perusahaan yang sama dengan yang orang sebut &ldquo;PT
              Adira Finance&rdquo; &mdash; yang kedua hanya sebutan sehari-hari. Sejarah perusahaannya kami rangkum di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                profil Adira Finance
              </Link>
              . Kami sendiri agen pemasar, dan situs ini dikelola terpisah dari adira.co.id.
            </p>
          </div>
        </div>
      </section>

      {/* Tetangga. */}
      <section className="section-spacing-lg-md" id="sekitar">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            Kantor Adira lain yang paling dekat dari Kalideres
          </h2>
          <p className="mt-4 text-paragraph_black max-w-175">
            Dua yang terdekat justru di Kota Tangerang, sebelum Latumenten yang sama-sama Jakarta Barat. Cabang mana
            yang memproses pengajuan ditentukan Adira Finance.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TETANGGA.map((c) => (
              <li className="flex items-center justify-between gap-4 p-4 border border-border rounded-xl" key={c.nama}>
                <span className="text-title_black font-semibold">
                  {c.href ? (
                    <Link className="underline hover:text-primary" href={c.href}>
                      {c.nama}
                    </Link>
                  ) : (
                    c.nama
                  )}
                  <span className="block text-paragraph_black font-normal">{c.wilayah}</span>
                </span>
                <span className="text-paragraph_black whitespace-nowrap">{km(c.km)} km</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Penutup gelap. */}
      <section className="py-14 md:py-20 bg-primary" id="ajukan">
        <div className="container">
          <div className="max-w-200">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              Mulai dari foto BPKB, sebut &ldquo;Daan Mogot&rdquo;
            </h2>
            <p className="mt-4 text-white">{PERNYATAAN_OJK}</p>
            <p className="mt-4 text-sm text-white">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-secondary">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-secondary">{AGEN.id}</strong>.
            </p>
            <div className="mt-8">
              <a
                className="items-center gap-2 rounded-full bg-secondary text-title_black font-semibold"
                style={{ display: "inline-flex", padding: "12px 24px" }}
                href={waLink(PESAN_WA)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ajukan Lewat WhatsApp
                <svg className="w-2.5 h-2.5 fill-current">
                  <use href="#buttonArrow" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
