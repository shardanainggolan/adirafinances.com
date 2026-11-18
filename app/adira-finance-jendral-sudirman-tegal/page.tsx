import type { Metadata } from "next";
import Link from "next/link";

import {
  CABANG,
  MANDALA,
  NAMA_PT,
  PANJANG_RUAS_M,
  PATOKAN,
  PETA_URL,
  SLAWI,
  SUMBER_ALAMATPENTING,
  SUMBER_MERGER,
} from "@/lib/cabang-jendral-sudirman-tegal";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Jendral Sudirman – Tegal.
 *
 * Bentuk ketiga puluh tiga. Tiga puluh dua sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama, garis waktu kawasan, daftar cek, bundaran
 * sebagai titik nol, matriks bukti, lembar ralat, naskah telepon, penampang
 * jalan, kotak pencarian, satu kecamatan dua kantor.
 *
 * Halaman ini dipimpin PESAN UNTUK DRIVER: kantor tidak punya listing Google,
 * jadi aplikasi ojek tidak akan menemukannya lewat nama. Yang diberikan:
 * pesan siap kirim berisi alamat + ruas jalan (±400 m, OSM). Tanpa peta
 * tersemat. Sumber di `lib/cabang-jendral-sudirman-tegal.ts`.
 */

const JUDUL = "Adira Finance Jendral Sudirman Tegal — Alamat 23/25, Telepon & Patokan";
const DESKRIPSI =
  "Adira Finance Jendral Sudirman di Jl. Jend. Sudirman No. 23/25, Randugunting, Kota Tegal. Tiga nomor telepon, patokan di ruas jalan yang cuma 400 m, dan cara gadai BPKB motor atau mobil.";

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

const PESAN_WA = "Halo, saya di Tegal dan mau gadai BPKB lewat Adira Jl. Sudirman";
const km = (n: number) => String(n).replace(".", ",");
const tel = (n: string) => `tel:${n.replace(/[^0-9]/g, "")}`;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function JendralSudirmanTegalPage() {
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
        name: "Gadai BPKB mobil dan motor — Adira Jl. Jend. Sudirman, Kota Tegal",
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
              <li aria-current="page">Jendral Sudirman, Tegal</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Jendral Sudirman Tegal
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            {CABANG.jalan}, {CABANG.rtRw}, Kelurahan {CABANG.kelurahan}, Kecamatan {CABANG.kecamatan}, {CABANG.kota}. Jl.
            Jend. Sudirman di Kota Tegal pendek, sekitar {PANJANG_RUAS_M} meter, jadi kantornya pasti di ruas itu.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={tel(CABANG.telepon[0])}>
              Telepon {CABANG.telepon[0]}
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href="#pesan-driver">
              naik ojek? salin pesan ini
            </a>
          </div>
        </div>
      </section>

      {/* Pesan untuk driver. */}
      <section className="section-spacing-lg-md bg-secondary" id="pesan-driver">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-title_black uppercase block">
                Naik ojek online
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Kirim alamatnya, jangan cuma nama kantornya
              </h2>
              <p className="mt-4 text-title_black">
                Kami tidak menemukan kantor ini di Google Maps, jadi aplikasi ojek kemungkinan besar juga tidak bisa
                mencarinya lewat nama &ldquo;Adira&rdquo;. Pasang titik jemput di Jl. Jend. Sudirman, lalu kirim pesan
                seperti contoh ini ke driver.
              </p>
              <a className="mt-6 inline-block text-title_black font-semibold underline" href={PETA_URL} target="_blank" rel="noopener noreferrer">
                Cari Jl. Jend. Sudirman No. 23 di Google Maps
              </a>
            </div>
            <div className="p-5 sm:p-6 bg-white rounded-3xl">
              <span className="block text-sm text-paragraph_black">Pesan ke driver</span>
              <div className="mt-3 p-4 bg-background rounded-2xl">
                <p className="text-title_black">
                  Pak/Mas, tujuan saya kantor <strong>Adira Finance</strong>, {CABANG.jalan}, Randugunting, Kota Tegal.
                  Jalannya pendek, antara ujung Jl. Mayjend Sutoyo dan Jl. P. Diponegoro. Terima kasih.
                </p>
              </div>
              <p className="mt-3 text-sm text-paragraph_black">
                Arah ruas menurut peta Google dan OpenStreetMap. Nomor rumah dari dua direktori daring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alamat, telepon, patokan. */}
      <section className="section-spacing-lg-md" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Tegal
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">
                  {CABANG.jalan}, {CABANG.rtRw}
                </span>
                <span className="block">
                  Kel. {CABANG.kelurahan}, Kec. {CABANG.kecamatan}, {CABANG.kota}
                </span>
              </address>
              <div className="mt-6 p-5 bg-background rounded-2xl">
                <span className="block text-sm text-paragraph_black">Telepon</span>
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
                <span className="block mt-1 text-sm text-paragraph_black">Faks {CABANG.fax}</span>
                <p className="mt-3 text-sm text-paragraph_black">
                  Ketiga nomor dan faksnya sama dengan yang tercatat di dua direktori daring, salah satunya{" "}
                  <a className="underline" href={SUMBER_ALAMATPENTING} target="_blank" rel="noopener noreferrer">
                    alamatpenting.com
                  </a>
                  . Keduanya tidak bertanggal. WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen, bukan nomor
                  cabang.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">Patokan di sekitar ruasnya</h2>
              <p className="mt-4 text-paragraph_black">
                Karena titik persis nomor 23/25 belum ada di peta, jarak di bawah diukur ke titik terdekat ruas Jl. Jend.
                Sudirman (OpenStreetMap), bukan ke pintu kantor.
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
            </div>
          </div>
        </div>
      </section>

      {/* Adira lain di Tegal. */}
      <section className="section-spacing-lg-md bg-background" id="adira-tegal">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Nama Adira lain yang muncul di sekitar Tegal
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kalau Anda mencari &ldquo;Adira Finance Tegal&rdquo; di Google Maps, dua tempat ini yang muncul. Keduanya bukan
              kantor Jl. Sudirman.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 max-w-200">
            <div className="p-5 sm:p-6 bg-white rounded-2xl">
              <span className="block text-sm text-paragraph_black">
                ±{km(MANDALA.km)} km ke {MANDALA.arah}
              </span>
              <a className="block mt-1 text-primary text-xl font-semibold underline" href={MANDALA.peta} target="_blank" rel="noopener noreferrer">
                {MANDALA.nama}
              </a>
              <p className="mt-2 text-paragraph_black">
                {MANDALA.alamat} ({MANDALA.ulasan} ulasan). Mandala Finance sudah digabung ke Adira, dengan Adira sebagai
                perusahaan penerima penggabungan (
                <a className="underline" href={SUMBER_MERGER} target="_blank" rel="noopener noreferrer">
                  Kontan, 1 Juli 2025
                </a>
                ).
              </p>
            </div>
            <div className="p-5 sm:p-6 bg-white rounded-2xl">
              <span className="block text-sm text-paragraph_black">
                ±{km(SLAWI.km)} km ke {SLAWI.arah}
              </span>
              <a className="block mt-1 text-primary text-xl font-semibold underline" href={SLAWI.peta} target="_blank" rel="noopener noreferrer">
                {SLAWI.nama}
              </a>
              <p className="mt-2 text-paragraph_black">
                {SLAWI.tempat}, di luar Kota Tegal. Bisa jadi pilihan kalau rumah Anda di wilayah kabupaten.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-paragraph_black max-w-175">Jarak lurus dari titik tengah ruas Jl. Jend. Sudirman.</p>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Tegal
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Tegal
            </h2>
            <p className="mt-4 text-paragraph_black">
              Yang &ldquo;digadaikan&rdquo; hanya BPKB-nya. Kendaraan tetap jalan seperti biasa. Patokan dari tabel referensi
              kami: BPKB motor {rupiah(motorMin)} sampai {rupiah(motorMaks)} (hingga{" "}
              {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan), BPKB mobil {rupiah(mobilMin)} sampai{" "}
              {rupiah(mobilMaks)} (hingga {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, plus NPWP). Berapa yang
              cair tetap diputuskan Adira sesudah surveinya.
            </p>
            <p className="mt-4 text-paragraph_black">
              Supaya perjalanan ke Jl. Sudirman cukup sekali: kirim dulu foto BPKB, STNK, dan eKTP untuk dicek. Setelah
              kendaraan disurvei dan pengajuan disetujui, baru datang untuk akad dan menyerahkan BPKB asli. Lihat{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                berkas yang perlu disiapkan
              </Link>{" "}
              dan{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                hitungan cicilan
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              Nama &ldquo;PT Adira Finance Tegal&rdquo; atau &ldquo;PT Adira Finance Jendral Sudirman&rdquo; mengacu ke
              kantor milik {NAMA_PT}.{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                Tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup: kartu gelap. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 bg-title_black rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">Mau tanya dulu sebelum ke kantor?</h2>
              <p className="mt-4 text-white">
                Tulis jenis kendaraan dan tahunnya lewat WhatsApp. Kami bantu cek kira-kira masuk atau tidak, sebelum Anda
                repot ke Jl. Sudirman.
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
