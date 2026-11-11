import type { Metadata } from "next";
import Link from "next/link";

import {
  CABANG,
  KASONGAN,
  MANDALA,
  NAMA_PT,
  NASKAH,
  STATUS,
  SUMBER_MERGER,
} from "@/lib/cabang-langkai-palangkaraya";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Langkai – Palangka Raya.
 *
 * Bentuk kedua puluh sembilan. Dua puluh delapan sebelumnya: lokasi, proses,
 * cara sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama, garis waktu kawasan, daftar cek, bundaran
 * sebagai titik nol, matriks bukti, lembar ralat.
 *
 * Halaman ini dipimpin NASKAH TELEPON: status kantor belum pasti (listing
 * Google hilang), jadi isi utamanya adalah apa yang perlu ditanyakan saat
 * menelepon, lalu rencana B. Tanpa peta. Pemilik memilih "buat dengan
 * pengungkapan jujur". Sumber di `lib/cabang-langkai-palangkaraya.ts`.
 */

const JUDUL = "Adira Finance Langkai Palangkaraya — Alamat RTA Milono & Telepon";
const DESKRIPSI =
  "Adira Finance Langkai tercatat di Jl. RTA Milono Km 4,3, Palangka Raya, telepon 0536-3223701. Listing Google-nya sudah tidak muncul — ini yang perlu ditanyakan sebelum berangkat untuk gadai BPKB.";

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

const PESAN_WA = "Halo, saya di Palangka Raya dan mau gadai BPKB lewat Adira";
const tel = (n: string) => `tel:${n.replace(/[^0-9]/g, "")}`;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function LangkaiPalangkarayaPage() {
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
        name: "Gadai BPKB mobil dan motor — Adira Langkai, Palangka Raya",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero kuning: alamat + peringatan singkat. */}
      <section className="py-14 md:py-20 lg:py-24 bg-secondary relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-title_black">
              <li>
                <Link className="underline" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Langkai, Palangka Raya</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Langkai Palangkaraya
          </h1>
          <p className="mt-4 text-base sm:text-lg text-title_black max-w-175">
            Alamat yang tercatat: {CABANG.jalan}, {CABANG.rtRw}, Kelurahan {CABANG.kelurahan}, Kecamatan{" "}
            {CABANG.kecamatan}. Listing Google Maps kantor ini sudah tidak muncul lagi, jadi telepon dulu sebelum
            berangkat. Di bawah ada daftar pertanyaan yang bisa Anda pakai.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={tel(CABANG.telepon)}>
              Telepon {CABANG.telepon}
            </a>
            <a className="text-title_black font-semibold underline" href="#naskah">
              lihat apa yang perlu ditanyakan
            </a>
          </div>
        </div>
      </section>

      {/* Status: yang pasti dan yang belum. */}
      <section className="section-spacing-lg-md" id="status">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Yang sudah pasti, yang belum
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kami cek alamat, telepon, dan peta kantor ini pada November 2026. Hasilnya tidak semuanya bisa dipastikan,
              dan kami tulis apa adanya.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {STATUS.map((s) => (
              <li className="p-5 sm:p-6 border border-border rounded-2xl" key={s.hal}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-title_black text-xl font-semibold">{s.hal}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold text-title_black ${
                      s.pasti ? "bg-secondary" : "bg-background border border-border"
                    }`}
                  >
                    {s.pasti ? "Ada sumbernya" : "Belum pasti"}
                  </span>
                </div>
                <p className="mt-3 text-paragraph_black">{s.isi}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Naskah telepon. */}
      <section className="section-spacing-lg-md bg-background" id="naskah">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Sebelum berangkat
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Empat pertanyaan saat menelepon <span className="whitespace-nowrap">{CABANG.telepon}</span>
              </h2>
              <p className="mt-4 text-paragraph_black">
                Satu panggilan bisa menghemat perjalanan. Catat jawabannya, terutama alamat kalau ternyata kantornya sudah
                pindah.
              </p>
            </div>
            <ol className="grid gap-4">
              {NASKAH.map((n, i) => (
                <li className="flex gap-4 p-5 bg-white rounded-2xl" key={n.tanya}>
                  <span className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-secondary text-title_black font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="block text-title_black font-semibold">{n.tanya}</span>
                    <span className="block mt-1 text-paragraph_black">{n.alasan}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Rencana B. */}
      <section className="section-spacing-lg-md" id="rencana-b">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Kalau nomornya tidak tersambung
            </h2>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="p-5 sm:p-6 bg-background rounded-2xl">
              <span className="block text-sm text-paragraph_black">Pilihan 1 &middot; ±3,2 km dari Langkai</span>
              <h3 className="mt-1 text-title_black text-xl font-semibold leading-tight">Kantor eks Mandala Finance</h3>
              <p className="mt-3 text-paragraph_black">
                {MANDALA.alamat}. Di Google Maps namanya masih &ldquo;{MANDALA.nama}&rdquo; ({MANDALA.ulasan} ulasan),
                telepon {MANDALA.telepon}.
              </p>
              <p className="mt-3 text-sm text-paragraph_black">
                Mandala Finance sudah digabung ke Adira, dengan Adira sebagai perusahaan penerima penggabungan (
                <a className="text-primary font-semibold underline" href={SUMBER_MERGER} target="_blank" rel="noopener noreferrer">
                  Kontan, 1 Juli 2025
                </a>
                ). Tanyakan langsung apakah gadai BPKB Adira bisa diurus di sana.
              </p>
              <a className="mt-3 inline-block text-primary font-semibold underline" href={MANDALA.peta} target="_blank" rel="noopener noreferrer">
                Buka di Google Maps
              </a>
            </div>
            <div className="p-5 sm:p-6 bg-background rounded-2xl">
              <span className="block text-sm text-paragraph_black">Pilihan 2 &middot; ±{KASONGAN.km} km</span>
              <h3 className="mt-1 text-title_black text-xl font-semibold leading-tight">{KASONGAN.nama}</h3>
              <p className="mt-3 text-paragraph_black">
                {KASONGAN.tempat}. Kantor Adira terdekat yang kami temukan di Google Maps, tapi jauh &mdash; lebih cocok
                untuk Anda yang tinggal di arah Katingan.
              </p>
              <a className="mt-3 inline-block text-primary font-semibold underline" href={KASONGAN.peta} target="_blank" rel="noopener noreferrer">
                Buka di Google Maps
              </a>
            </div>
            <div className="p-5 sm:p-6 bg-title_black rounded-2xl">
              <span className="block text-sm text-white">Pilihan 3</span>
              <h3 className="mt-1 text-white text-xl font-semibold leading-tight">Tanya lewat WhatsApp kami</h3>
              <p className="mt-3 text-white">
                Kirim foto BPKB, sebut kelurahan Anda, dan kami bantu cari kantor Adira yang bisa memproses. Nomor{" "}
                {AGEN.waTampilan} adalah nomor agen, bukan nomor kantor cabang.
              </p>
              <a className="mt-4 button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
          <p className="mt-6 text-sm text-paragraph_black max-w-175">
            Jarak lurus di peta, dihitung dari pusat Kelurahan Langkai (OpenStreetMap) ke titik Google Maps.
          </p>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Palangka Raya
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Palangkaraya
            </h2>
            <p className="mt-4 text-paragraph_black">
              Dalam gadai BPKB, yang Anda serahkan hanya surat BPKB-nya. Kendaraan tetap di tangan Anda. Tabel referensi kami
              untuk BPKB motor berkisar {rupiah(motorMin)}&ndash;{rupiah(motorMaks)} dengan tenor maksimal{" "}
              {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan. Untuk BPKB mobil {rupiah(mobilMin)}&ndash;
              {rupiah(mobilMaks)}, tenor maksimal {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, dengan NPWP.
              Angka finalnya Adira yang menentukan setelah survei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Pengecekan awal bisa tanpa datang: foto BPKB, STNK, dan eKTP dikirim lewat WhatsApp. Survei kendaraan
              menyusul, baru kemudian tanda tangan dan penyerahan BPKB di kantor cabang yang memproses. Detailnya di{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                persyaratan
              </Link>{" "}
              dan{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              &ldquo;PT Adira Finance Palangkaraya&rdquo; maupun &ldquo;PT Adira Finance Langkai&rdquo; merujuk ke{" "}
              {NAMA_PT}, satu perusahaan dengan kantor di banyak kota. Profilnya ada di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup: kartu berbingkai di atas putih. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 border border-border rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
                Dari Pahandut, Jekan Raya, atau Sabangau
              </h2>
              <p className="mt-4 text-paragraph_black">
                Kirim foto BPKB dulu. Kantor mana yang memproses, kami pastikan dulu sebelum Anda berangkat.
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
            <div className="p-5 bg-background rounded-2xl text-sm text-paragraph_black">
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
