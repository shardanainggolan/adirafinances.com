import type { Metadata } from "next";
import Link from "next/link";

import {
  BALEENDAH,
  CABANG,
  KOTA_BANDUNG,
  NAMA_PT,
  PANJANG_JALAN_KM,
  PATOKAN,
  PENGGARIS,
  PETA_URL,
  SOEKARNO_HATTA_LAIN,
} from "@/lib/cabang-soekarno-hatta-bandung";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Soekarno Hatta – Bandung.
 *
 * Bentuk kesembilan belas. Delapan belas sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan.
 *
 * Halaman ini dipimpin PENGGARIS JALAN: Jalan Soekarno-Hatta ±15,7 km
 * timur–barat, jadi "di Jl. Soekarno-Hatta" belum menjawab apa-apa — yang
 * menjawab adalah di km berapa dari ujung barat, dan patokan di sekitarnya.
 * Lalu koreksi nomor telepon (nomor di data kami milik kantor Baleendah),
 * lalu lima kantor Kota Bandung untuk kata kunci "Adira Finance Bandung".
 * Tanpa peta sematan: listing di data kami adalah ATM di gedung ini.
 * Sumber di `lib/cabang-soekarno-hatta-bandung.ts`.
 */

const JUDUL = "Adira Finance Soekarno Hatta Bandung — Alamat & Telepon";
const DESKRIPSI =
  "Adira Finance Soekarno Hatta di Gedung Adira, Jl. Soekarno-Hatta No. 380, Kebon Lega, Bandung — dekat Terminal Leuwipanjang. Nomor telepon yang benar dan cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Soekarno Hatta Bandung";
const km = (n: number) => String(n).replace(".", ",");
const persen = (n: number) => `${((n / PANJANG_JALAN_KM) * 100).toFixed(1)}%`;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function SoekarnoHattaBandungPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Soekarno Hatta, Bandung",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero gelap: gedung, nomor, patokan pertama. Teks putih per elemen. */}
      <section className="py-14 md:py-20 lg:py-24 bg-primary relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white">
              <li>
                <Link className="text-white hover:text-secondary" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true" className="text-white">
                /
              </li>
              <li aria-current="page" className="text-white">
                Soekarno Hatta, Bandung
              </li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-white max-w-200">
            Adira Finance Soekarno Hatta Bandung
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white max-w-175">
            {CABANG.gedung}, {CABANG.jalan}, Kebon Lega, Bojongloa Kidul, Kota Bandung. Kira-kira 800 meter di timur
            Terminal Leuwipanjang.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a
              className="items-center gap-2 rounded-full bg-secondary text-title_black font-semibold"
              style={{ display: "inline-flex", padding: "12px 24px" }}
              href={`tel:${CABANG.telepon[0].replace(/-/g, "")}`}
            >
              Telepon {CABANG.telepon[0]}
            </a>
            <a className="text-white font-semibold underline hover:text-secondary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              atau tanya gadai BPKB lewat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Penggaris jalan. */}
      <section className="section-spacing-lg-md" id="penggaris">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Di mana di Jalan Soekarno-Hatta?
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Jalannya hampir 16 km. Nomor 380 ada di bagian barat
            </h2>
            <p className="mt-4 text-paragraph_black">
              Jalan Soekarno-Hatta membentang sekitar {km(PANJANG_JALAN_KM)} km dari barat ke timur di selatan Kota
              Bandung, dari Cibuntu sampai Cipadung Kidul. Jadi &ldquo;di Soekarno-Hatta&rdquo; saja belum cukup.
              Gedung Adira ada kira-kira 3 km dari ujung baratnya, tak jauh setelah Terminal Leuwipanjang.
            </p>
          </div>

          {/* Garis + titik saja; keterangan di daftar bawah supaya tidak tumpang tindih di layar sempit. */}
          <div className="mt-10 max-w-200" aria-hidden="true">
            <div style={{ position: "relative", height: 24 }}>
              <div className="bg-border rounded-full" style={{ position: "absolute", left: 0, right: 0, top: 10, height: 4 }} />
              {PENGGARIS.map((p) => (
                <span
                  className={`rounded-full ${p.kantor ? "bg-primary" : "bg-secondary"}`}
                  key={p.nama}
                  style={{
                    position: "absolute",
                    top: p.kantor ? 2 : 6,
                    left: `calc(${persen(p.km)} - ${p.kantor ? 10 : 6}px)`,
                    width: p.kantor ? 20 : 12,
                    height: p.kantor ? 20 : 12,
                  }}
                />
              ))}
            </div>
          </div>
          <ol className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 max-w-200">
            {PENGGARIS.map((p) => (
              <li className={`p-3 rounded-xl ${p.kantor ? "bg-primary" : "bg-background"}`} key={p.nama}>
                <span className={`block text-sm ${p.kantor ? "text-secondary" : "text-paragraph_black"}`}>km {km(p.km)}</span>
                <span className={`block font-semibold ${p.kantor ? "text-white" : "text-title_black"}`}>{p.nama}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-paragraph_black max-w-175">
            Posisi dihitung dari arah timur&ndash;barat di OpenStreetMap, bukan nomor rumah.
          </p>

          <h3 className="mt-12 text-title_black text-xl font-semibold leading-tight">Patokan di sekitar gedung</h3>
          <ul className="mt-4 grid sm:grid-cols-2 max-w-200 border-t border-border" style={{ columnGap: 40 }}>
            {PATOKAN.map((p) => (
              <li className="flex items-start justify-between gap-4 py-3 border-b border-border" key={p.nama}>
                <span className="text-title_black font-semibold">
                  {p.nama}
                  <span className="block text-sm text-paragraph_black font-normal">
                    ke {p.arah}
                    {p.catatan ? ` — ${p.catatan}` : ""}
                  </span>
                </span>
                <span className="text-paragraph_black whitespace-nowrap">{km(p.km)} km</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nomor telepon yang benar + soal listing ATM. */}
      <section className="section-spacing-lg-md bg-background" id="telepon">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Telepon Adira Finance Soekarno Hatta yang benar
              </h2>
              <p className="mt-4 text-paragraph_black">
                Banyak situs mencantumkan 022-88882452 untuk cabang ini, dan nomor itu juga ada di data cabang kami.
                Tapi direktori tahun 2019 mencatatnya sebagai nomor kantor Adira Baleendah di Kabupaten Bandung,
                sekitar {km(BALEENDAH.km)} km dari sini &mdash; dan di data kami nomor itu memang juga tercatat untuk
                Baleendah.
              </p>
              <p className="mt-4 text-paragraph_black">
                Untuk alamat Jl. Soekarno-Hatta No. 380, nomor 022-5210766 tercatat di Waze dan di dua direktori,
                022-5224430 di direktori 2019, dan faks 022-5229716 ada di data cabang kami:
              </p>
              <dl className="mt-4 grid gap-3">
                <div className="p-4 bg-white rounded-xl">
                  <dt className="text-sm text-paragraph_black">Telepon</dt>
                  <dd className="mt-1">
                    {CABANG.telepon.map((n) => (
                      <a className="block text-title_black font-semibold hover:text-primary" href={`tel:${n.replace(/-/g, "")}`} key={n}>
                        {n}
                      </a>
                    ))}
                  </dd>
                </div>
                <div className="p-4 bg-white rounded-xl">
                  <dt className="text-sm text-paragraph_black">Faks</dt>
                  <dd className="mt-1 text-title_black font-semibold">{CABANG.fax}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-paragraph_black">
                Sumber-sumber itu sudah berumur beberapa tahun. Kalau nomornya tidak tersambung, hubungi kami lewat
                WhatsApp {AGEN.waTampilan} &mdash; itu nomor agen AXI, bukan nomor cabang.
              </p>
            </div>
            <div className="h-full p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">
                Di Google Maps yang muncul justru ATM-nya
              </h3>
              <p className="mt-3 text-paragraph_black">
                Untuk alamat ini, listing yang tercatat di data kami bernama &ldquo;ATM Danamon Bandung Adira Soekarno
                Hatta&rdquo; &mdash; mesin ATM di dalam Gedung Adira. Gedungnya benar, tapi itu bukan listing kantor
                cabang, jadi jam buka atau ulasan di sana belum tentu soal kantornya. Di direktori lama, kantor ini
                juga tercatat dengan nama &ldquo;Adira Finance Bandung 1 (Non Honda)&rdquo;.
              </p>
              <p className="mt-4">
                <a className="text-primary font-semibold underline" href={PETA_URL} target="_blank" rel="noopener noreferrer">
                  Cari Gedung Adira di Google Maps
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Adira Finance Bandung: lima kantor Kota Bandung. */}
      <section className="section-spacing-lg-md" id="adira-bandung">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Adira Finance Bandung
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Lima kantor Adira di Kota Bandung pada data kami
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kota Bandung punya 30 kecamatan. Jarak hanya kami tulis kalau titik peta kantor itu cocok dengan
              alamatnya &mdash; untuk tiga kantor, titik di data kami jatuh di tempat lain.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 max-w-200">
            {KOTA_BANDUNG.map((k) => (
              <li
                className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl ${
                  k.ini ? "bg-secondary" : "bg-background"
                }`}
                key={k.nama}
              >
                <span>
                  <span className="block text-title_black font-semibold">{k.nama}</span>
                  <span className="block text-sm text-paragraph_black">{k.alamat}</span>
                </span>
                <span className="text-sm text-paragraph_black whitespace-nowrap">
                  {k.ini ? "halaman ini" : k.km !== null ? `${km(k.km)} km` : "jarak belum bisa dipastikan"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-paragraph_black max-w-175">
            Nama &ldquo;Soekarno Hatta&rdquo; juga dipakai kantor Adira di kota lain &mdash;{" "}
            {SOEKARNO_HATTA_LAIN.join(", ")}. Kalau yang Anda cari bukan di Bandung, pastikan nama kotanya ikut
            diketik.
          </p>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Bandung
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Soekarno Hatta
            </h2>
            <p className="mt-4 text-paragraph_black">
              Yang Anda serahkan BPKB-nya, bukan kendaraannya. Sebagai patokan, tabel referensi kami menunjukkan BPKB
              motor {rupiah(motorMin)}&ndash;{rupiah(motorMaks)} dan BPKB mobil {rupiah(mobilMin)}&ndash;
              {rupiah(mobilMaks)}, dengan tenor sampai {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan untuk
              motor dan {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan untuk mobil. Pengajuan mobil butuh NPWP.
              Nilai akhirnya diputuskan Adira sesudah kendaraan disurvei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Caranya: foto BPKB, STNK, dan eKTP dikirim lewat WhatsApp untuk dicek kelayakannya, lalu kendaraan
              disurvei, lalu tanda tangan dan serah terima BPKB di kantor cabang. Lihat{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                syarat dokumen
              </Link>{" "}
              dan{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                perkiraan cicilan
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              Nama yang sering diketik, &ldquo;PT Adira Finance Bandung&rdquo; atau &ldquo;PT Adira Finance Soekarno
              Hatta&rdquo;, merujuk ke satu perusahaan: {NAMA_PT}. Soekarno Hatta salah satu kantor cabangnya di
              Bandung. Profilnya di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              ; situs ini dikelola agen pemasar, bukan Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup: kartu kuning di atas putih (footer situs juga kuning). */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 bg-secondary rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
                Di Bandung bagian mana pun, mulainya sama
              </h2>
              <p className="mt-4 text-title_black">
                Foto BPKB, kirim lewat WhatsApp, sebutkan kecamatan Anda. Kami teruskan ke cabang yang tepat.
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
            <div className="text-sm text-title_black">
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
