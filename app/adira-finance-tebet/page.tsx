import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  ANOMALI_CIKARANG,
  CABANG,
  DKI_JAKARTA,
  KECAMATAN_JAKSEL,
  PETA_EMBED,
  PETA_URL,
} from "@/lib/cabang-tebet";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Tebet – Jakarta Selatan.
 *
 * Bentuk keenam. Lima sebelumnya: lokasi (Alam Sutera), proses (Sawangan),
 * cara sampai (Ciputat), identitas (Pasar Baru), perbandingan (Tajur).
 * Halaman ini dipimpin VERIFIKASI, karena masalah nyata cabang ini adalah
 * pin Google Maps-nya cuma bertuliskan "Adira Finance" — tanpa kata Tebet,
 * tanpa pembeda — sementara di DKI Jakarta ada enam kantor Adira di data
 * kami. Orang yang mencari "alamat adira finance tebet" perlu memastikan
 * pin yang dia buka memang yang ini.
 *
 * Susunannya: hero putih satu kolom → tiga kartu bernomor "cara memastikan"
 * dengan alamat dan peta DI DALAM section itu (peta sebagai bukti, bukan
 * pelengkap kontak di bawah) → tabel enam cabang DKI dengan baris ini
 * disorot → gadai BPKB yang dipimpin motor → penutup dua kolom.
 *
 * Aturan tetap (SKILL.md §8): boilerplate nasional hanya ditautkan; nomor
 * WhatsApp agen tidak pernah tampil sebagai nomor cabang; yang belum
 * diverifikasi tidak terbit. Angka plafon motor DIBACA dari
 * `lib/tabel-angsuran.ts`, bukan diketik ulang.
 */

const JUDUL = "Alamat Adira Finance Tebet, Jaksel — Gadai BPKB Mobil & Motor";
const DESKRIPSI = `Alamat Adira Finance Tebet: ${CABANG.jalan} ${CABANG.blok}, ${CABANG.kelurahan}, Jakarta Selatan. Telepon kantor, cara memastikan pin Maps-nya, dan gadai BPKB motor atau mobil.`;

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Tebet Jakarta Selatan";

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];

/** Tiga hal yang membedakan pin ini dari lima pin Adira lain di Jakarta. */
const caraMemastikan = [
  {
    judul: "Lihat nama jalannya",
    isi: `${CABANG.jalan}, ${CABANG.blok}. Kalau nama jalan di pin yang Anda buka bukan KH Abdullah Syafei, itu cabang lain.`,
  },
  {
    judul: "Lihat kelurahannya",
    isi: `${CABANG.kelurahan}. Kecamatannya memang ${CABANG.kecamatan}, tapi kelurahannya ${CABANG.kelurahan} — dua nama tempat yang berbeda dalam satu alamat, dan keduanya benar.`,
  },
  {
    judul: "Cocokkan kode posnya",
    isi: `${CABANG.kodePos}. Ini pembeda paling cepat kalau Anda menyalin alamat dari hasil pencarian.`,
  },
];

export default function TebetPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Tebet, Jakarta Selatan",
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

      {/* Hero putih satu kolom — alamatnya disebut di dalam kalimat, bukan
          sebagai kartu, supaya tidak mengulang bentuk halaman Ciputat. */}
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
              <li aria-current="page">Tebet, Jakarta Selatan</li>
            </ol>
          </nav>

          <p className="mt-8 text-base lg:text-lg font-semibold uppercase text-primary">
            Kecamatan {CABANG.kecamatan} &middot; {CABANG.kota} &middot; {CABANG.provinsi}
          </p>
          <h1 className="mt-3 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Cabang Tebet
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            Kantornya di {CABANG.jalan} {CABANG.blok}, kelurahan {CABANG.kelurahan}. Satu hal yang sering bikin orang
            ragu: di Google Maps pin kantor ini cuma tertulis{" "}
            <strong className="text-title_black">&ldquo;{CABANG.namaMaps}&rdquo;</strong> &mdash; tanpa kata Tebet.
            Padahal di Jakarta ada enam kantor Adira. Halaman ini membantu Anda memastikan yang Anda buka memang yang
            ini, lalu menjelaskan cara gadai BPKB motor atau mobil lewat cabang ini.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a className="button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              Tanya Lewat WhatsApp
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href="#pin-yang-benar">
              Pastikan dulu pin-nya
            </a>
          </div>
        </div>
      </section>

      {/* Verifikasi: tiga kartu bernomor, lalu alamat lengkap dan peta sebagai
          buktinya — peta sengaja di sini, bukan di bawah sebagai pelengkap. */}
      <section className="section-spacing-lg-md bg-background" id="pin-yang-benar">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Pin-nya tidak bernama
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Tiga cara memastikan ini cabang Tebet
            </h2>
            <p className="mt-4 text-paragraph_black">
              Nama pin di peta tidak bisa dipakai membedakan, jadi pakai tiga hal di bawah ini.
            </p>
          </div>

          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {caraMemastikan.map((c, i) => (
              <li className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl" key={c.judul}>
                <span
                  className="w-20 h-20 rounded-full bg-secondary text-title_black font-bold text-2xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-title_black text-xl font-semibold leading-tight">{c.judul}</h3>
                <p className="mt-2 text-paragraph_black">{c.isi}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-title_black text-xl font-semibold leading-tight">Alamat lengkapnya</h3>
              <address className="mt-4 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">
                  {CABANG.jalan} {CABANG.blok}
                </span>
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

              <div className="mt-8 border-l-2 border-primary pl-5 flex flex-col gap-4">
                <div>
                  <p className="text-sm uppercase tracking-wide text-paragraph_black">Telepon kantor cabang</p>
                  {CABANG.telepon.map((n) => (
                    <a
                      className="block text-title_black text-xl font-semibold"
                      href={`tel:${n.replace(/-/g, "")}`}
                      key={n}
                    >
                      {n}
                    </a>
                  ))}
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-paragraph_black">Faks &middot; Koordinat</p>
                  <p className="text-title_black font-semibold">
                    {CABANG.fax} &middot; {CABANG.lintang}, {CABANG.bujur}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-paragraph_black">
                Nomor di atas milik kantor cabang. WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen &mdash;
                bukan nomor cabang.
              </p>
            </div>

            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.nama} tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Enam cabang DKI — tabel dengan baris halaman ini disorot. */}
      <section className="section-spacing-lg-md" id="enam-di-jakarta">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Enam di Jakarta
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Kantor Adira lain yang pin-nya mirip
            </h2>
            <p className="mt-4 text-paragraph_black">
              Di data kami ada enam kantor Adira di DKI Jakarta. Jakarta Selatan sendiri punya{" "}
              {KECAMATAN_JAKSEL.length} kecamatan &mdash; {KECAMATAN_JAKSEL.join(", ")} &mdash; tapi cuma dua kantor:
              Tebet dan Pondok Indah Baru. Kalau ternyata ada yang lebih dekat dari tempat Anda, sebutkan saja waktu
              menghubungi kami; cabang mana yang memproses tetap ditentukan Adira Finance.
            </p>
          </div>

          <div className="mt-10" style={{ overflowX: "auto" }}>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-secondary">
                  <th scope="col" className="px-4 py-3 text-sm font-semibold text-title_black whitespace-nowrap">
                    Kantor
                  </th>
                  <th scope="col" className="px-4 py-3 text-sm font-semibold text-title_black whitespace-nowrap">
                    Kota
                  </th>
                  <th scope="col" className="px-4 py-3 text-sm font-semibold text-title_black whitespace-nowrap">
                    Kecamatan
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-semibold text-title_black whitespace-nowrap text-right"
                  >
                    Jarak dari Tebet
                  </th>
                </tr>
              </thead>
              <tbody>
                {DKI_JAKARTA.map((c) => (
                  <tr className={c.iniHalaman ? "border-t border-border bg-background" : "border-t border-border"} key={c.nama}>
                    <td className="px-4 py-3 text-title_black font-semibold whitespace-nowrap">{c.nama}</td>
                    <td className="px-4 py-3 text-paragraph_black whitespace-nowrap">{c.kota}</td>
                    <td className="px-4 py-3 text-paragraph_black whitespace-nowrap">{c.kecamatan}</td>
                    <td className="px-4 py-3 text-paragraph_black text-right whitespace-nowrap">
                      {c.iniHalaman ? "halaman ini" : `${String(c.km).replace(".", ",")} km`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-paragraph_black">
            Jarak lurus di peta dari {CABANG.jalan}; jarak tempuh lebih panjang. Satu entri lain di data kami,{" "}
            {ANOMALI_CIKARANG.nama}, koordinatnya jatuh {String(ANOMALI_CIKARANG.kmSemuTebet).replace(".", ",")} km
            dari sini, padahal nama dan kecamatannya menunjuk Cikarang &mdash; dan titik itu{" "}
            {String(ANOMALI_CIKARANG.kmKeCikarangLain).replace(".", ",")} km dari cabang Cikarang lain yang
            sekecamatan. Koordinatnya keliru, jadi tidak kami masukkan ke tabel.
          </p>
        </div>
      </section>

      {/* Gadai BPKB, dipimpin motor sesuai kata kunci yang dicari. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Kalau jaminannya motor
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Gadai BPKB motor lewat cabang Tebet
              </h2>
              <p className="mt-4 text-paragraph_black">
                Untuk BPKB motor, NPWP tidak diminta &mdash; itu yang paling sering ditanyakan. Sisanya sama: eKTP,
                Kartu Keluarga, bukti penghasilan, dan bukti tempat tinggal. Di tabel referensi kami, pinjaman dengan
                jaminan BPKB motor ada di rentang {rupiah(motorMin)} sampai {rupiah(motorMaks)}, dengan pilihan tenor{" "}
                {TABEL_MOTOR.tenor.join(", ")} bulan. Angka itu gambaran, bukan penawaran &mdash; plafon final
                ditetapkan Adira setelah motornya dilihat.
              </p>
              <p className="mt-4 text-paragraph_black">
                Untuk BPKB mobil, yang berubah cuma dua: NPWP ikut diminta, dan rentang plafonnya jauh lebih lebar.
                Rinciannya ada di{" "}
                <Link className="text-primary font-semibold underline" href="/#tabel-angsuran">
                  tabel angsuran
                </Link>
                .
              </p>
            </div>

            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Urutannya singkat saja</h3>
              <ol className="mt-4 flex flex-col gap-3 text-paragraph_black">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold shrink-0">1.</span>
                  <span className="flex-1">
                    Kirim foto BPKB, STNK, dan eKTP ke WhatsApp kami. Tulis &ldquo;Tebet&rdquo; di pesan pertama.
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
                    Tanda tangan dan serah terima BPKB di {CABANG.jalan}, lalu dana cair. Kendaraan tetap Anda pakai.
                  </span>
                </li>
              </ol>
              <p className="mt-4 text-sm text-paragraph_black">
                Mau tahu perkiraan angkanya lebih dulu? Pakai{" "}
                <Link className="text-primary font-semibold underline" href="/simulasi">
                  simulasi angsuran
                </Link>
                , yang memakai data kendaraan yang sama dengan Adira.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Penutup dua kolom: ajakan di kiri, nomor cabang diulang di kanan. */}
      <section className="py-14 md:py-20" id="ajukan">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
                Kirim foto BPKB-nya, sebut &ldquo;Tebet&rdquo;
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

            <div className="p-5 sm:p-6 md:p-8 border-2 border-dashed border-border rounded-2xl">
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Mau telepon kantornya langsung?</p>
              <ul className="mt-3 flex flex-col gap-1">
                {CABANG.telepon.map((n) => (
                  <li key={n}>
                    <a className="text-title_black text-xl font-semibold" href={`tel:${n.replace(/-/g, "")}`}>
                      {n}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-paragraph_black">
                {CABANG.jalan} {CABANG.blok}, {CABANG.kelurahan}, {CABANG.kecamatan}, {CABANG.kota}{" "}
                {CABANG.kodePos}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
