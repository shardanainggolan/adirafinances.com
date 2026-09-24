import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  JUMLAH_KANTOR_DKI_BERNOMOR_021,
  KECAMATAN_JAKUT,
  PETA_EMBED,
  PETA_URL,
  TERDEKAT,
} from "@/lib/cabang-kelapa-gading";
import { ADIRA, AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";

/**
 * Halaman cabang Adira Finance Kelapa Gading – Jakarta Utara.
 *
 * Bentuk kesembilan. Delapan sebelumnya: lokasi, proses, cara sampai,
 * identitas, perbandingan, verifikasi, tanya-jawab, anatomi alamat.
 *
 * Halaman ini dipimpin KETERSEDIAAN KONTAK. Dua kata kunci yang diminta
 * pemilik adalah "no telp adira finance kelapa gading", padahal dataset tidak
 * punya nomor telepon maupun faks untuk cabang ini. Nomornya tidak dikarang.
 * Yang dilakukan: hero langsung menunjukkan data apa yang ada dan apa yang
 * tidak (kotak status), lalu section pertama menjelaskan jalur kontak yang
 * terverifikasi. Menjawab pertanyaan "nomornya berapa" dengan jujur adalah
 * cara paling berguna — dan satu-satunya yang aman di situs YMYL.
 *
 * Catatan untuk pemilik: nomor layanan pelanggan nasional Adira (1500511)
 * disebut di badan halaman ini sebagai jawaban pertanyaan telepon — bukan
 * sebagai tombol CTA. Aturan "kontak nasional hanya di footer" (SKILL.md §0)
 * sengaja dilonggarkan di sini dan dilaporkan; tombol aksi tetap WhatsApp.
 *
 * Aturan tetap (SKILL.md §8): boilerplate nasional hanya ditautkan; nomor
 * WhatsApp agen tidak pernah tampil sebagai nomor cabang; yang belum
 * diverifikasi tidak terbit.
 */

const JUDUL = "Adira Finance Kelapa Gading — Alamat & Nomor Telepon";
const DESKRIPSI =
  "Alamat Adira Finance Kelapa Gading di Jl. Boulevard Bukit Gading Raya No. 5 Blok F, Jakarta Utara, soal nomor teleponnya, dan cara gadai BPKB motor atau mobil lewat cabang ini.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Kelapa Gading";

/** Kotak status di hero: apa yang ada di data cabang, apa yang tidak. */
const status = [
  { hal: "Alamat kantor", nilai: "Ada", tautan: "#alamat", ada: true },
  { hal: "Titik peta", nilai: "Ada", tautan: "#alamat", ada: true },
  { hal: "Nomor telepon kantor", nilai: "Tidak tercantum", tautan: "#nomor-telepon", ada: false },
];

export default function KelapaGadingPage() {
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
      // mengaku mengoperasikan kantor ini — lihat SKILL.md §0. Tidak ada
      // `telephone` di mana pun: nomornya tidak ada di data.
      {
        "@type": "Service",
        "@id": `${SITE_URL}/${CABANG.slug}#layanan`,
        name: "Gadai BPKB mobil dan motor — cabang Kelapa Gading, Jakarta Utara",
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

      {/* Hero dengan kotak status — apa yang ada dan apa yang tidak. */}
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
              <li aria-current="page">Kelapa Gading, Jakarta Utara</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 items-end">
            <div>
              <p className="text-base lg:text-lg font-semibold uppercase text-primary">
                {CABANG.kecamatan} &middot; Jakarta Utara
              </p>
              <h1 className="mt-3 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black">
                Adira Finance Kelapa Gading
              </h1>
              <p className="mt-4 text-base sm:text-lg text-paragraph_black">
                Kantornya di {CABANG.gedung}, {CABANG.jalan}. Kalau Anda sampai di sini karena mencari nomor
                teleponnya, langsung kami jawab: di data cabang yang kami pegang, nomor telepon kantor ini tidak
                tercantum. Di bawah kami jelaskan cara menghubunginya tanpa menebak-nebak nomor.
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

            <div className="p-5 sm:p-6 md:p-8 border-2 border-secondary rounded-3xl">
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Data cabang ini</p>
              <ul className="mt-3 divide-y">
                {status.map((s) => (
                  <li className="flex items-center justify-between gap-4 py-3" key={s.hal}>
                    <span className="text-title_black">{s.hal}</span>
                    <a
                      className={
                        s.ada
                          ? "text-title_black font-semibold underline hover:text-primary"
                          : "text-paragraph_black font-semibold underline hover:text-primary"
                      }
                      href={s.tautan}
                    >
                      {s.nilai}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Soal nomor telepon — jawaban jujur + jalur yang terverifikasi. */}
      <section className="section-spacing-lg-md bg-background" id="nomor-telepon">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              No telp Adira Finance Kelapa Gading
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Nomornya tidak ada di data kami, dan kami tidak akan menebaknya
            </h2>
            <p className="mt-4 text-paragraph_black">
              Data cabang Adira yang kami pegang tidak mencantumkan nomor telepon maupun faks untuk kantor Kelapa
              Gading. Daripada memasang nomor yang belum pasti benar, berikut tiga jalur yang bisa Anda pakai
              sekarang.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Untuk gadai BPKB</p>
              <h3 className="mt-2 text-title_black text-xl font-semibold leading-tight">WhatsApp kami</h3>
              <p className="mt-3 text-paragraph_black">
                {AGEN.waTampilan}. Ini nomor kami sebagai agen AXI yang memasarkan pembiayaan Adira &mdash; bukan
                nomor kantor cabang. Pengajuan gadai BPKB bisa dimulai dari sini.
              </p>
            </div>
            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Layanan resmi Adira</p>
              <h3 className="mt-2 text-title_black text-xl font-semibold leading-tight">{ADIRA.telepon}</h3>
              <p className="mt-3 text-paragraph_black">
                Nomor layanan pelanggan PT Adira Dinamika Multi Finance, Tbk &mdash; juga tercantum di bagian bawah
                setiap halaman situs ini. Cocok untuk pertanyaan soal kontrak atau tagihan yang sudah berjalan.
              </p>
            </div>
            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Datang langsung</p>
              <h3 className="mt-2 text-title_black text-xl font-semibold leading-tight">Ke Bukit Gading Raya</h3>
              <p className="mt-3 text-paragraph_black">
                Alamat dan titik petanya ada di bawah. Kalau mau gadai BPKB, sebaiknya kirim foto berkasnya dulu
                supaya tidak bolak-balik.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-paragraph_black max-w-175">
            Satu hal yang bisa membantu: di data kami, {JUMLAH_KANTOR_DKI_BERNOMOR_021} kantor Adira lain di Jakarta
            semuanya memakai nomor telepon tetap berawalan 021. Kalau Anda menemukan nomor HP yang mengaku sebagai
            nomor kantor cabang, kemungkinan besar itu nomor agen atau pemasar &mdash; seperti nomor WhatsApp kami di
            atas, yang memang kami sebut terus terang sebagai nomor agen.
          </p>
        </div>
      </section>

      {/* Alamat + peta + konteks Jakarta Utara. */}
      <section className="section-spacing-lg-md" id="alamat">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Alamat Adira Finance Kelapa Gading
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Satu-satunya kantor Adira di Jakarta Utara
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black text-lg">{CABANG.gedung}</strong>
                <span className="block mt-2">{CABANG.jalan}</span>
                <span className="block">
                  {CABANG.rtRw}, Kelurahan {CABANG.kelurahan}
                </span>
                <span className="block">
                  Kecamatan {CABANG.kecamatan}, {CABANG.kota}
                </span>
                <span className="block">
                  {CABANG.provinsi} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-6 text-paragraph_black">
                Jakarta Utara punya {KECAMATAN_JAKUT.length} kecamatan &mdash; {KECAMATAN_JAKUT.join(", ")} &mdash; dan
                di data kami hanya ada satu kantor Adira di seluruh kota itu, yaitu yang ini. Pin-nya di Google Maps
                bertuliskan &ldquo;{CABANG.namaMaps}&rdquo;; titiknya {CABANG.lintang}, {CABANG.bujur}.
              </p>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.nama} tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Cabang sekitar — daftar ringkas, tiga di antaranya sudah punya halaman. */}
      <section className="section-spacing-lg-md bg-background" id="sekitar">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Kalau lebih dekat ke tempat lain
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Lima kantor Adira terdekat dari Kelapa Gading
            </h2>
            <p className="mt-4 text-paragraph_black">
              Karena ini satu-satunya kantor di Jakarta Utara, tetangga terdekatnya ada di kota lain. Jaraknya lurus di
              peta; jarak tempuh lebih panjang. Cabang mana yang memproses pengajuan tetap ditentukan Adira Finance.
            </p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TERDEKAT.map((c) => (
              <li className="p-5 bg-white border border-border rounded-2xl" key={c.nama}>
                <p className="text-title_black text-2xl font-bold">
                  {String(c.km).replace(".", ",")}
                  <span className="text-base font-semibold"> km</span>
                </p>
                <p className="mt-2 text-title_black font-semibold">
                  {c.href ? (
                    <Link className="underline hover:text-primary" href={c.href}>
                      {c.nama}
                    </Link>
                  ) : (
                    c.nama
                  )}
                </p>
                <p className="text-paragraph_black">{c.wilayah}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-paragraph_black max-w-175">
            Dua entri Cikarang di data kami sengaja tidak dimasukkan: koordinat keduanya keliru, jadi jarak yang
            terbaca dari sini tidak bisa dipercaya.
          </p>
        </div>
      </section>

      {/* Gadai BPKB — ringkas. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Kelapa Gading
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              BPKB-nya yang dijaminkan, kendaraannya tetap di Anda
            </h2>
            <p className="mt-4 text-paragraph_black">
              Motor maupun mobil bisa. Berkas dasarnya eKTP, Kartu Keluarga, bukti penghasilan, dan bukti tempat
              tinggal; untuk BPKB mobil ditambah NPWP. Daftar lengkapnya ada di{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                halaman persyaratan
              </Link>
              , dan perkiraan dana yang bisa cair bisa Anda cek di{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              Karena nomor kantornya tidak tercantum, cara paling praktis memulai adalah lewat WhatsApp: kirim foto
              BPKB, STNK, dan eKTP, tulis &ldquo;Kelapa Gading&rdquo;, lalu kami bantu cek kelayakannya. Ke kantor di
              Bukit Gading Raya baru perlu di tahap akhir &mdash; tanda tangan dan serah terima BPKB. Urutan resminya
              ada di{" "}
              <Link className="text-primary font-semibold underline" href="/#alur">
                alur pengajuan
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Penutup gelap. */}
      <section className="py-14 md:py-20 bg-primary" id="ajukan">
        <div className="container">
          <div className="max-w-200">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              Tidak perlu menebak nomor. Mulai dari chat saja
            </h2>
            <p className="mt-4 text-white">{PERNYATAAN_OJK}</p>
            <p className="mt-4 text-sm text-white">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-secondary">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-secondary">{AGEN.id}</strong>.
            </p>
            <div className="mt-8">
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
        </div>
      </section>
    </>
  );
}
