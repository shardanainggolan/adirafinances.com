import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  ANOMALI_CIKARANG,
  ARAH_DEPOK,
  CABANG,
  DI_KOTA_BEKASI,
  KECAMATAN_KOTA_BEKASI,
  PETA_EMBED,
  PETA_URL,
  TERDEKAT_LINTAS_PROVINSI,
} from "@/lib/cabang-jatirahayu";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";

/**
 * Halaman cabang Adira Finance Jatirahayu – Pondok Gede.
 *
 * Bentuk ketujuh. Enam sebelumnya: lokasi (Alam Sutera), proses (Sawangan),
 * cara sampai (Ciputat), identitas (Pasar Baru), perbandingan (Tajur),
 * verifikasi (Tebet).
 *
 * Halaman ini memakai TULANG PUNGGUNG TANYA-JAWAB: tiap <h2> adalah
 * pertanyaan yang benar-benar ditanyakan orang, langsung disusul satu kalimat
 * jawaban singkat bergaris aksen, baru keterangannya. Kata kuncinya cuma satu
 * dan intennya informational sekaligus transactional, jadi pembaca harus cepat
 * dapat jawaban lalu cepat bisa bertindak.
 *
 * Catatan: ini BUKAN alasan memasang schema FAQPage. Rich result FAQ sudah
 * dihapus Google sejak 7 Mei 2026 (SKILL.md §7) — format ini dipilih untuk
 * pembaca, bukan untuk fitur SERP.
 *
 * Aturan tetap (SKILL.md §8): boilerplate nasional hanya ditautkan; nomor
 * WhatsApp agen tidak pernah tampil sebagai nomor cabang; yang belum
 * diverifikasi tidak terbit.
 */

const JUDUL = "Adira Finance Pondok Gede — Alamat, Telepon, Gadai BPKB";
const DESKRIPSI = `Adira Finance Pondok Gede: ${CABANG.jalan}, ${CABANG.kelurahan}, Kec. ${CABANG.kecamatan}, Kota Bekasi. Alamat, telepon kantor, dan cara gadai BPKB motor atau mobil.`;

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Pondok Gede";

const layanan = [
  { nama: "Gadai BPKB mobil dan motor", href: "/#jenis-jaminan" },
  { nama: "Take over dari leasing lain", href: "/#layanan" },
  { nama: "Top up pinjaman berjalan", href: "/#layanan" },
  { nama: "Kredit mobil dan motor bekas", href: "/#layanan" },
];

/** Gaya jawaban singkat: garis aksen kiri, teks sedikit lebih besar. */
const jawabanSingkat = "border-l-2 border-primary pl-5 text-base sm:text-lg text-title_black font-medium";

export default function PondokGedePage() {
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
      // `provider` menunjuk Adira. Tidak ada Organization/LocalBusiness yang
      // mengaku mengoperasikan kantor ini — lihat SKILL.md §0.
      {
        "@type": "Service",
        "@id": `${SITE_URL}/${CABANG.slug}#layanan`,
        name: "Gadai BPKB mobil dan motor — cabang Pondok Gede, Kota Bekasi",
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

      {/* Hero pendek — jawabannya langsung, karena satu-satunya kata kunci
          halaman ini sudah sekaligus informational dan transactional. */}
      <section className="py-14 md:py-20 lg:py-24 bg-secondary relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-paragraph_black">
              <li>
                <Link className="hover:text-primary" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Pondok Gede, Bekasi</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Pondok Gede
          </h1>
          <p className="mt-4 text-base sm:text-lg text-title_black max-w-175">
            Kantornya di {CABANG.jalan}, kelurahan {CABANG.kelurahan}, Kota Bekasi. Halaman ini menjawab
            pertanyaan-pertanyaan yang biasanya muncul duluan &mdash; alamat persisnya, kenapa yang tertulis Pondok
            Melati, nomor teleponnya, sampai cara menggadaikan BPKB motor atau mobil lewat cabang ini.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a className="button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              Tanya Lewat WhatsApp
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href="#alamat">
              Langsung ke alamat
            </a>
          </div>
        </div>
      </section>

      {/* Pertanyaan 1 — alamat, dengan peta di dalamnya. */}
      <section className="section-spacing-lg-md" id="alamat">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamatnya di mana persisnya?
              </h2>
              <p className={`mt-6 ${jawabanSingkat}`}>
                {CABANG.jalan}, sebuah {CABANG.bentuk} di {CABANG.rtRw}, kelurahan {CABANG.kelurahan}, Kecamatan{" "}
                {CABANG.kecamatan}, {CABANG.kota}, {CABANG.provinsi} {CABANG.kodePos}.
              </p>
              <p className="mt-6 text-paragraph_black">
                Di data cabang, alamatnya ditulis diawali kata &ldquo;Pondok Gede&rdquo; sebagai penyebutan kawasan,
                lalu nama jalannya. Jalan Raya Hankam inilah penanda yang paling gampang dipakai kalau Anda menyusuri
                peta.
              </p>

              <div className="mt-8 border-t border-b border-border divide-y">
                <div className="flex flex-wrap gap-4 py-3">
                  <span className="text-paragraph_black w-full md:w-48">Telepon kantor cabang</span>
                  <a
                    className="text-title_black font-semibold flex-1"
                    href={`tel:${CABANG.telepon.replace(/-/g, "")}`}
                  >
                    {CABANG.telepon}
                  </a>
                </div>
                <div className="flex flex-wrap gap-4 py-3">
                  <span className="text-paragraph_black w-full md:w-48">Koordinat</span>
                  <span className="text-title_black font-semibold flex-1">
                    {CABANG.lintang}, {CABANG.bujur}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 py-3">
                  <span className="text-paragraph_black w-full md:w-48">Nama pin di Google Maps</span>
                  <span className="text-title_black font-semibold flex-1">{CABANG.namaMaps}</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-paragraph_black">
                Di data kami cabang ini punya satu nomor telepon dan tidak ada nomor faks. Nomor itu milik kantor
                cabang; WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen &mdash; bukan nomor cabang.
              </p>
            </div>

            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.nama} tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Pertanyaan 2 — Pondok Gede vs Pondok Melati. */}
      <section className="section-spacing-lg-md bg-background" id="pondok-melati">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Kenapa alamatnya Pondok Melati, bukan Pondok Gede?
            </h2>
            <p className={`mt-6 ${jawabanSingkat}`}>
              Karena Kota Bekasi punya dua kecamatan bertetangga dengan nama mirip, dan kantor ini berdiri di{" "}
              {CABANG.kecamatan} &mdash; sementara namanya memakai {CABANG.kecamatanTetangga}, nama kawasan yang lebih
              dikenal orang.
            </p>
            <p className="mt-6 text-paragraph_black">
              Kecamatan {CABANG.kecamatanTetangga} dan Kecamatan {CABANG.kecamatan} sama-sama ada di Kota Bekasi, dan
              keduanya bersebelahan. Jadi kalau Anda mencari &ldquo;Adira Finance Pondok Gede&rdquo; lalu peta
              menunjukkan Pondok Melati, itu bukan salah alamat &mdash; keduanya menunjuk kantor yang sama.
            </p>
            <p className="mt-4 text-paragraph_black">
              Lengkapnya, Kota Bekasi punya {KECAMATAN_KOTA_BEKASI.length} kecamatan:{" "}
              {KECAMATAN_KOTA_BEKASI.join(", ")}.
            </p>
          </div>
        </div>
      </section>

      {/* Pertanyaan 3 — gadai BPKB, sisi transaksional. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Bisa gadai BPKB motor dan mobil di sini?
              </h2>
              <p className={`mt-6 ${jawabanSingkat}`}>
                Bisa keduanya, dan kendaraannya tetap Anda pakai. Bedanya cuma satu berkas: untuk BPKB mobil, NPWP ikut
                diminta; untuk motor tidak.
              </p>
              <ul className="mt-6 flex flex-col gap-2 text-paragraph_black">
                {layanan.map((l) => (
                  <li key={l.nama}>
                    <Link className="text-primary font-semibold underline" href={l.href}>
                      {l.nama}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-paragraph_black">
                Perkiraan plafon dan angsurannya bisa Anda hitung sendiri lewat{" "}
                <Link className="text-primary font-semibold underline" href="/simulasi">
                  simulasi angsuran
                </Link>
                . Angkanya gambaran; yang final ditetapkan Adira setelah kendaraan dilihat.
              </p>
            </div>

            <div className="p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Mulainya dari mana?</h3>
              <ol className="mt-4 flex flex-col gap-3 text-paragraph_black">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold shrink-0">1.</span>
                  <span className="flex-1">
                    Kirim foto BPKB, STNK, dan eKTP lewat WhatsApp. Tulis &ldquo;Pondok Gede&rdquo; di pesan pertama.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold shrink-0">2.</span>
                  <span className="flex-1">
                    Kalau dari foto sudah layak, survei kendaraan dijadwalkan. Berkas lengkapnya ada di{" "}
                    <Link className="text-primary font-semibold underline" href="/#persyaratan">
                      daftar persyaratan
                    </Link>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold shrink-0">3.</span>
                  <span className="flex-1">
                    Tanda tangan dan serah terima BPKB di {CABANG.jalan}, lalu dana cair. Urutan resminya di{" "}
                    <Link className="text-primary font-semibold underline" href="/#alur">
                      alur pengajuan
                    </Link>
                    .
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Pertanyaan 4 — cabang lain. */}
      <section className="section-spacing-lg-md bg-background" id="cabang-lain">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Kalau ada cabang lain yang lebih dekat?
            </h2>
            <p className={`mt-6 ${jawabanSingkat}`}>
              Yang paling dekat justru menyeberang provinsi: {TERDEKAT_LINTAS_PROVINSI.nama} di{" "}
              {TERDEKAT_LINTAS_PROVINSI.wilayah}, sekitar{" "}
              {String(TERDEKAT_LINTAS_PROVINSI.km).replace(".", ",")} km &mdash; lebih dekat daripada dua kantor Adira
              lain yang sekota.
            </p>
          </div>

          <ul className="mt-8 flex flex-col gap-4 max-w-175">
            <li className="flex items-start gap-3 p-4 bg-white border border-border rounded-xl">
              <span className="flex-1 text-title_black">
                <strong className="font-semibold">
                  <Link className="underline hover:text-primary" href={TERDEKAT_LINTAS_PROVINSI.href}>
                    {TERDEKAT_LINTAS_PROVINSI.nama}
                  </Link>
                </strong>
                <span className="block text-paragraph_black">{TERDEKAT_LINTAS_PROVINSI.wilayah}</span>
              </span>
              <span className="text-paragraph_black whitespace-nowrap">
                {String(TERDEKAT_LINTAS_PROVINSI.km).replace(".", ",")} km
              </span>
            </li>
            {DI_KOTA_BEKASI.map((c) => (
              <li className="flex items-start gap-3 p-4 bg-white border border-border rounded-xl" key={c.nama}>
                <span className="flex-1 text-title_black">
                  <strong className="font-semibold">{c.nama}</strong>
                  <span className="block text-paragraph_black">Kecamatan {c.kecamatan}, sekota</span>
                </span>
                <span className="text-paragraph_black whitespace-nowrap">
                  {String(c.km).replace(".", ",")} km
                </span>
              </li>
            ))}
            <li className="flex items-start gap-3 p-4 bg-white border border-border rounded-xl">
              <span className="flex-1 text-title_black">
                <strong className="font-semibold">{ARAH_DEPOK.nama}</strong>
                <span className="block text-paragraph_black">{ARAH_DEPOK.wilayah}, arah selatan</span>
              </span>
              <span className="text-paragraph_black whitespace-nowrap">
                {String(ARAH_DEPOK.km).replace(".", ",")} km
              </span>
            </li>
          </ul>

          <p className="mt-4 text-sm text-paragraph_black max-w-175">
            Jarak lurus di peta dari {CABANG.jalan}; jarak tempuh lebih panjang. Cabang mana yang memproses pengajuan
            tetap ditentukan Adira Finance. Satu entri lain di data kami, {ANOMALI_CIKARANG.nama}, terbaca{" "}
            {String(ANOMALI_CIKARANG.kmSemu).replace(".", ",")} km dari sini, tetapi koordinatnya keliru &mdash; nama
            dan kecamatannya menunjuk Cikarang Selatan, jadi tidak kami masukkan.
          </p>
        </div>
      </section>

      {/* Penutup. */}
      <section className="py-14 md:py-20" id="ajukan">
        <div className="container">
          <div className="max-w-200">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
              Sudah ketemu jawabannya? Kirim foto BPKB-nya
            </h2>
            <p className="mt-4 text-paragraph_black">
              Sebutkan &ldquo;Pondok Gede&rdquo; dan kecamatan Anda, biar kami arahkan ke cabang yang tepat.{" "}
              {PERNYATAAN_OJK}
            </p>
            <p className="mt-4 text-sm text-paragraph_black">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-title_black">{AGEN.id}</strong>. Nomor kantor cabang ada di bagian{" "}
              <a className="text-primary font-semibold underline" href="#alamat">
                alamat
              </a>
              .
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
