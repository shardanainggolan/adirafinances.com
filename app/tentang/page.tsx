import type { Metadata } from "next";
import Link from "next/link";

import SectionTitle from "@/components/ui/SectionTitle";
import { LINI_PEMBIAYAAN, PROFIL, SUMBER, TONGGAK } from "@/lib/adira-profil";
import { ADIRA, AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, SOSIAL_ADIRA, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Adira Finance — PT Adira Dinamika Multi Finance Tbk",
  description:
    "Profil PT Adira Dinamika Multi Finance Tbk (Adira Finance): sejarah sejak 1990, pencatatan saham ADMF di Bursa Efek Indonesia, kepemilikan Bank Danamon, dan lini pembiayaan yang dilayani.",
  alternates: { canonical: "/tentang" },
  openGraph: {
    type: "article",
    locale: "id_ID",
    url: `${SITE_URL}/tentang`,
    title: "Tentang Adira Finance — PT Adira Dinamika Multi Finance Tbk",
    description:
      "Profil PT Adira Dinamika Multi Finance Tbk: sejarah sejak 1990, saham ADMF di BEI, kepemilikan Bank Danamon, dan lini pembiayaannya.",
  },
};

/** Ringkasan identitas — dibuat sebagai <dl> agar terbaca mesin dan pembaca. */
const identitas: { k: string; v: string }[] = [
  { k: "Nama badan hukum", v: PROFIL.namaLegal },
  { k: "Dikenal sebagai", v: PROFIL.namaUmum },
  { k: "Didirikan", v: PROFIL.didirikan },
  { k: "Mulai beroperasi", v: PROFIL.mulaiBeroperasi },
  { k: "Tercatat di bursa", v: `${PROFIL.tercatatBei} · ${PROFIL.bursa}` },
  { k: "Kode saham", v: PROFIL.kodeSaham },
  { k: "Pemegang saham pengendali", v: `${PROFIL.induk} (${PROFIL.kepemilikanInduk})` },
  { k: "Bagian dari", v: PROFIL.grup },
  { k: "Diawasi oleh", v: PROFIL.regulator },
];

const kanalDigital = [
  { nama: "Adiraku", isi: "Aplikasi layanan konsumen, diluncurkan 20 Februari 2020." },
  { nama: "dicicilaja.com", isi: "Kanal pengajuan pembiayaan daring sejak 2017." },
  { nama: "momobil.id", isi: "Kanal jual beli dan pembiayaan mobil, sejak 2017." },
  { nama: "momotor.id", isi: "Kanal untuk sepeda motor, sejak 2018." },
];

export default function TentangPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/tentang#halaman`,
    url: `${SITE_URL}/tentang`,
    name: "Tentang Adira Finance",
    inLanguage: "id-ID",
    mainEntity: {
      "@type": "FinancialService",
      "@id": `${SITE_URL}/#adira`,
      name: PROFIL.namaLegal,
      alternateName: PROFIL.namaUmum,
      foundingDate: "1990-11-13",
      tickerSymbol: PROFIL.kodeSaham,
      parentOrganization: { "@type": "Organization", name: PROFIL.induk },
      address: {
        "@type": "PostalAddress",
        streetAddress: `${ADIRA.gedung}, ${ADIRA.jalan}`,
        addressLocality: ADIRA.kota,
        addressRegion: ADIRA.provinsi,
        postalCode: ADIRA.kodePos,
        addressCountry: "ID",
      },
      telephone: ADIRA.telepon,
      email: ADIRA.email,
      sameAs: [ADIRA.situs, ...SOSIAL_ADIRA.map((s) => s.url), ...SUMBER.map((s) => s.url)],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Kepala halaman */}
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
              <li aria-current="page">Tentang</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-[40px] sm:text-5xl lg:text-6xl leading-tight! text-title_black font-bold max-w-200">
            Tentang Adira Finance
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-200">
            <strong>{PROFIL.namaLegal}</strong> adalah perusahaan pembiayaan yang berdiri sejak{" "}
            {PROFIL.didirikan} dan mulai beroperasi pada {PROFIL.mulaiBeroperasi}. Sahamnya tercatat di{" "}
            {PROFIL.bursa} dengan kode {PROFIL.kodeSaham}, dan pengendali sahamnya adalah {PROFIL.induk} —
            menjadikannya bagian dari {PROFIL.grup}.
          </p>
        </div>
      </section>

      {/* Identitas perusahaan */}
      <section className="section-spacing-lg-md" id="profil">
        <div className="container">
          <SectionTitle
            eyebrow="PROFIL PERUSAHAAN"
            title="Identitas PT Adira Dinamika Multi Finance Tbk"
            excerpt="Data berikut dirangkum dari situs resmi Adira Finance dan sumber publik yang dicantumkan di bagian bawah halaman."
          />

          <div className="grid gap-6 lg:grid-cols-3" data-sttr-wrapper>
            <div className="lg:col-span-2" data-sttr-card>
              <dl className="flex flex-col">
                {identitas.map((row) => (
                  <div
                    className="flex items-start justify-between gap-4 sm:gap-6 py-4 border-b border-border"
                    key={row.k}
                  >
                    <dt className="text-paragraph_black">{row.k}</dt>
                    <dd className="text-title_black font-semibold text-right">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div data-sttr-card>
              <div className="h-full p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
                <h3 className="text-title_black text-xl font-semibold leading-tight">Kantor pusat</h3>
                <address className="mt-4 text-paragraph_black">
                  <strong className="block text-title_black">{PROFIL.namaLegal}</strong>
                  <span className="block mt-2">{ADIRA.gedung}</span>
                  <span className="block">{ADIRA.jalan}</span>
                  <span className="block">
                    {ADIRA.kota}, {ADIRA.provinsi} {ADIRA.kodePos}
                  </span>
                </address>
                <p className="mt-4 text-paragraph_black">
                  Layanan pelanggan{" "}
                  <a className="text-primary font-semibold" href={`tel:${ADIRA.telepon}`}>
                    {ADIRA.telepon}
                  </a>
                  <br />
                  <a className="text-primary font-semibold" href={`mailto:${ADIRA.email}`}>
                    {ADIRA.email}
                  </a>
                </p>
                <p className="mt-4 text-paragraph_black">{PERNYATAAN_OJK}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah */}
      <section className="section-spacing-lg relative z-1 bg-secondary" id="sejarah">
        <div className="container">
          <SectionTitle
            eyebrow="SEJARAH"
            title="Perjalanan Adira Finance sejak 1990"
            excerpt="Rangkaian tonggak berikut disusun dari catatan publik. Setiap butir mencantumkan tahunnya agar mudah ditelusuri."
          />

          <ol className="flex flex-col gap-4" data-sttr-wrapper>
            {TONGGAK.map((t) => (
              <li
                className="flex items-start gap-4 sm:gap-6 p-5 sm:p-6 bg-white border border-title_black/10 rounded-2xl"
                key={t.tahun + t.judul}
                data-sttr-card
              >
                <span className="shrink-0 px-4 py-2 rounded-xl bg-primary text-white font-semibold">
                  {t.tahun}
                </span>
                <div className="flex-1">
                  <h3 className="text-title_black text-lg md:text-xl font-semibold leading-tight">{t.judul}</h3>
                  <p className="mt-2 text-paragraph_black">{t.isi}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Lini pembiayaan */}
      <section className="section-spacing-lg-md" id="lini-pembiayaan">
        <div className="container">
          <SectionTitle
            eyebrow="LINI PEMBIAYAAN"
            title="Yang Dibiayai Adira Finance"
            excerpt="Cakupan Adira Finance lebih luas daripada yang ditangani situs ini. Situs ini fokus pada dana multiguna dengan jaminan BPKB."
          />

          <div className="grid gap-6 sm:grid-cols-2" data-sttr-wrapper>
            {LINI_PEMBIAYAAN.map((l) => (
              <div data-sttr-card key={l.judul}>
                <div className="h-full p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
                  <h3 className="text-title_black text-xl font-semibold leading-tight">{l.judul}</h3>
                  <p className="mt-3 text-paragraph_black">{l.isi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kanal digital */}
      <section className="section-spacing-lg-md" id="kanal-digital">
        <div className="container">
          <SectionTitle
            eyebrow="KANAL DIGITAL"
            title="Layanan Daring Adira Finance"
            excerpt="Selain jaringan cabang, Adira Finance mengoperasikan beberapa kanal digital untuk pengajuan dan layanan konsumen."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-sttr-wrapper>
            {kanalDigital.map((k) => (
              <div data-sttr-card key={k.nama}>
                <div className="h-full p-5 sm:p-6 bg-background border border-border rounded-2xl">
                  <h3 className="text-title_black text-lg font-semibold leading-tight">{k.nama}</h3>
                  <p className="mt-3 text-paragraph_black">{k.isi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Posisi situs ini */}
      <section className="section-spacing-lg-md" id="posisi-situs">
        <div className="container">
          <SectionTitle
            eyebrow="POSISI SITUS INI"
            title="Hubungan adirafinances.com dengan Adira Finance"
            excerpt="Bagian ini sengaja dibuat gamblang supaya tidak ada salah paham soal siapa yang Anda hubungi dan siapa yang membiayai."
          />

          <div className="grid gap-6 lg:grid-cols-2" data-sttr-wrapper>
            <div data-sttr-card>
              <div className="h-full p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
                <h3 className="text-title_black text-xl font-semibold leading-tight">Yang membiayai</h3>
                <p className="mt-3 text-paragraph_black">
                  {PROFIL.namaLegal}. Penilaian kendaraan, keputusan persetujuan, besar plafon, bunga, dan
                  pencairan dana seluruhnya ada di Adira Finance, dan prosesnya melalui kantor cabang.
                </p>
              </div>
            </div>

            <div data-sttr-card>
              <div className="h-full p-5 sm:p-6 md:p-8 bg-secondary rounded-2xl">
                <h3 className="text-title_black text-xl font-semibold leading-tight">Yang mengelola situs ini</h3>
                <p className="mt-3 text-paragraph_black">{DISCLOSURE_AGEN}</p>
                <p className="mt-3 text-paragraph_black">
                  Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> · ID AXI:{" "}
                  <strong className="text-title_black">{AGEN.id}</strong>. Nomor ID tersebut bisa Anda cocokkan ke
                  Adira Finance.
                </p>
                <div className="mt-8">
                  <a
                    className="button-primary"
                    href={waLink("Halo, saya ingin tanya soal pembiayaan Adira Finance")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hubungi via WhatsApp
                    <svg className="w-2.5 h-2.5 fill-current">
                      <use href="#buttonArrow" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sumber */}
      <section className="section-spacing-lg-md" id="sumber">
        <div className="container">
          <SectionTitle
            eyebrow="SUMBER"
            title="Rujukan Data di Halaman Ini"
            excerpt="Data profil dan sejarah di atas dirangkum dari sumber berikut, diperiksa pada 31 Agustus 2026."
          />

          <ul className="flex flex-col gap-3" data-sttr-wrapper>
            {SUMBER.map((s) => (
              <li className="text-paragraph_black" data-sttr-card key={s.url}>
                <a
                  className="text-primary font-semibold underline"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-paragraph_black max-w-200">
            Angka yang cepat berubah — jumlah karyawan, jumlah kantor cabang, maupun nilai aset — sengaja tidak
            dicantumkan agar halaman ini tidak menyesatkan saat data terbaru berbeda.
          </p>
        </div>
      </section>
    </>
  );
}
