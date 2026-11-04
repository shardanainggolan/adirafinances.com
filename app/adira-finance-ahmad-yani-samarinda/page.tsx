import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  AHMAD_YANI_LAIN,
  CABANG,
  GARIS_WAKTU,
  KALTIM,
  NAMA_PT,
  PATOKAN,
  PETA_EMBED,
  PETA_URL,
} from "@/lib/cabang-ahmad-yani-samarinda";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Ahmad Yani – Samarinda.
 *
 * Bentuk kedua puluh empat. Dua puluh tiga sebelumnya: lokasi, proses, cara
 * sampai (patokan radial), identitas, perbandingan, verifikasi pin,
 * tanya-jawab, anatomi alamat, ketersediaan kontak, catatan pengecekan,
 * glosarium, kartu kunjungan + rute satu jalan, zoom bertingkat, titik
 * berangkat per kecamatan, kompas, dua fakta yang saling menjelaskan, garis
 * batas, tangga utara–selatan, penggaris jalan, legenda peta, dua arah datang,
 * skema satu arah, peta nama.
 *
 * Halaman ini dipimpin GARIS WAKTU KAWASAN: kantor ada di Temindung Permai,
 * bekas kawasan Bandara Temindung (1974–2018). Garis waktu vertikal dengan
 * tanggal dari Wikipedia; lalu tiga nama untuk jalan yang sama; lalu daftar
 * kantor "Ahmad Yani" di kota lain. Sumber di `lib/cabang-ahmad-yani-samarinda.ts`.
 */

const JUDUL = "Adira Finance Ahmad Yani Samarinda — Alamat & Telepon";
const DESKRIPSI =
  "Adira Finance Ahmad Yani di Jl. Jenderal Ahmad Yani I No. 3A-3B, Temindung Permai, Samarinda — dekat bekas Bandara Temindung. Telepon 0541-742734 dan cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Ahmad Yani Samarinda";
const km = (n: number) => String(n).replace(".", ",");

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function AhmadYaniSamarindaPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Ahmad Yani, Samarinda",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero gelap: alamat + Temindung. Teks putih per elemen. */}
      <section className="py-14 md:py-20 lg:py-24 bg-primary relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-white">
              <li>
                <Link className="text-white hover:text-secondary" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true" className="text-white">
                /
              </li>
              <li aria-current="page" className="text-white">
                Ahmad Yani, Samarinda
              </li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-white max-w-200">
            Adira Finance Ahmad Yani Samarinda
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white max-w-175">
            {CABANG.jalan}, Temindung Permai, Sungai Pinang, Samarinda {CABANG.kodePos}. Kantornya dekat bekas bandara kota
            Samarinda &mdash; terminal lamanya hanya sekitar 400 meter dari kantor.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a
              className="items-center gap-2 rounded-full bg-secondary text-title_black font-semibold"
              style={{ display: "inline-flex", padding: "12px 24px" }}
              href={`tel:${CABANG.telepon[0].replace(/-/g, "")}`}
            >
              Telepon {CABANG.telepon[0]}
            </a>
            <a className="text-white font-semibold underline hover:text-secondary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              atau tanya gadai BPKB lewat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Garis waktu Temindung. */}
      <section className="section-spacing-lg-md" id="temindung">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Temindung
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Kantornya dekat bekas bandara kota
              </h2>
              <p className="mt-4 text-paragraph_black">
                Kelurahan kantor ini bernama Temindung Permai, dan bandara lama Samarinda pun bernama Temindung. Kalau
                ada yang memberi patokan &ldquo;dekat bandara lama&rdquo;, yang dimaksud area ini &mdash; bukan bandara Samarinda
                yang sekarang, yang jauh di Sungai Siring.
              </p>
              <p className="mt-4 text-sm text-paragraph_black">
                Tanggal dari Wikipedia Indonesia (Bandar Udara Temindung dan Bandar Udara APT Pranoto). Nama gedung terminal
                lama dari OpenStreetMap.
              </p>
            </div>
            <ol className="grid gap-0">
              {GARIS_WAKTU.map((g, i) => (
                <li
                  className="pl-5 pb-6 border-l border-border"
                  style={{ position: "relative", borderLeftWidth: 2 }}
                  key={g.waktu}
                >
                  <span
                    aria-hidden="true"
                    className={i === GARIS_WAKTU.length - 1 ? "bg-secondary" : "bg-primary"}
                    style={{ position: "absolute", left: -8, top: 4, width: 14, height: 14, borderRadius: 9999 }}
                  />
                  <span className="block text-sm font-semibold text-primary uppercase">{g.waktu}</span>
                  <span className="block mt-1 text-title_black">{g.isi}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Nama jalan + kontak + peta. */}
      <section className="section-spacing-lg-md bg-background" id="alamat">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Ahmad Yani I, Ahmad Yani, atau Poros Samarinda&ndash;Bontang?
              </h2>
              <p className="mt-4 text-paragraph_black">
                Alamat kantor memakai nama Jl. Jenderal Ahmad Yani <strong className="text-title_black">I</strong>. Di
                depan kantor, jalannya terbagi dua jalur; di OpenStreetMap keduanya tercatat sebagai &ldquo;Jalan Ahmad
                Yani&rdquo; dan &ldquo;Jalan Ahmad Yani 1&rdquo;, sedangkan Google Maps memberi label &ldquo;Jl. Poros
                Samarinda &ndash; Bontang&rdquo;. Jadi kalau aplikasi peta Anda menampilkan nama yang berbeda, Anda tetap di
                jalan yang benar. Kantornya dekat simpang dengan Jl. S. Parman dan Jl. Gatot Subroto.
              </p>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">{CABANG.jalan}</span>
                <span className="block">
                  Kel. {CABANG.kelurahan}, Kec. {CABANG.kecamatan}
                </span>
                <span className="block">
                  {CABANG.kota}, {CABANG.provinsi} {CABANG.kodePos}
                </span>
              </address>
              <p className="mt-4 text-paragraph_black">
                Telepon {CABANG.telepon.join(", ")}; faks {CABANG.fax}. Nomor yang sama tercatat di data cabang kami dan
                di satu direktori daring. WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen AXI, bukan nomor cabang.
              </p>
              <h3 className="mt-8 text-title_black text-xl font-semibold leading-tight">Patokan</h3>
              <ul className="mt-3 border-t border-border">
                {PATOKAN.map((p) => (
                  <li className="flex items-start justify-between gap-4 py-2 border-b border-border" key={p.nama}>
                    <span className="text-title_black">
                      {p.nama}
                      <span className="block text-sm text-paragraph_black">ke {p.arah}</span>
                    </span>
                    <span className="text-paragraph_black whitespace-nowrap">{km(p.km)} km</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance Ahmad Yani, Samarinda" tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Adira Samarinda + Ahmad Yani lain. */}
      <section className="section-spacing-lg-md" id="adira-samarinda">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Adira Finance Samarinda
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Satu-satunya kantor Adira di Kota Samarinda pada data kami
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kantor Adira terdekat berikutnya ada di luar kota. Jarak di bawah ini kira-kira, lurus di peta.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {KALTIM.map((c) => (
              <li className="flex items-center justify-between gap-4 p-4 border border-border rounded-xl" key={c.nama}>
                <span className="text-title_black font-semibold">
                  {c.nama}
                  <span className="block text-paragraph_black font-normal">{c.wilayah}</span>
                </span>
                <span className="text-paragraph_black whitespace-nowrap">±{c.km} km</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 p-5 sm:p-6 bg-background rounded-2xl max-w-200">
            <h3 className="text-title_black text-xl font-semibold leading-tight">
              &ldquo;Adira Ahmad Yani&rdquo; ada di banyak kota
            </h3>
            <p className="mt-2 text-paragraph_black">
              Di data kami ada {AHMAD_YANI_LAIN.length + 1} kantor Adira bernama Ahmad Yani. Selain Samarinda: {AHMAD_YANI_LAIN.join(", ")}.
              Dua di antaranya, Banjarmasin dan Martapura, sama-sama di Kalimantan. Saat mencari, selalu tambahkan &ldquo;Samarinda&rdquo;.
            </p>
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Samarinda
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Ahmad Yani
            </h2>
            <p className="mt-4 text-paragraph_black">
              Yang dijaminkan BPKB, bukan kendaraannya. Sebagai gambaran dari tabel referensi kami: BPKB motor{" "}
              {rupiah(motorMin)}&ndash;{rupiah(motorMaks)} dengan tenor sampai {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]}{" "}
              bulan, BPKB mobil {rupiah(mobilMin)}&ndash;{rupiah(mobilMaks)} dengan tenor sampai{" "}
              {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan. BPKB mobil butuh NPWP. Nilai yang disetujui
              ditentukan Adira setelah survei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Mulai dari WhatsApp dengan foto BPKB, STNK, dan eKTP untuk cek kelayakan. Lalu survei kendaraan, lalu
              tanda tangan dan serah terima BPKB di kantor cabang. Detail ada di{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                persyaratan
              </Link>{" "}
              dan{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              &ldquo;PT Adira Finance Samarinda&rdquo; atau &ldquo;PT Adira Finance Ahmad Yani&rdquo; adalah kantor cabang
              dari {NAMA_PT}. Profil perusahaannya di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Penutup: kartu kuning di atas putih. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-8 md:p-10 bg-secondary rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
                Dari Sungai Pinang, Samarinda Ulu, atau sekitarnya
              </h2>
              <p className="mt-4 text-title_black">
                Kirim foto BPKB lewat WhatsApp, sebut &ldquo;Ahmad Yani Samarinda&rdquo;. Pengajuan kami teruskan ke cabang
                yang tepat.
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
            <div className="text-sm text-title_black">
              <p>{PERNYATAAN_OJK}</p>
              <p className="mt-3">
                {DISCLOSURE_AGEN} Agen AXI: <strong>{AGEN.nama}</strong> &middot; ID AXI: <strong>{AGEN.id}</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
