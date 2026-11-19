import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  MAKASSAR_LAIN,
  NAMA_PT,
  PATOKAN,
  PETA_EMBED,
  PETA_URL,
} from "@/lib/cabang-ap-pettarani-makassar";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance AP Pettarani – Makassar.
 *
 * Bentuk ketiga puluh empat. Tiga puluh tiga sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama, garis waktu kawasan, daftar cek, bundaran
 * sebagai titik nol, matriks bukti, lembar ralat, naskah telepon, penampang
 * jalan, kotak pencarian, satu kecamatan dua kantor, pesan untuk driver.
 *
 * Halaman ini dipimpin JALAN BERTINGKAT: diagram dua lantai — Tol Layang A.P.
 * Pettarani di atas, jalan arteri + kantor di bawah (sisi timur).
 * Sumber di `lib/cabang-ap-pettarani-makassar.ts`.
 */

const JUDUL = "Adira Finance AP Pettarani Makassar — Delta Ramayana Jade, Telepon & Peta";
const DESKRIPSI =
  "Adira Finance AP Pettarani di Ruko Delta Ramayana Jade, Jl. A.P. Pettarani, Panakkukang, Makassar — di bawah tol layang, sisi timur. Telepon 0411-421006 dan cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya di Makassar dan mau gadai BPKB lewat Adira Pettarani";
const km = (n: number) => String(n).replace(".", ",");
const tel = (n: string) => `tel:${n.replace(/[^0-9]/g, "")}`;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function ApPettaraniMakassarPage() {
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
        name: "Gadai BPKB mobil dan motor — Adira Jl. A.P. Pettarani, Makassar",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero kuning. */}
      <section className="py-14 md:py-20 lg:py-24 bg-secondary relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-title_black">
              <li>
                <Link className="underline" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">AP Pettarani, Makassar</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance AP Pettarani Makassar
          </h1>
          <p className="mt-4 text-base sm:text-lg text-title_black max-w-175">
            {CABANG.kompleks}, {CABANG.jalan}, {CABANG.kelurahan}, Kecamatan {CABANG.kecamatan}, {CABANG.kota}{" "}
            {CABANG.kodePos}.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={tel(CABANG.telepon[0].nomor)}>
              Telepon {CABANG.telepon[0].nomor}
            </a>
            <a className="text-title_black font-semibold underline" href={PETA_URL} target="_blank" rel="noopener noreferrer">
              buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Jalan bertingkat. */}
      <section className="section-spacing-lg-md" id="dua-tingkat">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Jalan dua tingkat
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Kantornya di bawah, bukan di tol layang
              </h2>
              <p className="mt-4 text-paragraph_black">
                Di atas Jl. A.P. Pettarani membentang Jalan Tol Layang A.P. Pettarani (OpenStreetMap). Kantor Adira ada di
                jalan bawahnya, di deretan ruko sisi timur. Jadi kalau Anda sedang di tol layang, kantor ini tidak bisa
                langsung dimasuki. Anda perlu sudah berada di jalan bawah.
              </p>
              <p className="mt-4 text-paragraph_black">
                Jalan bawahnya sendiri terbagi dua jalur terpisah. Kantor ada di sisi timur, jadi pastikan Anda berada di jalur
                yang sisi timur sebelum mencari Ruko Delta Ramayana Jade. Ikuti rambu arah di lapangan.
              </p>
            </div>

            <div
              className="p-5 sm:p-6 bg-background rounded-3xl"
              role="img"
              aria-label="Diagram: tol layang di atas, di bawahnya jalur barat dan jalur timur, kantor Adira di sisi timur"
            >
              <div className="flex gap-2">
                <div
                  className="flex items-center justify-center p-3 bg-title_black rounded-xl text-white text-sm font-semibold text-center"
                  style={{ flex: "2 1 0", minHeight: "4rem" }}
                >
                  Tol layang (atas)
                </div>
                <div style={{ flex: "1 1 0" }} />
              </div>
              <div className="flex gap-2" aria-hidden="true">
                <div className="flex justify-around" style={{ flex: "2 1 0", height: "2rem" }}>
                  <span className="block bg-title_black" style={{ width: "0.5rem" }} />
                  <span className="block bg-title_black" style={{ width: "0.5rem" }} />
                </div>
                <div style={{ flex: "1 1 0" }} />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col items-center justify-center p-3 bg-white border border-border rounded-xl text-center" style={{ flex: "1 1 0", minHeight: "6rem" }}>
                  <span className="block text-sm font-semibold text-title_black">Jalur barat</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-white border border-border rounded-xl text-center" style={{ flex: "1 1 0", minHeight: "6rem" }}>
                  <span className="block text-sm font-semibold text-title_black">Jalur timur</span>
                </div>
                <div className="flex items-center justify-center p-3 bg-secondary rounded-xl text-center" style={{ flex: "1 1 0", minHeight: "6rem" }}>
                  <span className="block text-sm font-bold text-title_black">Adira</span>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-sm text-paragraph_black">
                <span>Barat</span>
                <span>Timur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alamat, telepon, peta, patokan. */}
      <section className="section-spacing-lg-md bg-background" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Makassar Pettarani
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">
                  {CABANG.kompleks}, {CABANG.jalan}
                </span>
                <span className="block">
                  {CABANG.kelurahan}, Kec. {CABANG.kecamatan}, {CABANG.kota} {CABANG.kodePos}
                </span>
              </address>
              <div className="mt-6 p-5 bg-white rounded-2xl">
                <ul className="grid gap-2">
                  {CABANG.telepon.map((t) => (
                    <li className="flex flex-wrap items-center justify-between gap-2" key={t.nomor}>
                      <a className="text-title_black font-semibold hover:text-primary whitespace-nowrap" href={tel(t.nomor)}>
                        {t.nomor}
                      </a>
                      <span className="text-sm text-paragraph_black">{t.sumber}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-paragraph_black">
                  Faks {CABANG.fax.join(", ")}. Di Google Maps kantor ini bernama &ldquo;{CABANG.namaMaps}&rdquo; dengan{" "}
                  {CABANG.ulasan} ulasan. WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen, bukan nomor cabang.
                </p>
              </div>

              <h3 className="mt-8 text-title_black text-xl font-semibold leading-tight">Patokan</h3>
              <p className="mt-2 text-paragraph_black">
                Menurut peta Google, Ramayana Pettarani ada di kompleks yang sama, di sebelah selatan kantor.
              </p>
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
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance AP Pettarani, Makassar" tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Pettarani lain + Makassar lain. */}
      <section className="section-spacing-lg-md" id="adira-makassar">
        <div className="container">
          <div className="max-w-175">
            <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Pettarani yang lain, Makassar yang lain
            </h2>
            <p className="mt-4 text-paragraph_black">
              Dua hal yang perlu diperhatikan sebelum berangkat. Pertama, di data cabang kami ada kantor Adira lain yang juga
              beralamat di &ldquo;Jl. AP. Pettarani&rdquo;, tapi letaknya di Kabupaten Sinjai, bukan Makassar. Kedua, di
              Kota Makassar sendiri Google Maps mencatat dua kantor Adira lain:
            </p>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 max-w-200">
            {MAKASSAR_LAIN.map((k) => (
              <li className="p-5 border border-border rounded-2xl" key={k.nama}>
                <a className="block text-primary font-semibold underline" href={k.peta} target="_blank" rel="noopener noreferrer">
                  {k.nama}
                </a>
                <span className="block mt-1 text-paragraph_black">{k.alamat}</span>
                <span className="block mt-2 text-sm text-paragraph_black">
                  ±{km(k.km)} km ke {k.arah} dari Pettarani
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Makassar
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Pettarani
            </h2>
            <p className="mt-4 text-paragraph_black">
              BPKB disimpan Adira selama pinjaman berjalan, sedangkan kendaraannya tetap Anda pakai. Untuk motor, tabel
              referensi kami ada di rentang {rupiah(motorMin)}&ndash;{rupiah(motorMaks)} dengan tenor sampai{" "}
              {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan. Untuk mobil {rupiah(mobilMin)}&ndash;
              {rupiah(mobilMaks)}, tenor sampai {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, dan pemohon
              menyertakan NPWP. Angka yang disetujui keluar setelah survei Adira.
            </p>
            <p className="mt-4 text-paragraph_black">
              Prosesnya bisa dimulai sambil di rumah atau di kantor Anda: foto BPKB, STNK, dan eKTP dikirim untuk dicek
              kelengkapannya. Kunjungan ke Ruko Delta Ramayana Jade baru diperlukan di akhir, untuk tanda tangan dan
              menyerahkan BPKB asli. Cek{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                daftar persyaratan
              </Link>{" "}
              dan{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi cicilan
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              &ldquo;PT Adira Finance Makassar&rdquo; maupun &ldquo;PT Adira Finance AP Pettarani&rdquo; bukan nama badan
              usaha; keduanya kantor {NAMA_PT}. Ringkasan perusahaannya di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan Adira.
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
                Panakkukang, Rappocini, Manggala, dan sekitarnya
              </h2>
              <p className="mt-4 text-paragraph_black">
                Ceritakan kendaraan Anda (merek, tipe, tahun) lewat WhatsApp. Dari situ kami bisa kasih gambaran awal
                sebelum berkas dikirim ke Adira.
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
