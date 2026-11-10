import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  NAMA_PT,
  PATOKAN,
  PETA_EMBED,
  PETA_URL,
  RALAT,
  TANJUNGSARI,
} from "@/lib/cabang-mayor-abdurachman-sumedang";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Mayor Abdurachman – Sumedang.
 *
 * Bentuk kedua puluh delapan. Dua puluh tujuh sebelumnya: lokasi, proses,
 * cara sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama, garis waktu kawasan, daftar cek, bundaran
 * sebagai titik nol, matriks bukti.
 *
 * Halaman ini dipimpin LEMBAR RALAT: nama cabangnya benar, tapi alamat,
 * kecamatan, titik peta, dan kode pos di data kami menunjuk tempat lain.
 * Setiap baris: yang tertulis (dicoret) → temuan → sumbernya.
 * Sumber di `lib/cabang-mayor-abdurachman-sumedang.ts`.
 */

const JUDUL = "Adira Finance Mayor Abdurachman Sumedang — Alamat, Telepon & Peta";
const DESKRIPSI =
  "Adira Finance Mayor Abdurachman ada di Jl. Mayor Abdurahman, Kotakaler, Sumedang Utara — bukan di Jatisari. Peta, patokan, telepon, dan cara gadai BPKB motor atau mobil di Sumedang.";

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

const PESAN_WA = "Halo, saya di Sumedang dan mau gadai BPKB lewat Adira Mayor Abdurachman";
const km = (n: number) => String(n).replace(".", ",");
const tel = (n: string) => `tel:${n.replace(/[^0-9]/g, "")}`;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function MayorAbdurachmanSumedangPage() {
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
        name: "Gadai BPKB mobil dan motor — Adira Mayor Abdurachman, Sumedang",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: {
          "@type": "AdministrativeArea",
          name: CABANG.kabupaten,
          containedInPlace: { "@type": "State", name: CABANG.provinsi },
        },
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
              <li aria-current="page">Mayor Abdurachman, Sumedang</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Mayor Abdurachman Sumedang
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            Kantornya di {CABANG.jalan}, {CABANG.kelurahan}, Kecamatan {CABANG.kecamatan} &mdash; di kota Sumedang.
            Kalau Anda menemukan alamat &ldquo;Jl. Raya Bandung &ndash; Sumedang No. 170, Jatisari&rdquo; untuk cabang ini,
            itu bukan alamatnya. Rinciannya di bawah.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={tel(CABANG.telepon[0])}>
              Telepon {CABANG.telepon[0]}
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href={PETA_URL} target="_blank" rel="noopener noreferrer">
              atau buka lokasinya di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Lembar ralat. */}
      <section className="section-spacing-lg-md bg-background" id="ralat">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">Ralat</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Namanya benar, alamatnya yang keliru
            </h2>
            <p className="mt-4 text-paragraph_black">
              Data cabang yang kami pakai menulis nama &ldquo;Mayor Abdurachman&rdquo;, tapi alamat, kecamatan, dan titik
              petanya menunjuk tempat lain. Kami cocokkan satu per satu dengan Google Maps dan OpenStreetMap.
            </p>
          </div>

          <ul className="mt-10 grid gap-4">
            {RALAT.map((r) => (
              <li className="grid gap-3 md:grid-cols-3 p-5 sm:p-6 bg-white rounded-2xl" key={r.bagian}>
                <div>
                  <span className="block text-sm text-paragraph_black">{r.bagian} &middot; tertulis</span>
                  <span className="block mt-1 text-paragraph_black" style={{ textDecoration: "line-through" }}>
                    {r.tertulis}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-paragraph_black">Yang kami temukan</span>
                  <span className="block mt-1 text-title_black font-semibold">{r.temuan}</span>
                </div>
                <div>
                  <span className="block text-sm text-paragraph_black">Sumber</span>
                  <span className="block mt-1 text-title_black">{r.sumber}</span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-paragraph_black max-w-175">
            Lalu dari mana alamat Jatisari itu? Jatisari ada di Kecamatan Tanjungsari, dan di sana memang ada kantor Adira
            lain &mdash; lihat bagian bawah halaman ini. Nama jalannya sendiri ditulis dengan tiga ejaan: Abdurachman,
            Abdurahman, dan Abdurrahman (OpenStreetMap). Ketiganya jalan yang sama.
          </p>
        </div>
      </section>

      {/* Alamat, peta, patokan, cara masuk. */}
      <section className="section-spacing-lg-md" id="lokasi">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Sumedang
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">{CABANG.jalan}</span>
                <span className="block">
                  {CABANG.kelurahan}, Kec. {CABANG.kecamatan}, {CABANG.kabupaten}
                </span>
              </address>

              <p className="mt-4 text-paragraph_black">
                Jl. Mayor Abdurrahman di depan kantor <strong className="text-title_black">satu arah ke utara</strong>{" "}
                (OpenStreetMap). Kantor ada di sisi barat jalan, jadi di kiri Anda. Jl. Tampomas yang sejajar di
                timurnya satu arah ke selatan.
              </p>

              <div className="mt-6 p-5 bg-background rounded-2xl">
                <span className="block text-sm text-paragraph_black">Telepon (data cabang kami)</span>
                <span className="block mt-1">
                  {CABANG.telepon.map((n, i) => (
                    <span key={n}>
                      {i > 0 ? ", " : ""}
                      <a className="text-title_black font-semibold hover:text-primary" href={tel(n)}>
                        {n}
                      </a>
                    </span>
                  ))}
                </span>
                <span className="block mt-1 text-sm text-paragraph_black">Faks {CABANG.fax}</span>
                <p className="mt-3 text-sm text-paragraph_black">
                  Nomor ini belum kami temukan di sumber lain, jadi belum bisa kami pastikan masih aktif. Kalau tidak
                  tersambung, tanya lewat WhatsApp kami ({AGEN.waTampilan}) &mdash; itu nomor agen, bukan nomor kantor
                  cabang.
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
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance Mayor Abdurachman, Sumedang" tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Dua kantor di Kabupaten Sumedang. */}
      <section className="section-spacing-lg-md bg-secondary" id="adira-sumedang">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Adira Finance di Kabupaten Sumedang
            </h2>
            <p className="mt-4 text-title_black">
              Di data cabang kami ada dua kantor Adira di Kabupaten Sumedang. Kalau Anda tinggal di sisi Jatinangor atau
              Tanjungsari, kantor kedua lebih dekat.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 max-w-200">
            <div className="p-5 sm:p-6 bg-white rounded-2xl">
              <span className="block text-sm text-paragraph_black">Halaman ini</span>
              <span className="block mt-1 text-title_black text-xl font-semibold">{CABANG.nama}</span>
              <span className="block text-paragraph_black">
                {CABANG.kelurahan}, Kec. {CABANG.kecamatan}
              </span>
            </div>
            <div className="p-5 sm:p-6 bg-white rounded-2xl">
              <span className="block text-sm text-paragraph_black">
                ±{km(TANJUNGSARI.km)} km ke {TANJUNGSARI.arah}
              </span>
              <span className="block mt-1 text-title_black text-xl font-semibold">{TANJUNGSARI.nama}</span>
              <span className="block text-paragraph_black">{TANJUNGSARI.tempat}</span>
              <a className="mt-2 inline-block text-primary font-semibold underline" href={TANJUNGSARI.peta} target="_blank" rel="noopener noreferrer">
                Lihat di Google Maps
              </a>
            </div>
          </div>
          <p className="mt-6 text-sm text-title_black max-w-175">
            Jarak lurus antar-titik Google Maps. Kantor yang memproses pengajuan Anda ditentukan Adira Finance.
          </p>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Sumedang
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Sumedang
            </h2>
            <p className="mt-4 text-paragraph_black">
              Istilah &ldquo;gadai BPKB&rdquo; di sini maksudnya pinjaman dengan BPKB sebagai jaminan. Kendaraannya tidak
              ditahan. Menurut tabel referensi kami, BPKB motor bisa dimulai dari {rupiah(motorMin)} hingga{" "}
              {rupiah(motorMaks)} (tenor paling lama {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan), BPKB mobil
              dari {rupiah(mobilMin)} hingga {rupiah(mobilMaks)} (paling lama{" "}
              {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, dengan NPWP). Plafon akhirnya tetap keputusan Adira
              setelah survei kendaraan.
            </p>
            <p className="mt-4 text-paragraph_black">
              Mulainya tidak perlu ke kantor. Foto BPKB, STNK, dan eKTP dikirim dulu lewat WhatsApp untuk dicek. Survei
              kendaraan menyusul, dan baru tanda tangan serta serah terima BPKB yang dilakukan di kantor cabang. Lihat{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                daftar persyaratan
              </Link>{" "}
              atau hitung kira-kira cicilannya di{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              Yang orang sebut &ldquo;PT Adira Finance Sumedang&rdquo; adalah kantor dari {NAMA_PT}, bukan perusahaan
              terpisah. Profil singkatnya ada di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                halaman tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar Adira, bukan oleh Adira.
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
                Dari Sumedang kota sampai Tanjungsari
              </h2>
              <p className="mt-4 text-paragraph_black">
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
