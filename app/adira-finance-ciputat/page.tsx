import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  CABANG_SEKITAR,
  JALAN_SEKITAR,
  KECAMATAN_TANGSEL,
  PATOKAN,
  PETA_EMBED,
  PETA_URL,
  jarakTeks,
} from "@/lib/cabang-ciputat";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";

/**
 * Halaman cabang Adira Finance Ciputat – Tangerang Selatan.
 *
 * Bentuknya SENGAJA berbeda dari dua halaman cabang sebelumnya. Alam Sutera
 * berpusat pada lokasi (kartu alamat → Tangerang/Tangsel → kecamatan → cabang
 * terdekat → tanya-jawab). Sawangan berpusat pada proses (hero gelap → empat
 * tahap → fakta → tabel Depok → dokumen). Halaman ini berpusat pada
 * KEDATANGAN: keempat kueri sasarannya informasional, dan salah satunya
 * literal "alamat adira finance ciputat" — jadi alamatnya jadi objek utama,
 * disusul patokan dengan jarak terukur, dua kekeliruan penamaan yang khas
 * Ciputat, baru peta dan telepon. Urutan, komponen, dan kalimatnya ditulis
 * dari nol; `scripts/cek-doorway.mjs` yang memutuskan lolos-tidaknya.
 *
 * Aturan yang tetap sama di semua halaman cabang (SKILL.md §8):
 * boilerplate nasional tidak disalin — cukup tautan ke halaman kanonik;
 * nomor WhatsApp agen tidak pernah tampil sebagai nomor cabang; tidak ada
 * fakta yang belum diverifikasi (jam buka, blok ruko, arah belok).
 */

const JUDUL = "Adira Finance Ciputat, Tangerang Selatan — Alamat & Patokan";
const DESKRIPSI = `Alamat Adira Finance cabang Ciputat: ${CABANG.kompleks}, ${CABANG.jalan}, Kec. ${CABANG.kecamatan}, ${CABANG.kota}, ${CABANG.provinsi} — patokan dari Pasar Ciputat, telepon cabang, dan cara gadai BPKB lewat cabang ini.`;

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

const PESAN_WA = "Halo, saya mau tanya gadai BPKB lewat cabang Adira Ciputat, Tangerang Selatan";

/** Kelas padding tidak tersedia di CSS terkompilasi, jadi ukurannya inline. */
const pilKuning = { display: "inline-flex", padding: "12px 24px" } as const;

/** Batang jarak: 2,5 km = lebar penuh. Ukurannya inline karena tidak ada kelasnya. */
const JARAK_MAKS = 2500;

export default function CiputatPage() {
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
      // `provider` menunjuk Adira; halaman ini tidak memancarkan
      // Organization/LocalBusiness yang mengaku mengoperasikan kantornya.
      {
        "@type": "Service",
        "@id": `${SITE_URL}/${CABANG.slug}#layanan`,
        name: "Gadai BPKB mobil dan motor — cabang Ciputat, Tangerang Selatan",
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

      {/* Hero putih: alamatnya sendiri yang jadi pusat perhatian, ditata seperti
          kartu nama — bukan kuning (Alam Sutera), bukan hijau gelap (Sawangan). */}
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
              <li aria-current="page">Ciputat, Tangerang Selatan</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-base lg:text-lg font-semibold uppercase text-primary">
                Kecamatan {CABANG.kecamatan} &middot; {CABANG.kota} &middot; {CABANG.provinsi}
              </p>
              <h1 className="mt-3 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black">
                Alamat Adira Finance Ciputat
              </h1>
              <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
                Kantor Adira Finance cabang Ciputat ada di deretan ruko Ciputat LOT di Jl. Dewi Sartika, sekitar 650
                meter dari Pasar Ciputat. Halaman ini untuk Anda yang mau datang ke sana atau mau gadai BPKB mobil
                dan motor lewat cabang ini: alamat lengkapnya, patokan yang gampang dikenali, nomor telepon
                kantornya, dan apa yang perlu disiapkan sebelum berangkat.
              </p>
            </div>

            <address
              className="p-5 sm:p-6 md:p-8 bg-[#F8F5F2] border-2 border-dashed border-border rounded-2xl text-paragraph_black"
              style={{ fontStyle: "normal" }}
            >
              <span className="block text-sm font-semibold uppercase text-primary">Alamat kantor cabang</span>
              <strong className="block mt-3 text-2xl font-bold text-title_black leading-tight">{CABANG.namaDataset}</strong>
              <span className="block mt-4 text-lg text-title_black">{CABANG.kompleks}</span>
              <span className="block text-lg text-title_black">{CABANG.jalan}</span>
              <span className="block mt-1">
                {CABANG.rtRw}, Kel. {CABANG.kelurahan}
              </span>
              <span className="block">
                Kec. {CABANG.kecamatan}, {CABANG.kota}
              </span>
              <span className="block">
                {CABANG.provinsi} {CABANG.kodePos}
              </span>
              <span className="block mt-4 text-sm">
                Nama di Google Maps: <strong className="text-title_black">{CABANG.namaMaps}</strong>
              </span>
              <span className="block mt-6">
                <a
                  className="text-primary font-semibold underline"
                  href={PETA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buka titiknya di Google Maps
                </a>
              </span>
            </address>
          </div>
        </div>
      </section>

      {/* Patokan dengan jarak terukur — komponen yang tidak ada di halaman cabang lain. */}
      <section className="section-spacing-lg-md bg-background" id="patokan">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Patokan
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Kalau sudah lihat Pasar Ciputat, kantornya tinggal beberapa ratus meter
            </h2>
            <p className="mt-4 text-paragraph_black">
              Jarak di bawah diukur lurus di peta dari titik kantor, memakai data OpenStreetMap. Bukan jarak tempuh,
              jadi lewat jalan sebenarnya bisa lebih jauh. Kami tidak menulis arah belok karena itu belum kami cek
              sendiri di lapangan &mdash; pakai tautan peta di atas untuk rutenya.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            <ol className="lg:col-span-2 flex flex-col gap-5">
              {PATOKAN.map((p) => (
                <li key={p.nama}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-title_black font-semibold">
                      {p.nama}
                      <span className="text-paragraph_black font-medium"> &middot; {p.jenis}</span>
                    </span>
                    <span className="text-title_black font-semibold whitespace-nowrap">{jarakTeks(p.meter)}</span>
                  </div>
                  <div
                    className="mt-2 w-full bg-[#E5E5E5] rounded-full"
                    style={{ height: 6 }}
                    role="presentation"
                  >
                    <div
                      className="bg-secondary rounded-full"
                      style={{ height: 6, width: `${Math.min(100, (p.meter / JARAK_MAKS) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <div>
              <h3 className="text-title_black text-xl font-semibold leading-tight">Jalan besar di sekitarnya</h3>
              <ul className="mt-4 divide-y border-t border-b border-border">
                {JALAN_SEKITAR.map((j) => (
                  <li className="flex items-center justify-between gap-4 py-3" key={j.nama}>
                    <span className="text-title_black">{j.nama}</span>
                    <span className="text-paragraph_black whitespace-nowrap">{jarakTeks(j.meter)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-paragraph_black">
                Alamat resminya di Jl. Dewi Sartika; kantornya berada di dalam kompleks ruko, agak masuk dari
                jalan raya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dua kekeliruan penamaan yang khas Ciputat, disusun berdampingan. */}
      <section className="section-spacing-lg-md" id="jangan-keliru">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Supaya tidak salah tujuan
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Ciputat, bukan Ciputat Timur. Tangerang Selatan, bukan Jakarta.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Ada dua kecamatan bernama Ciputat</h3>
              <p className="mt-4 text-paragraph_black">
                {CABANG.kota} punya {KECAMATAN_TANGSEL.length} kecamatan, dan dua di antaranya memakai nama Ciputat:{" "}
                <strong className="text-title_black">Ciputat</strong> dan{" "}
                <strong className="text-title_black">Ciputat Timur</strong>. Kantor Adira ini masuk Kecamatan{" "}
                {CABANG.kecamatan}, di ruas Jl. Dewi Sartika dekat pasar. Kalau aplikasi peta Anda menampilkan
                &ldquo;Ciputat Timur&rdquo;, itu kecamatan sebelah &mdash; tempat kampus UIN Syarif Hidayatullah berada.
              </p>
              <p className="mt-4 text-sm text-paragraph_black">
                Ketujuh kecamatan Tangerang Selatan: {KECAMATAN_TANGSEL.join(", ")}. Ini pembagian administratif,
                bukan pembagian wilayah layanan Adira.
              </p>
            </div>

            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">
                Secara administratif ini Banten, walau terasa seperti Jakarta
              </h3>
              <p className="mt-4 text-paragraph_black">
                Ciputat hanya beberapa kilometer dari batas Jakarta Selatan, jadi banyak yang mengira cabang ini
                masuk Jakarta.
                Alamat resminya {CABANG.kota}, Provinsi {CABANG.provinsi}. Yang sering bikin bingung: cabang Adira
                terdekat berikutnya justru ada di Jakarta Selatan, yakni Pondok Indah Baru, sekitar{" "}
                {CABANG_SEKITAR[0].cabang[0].km} km dari sini.
              </p>
              <p className="mt-4 text-sm text-paragraph_black">
                Koordinat titik kantor: {CABANG.lintang}, {CABANG.bujur}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Peta dan telepon cabang. */}
      <section className="section-spacing-lg-md bg-background" id="peta">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.nama} tautanPeta={PETA_URL} />
            </div>
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Telepon
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Nomor kantor cabang Ciputat
              </h2>
              <ul className="mt-6 flex flex-col gap-2 text-lg">
                {CABANG.telepon.map((nomor) => (
                  <li key={nomor}>
                    <a className="text-primary font-semibold" href={`tel:${nomor.replace(/-/g, "")}`}>
                      {nomor}
                    </a>
                  </li>
                ))}
                <li className="text-paragraph_black">Fax {CABANG.fax}</li>
              </ul>
              <p className="mt-6 text-paragraph_black">
                Dua nomor di atas milik kantor cabang Adira. WhatsApp {AGEN.waTampilan} adalah nomor kami, agen yang
                memasarkan &mdash; bukan nomor cabang. Kalau mau bertanya soal pengajuan, ke nomor kami; kalau
                urusan kontrak yang sudah berjalan, langsung ke nomor cabang.
              </p>
              <p className="mt-4 text-sm text-paragraph_black">
                Jam buka kantor belum kami cantumkan karena belum kami pastikan sendiri. Telepon dulu sebelum
                datang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cabang sekitar dikelompokkan menurut kota asal pembaca — bukan tabel
          seperti Sawangan, bukan daftar lima teratas seperti Alam Sutera. */}
      <section className="section-spacing-lg-md" id="dari-mana">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Datang dari mana
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Ciputat ada di pertemuan empat kota, jadi cek dulu mana yang paling dekat
            </h2>
            <p className="mt-4 text-paragraph_black">
              Jarak lurus dari titik kantor Ciputat. Cabang mana yang memproses pengajuan Anda tetap ditentukan Adira
              Finance &mdash; daftar ini cuma supaya Anda tidak menempuh jarak yang tidak perlu.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CABANG_SEKITAR.map((k) => (
              <div className="p-5 sm:p-6 bg-white border border-border rounded-2xl" key={k.dari}>
                <h3 className="text-sm font-semibold uppercase text-primary">Dari {k.dari}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {k.cabang.map((c) => (
                    <li key={c.nama}>
                      {c.href ? (
                        <Link className="text-title_black font-semibold underline hover:text-primary" href={c.href}>
                          {c.nama}
                        </Link>
                      ) : (
                        <span className="text-title_black font-semibold">{c.nama}</span>
                      )}
                      <span className="block text-paragraph_black">{c.km} km</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pengajuan: pendek, semua uraiannya tinggal di halaman kanonik. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Gadai BPKB lewat cabang ini
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Tidak perlu ke ruko dulu untuk mulai
              </h2>
              <p className="mt-4 text-paragraph_black">
                Pengecekan awal gadai BPKB bisa dari rumah. Yang perlu datang ke Ciputat hanya tahap survei
                kendaraan dan tanda tangan &mdash; dan kendaraannya tetap Anda bawa pulang.
              </p>
            </div>
            <ul className="divide-y border-t border-b border-border">
              <li className="py-4 text-paragraph_black">
                Hitung dulu perkiraan dananya di{" "}
                <Link className="text-primary font-semibold underline" href="/simulasi">
                  simulasi angsuran
                </Link>
                . Plafon final ditetapkan Adira setelah survei.
              </li>
              <li className="py-4 text-paragraph_black">
                Kirim foto BPKB, STNK, dan eKTP lewat WhatsApp, dan sebutkan &ldquo;Ciputat&rdquo; supaya kami tahu
                cabang mana yang Anda tuju.
              </li>
              <li className="py-4 text-paragraph_black">
                Berkas yang dibawa saat survei ada di{" "}
                <Link className="text-primary font-semibold underline" href="/#persyaratan">
                  daftar persyaratan
                </Link>
                ; urutan lengkapnya di{" "}
                <Link className="text-primary font-semibold underline" href="/#alur">
                  alur pengajuan
                </Link>
                .
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Penutup terang dengan garis putus-putus, mengikat kembali ke kartu alamat di hero. */}
      <section className="py-14 md:py-20" id="ajukan">
        <div className="container">
          <div className="p-5 sm:p-6 md:p-8 bg-[#F8F5F2] border-2 border-dashed border-border rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black max-w-200">
              Mulai dari WhatsApp, surveinya di Ciputat
            </h2>
            <p className="mt-4 text-paragraph_black max-w-200">{PERNYATAAN_OJK}</p>
            <p className="mt-4 text-sm text-paragraph_black max-w-200">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-title_black">{AGEN.id}</strong>. Nomor cabang tercantum di bagian{" "}
              <a className="text-primary font-semibold underline" href="#peta">
                telepon
              </a>
              .
            </p>
            <div className="mt-8">
              <a
                className="items-center gap-2 rounded-full bg-secondary text-title_black font-semibold"
                style={pilKuning}
                href={waLink(PESAN_WA)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanya Lewat WhatsApp
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
