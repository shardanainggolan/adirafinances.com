import type { Metadata } from "next";
import Link from "next/link";

import {
  CABANG,
  JARAK,
  NAMA_PT,
  PATOKAN_TITIK,
  SUMBER_MERGER,
  TIGA_ALAMAT,
} from "@/lib/cabang-ujungberung-bandung";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Ujungberung – Bandung.
 *
 * Bentuk kedua puluh tujuh. Dua puluh enam sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama, garis waktu kawasan, daftar cek, bundaran
 * sebagai titik nol.
 *
 * Halaman ini dipimpin MATRIKS BUKTI: nama "Ujung Berung" muncul di tiga
 * alamat Adira; tiap alamat dinilai dari empat kolom (alamat tertulis, titik
 * di peta, telepon, sumber). Tidak ada peta tersemat — tidak satu pun dari
 * ketiganya bisa dipastikan sebagai kantor yang dimaksud data cabang kami.
 * Sumber di `lib/cabang-ujungberung-bandung.ts`.
 */

const JUDUL = "Adira Finance Ujungberung Bandung — 3 Alamat, Telepon & Patokan";
const DESKRIPSI =
  "Nama Adira Ujung Berung dipakai di tiga alamat: Jl. Raya Sukamiskin 118, Ruko Tritan Point Cipadung, dan Ruko Nasution Square (eks Mandala Finance). Telepon dan patokan masing-masing.";

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

const PESAN_WA = "Halo, saya dari Bandung timur dan mau gadai BPKB lewat Adira Ujungberung";
const km = (n: number) => String(n).replace(".", ",");
const tel = (n: string) => `tel:${n.replace(/[^0-9]/g, "")}`;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

const KOLOM = ["Alamat tertulis", "Titik di peta", "Telepon", "Sumber"] as const;

export default function UjungberungBandungPage() {
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
        name: "Gadai BPKB mobil dan motor — Adira Ujungberung, Bandung",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  const [a, , c] = TIGA_ALAMAT;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero abu muda: langsung ke pokok masalah. */}
      <section className="py-14 md:py-20 lg:py-24 bg-background relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-paragraph_black">
              <li>
                <Link className="hover:text-primary" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Ujungberung, Bandung</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Ujungberung Bandung
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            Cari &ldquo;Adira Ujung Berung&rdquo; dan Anda akan menemukan tiga alamat berbeda di Bandung timur. Ketiganya
            kami tulis apa adanya di bawah, lengkap dengan sumbernya. Saran kami: telepon dulu sebelum berangkat.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={tel(a.nomor!)}>
              Telepon {a.nomor}
            </a>
            <a className="button-primary" href={tel(c.nomor!)}>
              Telepon {c.nomor}
            </a>
          </div>
          <p className="mt-3 text-sm text-paragraph_black max-w-175">
            Nomor pertama dari direktori cabang tahun 2019, nomor kedua dari listing Google kantor eks Mandala Finance.
          </p>
        </div>
      </section>

      {/* Matriks bukti. */}
      <section className="section-spacing-lg-md" id="tiga-alamat">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Satu nama, tiga alamat
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Alamat Adira Finance Ujung Berung yang beredar
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kami cek satu per satu: alamatnya ditulis di mana, titiknya ada di peta atau tidak, nomor teleponnya apa.
              Kalau tertulis “tidak”, artinya memang belum kami temukan.
            </p>
          </div>

          <ol className="mt-10 border border-border rounded-2xl overflow-hidden">
            {TIGA_ALAMAT.map((l, i) => (
              <li
                className={`grid gap-4 lg:grid-cols-4 lg:gap-6 p-5 sm:p-6 ${i > 0 ? "border-t border-border" : ""}`}
                key={l.kode}
              >
                <div>
                  <span className="flex items-center gap-3">
                    <span className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-secondary text-title_black font-bold">
                      {l.kode}
                    </span>
                    <span className="text-title_black font-semibold leading-tight">{l.label}</span>
                  </span>
                  <span className="block mt-3 text-sm text-paragraph_black">{KOLOM[0]}</span>
                  <span className="block text-title_black">{l.alamat}</span>
                </div>
                <div>
                  <span className="block text-sm text-paragraph_black">{KOLOM[1]}</span>
                  <span className="block text-title_black">{l.peta}</span>
                </div>
                <div>
                  <span className="block text-sm text-paragraph_black">{KOLOM[2]}</span>
                  {l.telepon.split(", ").map((n) => (
                    <span className="block text-title_black whitespace-nowrap" key={n}>
                      {n}
                    </span>
                  ))}
                </div>
                <div>
                  <span className="block text-sm text-paragraph_black">{KOLOM[3]}</span>
                  <span className="block text-title_black">{l.sumber}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Kenapa bisa tiga. */}
      <section className="section-spacing-lg-md bg-background" id="kenapa">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">Kenapa bisa sampai tiga?</h2>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="p-5 sm:p-6 bg-white rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">A: alamat lama tanpa titik peta</h3>
              <p className="mt-3 text-paragraph_black">
                Jl. Raya Sukamiskin No. 118 tercatat di data cabang kami dan di direktori kantor Adira Bandung tahun 2019.
                Tapi kami tidak menemukan listing Google di alamat itu. Sukamiskin sendiri nama kelurahan di Kecamatan
                Arcamanik.
              </p>
            </div>
            <div className="p-5 sm:p-6 bg-white rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">B: listing tanpa nomor telepon</h3>
              <p className="mt-3 text-paragraph_black">
                &ldquo;Adira Bandung Ujung Berung&rdquo; di Tritan Point punya titik dan ulasan, tapi tidak mencantumkan
                nomor. Kami belum bisa memastikan apakah ini kantor Sukamiskin yang pindah atau kantor lain.
              </p>
            </div>
            <div className="p-5 sm:p-6 bg-white rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">C: Mandala Finance digabung ke Adira</h3>
              <p className="mt-3 text-paragraph_black">
                Mandala Finance dimerger ke Adira, dengan Adira sebagai perusahaan penerima penggabungan. Target rampungnya
                1 Oktober 2025 (
                <a className="text-primary font-semibold underline" href={SUMBER_MERGER} target="_blank" rel="noopener noreferrer">
                  Kontan, 1 Juli 2025
                </a>
                ). Kantor Mandala di Nasution Square kini tampil di Google sebagai &ldquo;Adira Finance (dahulu Mandala
                Finance) Cabang Ujung Berung&rdquo;.
              </p>
            </div>
          </div>
          <p className="mt-6 text-paragraph_black max-w-175">
            Satu lagi: titik peta untuk Ujungberung di data cabang kami ternyata menunjuk kantor Adira di Kebon Lega
            &mdash; itu{" "}
            <Link className="text-primary font-semibold underline" href="/adira-finance-soekarno-hatta-bandung">
              Adira Soekarno Hatta
            </Link>
            , {km(JARAK.cKeSoekarnoHatta)} km dari Nasution Square. Jadi kalau ada peta yang mengarahkan &ldquo;Adira
            Ujungberung&rdquo; ke Jl. Soekarno-Hatta, itu salah titik.
          </p>
        </div>
      </section>

      {/* Patokan dua titik. */}
      <section className="section-spacing-lg-md bg-secondary" id="patokan">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Patokan untuk dua alamat yang ada di peta
            </h2>
            <p className="mt-4 text-title_black">
              B dan C berjarak sekitar {km(JARAK.bKeC)} km, sama-sama di sekitar Jl. AH. Nasution. Jarak di bawah ini
              jarak lurus dari titik Google ke tempat di OpenStreetMap, bukan jarak tempuh.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PATOKAN_TITIK.map((t) => (
              <div className="p-5 sm:p-6 bg-white rounded-2xl" key={t.kode}>
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-title_black font-bold">
                    {t.kode}
                  </span>
                  <h3 className="text-title_black text-xl font-semibold leading-tight">{t.judul}</h3>
                </div>
                <ul className="mt-4 border-t border-border">
                  {t.patokan.map((p) => (
                    <li className="flex items-start justify-between gap-4 py-2 border-b border-border" key={p.nama}>
                      <span className="text-title_black">
                        {p.nama}
                        <span className="block text-sm text-paragraph_black">ke {p.arah}</span>
                      </span>
                      <span className="text-paragraph_black whitespace-nowrap">±{km(p.km)} km</span>
                    </li>
                  ))}
                </ul>
                <a
                  className="mt-4 inline-block text-primary font-semibold underline"
                  href={t.peta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buka {t.kode} di Google Maps
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Bandung timur
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Ujungberung
            </h2>
            <p className="mt-4 text-paragraph_black">
              Yang dijaminkan hanya BPKB-nya, motor atau mobil tetap Anda pakai. Untuk BPKB motor, tabel referensi kami
              mulai {rupiah(motorMin)} sampai {rupiah(motorMaks)} dengan tenor hingga{" "}
              {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan. Untuk BPKB mobil, {rupiah(mobilMin)} sampai{" "}
              {rupiah(mobilMaks)}, tenor hingga {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, dan NPWP ikut
              dilampirkan. Besaran pasti diputuskan Adira setelah kendaraan disurvei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Karena alamat kantornya belum jelas, urutan paling hemat begini: kirim foto BPKB, STNK, dan eKTP lewat
              WhatsApp, tunggu jadwal survei, baru datang ke kantor untuk tanda tangan dan serah terima BPKB &mdash; di
              alamat yang sudah dipastikan saat itu. Daftar berkas ada di{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                persyaratan
              </Link>
              , perkiraan cicilan di{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              &ldquo;PT Adira Finance Bandung&rdquo; atau &ldquo;PT Adira Finance Ujungberung&rdquo; bukan badan usaha
              tersendiri; semuanya kantor dari {NAMA_PT}. Baca{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                profil Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan Adira; WhatsApp {AGEN.waTampilan} adalah nomor kami, bukan nomor
              kantor cabang.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup: kartu gelap. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 bg-title_black rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
                Dari Ujungberung, Cibiru, Arcamanik, atau Cicaheum
              </h2>
              <p className="mt-4 text-white">
                Kirim foto BPKB dan sebut kelurahan Anda. Kami bantu teruskan ke kantor Adira yang memproses.
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
