import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  CABANG_DEPOK,
  CABANG_LUAR_DEPOK,
  KECAMATAN_DEPOK,
  PETA_EMBED,
  PETA_URL,
} from "@/lib/cabang-sawangan";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";

/**
 * Halaman cabang Adira Finance Sawangan – Depok.
 *
 * Bentuknya SENGAJA berbeda dari `/adira-finance-alam-sutera`: halaman itu
 * berpusat pada lokasi (alamat → kebingungan Tangerang/Tangsel → kecamatan →
 * cabang terdekat → tanya-jawab). Halaman ini berpusat pada PROSES — orang
 * yang mencarinya sedang ingin tahu cara menggadaikan BPKB lewat cabang ini,
 * bukan sekadar di mana kantornya. Urutan, komponen, dan kalimatnya ditulis
 * ulang dari nol. Dua halaman cabang yang berbagi cetakan adalah doorway
 * meski isinya beda; `scripts/cek-doorway.mjs` yang memutuskan lolos-tidaknya.
 *
 * Aturan yang tetap sama di semua halaman cabang (SKILL.md §8):
 * boilerplate nasional tidak disalin — cukup tautan ke halaman kanonik;
 * nomor WhatsApp agen tidak pernah tampil sebagai nomor cabang; tidak ada
 * fakta yang belum diverifikasi.
 */

const JUDUL = "Gadai BPKB di Adira Finance Sawangan, Depok — Cara & Alamat";
const DESKRIPSI = `Cara gadai BPKB mobil dan motor lewat cabang Adira Finance Sawangan, ${CABANG.jalan}, ${CABANG.kecamatan}, Depok — langkah, dokumen yang dibawa, dan telepon cabang.`;

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Sawangan Depok";

/**
 * Empat tahap yang sama dengan alur nasional (lihat `/#alur`), tetapi tiap
 * baris menyebut apa yang perlu dilakukan untuk CABANG INI — bukan salinan
 * teks alurnya.
 */
const langkah = [
  {
    judul: "Cek dulu perkiraan dana yang bisa cair",
    isi: (
      <>
        Pakai{" "}
        <Link className="text-primary font-semibold underline" href="/simulasi">
          simulasi angsuran
        </Link>{" "}
        untuk kendaraan Anda. Angkanya perkiraan; plafon final ditetapkan Adira setelah survei. Kalau cocok, lanjut
        ke WhatsApp dan sebutkan &ldquo;Sawangan&rdquo; supaya kami tahu cabang mana yang Anda tuju.
      </>
    ),
  },
  {
    judul: "Kirim foto BPKB, STNK, dan eKTP untuk pra-cek",
    isi: (
      <>
        Dari foto itu kami periksa dulu kelayakannya sebelum Anda repot ke mana-mana. Kalau area Anda memang paling
        dekat ke Jl. Raya Sawangan, pengajuannya kami teruskan ke tim cabang ini.
      </>
    ),
  },
  {
    judul: "Survei kendaraan dan lengkapi berkas",
    isi: (
      <>
        Jadwal survei diatur setelah pra-cek lolos. Siapkan dokumen pada daftar di bawah &mdash; untuk BPKB mobil,
        NPWP ikut diminta.
      </>
    ),
  },
  {
    judul: `Datang ke ${CABANG.jalan}, tanda tangan, dana cair`,
    isi: (
      <>
        Serah terima BPKB dan penandatanganan dilakukan di kantor cabang. Kendaraannya tetap Anda bawa pulang. Tahap
        lengkap versi nasionalnya ada di{" "}
        <Link className="text-primary font-semibold underline" href="/#alur">
          alur pengajuan
        </Link>
        .
      </>
    ),
  },
];

const dokumen = [
  { nama: "eKTP pemohon dan eKTP pasangan", catatan: "Belum menikah: eKTP orang tua atau penjamin." },
  { nama: "Kartu Keluarga", catatan: null },
  { nama: "Bukti penghasilan", catatan: "Slip gaji, mutasi rekening, atau bukti pemasukan rutin lainnya." },
  { nama: "NPWP", catatan: "Khusus jaminan BPKB mobil." },
  { nama: "Bukti kepemilikan rumah", catatan: "PBB, rekening listrik, atau struk token listrik." },
];

const faktaLokasi: [string, string][] = [
  ["Nama cabang", CABANG.namaDataset],
  ["Alamat", `${CABANG.jalan}, ${CABANG.kelurahan}`],
  ["Kecamatan", CABANG.kecamatan],
  ["Kota / provinsi", `${CABANG.kota}, ${CABANG.provinsi} ${CABANG.kodePos}`],
  ["Nama di Google Maps", CABANG.namaMaps],
  ["Koordinat", `${CABANG.lintang}, ${CABANG.bujur}`],
];

/** Kelas padding tidak tersedia di CSS terkompilasi, jadi ukurannya inline. */
const pilKuning = { display: "inline-flex", padding: "12px 24px" } as const;

export default function SawanganPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Sawangan, Depok",
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

      {/* Hero gelap — pembeda visual pertama dari halaman cabang lain. */}
      <section className="py-14 md:py-20 lg:py-24 bg-primary text-white relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white">
              <li>
                <Link className="text-white hover:text-secondary" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Sawangan, Depok</li>
            </ol>
          </nav>

          <p className="mt-8 text-base lg:text-lg font-semibold uppercase text-secondary">Cabang Depok bagian barat</p>
          <h1 className="mt-3 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-white max-w-200">
            Gadai BPKB di Adira Finance Sawangan
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white max-w-175">
            Untuk Anda yang tinggal di sisi barat Depok &mdash; Sawangan, Bojongsari, Cinere, Limo, Pancoran Mas
            &mdash; dan ingin menggadaikan BPKB mobil atau motor lewat kantor Adira di {CABANG.jalan}. Halaman ini
            menjelaskan urutannya, apa yang dibawa, dan di mana persisnya kantor itu berdiri.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              className="items-center gap-2 rounded-full bg-secondary text-title_black font-semibold"
              style={pilKuning}
              href={waLink(PESAN_WA)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mulai Lewat WhatsApp
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </a>
            <a className="text-white font-semibold underline hover:text-secondary" href="#langkah">
              Lihat urutannya dulu
            </a>
          </div>
        </div>
      </section>

      {/* Proses dulu, lokasi belakangan — kebalikan dari halaman Alam Sutera. */}
      <section className="section-spacing-lg-md" id="langkah">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Urutannya
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Empat tahap sampai dana cair lewat cabang Sawangan
            </h2>
            <p className="mt-4 text-paragraph_black">
              Tahapannya sama dengan cabang Adira mana pun. Yang berbeda adalah ke mana Anda datang dan apa yang perlu
              Anda sebutkan sejak awal supaya tidak salah cabang.
            </p>
          </div>

          <ol className="mt-12 flex flex-col gap-8 max-w-200">
            {langkah.map((item, i) => (
              <li className="flex items-start gap-5" key={item.judul}>
                <span
                  className="w-12 h-12 rounded-full bg-secondary text-title_black font-bold text-lg flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-title_black text-xl font-semibold leading-tight">{item.judul}</h3>
                  <p className="mt-2 text-paragraph_black">{item.isi}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Fakta lokasi sebagai <dl>, bukan kartu alamat. */}
      <section className="section-spacing-lg-md bg-background" id="lokasi">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Pancoran Mas, bukan Kecamatan Sawangan
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Namanya Sawangan karena jalannya, bukan kecamatannya
              </h2>
              <p className="mt-4 text-paragraph_black">
                Kantor ini berdiri di {CABANG.jalan}, kelurahan {CABANG.kelurahan} &mdash; secara administratif masuk
                Kecamatan <strong className="text-title_black">{CABANG.kecamatan}</strong>. Kecamatan Sawangan sendiri
                ada lebih jauh ke barat daya, di ujung lain jalan yang sama. Jadi kalau Anda mencari &ldquo;adira
                cabang sawangan&rdquo; lalu peta mengarahkan ke Pancoran Mas, itu bukan salah alamat.
              </p>

              <dl className="mt-8 divide-y border-t border-b border-border">
                {faktaLokasi.map(([k, v]) => (
                  <div className="flex flex-wrap gap-4 py-3" key={k}>
                    <dt className="text-paragraph_black w-full md:w-48">{k}</dt>
                    <dd className="text-title_black font-medium flex-1">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <h3 className="text-title_black text-base font-semibold leading-tight">Telepon kantor cabang</h3>
                <ul className="mt-2 flex flex-wrap gap-4 text-paragraph_black">
                  {CABANG.telepon.map((nomor) => (
                    <li key={nomor}>
                      <a className="text-primary font-semibold" href={`tel:${nomor.replace(/-/g, "")}`}>
                        {nomor}
                      </a>
                    </li>
                  ))}
                  <li>Fax {CABANG.fax}</li>
                </ul>
                <p className="mt-3 text-sm text-paragraph_black">
                  Dua nomor di atas milik kantor cabang. WhatsApp {AGEN.waTampilan} adalah nomor kami, agen yang
                  memasarkan &mdash; bukan nomor cabang.
                </p>
              </div>
            </div>

            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.nama} tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Tabel perbandingan — komponen yang tidak ada di halaman cabang lain. */}
      <section className="section-spacing-lg-md" id="cabang-depok">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Kota Depok
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Bukan satu-satunya cabang Adira di Depok
            </h2>
            <p className="mt-4 text-paragraph_black">
              Depok punya {KECAMATAN_DEPOK.length} kecamatan &mdash; {KECAMATAN_DEPOK.join(", ")} &mdash; dan lebih
              dari satu kantor Adira. Sawangan yang paling barat. Kalau Anda dari sisi timur atau tengah kota,
              bandingkan dulu jaraknya; cabang mana yang memproses tetap ditentukan Adira Finance.
            </p>
          </div>

          <div className="mt-10" style={{ overflowX: "auto" }}>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-secondary">
                  <th scope="col" className="px-4 py-3 text-sm font-semibold text-title_black whitespace-nowrap">
                    Cabang
                  </th>
                  <th scope="col" className="px-4 py-3 text-sm font-semibold text-title_black whitespace-nowrap">
                    Kecamatan
                  </th>
                  <th scope="col" className="px-4 py-3 text-sm font-semibold text-title_black">
                    Alamat
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-semibold text-title_black whitespace-nowrap text-right"
                  >
                    Jarak dari sini
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border bg-background">
                  <td className="px-4 py-3 text-title_black font-semibold whitespace-nowrap">{CABANG.nama}</td>
                  <td className="px-4 py-3 text-paragraph_black whitespace-nowrap">{CABANG.kecamatan}</td>
                  <td className="px-4 py-3 text-paragraph_black">
                    {CABANG.jalan}, {CABANG.kelurahan}
                  </td>
                  <td className="px-4 py-3 text-paragraph_black text-right whitespace-nowrap">halaman ini</td>
                </tr>
                {CABANG_DEPOK.map((c) => (
                  <tr className="border-t border-border" key={c.nama}>
                    <td className="px-4 py-3 text-title_black font-semibold whitespace-nowrap">{c.nama}</td>
                    <td className="px-4 py-3 text-paragraph_black whitespace-nowrap">{c.kecamatan}</td>
                    <td className="px-4 py-3 text-paragraph_black">{c.jalan}</td>
                    <td className="px-4 py-3 text-paragraph_black text-right whitespace-nowrap">{c.km} km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-paragraph_black">
            Jarak diukur lurus di peta dari titik cabang Sawangan. Satu entri cabang Depok lainnya belum ditampilkan
            karena alamat dan titik petanya tidak saling cocok pada data yang kami pegang.
          </p>

          <h3 className="mt-12 text-title_black text-xl font-semibold leading-tight">Kalau Anda dari luar Depok</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {CABANG_LUAR_DEPOK.map((c) => (
              <li
                className="flex items-center gap-2 rounded-full border border-border bg-background text-title_black text-sm"
                style={{ padding: "8px 16px" }}
                key={c.nama}
              >
                <span className="font-semibold">{c.nama}</span>
                <span className="text-paragraph_black">
                  {c.wilayah} &middot; {c.km} km
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Daftar bawaan — pendek, dan mengarah ke halaman syarat kanonik. */}
      <section className="section-spacing-lg-md bg-background" id="dokumen">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Sebelum ke cabang
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Yang dibawa ke Jl. Raya Sawangan
              </h2>
              <p className="mt-4 text-paragraph_black">
                Lima dokumen ini yang diminta saat survei dan penandatanganan. Penjelasan tiap dokumen ada di{" "}
                <Link className="text-primary font-semibold underline" href="/#persyaratan">
                  halaman persyaratan
                </Link>
                .
              </p>
            </div>
            <ul className="lg:col-span-2 divide-y border-t border-b border-border">
              {dokumen.map((d) => (
                <li className="flex items-start gap-3 py-4" key={d.nama}>
                  <svg className="w-5.25 h-5.25 shrink-0">
                    <use href="#roundedCheck" />
                  </svg>
                  <div className="flex-1">
                    <strong className="text-title_black font-semibold">{d.nama}</strong>
                    {d.catatan ? <span className="block text-paragraph_black">{d.catatan}</span> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Penutup gelap, mengikat kembali ke hero. */}
      <section className="py-14 md:py-20 bg-primary text-white" id="ajukan">
        <div className="container">
          <div className="max-w-200">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              Mulai dari WhatsApp, selesai di Sawangan
            </h2>
            <p className="mt-4 text-white">
              Kirim foto BPKB dan STNK, sebutkan kecamatan Anda di Depok, dan kami bantu prosesnya ke Adira Finance.{" "}
              {PERNYATAAN_OJK}
            </p>
            <p className="mt-4 text-sm text-white">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-secondary">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-secondary">{AGEN.id}</strong>. Nomor cabang tercantum di bagian{" "}
              <a className="text-secondary font-semibold underline" href="#lokasi">
                lokasi
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
