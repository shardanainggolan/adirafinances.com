import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  KELURAHAN_CIMANGGIS,
  KELURAHAN_TAPOS,
  LEGENDA,
  NAMA_PT,
  PETA_EMBED,
  PETA_URL,
  TETANGGA,
} from "@/lib/cabang-cimanggis";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Cimanggis – Depok.
 *
 * Bentuk kedua puluh. Sembilan belas sebelumnya: lokasi, proses, cara sampai
 * (patokan radial), identitas, perbandingan, verifikasi pin, tanya-jawab,
 * anatomi alamat, ketersediaan kontak, catatan pengecekan, glosarium, kartu
 * kunjungan + rute satu jalan, zoom bertingkat, titik berangkat per
 * kecamatan, kompas, dua fakta yang saling menjelaskan, garis batas, tangga
 * utara–selatan, penggaris jalan.
 *
 * Halaman ini dipimpin LEGENDA PETA: kotak berbingkai seperti legenda di peta
 * cetak, empat kelompok dengan kunci warna (air, kampus & fasilitas, pasar &
 * jalan, kereta) — sekitar kantor ini ada empat situ dalam 1 km. Lalu dua
 * jebakan nama wilayah yang nyata di sini: dua "Cisalak" di dua kecamatan,
 * dan Tapos yang dulu bagian dari Cimanggis. Sumber di `lib/cabang-cimanggis.ts`.
 */

const JUDUL = "Adira Finance Cimanggis Depok — Alamat, Telepon & Patokan";
const DESKRIPSI =
  "Adira Finance Cimanggis di Jl. Raya Jakarta-Bogor KM 31, Cisalak, Depok — dekat Kampus Gunadarma F4 dan Pasar Cisalak. Telepon 021-87714717 dan cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Cimanggis Depok";
const km = (n: number) => String(n).replace(".", ",");

/** Kunci legenda per kelompok — hanya warna template (kuning, hitam, abu, putih berbingkai). */
const KUNCI = ["bg-secondary", "bg-primary", "bg-border", "bg-white border border-primary"] as const;

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function CimanggisPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Cimanggis, Depok",
        serviceType: "Pembiayaan multiguna jaminan BPKB",
        provider: { "@type": "FinancialService", "@id": `${SITE_URL}/#adira`, name: NAMA_PT },
        areaServed: { "@type": "City", name: CABANG.kota, containedInPlace: { "@type": "State", name: CABANG.provinsi } },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero putih: alamat KM 31, dua telepon. */}
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
              <li aria-current="page">Cimanggis, Depok</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Cimanggis Depok
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            {CABANG.jalan}, kawasan Cisalak, Kecamatan Cimanggis, Kota Depok. Di Google Maps namanya &ldquo;
            {CABANG.namaMaps}&rdquo;; dari kantor, Kampus Gunadarma F4 hanya sekitar 200 meter ke utara.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            {CABANG.telepon.map((n) => (
              <a className="button-primary" href={`tel:${n.replace(/-/g, "")}`} key={n}>
                Telepon {n}
              </a>
            ))}
            <a className="text-title_black font-semibold underline hover:text-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              atau WhatsApp kami
            </a>
          </div>
        </div>
      </section>

      {/* Legenda peta. */}
      <section className="section-spacing-lg-md bg-background" id="legenda">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Legenda sekitar kantor
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Empat situ, satu kampus, satu pasar
              </h2>
              <p className="mt-4 text-paragraph_black">
                Baca seperti legenda peta: tiap kelompok punya warnanya sendiri, jaraknya lurus dari titik kantor di
                Google Maps, posisinya dari OpenStreetMap.
              </p>

              <div className="mt-8 p-5 sm:p-6 bg-white border border-border rounded-2xl">
                <p className="text-sm uppercase tracking-wide text-paragraph_black">Legenda</p>
                {LEGENDA.map((g, i) => (
                  <div className="mt-5" key={g.judul}>
                    <h3 className="flex items-center gap-3 text-title_black text-xl font-semibold leading-tight">
                      <span
                        aria-hidden="true"
                        className={KUNCI[i]}
                        style={{ display: "inline-block", width: 14, height: 14, borderRadius: 3, flexShrink: 0 }}
                      />
                      {g.judul}
                    </h3>
                    <ul className="mt-2">
                      {g.isi.map((b) => (
                        <li className="flex items-start justify-between gap-4 py-2 border-b border-border" key={b.nama}>
                          <span className="text-title_black">
                            {b.nama}
                            <span className="block text-sm text-paragraph_black">ke {b.arah}</span>
                          </span>
                          <span className="text-paragraph_black whitespace-nowrap">{km(b.km)} km</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.namaMaps} tautanPeta={PETA_URL} />
              <address className="mt-8 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">
                  {CABANG.jalan}, {CABANG.rtRw}
                </span>
                <span className="block">Kecamatan {CABANG.kecamatan}</span>
                <span className="block">
                  {CABANG.kota}, {CABANG.provinsi}
                </span>
              </address>
              <p className="mt-4 text-paragraph_black">
                Telepon {CABANG.telepon.join(" atau ")}, faks {CABANG.fax}. WhatsApp {AGEN.waTampilan} di halaman ini
                nomor kami sebagai agen AXI &mdash; bukan nomor cabang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dua jebakan nama wilayah. */}
      <section className="section-spacing-lg-md" id="nama-wilayah">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            Dua nama wilayah yang sering bikin bingung di sini
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="p-5 sm:p-6 md:p-8 border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Ada dua &ldquo;Cisalak&rdquo; di Depok</h3>
              <p className="mt-3 text-paragraph_black">
                Kelurahan Cisalak ada di Kecamatan Sukmajaya. Kelurahan Cisalak Pasar ada di Kecamatan Cimanggis. Alamat
                kantor ini ditulis berbeda-beda &mdash; Google Maps menulis &ldquo;Cisalak, Kec. Cimanggis&rdquo;,
                direktori lain menulis &ldquo;Cisalak Pasar&rdquo; atau &ldquo;Cisalak Sukmajaya&rdquo;. Yang pasti,
                kantornya di Jl. Raya Jakarta-Bogor KM 31. Patokan
                paling gampang tetap Kampus Gunadarma F4 di sebelah utaranya.
              </p>
            </div>
            <div className="p-5 sm:p-6 md:p-8 bg-background rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Cimanggis atau Tapos?</h3>
              <p className="mt-3 text-paragraph_black">
                Kecamatan Tapos dulunya bagian dari Kecamatan Cimanggis, sebelum dimekarkan. Sekarang Cimanggis berisi {KELURAHAN_CIMANGGIS.length} kelurahan (
                {KELURAHAN_CIMANGGIS.join(", ")}), sedangkan {KELURAHAN_TAPOS.join(", ")} masuk Tapos. Dari tengah
                wilayah Tapos, kantor Adira terdekat tetap yang ini: sekitar 5,4 km.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Depok
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Cimanggis
            </h2>
            <p className="mt-4 text-paragraph_black">
              Jaminannya BPKB, kendaraan tetap dipakai sehari-hari. Patokan dari tabel referensi kami: BPKB motor{" "}
              {rupiah(motorMin)}&ndash;{rupiah(motorMaks)} (tenor sampai {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]}{" "}
              bulan), BPKB mobil {rupiah(mobilMin)}&ndash;{rupiah(mobilMaks)} (sampai{" "}
              {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, plus NPWP). Angka yang disetujui baru keluar setelah
              Adira mensurvei kendaraannya.
            </p>
            <p className="mt-4 text-paragraph_black">
              Alurnya: kirim foto BPKB, STNK, dan eKTP lewat WhatsApp, kami cek kelayakannya, kendaraan disurvei, lalu
              tanda tangan dan serah terima BPKB di kantor cabang. Detailnya ada di{" "}
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
              Mencari &ldquo;PT Adira Finance Depok&rdquo; atau &ldquo;PT Adira Finance Cimanggis&rdquo;? Badan
              usahanya satu, {NAMA_PT}; Cimanggis salah satu cabangnya di Depok. Lebih lanjut di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Situs ini dikelola agen pemasar, bukan Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Tetangga + Depok. */}
      <section className="section-spacing-lg-md" id="sekitar">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            Adira Finance Depok dan sekitarnya
          </h2>
          <p className="mt-4 text-paragraph_black max-w-175">
            Cimanggis kantor Adira paling timur di Depok pada data kami; dua lainnya, Margonda dan Sawangan, ada di
            barat. Perbandingan lengkap kantor-kantor Depok ada di{" "}
            <Link className="text-primary font-semibold underline" href="/adira-finance-sawangan">
              halaman cabang Sawangan
            </Link>
            .
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TETANGGA.map((c) => (
              <li className="flex items-center justify-between gap-4 p-4 border border-border rounded-xl" key={c.nama}>
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
            Jarak lurus di peta. Satu entri lagi di data kami, &ldquo;Juanda &ndash; Depok&rdquo;, menunjuk ke lokasi
            yang sama dengan Margonda, jadi tidak kami hitung terpisah. Cabang yang memproses pengajuan ditentukan Adira
            Finance.
          </p>
        </div>
      </section>

      {/* Penutup gelap dalam kartu, di atas latar abu muda. */}
      <section className="section-spacing-lg-md bg-background" id="ajukan">
        <div className="container">
          <div className="p-6 sm:p-8 md:p-10 bg-primary rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white max-w-200">
              Dari Cimanggis, Tapos, atau Cibubur
            </h2>
            <p className="mt-4 text-white max-w-175">
              Kirim foto BPKB lewat WhatsApp dan sebut kelurahan Anda. Pengajuan diteruskan ke cabang yang tepat.
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
