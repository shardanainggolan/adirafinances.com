import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  ARAH_SUKABUMI,
  CABANG,
  DI_KABUPATEN_BOGOR,
  DI_KOTA_BOGOR,
  KECAMATAN_KOTA_BOGOR,
  PETA_EMBED,
  PETA_URL,
} from "@/lib/cabang-tajur";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

/**
 * Halaman cabang Adira Finance Tajur – Bogor.
 *
 * Bentuk kelima, tidak meminjam dari empat sebelumnya (lokasi / proses /
 * cara sampai / identitas). Halaman ini dipimpin PERBANDINGAN, karena dua hal
 * yang dicari orang di kata kuncinya adalah perbandingan: "mobil" (apa bedanya
 * menggadaikan BPKB mobil dengan motor di cabang ini) dan "kota bogor jawa
 * barat" (Tajur di Kota Bogor — sementara hampir semua cabang "Bogor" lain
 * ada di Kabupaten Bogor).
 *
 * Komponen dan urutannya: hero dua panel (gelap / kuning) → lembar
 * spesifikasi mobil vs motor dari tabel referensi situs ini sendiri → "Kota,
 * bukan Kabupaten" dengan cabang dipilah menurut wilayah → nama pin peta yang
 * tidak menyebut Tajur + kontak mendatar + peta → proses ringkas → penutup
 * kotak berbingkai. `scripts/cek-doorway.mjs` yang memutuskan.
 *
 * Aturan yang sama untuk semua halaman cabang (SKILL.md §8): boilerplate
 * nasional tidak disalin, hanya ditautkan; nomor WhatsApp agen tidak pernah
 * tampil sebagai nomor cabang; yang belum diverifikasi tidak terbit. Angka
 * plafon dan tenor DIBACA dari `lib/tabel-angsuran.ts`, bukan diketik ulang.
 */

const JUDUL = "Adira Finance Tajur, Kota Bogor — Gadai BPKB Mobil & Motor";
const DESKRIPSI = `Cabang Adira Finance Tajur di ${CABANG.jalan}, ${CABANG.kecamatan}, Kota Bogor, Jawa Barat. Beda gadai BPKB mobil dan motor di cabang ini, telepon cabang, dan petanya.`;

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Tajur Bogor";

const motorMin = TABEL_MOTOR.baris[0][0];
const motorMaks = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const mobilMin = TABEL_MOBIL.baris[0][0];
const mobilMaks = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

/** Baris lembar spesifikasi. Semua nilai dari data situs ini sendiri. */
const spesifikasi: { label: string; motor: string; mobil: string }[] = [
  { label: "Plafon di tabel referensi", motor: `${rupiah(motorMin)} – ${rupiah(motorMaks)}`, mobil: `${rupiah(mobilMin)} – ${rupiah(mobilMaks)}` },
  { label: "Pilihan tenor (bulan)", motor: TABEL_MOTOR.tenor.join(" · "), mobil: TABEL_MOBIL.tenor.join(" · ") },
  { label: "NPWP", motor: "Tidak diminta", mobil: "Diminta" },
  { label: "Unit dilihat saat survei", motor: "Ya", mobil: "Ya" },
];

/** Kelas padding tidak ada di CSS terkompilasi, jadi ukurannya inline. */
const pilKuning = { display: "inline-flex", padding: "12px 24px" } as const;

/**
 * Lembar spesifikasi: ditumpuk di layar sempit, tiga kolom mulai `md`.
 *
 * Tiga kolom di 390px tidak muat — sel "Rp200.000.000" (13 karakter, semibold)
 * lebih lebar dari 87px isi sel, dan `grid-cols-3` tanpa awalan responsif pun
 * tidak ada di CSS terkompilasi. Jadi kepala tabel `hidden md:grid`, baris
 * `grid md:grid-cols-3`, dan sel Motor/Mobil diberi label `md:hidden` supaya
 * tetap terbaca saat ditumpuk. `rounded-t-2xl` juga tidak ada; 16px = radius
 * `rounded-2xl` wadahnya.
 */
const sudutAtas = { borderRadius: "16px 16px 0 0" } as const;

export default function TajurPage() {
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
      // `provider` menunjuk Adira. Tidak ada Organization/LocalBusiness yang
      // mengaku mengoperasikan kantor ini — lihat SKILL.md §0.
      {
        "@type": "Service",
        "@id": `${SITE_URL}/${CABANG.slug}#layanan`,
        name: "Gadai BPKB mobil dan motor — cabang Tajur, Kota Bogor",
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

      {/* Hero dua panel: gelap untuk judul, kuning untuk tiga hal yang perlu tahu dulu. */}
      <section className="py-14 md:py-20 lg:py-24 relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-paragraph_black">
              <li>
                <Link className="hover:text-primary" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Tajur, Bogor</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="p-5 sm:p-6 md:p-8 lg:p-10 bg-primary rounded-3xl">
              <p className="text-base font-semibold uppercase text-secondary">
                {CABANG.kecamatan} &middot; {CABANG.kota} &middot; {CABANG.provinsi}
              </p>
              <h1 className="mt-3 text-[40px] sm:text-5xl leading-tight! font-bold text-white">
                Adira Finance Tajur, Bogor
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white">
                Untuk Anda di Kota Bogor yang mau menggadaikan BPKB mobil atau motor lewat kantor Adira di{" "}
                {CABANG.jalan}. Dua hal dijelaskan di sini: apa bedanya kalau jaminannya mobil, dan kenapa cabang ini
                sering tertukar dengan cabang-cabang &ldquo;Bogor&rdquo; yang lain.
              </p>
              <div className="mt-8">
                <a
                  className="items-center gap-2 rounded-full bg-secondary text-title_black font-semibold"
                  style={pilKuning}
                  href={waLink(PESAN_WA)}
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

            <div className="p-5 sm:p-6 md:p-8 lg:p-10 bg-secondary rounded-3xl">
              <p className="text-sm uppercase tracking-wide text-title_black">Tiga hal dulu</p>
              <ul className="mt-4 flex flex-col gap-4 text-title_black">
                <li className="flex items-start gap-3">
                  <svg className="w-5.25 h-5.25 shrink-0">
                    <use href="#roundedCheck" />
                  </svg>
                  <span className="flex-1">
                    Alamatnya {CABANG.jalan}, {CABANG.rtRw}, kelurahan {CABANG.kelurahan} &mdash; di koridor{" "}
                    {CABANG.koridor}.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5.25 h-5.25 shrink-0">
                    <use href="#roundedCheck" />
                  </svg>
                  <span className="flex-1">
                    Ini <strong>Kota</strong> Bogor. Cibinong, Cileungsi, Leuwiliang itu Kabupaten Bogor &mdash; beda
                    pemerintahan, beda jarak.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5.25 h-5.25 shrink-0">
                    <use href="#roundedCheck" />
                  </svg>
                  <span className="flex-1">
                    Nama pin di Google Maps tidak menyebut &ldquo;Tajur&rdquo;. Bukan salah tempat; penjelasannya di
                    bawah.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lembar spesifikasi mobil vs motor — angkanya dari tabel referensi situs ini. */}
      <section className="section-spacing-lg-md bg-background" id="mobil-atau-motor">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Mobil atau motor
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Kalau jaminannya mobil, ini yang berubah
            </h2>
            <p className="mt-4 text-paragraph_black">
              Prosesnya sama. Yang beda ada di angka dan di satu dokumen tambahan. Angka di bawah dari tabel referensi
              yang sama dengan{" "}
              <Link className="text-primary font-semibold underline" href="/#tabel-angsuran">
                tabel angsuran
              </Link>{" "}
              di beranda &mdash; gambaran, bukan penawaran. Plafon final ditetapkan Adira setelah unit dilihat.
            </p>
          </div>

          <div className="mt-10 bg-white border border-border rounded-2xl">
            {/* `md:grid` tidak ada di CSS terkompilasi (hanya `md:block`), jadi
                pembungkus yang bertugas menyembunyikan/menampilkan, grid-nya di
                dalam. */}
            <div className="hidden md:block bg-primary text-white" style={sudutAtas}>
              <div className="grid md:grid-cols-3">
                <div className="px-4 py-3 text-sm uppercase tracking-wide">&nbsp;</div>
                <div className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">BPKB motor</div>
                <div className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">BPKB mobil</div>
              </div>
            </div>
            {spesifikasi.map((r) => (
              <div className="grid md:grid-cols-3 border-t border-border" key={r.label}>
                <div className="px-4 py-3 text-paragraph_black">{r.label}</div>
                <div className="px-4 py-3 text-title_black font-semibold">
                  <span className="md:hidden text-paragraph_black font-normal">Motor: </span>
                  {r.motor}
                </div>
                <div className="px-4 py-3 text-title_black font-semibold">
                  <span className="md:hidden text-paragraph_black font-normal">Mobil: </span>
                  {r.mobil}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-paragraph_black">
            Untuk angka yang lebih dekat ke kendaraan Anda sendiri, pakai{" "}
            <Link className="text-primary font-semibold underline" href="/simulasi">
              simulasi angsuran
            </Link>{" "}
            &mdash; ia memakai data kendaraan yang sama dengan yang dipakai Adira.
          </p>
        </div>
      </section>

      {/* Kota, bukan Kabupaten — dipilah menurut wilayah, bukan sekadar diurutkan jarak. */}
      <section className="section-spacing-lg-md" id="kota-bukan-kabupaten">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Bogor yang mana
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Di Kota Bogor cuma ada dua kantor Adira. Ini salah satunya.
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kota Bogor punya {KECAMATAN_KOTA_BOGOR.length} kecamatan &mdash; {KECAMATAN_KOTA_BOGOR.join(", ")}.
              Tajur ada di {CABANG.kecamatan}. Cabang lain yang namanya memakai &ldquo;Bogor&rdquo; hampir semuanya di
              Kabupaten Bogor, dan itu bisa berarti belasan kilometer. Cabang mana yang memproses tetap ditentukan Adira
              Finance; daftar ini supaya Anda tidak salah arah.
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Sekota &mdash; Kota Bogor</p>
              <ul className="mt-3 border-t border-b border-border divide-y">
                <li className="flex items-center justify-between gap-4 py-3">
                  <span className="text-title_black font-semibold">
                    {CABANG.nama}
                    <span className="block text-paragraph_black font-normal">{CABANG.kecamatan}</span>
                  </span>
                  <span className="text-paragraph_black whitespace-nowrap">halaman ini</span>
                </li>
                {DI_KOTA_BOGOR.map((c) => (
                  <li className="flex items-center justify-between gap-4 py-3" key={c.nama}>
                    <span className="text-title_black font-semibold">
                      {c.nama}
                      <span className="block text-paragraph_black font-normal">{c.kecamatan}</span>
                    </span>
                    <span className="text-paragraph_black whitespace-nowrap">{String(c.km).replace(".", ",")} km</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Beda wilayah &mdash; Kabupaten Bogor</p>
              <ul className="mt-3 border-t border-b border-border divide-y">
                {DI_KABUPATEN_BOGOR.map((c) => (
                  <li className="flex items-center justify-between gap-4 py-3" key={c.nama}>
                    <span className="text-title_black font-semibold">
                      {c.nama}
                      <span className="block text-paragraph_black font-normal">{c.kecamatan}</span>
                    </span>
                    <span className="text-paragraph_black whitespace-nowrap">{String(c.km).replace(".", ",")} km</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-paragraph_black">
                Ke arah Sukabumi lewat koridor yang sama: {ARAH_SUKABUMI.nama}, {ARAH_SUKABUMI.wilayah},{" "}
                {String(ARAH_SUKABUMI.km).replace(".", ",")} km.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-paragraph_black">
            Jarak lurus di peta dari {CABANG.jalan}; jarak tempuh di jalan lebih panjang.
          </p>
        </div>
      </section>

      {/* Nama pin yang berbeda, kontak mendatar, peta. */}
      <section className="section-spacing-lg-md bg-background" id="kontak">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Di peta
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Nama pinnya bukan &ldquo;Tajur&rdquo;
            </h2>
            <p className="mt-4 text-paragraph_black">
              Titik di koordinat kantor ini terdaftar di Google Maps dengan nama{" "}
              <strong className="text-title_black">&ldquo;{CABANG.namaMaps}&rdquo;</strong>. Kami tampilkan apa
              adanya, dan tidak menebak arti &ldquo;bogor 1&rdquo; atau &ldquo;marketing&rdquo;. Alamat, koordinat, dan
              nomor cabangnya tetap yang tertulis di halaman ini.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Telepon cabang</p>
              {CABANG.telepon.map((n) => (
                <a className="block text-title_black text-xl font-semibold" href={`tel:${n.replace(/-/g, "")}`} key={n}>
                  {n}
                </a>
              ))}
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Faks</p>
              <p className="text-title_black text-xl font-semibold">{CABANG.fax}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Kode pos</p>
              <p className="text-title_black text-xl font-semibold">{CABANG.kodePos}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Koordinat</p>
              <p className="text-title_black text-xl font-semibold">
                {CABANG.lintang}, {CABANG.bujur}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-paragraph_black">
            Nomor-nomor di atas milik kantor cabang. WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen &mdash;
            bukan nomor cabang.
          </p>

          <div className="mt-8 max-w-200">
            <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.nama} tautanPeta={PETA_URL} />
          </div>
        </div>
      </section>

      {/* Proses ringkas — satu paragraf, tiga poin, tautan ke alur nasional. */}
      <section className="section-spacing-lg-md" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB lewat cabang Tajur
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Mulai dari WhatsApp, datang ke Tajur sekali
            </h2>
            <p className="mt-4 text-paragraph_black">
              Kirim foto BPKB, STNK, dan eKTP ke kami, dan tulis &ldquo;Tajur Bogor&rdquo; di pesan pertama. Dari foto
              itu kami periksa dulu kelayakannya. Kalau lolos, survei kendaraan dijadwalkan &mdash; untuk mobil, siapkan
              NPWP-nya sejak sekarang. Anda baru perlu ke {CABANG.jalan} di tahap akhir: tanda tangan dan serah terima
              BPKB, lalu dana cair. Kendaraan tetap Anda pakai.
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-paragraph_black">
              <li>
                Berkas lengkapnya ada di{" "}
                <Link className="text-primary font-semibold underline" href="/#persyaratan">
                  daftar persyaratan
                </Link>
                .
              </li>
              <li>
                Urutan resminya di{" "}
                <Link className="text-primary font-semibold underline" href="/#alur">
                  alur pengajuan
                </Link>
                .
              </li>
              <li>
                Perkiraan angkanya di{" "}
                <Link className="text-primary font-semibold underline" href="/simulasi">
                  simulasi angsuran
                </Link>
                .
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Penutup: kotak berbingkai di atas putih. */}
      <section className="py-14 md:py-20" id="ajukan">
        <div className="container">
          <div className="p-5 sm:p-6 md:p-8 lg:p-10 border-2 border-secondary rounded-3xl max-w-200">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
              Kirim fotonya, sebut &ldquo;Tajur Bogor&rdquo;
            </h2>
            <p className="mt-4 text-paragraph_black">{PERNYATAAN_OJK}</p>
            <p className="mt-4 text-sm text-paragraph_black">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-title_black">{AGEN.id}</strong>. Nomor kantor cabang ada di bagian{" "}
              <a className="text-primary font-semibold underline" href="#kontak">
                di peta
              </a>
              .
            </p>
            <div className="mt-8">
              <a className="button-primary" href={waLink(PESAN_WA)} target="_blank" rel="noopener noreferrer">
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
