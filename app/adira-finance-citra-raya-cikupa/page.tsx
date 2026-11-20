import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import { CABANG, NAMA_PT, PETA_EMBED, PETA_URL, TANGGA } from "@/lib/cabang-citra-raya-cikupa";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Citra Raya – Cikupa.
 *
 * Bentuk ketiga puluh lima. Tiga puluh empat sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama, garis waktu kawasan, daftar cek, bundaran
 * sebagai titik nol, matriks bukti, lembar ralat, naskah telepon, penampang
 * jalan, kotak pencarian, satu kecamatan dua kantor, pesan untuk driver, jalan
 * bertingkat.
 *
 * Halaman ini dipimpin TANGGA DUA KECAMATAN: patokan Citra Raya diurutkan dari
 * utara ke selatan dengan kantor di tengah, dan label kecamatan di ujung —
 * kantor di Cikupa, Mal Ciputra di Panongan. Sumber di
 * `lib/cabang-citra-raya-cikupa.ts`.
 */

const JUDUL = "Adira Finance Citra Raya Cikupa — Boulevard Blok L, Telepon & Peta";
const DESKRIPSI =
  "Adira Finance Citra Raya di Boulevard Raya Citra Raya Blok L 01/15 R, Cikupa, Kab. Tangerang. Telepon 021-59400382, posisinya di antara Superindo dan Ciputra Hospital, plus cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya di Citra Raya/Cikupa dan mau gadai BPKB lewat Adira";
const km = (n: number) => String(n).replace(".", ",");
const tel = (n: string) => `tel:${n.replace(/[^0-9]/g, "")}`;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function CitraRayaCikupaPage() {
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
        name: "Gadai BPKB mobil dan motor — Adira Citra Raya, Cikupa",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: {
          "@type": "AdministrativeArea",
          name: CABANG.kabupaten,
          containedInPlace: { "@type": "State", name: CABANG.provinsi },
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero gelap. */}
      <section className="py-14 md:py-20 lg:py-24 bg-title_black relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white">
              <li>
                <Link className="text-white underline" href="/">
                  Beranda
                </Link>
              </li>
              <li className="text-white" aria-hidden="true">
                /
              </li>
              <li className="text-white" aria-current="page">
                Citra Raya, Cikupa
              </li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-white max-w-200">
            Adira Finance Citra Raya Cikupa
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white max-w-175">
            {CABANG.perumahan}, {CABANG.jalan} {CABANG.blok}, Kecamatan {CABANG.kecamatan}, {CABANG.kabupaten}{" "}
            {CABANG.kodePos}. Ruko di sisi timur boulevard, di mulut Jl. Lenso 2.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={tel(CABANG.telepon)}>
              Telepon {CABANG.telepon}
            </a>
            <a className="text-white font-semibold underline" href={PETA_URL} target="_blank" rel="noopener noreferrer">
              buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Tangga dua kecamatan. */}
      <section className="section-spacing-lg-md" id="posisi">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Di mana di Citra Raya
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Citra Raya luas, ini posisi kantornya
              </h2>
              <p className="mt-4 text-paragraph_black">
                Citra Raya bukan satu titik. Menurut OpenStreetMap kawasan ini melintasi dua kecamatan: kantor Adira tercatat
                di Kecamatan Cikupa, sedangkan Mal Ciputra Tangerang di ujung selatannya sudah masuk Kecamatan Panongan. Urutan
                di bawah ini memperlihatkan posisi kantor di antara beberapa tempat yang mudah dikenali.
              </p>
              <p className="mt-4 text-paragraph_black">
                Boulevard di depan kantor terdiri dari dua jalur satu arah. Kantor ada di sisi timur, jadi kalau datang dari
                arah utara, kantor ada di kiri Anda. Arah ini cocok antara
                OpenStreetMap dan panah di peta Google.
              </p>
            </div>
            <ol className="grid gap-3">
              {TANGGA.map((t) => (
                <li
                  className={`p-4 rounded-xl ${t.ini ? "bg-secondary" : "bg-background"}`}
                  key={t.nama}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-title_black ${t.ini ? "font-bold" : "font-semibold"}`}>{t.nama}</span>
                    <span className="text-sm text-title_black whitespace-nowrap">
                      {t.km === 0 ? "di sini" : `±${km(Math.abs(t.km))} km ke ${t.km < 0 ? "utara" : "selatan"}`}
                    </span>
                  </div>
                  {t.kecamatan ? <span className="block mt-1 text-sm text-title_black">{t.kecamatan}</span> : null}
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-6 text-sm text-paragraph_black max-w-175">
            Jarak lurus dari titik kantor di Google Maps ke tempat di OpenStreetMap, bukan jarak tempuh.
          </p>
        </div>
      </section>

      {/* Alamat, telepon, peta. */}
      <section className="section-spacing-lg-md bg-background" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Cikupa
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">
                  {CABANG.perumahan}, {CABANG.jalan} {CABANG.blok}
                </span>
                <span className="block">
                  Kec. {CABANG.kecamatan}, {CABANG.kabupaten}, {CABANG.provinsi} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-4 text-paragraph_black">
                Telepon{" "}
                <a className="text-title_black font-semibold hover:text-primary whitespace-nowrap" href={tel(CABANG.telepon)}>
                  {CABANG.telepon}
                </a>
                . Nomor yang sama tercantum di data cabang kami dan di dua direktori daring. Di Google Maps namanya &ldquo;{CABANG.namaMaps}&rdquo;, dengan {CABANG.ulasan} ulasan.
              </p>
              <p className="mt-4 text-paragraph_black">
                Jam bukanya belum kami cantumkan karena sumber yang ada saling bertentangan. Tanyakan saat menelepon.
                WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen, bukan nomor kantor cabang.
              </p>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance Citra Raya, Cikupa" tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Cikupa
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Citra Raya
            </h2>
            <p className="mt-4 text-paragraph_black">
              Dengan gadai BPKB, kendaraan tidak ikut ditahan; yang dipegang Adira hanya dokumen kepemilikannya. Di tabel
              referensi kami, pinjaman berjaminan BPKB motor berkisar {rupiah(motorMin)} hingga {rupiah(motorMaks)}, bisa
              dicicil sampai {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan. Berjaminan BPKB mobil{" "}
              {rupiah(mobilMin)} hingga {rupiah(mobilMaks)}, sampai {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]}{" "}
              bulan, dengan NPWP sebagai salah satu syarat. Nilai pastinya muncul setelah kendaraan diperiksa Adira.
            </p>
            <p className="mt-4 text-paragraph_black">
              Untuk warga Citra Raya dan sekitarnya, hampir seluruh proses bisa berjalan tanpa bolak-balik ke ruko Blok L:
              pengecekan berkas lewat foto, lalu survei kendaraan. Kantor baru didatangi saat penandatanganan dan penyerahan
              BPKB. Persiapan dokumennya ada di{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                halaman persyaratan
              </Link>
              , perkiraan angsurannya di{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              &ldquo;PT Adira Finance Cikupa&rdquo; dan &ldquo;PT Adira Finance Citra Raya&rdquo; adalah sebutan untuk kantor{" "}
              {NAMA_PT} di sini, bukan perusahaan lain. Selengkapnya di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup: kartu kuning di atas putih. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 bg-secondary rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
                Warga Cikupa, Panongan, dan Citra Raya
              </h2>
              <p className="mt-4 text-title_black">
                Punya pertanyaan soal BPKB atas nama orang lain, pajak kendaraan yang telat, atau kendaraan yang masih kredit?
                Tanyakan dulu lewat WhatsApp sebelum mengurus berkas.
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
            <div className="p-5 bg-white rounded-2xl text-sm text-paragraph_black">
              <p>{PERNYATAAN_OJK}</p>
              <p className="mt-3">
                {DISCLOSURE_AGEN} Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> &middot; ID AXI:{" "}
                <strong className="text-title_black">{AGEN.id}</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
