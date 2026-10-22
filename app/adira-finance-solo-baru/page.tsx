import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  DARI_KOTA_SOLO,
  DESA_SOLO_BARU,
  NAMA_PT,
  PATOKAN,
  PETA_EMBED,
  PETA_URL,
  SOLO_RAYA,
} from "@/lib/cabang-solo-baru";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Solo Baru – Grogol, Kabupaten Sukoharjo.
 *
 * Bentuk keenam belas. Lima belas sebelumnya: lokasi, proses, cara sampai
 * (patokan radial), identitas, perbandingan, verifikasi pin, tanya-jawab,
 * anatomi alamat, ketersediaan kontak, catatan pengecekan, glosarium, kartu
 * kunjungan + rute satu jalan, zoom bertingkat, titik berangkat per
 * kecamatan, kompas.
 *
 * Halaman ini dipimpin DUA FAKTA YANG SALING MENJELASKAN: Solo Baru bukan
 * Kota Solo (Kec. Grogol, Kab. Sukoharjo), tetapi di data kami tidak ada
 * kantor Adira di Kota Surakarta — sehingga dari titik mana pun di Kota Solo,
 * kantor inilah yang terdekat, dan selisihnya jauh. Fakta kedua ditampilkan
 * sebagai grafik batang berpasangan (ke sini vs ke Karanganyar). Sumber di
 * `lib/cabang-solo-baru.ts`.
 */

const JUDUL = "Adira Finance Solo Baru (Graha Adira) — Alamat & Telepon";
const DESKRIPSI =
  "Adira Finance Solo Baru di Graha Adira, Jl. Raya Solo Permai, Grogol, Sukoharjo. Telepon 0271-626626, jarak dari Kota Solo, dan cara gadai BPKB motor atau mobil.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Solo Baru";
const km = (n: number) => String(n).replace(".", ",");

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

/** Skala batang: jarak terjauh pada grafik = 100%. */
const SKALA = Math.max(...DARI_KOTA_SOLO.map((r) => r.keKaranganyar));
const lebar = (n: number) => `${((n / SKALA) * 100).toFixed(1)}%`;

export default function SoloBaruPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Solo Baru, Sukoharjo",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: [
          { "@type": "AdministrativeArea", name: CABANG.kabupaten },
          { "@type": "City", name: "Surakarta" },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero putih: nama listing, alamat, satu telepon. */}
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
              <li aria-current="page">Solo Baru, Sukoharjo</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Solo Baru
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            Di Google Maps namanya <strong className="text-title_black">Graha Adira</strong>. Alamatnya{" "}
            {CABANG.jalan}, Madegondo, Grogol, Kabupaten Sukoharjo {CABANG.kodePos} &mdash; sekitar 4 km di sebelah
            selatan Balai Kota Surakarta.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={`tel:${CABANG.telepon.replace(/-/g, "")}`}>
              Telepon {CABANG.telepon}
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              atau tanya gadai BPKB lewat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Fakta pertama: Solo Baru bukan Kota Solo. Gelap — teks putih per elemen. */}
      <section className="py-14 md:py-20 bg-primary" id="bukan-kota-solo">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white max-w-175">
            Namanya Solo, wilayahnya Sukoharjo
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div>
              <h3 className="text-secondary text-lg font-semibold">Wilayahnya</h3>
              <p className="mt-2 text-white">
                Solo Baru masuk Kecamatan Grogol, Kabupaten Sukoharjo &mdash; bukan Kota Surakarta. Kawasannya meliputi
                lima desa: {DESA_SOLO_BARU.join(", ")}. Kantor Adira ini ada di Madegondo.
              </p>
            </div>
            <div>
              <h3 className="text-secondary text-lg font-semibold">Kenapa orang mengira ini Kota Solo</h3>
              <p className="mt-2 text-white">
                Kawasan ini dikembangkan PT Pondok Solo Permai sejak sekitar 1990-an, di sisi Sukoharjo yang
                paling dekat dengan Kota Solo. Batasnya dengan Kota Solo tidak kelihatan di lapangan, jadi wajar kalau
                banyak yang menganggapnya satu kota.
              </p>
            </div>
            <div>
              <h3 className="text-secondary text-lg font-semibold">Hati-hati dengan label &ldquo;Solo&rdquo;</h3>
              <p className="mt-2 text-white">
                Di data cabang kami ada dua kantor yang diberi embel-embel &ldquo;Solo&rdquo;: Solo Baru ini, dan
                Wonogiri &mdash; yang letaknya di Kabupaten Wonogiri, sekitar 26 km ke arah tenggara. Kalau yang Anda cari
                kantor terdekat dari Kota Solo, yang dimaksud Solo Baru.
              </p>
            </div>
          </div>
          <p className="mt-10 text-sm text-white max-w-175">
            Sumber: detikJateng, &ldquo;Jangan Salah! Solobaru Bukan di Solo Lho&rdquo; (3 Maret 2022) dan Solopos (9
            November 2021).
          </p>
        </div>
      </section>

      {/* Fakta kedua: dari Kota Solo, inilah yang terdekat. Grafik batang berpasangan. */}
      <section className="section-spacing-lg-md" id="dari-kota-solo">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Adira Finance Solo
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Mencari Adira di Kota Solo? Di data kami, yang terdekat ya ini
            </h2>
            <p className="mt-4 text-paragraph_black">
              Di data cabang kami tidak ada kantor Adira di dalam Kota Surakarta. Dari titik mana pun di kota, Solo Baru
              yang paling dekat: 2,6 sampai 5,5 km. Kantor berikutnya, Karanganyar, berjarak 13 sampai 17 km dari
              titik-titik yang sama.
            </p>
          </div>

          <ul className="mt-10 grid gap-6 max-w-200">
            {DARI_KOTA_SOLO.map((r) => (
              <li key={r.titik}>
                <p className="text-title_black font-semibold">Dari {r.titik}</p>
                {/* Label di baris sendiri dan batang di jalur selebar penuh, supaya
                    panjang batang benar-benar sebanding dengan jaraknya di semua
                    lebar layar (kalau berbagi baris dengan label, batang menyusut). */}
                <div className="mt-2 grid gap-2">
                  <div>
                    <p className="text-sm text-title_black">
                      Ke Solo Baru <strong>{km(r.keSini)} km</strong>
                    </p>
                    <span className="mt-1 block h-3 rounded-full bg-secondary" style={{ width: lebar(r.keSini) }} />
                  </div>
                  <div>
                    <p className="text-sm text-paragraph_black">Ke Karanganyar {km(r.keKaranganyar)} km</p>
                    <span className="mt-1 block h-3 rounded-full bg-border" style={{ width: lebar(r.keKaranganyar) }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-paragraph_black max-w-175">
            Jarak lurus di peta, bukan jarak tempuh. Titik di Kota Solo dari OpenStreetMap.
          </p>
        </div>
      </section>

      {/* Menemukan kantornya: nama di peta, jalan, patokan, kontak. */}
      <section className="section-spacing-lg-md bg-background" id="lokasi">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Menemukan Graha Adira di Solo Baru
              </h2>
              <p className="mt-4 text-paragraph_black">
                Di aplikasi peta, cari &ldquo;Graha Adira&rdquo;, bukan &ldquo;Adira Finance Solo Baru&rdquo;. Alamat
                resminya memakai nama Jl. Raya Solo Permai, sedangkan jalan besar di depan titik kantor &mdash; sekitar
                25 meter &mdash; di peta tertulis Jalan Ir. Soekarno. Pakuwon Mall Solo Baru ada di seberangnya.
              </p>

              <ul className="mt-6 border-t border-border">
                {PATOKAN.map((p) => (
                  <li className="flex items-start justify-between gap-4 py-3 border-b border-border" key={p.nama}>
                    <span className="text-title_black font-semibold">
                      {p.nama}
                      <span className="block text-sm text-paragraph_black font-normal">{p.catatan}</span>
                    </span>
                    <span className="text-paragraph_black whitespace-nowrap">{km(p.km)} km</span>
                  </li>
                ))}
              </ul>

              <address className="mt-8 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">
                  {CABANG.namaMaps}, {CABANG.jalan}
                </span>
                <span className="block">
                  Desa {CABANG.desa}, Kec. {CABANG.kecamatan}, {CABANG.kabupaten}
                </span>
                <span className="block">
                  {CABANG.provinsi} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-4 text-paragraph_black">
                Telepon kantor {CABANG.telepon}, faks {CABANG.fax}. WhatsApp {AGEN.waTampilan} nomor kami sebagai agen
                AXI, bukan nomor cabang; nomor-nomor HP lain atas nama Adira Solo Baru di internet tidak bisa kami
                pastikan.
              </p>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={`${CABANG.namaMaps}, Solo Baru`} tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB Solo dan Solo Baru
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Solo Baru
            </h2>
            <p className="mt-4 text-paragraph_black">
              Motor atau mobilnya tidak ditahan; hanya BPKB yang jadi jaminan. Sebagai gambaran dari tabel referensi
              kami: BPKB motor {rupiah(motorMin)}&ndash;{rupiah(motorMaks)} dengan tenor paling lama{" "}
              {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan, BPKB mobil {rupiah(mobilMin)}&ndash;
              {rupiah(mobilMaks)} dengan tenor sampai {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan. Untuk
              mobil, siapkan juga NPWP. Nilai yang disetujui ditentukan Adira sesudah survei kendaraan.
            </p>
            <p className="mt-4 text-paragraph_black">
              Urutannya: kirim foto BPKB, STNK, dan eKTP lewat WhatsApp, kami lihat kelayakannya, kendaraan disurvei,
              lalu tanda tangan dan penyerahan BPKB di kantor cabang. Rincian{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                syarat dokumen
              </Link>{" "}
              dan{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi cicilan
              </Link>{" "}
              ada di halaman lain.
            </p>
            <p className="mt-4 text-paragraph_black">
              Yang dicari sebagai &ldquo;PT Adira Finance Solo&rdquo; atau &ldquo;PT Adira Finance Solo Baru&rdquo;
              secara hukum adalah {NAMA_PT}; Solo Baru kantor cabangnya. Ringkasan profil perusahaan ada di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                halaman tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan oleh Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Solo Raya. */}
      <section className="section-spacing-lg-md bg-background" id="solo-raya">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            Kantor Adira lain di Solo Raya
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOLO_RAYA.map((c) => (
              <li className="flex items-center justify-between gap-4 p-4 bg-white border border-border rounded-xl" key={c.nama}>
                <span className="text-title_black font-semibold">
                  {c.nama}
                  <span className="block text-paragraph_black font-normal">{c.wilayah}</span>
                </span>
                <span className="text-paragraph_black whitespace-nowrap">{km(c.km)} km</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-paragraph_black max-w-175">
            Jarak lurus dari Graha Adira ke titik peta masing-masing kantor di data kami. Cabang mana yang memproses
            pengajuan ditentukan Adira Finance.
          </p>
        </div>
      </section>

      {/* Penutup: kotak berbingkai di atas putih. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 border border-border rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
                Dari Solo atau Sukoharjo, mulainya sama
              </h2>
              <p className="mt-4 text-paragraph_black">
                Foto BPKB, kirim lewat WhatsApp, sebutkan &ldquo;Solo Baru&rdquo;. Pengajuan diteruskan ke cabang yang
                tepat.
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
