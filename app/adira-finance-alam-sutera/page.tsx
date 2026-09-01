import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  ALAMAT_RINGKAS,
  CABANG,
  CABANG_TERDEKAT,
  KECAMATAN_TANGSEL,
  PETA_EMBED,
  PETA_URL,
} from "@/lib/cabang-alam-sutera";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";

/**
 * Halaman lokasi Adira Finance Alam Sutera.
 *
 * Rencana lengkap: `docs/rencana-halaman-alam-sutera.md`.
 *
 * Dua aturan yang menentukan bentuk halaman ini, keduanya konsekuensi dari
 * `.claude/skills/seo-adira/SKILL.md` §8:
 *
 * 1. Boilerplate nasional TIDAK disalin ke sini. Syarat lengkap, tabel
 *    angsuran, dan alur pengajuan sudah punya halaman kanonik — di sini cukup
 *    ringkasan satu kalimat plus tautan. Menyalinnya adalah cacat yang membuat
 *    372 halaman cabang di properti sebelumnya kehilangan peringkat.
 * 2. Nomor WhatsApp agen tidak pernah tampil sebagai nomor cabang, dan tidak
 *    pernah masuk ke <title>.
 */

const JUDUL = "Adira Finance Alam Sutera, Serpong Utara — Lokasi & Pengajuan";
const DESKRIPSI = `Alamat, kontak, dan layanan pembiayaan Adira Finance Alam Sutera di ${CABANG.jalan}, ${CABANG.kecamatan}, ${CABANG.kota}.`;

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

const tanya = [
  {
    q: "Adira Alam Sutera itu di Tangerang atau Tangerang Selatan?",
    a: `Kantornya berada di ${CABANG.kecamatan}, ${CABANG.kota} — bukan Kota Tangerang. Penyebutan "Tangerang" umum dipakai karena kawasan Alam Sutera memang berada di perbatasan keduanya, jadi keduanya merujuk tempat yang sama.`,
  },
  {
    q: "Kenapa di Google Maps namanya berbeda?",
    a: `Titik lokasi ini terdaftar di Google Maps dengan nama "${CABANG.namaMaps}". Nama itu merujuk alamat yang sama dengan yang tertera di halaman ini.`,
  },
  {
    q: "Kalau saya dari Ciputat atau Pondok Aren, ke mana sebaiknya?",
    a: `Dari kawasan Ciputat, cabang Adira Finance Ciputat berjarak sekitar ${CABANG_TERDEKAT[2].km} km dari lokasi ini. Cabang mana yang memproses pengajuan Anda ditentukan Adira Finance, jadi hubungi kami dulu sebelum berangkat.`,
  },
];

export default function AlamSuteraPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/${CABANG.slug}#remah`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: CABANG.nama,
            item: `${SITE_URL}/${CABANG.slug}`,
          },
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
      // Layanannya milik Adira; situs ini agen yang memasarkannya. Karena itu
      // `provider` menunjuk entitas Adira, dan halaman ini TIDAK memancarkan
      // Organization/LocalBusiness yang mengklaim mengoperasikan kantor
      // tersebut — lihat SKILL.md §0 soal tabrakan entitas dengan adira.co.id.
      {
        "@type": "Service",
        "@id": `${SITE_URL}/${CABANG.slug}#layanan`,
        name: "Pembiayaan dengan jaminan BPKB — Alam Sutera",
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
              <li aria-current="page">Alam Sutera</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-[40px] sm:text-5xl lg:text-6xl leading-tight! text-title_black font-bold max-w-200">
            Adira Finance Alam Sutera
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-200">
            Kantornya ada di {CABANG.jalan}, tepat di koridor Raya Serpong yang memisahkan kawasan Alam Sutera dari
            Serpong. Secara administratif alamatnya {CABANG.kecamatan}, {CABANG.kota} &mdash; meski namanya lazim
            ditulis &ldquo;Alam Sutera &ndash; Tangerang&rdquo;. Di Google Maps titik ini terdaftar sebagai{" "}
            <strong className="text-title_black">{CABANG.namaMaps}</strong>.
          </p>

          <div className="mt-8">
            <a
              className="button-primary"
              href={waLink("Halo, saya ingin tanya pembiayaan di Adira Finance Alam Sutera")}
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
      </section>

      <section className="section-spacing-lg-md" id="lokasi">
        <div className="container">
          <SectionTitle
            eyebrow="SERPONG UTARA"
            title="Alamat Adira Finance Alam Sutera"
            excerpt="Nomor 021-5312 di bawah ini nomor kantor cabang. Nomor WhatsApp kami terpisah — kami agen yang memasarkan, bukan kantor cabangnya."
          />

          <div className="grid gap-6 lg:grid-cols-2" data-sttr-wrapper>
            <div data-sttr-card>
              <div className="h-full p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
                <h2 className="text-title_black text-xl font-semibold leading-tight">Alamat</h2>
                <address className="mt-4 text-paragraph_black">
                  <strong className="block text-title_black">{CABANG.nama}</strong>
                  <span className="block mt-2">{CABANG.jalan}</span>
                  <span className="block">
                    {CABANG.kelurahan}, Kec. {CABANG.kecamatan}
                  </span>
                  <span className="block">
                    {CABANG.kota}, {CABANG.provinsi} {CABANG.kodePos}
                  </span>
                </address>

                <h3 className="mt-8 text-title_black text-base font-semibold leading-tight">Telepon cabang</h3>
                <ul className="mt-2 flex flex-col gap-2 text-paragraph_black">
                  {CABANG.telepon.map((nomor) => (
                    <li key={nomor}>
                      <a className="text-primary font-semibold" href={`tel:${nomor.replace(/-/g, "")}`}>
                        {nomor}
                      </a>
                    </li>
                  ))}
                  <li>Fax {CABANG.fax}</li>
                </ul>

                <p className="mt-8 text-paragraph_black">
                  Untuk pengajuan lewat kami, hubungi WhatsApp{" "}
                  <a
                    className="text-primary font-semibold"
                    href={waLink("Halo, saya ingin tanya pembiayaan di Adira Finance Alam Sutera")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {AGEN.waTampilan}
                  </a>
                  .
                </p>
              </div>
            </div>

            <div data-sttr-card>
              <div className="h-full p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
                <h2 className="text-title_black text-xl font-semibold leading-tight">Tangerang atau Tangerang Selatan?</h2>
                <p className="mt-4 text-paragraph_black">
                  Cabang ini sering ditulis &ldquo;Alam Sutera &ndash; Tangerang&rdquo;, tetapi alamat
                  administratifnya berada di <strong className="text-title_black">{CABANG.kota}</strong>, kecamatan{" "}
                  {CABANG.kecamatan} &mdash; bukan Kota Tangerang. Kawasan Alam Sutera memang membentang di perbatasan
                  keduanya, jadi kedua penyebutan itu merujuk tempat yang sama.
                </p>
                <p className="mt-4 text-paragraph_black">
                  Koordinat lokasi: {CABANG.lintang}, {CABANG.bujur}.
                </p>
                <div className="mt-8">
                  <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.nama} tautanPeta={PETA_URL} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daftar layanan SENGAJA tidak diuraikan di sini.
          Keempat produk itu identik di seluruh Indonesia, jadi menguraikannya
          per cabang menghasilkan blok yang sama persis di setiap halaman —
          persisnya cetakan yang membuat halaman cabang jadi doorway. Uraiannya
          tinggal di halaman kanoniknya; di sini cukup tautan. */}
      <section className="section-spacing-lg-md" id="wilayah">
        <div className="container">
          <SectionTitle
            eyebrow="CAKUPAN"
            title="Tangerang Selatan dan Tujuh Kecamatannya"
            excerpt="Alam Sutera sendiri terbelah antara Serpong Utara dan Kota Tangerang. Daftar ini pembagian administratif Tangerang Selatan, bukan teritori Adira — cabang pemroses ditentukan Adira Finance."
          />

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {KECAMATAN_TANGSEL.map((kecamatan) => (
              <li
                className="flex items-start gap-3 p-4 bg-background border border-border rounded-xl text-title_black"
                key={kecamatan}
              >
                <svg className="w-5.25 h-5.25 shrink-0">
                  <use href="#roundedCheck" />
                </svg>
                <span className="flex-1">{kecamatan}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-spacing-lg-md" id="cabang-terdekat">
        <div className="container">
          <SectionTitle
            eyebrow="SEKITAR SERPONG"
            title="Kalau Alam Sutera Bukan yang Terdekat"
            excerpt="Dari titik Raya Serpong KM 7, inilah lima cabang terdekat berikutnya. Jaraknya lurus di peta, jadi jarak tempuh sebenarnya lebih panjang."
          />

          <ul className="flex flex-col gap-4">
            {CABANG_TERDEKAT.map((item) => (
              <li
                className="flex items-start gap-3 p-4 bg-background border border-border rounded-xl"
                key={item.nama}
              >
                <span className="flex-1 text-title_black">
                  <strong className="font-semibold">{item.nama}</strong>
                  <span className="block text-paragraph_black">{item.wilayah}</span>
                </span>
                <span className="text-paragraph_black">{item.km} km</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-spacing-lg-md" id="pertanyaan">
        <div className="container">
          <SectionTitle
            eyebrow="TANGERANG ATAU TANGSEL"
            title="Yang Sering Ditanyakan soal Alamat Ini"
            excerpt="Tiga pertanyaan yang muncul justru karena penamaan lokasinya. Pertanyaan soal produk, syarat, dan angsuran ada di beranda."
          />

          <div className="flex flex-col gap-6">
            {tanya.map((item) => (
              <div className="p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl" key={item.q}>
                <h3 className="text-title_black text-xl font-semibold leading-tight">{item.q}</h3>
                <p className="mt-4 text-paragraph_black">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing-lg-md" id="pengajuan">
        <div className="container">
          <div className="p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
            <h2 className="text-title_black text-xl font-semibold leading-tight">
              Mengajukan untuk area Alam Sutera dan sekitarnya
            </h2>
            <p className="mt-4 text-paragraph_black">
              Sebutkan kecamatan Anda &mdash; Serpong Utara, Pondok Aren, atau lainnya di Tangerang Selatan &mdash;
              lalu kirim foto BPKB dan STNK. Perkirakan angsurannya dulu lewat{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi
              </Link>{" "}
              dan siapkan berkas sesuai{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                daftar persyaratan
              </Link>
              . {PERNYATAAN_OJK}
            </p>
            <p className="mt-4 text-paragraph_black">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-title_black">{AGEN.id}</strong>. Nomor {AGEN.waTampilan} adalah nomor kami,
              bukan nomor kantor cabang &mdash; nomor cabang tercantum di bagian{" "}
              <Link className="text-primary font-semibold underline" href="#lokasi">
                Lokasi
              </Link>
              .
            </p>

            <div className="mt-8">
              <a
                className="button-primary"
                href={waLink(`Halo, saya ingin tanya pembiayaan di ${ALAMAT_RINGKAS.split(",")[0]} (Alam Sutera)`)}
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
