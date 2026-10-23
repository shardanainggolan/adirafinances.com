import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import { CABANG, JALUR, NAMA_PT, PETA_EMBED, PETA_URL, TETANGGA } from "@/lib/cabang-tambun";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Tambun – Tambun Selatan, Kabupaten Bekasi.
 *
 * Bentuk ketujuh belas. Enam belas sebelumnya: lokasi, proses, cara sampai
 * (patokan radial), identitas, perbandingan, verifikasi pin, tanya-jawab,
 * anatomi alamat, ketersediaan kontak, catatan pengecekan, glosarium, kartu
 * kunjungan + rute satu jalan, zoom bertingkat, titik berangkat per
 * kecamatan, kompas, dua fakta yang saling menjelaskan.
 *
 * Halaman ini dipimpin GARIS BATAS: kantornya di ujung timur Tambun Selatan,
 * dan 0,8 km ke timur jalan raya yang sama sudah berganti nama dan masuk
 * Cibitung — stasiun KRL terdekat pun Cibitung, bukan Tambun. Ditampilkan
 * sebagai dua baris barat → timur: sisi Tambun, lalu batas + sisi Cibitung.
 * Sumber di `lib/cabang-tambun.ts`.
 */

const JUDUL = "Adira Finance Tambun Bekasi — Alamat, Telepon & Lokasi";
const DESKRIPSI =
  "Adira Finance Tambun di Ruko Permata Metropolitan, Jl. Sultan Hasanudin, Tambun Selatan, Bekasi — sebelah Plaza Metropolitan Tambun. Telepon 021-8831881 dan cara gadai BPKB.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Tambun Bekasi";
const km = (n: number) => String(n).replace(".", ",");

/** "1,8 km ke barat" / "860 m ke timur" — hanya komponen timur-barat. */
function arahTimurBarat(m: number): string {
  if (m === 0) return "titik acuan";
  const jarak = Math.abs(m) >= 1000 ? `${km(Math.round(Math.abs(m) / 100) / 10)} km` : `${Math.round(Math.abs(m) / 10) * 10} m`;
  return `${jarak} ke ${m < 0 ? "barat" : "timur"}`;
}

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

const sisiTambun = JALUR.filter((j) => j.sisi === "Tambun");
const sisiCibitung = JALUR.filter((j) => j.sisi !== "Tambun");

function KartuJalur({ j }: { j: (typeof JALUR)[number] }) {
  const kantor = j.m === 0;
  const batas = j.sisi === "batas";
  const kelas = kantor
    ? "bg-primary"
    : batas
      ? "bg-secondary"
      : j.sisi === "Cibitung"
        ? "bg-background border border-border"
        : "bg-white border border-border";
  return (
    <li className={`h-full p-4 rounded-2xl ${kelas}`}>
      <p className={`text-sm ${kantor ? "text-secondary" : "text-paragraph_black"}`}>{arahTimurBarat(j.m)}</p>
      <p className={`mt-1 font-semibold leading-tight ${kantor ? "text-white" : "text-title_black"}`}>{j.nama}</p>
      {j.catatan ? (
        <p className={`mt-1 text-sm ${kantor ? "text-white" : batas ? "text-title_black" : "text-paragraph_black"}`}>
          {j.catatan}
        </p>
      ) : null}
      {j.km !== null && j.km >= 1 ? (
        <p className="mt-1 text-sm text-paragraph_black">lurus {km(j.km)} km</p>
      ) : null}
    </li>
  );
}

export default function TambunPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Tambun, Kabupaten Bekasi",
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

      {/* Hero: nama listing di Maps lebih dulu, karena itulah yang dicari di aplikasi peta. */}
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
              <li aria-current="page">Tambun, Bekasi</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Tambun Bekasi
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            {CABANG.kompleks}, {CABANG.jalan}, Kecamatan Tambun Selatan, Kabupaten Bekasi. Letaknya di kawasan
            Metland Tambun, sekitar 70 meter dari Plaza Metropolitan Tambun.
          </p>
          <p className="mt-3 text-paragraph_black max-w-175">
            Di Google Maps tertulis{" "}
            <strong className="text-title_black">&ldquo;{CABANG.namaMaps}&rdquo;</strong>.
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

      {/* Garis batas Tambun–Cibitung. */}
      <section className="section-spacing-lg-md" id="batas-cibitung">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Di ujung timur Tambun
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Kantornya di Tambun, tapi tetangga terdekatnya serba Cibitung
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kantor ini berada di tepi timur Kecamatan Tambun Selatan. Sekitar 800 meter ke timur, nama jalan raya
              di utara kantor berganti jadi Jalan Raya Teuku Umar, dan tak lama kemudian Anda sudah di Cibitung. Karena itu, kalau naik
              KRL, turunlah di <strong className="text-title_black">Stasiun Cibitung</strong> &mdash; jaraknya ke
              kantor 1,38 km, lebih dekat daripada Stasiun Tambun yang 2,02 km.
            </p>
          </div>

          <div className="mt-10">
            <p className="text-sm uppercase tracking-wide text-paragraph_black">Sisi Tambun &mdash; barat ke timur</p>
            <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {sisiTambun.map((j) => (
                <KartuJalur j={j} key={j.nama} />
              ))}
            </ol>
            <p className="mt-8 text-sm uppercase tracking-wide text-paragraph_black">
              Lanjut ke timur &mdash; batas dan sisi Cibitung
            </p>
            <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {sisiCibitung.map((j) => (
                <KartuJalur j={j} key={j.nama} />
              ))}
            </ol>
          </div>

          <p className="mt-6 text-sm text-paragraph_black max-w-175">
            Jarak di kartu hanya komponen timur&ndash;barat dari kantor, supaya urutannya terbaca seperti menyusuri
            jalan; jarak lurus ditulis bila lebih dari 1 km. Posisi dari OpenStreetMap. Halte bus Trans Wibawa Mukti
            &ldquo;Metland Tambun&rdquo; ada sekitar 150 meter dari kantor.
          </p>
        </div>
      </section>

      {/* Alamat, nama jalan, kontak, peta. */}
      <section className="section-spacing-lg-md bg-background" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Alamat dan telepon Adira Finance Tambun
              </h2>
              <address className="mt-6 text-paragraph_black">
                <strong className="block text-title_black">{CABANG.namaDataset}</strong>
                <span className="block mt-2">{CABANG.kompleks}</span>
                <span className="block">{CABANG.jalan}</span>
                <span className="block">
                  Kec. {CABANG.kecamatan}, {CABANG.kabupaten}, {CABANG.provinsi}
                </span>
              </address>
              <p className="mt-6 text-paragraph_black">
                Telepon kantor {CABANG.telepon}, faks {CABANG.fax}.
              </p>
              <p className="mt-4 text-paragraph_black">
                Soal nama jalan: alamat kantor memakai nama Jl. Sultan Hasanudin. Jalan raya sekitar 150 meter di utara
                kantor tercatat sebagai Jalan Hasanuddin di OpenStreetMap, tapi Google Maps memberinya label Jl.
                Pantura. Jadi jangan bingung kalau aplikasi peta Anda menampilkan nama yang berbeda.
              </p>
              <p className="mt-4 text-paragraph_black">
                Kode pos sengaja tidak kami tulis: data cabang dan beberapa direktori menulis 17729, Wikipedia mencatat
                17510 untuk seluruh Tambun Selatan, dan OpenStreetMap 17520 untuk titik ini. Untuk mencari lokasi,
                nama di Google Maps di atas lebih bisa diandalkan.
              </p>
              <p className="mt-4 text-paragraph_black">
                WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen AXI, bukan nomor kantor ini. Nomor HP lain
                yang mengatasnamakan Adira Tambun di internet tidak bisa kami pastikan.
              </p>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul="Adira Finance Tambun, Metland Tambun" tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Tambun
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil di Adira Finance Tambun Bekasi
            </h2>
            <p className="mt-4 text-paragraph_black">
              Jaminannya cuma BPKB; kendaraannya tetap Anda pakai. Dalam tabel referensi kami, BPKB motor bisa
              dicairkan mulai {rupiah(motorMin)} sampai {rupiah(motorMaks)}, BPKB mobil {rupiah(mobilMin)} sampai{" "}
              {rupiah(mobilMaks)}. Tenor motor sampai {TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]} bulan, mobil
              sampai {TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]} bulan, dan khusus mobil ada tambahan NPWP. Angka
              akhirnya baru pasti setelah survei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Prosesnya dimulai dari foto BPKB, STNK, dan eKTP yang Anda kirim lewat WhatsApp. Kami cek dulu
              kelayakannya, lalu kendaraan disurvei, dan tanda tangan serta penyerahan BPKB dilakukan di kantor
              cabang. Lihat{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                dokumen yang perlu disiapkan
              </Link>{" "}
              atau hitung cicilannya di{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              &ldquo;PT Adira Finance Tambun&rdquo; dan nama di Google Maps &ldquo;PT Adira Dinamika Multi Finance
              Tambun&rdquo; menunjuk perusahaan yang sama: {NAMA_PT}, dengan Tambun sebagai salah satu cabangnya.
              Profilnya ada di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                tentang Adira Finance
              </Link>
              . Kami agen pemasar terdaftar, bukan Adira sendiri.
            </p>
          </div>
        </div>
      </section>

      {/* Kabupaten Bekasi + tetangga. */}
      <section className="section-spacing-lg-md bg-background" id="sekitar">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            Kantor Adira lain dari Tambun
          </h2>
          <p className="mt-4 text-paragraph_black max-w-175">
            Di data cabang kami, Kabupaten Bekasi punya tiga kantor Adira: Tambun ini dan dua di Cikarang Selatan.
            Titik peta kedua kantor Cikarang itu tidak cocok dengan alamatnya, jadi jaraknya tidak kami tulis. Yang
            tercantum di bawah sudah kami cek titiknya.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            Jarak lurus di peta. Cabang yang memproses pengajuan ditentukan Adira Finance.
          </p>
        </div>
      </section>

      {/* Penutup: dua kolom di atas putih, kiri tombol, kanan disclosure. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="p-6 sm:p-8 bg-secondary rounded-3xl">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
                Dari Tambun, Cibitung, atau sekitarnya
              </h2>
              <p className="mt-4 text-title_black">
                Kirim foto BPKB lewat WhatsApp dan sebut &ldquo;Tambun&rdquo;. Kami teruskan ke cabang yang tepat.
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
