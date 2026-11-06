import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  NAMA_PT,
  PATOKAN,
  PETA_EMBED,
  PETA_URL,
  TASIK_LAIN,
  TIGA_KECAMATAN,
} from "@/lib/cabang-juanda-tasikmalaya";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Juanda – Kota Tasikmalaya.
 *
 * Bentuk kedua puluh enam. Dua puluh lima sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama, garis waktu kawasan, daftar cek.
 *
 * Halaman ini dipimpin BUNDARAN SEBAGAI TITIK NOL: tiga langkah dari Bunderan
 * Bypass Mangkubumi (±200 m), lalu "satu alamat, tiga nama kecamatan", lalu
 * Kota vs Kabupaten untuk kata kunci "Adira Finance Tasikmalaya". Sumber di
 * `lib/cabang-juanda-tasikmalaya.ts`.
 */

const JUDUL = "Adira Finance Juanda Tasikmalaya — Alamat, Telepon & Patokan";
const DESKRIPSI =
  "Adira Finance Juanda di Komplek Ruko TFT, Jl. Ir. H. Juanda No. 18, Kota Tasikmalaya — sekitar 200 m dari Bunderan Bypass Mangkubumi. Telepon 0265-327525 dan cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Juanda Tasikmalaya";
const km = (n: number) => String(n).replace(".", ",");

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

const LANGKAH: readonly { judul: string; isi: string }[] = [
  {
    judul: "Cari Bunderan Bypass Mangkubumi",
    isi: "Bundaran di pertemuan jalan bypass; di Google Maps labelnya \"Bunderan Bypass Mangkubumi\". Jadikan ini tujuan pertama.",
  },
  {
    judul: "Keluar ke Jl. Ir. H. Juanda, arah utara",
    isi: "Dari bundaran, ambil jalan yang menuju utara. Di Google Maps jalan ini bernama Jl. Ir. H. Juanda.",
  },
  {
    judul: "Sekitar 200 meter, kantor di kiri",
    isi: "Kantor Adira ada di sisi barat jalan, di Komplek Ruko TFT. Dua ratus meter itu pendek; pelankan kendaraan begitu keluar dari bundaran.",
  },
];

export default function JuandaTasikmalayaPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Juanda, Kota Tasikmalaya",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero putih: alamat + bundaran. */}
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
              <li aria-current="page">Juanda, Tasikmalaya</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Juanda Tasikmalaya
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            {CABANG.kompleks}, {CABANG.jalan}, Kota Tasikmalaya {CABANG.kodePos}. Patokan paling mudah: sekitar 200 meter di
            utara Bunderan Bypass Mangkubumi.
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

      {/* Bundaran sebagai titik nol. */}
      <section className="section-spacing-lg-md bg-secondary" id="bundaran">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-title_black uppercase block">
              Titik nol: bundaran
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Tiga langkah dari Bunderan Bypass Mangkubumi
            </h2>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {LANGKAH.map((l, i) => (
              <li className="p-5 sm:p-6 bg-white rounded-2xl" key={l.judul}>
                <span className="block text-4xl font-bold text-title_black leading-none">{i + 1}</span>
                <h3 className="mt-3 text-title_black text-xl font-semibold leading-tight">{l.judul}</h3>
                <p className="mt-2 text-paragraph_black">{l.isi}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-title_black max-w-175">
            Jarak lurus bundaran–kantor ±200 meter (OpenStreetMap). Nama jalan mengikuti Google Maps; ikuti rambu di
            lapangan.
          </p>
        </div>
      </section>

      {/* Tiga kecamatan. */}
      <section className="section-spacing-lg-md" id="kecamatan">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Satu alamat, tiga nama kecamatan
            </h2>
            <p className="mt-4 text-paragraph_black">
              Jangan heran kalau sumber yang berbeda menyebut kecamatan yang berbeda. Kantor ini dekat pertemuan beberapa
              wilayah, dan alamatnya sendiri sudah menyebut dua kecamatan sekaligus.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {TIGA_KECAMATAN.map((k) => (
              <li className="p-5 bg-background rounded-2xl" key={k.kecamatan}>
                <span className="block text-sm text-paragraph_black">{k.sumber}</span>
                <span className="block mt-1 text-title_black text-xl font-semibold">Kec. {k.kecamatan}</span>
                <span className="block text-paragraph_black">Kel. {k.kelurahan}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-paragraph_black max-w-175">
            Kami tidak memastikan garis batasnya. Yang pasti, ketiganya kecamatan di <strong className="text-title_black">Kota</strong>{" "}
            Tasikmalaya &mdash; jadi kalau ada data yang menulis kantor ini di Kabupaten Tasikmalaya, itu keliru.
          </p>
        </div>
      </section>

      {/* Kontak + peta + patokan. */}
      <section className="section-spacing-lg-md bg-background" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Juanda
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">
                  {CABANG.kompleks}, {CABANG.jalan}
                </span>
                <span className="block">
                  {CABANG.kota}, {CABANG.provinsi} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-4 text-paragraph_black">
                Telepon {CABANG.telepon}, faks {CABANG.fax} &mdash; tercatat di dua direktori daring. Di Google Maps kantor
                ini bernama &ldquo;{CABANG.namaMaps}&rdquo; dan kompleksnya &ldquo;Ruko TFT&rdquo;; di direktori lama
                tertulis &ldquo;Ruko TST&rdquo;.
              </p>
              <p className="mt-4 text-paragraph_black">
                Nomor berawalan 0265 ini juga sering muncul di internet untuk{" "}
                <Link className="text-primary font-semibold underline" href="/adira-finance-cikuray-garut">
                  Adira Cikuray di Garut
                </Link>
                . Kemungkinan besar itu salah salin &mdash; kode 0265 milik Tasikmalaya, dan nomornya sama dengan kantor ini. WhatsApp {AGEN.waTampilan} adalah nomor
                kami sebagai agen AXI, bukan nomor cabang.
              </p>
              <h3 className="mt-8 text-title_black text-xl font-semibold leading-tight">Patokan</h3>
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
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance Juanda, Tasikmalaya" tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Adira Tasikmalaya: Kota vs Kabupaten. */}
      <section className="section-spacing-lg-md" id="adira-tasikmalaya">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Adira Finance Tasikmalaya
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Satu di Kota, dua di Kabupaten
            </h2>
            <p className="mt-4 text-paragraph_black">
              Di data cabang kami ada tiga kantor Adira bernama Tasikmalaya. Juanda satu-satunya yang di Kota Tasikmalaya
              (10 kecamatan); dua lainnya di Kabupaten.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 max-w-200">
            {TASIK_LAIN.map((c) => (
              <li className="flex items-center justify-between gap-4 p-4 border border-border rounded-xl" key={c.nama}>
                <span className="text-title_black font-semibold">
                  {c.nama}
                  <span className="block text-paragraph_black font-normal">{c.wilayah}</span>
                </span>
                <span className="text-paragraph_black whitespace-nowrap">
                  {km(c.km)} km ke {c.arah}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-paragraph_black max-w-175">
            Jarak lurus di peta. Cabang yang memproses pengajuan ditentukan Adira Finance.
          </p>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Tasikmalaya
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Juanda
            </h2>
            <p className="mt-4 text-paragraph_black">
              Pinjamannya dijamin BPKB; kendaraan tidak ikut ditahan. Kisaran di tabel referensi kami: BPKB motor{" "}
              {rupiah(motorMin)}&ndash;{rupiah(motorMaks)} dan BPKB mobil {rupiah(mobilMin)}&ndash;{rupiah(mobilMaks)}.
              Tenornya bisa sampai {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan untuk motor dan{" "}
              {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan untuk mobil; pengajuan mobil menyertakan NPWP. Angka
              finalnya ditetapkan Adira sesudah survei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Pengecekan awal cukup dengan foto BPKB, STNK, dan eKTP lewat WhatsApp. Setelah itu survei kendaraan, lalu
              tanda tangan serta serah terima BPKB di kantor cabang. Rincian ada di{" "}
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
              &ldquo;PT Adira Finance Tasikmalaya&rdquo; dan &ldquo;PT Adira Finance Juanda&rdquo; sama-sama merujuk ke{" "}
              {NAMA_PT}, nama yang juga dipakai listing Google kantor ini. Profilnya di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup: kartu berbingkai di atas putih. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 border border-border rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
                Dari Kota atau Kabupaten Tasikmalaya
              </h2>
              <p className="mt-4 text-paragraph_black">
                Kirim foto BPKB lewat WhatsApp dan sebut kecamatan Anda. Pengajuan diteruskan ke cabang yang tepat.
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
