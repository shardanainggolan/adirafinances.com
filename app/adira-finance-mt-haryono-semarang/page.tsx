import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import { CABANG, MT_HARYONO_LAIN, NAMA_PT, PATOKAN, PETA_EMBED, PETA_URL, TETANGGA } from "@/lib/cabang-mt-haryono-semarang";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance MT. Haryono – Kota Semarang.
 *
 * Bentuk kedua puluh dua. Dua puluh satu sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang.
 *
 * Halaman ini dipimpin SKEMA SATU ARAH: Jl. MT. Haryono di depan kantor satu
 * arah ke utara, Jl. Kompol Maksum sejajar satu arah ke selatan. Diagram SVG
 * kecil menunjukkannya, lalu langkah dari tiap arah. Lalu koreksi telepon
 * (nomor 0294 di data kami milik Kendal). Sumber di
 * `lib/cabang-mt-haryono-semarang.ts`.
 */

const JUDUL = "Adira Finance MT. Haryono Semarang — Alamat, Telepon & Arah";
const DESKRIPSI =
  "Adira Finance MT. Haryono di Jl. MT. Haryono No. 657A, Wonodri, Semarang Selatan. Jalannya satu arah ke utara: ini cara sampai ke kantor, teleponnya, dan cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira MT. Haryono Semarang";
const km = (n: number) => String(n).replace(".", ",");

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

/** Skema, bukan skala. Warna dari token template lewat currentColor. */
function SkemaSatuArah() {
  return (
    <svg
      viewBox="0 0 320 340"
      role="img"
      aria-label="Skema: Jalan MT. Haryono satu arah ke utara dengan kantor Adira di sisi kirinya, Jalan Kompol Maksum satu arah ke selatan di sebelah timurnya, keduanya bertemu di selatan kantor."
      className="text-primary"
      style={{ width: "100%", maxWidth: 360, height: "auto" }}
    >
      <defs>
        <marker id="panah" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
        </marker>
      </defs>
      <text x="160" y="16" textAnchor="middle" fontSize="12" fill="currentColor">
        UTARA (arah Simpang Lima)
      </text>
      <path d="M130 290 L130 40" stroke="currentColor" strokeWidth="4" fill="none" markerEnd="url(#panah)" />
      <path d="M230 40 L230 280 Q230 300 200 300 L150 300 Q130 300 130 290" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="10 6" />
      <path d="M230 90 L230 150" stroke="currentColor" strokeWidth="4" fill="none" markerEnd="url(#panah)" />
      <text x="122" y="70" textAnchor="end" fontSize="12" fill="currentColor">
        Jl. MT. Haryono
      </text>
      <text x="238" y="70" fontSize="12" fill="currentColor">
        Jl. Kompol
      </text>
      <text x="238" y="85" fontSize="12" fill="currentColor">
        Maksum
      </text>
      <rect x="20" y="150" width="96" height="44" rx="8" fill="currentColor" />
      <text x="68" y="169" textAnchor="middle" fontSize="12" fontWeight="600" fill="#ffffff">
        Kantor
      </text>
      <text x="68" y="185" textAnchor="middle" fontSize="12" fill="#ffffff">
        Adira No. 657A
      </text>
      <text x="160" y="322" textAnchor="middle" fontSize="12" fill="currentColor">
        titik temu, ±440 m di selatan kantor
      </text>
    </svg>
  );
}

export default function MtHaryonoPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang MT. Haryono, Semarang",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero kuning: alamat dan peringatan satu arah langsung di atas. */}
      <section className="py-14 md:py-20 lg:py-24 bg-secondary relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-title_black">
              <li>
                <Link className="text-title_black" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">MT. Haryono, Semarang</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance MT. Haryono Semarang
          </h1>
          <p className="mt-4 text-base sm:text-lg text-title_black max-w-175">
            {CABANG.jalan}, Wonodri, Semarang Selatan {CABANG.kodePos}. Sebelum berangkat, perlu tahu satu hal: jalan di
            depan kantor ini satu arah ke utara.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={`tel:${CABANG.telepon.replace(/-/g, "")}`}>
              Telepon {CABANG.telepon}
            </a>
            <a className="text-title_black font-semibold underline" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              atau tanya gadai BPKB lewat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Skema satu arah. */}
      <section className="section-spacing-lg-md" id="satu-arah">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Dua jalan sejajar, berlawanan arah
              </h2>
              <p className="mt-4 text-paragraph_black">
                Jl. MT. Haryono di depan kantor hanya bisa dilewati ke utara. Jl. Kompol Maksum, sekitar 200 meter di
                timurnya, hanya bisa dilewati ke selatan. Keduanya bertemu sekitar 440 meter di selatan kantor.
              </p>
              <h3 className="mt-8 text-title_black text-xl font-semibold leading-tight">Datang dari selatan</h3>
              <p className="mt-2 text-paragraph_black">
                Dari arah Pasar Wonodri, tinggal lurus di Jl. MT. Haryono ke utara. Kantor ada di sisi kiri jalan.
              </p>
              <h3 className="mt-6 text-title_black text-xl font-semibold leading-tight">Datang dari utara</h3>
              <p className="mt-2 text-paragraph_black">
                Dari arah Simpang Lima, Anda tidak bisa masuk lewat depan kantor. Ambil Jl. Kompol Maksum ke selatan,
                melewati Siloam Hospitals, sampai titik temu. Dari sana ada sambungan masuk ke Jl. MT. Haryono arah
                utara, lalu kantor di kiri.
              </p>
              <p className="mt-4 text-sm text-paragraph_black">
                Arah jalan dari OpenStreetMap dan cocok dengan panah di Google Maps. Aturan lalu lintas bisa berubah,
                jadi tetap ikuti rambu di lapangan. Skema ini tidak berskala.
              </p>
            </div>
            <div className="p-5 sm:p-6 bg-background rounded-2xl" style={{ display: "flex", justifyContent: "center" }}>
              <SkemaSatuArah />
            </div>
          </div>
        </div>
      </section>

      {/* Telepon + nama. */}
      <section className="section-spacing-lg-md bg-background" id="telepon">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Kalau melihat nomor 0294, itu bukan Semarang
              </h2>
              <p className="mt-4 text-paragraph_black">
                Banyak situs memasang {CABANG.teleponSalah} untuk cabang ini, termasuk data cabang yang kami pegang. Kode
                0294 bukan kode Semarang, dan di data kami nomor itu sama dengan nomor kantor Adira di Kendal.
              </p>
              <p className="mt-4 text-paragraph_black">
                Direktori alamatpenting.com mencatat alamat ini dengan telepon{" "}
                <strong className="text-title_black">{CABANG.telepon}</strong> dan faks{" "}
                <strong className="text-title_black">{CABANG.fax}</strong>, dengan nama &ldquo;{CABANG.namaDirektori}
                &rdquo;. Halaman itu tidak bertanggal, jadi kalau tidak tersambung, hubungi kami di WhatsApp{" "}
                {AGEN.waTampilan}. Itu nomor agen AXI, bukan nomor cabang.
              </p>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">{CABANG.jalan}</span>
                <span className="block">
                  Kel. {CABANG.kelurahan}, Kec. {CABANG.kecamatan}
                </span>
                <span className="block">
                  {CABANG.kota}, {CABANG.provinsi} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-4 text-paragraph_black">
                Di Google Maps kantornya bernama &ldquo;{CABANG.namaMaps}&rdquo; saja, dan ruas di utara kantor diberi
                label Jl. Mataram. Nama MT Haryono juga dipakai kantor Adira di {MT_HARYONO_LAIN.join(", ")}, jadi
                sertakan &ldquo;Semarang&rdquo; saat mencari.
              </p>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance MT. Haryono, Semarang" tautanPeta={PETA_URL} />
              <h3 className="mt-8 text-title_black text-xl font-semibold leading-tight">Patokan sekitar kantor</h3>
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
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Semarang
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance MT. Haryono
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kendaraan tetap Anda pakai, yang dipegang hanya BPKB-nya. Tabel referensi kami mencatat BPKB motor{" "}
              {rupiah(motorMin)}&ndash;{rupiah(motorMaks)}, tenor sampai {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]}{" "}
              bulan. Untuk BPKB mobil {rupiah(mobilMin)}&ndash;{rupiah(mobilMaks)}, tenor sampai{" "}
              {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, dan perlu NPWP. Jumlah yang disetujui diputuskan
              Adira setelah kendaraan dilihat.
            </p>
            <p className="mt-4 text-paragraph_black">
              Awalnya cukup foto BPKB, STNK, dan eKTP lewat WhatsApp supaya kelayakannya bisa dicek. Kalau layak, ada
              survei kendaraan, lalu tanda tangan dan serah terima BPKB di kantor cabang. Lihat{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                daftar persyaratan
              </Link>{" "}
              dan{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              Yang sering dicari sebagai &ldquo;PT Adira Finance Semarang&rdquo; atau &ldquo;PT Adira Finance MT.
              Haryono&rdquo; adalah kantor cabang dari {NAMA_PT}. Profilnya ada di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Adira Semarang + sekitar. */}
      <section className="section-spacing-lg-md bg-background" id="adira-semarang">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            Adira Finance Semarang dan sekitarnya
          </h2>
          <p className="mt-4 text-paragraph_black max-w-175">
            Di data kami, Kota Semarang yang punya 16 kecamatan ini hanya memuat dua kantor Adira: yang ini, dan kantor
            bernama &ldquo;Soekarno Hatta&rdquo; yang alamatnya justru di Jl. Supriyadi, Kalicari. Jangan tertukar dengan
            kantor Soekarno Hatta di Kendal.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TETANGGA.map((c) => (
              <li className="flex items-center justify-between gap-4 p-4 bg-white border border-border rounded-xl" key={c.nama + c.wilayah}>
                <span className="text-title_black font-semibold">
                  {c.nama}
                  <span className="block text-paragraph_black font-normal">{c.wilayah}</span>
                </span>
                <span className="text-paragraph_black whitespace-nowrap">{km(c.km)} km</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-paragraph_black max-w-175">
            Jarak lurus di peta. Cabang yang memproses pengajuan ditentukan Adira Finance.
          </p>
        </div>
      </section>

      {/* Penutup: kartu gelap di atas putih. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 bg-primary rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
                Tidak perlu memutar dulu untuk mulai
              </h2>
              <p className="mt-4 text-white">
                Pengecekan awal cukup lewat WhatsApp. Kirim foto BPKB, sebut &ldquo;MT. Haryono&rdquo;, dan pengajuan kami
                teruskan ke cabang yang tepat.
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
            </div>
            <div className="text-sm text-white">
              <p className="text-white">{PERNYATAAN_OJK}</p>
              <p className="mt-3 text-white">
                {DISCLOSURE_AGEN} Agen AXI: <strong className="text-secondary">{AGEN.nama}</strong> &middot; ID AXI:{" "}
                <strong className="text-secondary">{AGEN.id}</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
