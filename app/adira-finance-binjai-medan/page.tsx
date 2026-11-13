import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  KANTOR_MEDAN,
  NAMA_PT,
  PATOKAN,
  PETA_EMBED,
  PETA_URL,
  SUMBER_2019,
} from "@/lib/cabang-binjai";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Binjai (dataset: "Binjai - Medan").
 *
 * Bentuk ketiga puluh satu. Tiga puluh sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama, garis waktu kawasan, daftar cek, bundaran
 * sebagai titik nol, matriks bukti, lembar ralat, naskah telepon, penampang
 * jalan.
 *
 * Halaman ini dipimpin KOTAK PENCARIAN: tiap kartu dibuka dengan kata yang
 * orang ketik ("Adira Binjai Medan", "Adira Finance Medan", "Adira Jl.
 * Sultan Hasanuddin", "PT Adira Finance Binjai"), lalu jawabannya.
 * Sumber di `lib/cabang-binjai.ts`.
 */

const JUDUL = "Adira Finance Binjai — Alamat Jl. Sultan Hasanuddin 12, Telepon & Peta";
const DESKRIPSI =
  "Adira Finance Binjai di Jl. Sultan Hasanuddin No. 12, Binjai Kota — 160 m dari Kantor Walikota Binjai. Telepon 061-8828880, peta, dan cara gadai BPKB motor atau mobil.";

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

const PESAN_WA = "Halo, saya di Binjai dan mau gadai BPKB lewat Adira";
const km = (n: number) => String(n).replace(".", ",");
const tel = (n: string) => `tel:${n.replace(/[^0-9]/g, "")}`;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

function Pencarian({ kata, children }: { kata: string; children: ReactNode }) {
  return (
    <li className="p-5 sm:p-6 bg-white rounded-2xl">
      <div className="flex items-center gap-3 px-4 py-3 border border-border rounded-full">
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="text-title_black font-semibold">{kata}</span>
      </div>
      <div className="mt-4 text-paragraph_black">{children}</div>
    </li>
  );
}

export default function BinjaiPage() {
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
        name: "Gadai BPKB mobil dan motor — Adira Binjai",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero putih. */}
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
              <li aria-current="page">Binjai</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Binjai
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            {CABANG.jalan}, {CABANG.kelurahan}, Kecamatan {CABANG.kecamatan}, {CABANG.kota} {CABANG.kodePos} &mdash;
            sekitar 160 meter dari Kantor Walikota Binjai.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={tel(CABANG.telepon)}>
              Telepon {CABANG.telepon}
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href={PETA_URL} target="_blank" rel="noopener noreferrer">
              atau buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Kotak pencarian. */}
      <section className="section-spacing-lg-md bg-secondary" id="pencarian">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Yang biasa diketik orang, dan jawabannya
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            <Pencarian kata="adira finance binjai medan">
              <p>
                Kantornya di <strong className="text-title_black">Kota Binjai</strong>, bukan di Kota Medan. Meski begitu, di
                direktori kantor Adira Sumatera Utara tahun 2019 kantor ini memang dicantumkan di bawah kelompok cabang Medan dengan nama &ldquo;cabang Medan 3 &ndash; Binjai&rdquo; (
                <a className="text-primary font-semibold underline" href={SUMBER_2019} target="_blank" rel="noopener noreferrer">
                  alamatelpon.com, 25 Februari 2019
                </a>
                ).
              </p>
            </Pencarian>
            <Pencarian kata="adira finance medan">
              <p>
                Kalau Anda tinggal di Kota Medan, kantor Binjai bukan satu-satunya pilihan. Di data cabang kami ada juga
                Adira {KANTOR_MEDAN.join(", ")}. Halaman ini khusus untuk kantor di Binjai.
              </p>
            </Pencarian>
            <Pencarian kata="adira jl sultan hasanuddin binjai">
              <p>
                Di jalan ini ada lebih dari satu perusahaan pembiayaan. Peta lama di data kami bahkan menunjuk Radana
                Finance, kantor lain di Jl. Sultan Hasanuddin. Yang benar milik Adira tercatat di Google Maps sebagai
                &ldquo;Adira Finance&rdquo; dan &ldquo;Kantor Adira Binjai&rdquo;: dua listing di titik yang sama, alamatnya
                No. 12, Kecamatan Binjai Kota.
              </p>
            </Pencarian>
            <Pencarian kata="pt adira finance binjai">
              <p>
                Bukan perusahaan tersendiri. Kantor Binjai adalah salah satu kantor {NAMA_PT}. Profilnya ada di{" "}
                <Link className="text-primary font-semibold underline" href="/tentang">
                  tentang Adira Finance
                </Link>
                .
              </p>
            </Pencarian>
          </ul>
        </div>
      </section>

      {/* Alamat, telepon, peta, patokan. */}
      <section className="section-spacing-lg-md" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Binjai
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">{CABANG.jalan}</span>
                <span className="block">
                  {CABANG.kelurahan}, Kec. {CABANG.kecamatan}, {CABANG.kota} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-4 text-paragraph_black">
                Telepon{" "}
                <a className="text-title_black font-semibold hover:text-primary whitespace-nowrap" href={tel(CABANG.telepon)}>
                  {CABANG.telepon}
                </a>
                , faks {CABANG.fax}. Nomor ini sama dengan yang tercatat di direktori tahun 2019 tadi. WhatsApp{" "}
                {AGEN.waTampilan} adalah nomor kami sebagai agen, bukan nomor kantor cabang.
              </p>

              <h3 className="mt-8 text-title_black text-xl font-semibold leading-tight">Patokan</h3>
              <ul className="mt-3 border-t border-border">
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
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance Binjai" tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Binjai
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Binjai
            </h2>
            <p className="mt-4 text-paragraph_black">
              Pada gadai BPKB, yang dijaminkan suratnya saja. Motor atau mobil tetap Anda bawa pulang. Tabel referensi kami
              untuk BPKB motor mulai {rupiah(motorMin)} hingga {rupiah(motorMaks)}, dengan tenor sampai{" "}
              {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan. Untuk BPKB mobil mulai {rupiah(mobilMin)} hingga{" "}
              {rupiah(mobilMaks)}, tenor sampai {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, dan NPWP ikut
              disertakan. Jumlah yang disetujui ditentukan Adira setelah survei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Langkah pertamanya bisa dari rumah: foto BPKB, STNK, dan eKTP dikirim lewat WhatsApp untuk dicek. Setelah itu
              survei kendaraan, lalu tanda tangan dan serah terima BPKB di kantor cabang. Baca{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                persyaratannya
              </Link>{" "}
              atau coba{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">Situs ini dikelola agen pemasar Adira, bukan oleh Adira.</p>
          </div>
        </div>
      </section>

      {/* Penutup: kartu gelap. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 bg-title_black rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">Dari Binjai dan sekitarnya</h2>
              <p className="mt-4 text-white">
                Kirim foto BPKB dan sebut kecamatan Anda. Pengajuan kami teruskan ke kantor Adira yang memprosesnya.
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
