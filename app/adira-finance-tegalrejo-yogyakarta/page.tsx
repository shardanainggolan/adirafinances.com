import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  ITC,
  KOTA_YOGYA,
  NAMA_PT,
  PATOKAN,
  PETA_EMBED,
  PETA_URL,
  SUMBER_ALAMATPENTING,
  SUMBER_KETIKUS,
} from "@/lib/cabang-tegalrejo-yogyakarta";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Tegalrejo – Yogyakarta.
 *
 * Bentuk ketiga puluh dua. Tiga puluh satu sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama, garis waktu kawasan, daftar cek, bundaran
 * sebagai titik nol, matriks bukti, lembar ralat, naskah telepon, penampang
 * jalan, kotak pencarian.
 *
 * Halaman ini dipimpin SATU KECAMATAN, DUA KANTOR: panel terbelah "Kecamatan
 * Tegalrejo" — kiri Cokroaminoto (halaman ini), kanan ITC Jl. Magelang.
 * Sumber di `lib/cabang-tegalrejo-yogyakarta.ts`.
 */

const JUDUL = "Adira Finance Tegalrejo Yogyakarta — Alamat Cokroaminoto, Telepon & Peta";
const DESKRIPSI =
  "Adira Finance Tegalrejo di Jl. HOS Cokroaminoto, Kota Yogyakarta — dekat simpang Jl. Kyai Mojo. Telepon 0274-555085, beda dengan kantor ITC Jl. Magelang, dan cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya di Yogyakarta dan mau gadai BPKB lewat Adira Tegalrejo";
const km = (n: number) => String(n).replace(".", ",");
const tel = (n: string) => `tel:${n.replace(/[^0-9]/g, "")}`;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function TegalrejoYogyakartaPage() {
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
        name: "Gadai BPKB mobil dan motor — Adira Tegalrejo, Kota Yogyakarta",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero abu muda. */}
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
              <li aria-current="page">Tegalrejo, Yogyakarta</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Tegalrejo Yogyakarta
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            Di {CABANG.jalan}, Kecamatan {CABANG.kecamatan}, {CABANG.kota}: sisi barat jalan, sekitar 75 meter di
            selatan simpang Jl. Kyai Mojo.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={tel(CABANG.telepon[0].nomor)}>
              Telepon {CABANG.telepon[0].nomor}
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href={PETA_URL} target="_blank" rel="noopener noreferrer">
              atau buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Satu kecamatan, dua kantor. */}
      <section className="section-spacing-lg-md" id="dua-kantor">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Kecamatan Tegalrejo
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Satu kecamatan, dua kantor Adira
            </h2>
            <p className="mt-4 text-paragraph_black">
              &ldquo;Adira Tegalrejo&rdquo; bisa berarti dua tempat. Keduanya tercatat di Kecamatan Tegalrejo, tapi
              alamat dan nomornya berbeda, dan jaraknya sekitar {km(ITC.km)} km. Halaman ini untuk kantor di Jl. HOS
              Cokroaminoto.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 border border-border rounded-3xl overflow-hidden">
            <div className="p-6 sm:p-8 bg-secondary">
              <span className="inline-block px-3 py-1 rounded-full bg-white text-sm font-semibold text-title_black">
                Halaman ini
              </span>
              <h3 className="mt-4 text-title_black text-2xl font-bold leading-tight">Adira Jl. HOS Cokroaminoto</h3>
              <dl className="mt-4 grid gap-3 text-title_black">
                <div>
                  <dt className="text-sm">Nomor rumah</dt>
                  <dd className="font-semibold">
                    {CABANG.nomorData} di data kami dan direktori; {CABANG.nomorGoogle} di Google Maps
                  </dd>
                </div>
                <div>
                  <dt className="text-sm">Telepon</dt>
                  <dd className="font-semibold">{CABANG.telepon.map((t) => t.nomor).join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-sm">Posisi</dt>
                  <dd className="font-semibold">Sisi barat jalan, ±75 m di selatan simpang Jl. Kyai Mojo</dd>
                </div>
              </dl>
            </div>
            <div className="p-6 sm:p-8 bg-white">
              <span className="inline-block px-3 py-1 rounded-full bg-background text-sm font-semibold text-title_black">
                Kantor lain, ±{km(ITC.km)} km ke {ITC.arah}
              </span>
              <h3 className="mt-4 text-title_black text-2xl font-bold leading-tight">ITC Adira, Jl. Magelang</h3>
              <dl className="mt-4 grid gap-3 text-paragraph_black">
                <div>
                  <dt className="text-sm">Alamat</dt>
                  <dd className="font-semibold text-title_black">{ITC.alamat}</dd>
                </div>
                <div>
                  <dt className="text-sm">Telepon</dt>
                  <dd className="font-semibold text-title_black">
                    {ITC.telepon}{" "}
                    <span className="font-normal text-sm text-paragraph_black">
                      (
                      <a className="underline" href={SUMBER_KETIKUS} target="_blank" rel="noopener noreferrer">
                        ketikus.com, 2023
                      </a>
                      )
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm">Di Google Maps</dt>
                  <dd className="font-semibold text-title_black">&ldquo;{ITC.nama}&rdquo;</dd>
                </div>
              </dl>
              <a className="mt-5 inline-block text-primary font-semibold underline" href={ITC.peta} target="_blank" rel="noopener noreferrer">
                Lihat ITC di Google Maps
              </a>
            </div>
          </div>
          <p className="mt-4 text-sm text-paragraph_black max-w-175">
            Peta lama di data cabang kami menunjuk kantor ITC, padahal alamat dan nomornya milik kantor Cokroaminoto. Di
            halaman ini keduanya sudah kami pisahkan.
          </p>
        </div>
      </section>

      {/* Alamat, telepon, peta, patokan. */}
      <section className="section-spacing-lg-md bg-background" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Tegalrejo
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">
                  {CABANG.jalan} No. {CABANG.nomorData}
                </span>
                <span className="block">
                  Kel. {CABANG.kelurahan}, Kec. {CABANG.kecamatan}, {CABANG.kota} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-4 text-paragraph_black">
                Nomor {CABANG.nomorData} tertulis di data cabang kami dan di{" "}
                <a className="text-primary font-semibold underline" href={SUMBER_ALAMATPENTING} target="_blank" rel="noopener noreferrer">
                  alamatpenting.com
                </a>
                . Listing Google-nya (&ldquo;ADIRA FINANCE PT.&rdquo;) menulis No. {CABANG.nomorGoogle}. Kami belum bisa
                memastikan mana yang benar, jadi pakai patokan simpang Jl. Kyai Mojo saja.
              </p>

              <div className="mt-6 p-5 bg-white rounded-2xl">
                <ul className="grid gap-2">
                  {CABANG.telepon.map((t) => (
                    <li className="flex flex-wrap items-center justify-between gap-2" key={t.nomor}>
                      <a className="text-title_black font-semibold hover:text-primary whitespace-nowrap" href={tel(t.nomor)}>
                        {t.nomor}
                      </a>
                      <span className="text-sm text-paragraph_black">{t.sumber}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-paragraph_black">
                  Faks {CABANG.fax}. WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen, bukan nomor kantor cabang.
                </p>
              </div>

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
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance Tegalrejo, Yogyakarta" tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Adira di Kota Yogyakarta. */}
      <section className="section-spacing-lg-md" id="adira-yogyakarta">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Kantor Adira Finance lain di Kota Yogyakarta
            </h2>
            <p className="mt-4 text-paragraph_black">
              Selain dua kantor di Tegalrejo, Google Maps mencatat kantor Adira lain di kota ini. Jarak dihitung dari kantor
              Cokroaminoto.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {KOTA_YOGYA.map((k) => (
              <li className="p-5 border border-border rounded-2xl" key={k.nama}>
                <a className="block text-primary font-semibold underline" href={k.peta} target="_blank" rel="noopener noreferrer">
                  {k.nama}
                </a>
                <span className="block mt-1 text-paragraph_black">{k.alamat}</span>
                <span className="block mt-2 text-sm text-paragraph_black">
                  ±{km(k.km)} km ke {k.arah}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Yogyakarta
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Tegalrejo
            </h2>
            <p className="mt-4 text-paragraph_black">
              Gadai BPKB berarti meminjam dengan BPKB sebagai jaminan, sementara kendaraannya tetap Anda pakai. Menurut tabel
              referensi kami, BPKB motor bisa untuk pinjaman {rupiah(motorMin)}&ndash;{rupiah(motorMaks)} dengan tenor
              paling lama {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan. BPKB mobil{" "}
              {rupiah(mobilMin)}&ndash;{rupiah(mobilMaks)}, paling lama {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]}{" "}
              bulan, dan perlu NPWP. Nominal akhirnya ditetapkan Adira setelah survei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Tahap pertama tidak mengharuskan Anda keluar rumah: cukup foto tiga dokumen (BPKB, STNK, eKTP). Datang ke kantor
              baru diperlukan di tahap akhir, untuk akad dan menyerahkan BPKB asli, setelah kendaraan selesai disurvei. Rincian ada di{" "}
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
              &ldquo;PT Adira Finance Yogyakarta&rdquo; atau &ldquo;PT Adira Finance Tegalrejo&rdquo; tidak berdiri sendiri.
              Semuanya kantor dari {NAMA_PT}. Baca{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                profil Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup: kartu berbingkai. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 border border-border rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
                Dari Tegalrejo, Wirobrajan, atau Jetis
              </h2>
              <p className="mt-4 text-paragraph_black">
                Belum yakin harus ke Cokroaminoto atau ke Jl. Magelang? Tidak perlu memilih sendiri. Foto BPKB Anda cukup dikirim ke kami, nanti kami bantu arahkan.
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
