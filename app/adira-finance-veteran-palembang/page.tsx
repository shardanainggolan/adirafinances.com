import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import { BASUKI_RAHMAT, CABANG, NAMA_PT, PATOKAN, PETA_EMBED, PETA_URL } from "@/lib/cabang-veteran-palembang";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Veteran – Palembang.
 *
 * Bentuk kedua puluh lima. Dua puluh empat sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama, garis waktu kawasan.
 *
 * Halaman ini dipimpin DAFTAR CEK SEBELUM BERANGKAT: empat kotak centang,
 * masing-masing satu jebakan nyata di cabang ini — dua listing Google bernama
 * "Palembang 1", patokan simpang Jl. Rajawali, nomor telepon yang baru
 * bersumber satu (data kami), dan dokumen yang dibawa. Sumber di
 * `lib/cabang-veteran-palembang.ts`.
 */

const JUDUL = "Adira Finance Veteran Palembang — Alamat, Telepon & Lokasi";
const DESKRIPSI =
  "Adira Finance Veteran di Ruko Rajawali, Jl. Veteran No. 993, 9 Ilir, Palembang — dekat simpang Jl. Rajawali. Bedanya dengan kantor Basuki Rahmat, telepon, dan cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Veteran Palembang";
const km = (n: number) => String(n).replace(".", ",");

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

/** Kotak centang dekoratif; daftar tetap dibaca sebagai daftar biasa. */
function Kotak() {
  return (
    <span
      aria-hidden="true"
      className="border border-primary bg-white"
      style={{ display: "inline-block", width: 22, height: 22, borderRadius: 4, flexShrink: 0, marginTop: 2, borderWidth: 2 }}
    />
  );
}

export default function VeteranPalembangPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Veteran, Palembang",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero abu muda: alamat + patokan simpang Rajawali. */}
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
              <li aria-current="page">Veteran, Palembang</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Veteran Palembang
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            {CABANG.kompleks}, {CABANG.jalan}, 9 Ilir, Ilir Timur II, Palembang. Kantornya di sisi utara Jl. Veteran, tak
            jauh di timur simpang Jl. Rajawali.
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

      {/* Daftar cek. */}
      <section className="section-spacing-lg-md" id="cek">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Sebelum berangkat
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Empat hal yang perlu dicek dulu
            </h2>
          </div>

          <ul className="mt-10 grid gap-4 max-w-200">
            <li className="flex gap-4 p-5 sm:p-6 bg-secondary rounded-2xl">
              <Kotak />
              <div>
                <h3 className="text-title_black text-xl font-semibold leading-tight">
                  Pastikan yang dituju &ldquo;Palembang 1&rdquo; yang benar
                </h3>
                <p className="mt-2 text-title_black">
                  Di Google Maps ada dua listing Adira yang sama-sama memakai label &ldquo;Palembang 1&rdquo;. Kantor ini
                  tertulis &ldquo;{CABANG.namaMaps}&rdquo; dengan alamat Ruko Rajawali, Jl. Veteran. Yang satunya, &ldquo;
                  {BASUKI_RAHMAT.namaMaps}&rdquo;, ada di {BASUKI_RAHMAT.alamat} &mdash; kantor lain, sekitar{" "}
                  {km(BASUKI_RAHMAT.km)} km ke barat laut. Lihat alamatnya, jangan hanya namanya.
                </p>
              </div>
            </li>
            <li className="flex gap-4 p-5 sm:p-6 bg-background rounded-2xl">
              <Kotak />
              <div>
                <h3 className="text-title_black text-xl font-semibold leading-tight">Patokannya simpang Jl. Rajawali</h3>
                <p className="mt-2 text-paragraph_black">
                  Jl. Rajawali bertemu Jl. Veteran persis di barat kantor &mdash; namanya sama dengan nama kompleks
                  di alamat kantor, jadi mudah diingat. Kampus STMIK-STIE Multi Data Palembang ada sekitar 260 meter dari kantor, Gereja dan SD Maranatha
                  sekitar 220 meter.
                </p>
              </div>
            </li>
            <li className="flex gap-4 p-5 sm:p-6 bg-background rounded-2xl">
              <Kotak />
              <div>
                <h3 className="text-title_black text-xl font-semibold leading-tight">Telepon dulu</h3>
                <p className="mt-2 text-paragraph_black">
                  Nomor kantor di data cabang kami {CABANG.telepon}, faks {CABANG.fax}. Kami belum menemukan sumber
                  independen yang mengonfirmasinya &mdash; yang memuat nomor ini kebanyakan situs agen lain.
                  Kalau tidak tersambung, hubungi kami di WhatsApp {AGEN.waTampilan} (nomor agen AXI, bukan nomor cabang).
                </p>
              </div>
            </li>
            <li className="flex gap-4 p-5 sm:p-6 bg-background rounded-2xl">
              <Kotak />
              <div>
                <h3 className="text-title_black text-xl font-semibold leading-tight">Siapkan foto dokumennya</h3>
                <p className="mt-2 text-paragraph_black">
                  Pengecekan awal tidak perlu ke kantor: foto BPKB, STNK, dan eKTP cukup dikirim lewat WhatsApp. Ke kantor
                  baru diperlukan untuk tanda tangan dan serah terima BPKB. Daftar lengkapnya di{" "}
                  <Link className="text-primary font-semibold underline" href="/#persyaratan">
                    persyaratan
                  </Link>
                  .
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Alamat + patokan + peta. */}
      <section className="section-spacing-lg-md bg-background" id="alamat">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat Adira Finance Veteran
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">
                  {CABANG.kompleks}, {CABANG.jalan}
                </span>
                <span className="block">
                  Kel. {CABANG.kelurahan}, Kec. {CABANG.kecamatan}
                </span>
                <span className="block">
                  {CABANG.kota}, {CABANG.provinsi} {CABANG.kodePos}
                </span>
              </address>
              <h3 className="mt-8 text-title_black text-xl font-semibold leading-tight">Patokan di Palembang</h3>
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
              <p className="mt-3 text-sm text-paragraph_black">Jarak lurus dari titik kantor di Google Maps; posisi patokan dari OpenStreetMap.</p>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance Veteran, Palembang" tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Adira Palembang. */}
      <section className="section-spacing-lg-md" id="adira-palembang">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Adira Finance Palembang
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Dua kantor di Kota Palembang pada data kami
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kota Palembang punya 18 kecamatan. Di data cabang kami ada dua kantor Adira di dalamnya: Veteran di Ilir
              Timur II, dan Basuki Rahmat di Kemuning, sekitar 3 km dari sini. Kantor Adira lain di Sumatera Selatan pada
              data kami ada di luar kota, misalnya Prabumulih dan Sekayu.
            </p>
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Palembang
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Veteran
            </h2>
            <p className="mt-4 text-paragraph_black">
              Motor dan mobil tetap di tangan Anda selama pinjaman berjalan; yang dipegang hanya BPKB. Angka awal dari tabel
              referensi kami: untuk BPKB motor {rupiah(motorMin)} hingga {rupiah(motorMaks)}, tenor paling lama{" "}
              {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan; untuk BPKB mobil {rupiah(mobilMin)} hingga{" "}
              {rupiah(mobilMaks)}, tenor paling lama {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, plus NPWP.
              Keputusan akhirnya ada di Adira setelah kendaraan disurvei. Perkiraan cicilannya bisa dicoba di{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              Nama &ldquo;PT Adira Finance Palembang&rdquo; atau &ldquo;PT Adira Finance Veteran&rdquo; sebenarnya merujuk
              ke {NAMA_PT} &mdash; kantor Veteran salah satu cabangnya. Ringkasan perusahaannya ada di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Situs ini milik agen pemasar terdaftar, bukan situs Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup gelap dalam kartu. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="p-6 sm:p-8 md:p-10 bg-primary rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white max-w-200">
              Centang terakhir: kirim foto BPKB-nya
            </h2>
            <p className="mt-4 text-white max-w-175">
              Sebut &ldquo;Veteran Palembang&rdquo; saat menghubungi kami. Pengajuan Anda kami teruskan ke cabang yang tepat.
            </p>
            <div className="mt-6">
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
            <p className="mt-8 text-sm text-white">{PERNYATAAN_OJK}</p>
            <p className="mt-2 text-sm text-white">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-secondary">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-secondary">{AGEN.id}</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
