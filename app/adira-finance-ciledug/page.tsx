import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import { CABANG, HALTE, NAMA_PT, PASAR, PETA_EMBED, PETA_URL, TETANGGA } from "@/lib/cabang-ciledug";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";

/**
 * Halaman cabang Adira Finance Ciledug – Kota Tangerang.
 *
 * Bentuk kedua belas. Sebelas sebelumnya: lokasi, proses, cara sampai
 * (patokan radial), identitas, perbandingan, verifikasi pin, tanya-jawab,
 * anatomi alamat, ketersediaan kontak, catatan pengecekan, glosarium.
 *
 * Halaman ini dipimpin KARTU KUNJUNGAN dan JALUR SATU JALAN. Data cabang ini
 * sehat (lihat `lib/cabang-ciledug.ts`), jadi yang paling berguna adalah
 * merangkum semua yang dibutuhkan untuk datang dalam satu kartu, lalu
 * menunjukkan posisinya di sepanjang Jl. HOS Cokroaminoto — jalan yang sama
 * tempat Koridor 13 Transjakarta berakhir. Ditambah tiga singkatan di alamat
 * yang mudah salah dibaca.
 *
 * "Adira Finance" dan "pt Adira Finance" (istilah merek) dilayani dengan satu
 * kalimat nama badan hukum + tautan /tentang — sengaja bukan kartu, supaya
 * tidak mengulang komponen di halaman Soleh Iskandar dan Mall Cileungsi.
 */

const JUDUL = "Adira Finance Ciledug — Alamat, Telepon & Gadai BPKB";
const DESKRIPSI =
  "Adira Finance Ciledug di Jl. HOS Cokroaminoto, Gang Rawa I No. 16 — 500 m dari halte Transjakarta CBD Ciledug. Telepon kantor dan cara gadai BPKB motor atau mobil.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Ciledug";

const km = (n: number) => String(n).replace(".", ",");

/** Isi kartu kunjungan — semua yang perlu dibawa di kepala sebelum berangkat. */
const kartu: [string, string][] = [
  ["Alamat", `${CABANG.jalan}, ${CABANG.rtRw}, ${CABANG.kelurahan}, ${CABANG.kecamatan}, ${CABANG.kota} ${CABANG.kodePos}`],
  ["Telepon cabang", CABANG.telepon.join(" · ")],
  ["Faks", CABANG.fax],
  ["Halte terdekat", `${HALTE.nama} (Koridor ${HALTE.koridor}), ±${km(HALTE.km)} km ke barat`],
  ["Nama di Google Maps", CABANG.namaMaps],
];

/** Singkatan di alamat yang paling sering salah dibaca. */
const singkatan = [
  {
    tertulis: "Gg. Rw. I",
    artinya: "Gang Rawa I",
    catatan: "“Rw.” di sini singkatan dari Rawa, nama gangnya — bukan RW. RW-nya sendiri 005.",
  },
  {
    tertulis: "No.1 6",
    artinya: "Nomor 16",
    catatan: "Ada spasi nyasar di sebagian data. Listing Google Maps kantor ini menulisnya No. 16.",
  },
  {
    tertulis: "Jl. HOS Cokroaminoto",
    artinya: "Jalan Haji Oemar Said Cokroaminoto",
    catatan: "Sebagian aplikasi peta memakai nama panjangnya. Kalau pencarian “HOS” tidak ketemu, coba nama ini.",
  },
];

export default function CiledugPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Ciledug, Kota Tangerang",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero dengan kartu kunjungan gelap. */}
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
              <li aria-current="page">Ciledug, Kota Tangerang</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <p className="text-base lg:text-lg font-semibold uppercase text-primary">
                Kecamatan {CABANG.kecamatan} &middot; {CABANG.kota}
              </p>
              <h1 className="mt-3 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black">
                Adira Finance Ciledug
              </h1>
              <p className="mt-4 text-base sm:text-lg text-paragraph_black">
                Kantornya masuk ke Gang Rawa I dari Jl. HOS Cokroaminoto, sekitar setengah kilometer dari halte
                Transjakarta CBD Ciledug. Semua yang perlu Anda tahu sebelum berangkat ada di kartu ini; penjelasannya
                di bawah.
              </p>
              <div className="mt-8">
                <a className="button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
                  Tanya Lewat WhatsApp
                  <svg className="w-2.5 h-2.5 fill-current">
                    <use href="#buttonArrow" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8 bg-primary rounded-3xl">
              <p className="text-sm uppercase tracking-wide text-secondary font-semibold">Kartu kunjungan</p>
              <dl className="mt-4 flex flex-col gap-4">
                {kartu.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-sm text-white">{k}</dt>
                    <dd className="text-white text-lg font-semibold leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                {CABANG.telepon.map((n) => (
                  <a
                    className="rounded-full bg-secondary text-title_black font-semibold"
                    style={{ padding: "8px 16px" }}
                    href={`tel:${n.replace(/-/g, "")}`}
                    key={n}
                  >
                    Telepon {n}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jalur satu jalan — dari Jakarta lewat Koridor 13 sampai pintu gang. */}
      <section className="section-spacing-lg-md bg-background" id="dari-jakarta">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Dari Jakarta tanpa kendaraan
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Turun di ujung Koridor 13, jalan ke timur
              </h2>
              <p className="mt-4 text-paragraph_black">
                Koridor 13 Transjakarta yang jalurnya melayang itu berakhir di Ciledug, di jalan yang sama dengan kantor
                ini. Jarak di bawah diukur lurus di peta, jadi jarak jalan kakinya sedikit lebih panjang.
              </p>

              <ol className="mt-8 border-l-2 border-primary pl-6 flex flex-col gap-6">
                <li>
                  <p className="text-sm uppercase tracking-wide text-paragraph_black">Naik</p>
                  <p className="text-title_black font-semibold">Koridor 13, dari arah Tegal Mampang</p>
                  <p className="text-paragraph_black">
                    Halte di ujung Jakarta-nya dulu bernama Tendean. Jam operasional halte Ciledug pernah berubah-ubah,
                    jadi cek dulu di kanal resmi Transjakarta.
                  </p>
                </li>
                <li>
                  <p className="text-sm uppercase tracking-wide text-paragraph_black">Turun</p>
                  <p className="text-title_black font-semibold">{HALTE.nama}</p>
                  <p className="text-paragraph_black">
                    Ujung koridornya. Haltenya sudah masuk Kecamatan Karang Tengah, tetangga Ciledug.
                  </p>
                </li>
                <li>
                  <p className="text-sm uppercase tracking-wide text-paragraph_black">Lewat</p>
                  <p className="text-title_black font-semibold">
                    {PASAR.nama}, ±{km(PASAR.km)} km sebelum kantor
                  </p>
                  <p className="text-paragraph_black">Masih di Jl. HOS Cokroaminoto, searah ke timur.</p>
                </li>
                <li>
                  <p className="text-sm uppercase tracking-wide text-paragraph_black">Sampai</p>
                  <p className="text-title_black font-semibold">Gang Rawa I No. 16, ±{km(HALTE.km)} km dari halte</p>
                  <p className="text-paragraph_black">
                    Pin Google Maps-nya bernama &ldquo;{CABANG.namaMaps}&rdquo;.
                  </p>
                </li>
              </ol>
            </div>

            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.namaMaps} tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Tiga singkatan yang mudah salah dibaca. */}
      <section className="section-spacing-lg-md" id="singkatan">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Alamat Adira Finance Ciledug
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Tiga singkatan di alamatnya yang sering salah dibaca
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {singkatan.map((s) => (
              <div className="p-5 sm:p-6 bg-white border border-border rounded-2xl" key={s.tertulis}>
                <p className="text-paragraph_black text-sm">Tertulis</p>
                <p className="text-title_black text-xl font-semibold">{s.tertulis}</p>
                <p className="mt-3 text-paragraph_black text-sm">Artinya</p>
                <p className="text-primary text-xl font-semibold">{s.artinya}</p>
                <p className="mt-3 text-paragraph_black">{s.catatan}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-paragraph_black max-w-175">
            Kata &ldquo;Baru&rdquo; di nama pin-nya tidak kami tafsirkan &mdash; tidak ada sumber yang menyebut kantor
            ini pernah pindah.
          </p>
        </div>
      </section>

      {/* Ciledug = Kota Tangerang; tetangga. */}
      <section className="section-spacing-lg-md bg-background" id="sekitar">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Ciledug masuk Kota Tangerang, bukan Jakarta
            </h2>
            <p className="mt-4 text-paragraph_black">
              Meski Transjakarta sampai ke sini, Ciledug ada di Provinsi Banten. Di data cabang kami, Kota Tangerang
              hanya punya dua kantor Adira: yang ini dan Pasar Baru. Dari sini, yang paling dekat justru Alam Sutera di Tangerang Selatan.
              Cabang mana yang memproses pengajuan tetap ditentukan Adira Finance.
            </p>
          </div>
          <ul className="mt-8 border-t border-border">
            {TETANGGA.map((c) => (
              <li className="flex items-center justify-between gap-4 py-4 border-b border-border" key={c.nama}>
                <span className="text-title_black font-semibold">
                  {c.href ? (
                    <Link className="underline hover:text-primary" href={c.href}>
                      {c.nama}
                    </Link>
                  ) : (
                    c.nama
                  )}
                  <span className="block text-paragraph_black font-normal">{c.wilayah}</span>
                </span>
                <span className="text-paragraph_black whitespace-nowrap">{km(c.km)} km</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Ciledug
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Ke Gang Rawa I cukup sekali, di akhir
            </h2>
            <p className="mt-4 text-paragraph_black">
              Gadai BPKB motor dan mobil sama-sama bisa; yang dijaminkan BPKB-nya, kendaraannya tetap dipakai. Untuk
              mobil, NPWP ikut diminta. Kelayakan dicek dulu dari foto BPKB, STNK, dan eKTP yang Anda kirim lewat
              WhatsApp; kendaraan disurvei; baru setelah itu Anda datang ke kantor untuk tanda tangan dan menyerahkan
              BPKB.
            </p>
            <p className="mt-4 text-paragraph_black">
              Berkas lengkapnya di{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                daftar persyaratan
              </Link>
              , perkiraan dana di{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              , urutannya di{" "}
              <Link className="text-primary font-semibold underline" href="/#alur">
                alur pengajuan
              </Link>
              . &ldquo;PT Adira Finance&rdquo; sendiri nama dagang; badan hukumnya {NAMA_PT} &mdash; profilnya di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                halaman tentang Adira Finance
              </Link>
              . Situs ini bukan situs resmi Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup. */}
      <section className="py-14 md:py-20" id="ajukan">
        <div className="container">
          <div className="max-w-200">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
              Telepon kantornya, atau mulai dari chat
            </h2>
            <p className="mt-4 text-paragraph_black">
              Nomor di kartu kunjungan milik kantor cabang. WhatsApp {AGEN.waTampilan} nomor kami sebagai agen.{" "}
              {PERNYATAAN_OJK}
            </p>
            <p className="mt-4 text-sm text-paragraph_black">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-title_black">{AGEN.id}</strong>.
            </p>
            <div className="mt-8">
              <a className="button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
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
