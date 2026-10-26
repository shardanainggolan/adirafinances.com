import type { Metadata } from "next";
import Link from "next/link";

import { CABANG, JUANDA_TASIK, KANTOR_GARUT, NAMA_PT, PATOKAN, PETA_URL } from "@/lib/cabang-cikuray";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Cikuray – Garut Kota, Kabupaten Garut.
 *
 * Bentuk kedelapan belas. Tujuh belas sebelumnya: lokasi, proses, cara sampai
 * (patokan radial), identitas, perbandingan, verifikasi pin, tanya-jawab,
 * anatomi alamat, ketersediaan kontak, catatan pengecekan, glosarium, kartu
 * kunjungan + rute satu jalan, zoom bertingkat, titik berangkat per
 * kecamatan, kompas, dua fakta yang saling menjelaskan, garis batas.
 *
 * Halaman ini dipimpin TANGGA UTARA–SELATAN: empat kantor Adira di Kabupaten
 * Garut disusun dari Limbangan sampai Pameungpeuk, karena "Adira Finance
 * Garut" bisa berarti salah satu dari keempatnya. Di atasnya, cara menemukan
 * Jalan Cikuray dari pusat kota (tanpa peta sematan — listing kantor cabang
 * belum ditemukan, dan `gmaps_link` dataset menunjuk kantor agen di Cilawu),
 * dan dua koreksi data: nomor 0265 milik kantor Tasikmalaya.
 * Sumber di `lib/cabang-cikuray.ts`.
 */

const JUDUL = "Adira Finance Cikuray Garut — Alamat Jl. Cikuray & Telepon";
const DESKRIPSI =
  "Adira Finance Cikuray di Jl. Cikuray No. 38, Regol, Garut Kota — sekitar 300 m dari Stasiun Garut. Telepon 0262-240969, empat kantor Adira di Garut, dan cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Cikuray Garut";
const km = (n: number) => String(n).replace(".", ",");

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function CikurayGarutPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Cikuray, Garut",
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

      {/* Hero: alamat + patokan paling gampang + telepon Garut. */}
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
              <li aria-current="page">Cikuray, Garut</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Cikuray Garut
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            {CABANG.jalan}, Kelurahan Regol, Garut Kota {CABANG.kodePos}. Jalan Cikuray hanya beberapa ratus meter
            dari Stasiun Garut dan alun-alun &mdash; kantor ini ada di tengah kota.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={`tel:${CABANG.telepon[0].replace(/-/g, "")}`}>
              Telepon {CABANG.telepon[0]}
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              atau tanya gadai BPKB lewat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Menemukan Jalan Cikuray dari pusat kota. */}
      <section className="section-spacing-lg-md bg-background" id="pusat-kota">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Dari pusat kota Garut
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Jalan Cikuray pendek, dan dekat dari mana-mana
              </h2>
              <p className="mt-4 text-paragraph_black">
                Panjangnya sekitar 500 meter, membujur utara&ndash;selatan di Kelurahan Regol. Patokan terdekat di
                bawah ini diukur lurus ke ruas jalan itu, bukan ke pintu kantornya &mdash; posisi persis nomor 38 di
                jalan tersebut belum bisa kami pastikan dari peta.
              </p>
              <ul className="mt-6 border-t border-border">
                {PATOKAN.map((p) => (
                  <li className="flex items-start justify-between gap-4 py-3 border-b border-border" key={p.nama}>
                    <span className="text-title_black font-semibold">
                      {p.nama}
                      <span className="block text-sm text-paragraph_black font-normal">di sebelah {p.arah}</span>
                    </span>
                    <span className="text-paragraph_black whitespace-nowrap">{p.jarak}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-paragraph_black">
                Posisi patokan dan ruas jalan dari OpenStreetMap.{" "}
                <a className="text-primary font-semibold underline" href={PETA_URL} target="_blank" rel="noopener noreferrer">
                  Cari alamat ini di Google Maps
                </a>{" "}
                &mdash; tautan ini membuka pencarian alamat, karena listing Google Maps untuk kantor cabangnya sendiri
                belum kami temukan.
              </p>
            </div>

            {/* "Cikuray" ada tiga — ringkas, sebagai pelengkap. */}
            <div className="h-full p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Satu nama, tiga Cikuray</h3>
              <dl className="mt-4">
                <dt className="text-title_black font-semibold">Gunung Cikuray</dt>
                <dd className="text-paragraph_black">Gunung api di Kabupaten Garut. Nama kereta di bawah diambil darinya.</dd>
                <dt className="mt-4 text-title_black font-semibold">Kereta Cikuray</dt>
                <dd className="text-paragraph_black">
                  Kereta KAI Garut &ndash; Pasar Senen, diresmikan 25 Maret 2022. Berhenti di Stasiun Garut, sekitar
                  300 meter dari Jalan Cikuray &mdash; praktis kalau Anda datang dari Jakarta.
                </dd>
                <dt className="mt-4 text-title_black font-semibold">Jalan Cikuray</dt>
                <dd className="text-paragraph_black">Jalan tempat kantor Adira ini berada &mdash; nama cabangnya sama dengan nama jalan ini.</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Dua koreksi data. */}
      <section className="section-spacing-lg-md" id="data">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            Dua hal yang bikin orang salah hubungi
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="p-5 sm:p-6 bg-background rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Nomor 0265 itu nomor Tasikmalaya</h3>
              <p className="mt-3 text-paragraph_black">
                Di internet, alamat Adira Cikuray sering dipasangkan dengan nomor berawalan 0265 &mdash; termasuk di
                data cabang yang kami pegang. Kode 0265 milik Tasikmalaya, dan di data kami nomor-nomor itu sama
                persis dengan nomor kantor {JUANDA_TASIK.nama}, sekitar {km(JUANDA_TASIK.km)} km dari Garut. Untuk kantor Cikuray,
                pakai nomor berkode Garut: <strong className="text-title_black">{CABANG.telepon.join(" atau ")}</strong>.
              </p>
            </div>
            <div className="p-5 sm:p-6 bg-background rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">
                Listing &ldquo;Adira Finance Garut&rdquo; di Cilawu bukan kantor cabang
              </h3>
              <p className="mt-3 text-paragraph_black">
                Saat mencari di Google Maps, Anda mungkin menemukan &ldquo;AXI Adira Finance Garut (Agen Resmi Adira
                Finance)&rdquo; di Jl. Garut &ndash; Tasikmalaya, Cilawu. Sesuai namanya, itu kantor agen, sekitar 7 km
                dari Jalan Cikuray. Kantor cabang Adira di Garut Kota ada di Jalan Cikuray.
              </p>
            </div>
          </div>
          <p className="mt-6 text-paragraph_black max-w-175">
            Begitu juga dengan kami: WhatsApp {AGEN.waTampilan} adalah nomor agen AXI, bukan nomor kantor cabang.
          </p>
        </div>
      </section>

      {/* Tangga utara–selatan: empat kantor di Kabupaten Garut. */}
      <section className="section-spacing-lg-md bg-background" id="adira-garut">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Adira Finance Garut
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Empat kantor Adira di Kabupaten Garut, dari utara ke selatan
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kabupaten Garut punya 42 kecamatan. Dari kantor paling utara (Limbangan) ke yang paling selatan
              (Pameungpeuk) saja jaraknya sekitar 72 km garis lurus.
              Kalau Anda mencari &ldquo;Adira Garut&rdquo;, yang dimaksud bisa salah satu dari empat kantor ini &mdash;
              Cikuray yang di pusat kota Garut.
            </p>
          </div>

          <ol className="mt-10 grid gap-3 max-w-175">
            {KANTOR_GARUT.map((k) => (
              <li
                className={`flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl ${
                  k.ini ? "bg-primary" : "bg-white border border-border"
                }`}
                key={k.nama}
              >
                <span>
                  <span className={`block font-semibold ${k.ini ? "text-white" : "text-title_black"}`}>{k.nama}</span>
                  <span className={`block text-sm ${k.ini ? "text-white" : "text-paragraph_black"}`}>{k.tempat}</span>
                </span>
                <span className={`text-sm whitespace-nowrap ${k.ini ? "text-secondary" : "text-paragraph_black"}`}>
                  {k.km === null ? "halaman ini" : `${km(k.km)} km ke ${k.arah}`}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-paragraph_black max-w-175">
            Jarak lurus dari Jalan Cikuray. Tiga kantor lainnya tidak punya nomor telepon di data kami. Cabang mana
            yang memproses pengajuan ditentukan Adira Finance.
          </p>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Garut
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Cikuray Garut
            </h2>
            <p className="mt-4 text-paragraph_black">
              BPKB yang dijaminkan, kendaraan tetap Anda pakai. Gambaran dari tabel referensi kami: untuk motor{" "}
              {rupiah(motorMin)} sampai {rupiah(motorMaks)}, untuk mobil {rupiah(mobilMin)} sampai {rupiah(mobilMaks)}.
              Tenor terpanjang {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan untuk motor dan{" "}
              {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan untuk mobil; BPKB mobil juga perlu NPWP. Besaran
              pastinya diputuskan Adira setelah survei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Mulai dengan mengirim foto BPKB, STNK, dan eKTP lewat WhatsApp untuk dicek kelayakannya. Setelah itu
              survei kendaraan, lalu tanda tangan dan serah terima BPKB di kantor cabang. Rinciannya di{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                persyaratan dokumen
              </Link>{" "}
              dan{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              &ldquo;PT Adira Finance Garut&rdquo; atau &ldquo;PT Adira Finance Cikuray&rdquo; tidak ada sebagai
              perusahaan tersendiri &mdash; yang ada {NAMA_PT}, dan Cikuray kantor cabangnya di Garut. Ringkasan
              perusahaannya di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan oleh Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup: kartu putih berbingkai di atas latar abu muda. */}
      <section className="section-spacing-lg-md bg-background" id="ajukan">
        <div className="container">
          <div className="max-w-200 p-6 sm:p-8 md:p-10 bg-white border border-border rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
              Dari Garut Kota sampai pelosok kabupaten
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kirim foto BPKB lewat WhatsApp dan sebut kecamatan Anda. Pengajuan diteruskan ke cabang yang tepat.
            </p>
            <div className="mt-6">
              <a className="button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
                Ajukan Lewat WhatsApp
                <svg className="w-2.5 h-2.5 fill-current">
                  <use href="#buttonArrow" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-sm text-paragraph_black">{PERNYATAAN_OJK}</p>
            <p className="mt-2 text-sm text-paragraph_black">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-title_black">{AGEN.id}</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
