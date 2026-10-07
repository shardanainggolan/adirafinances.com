import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import { CABANG, NAMA_PT, NOMOR_TAJUR, PETA_EMBED, PETA_URL } from "@/lib/cabang-soleh-iskandar";
import { ADIRA, AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Soleh Iskandar – Bogor ("Cabang Bogor 3").
 *
 * Bentuk kesepuluh. Sembilan sebelumnya: lokasi, proses, cara sampai,
 * identitas, perbandingan, verifikasi pin, tanya-jawab, anatomi alamat,
 * ketersediaan kontak.
 *
 * Halaman ini dipimpin CATATAN PENGECEKAN. Saat data cabang ini diperiksa,
 * ternyata nomor telepon yang paling banyak beredar untuk Soleh Iskandar
 * adalah nomor Tajur (Bogor 1), dan koordinat di data cabang jatuh di
 * Kabupaten Bogor, 10 km dari jalannya. Hasil pengecekan itu informasi yang
 * tidak dimiliki halaman lain mana pun untuk cabang ini — jadi ia dijadikan
 * isi utama, bukan disembunyikan. Lihat `lib/cabang-soleh-iskandar.ts`.
 *
 * Kata kunci "Adira Finance" dan "pt Adira Finance" (istilah merek umum)
 * TIDAK dijadikan sasaran utama: halaman cabang milik agen tidak semestinya
 * bersaing dengan situs resmi merek untuk nama mereknya sendiri. Keduanya
 * dilayani dengan jujur — nama badan hukumnya dijelaskan dan ditautkan ke
 * /tentang.
 *
 * Aturan tetap (SKILL.md §8): boilerplate nasional hanya ditautkan; nomor
 * WhatsApp agen tidak pernah tampil sebagai nomor cabang; yang belum
 * diverifikasi tidak terbit.
 */

// Kata kunci navigasional di depan supaya tetap terbaca kalau judul dipotong
// di hasil pencarian. Versi pertama 93 karakter (dengan akhiran situs).
const JUDUL = "Adira Finance Soleh Iskandar (Bogor 3) — Alamat & Gadai BPKB";
const DESKRIPSI =
  "Alamat Adira Finance Soleh Iskandar, Bogor — di Google Maps tercatat Cabang Bogor 3. Hasil cek nomor telepon yang beredar, peta, dan cara gadai BPKB motor atau mobil.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Soleh Iskandar Bogor";

/** Tiga hal yang diperiksa sebelum halaman ini ditulis. */
const pengecekan = [
  {
    hal: "Nomor telepon",
    beredar: `${NOMOR_TAJUR.join(" dan ")} — banyak situs mencantumkannya sebagai nomor cabang Soleh Iskandar.`,
    hasil:
      "Itu nomor kantor Tajur, yang di Google Maps tercatat sebagai Bogor 1. Sumber direktori yang lebih lama mencantumkannya untuk Tajur. Karena itu kami tidak memasangnya di sini.",
  },
  {
    hal: "Titik peta",
    beredar: "Data cabang yang kami pegang menaruh titiknya di Tamansari, Kabupaten Bogor.",
    hasil:
      "Keliru sekitar 10 km. Jalan Sholeh Iskandar ada di Kedung Badak, Kota Bogor bagian utara. Peta di halaman ini memakai listing Google Maps cabangnya langsung, bukan titik itu.",
  },
  {
    hal: "Nomor alamat",
    beredar: "Data cabang tidak mencantumkan nomor rumah; satu situs menulis 476-A.",
    hasil: `Listing Google Maps cabang ini mencantumkan ${CABANG.jalan}, ${CABANG.ruko} — dan Waze menunjuk nomor yang sama. Itu yang kami pakai.`,
  },
];

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function SolehIskandarPage() {
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
      // mengaku mengoperasikan kantor ini, dan tidak ada `telephone` — nomor
      // cabangnya belum terkonfirmasi.
      {
        "@type": "Service",
        "@id": `${SITE_URL}/${CABANG.slug}#layanan`,
        name: "Gadai BPKB mobil dan motor — cabang Soleh Iskandar (Bogor 3), Kota Bogor",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: {
          "@type": "FinancialService",
          "@id": `${SITE_URL}/#adira`,
          name: NAMA_PT,
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

      {/* Hero gelap. Warna teks dipasang per elemen — CSS template menyetel
          warna h1/p/a di level elemen, jadi tidak diwariskan dari section. */}
      <section className="py-14 md:py-20 lg:py-24 bg-primary relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white">
              <li>
                <Link className="text-white hover:text-secondary" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Soleh Iskandar, Bogor</li>
            </ol>
          </nav>

          <p className="mt-8 text-base lg:text-lg font-semibold uppercase text-secondary">
            Cabang Bogor 3 &middot; {CABANG.kecamatan}, {CABANG.kota}
          </p>
          <h1 className="mt-3 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-white max-w-200">
            Adira Finance Soleh Iskandar, Bogor
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white max-w-175">
            Di Google Maps kantor ini tercatat sebagai{" "}
            <strong className="text-secondary">&ldquo;{CABANG.namaMaps}&rdquo;</strong>, di {CABANG.jalan}, kelurahan{" "}
            {CABANG.kelurahan}. Sebelum menulis halaman ini kami mengecek data cabangnya, dan ternyata ada yang keliru
            &mdash; termasuk nomor telepon yang paling banyak beredar. Hasilnya kami tulis apa adanya di bawah.
          </p>

          {/* Alamat lengkap di hero: kata kunci utamanya navigasional, jadi
              alamat tidak boleh menunggu sampai section keempat. Ditemukan
              saat audit kualitas 2026-10-07. */}
          <p className="mt-6 text-base sm:text-lg font-semibold text-white max-w-200">
            {CABANG.jalan}, {CABANG.ruko}, {CABANG.kelurahan}, {CABANG.kecamatan}, {CABANG.kota} {CABANG.kodePos}
            {" · "}
            <a className="text-secondary underline" href={PETA_URL} target="_blank" rel="noopener noreferrer">
              buka di Google Maps
            </a>
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              className="items-center gap-2 rounded-full bg-secondary text-title_black font-semibold"
              style={{ display: "inline-flex", padding: "12px 24px" }}
              href={waLink(PESAN_WA)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanya Lewat WhatsApp
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </a>
            <a className="text-white font-semibold underline hover:text-secondary" href="#sudah-dicek">
              Lihat hasil pengecekan
            </a>
          </div>
        </div>
      </section>

      {/* Catatan pengecekan — isi utama halaman. */}
      <section className="section-spacing-lg-md" id="sudah-dicek">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Sudah kami cek
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Tiga hal yang kami cek ulang sebelum menulis halaman ini
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kalau Anda sudah sempat mencari nomor cabang ini, kemungkinan besar yang Anda temukan adalah nomor di
              baris pertama. Dua baris lainnya soal data kami sendiri, yang ternyata perlu dibetulkan.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-6">
            {pengecekan.map((c) => (
              // Sel dipisah warna latar, bukan garis: CSS terkompilasi tidak
              // punya utilitas border responsif (md:border-t-0, md:border-l,
              // md:divide-x — semuanya tidak ada), jadi garis yang benar di
              // ponsel akan dobel di desktop. Warna bekerja di keduanya.
              <div
                className="grid md:grid-cols-3 border border-border rounded-2xl"
                style={{ overflow: "hidden" }}
                key={c.hal}
              >
                <div className="p-5 sm:p-6 bg-background">
                  <p className="text-title_black text-xl font-semibold leading-tight">{c.hal}</p>
                </div>
                <div className="p-5 sm:p-6 bg-white">
                  <p className="text-sm uppercase tracking-wide text-paragraph_black">Yang beredar</p>
                  <p className="mt-2 text-paragraph_black">{c.beredar}</p>
                </div>
                <div className="p-5 sm:p-6 bg-secondary">
                  <p className="text-sm uppercase tracking-wide text-title_black font-semibold">Hasil cek kami</p>
                  <p className="mt-2 text-title_black">{c.hasil}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bogor 1 vs Bogor 3 + nama PT. */}
      <section className="section-spacing-lg-md bg-background" id="bogor-3">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Kenapa disebut Bogor 3
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Bogor 1 di Tajur, Bogor 3 di Soleh Iskandar
              </h2>
              <p className="mt-4 text-paragraph_black">
                Dua kantor Adira di Kota Bogor punya nama listing bernomor di Google Maps. Yang di Tajur, Bogor
                Selatan, tercatat sebagai &ldquo;bogor 1&rdquo;; yang ini, di Tanah Sereal, tercatat sebagai
                &ldquo;Cabang Bogor 3&rdquo;. Keduanya terpisah sekitar 8,8 km, di ujung selatan dan utara kota.
              </p>
              <p className="mt-4 text-paragraph_black">
                Kantor mana yang memakai sebutan &ldquo;Bogor 2&rdquo;, tidak ada di data cabang kami &mdash; jadi
                tidak kami tebak. Kalau rumah Anda lebih dekat ke selatan kota, lihat juga{" "}
                <Link className="text-primary font-semibold underline" href="/adira-finance-tajur">
                  halaman cabang Tajur
                </Link>
                .
              </p>
            </div>

            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">
                &ldquo;PT Adira Finance&rdquo; itu nama resminya apa?
              </h3>
              <p className="mt-3 text-paragraph_black">
                Nama badan hukumnya <strong className="text-title_black">{NAMA_PT}</strong>; &ldquo;Adira Finance&rdquo;
                adalah nama dagangnya. Perusahaannya berizin dan diawasi Otoritas Jasa Keuangan. Sejarah dan profil
                lengkapnya ada di{" "}
                <Link className="text-primary font-semibold underline" href="/tentang">
                  halaman tentang Adira Finance
                </Link>
                .
              </p>
              <p className="mt-3 text-sm text-paragraph_black">
                Situs ini bukan situs resmi Adira. Kami agen AXI terdaftar yang memasarkan pembiayaannya; situs resmi
                perusahaannya adira.co.id.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alamat, peta, cara menghubungi. */}
      <section className="section-spacing-lg-md" id="alamat">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Alamat Adira Finance Soleh Iskandar
              </span>
              <address className="mt-4 text-paragraph_black">
                <strong className="block text-title_black text-xl">{CABANG.namaMaps}</strong>
                <span className="block mt-2">
                  {CABANG.jalan}, {CABANG.ruko}
                </span>
                <span className="block">
                  Kelurahan {CABANG.kelurahan}, Kecamatan {CABANG.kecamatan}
                </span>
                <span className="block">
                  {CABANG.kota}, {CABANG.provinsi} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-4">
                <a
                  className="text-primary font-semibold underline"
                  href={PETA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buka listing &ldquo;{CABANG.namaMaps}&rdquo; di Google Maps
                </a>
              </p>

              <div className="mt-8 border-l-2 border-primary pl-5">
                <h3 className="text-title_black text-base font-semibold leading-tight">Menghubungi cabang ini</h3>
                {CABANG.telepon.length > 0 ? (
                  <p className="mt-2 text-paragraph_black">
                    Telepon kantor cabang: {CABANG.telepon.join(", ")}.
                  </p>
                ) : (
                  <p className="mt-2 text-paragraph_black">
                    Nomor kantor cabang ini belum kami pasang sampai terkonfirmasi. Untuk gadai BPKB, mulai dari
                    WhatsApp kami di {AGEN.waTampilan} &mdash; itu nomor kami sebagai agen, bukan nomor cabang. Untuk
                    urusan kontrak yang sudah berjalan, layanan pelanggan resmi Adira di {ADIRA.telepon}.
                  </p>
                )}
              </div>
            </div>

            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.namaMaps} tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Gadai BPKB motor dan mobil — dua kolom, angka dari tabel referensi situs. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Soleh Iskandar
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Motor atau mobil, yang beda cuma dua hal
            </h2>
            <p className="mt-4 text-paragraph_black">
              Yang dijadikan jaminan BPKB-nya; kendaraannya tetap Anda pakai sehari-hari. Bedanya ada di besaran dana
              dan satu berkas tambahan.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Gadai BPKB motor</h3>
              <p className="mt-3 text-paragraph_black">
                Di tabel referensi kami, pinjamannya mulai {rupiah(motorMin)} sampai {rupiah(motorMaks)}. NPWP tidak
                diminta.
              </p>
            </div>
            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Gadai BPKB mobil</h3>
              <p className="mt-3 text-paragraph_black">
                Rentangnya jauh lebih lebar, {rupiah(mobilMin)} sampai {rupiah(mobilMaks)}, dan NPWP ikut diminta.
              </p>
            </div>
          </div>

          <p className="mt-6 text-paragraph_black max-w-175">
            Angka-angka itu gambaran, bukan penawaran &mdash; plafon final ditetapkan Adira setelah kendaraannya
            disurvei. Untuk perkiraan yang lebih dekat ke kendaraan Anda, pakai{" "}
            <Link className="text-primary font-semibold underline" href="/simulasi">
              simulasi angsuran
            </Link>
            . Berkas lainnya (eKTP, Kartu Keluarga, bukti penghasilan, bukti tempat tinggal) ada di{" "}
            <Link className="text-primary font-semibold underline" href="/#persyaratan">
              daftar persyaratan
            </Link>
            , dan urutannya di{" "}
            <Link className="text-primary font-semibold underline" href="/#alur">
              alur pengajuan
            </Link>
            . Ke kantor di Jl. Sholeh Iskandar baru perlu di tahap akhir, untuk tanda tangan dan serah terima BPKB.
          </p>
        </div>
      </section>

      {/* Penutup. */}
      <section className="py-14 md:py-20" id="ajukan">
        <div className="container">
          <div className="max-w-200 border-t border-dashed border-border pt-10">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
              Mulai dari foto BPKB, sebut &ldquo;Bogor 3&rdquo;
            </h2>
            <p className="mt-4 text-paragraph_black">{PERNYATAAN_OJK}</p>
            <p className="mt-4 text-sm text-paragraph_black">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-title_black">{AGEN.id}</strong>.
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
