import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  KALBAR_ADA_KANTOR,
  KECAMATAN_JAKPUS,
  KOMPAS,
  NAMA_PT,
  PETA_EMBED,
  PETA_URL,
  STASIUN,
  TETANGGA,
  type Patokan,
} from "@/lib/cabang-ketapang";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Ketapang – Gambir, Jakarta Pusat.
 *
 * Bentuk kelima belas. Empat belas sebelumnya: lokasi, proses, cara sampai
 * (patokan radial), identitas, perbandingan, verifikasi pin, tanya-jawab,
 * anatomi alamat, ketersediaan kontak, catatan pengecekan, glosarium, kartu
 * kunjungan + rute satu jalan, zoom bertingkat, titik berangkat per
 * kecamatan.
 *
 * Halaman ini dipimpin KOMPAS: kisi 3×3 dengan kantor di tengah dan apa yang
 * ada di utara, timur, selatan, barat di sekelilingnya. Pertanyaan pertama
 * dijawab lebih dulu: "Ketapang" yang mana — nama kawasan di Jakarta Pusat
 * (bukan kelurahan), bukan Kabupaten Ketapang di Kalimantan Barat yang tidak
 * punya kantor Adira di data kami. Sumber di `lib/cabang-ketapang.ts`.
 */

const JUDUL = "Adira Finance Ketapang Jakarta Pusat — Alamat & Telepon";
const DESKRIPSI =
  "Adira Finance Ketapang ada di Jl. KH Zainul Arifin No. 27, Petojo Utara, Gambir, Jakarta Pusat. Telepon kantor, patokan di sekitarnya, dan cara gadai BPKB motor atau mobil.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Ketapang Jakarta Pusat";
const km = (n: number) => String(n).replace(".", ",");

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

/** Satu sel arah pada kisi kompas. */
function SelArah({ judul, isi, catatan }: { judul: string; isi: readonly Patokan[]; catatan?: string }) {
  return (
    <div className="h-full p-4 sm:p-5 bg-white border border-border rounded-2xl">
      <h3 className="text-sm uppercase tracking-wide text-primary font-semibold">{judul}</h3>
      <ul className="mt-3">
        {isi.map((p) => (
          <li className="flex items-start justify-between gap-3 py-2 border-b border-border" key={p.nama}>
            <span className="text-title_black">
              {p.nama}
              {p.arah ? <span className="block text-sm text-paragraph_black">ke {p.arah}</span> : null}
            </span>
            <span className="text-paragraph_black whitespace-nowrap">{km(p.km)} km</span>
          </li>
        ))}
      </ul>
      {catatan ? <p className="mt-3 text-sm text-paragraph_black">{catatan}</p> : null}
    </div>
  );
}

export default function KetapangPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Ketapang, Gambir, Jakarta Pusat",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero abu-abu muda: alamat + dua nomor kantor. */}
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
              <li aria-current="page">Ketapang, Jakarta Pusat</li>
            </ol>
          </nav>

          <span className="mt-8 text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
            Gambir, Jakarta Pusat
          </span>
          <h1 className="mt-3 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Ketapang
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            {CABANG.jalan}, Kelurahan Petojo Utara, Kecamatan Gambir, Jakarta Pusat {CABANG.kodePos}. Kantornya
            di sisi selatan Jalan Zainul Arifin, sekitar 400 meter sebelum jalan ini bertemu Jalan Gajah Mada.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            {CABANG.telepon.map((n) => (
              <a className="button-primary" href={`tel:${n.replace(/-/g, "")}`} key={n}>
                Telepon {n}
              </a>
            ))}
            <a className="text-title_black font-semibold underline hover:text-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              atau tanya gadai BPKB lewat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Ketapang yang mana. */}
      <section className="section-spacing-lg-md" id="ketapang-yang-mana">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            &ldquo;Ketapang&rdquo; yang mana?
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="p-5 sm:p-6 md:p-8 bg-secondary rounded-2xl">
              <p className="text-sm uppercase tracking-wide text-title_black">Kantor ini</p>
              <h3 className="mt-2 text-title_black text-xl font-semibold leading-tight">Ketapang, Jakarta Pusat</h3>
              <p className="mt-3 text-title_black">
                Ketapang di sini nama kawasan, bukan nama kelurahan. Anda tidak akan menemukannya di daftar kelurahan
                atau kecamatan &mdash; di atas kertas kantornya ada di Petojo Utara, Gambir. Tapi nama itu masih
                dipakai di mana-mana di sekitarnya: Jalan Ketapang Utara di seberang, Sekolah Kristen Ketapang 1 dan
                GPDI Ketapang 100–200 meter ke arah barat.
              </p>
            </div>
            <div className="p-5 sm:p-6 md:p-8 border border-border border-dashed rounded-2xl">
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Bukan kantor ini</p>
              <h3 className="mt-2 text-title_black text-xl font-semibold leading-tight">
                Kabupaten Ketapang, Kalimantan Barat
              </h3>
              <p className="mt-3 text-paragraph_black">
                Kalau Anda mencari Adira di Ketapang, Kalbar: di data cabang kami tidak ada kantor Adira di Kabupaten
                Ketapang. Kantor Adira di Kalimantan Barat yang tercatat ada di {KALBAR_ADA_KANTOR.join(", ")}. Untuk
                memastikan, tanyakan ke layanan pelanggan Adira &mdash; nomornya ada di bagian bawah halaman ini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kompas. */}
      <section className="section-spacing-lg-md bg-background" id="sekeliling">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Di sekeliling kantor
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Apa yang ada di utara, timur, selatan, dan barat kantor ini
            </h2>
            <p className="mt-4 text-paragraph_black">
              Pakai ini untuk mencocokkan apa yang Anda lihat di jalan. Jarak lurus dari titik kantor di Google Maps,
              posisi patokan dari OpenStreetMap.
            </p>
          </div>

          {/* Urutan DOM sengaja: kosong, utara, kosong / barat, kantor, timur /
              kosong, selatan, kosong. Di layar sempit sel kosong disembunyikan
              sehingga urutan bacanya utara → barat → kantor → timur → selatan. */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="hidden md:block" />
            <SelArah {...KOMPAS.utara} />
            <div className="hidden md:block" />
            <SelArah {...KOMPAS.barat} />
            <div className="h-full p-5 sm:p-6 bg-primary rounded-2xl">
              <p className="text-sm uppercase tracking-wide text-secondary">Kantor</p>
              <h3 className="mt-2 text-white text-xl font-semibold leading-tight">{CABANG.nama}</h3>
              <p className="mt-2 text-white">
                {CABANG.jalan}, Petojo Utara. Di Google Maps namanya hanya &ldquo;{CABANG.namaMaps}&rdquo; &mdash;
                cocokkan dengan alamat Zainul Arifin, Petojo Utara sebelum berangkat.
              </p>
            </div>
            <SelArah {...KOMPAS.timur} />
            <div className="hidden md:block" />
            <SelArah {...KOMPAS.selatan} />
            <div className="hidden md:block" />
          </div>

          <div className="mt-8 max-w-175">
            <p className="text-paragraph_black">
              <strong className="text-title_black">Naik kendaraan umum:</strong> halte Transjakarta Sawah Besar dan
              Harmoni di Koridor 1 sekitar setengah kilometer di timur. Di OpenStreetMap keduanya sedang tercatat
              sebagai halte sementara, jadi cek posisi terbarunya sebelum berangkat. Stasiun KRL terdekat{" "}
              {STASIUN.map((s) => `${s.nama} (${km(s.km)} km)`).join(", ")}.
            </p>
          </div>
        </div>
      </section>

      {/* Kontak + peta. */}
      <section className="section-spacing-lg-md" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Ketapang
              </h2>
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
              <p className="mt-6 text-paragraph_black">
                Telepon {CABANG.telepon.join(" atau ")}. Faks ada dua: {CABANG.fax.join(" dan ")}. Di beberapa
                direktori nomor rumahnya tertulis 27A, bukan 27 &mdash; alamat yang sama.
              </p>
              <p className="mt-4 text-paragraph_black">
                Ini satu-satunya kantor Adira di Jakarta Pusat pada data kami, untuk delapan kecamatan:{" "}
                {KECAMATAN_JAKPUS.join(", ")}.
              </p>
              <p className="mt-4 text-paragraph_black">
                Nomor WhatsApp {AGEN.waTampilan} milik kami sebagai agen AXI, bukan nomor kantor ini. Nomor HP lain yang
                dipasang situs-situs agen atas nama Adira Ketapang tidak bisa kami pastikan.
              </p>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={`${CABANG.nama}, Petojo Utara`} tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Ketapang
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor atau mobil di Adira Finance Ketapang
            </h2>
            <p className="mt-4 text-paragraph_black">
              BPKB motor: tabel referensi kami mulai {rupiah(motorMin)} dan paling tinggi {rupiah(motorMaks)}, dengan
              pilihan tenor {TABEL_MOTOR.tenor.join(", ")} bulan. BPKB mobil: {rupiah(mobilMin)} sampai{" "}
              {rupiah(mobilMaks)}, tenor {TABEL_MOBIL.tenor.join(", ")} bulan, dan Anda perlu menyiapkan NPWP. Angka
              pastinya baru keluar setelah Adira melihat kendaraannya &mdash; tabel itu hanya titik awal.
            </p>
            <p className="mt-4 text-paragraph_black">
              Jalannya begini: foto BPKB, STNK, dan eKTP Anda kirim lewat WhatsApp, kami cek kelayakannya. Setelah
              itu ada survei kendaraan, dan akadnya &mdash; tanda tangan serta penyerahan BPKB &mdash; di kantor
              cabang. Selama itu kendaraan tetap di tangan Anda. Lihat juga{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                dokumen yang diperlukan
              </Link>{" "}
              dan{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                hitungan cicilannya
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              Soal nama: &ldquo;PT Adira Finance Ketapang&rdquo; bukan badan usaha terpisah. Perusahaannya {NAMA_PT},
              dan Ketapang salah satu kantor cabangnya. Lebih lengkap di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Kami agen pemasar yang terdaftar; situs ini bukan milik Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Tetangga. */}
      <section className="section-spacing-lg-md" id="sekitar">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            Kantor Adira terdekat lainnya
          </h2>
          <p className="mt-4 text-paragraph_black max-w-175">
            Latumenten paling dekat, hanya sekitar 2 km, tapi sudah masuk Jakarta Barat. Cabang mana yang memproses
            pengajuan Anda tetap ditentukan Adira Finance.
          </p>
          <ul className="mt-8 border-t border-border">
            {TETANGGA.map((c) => (
              <li className="flex items-center justify-between gap-4 py-4 border-b border-border" key={c.nama}>
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
            Satu entri lagi, Sentra Cikarang, muncul di urutan atas kalau dihitung mentah dari data kami. Titik petanya
            jatuh di Jakarta padahal alamatnya di Cikarang, jadi tidak kami masukkan.
          </p>
        </div>
      </section>

      {/* Penutup: kartu gelap di atas putih. */}
      <section id="ajukan" style={{ paddingBottom: 72 }}>
        <div className="container">
          <div className="p-6 sm:p-8 md:p-10 bg-primary rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white max-w-200">
              Tinggal di Jakarta Pusat? Mulai dari foto BPKB
            </h2>
            <p className="mt-4 text-white max-w-175">
              Sebut &ldquo;Ketapang&rdquo; saat menghubungi kami, pengajuan Anda diteruskan ke cabang yang tepat.
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
            <p className="mt-8 text-sm text-white">{PERNYATAAN_OJK}</p>
            <p className="mt-2 text-sm text-white">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-secondary">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-secondary">{AGEN.id}</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
