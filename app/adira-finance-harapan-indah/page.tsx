import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  ALAMAT_SATU_BARIS,
  ANOMALI_CIKARANG,
  ARAH_JAKARTA,
  BUJUR_TAMBUN,
  CABANG,
  KAWASAN_BEKASI,
  KECAMATAN_KOTA_BEKASI,
  PETA_EMBED,
  PETA_URL,
} from "@/lib/cabang-harapan-indah";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";

/**
 * Halaman cabang Adira Finance Harapan Indah – Bekasi.
 *
 * Bentuk kedelapan. Tujuh sebelumnya: lokasi (Alam Sutera), proses (Sawangan),
 * cara sampai (Ciputat), identitas (Pasar Baru), perbandingan (Tajur),
 * verifikasi (Tebet), tanya-jawab (Pondok Gede).
 *
 * Halaman ini memakai ANATOMI ALAMAT sebagai tulang punggung: alamatnya
 * dibongkar bagian per bagian — nama jalan, nomor, kecamatan, kota, kode pos,
 * koordinat — dan tiap bagian diberi satu catatan yang benar-benar berguna
 * saat orang mencari tempatnya. Dua dari tiga kata kunci halaman ini memang
 * soal alamat.
 *
 * Aturan tetap (SKILL.md §8): boilerplate nasional hanya ditautkan; nomor
 * WhatsApp agen tidak pernah tampil sebagai nomor cabang; yang belum
 * diverifikasi tidak terbit.
 */

const JUDUL = "Adira Finance Harapan Indah, Bekasi — Alamat & Gadai BPKB";
const DESKRIPSI = `Alamat Adira Finance Harapan Indah: ${CABANG.jalan} ${CABANG.nomor}, Kec. ${CABANG.kecamatan}, ${CABANG.kota}. Telepon kantor, peta, dan cara gadai BPKB motor atau mobil.`;

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Harapan Indah Bekasi";

/** Alamat dibongkar bagian per bagian. Tiap catatan harus benar-benar berguna. */
const anatomi = [
  {
    label: "Nama jalan",
    nilai: CABANG.jalan,
    catatan:
      "Boulevard utama kawasan Harapan Indah. Ini bagian yang paling aman diketik di aplikasi peta, karena nama pin-nya sendiri tidak membantu.",
  },
  {
    label: "Nomor",
    nilai: CABANG.nomor,
    catatan: "Nomor 3 di boulevard tersebut. Cocokkan nomornya, bukan hanya nama jalannya.",
  },
  {
    label: "Kecamatan",
    nilai: CABANG.kecamatan,
    catatan:
      "Bagian yang paling sering bikin bingung: Harapan Indah bukan nama kecamatan. Secara administratif, kantor ini masuk Kecamatan Medan Satria.",
  },
  {
    label: "Kota & provinsi",
    nilai: `${CABANG.kota}, ${CABANG.provinsi}`,
    catatan:
      "Bekasi, bukan Jakarta — meski letaknya dekat perbatasan dan beberapa cabang Adira di Jakarta justru lebih dekat dari sini.",
  },
  { label: "Kode pos", nilai: CABANG.kodePos, catatan: "Pembeda paling cepat kalau Anda menyalin alamat dari hasil pencarian." },
  {
    label: "Koordinat",
    nilai: `${CABANG.lintang}, ${CABANG.bujur}`,
    catatan: "Tempelkan langsung ke aplikasi peta kalau pencarian berdasarkan nama tidak ketemu.",
  },
];

export default function HarapanIndahPage() {
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
      // `provider` menunjuk Adira. Tidak ada Organization/LocalBusiness yang
      // mengaku mengoperasikan kantor ini — lihat SKILL.md §0.
      {
        "@type": "Service",
        "@id": `${SITE_URL}/${CABANG.slug}#layanan`,
        name: "Gadai BPKB mobil dan motor — cabang Harapan Indah, Kota Bekasi",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: {
          "@type": "FinancialService",
          "@id": `${SITE_URL}/#adira`,
          name: "PT Adira Dinamika Multi Finance, Tbk",
        },
        areaServed: {
          "@type": "City",
          name: CABANG.kota,
          containedInPlace: { "@type": "State", name: CABANG.provinsi },
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero putih, alamat lengkap sebagai satu baris besar — bukan kartu,
          bukan pelat, supaya tidak mengulang bentuk Ciputat atau Pasar Baru. */}
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
              <li aria-current="page">Harapan Indah, Bekasi</li>
            </ol>
          </nav>

          <p className="mt-8 text-base lg:text-lg font-semibold uppercase text-primary">
            Kecamatan {CABANG.kecamatan} &middot; {CABANG.kota}
          </p>
          <h1 className="mt-3 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Harapan Indah
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-title_black font-medium max-w-200">{ALAMAT_SATU_BARIS}</p>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            Itu alamat lengkapnya. Di bawah, tiap bagian alamat itu dijelaskan satu per satu &mdash; termasuk kenapa
            yang tertulis Medan Satria, padahal yang Anda cari Harapan Indah. Setelah itu cara gadai BPKB motor atau
            mobil lewat cabang ini.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a className="button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              Tanya Lewat WhatsApp
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href="#anatomi">
              Bedah alamatnya
            </a>
          </div>
        </div>
      </section>

      {/* Anatomi alamat — tulang punggung halaman ini. */}
      <section className="section-spacing-lg-md bg-background" id="anatomi">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Bagian per bagian
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Membaca alamatnya biar tidak salah tempat
            </h2>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <ol className="border-t border-border">
              {anatomi.map((a) => (
                <li className="border-b border-border py-5" key={a.label}>
                  <p className="text-sm uppercase tracking-wide text-paragraph_black">{a.label}</p>
                  <p className="mt-1 text-xl font-semibold text-title_black">{a.nilai}</p>
                  <p className="mt-2 text-paragraph_black">{a.catatan}</p>
                </li>
              ))}
            </ol>

            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.nama} tautanPeta={PETA_URL} />

              <div className="mt-8 p-5 sm:p-6 bg-white border border-border rounded-2xl">
                <h3 className="text-title_black text-xl font-semibold leading-tight">Telepon kantor cabang</h3>
                <ul className="mt-3 flex flex-col gap-1">
                  {CABANG.telepon.map((n) => (
                    <li key={n}>
                      <a className="text-title_black text-xl font-semibold" href={`tel:${n.replace(/-/g, "")}`}>
                        {n}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-paragraph_black">
                  Dua nomor, tanpa faks &mdash; begitu tercatat di data cabang. Keduanya milik kantor cabang. WhatsApp{" "}
                  {AGEN.waTampilan} adalah nomor kami sebagai agen, bukan nomor cabang.
                </p>
              </div>

              <div className="mt-6 p-5 sm:p-6 border-2 border-dashed border-border rounded-2xl">
                <h3 className="text-title_black text-base font-semibold leading-tight">
                  Kenapa Harapan Indah tidak ada di daftar kecamatan
                </h3>
                <p className="mt-2 text-paragraph_black">
                  Kota Bekasi punya {KECAMATAN_KOTA_BEKASI.length} kecamatan: {KECAMATAN_KOTA_BEKASI.join(", ")}.
                  Harapan Indah tidak termasuk &mdash; itu nama kawasan dan nama boulevardnya, bukan nama wilayah
                  administratif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cabang lain di sekitar, dipilah Bekasi vs Jakarta. */}
      <section className="section-spacing-lg-md" id="sekitar">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Di sekitar sini
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Dari sini, beberapa cabang Jakarta justru lebih dekat
            </h2>
            <p className="mt-4 text-paragraph_black">
              Harapan Indah ada di sisi barat laut Kota Bekasi, dekat perbatasan Jakarta. Jadi kalau diukur lurus,
              kantor Adira di Jakarta Utara lebih dekat daripada dua kantor lain yang sekota dengan cabang ini. Cabang
              mana yang memproses pengajuan tetap ditentukan Adira Finance; daftar ini sekadar gambaran jarak.
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Arah Jakarta</p>
              <ul className="mt-3 border-t border-b border-border divide-y">
                {ARAH_JAKARTA.map((c) => (
                  <li className="flex items-center justify-between gap-4 py-3" key={c.nama}>
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
                    <span className="text-paragraph_black whitespace-nowrap">
                      {String(c.km).replace(".", ",")} km
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Kawasan Bekasi</p>
              <ul className="mt-3 border-t border-b border-border divide-y">
                {KAWASAN_BEKASI.map((c) => (
                  <li className="flex items-center justify-between gap-4 py-3" key={c.nama}>
                    <span className="text-title_black font-semibold">
                      {c.href ? (
                        <Link className="underline hover:text-primary" href={c.href}>
                          {c.nama}
                        </Link>
                      ) : (
                        c.nama
                      )}
                      <span className="block text-paragraph_black font-normal">
                        Kec. {c.kecamatan}, {c.wilayah}
                      </span>
                    </span>
                    <span className="text-paragraph_black whitespace-nowrap">
                      {String(c.km).replace(".", ",")} km
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-4 text-sm text-paragraph_black max-w-175">
            Jarak lurus di peta dari {CABANG.jalan}; jarak tempuh lebih panjang. Dua entri lain di data kami,{" "}
            {ANOMALI_CIKARANG.map((a) => a.nama).join(" dan ")}, sengaja tidak dimasukkan: koordinat keduanya jatuh di
            barat Tambun (bujur {String(ANOMALI_CIKARANG[0].bujur).replace(".", ",")} dan{" "}
            {String(ANOMALI_CIKARANG[1].bujur).replace(".", ",")}) padahal Tambun sendiri ada di bujur{" "}
            {String(BUJUR_TAMBUN).replace(".", ",")} &mdash; Cikarang seharusnya di timur Tambun, bukan di baratnya.
            Kalau daftar ini diurut mentah, salah satunya akan muncul sebagai cabang terdekat di{" "}
            {String(ANOMALI_CIKARANG[0].kmSemu).replace(".", ",")} km, dan itu keliru.
          </p>
        </div>
      </section>

      {/* Gadai BPKB — ringkas, menautkan ke halaman kanonik. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Gadai BPKB lewat cabang ini
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Motor dan mobil, kendaraannya tetap Anda pakai
              </h2>
              <p className="mt-4 text-paragraph_black">
                Yang dijaminkan BPKB-nya, bukan kendaraannya. Untuk BPKB mobil, NPWP ikut diminta; untuk motor tidak.
                Selain itu berkasnya sama: eKTP, Kartu Keluarga, bukti penghasilan, dan bukti tempat tinggal.
              </p>
              <p className="mt-4 text-paragraph_black">
                Selain gadai BPKB, cabang Adira juga melayani take over dari leasing lain, top up pinjaman berjalan,
                dan kredit kendaraan bekas. Penjelasan tiap produknya ada di{" "}
                <Link className="text-primary font-semibold underline" href="/#layanan">
                  halaman layanan
                </Link>
                , dan perkiraan angkanya bisa Anda hitung di{" "}
                <Link className="text-primary font-semibold underline" href="/simulasi">
                  simulasi angsuran
                </Link>
                .
              </p>
            </div>

            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              {/* Kata-katanya sengaja berbeda dari halaman cabang lain.
                  Pengukuran 2026-09-22 menunjukkan langkah 1-3 yang hampir
                  seragam menyumbang blok identik antar-halaman. */}
              <h3 className="text-title_black text-xl font-semibold leading-tight">Cukup sekali ke boulevard</h3>
              <ol className="mt-4 flex flex-col gap-3 text-paragraph_black">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold shrink-0">1.</span>
                  <span className="flex-1">
                    Semuanya mulai dari chat. Foto BPKB, STNK, dan eKTP saja dulu &mdash; belum perlu ke mana-mana.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold shrink-0">2.</span>
                  <span className="flex-1">
                    Setelah kami cek dan hasilnya memungkinkan, petugas Adira menjadwalkan waktu melihat kendaraannya.
                    Anda tinggal menyiapkan berkas seperti di{" "}
                    <Link className="text-primary font-semibold underline" href="/#persyaratan">
                      daftar persyaratan
                    </Link>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold shrink-0">3.</span>
                  <span className="flex-1">
                    Kedatangan ke kantor baru di tahap akhir: penandatanganan dan penyerahan BPKB, lalu dananya
                    dicairkan. Rinciannya di{" "}
                    <Link className="text-primary font-semibold underline" href="/#alur">
                      alur pengajuan
                    </Link>
                    .
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Penutup. */}
      <section className="py-14 md:py-20" id="ajukan">
        <div className="container">
          <div className="max-w-200">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
              Alamatnya sudah pasti? Tinggal kirim foto BPKB-nya
            </h2>
            <p className="mt-4 text-paragraph_black">
              Sebutkan kecamatan Anda biar kami arahkan ke cabang yang paling masuk akal. {PERNYATAAN_OJK}
            </p>
            <p className="mt-4 text-sm text-paragraph_black">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-title_black">{AGEN.id}</strong>. Nomor kantor cabang ada di bagian{" "}
              <a className="text-primary font-semibold underline" href="#anatomi">
                bagian per bagian
              </a>
              .
            </p>
            <div className="mt-8">
              <a className="button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
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
