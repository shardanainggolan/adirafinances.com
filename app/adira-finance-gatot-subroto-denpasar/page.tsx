import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  BALI_LAIN,
  CABANG,
  CONTOH_GANG,
  JUMLAH_GANG,
  NAMA_PT,
  PATOKAN,
  PETA_EMBED,
  PETA_URL,
  RUAS,
  SEBUTAN,
} from "@/lib/cabang-gatot-subroto-denpasar";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Gatot Subroto – Denpasar.
 *
 * Bentuk kedua puluh tiga. Dua puluh dua sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah.
 *
 * Halaman ini dipimpin PETA NAMA: di Denpasar ada puluhan jalan bernama Gatot
 * Subroto. Tiga kartu ruas utama barat → timur (kantor di Barat), lalu deretan
 * contoh gang bernomor, lalu tabel sebutan kantor Adira Denpasar (Denpasar 1,
 * 2, 3 …) persis seperti tertulis di sumbernya. Sumber di
 * `lib/cabang-gatot-subroto-denpasar.ts`.
 */

const JUDUL = "Adira Finance Gatot Subroto Denpasar — Alamat & Telepon";
const DESKRIPSI =
  "Adira Finance Gatot Subroto di Jl. Gatot Subroto Barat No. 101 X, Ubung, Denpasar Utara — dekat Terminal Ubung. Telepon 0361-428811 dan cara gadai BPKB motor atau mobil.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Gatot Subroto Denpasar";
const km = (n: number) => String(n).replace(".", ",");
const posisi = (r: { dari: number; sampai: number }) =>
  r.dari < 0 ? `ruas tempat kantor, panjang ±${km(+(r.sampai - r.dari).toFixed(1))} km` : `mulai ±${km(r.dari)} km ke timur`;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function GatotSubrotoDenpasarPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Gatot Subroto, Denpasar",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero putih: alamat lengkap dengan kata "Barat" ditekankan. */}
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
              <li aria-current="page">Gatot Subroto, Denpasar</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Gatot Subroto Denpasar
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            Jl. Gatot Subroto <strong className="text-title_black">Barat</strong> No. 101 X, Ubung, Denpasar Utara{" "}
            {CABANG.kodePos} &mdash; sekitar 800 meter di barat Terminal Ubung. Kata &ldquo;Barat&rdquo; itu penting, dan
            di bawah ini alasannya.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={`tel:${CABANG.telepon.replace(/-/g, "")}`}>
              Telepon {CABANG.telepon}
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              atau tanya gadai BPKB lewat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Peta nama: ruas utama + gang. */}
      <section className="section-spacing-lg-md bg-background" id="nama-jalan">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gatsu yang mana?
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Di Denpasar, &ldquo;Gatot Subroto&rdquo; itu puluhan jalan
            </h2>
            <p className="mt-4 text-paragraph_black">
              Jalan raya Gatot Subroto dibagi jadi beberapa ruas dengan nama sendiri, dan sering disingkat &ldquo;Gatsu&rdquo; &mdash;
              di peta Google pun banyak usaha di sekitar kantor memakai nama &ldquo;Gatsu Barat&rdquo;. Kantor Adira ini ada di ruas paling barat.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {RUAS.map((r) => (
              <li className={`p-5 rounded-2xl ${r.kantor ? "bg-primary" : "bg-white border border-border"}`} key={r.nama}>
                <p className={`text-sm ${r.kantor ? "text-secondary" : "text-paragraph_black"}`}>{posisi(r)}</p>
                <p className={`mt-1 text-xl font-semibold leading-tight ${r.kantor ? "text-white" : "text-title_black"}`}>
                  {r.nama}
                </p>
                <p className={`mt-2 text-sm ${r.kantor ? "text-white" : "text-paragraph_black"}`}>
                  {r.kantor ? "Kantor Adira ada di ruas ini, No. 101 X." : "Bukan lokasi kantor ini."}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 max-w-200">
            <h3 className="text-title_black text-xl font-semibold leading-tight">
              Ditambah {JUMLAH_GANG} jalan dan gang lain yang namanya juga &ldquo;Gatot Subroto&rdquo;
            </h3>
            <p className="mt-2 text-paragraph_black">
              Di OpenStreetMap, dalam radius 7 km dari kantor ada {JUMLAH_GANG} nama jalan lain yang memuat &ldquo;Gatot
              Subroto&rdquo;, sebagian besar gang bernomor, misalnya:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {CONTOH_GANG.map((g) => (
                <li className="rounded-full bg-white border border-border text-title_black text-sm" style={{ padding: "6px 14px" }} key={g}>
                  {g}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-paragraph_black">
              Jadi waktu mengetik alamat di aplikasi peta, tulis lengkap &ldquo;Gatot Subroto Barat 101 X&rdquo;, atau cari
              nama listingnya: &ldquo;{CABANG.namaMaps}&rdquo;.
            </p>
          </div>
        </div>
      </section>

      {/* Kontak + peta + patokan. */}
      <section className="section-spacing-lg-md" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Gatot Subroto
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">{CABANG.jalan}</span>
                <span className="block">
                  Kel. {CABANG.kelurahan}, Kec. {CABANG.kecamatan}
                </span>
                <span className="block">
                  {CABANG.kota}, {CABANG.provinsi} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-4 text-paragraph_black">
                Telepon {CABANG.telepon}, faks {CABANG.fax} &mdash; nomor yang sama tercatat untuk alamat ini di dua
                direktori tahun 2019. Kalau ada sumber yang menyebut ruas Gatot Subroto lain, pegang alamat di Google
                Maps: ruas Barat.
              </p>
              <p className="mt-4 text-paragraph_black">
                WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen AXI, bukan nomor cabang.
              </p>
              <h3 className="mt-8 text-title_black text-xl font-semibold leading-tight">Patokan</h3>
              <ul className="mt-3 border-t border-border">
                {PATOKAN.map((p) => (
                  <li className="flex items-start justify-between gap-4 py-2 border-b border-border" key={p.nama}>
                    <span className="text-title_black">
                      {p.nama}
                      <span className="block text-sm text-paragraph_black">ke {p.arah}</span>
                    </span>
                    <span className="text-paragraph_black whitespace-nowrap">{km(p.km)} km</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance Gatot Subroto, Denpasar" tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Sebutan kantor Adira Denpasar. */}
      <section className="section-spacing-lg-md bg-background" id="adira-denpasar">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Adira Finance Denpasar
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Denpasar 1, Denpasar 2, Denpasar 3: kantor yang mana?
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kantor Adira di Denpasar sering disebut dengan nomor. Ini sebutannya persis seperti tertulis di sumbernya,
              tanpa kami tafsirkan.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 max-w-200">
            {SEBUTAN.map((s, i) => (
              <li className={`p-4 sm:p-5 rounded-xl ${i === 0 ? "bg-secondary" : "bg-white border border-border"}`} key={s.kantor}>
                <span className="block text-title_black font-semibold">{s.kantor}</span>
                <span className="block text-sm text-paragraph_black">{s.alamat}</span>
                <span className="block mt-1 text-sm text-title_black">{s.sebutan}</span>
                <span className="block mt-1 text-sm text-paragraph_black">{s.status}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-paragraph_black max-w-175">
            Di luar Denpasar, data kami mencatat kantor Adira di{" "}
            {BALI_LAIN.map((b) => `${b.wilayah} (±${b.km} km)`).join(", ")}, ditambah beberapa lagi lebih jauh.
          </p>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Denpasar
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Gatot Subroto
            </h2>
            <p className="mt-4 text-paragraph_black">
              Cukup BPKB yang dijaminkan; kendaraan tetap Anda gunakan. Patokan dari tabel referensi kami: BPKB motor{" "}
              {rupiah(motorMin)}&ndash;{rupiah(motorMaks)} dengan tenor sampai {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]}{" "}
              bulan, BPKB mobil {rupiah(mobilMin)}&ndash;{rupiah(mobilMaks)} dengan tenor sampai{" "}
              {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan dan tambahan NPWP. Nilai yang disetujui ditetapkan
              Adira sesudah survei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Prosesnya: foto BPKB, STNK, dan eKTP Anda kirim lewat WhatsApp untuk dicek kelayakannya, lalu kendaraan
              disurvei, lalu tanda tangan dan serah terima BPKB di kantor cabang. Lihat{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                dokumen yang dibutuhkan
              </Link>{" "}
              dan{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              &ldquo;PT Adira Finance Denpasar&rdquo; maupun &ldquo;PT Adira Finance Gatot Subroto&rdquo; merujuk ke satu
              perusahaan, {NAMA_PT} &mdash; nama yang juga muncul di listing Google Maps kantor ini. Profilnya di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup: kartu kuning di atas abu muda. */}
      <section className="section-spacing-lg-md bg-background" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 bg-white border border-border rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
                Dari Ubung, Denpasar Utara, atau mana pun di Bali
              </h2>
              <p className="mt-4 text-paragraph_black">
                Kirim foto BPKB lewat WhatsApp dan sebut &ldquo;Gatsu Barat&rdquo;. Pengajuan kami teruskan ke cabang yang
                tepat.
              </p>
              <div className="mt-6">
                <a className="button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
                  Ajukan Lewat WhatsApp
                  <svg className="w-2.5 h-2.5 fill-current">
                    <use href="#buttonArrow" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-5 bg-secondary rounded-2xl text-sm text-title_black">
              <p>{PERNYATAAN_OJK}</p>
              <p className="mt-3">
                {DISCLOSURE_AGEN} Agen AXI: <strong>{AGEN.nama}</strong> &middot; ID AXI: <strong>{AGEN.id}</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
