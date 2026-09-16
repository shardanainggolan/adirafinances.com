import type { Metadata } from "next";
import Link from "next/link";

import PetaCabang from "@/components/ui/PetaCabang";
import {
  CABANG,
  CABANG_JAKARTA_PUSAT,
  KECAMATAN_KOTA_TANGERANG,
  PETA_EMBED,
  PETA_URL,
  TERDEKAT,
} from "@/lib/cabang-pasar-baru";
import { AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SITE_URL, waLink } from "@/lib/site";

/**
 * Halaman cabang Adira Finance Pasar Baru – Tangerang.
 *
 * Bentuk keempat, dan sengaja tidak meminjam dari tiga sebelumnya:
 * Alam Sutera dipimpin lokasi, Sawangan dipimpin proses, Ciputat dipimpin
 * cara sampai. Halaman ini dipimpin IDENTITAS — karena salah satu kata kunci
 * yang dicari orang adalah nama listing Google Maps-nya persis
 * ("PT. ADIRA FINANCE 0128 PS. BARU"), dan karena "Pasar Baru" lebih dulu
 * dikenal sebagai kawasan di Jakarta Pusat. Orang yang sampai ke sini sedang
 * memastikan: ini kantor yang mana, dan yang mana yang saya maksud.
 *
 * Komponen dan urutannya: hero abu-abu terang dengan pelat identitas
 * berbingkai → dua kolom "yang ini / bukan yang itu" → blok angka jarak →
 * kontak dengan garis aksen + peta → proses dibagi "dari rumah" dan
 * "di cabang" → penutup kuning. `scripts/cek-doorway.mjs` yang memutuskan
 * apakah pemisahan ini nyata; targetnya jauh di bawah ambang 50%.
 *
 * Aturan yang sama untuk semua halaman cabang (SKILL.md §8): boilerplate
 * nasional tidak disalin, hanya ditautkan; nomor WhatsApp agen tidak pernah
 * tampil sebagai nomor cabang; yang belum diverifikasi tidak terbit.
 */

const JUDUL = "Adira Finance Pasar Baru, Tangerang — Alamat & Gadai BPKB";
const DESKRIPSI = `Adira Finance Pasar Baru di ${CABANG.jalan}, ${CABANG.kecamatan}, Kota Tangerang — bukan Pasar Baru Jakarta. Telepon cabang, peta, dan cara gadai BPKB lewat cabang ini.`;

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

const PESAN_WA = "Halo, saya mau gadai BPKB lewat cabang Adira Pasar Baru Tangerang";

/** Tiga cara orang menyebut kantor yang sama. Semuanya menunjuk satu alamat. */
const namaKantor = [
  { sumber: "Di Google Maps", nama: CABANG.namaMaps },
  { sumber: "Di daftar cabang Adira", nama: CABANG.namaDataset },
  { sumber: "Yang biasa orang ketik", nama: "Adira Pasar Baru" },
];

const dariRumah = [
  <>
    Hitung dulu kira-kira dapat berapa lewat{" "}
    <Link className="text-primary font-semibold underline" href="/simulasi">
      simulasi angsuran
    </Link>
    . Angkanya perkiraan; yang final ditetapkan Adira setelah unit dilihat.
  </>,
  <>
    Kirim foto BPKB, STNK, dan eKTP ke WhatsApp kami. Tulis &ldquo;Pasar Baru Tangerang&rdquo; di pesan pertama
    supaya tidak tertukar dengan cabang lain.
  </>,
  <>Kalau dari foto sudah layak, jadwal survei kendaraan diatur. Anda belum perlu ke mana-mana sampai tahap ini.</>,
];

const diCabang = [
  <>
    Bawa berkas sesuai{" "}
    <Link className="text-primary font-semibold underline" href="/#persyaratan">
      daftar persyaratan
    </Link>{" "}
    &mdash; eKTP, KK, bukti penghasilan, bukti tempat tinggal, dan NPWP kalau jaminannya BPKB mobil.
  </>,
  <>Tanda tangan perjanjian dan serah terima BPKB dilakukan di {CABANG.jalan}. Kendaraan tetap Anda pakai.</>,
  <>
    Dana cair setelah itu. Urutan lengkap versi nasionalnya ada di{" "}
    <Link className="text-primary font-semibold underline" href="/#alur">
      alur pengajuan
    </Link>
    .
  </>,
];

export default function PasarBaruPage() {
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
        name: "Gadai BPKB mobil dan motor — cabang Pasar Baru, Tangerang",
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

      {/* Hero abu-abu terang dengan pelat identitas — tiga nama, satu kantor. */}
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
              <li aria-current="page">Pasar Baru, Tangerang</li>
            </ol>
          </nav>

          <p className="mt-8 text-base lg:text-lg font-semibold uppercase text-primary">
            {CABANG.kecamatan}, {CABANG.kota}
          </p>
          <h1 className="mt-3 text-[40px] sm:text-5xl lg:text-6xl leading-tight! font-bold text-title_black max-w-200">
            Adira Finance Pasar Baru, Tangerang
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-175">
            Kantor ini punya tiga nama, tergantung di mana Anda menemukannya. Ketiganya menunjuk ruko yang sama di{" "}
            {CABANG.jalan}, {CABANG.kelurahan}. Kalau salah satunya yang tadi Anda cari, Anda sudah di tempat yang
            benar.
          </p>

          <div className="mt-8 border-2 border-title_black rounded-3xl bg-white p-5 sm:p-6 md:p-8 max-w-200">
            <ul className="divide-y">
              {namaKantor.map((n) => (
                <li className="flex flex-wrap gap-4 py-3" key={n.sumber}>
                  <span className="text-paragraph_black text-sm uppercase tracking-wide w-full md:w-48">{n.sumber}</span>
                  <strong className="text-title_black text-lg font-semibold flex-1">{n.nama}</strong>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-paragraph_black">
              Angka &ldquo;0128&rdquo; ada pada nama listing di Google Maps. Kami menampilkannya apa adanya; artinya
              tidak kami tebak.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              className="button-primary"
              href={waLink(PESAN_WA)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanya Lewat WhatsApp
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </a>
            <a className="text-title_black font-semibold underline hover:text-primary" href="#yang-mana">
              Pasar Baru yang mana?
            </a>
          </div>
        </div>
      </section>

      {/* Dua kolom: yang ini / bukan yang itu. */}
      <section className="section-spacing-lg-md" id="yang-mana">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Dua Pasar Baru
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Yang di Tangerang, bukan yang di Jakarta Pusat
            </h2>
            <p className="mt-4 text-paragraph_black">
              Nama &ldquo;Pasar Baru&rdquo; lebih dulu lekat pada kawasan belanja di Jakarta Pusat. Cabang ini bukan
              di sana. Ini di Tangerang, di jalan yang membelah kelurahan {CABANG.kelurahan}, kecamatan{" "}
              {CABANG.kecamatan}.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="p-5 sm:p-6 md:p-8 border-2 border-secondary rounded-2xl bg-white">
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Yang ini</p>
              <h3 className="mt-2 text-title_black text-xl font-semibold leading-tight">
                Pasar Baru di {CABANG.kota}
              </h3>
              <ul className="mt-4 flex flex-col gap-2 text-paragraph_black">
                <li>
                  {CABANG.jalan}, {CABANG.rtRw}
                </li>
                <li>
                  Kelurahan {CABANG.kelurahan}, Kecamatan {CABANG.kecamatan}
                </li>
                <li>
                  {CABANG.kota}, {CABANG.provinsi} {CABANG.kodePos}
                </li>
              </ul>
            </div>
            <div className="p-5 sm:p-6 md:p-8 border border-border border-dashed rounded-2xl">
              <p className="text-sm uppercase tracking-wide text-paragraph_black">Bukan yang itu</p>
              <h3 className="mt-2 text-title_black text-xl font-semibold leading-tight">Pasar Baru di Jakarta Pusat</h3>
              <p className="mt-4 text-paragraph_black">
                Kalau yang Anda maksud kawasan Pasar Baru di Jakarta Pusat, cabang ini terlalu jauh untuk itu. Di daftar
                kami, kantor Adira yang berada di Jakarta Pusat adalah {CABANG_JAKARTA_PUSAT.nama} di kecamatan{" "}
                {CABANG_JAKARTA_PUSAT.kecamatan} &mdash; {CABANG_JAKARTA_PUSAT.km} km dari sini. Hubungi kami dulu,
                nanti diarahkan ke yang tepat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blok angka: yang paling dekat justru lintas kota. */}
      <section className="section-spacing-lg-md bg-background" id="terdekat">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Kalau bukan yang ini
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Cabang terdekat malah di Tangerang Selatan
            </h2>
            <p className="mt-4 text-paragraph_black">
              {CABANG.kota} punya {KECAMATAN_KOTA_TANGERANG.length} kecamatan, tetapi hanya dua kantor Adira: di sini
              ({CABANG.kecamatan}) dan di Ciledug. Padahal kalau diukur lurus, Alam Sutera di Tangerang Selatan lebih
              dekat dari Ciledug. Cabang mana yang memproses tetap ditentukan Adira Finance; angka di bawah hanya
              untuk membantu Anda memperkirakan.
            </p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {TERDEKAT.map((c) => (
              <li className="p-5 sm:p-6 bg-white border border-border rounded-2xl" key={c.nama}>
                <p className="text-title_black font-bold leading-none md:text-5xl lg:text-6xl text-[40px]">
                  {String(c.km).replace(".", ",")}
                  <span className="text-lg font-semibold"> km</span>
                </p>
                <p className="mt-3 text-title_black font-semibold">
                  {c.href ? (
                    <Link className="underline hover:text-primary" href={c.href}>
                      {c.nama}
                    </Link>
                  ) : (
                    c.nama
                  )}
                </p>
                <p className="text-paragraph_black">{c.wilayah}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-paragraph_black">
            Jarak lurus di peta dari {CABANG.jalan}; jarak tempuh di jalan lebih panjang.
          </p>
        </div>
      </section>

      {/* Kontak dengan garis aksen, plus peta atas permintaan. */}
      <section className="section-spacing-lg-md" id="kontak">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
                Kontak
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
                Satu telepon, dua faks
              </h2>
              <p className="mt-4 text-paragraph_black">
                Begitu tercatat di data cabang, dan memang begitu kami tampilkan. Nomor-nomor ini milik kantor cabang.
                WhatsApp {AGEN.waTampilan} adalah nomor kami sebagai agen &mdash; bukan nomor cabang.
              </p>

              <div className="mt-8 border-l-2 border-primary pl-5 flex flex-col gap-4">
                <div>
                  <p className="text-sm uppercase tracking-wide text-paragraph_black">Telepon cabang</p>
                  <a
                    className="text-title_black text-2xl font-semibold"
                    href={`tel:${CABANG.telepon.replace(/-/g, "")}`}
                  >
                    {CABANG.telepon}
                  </a>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-paragraph_black">Faks</p>
                  <p className="text-title_black font-semibold">{CABANG.fax.join(" · ")}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-paragraph_black">Koordinat</p>
                  <p className="text-title_black font-semibold">
                    {CABANG.lintang}, {CABANG.bujur}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <PetaCabang embedUrl={PETA_EMBED} judul={CABANG.nama} tautanPeta={PETA_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* Proses dibagi dua: apa yang selesai dari rumah, apa yang harus di cabang. */}
      <section className="section-spacing-lg-md bg-background" id="gadai-bpkb">
        <div className="container">
          <div className="max-w-175">
            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase block">
              Gadai BPKB lewat cabang ini
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-title_black leading-tight">
              Sebagian besar selesai dari rumah. Sisanya di Jl. Moh. Toha.
            </h2>
            <p className="mt-4 text-paragraph_black">
              Anda cukup datang satu kali, di tahap akhir. Sebelum itu semuanya lewat WhatsApp.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Dari rumah</h3>
              <ol className="mt-4 flex flex-col gap-3 text-paragraph_black">
                {dariRumah.map((isi, i) => (
                  <li className="flex items-start gap-3" key={i}>
                    <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                    <span className="flex-1">{isi}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="p-5 sm:p-6 md:p-8 bg-white border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Di cabang</h3>
              <ol className="mt-4 flex flex-col gap-3 text-paragraph_black">
                {diCabang.map((isi, i) => (
                  <li className="flex items-start gap-3" key={i}>
                    <span className="text-primary font-bold shrink-0">{i + 4}.</span>
                    <span className="flex-1">{isi}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Penutup kuning — belum dipakai halaman cabang mana pun sebagai penutup. */}
      <section className="py-14 md:py-20 bg-secondary" id="ajukan">
        <div className="container">
          <div className="max-w-200">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-title_black">
              Kirim foto BPKB-nya dulu, sisanya kami bantu
            </h2>
            <p className="mt-4 text-paragraph_black">
              Sebutkan &ldquo;Pasar Baru Tangerang&rdquo; dan kecamatan Anda. {PERNYATAAN_OJK}
            </p>
            <p className="mt-4 text-sm text-paragraph_black">
              {DISCLOSURE_AGEN} Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> &middot; ID AXI:{" "}
              <strong className="text-title_black">{AGEN.id}</strong>. Nomor kantor cabang ada di bagian{" "}
              <a className="text-title_black font-semibold underline" href="#kontak">
                kontak
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
