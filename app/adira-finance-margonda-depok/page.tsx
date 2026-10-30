import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import { CABANG, DARI_SELATAN, DARI_UTARA, JUANDA, NAMA_PT, PETA_EMBED, PETA_URL, TETANGGA } from "@/lib/cabang-margonda";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Margonda – Depok.
 *
 * Bentuk kedua puluh satu. Dua puluh sebelumnya: lokasi, proses, cara sampai
 * (patokan radial), identitas, perbandingan, verifikasi pin, tanya-jawab,
 * anatomi alamat, ketersediaan kontak, catatan pengecekan, glosarium, kartu
 * kunjungan + rute satu jalan, zoom bertingkat, titik berangkat per
 * kecamatan, kompas, dua fakta yang saling menjelaskan, garis batas, tangga
 * utara–selatan, penggaris jalan, legenda peta.
 *
 * Halaman ini dipimpin DUA ARAH DATANG: Margonda Raya dua jalur satu arah,
 * dan kantornya di sisi timur — jadi yang datang dari UI (utara) tinggal
 * masuk, sedangkan yang datang dari pusat kota (selatan) melihatnya di
 * seberang. Dua kolom berdampingan, tiap kolom urutan patokan yang benar-benar
 * dilewati. Lalu jebakan nomor "88" (D'Mall juga Kav. 88) dan entri "Juanda"
 * di alamat yang sama. Sumber di `lib/cabang-margonda.ts`.
 */

const JUDUL = "Adira Finance Margonda Depok — Alamat, Telepon & Arah";
const DESKRIPSI =
  "Adira Finance Margonda di Jl. Margonda Raya No. 88 A-C, Kemiri Muka, Beji, Depok — sisi timur jalan, dekat Mitra10. Telepon 021-77204222 dan cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Margonda Depok";
const km = (n: number) => String(n).replace(".", ",");

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

function Urutan({ butir, akhirSeberang }: { butir: readonly { nama: string; km: number; catatan: string }[]; akhirSeberang?: boolean }) {
  return (
    <ol className="mt-5 grid gap-2">
      {butir.map((b, i) => {
        const kantor = b.km === 0;
        const setelahKantor = i > butir.findIndex((x) => x.km === 0);
        const kelas = kantor ? (akhirSeberang ? "bg-white border border-primary" : "bg-primary") : "bg-white";
        return (
          <li className={`flex items-start gap-3 p-3 rounded-xl ${kelas}`} key={b.nama}>
            <span
              className={`font-semibold text-sm ${kantor && !akhirSeberang ? "text-secondary" : "text-paragraph_black"}`}
              style={{ minWidth: 22 }}
            >
              {i + 1}.
            </span>
            <span className="flex-1">
              <span className={`block font-semibold ${kantor && !akhirSeberang ? "text-white" : "text-title_black"}`}>{b.nama}</span>
              <span className={`block text-sm ${kantor && !akhirSeberang ? "text-white" : "text-paragraph_black"}`}>
                {kantor
                  ? b.catatan
                  : `${km(b.km)} km ${setelahKantor ? "setelah" : "sebelum"} kantor${b.catatan ? ` — ${b.catatan}` : ""}`}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function MargondaPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Margonda, Depok",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero abu muda: alamat, sisi jalan, tiga telepon. */}
      <section className="py-14 md:py-20 lg:py-24 bg-background relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-paragraph_black">
              <li>
                <Link className="hover:text-primary" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Margonda, Depok</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Margonda Depok
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            {CABANG.jalan}, Kemiri Muka, Kecamatan Beji, Kota Depok {CABANG.kodePos}. Kantornya di sisi timur Jalan
            Margonda &mdash; sisi yang sama dengan Mitra10, bukan sisi D&apos;Mall.
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

      {/* Dua arah datang. */}
      <section className="section-spacing-lg-md" id="arah-datang">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Dari mana Anda datang?
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Margonda dua jalur. Dari arah UI kantornya di kiri, dari pusat kota di seberang
            </h2>
            <p className="mt-4 text-paragraph_black">
              Jalan Margonda dipisah per arah. Kantor Adira ada di jalur yang menuju selatan, sisi timur. Di bawah
              ini urutan patokan yang Anda lewati dari masing-masing arah.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="p-5 sm:p-6 bg-secondary rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Dari arah UI / Jakarta</h3>
              <p className="mt-1 text-sm text-title_black">Lajur ke selatan &mdash; kantor di kiri</p>
              <Urutan butir={DARI_UTARA} />
            </div>
            <div className="p-5 sm:p-6 bg-background rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Dari pusat kota Depok</h3>
              <p className="mt-1 text-sm text-paragraph_black">Lajur ke utara &mdash; kantor di seberang</p>
              <Urutan butir={DARI_SELATAN} akhirSeberang />
            </div>
          </div>
          <p className="mt-4 text-sm text-paragraph_black max-w-175">
            Jarak di kartu adalah jarak utara&ndash;selatan dari kantor, bukan jarak tempuh. Posisi dan sisi jalan dari
            OpenStreetMap. Kalau datang dari selatan, cari tempat putar balik yang aman lebih dulu.
          </p>
        </div>
      </section>

      {/* Nomor 88 dan entri Juanda. */}
      <section className="section-spacing-lg-md bg-background" id="nomor-88">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                &ldquo;Margonda 88&rdquo; bukan cuma kantor Adira
              </h2>
              <p className="mt-4 text-paragraph_black">
                D&apos;Mall Depok dan apartemen Margonda Residence juga beralamat Jalan Margonda Raya Kav. 88. D&apos;Mall
                ada sekitar 450 meter ke selatan, di seberang jalan. Kalau aplikasi peta membawa Anda ke D&apos;Mall, Anda
                masih di sisi yang salah. Kantor Adira tertulis &ldquo;88 A-C&rdquo;, di sisi timur.
              </p>
              <h3 className="mt-8 text-title_black text-xl font-semibold leading-tight">Lalu &ldquo;Adira Juanda Depok&rdquo;?</h3>
              <p className="mt-3 text-paragraph_black">
                Di data cabang kami ada entri kedua bernama Juanda, dengan alamat yang sama (Margonda Raya 88 A-C) dan
                nomornya sendiri, {JUANDA.telepon}. Daftar lama di internet menulis Juanda di {JUANDA.alamatLama}. Kami
                belum bisa memastikan apakah sekarang keduanya satu gedung atau masih terpisah &mdash; kalau Anda
                mencari Juanda, telepon dulu nomor itu.
              </p>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance Margonda" tautanPeta={PETA_URL} />
              <address className="mt-8 text-paragraph_black">
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
                Telepon {CABANG.telepon.join(", ")}. Faks {CABANG.fax.join(" dan ")}. Di Google Maps listingnya bernama
                &ldquo;{CABANG.namaMaps}&rdquo; saja. WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen AXI,
                bukan nomor cabang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Margonda
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Margonda
            </h2>
            <p className="mt-4 text-paragraph_black">
              Yang ditahan hanya BPKB; motor atau mobil tetap Anda bawa pulang. Menurut tabel referensi kami, BPKB motor
              berkisar {rupiah(motorMin)}&ndash;{rupiah(motorMaks)} dengan tenor sampai{" "}
              {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan, dan BPKB mobil {rupiah(mobilMin)}&ndash;
              {rupiah(mobilMaks)} sampai {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, ditambah NPWP. Itu
              kisaran awal; nilai yang disetujui ditentukan Adira setelah survei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Mulainya dari WhatsApp: foto BPKB, STNK, dan eKTP untuk cek kelayakan. Berikutnya survei kendaraan, lalu
              tanda tangan dan penyerahan BPKB di kantor cabang. Rincian di{" "}
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
              &ldquo;PT Adira Finance Margonda&rdquo; atau &ldquo;PT Adira Finance Depok&rdquo; sebenarnya kantor cabang
              dari satu perusahaan, {NAMA_PT}. Profil perusahaannya ada di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Situs ini milik agen pemasar terdaftar, bukan situs Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Depok + tetangga. */}
      <section className="section-spacing-lg-md bg-background" id="sekitar">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            Kantor Adira lain di Depok dan sekitarnya
          </h2>
          <p className="mt-4 text-paragraph_black max-w-175">
            Margonda yang paling tengah di antara kantor Adira di Depok pada data kami: Cimanggis di timur, Sawangan di
            barat.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {TETANGGA.map((c) => (
              <li className="flex items-center justify-between gap-4 p-4 bg-white border border-border rounded-xl" key={c.nama}>
                <span className="text-title_black font-semibold">
                  {c.href ? (
                    <Link className="underline hover:text-primary" href={c.href}>
                      {c.nama}
                    </Link>
                  ) : (
                    c.nama
                  )}
                  <span className="block text-paragraph_black font-normal">{c.wilayah}</span>
                </span>
                <span className="text-paragraph_black whitespace-nowrap">{km(c.km)} km</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-paragraph_black max-w-175">
            Jarak lurus antar titik kantor di Google Maps. Cabang yang memproses pengajuan ditentukan Adira Finance.
          </p>
        </div>
      </section>

      {/* Penutup: dua kolom berbingkai di atas putih. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="p-6 sm:p-8 bg-primary rounded-3xl">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">Dari Beji, Pancoran Mas, atau UI</h2>
              <p className="mt-4 text-white">
                Kirim foto BPKB lewat WhatsApp, sebut &ldquo;Margonda&rdquo;. Pengajuan diteruskan ke cabang yang tepat.
              </p>
              <div className="mt-6">
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
            <div className="p-6 sm:p-8 border border-border rounded-3xl text-sm text-paragraph_black">
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
