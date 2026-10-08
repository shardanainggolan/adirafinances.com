import type { Metadata } from "next";
import Link from "next/link";

import { CABANG, NAMA_PT, PETA_MAL_URL, TETANGGA } from "@/lib/cabang-mall-cileungsi";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";

/**
 * Halaman cabang Adira Finance Mall Cileungsi – Bogor.
 *
 * Bentuk kesebelas. Sepuluh sebelumnya: lokasi, proses, cara sampai,
 * identitas, perbandingan, verifikasi pin, tanya-jawab, anatomi alamat,
 * ketersediaan kontak, catatan pengecekan.
 *
 * Halaman ini dipimpin GLOSARIUM NAMA TEMPAT. Orang yang mencari kantor ini
 * bertemu tujuh nama yang saling tumpang tindih — Mall Cileungsi, Mal
 * Cileungsi Indah, Cileungsi Trade Center, Metropolitan Mall Cileungsi,
 * Klapanunggal, Cibinong, dan sebuah listing Maps "Rumah Cluster Adira".
 * Tiap nama dijelaskan dan diberi label hubungannya dengan kantor. Semua dari
 * pengecekan yang tercatat di `lib/cabang-mall-cileungsi.ts`.
 *
 * Tidak ada embed peta: satu-satunya embed yang tersedia (`gmaps_link`)
 * menunjuk listing yang salah. Tautan peta membuka kompleks malnya.
 *
 * "Adira Finance" dan "pt Adira Finance" (istilah merek) tidak dijadikan
 * sasaran utama halaman agen ini; dilayani dengan menjelaskan nama badan
 * hukumnya dan menautkan /tentang.
 */

// Cabang ini punya nomor telepon asli (beda dengan Kelapa Gading/Soleh Iskandar),
// jadi "Telepon" dimajukan ke judul. Versi pertama 86 karakter dengan akhiran situs.
const JUDUL = "Adira Finance Mall Cileungsi Bogor — Alamat & Telepon";
const DESKRIPSI =
  "Adira Finance Mall Cileungsi ada di kompleks Cileungsi Trade Center, Jl. Raya Narogong — bukan Metropolitan Mall. Telepon kantor dan cara gadai BPKB motor atau mobil.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Mall Cileungsi";

type Label = "kantor" | "nama-lain" | "bukan" | "hati-hati";

const LABEL: Record<Label, { teks: string; kelas: string }> = {
  kantor: { teks: "Kantornya di sini", kelas: "bg-secondary text-title_black" },
  "nama-lain": { teks: "Nama lain tempat yang sama", kelas: "bg-white text-title_black border border-border" },
  bukan: { teks: "Bukan lokasi kantor", kelas: "bg-white text-paragraph_black border border-border" },
  "hati-hati": { teks: "Jangan diikuti", kelas: "bg-primary text-white" },
};

/** Tujuh nama yang ditemui orang saat mencari kantor ini. */
const istilah: { nama: string; label: Label; isi: string }[] = [
  {
    nama: "Mall Cileungsi",
    label: "kantor",
    isi: `Kompleks pertokoan di ${CABANG.jalan} tempat kantor Adira berada, di deretan ruko ${CABANG.blok}. Di data cabang namanya ditulis "Mal Cileungsi Indah".`,
  },
  {
    nama: "Cileungsi Trade Center (CTC)",
    label: "nama-lain",
    isi: "Nama yang dipakai peta untuk kompleks yang sama. Kalau aplikasi peta Anda tidak mengenal “Mall Cileungsi”, cari nama ini.",
  },
  {
    nama: "Metropolitan Mall Cileungsi",
    label: "bukan",
    isi: "Mal lain yang lebih baru, sekitar 1,8 km dari CTC, di Limusnunggal. Namanya mirip, tapi kantor Adira tidak ada di sana.",
  },
  {
    nama: "Cileungsi Kidul",
    label: "kantor",
    isi: `Kelurahan tempat kompleks mal ini berada, di Kecamatan ${CABANG.kecamatan}. Kode posnya ${CABANG.kodePos}.`,
  },
  {
    nama: "Klapanunggal",
    label: "bukan",
    isi: "Kecamatan tetangga. Namanya ikut tertulis di sebagian alamat yang beredar, tapi kantornya ada di Kecamatan Cileungsi.",
  },
  {
    nama: "Cibinong",
    label: "bukan",
    isi: `Sebagian alamat menyebut Cibinong, padahal kantor ini tidak berada di Kecamatan Cibinong — kode pos ${CABANG.kodePos} adalah kode pos Cileungsi. Adira memang punya cabang terpisah di Cibinong.`,
  },
  {
    nama: "“Rumah Cluster Adira”",
    label: "hati-hati",
    isi: "Sebuah listing di Google Maps yang memakai alamat kantor ini, tapi titiknya ada di tempat lain, dekat Klapanunggal, dan hanya punya dua ulasan. Kalau rute Anda mengarah ke situ, itu bukan kantor Adira.",
  },
];

export default function MallCileungsiPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Mall Cileungsi, Kabupaten Bogor",
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

      {/* Hero kuning: jawaban navigasional langsung — alamat dan telepon. */}
      <section className="py-14 md:py-20 lg:py-24 bg-secondary relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-title_black">
              <li>
                <Link className="text-title_black hover:text-primary" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Mall Cileungsi, Bogor</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Mall Cileungsi, Bogor
          </h1>
          <p className="mt-4 text-base sm:text-lg text-title_black max-w-175">
            Kantornya ada di deretan ruko {CABANG.blok}, kompleks Mall Cileungsi, {CABANG.jalan} &mdash; kompleks
            yang di peta tercatat sebagai {CABANG.namaPeta}. Bukan di Metropolitan Mall Cileungsi.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-200">
            <div className="p-5 bg-white rounded-2xl">
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Telepon kantor cabang</p>
              {CABANG.telepon.map((n) => (
                <a className="block text-title_black text-xl font-semibold" href={`tel:${n.replace(/-/g, "")}`} key={n}>
                  {n}
                </a>
              ))}
            </div>
            <div className="p-5 bg-white rounded-2xl">
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Peta</p>
              <a
                className="block text-title_black text-xl font-semibold underline hover:text-primary"
                href={PETA_MAL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka {CABANG.namaPeta}
              </a>
              <p className="mt-1 text-sm text-paragraph_black">Kantornya di dalam kompleks ini.</p>
            </div>
          </div>

          <div className="mt-8">
            <a className="button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              Tanya Lewat WhatsApp
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Glosarium nama tempat — tulang punggung halaman. */}
      <section className="section-spacing-lg-md" id="nama-tempat">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Biar tidak salah arah
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Tujuh nama yang akan Anda temui, dan mana yang benar
            </h2>
            <p className="mt-4 text-paragraph_black">
              Alamat cabang ini beredar dalam banyak versi. Sebagian menyebut kecamatan yang keliru, satu listing peta
              bahkan menunjuk tempat lain. Ini daftar nama yang paling sering muncul.
            </p>
          </div>

          <dl className="mt-10 border-t border-border">
            {istilah.map((t) => (
              <div className="grid gap-4 lg:grid-cols-3 py-6 border-b border-border" key={t.nama}>
                <dt>
                  <span className="block text-title_black text-xl font-semibold leading-tight">{t.nama}</span>
                  <span
                    className={`mt-2 inline-block rounded-full text-sm font-semibold ${LABEL[t.label].kelas}`}
                    style={{ padding: "4px 12px" }}
                  >
                    {LABEL[t.label].teks}
                  </span>
                </dt>
                <dd className="lg:col-span-2 text-paragraph_black">{t.isi}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Alamat lengkap + faks + nama badan hukum. */}
      <section className="section-spacing-lg-md bg-background" id="alamat">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Alamat lengkap
              </span>
              <address className="mt-4 text-paragraph_black">
                <strong className="block text-title_black text-xl">{CABANG.namaDataset}</strong>
                <span className="block mt-2">
                  {CABANG.kompleks}, {CABANG.blok}
                </span>
                <span className="block">{CABANG.jalan}</span>
                <span className="block">
                  Kelurahan {CABANG.kelurahan}, Kecamatan {CABANG.kecamatan}
                </span>
                <span className="block">
                  {CABANG.kabupaten}, {CABANG.provinsi} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-6 text-paragraph_black">
                Faks: {CABANG.fax.join(" dan ")}. Nomor telepon dan faks ini milik kantor cabang. WhatsApp{" "}
                {AGEN.waTampilan} adalah nomor kami sebagai agen AXI, bukan nomor cabang.
              </p>
            </div>

            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <h2 className="text-title_black text-xl font-semibold leading-tight">
                &ldquo;PT Adira Finance&rdquo; itu nama resminya apa?
              </h2>
              <p className="mt-3 text-paragraph_black">
                Badan hukumnya <strong className="text-title_black">{NAMA_PT}</strong>, berizin dan diawasi OJK.
                &ldquo;Adira Finance&rdquo; nama dagangnya. Profilnya ada di{" "}
                <Link className="text-primary font-semibold underline" href="/tentang">
                  halaman tentang Adira Finance
                </Link>
                .
              </p>
              <p className="mt-3 text-sm text-paragraph_black">
                Situs ini bukan situs resmi Adira; situs resmi perusahaannya adira.co.id.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gadai BPKB — ringkas, menautkan halaman kanonik. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Mall Cileungsi
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Motor atau mobil, kendaraannya tidak ditahan
            </h2>
            <p className="mt-4 text-paragraph_black">
              Yang diserahkan cuma BPKB-nya. Untuk BPKB motor, berkasnya eKTP, Kartu Keluarga, bukti penghasilan, dan
              bukti tempat tinggal. Untuk BPKB mobil sama, ditambah NPWP. Rinciannya di{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                daftar persyaratan
              </Link>
              ; perkiraan dana dan angsurannya bisa Anda hitung di{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              , dan untuk gambaran kasarnya ada di{" "}
              <Link className="text-primary font-semibold underline" href="/#tabel-angsuran">
                tabel angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              Pengecekan awal cukup dari WhatsApp: foto BPKB, STNK, dan eKTP. Setelah survei kendaraan, Anda baru perlu
              datang ke kantor di kompleks Mall Cileungsi untuk tanda tangan dan menyerahkan BPKB. Urutan resminya ada
              di{" "}
              <Link className="text-primary font-semibold underline" href="/#alur">
                alur pengajuan
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Tetangga — dihitung dari titik mal yang terverifikasi. */}
      <section className="section-spacing-lg-md bg-background" id="tetangga">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Kantor Adira lain di sekitar Cileungsi
            </h2>
            <p className="mt-4 text-paragraph_black">
              Jarak lurus dari Cileungsi Trade Center; jarak tempuh lebih panjang. Cabang mana yang memproses
              pengajuan ditentukan Adira Finance.
            </p>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TETANGGA.map((c) => (
              <li className="p-5 bg-white border border-border rounded-2xl" key={c.nama}>
                <p className="text-title_black font-semibold">
                  {c.href ? (
                    <Link className="underline hover:text-primary" href={c.href}>
                      {c.nama}
                    </Link>
                  ) : (
                    c.nama
                  )}
                </p>
                <p className="text-paragraph_black">{c.wilayah}</p>
                <p className="mt-2 text-title_black text-2xl font-bold">
                  {String(c.km).replace(".", ",")}
                  <span className="text-base font-semibold"> km</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Penutup. */}
      <section className="py-14 md:py-20" id="ajukan">
        <div className="container">
          <div className="max-w-200">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
              Telepon kantornya, atau mulai dari chat
            </h2>
            <p className="mt-4 text-paragraph_black">{PERNYATAAN_OJK}</p>
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
