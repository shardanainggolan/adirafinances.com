import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  ALAMAT_DIREKTORI_LAMA,
  CABANG,
  CIMANGGIS,
  DARI_KECAMATAN,
  NAMA_PT,
  PATOKAN,
  PETA_EMBED,
  PETA_URL,
  TETANGGA,
} from "@/lib/cabang-cibinong";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Cibinong – Kabupaten Bogor.
 *
 * Bentuk keempat belas. Tiga belas sebelumnya: lokasi, proses, cara sampai
 * (patokan radial), identitas, perbandingan, verifikasi pin, tanya-jawab,
 * anatomi alamat, ketersediaan kontak, catatan pengecekan, glosarium, kartu
 * kunjungan + rute satu jalan, zoom bertingkat.
 *
 * Halaman ini dipimpin TITIK BERANGKAT: pembaca dari Bojong Gede, Citeureup,
 * Sukaraja, dst. lebih dulu diberi tahu apakah Cibinong memang kantor Adira
 * terdekat dari kecamatannya — dan kalau bukan, kantor mana, dengan tautan.
 * Cibinong ibu kota Kabupaten Bogor dan kantor ini satu-satunya kantor Adira
 * di bagian tengah kabupaten itu pada data kami, jadi pertanyaan "dari
 * tempat saya, ke mana?" adalah pertanyaan nyata di sini. Lalu patokan
 * sekitar kantor (dengan sisi jalan), lalu tiga cara tidak salah kantor.
 * Semua sumber di `lib/cabang-cibinong.ts`.
 */

const JUDUL = "Adira Finance Cibinong — Alamat, Telepon & Gadai BPKB";
const DESKRIPSI =
  "Adira Finance Cibinong di Jl. Raya Jakarta-Bogor No. 8, Cirimekar, Kabupaten Bogor. Telepon kantor, patokan dekat Situ Kibing, dan kantor terdekat dari kecamatan Anda.";

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Cibinong";
const km = (n: number) => String(n).replace(".", ",");

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];
const tenorMotor = `${TABEL_MOTOR.tenor[0]}–${TABEL_MOTOR.tenor[TABEL_MOTOR.tenor.length - 1]}`;
const tenorMobil = `${TABEL_MOBIL.tenor[0]}–${TABEL_MOBIL.tenor[TABEL_MOBIL.tenor.length - 1]}`;

export default function CibinongPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Cibinong, Kabupaten Bogor",
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

      {/* Hero: alamat dan telepon langsung, tanpa basa-basi. */}
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
              <li aria-current="page">Cibinong, Kabupaten Bogor</li>
            </ol>
          </nav>

          <h1 className="mt-8 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Cibinong
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            Alamatnya {CABANG.jalan}, Kelurahan {CABANG.kelurahan}, Kecamatan Cibinong, {CABANG.kabupaten}{" "}
            {CABANG.kodePos}. Patokan paling gampang: kantornya di seberang Situ Kibing, sekitar 300 meter dari danau
            itu.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3 max-w-200">
            <div className="p-4 bg-background rounded-xl">
              <dt className="text-sm text-paragraph_black">Telepon kantor</dt>
              <dd className="mt-1">
                {CABANG.telepon.map((n) => (
                  <a className="block text-title_black font-semibold hover:text-primary" href={`tel:${n.replace(/-/g, "")}`} key={n}>
                    {n}
                  </a>
                ))}
              </dd>
            </div>
            <div className="p-4 bg-background rounded-xl">
              <dt className="text-sm text-paragraph_black">Faks</dt>
              <dd className="mt-1 text-title_black font-semibold">{CABANG.fax}</dd>
            </div>
            <div className="p-4 bg-background rounded-xl">
              <dt className="text-sm text-paragraph_black">Di Google Maps</dt>
              <dd className="mt-1 text-title_black font-semibold">&ldquo;{CABANG.namaMaps}&rdquo;, Cirimekar</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <a className="button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
              Tanya gadai BPKB lewat WhatsApp
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href="#berangkat">
              Cek dulu: Cibinong kantor terdekat dari tempat Anda?
            </a>
          </div>
        </div>
      </section>

      {/* Titik berangkat — tulang punggung halaman ini. */}
      <section className="section-spacing-lg-md bg-background" id="berangkat">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Berangkat dari mana?
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Dari kecamatan Anda, kantor Adira mana yang paling dekat
            </h2>
            <p className="mt-4 text-paragraph_black">
              Cibinong ibu kota Kabupaten Bogor, dan kabupaten ini punya 40 kecamatan. Banyak orang langsung mencari
              &ldquo;Adira Cibinong&rdquo; karena itu nama yang paling dikenal, padahal untuk sebagian kecamatan di
              sekitarnya ada kantor Adira lain yang lebih dekat. Kami hitung dari titik wilayah tiap kecamatan di
              OpenStreetMap, jarak lurus.
            </p>
          </div>

          <ul className="mt-10 grid gap-3">
            {DARI_KECAMATAN.map((r) => {
              const iniKantornya = r.href === null;
              return (
                <li
                  className={`flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 rounded-xl ${
                    iniKantornya ? "bg-secondary" : "bg-white border border-border"
                  }`}
                  key={r.kecamatan}
                >
                  <span className="text-title_black font-semibold text-lg">Kec. {r.kecamatan}</span>
                  <span className="text-title_black">
                    {iniKantornya ? (
                      <>
                        <strong>Cibinong</strong> &mdash; kantor ini, {km(r.kmTerdekat)} km
                      </>
                    ) : (
                      <>
                        <Link className="font-semibold underline hover:text-primary" href={r.href ?? "/"}>
                          {r.terdekat}
                        </Link>
                        , {km(r.kmTerdekat)} km{" "}
                        <span className="text-paragraph_black">(ke Cibinong {km(r.kmKeSini)} km)</span>
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 max-w-175">
            <p className="text-sm text-paragraph_black">
              Bojong Gede dihitung dari titik desa Bojonggede. Kecamatan di sisi barat &mdash; Tajurhalang, Kemang,
              Parung, Ciseeng, Gunung Sindur, Rancabungur &mdash; sengaja tidak kami cantumkan: kantor terdekatnya
              menurut data kami adalah Parung Panjang, yang alamat dan titik petanya tidak cocok satu sama lain, jadi
              jaraknya tidak bisa kami pertanggungjawabkan.
            </p>
            <p className="mt-3 text-sm text-paragraph_black">
              &ldquo;Terdekat&rdquo; di sini hanya soal jarak. Cabang mana yang akhirnya memproses pengajuan Anda
              ditentukan Adira Finance.
            </p>
          </div>
        </div>
      </section>

      {/* Patokan + peta. */}
      <section className="section-spacing-lg-md" id="patokan">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Patokan di sekitar Jl. Raya Jakarta-Bogor No. 8
              </h2>
              <p className="mt-4 text-paragraph_black">
                Di peta, jalan ini tertulis &ldquo;Jalan Raya Bogor&rdquo; &mdash; sama saja. Kalau Anda datang dari
                arah Depok, kantor ada di kiri jalan. Situ Kibing dan RS Trimitra ada di kanan, di seberangnya.
              </p>

              {PATOKAN.map((g) => (
                <div className="mt-8" key={g.grup}>
                  <h3 className="text-sm uppercase tracking-wide text-paragraph_black">{g.grup}</h3>
                  <ul className="mt-3 border-t border-border">
                    {g.isi.map((p) => (
                      <li className="flex items-start justify-between gap-4 py-3 border-b border-border" key={p.nama}>
                        <span className="text-title_black font-semibold">
                          {p.nama}
                          {p.catatan ? (
                            <span className="block text-paragraph_black font-normal text-sm">{p.catatan}</span>
                          ) : null}
                        </span>
                        <span className="text-paragraph_black whitespace-nowrap">{km(p.km)} km</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="mt-4 text-sm text-paragraph_black">
                Jarak lurus dari titik kantor di Google Maps; posisi patokan dari OpenStreetMap.
              </p>
            </div>
            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={`${CABANG.nama}, Cirimekar`} tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Tiga cara tidak salah kantor. */}
      <section className="section-spacing-lg-md bg-background" id="jangan-tertukar">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            Tiga hal yang bikin orang salah alamat
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="p-5 sm:p-6 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">
                Ada Adira lain di jalan yang sama
              </h3>
              <p className="mt-3 text-paragraph_black">
                <Link className="text-primary font-semibold underline" href="/adira-finance-cimanggis-depok">
                  Adira Cimanggis
                </Link>{" "}
                juga beralamat di Jl. Raya Jakarta-Bogor &mdash; tapi di KM 31, Cisalak, Kota Depok,
                sekitar {km(CIMANGGIS.km)} km ke utara. Cara membedakannya lewat telepon: nomor Cibinong diawali
                021-8790, nomor Cimanggis 021-8771.
              </p>
            </div>
            <div className="p-5 sm:p-6 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Alamat versi direktori lama</h3>
              <p className="mt-3 text-paragraph_black">
                Beberapa direktori menulis kantor ini di &ldquo;{ALAMAT_DIREKTORI_LAMA}&rdquo;, dengan nomor telepon
                yang sama. Jalannya sama, kelurahannya juga Cirimekar. Kami belum bisa memastikan apakah itu alamat
                lama atau cara lain menulis tempat yang sama, jadi patokan yang kami pakai tetap titik di Google Maps.
              </p>
            </div>
            <div className="p-5 sm:p-6 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Kabupaten, bukan Kota Bogor</h3>
              <p className="mt-3 text-paragraph_black">
                Kalau ada situs yang menulis &ldquo;Kota Bogor&rdquo; di alamat cabang ini, itu keliru. Cibinong masuk
                Kabupaten Bogor, dan teleponnya berkode 021, bukan 0251 seperti kantor Tajur. Kantor Adira yang di Kota
                Bogor ada dua:{" "}
                <Link className="text-primary font-semibold underline" href="/adira-finance-tajur">
                  Tajur
                </Link>{" "}
                dan{" "}
                <Link className="text-primary font-semibold underline" href="/adira-finance-soleh-iskandar">
                  Soleh Iskandar
                </Link>
                .
              </p>
            </div>
          </div>

          <p className="mt-8 text-paragraph_black max-w-175">
            Nomor WhatsApp {AGEN.waTampilan} di halaman ini nomor kami sebagai agen AXI, bukan nomor kantor cabang.
            Situs lain juga memasang beberapa nomor HP atas nama Adira Cibinong; nomor-nomor itu tidak bisa kami
            konfirmasi.
          </p>
        </div>
      </section>

      {/* Gadai BPKB. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB di Cibinong
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Gadai BPKB motor dan mobil lewat Adira Finance Cibinong
            </h2>
            <p className="mt-4 text-paragraph_black">
              Yang dijaminkan hanya BPKB-nya. Motor atau mobilnya tetap Anda pakai seperti biasa. Di tabel referensi
              kami, pinjaman dengan BPKB motor berkisar {rupiah(motorMin)} sampai {rupiah(motorMaks)} dengan tenor{" "}
              {tenorMotor} bulan; dengan BPKB mobil {rupiah(mobilMin)} sampai {rupiah(mobilMaks)}, tenor {tenorMobil}{" "}
              bulan, dan NPWP ikut diminta. Itu gambaran, bukan penawaran: plafon akhirnya diputuskan Adira setelah
              kendaraan disurvei.
            </p>
            <p className="mt-4 text-paragraph_black">
              Mulainya dari WhatsApp: kirim foto BPKB, STNK, dan eKTP, kami lihat dulu apakah kendaraannya layak.
              Kalau iya, kendaraan disurvei, lalu tanda tangan dan penyerahan BPKB dilakukan di kantor cabang. Daftar
              dokumennya ada di{" "}
              <Link className="text-primary font-semibold underline" href="/#persyaratan">
                persyaratan
              </Link>
              , perkiraan cicilan untuk kendaraan Anda di{" "}
              <Link className="text-primary font-semibold underline" href="/simulasi">
                simulasi angsuran
              </Link>
              .
            </p>
            <p className="mt-4 text-paragraph_black">
              Orang biasa menyebutnya &ldquo;PT Adira Finance&rdquo; atau &ldquo;PT Adira Finance Cibinong&rdquo;.
              Di kontrak, namanya {NAMA_PT} &mdash; perusahaannya satu, kantor Cibinong salah satu cabangnya. Profil
              singkatnya ada di{" "}
              <Link className="text-primary font-semibold underline" href="/tentang">
                halaman tentang Adira Finance
              </Link>
              . Situs ini milik agen, bukan situs resmi Adira.
            </p>
          </div>
        </div>
      </section>

      {/* Tetangga. */}
      <section className="section-spacing-lg-md bg-background" id="sekitar">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-title_black leading-tight max-w-175">
            Kantor Adira lain di sekitar Cibinong
          </h2>
          <p className="mt-4 text-paragraph_black max-w-175">
            Tiga yang paling dekat justru di Kota Depok. Di Kabupaten Bogor, kantor lain yang titiknya sudah kami
            cek adalah Mall Cileungsi.
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
            Dua entri lain di data kami (Juanda, Depok dan Parung Panjang, Bogor) tidak dimasukkan karena titik petanya
            tidak cocok dengan alamatnya.
          </p>
        </div>
      </section>

      {/* Penutup: kartu kuning di atas putih — footer situs juga kuning, jadi
          bagian kuning selebar layar akan menyatu dengannya. */}
      <section className="section-spacing-lg-md" id="ajukan">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center p-5 sm:p-6 md:p-8 bg-secondary rounded-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
                Dari Bojong Gede, Citeureup, atau Cibinong sendiri?
              </h2>
              <p className="mt-4 text-title_black">
                Kirim foto BPKB lewat WhatsApp dan sebut kecamatan Anda. Pengajuan diteruskan ke cabang terdekat.
              </p>
              <div className="mt-6">
                <a
                  className="items-center gap-2 rounded-full bg-primary text-white font-semibold"
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
