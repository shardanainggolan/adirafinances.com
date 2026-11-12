import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  NAMA_PT,
  PATOKAN,
  PETA_EMBED,
  PETA_URL,
  SEKITAR_CIREBON,
} from "@/lib/cabang-wahidin-cirebon";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Wahidin – Cirebon.
 *
 * Bentuk ketiga puluh. Dua puluh sembilan sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama, garis waktu kawasan, daftar cek, bundaran
 * sebagai titik nol, matriks bukti, lembar ralat, naskah telepon.
 *
 * Halaman ini dipimpin PENAMPANG JALAN: potongan melintang Jl. Dr. Wahidin
 * (barat → timur): jalur ke utara | median | jalur ke selatan | kantor.
 * Lalu: "di Google Maps yang muncul ATM-nya". Sumber di
 * `lib/cabang-wahidin-cirebon.ts`.
 */

const JUDUL = "Adira Finance Wahidin Cirebon — Alamat No. 57, Telepon & Peta";
const DESKRIPSI =
  "Adira Finance Wahidin di Jl. Dr. Wahidin Sudirohusodo No. 57, Sukapura, Kejaksan, Kota Cirebon — 500 m dari Stasiun Cirebon. Jalur masuk, telepon, dan cara gadai BPKB motor atau mobil.";

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

const PESAN_WA = "Halo, saya di Cirebon dan mau gadai BPKB lewat Adira Wahidin";
const km = (n: number) => String(n).replace(".", ",");
const tel = (n: string) => `tel:${n.replace(/[^0-9]/g, "")}`;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

/** Penampang barat → timur. */
const PENAMPANG: readonly { label: string; arah: string; gelap?: true; kuning?: true; sempit?: true }[] = [
  { label: "Jalur ke utara", arah: "↑" },
  { label: "Median", arah: "", sempit: true, gelap: true },
  { label: "Jalur ke selatan", arah: "↓" },
  { label: "Adira No. 57", arah: "", kuning: true },
];

export default function WahidinCirebonPage() {
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
        name: "Gadai BPKB mobil dan motor — Adira Wahidin, Kota Cirebon",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
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
                Wahidin, Cirebon
              </li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-white max-w-200">
            Adira Finance Wahidin Cirebon
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white max-w-175">
            {CABANG.jalan}, {CABANG.kelurahan}, Kecamatan {CABANG.kecamatan}, {CABANG.kota} {CABANG.kodePos}. Kantornya di
            sisi timur jalan, sekitar setengah kilometer dari Stasiun Cirebon.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={tel(CABANG.telepon[0])}>
              Telepon {CABANG.telepon[0]}
            </a>
            <a className="text-white font-semibold underline" href={PETA_URL} target="_blank" rel="noopener noreferrer">
              buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Penampang jalan. */}
      <section className="section-spacing-lg-md" id="jalur">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Masuk dari jalur mana
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Jl. Dr. Wahidin di depan kantor punya dua jalur terpisah
            </h2>
            <p className="mt-4 text-paragraph_black">
              Di OpenStreetMap, ruas ini dicatat sebagai dua jalan satu arah yang berdampingan: yang ke utara di sisi barat,
              yang ke selatan di sisi timur. Kantor Adira ada di sisi timur. Begini potongannya kalau dilihat dari atas,
              barat di kiri dan timur di kanan:
            </p>
          </div>

          <div className="mt-8 flex items-stretch gap-1 max-w-200" role="img" aria-label="Penampang jalan dari barat ke timur: jalur ke utara, median, jalur ke selatan, kantor Adira">
            {PENAMPANG.map((p) => (
              <div
                className={`flex flex-col items-center justify-center text-center p-3 rounded-xl ${
                  p.kuning ? "bg-secondary" : p.gelap ? "bg-title_black" : "bg-background border border-border"
                }`}
                style={{ flex: p.sempit ? "0 0 2.5rem" : "1 1 0", minHeight: "8rem" }}
                key={p.label}
              >
                {p.arah ? <span className="block text-3xl font-bold text-title_black leading-none">{p.arah}</span> : null}
                {p.sempit ? (
                  <span className="sr-only text-white">{p.label}</span>
                ) : (
                  <span className="block mt-2 text-sm font-semibold text-title_black">{p.label}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between max-w-200 text-sm text-paragraph_black">
            <span>Barat</span>
            <span>Timur</span>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 max-w-200">
            <div className="p-5 sm:p-6 bg-secondary rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Datang dari utara</h3>
              <p className="mt-2 text-title_black">
                Anda sudah di jalur yang ke selatan. Kantor ada di kiri, setelah Hotel Santika (Jl. Dr. Wahidin No. 32).
              </p>
            </div>
            <div className="p-5 sm:p-6 bg-background rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Datang dari selatan</h3>
              <p className="mt-2 text-paragraph_black">
                Dari arah Grage Mall Anda masuk jalur yang ke utara, dan kantor ada di seberang median. Anda perlu putar
                balik dulu untuk masuk ke jalur yang ke selatan.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-paragraph_black max-w-175">
            Arah jalur dari data OpenStreetMap. Ikuti rambu di lapangan.
          </p>
        </div>
      </section>

      {/* Alamat, telepon, peta. */}
      <section className="section-spacing-lg-md bg-background" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Cirebon
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">{CABANG.jalan}</span>
                <span className="block">
                  {CABANG.kelurahan}, Kec. {CABANG.kecamatan}, {CABANG.kota} {CABANG.kodePos}
                </span>
              </address>

              <div className="mt-6 p-5 bg-white rounded-2xl">
                <span className="block text-sm text-paragraph_black">Telepon (data cabang kami)</span>
                <span className="block mt-1">
                  {CABANG.telepon.map((n, i) => (
                    <span key={n}>
                      {i > 0 ? ", " : ""}
                      <a className="text-title_black font-semibold hover:text-primary whitespace-nowrap" href={tel(n)}>
                        {n}
                      </a>
                    </span>
                  ))}
                </span>
                <span className="block mt-1 text-sm text-paragraph_black">Faks {CABANG.fax.join(", ")}</span>
                <p className="mt-3 text-sm text-paragraph_black">
                  Nomor-nomor ini belum kami temukan di sumber lain, jadi belum bisa kami pastikan masih aktif. Nomor{" "}
                  {AGEN.waTampilan} adalah WhatsApp kami sebagai agen, bukan nomor kantor cabang.
                </p>
              </div>

              <h3 className="mt-8 text-title_black text-xl font-semibold leading-tight">
                Di Google Maps, yang muncul ATM-nya
              </h3>
              <p className="mt-2 text-paragraph_black">
                Cari &ldquo;Adira Cirebon&rdquo; dan yang keluar adalah &ldquo;{CABANG.namaMaps}&rdquo;. Alamatnya sama
                persis, No. 57, dan OpenStreetMap mencatat kantor Adira Finance di titik yang sama. Nomor 1 500 090 di
                listing itu adalah nomor layanan Danamon, bukan nomor cabang Adira.
              </p>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance Wahidin, Cirebon" tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Patokan. */}
      <section className="section-spacing-lg-md" id="patokan">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">Patokan di sekitarnya</h2>
              <p className="mt-4 text-paragraph_black">
                Kalau datang naik kereta, Stasiun Cirebon hanya sekitar 500 meter dari kantor.
              </p>
              <ul className="mt-6 border-t border-border">
                {PATOKAN.map((p) => (
                  <li className="flex items-start justify-between gap-4 py-2 border-b border-border" key={p.nama}>
                    <span className="text-title_black">
                      {p.nama}
                      <span className="block text-sm text-paragraph_black">ke {p.arah}</span>
                    </span>
                    <span className="text-paragraph_black whitespace-nowrap">±{km(p.km)} km</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-paragraph_black">Jarak lurus di peta (OpenStreetMap), bukan jarak tempuh.</p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Kantor Adira terdekat lainnya
              </h2>
              <p className="mt-4 text-paragraph_black">
                Di Kota Cirebon kami hanya menemukan kantor Wahidin ini di Google Maps. Dua kantor terdekat lainnya ada di
                luar kota:
              </p>
              <ul className="mt-6 grid gap-4">
                {SEKITAR_CIREBON.map((s) => (
                  <li className="flex items-center justify-between gap-4 p-4 border border-border rounded-xl" key={s.nama}>
                    <span>
                      <a className="block text-primary font-semibold underline" href={s.peta} target="_blank" rel="noopener noreferrer">
                        {s.nama}
                      </a>
                      <span className="block text-sm text-paragraph_black">{s.tempat}</span>
                    </span>
                    <span className="text-paragraph_black whitespace-nowrap">
                      ±{km(s.km)} km ke {s.arah}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Cirebon
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Wahidin
            </h2>
            <p className="mt-4 text-paragraph_black">
              BPKB motor atau mobil Anda jadi jaminan, sementara kendaraannya tetap dipakai sehari-hari. Di tabel referensi
              kami, pinjaman dengan BPKB motor ada di kisaran {rupiah(motorMin)} sampai {rupiah(motorMaks)}, tenor sampai{" "}
              {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan. Dengan BPKB mobil {rupiah(mobilMin)} sampai{" "}
              {rupiah(mobilMaks)}, tenor sampai {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, dan perlu NPWP.
              Keputusan akhirnya di Adira setelah kendaraan disurvei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Urutannya: foto BPKB, STNK, dan eKTP dikirim lewat WhatsApp untuk dicek dulu, lalu survei kendaraan, lalu
              tanda tangan dan serah terima BPKB di kantor. Lengkapnya di{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                persyaratan
              </Link>
              ; perkiraan cicilan di{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              &ldquo;PT Adira Finance Cirebon&rdquo; dan &ldquo;PT Adira Finance Wahidin&rdquo; sama-sama kantor dari{" "}
              {NAMA_PT}. Profil perusahaannya ada di{" "}
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
                Dari Kejaksan, Kesambi, atau Harjamukti
              </h2>
              <p className="mt-4 text-title_black">
                Kirim foto BPKB lewat WhatsApp dan sebut kecamatan Anda. Pengajuan kami teruskan ke cabang yang
                memprosesnya.
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
