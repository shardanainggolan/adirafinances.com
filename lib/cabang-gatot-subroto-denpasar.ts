/**
 * Data cabang Adira Finance Gatot Subroto – Denpasar.
 *
 * Diverifikasi 2026-11-03. Baris dataset (`branch_id=150`) SEHAT.
 *
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`): "PT Adira
 *   Dinamika Multi Finance - Denpasar 2", "Jl. Gatot Subroto Barat No.101,
 *   Ubung, Kec. Denpasar Utara, Kota Denpasar, Bali 80237", 56 ulasan.
 * - Titik LISTING (tautan "@"): -8,637541 / 115,1993151; Jl. Gatot Subroto
 *   Barat 22 m di selatannya (geometri OSM). Koordinat dataset = pusat embed,
 *   tidak dipakai (SKILL.md §8).
 * - Telepon 0361-428811, faks 0361-421132: unik di dataset, dan dua direktori
 *   independen DIBACA langsung — alamatelpon.com (24 Feb 2019, "Adira Denpasar
 *   Car - Gatot Subroto, Jl. Gatot Subroto Barat No 101 X … 0361-428811 | Fax :
 *   0361-421132") dan nomortelponinfo.blogspot.com (26 Jan 2019, "PT Adira
 *   Dinamika Multi Finance - Denpasar 2 … (0361) 428811").
 * - Hasil pencarian menyebut satu daftar lama yang menaruh nomor yang sama di
 *   "Gatot Subroto Timur No. 777X, Tonja" — tidak terbaca langsung; tidak
 *   dipakai selain sebagai alasan memperingatkan soal ruas Timur.
 *
 * Nama jalan (OSM, ways dalam 7 km): 70 nama berbeda memuat "Gatot Subroto";
 * 66 di antaranya bukan ruas utama (gang bernomor: I, IA, VI K, 1/XII, 6/A …).
 * Ruas utama relatif ke kantor (komponen timur–barat): Barat −0,28 s/d +0,90 km;
 * Tengah +1,17 s/d +2,59 km; Timur +4,62 s/d +5,96 km.
 *
 * Kantor Adira lain di Kota Denpasar: Dewata Square (branch_id 149; listing
 * "Adira Dps 1"; titik "@" 4,3 km ke tenggara). Direktori 2019 (alamatelpon)
 * juga mencatat "Adira Denpasar 3 Car - Mahendradatta" dan "Kios Adira Denpasar
 * - Kesiman" — tidak ada di data kami, status sekarang tidak diketahui.
 */

export const CABANG = {
  nama: "Adira Finance Gatot Subroto",
  namaDataset: "Adira Finance Gatot Subroto - Denpasar",
  namaMaps: "PT Adira Dinamika Multi Finance - Denpasar 2",
  jalan: "Jl. Gatot Subroto Barat No. 101 X",
  kelurahan: "Ubung",
  kecamatan: "Denpasar Utara",
  kota: "Kota Denpasar",
  provinsi: "Bali",
  kodePos: "80237",
  telepon: "0361-428811",
  fax: "0361-421132",
  slug: "adira-finance-gatot-subroto-denpasar",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Tiga ruas utama, barat → timur; km = komponen timur–barat dari kantor. */
export const RUAS: readonly { nama: string; dari: number; sampai: number; kantor?: true }[] = [
  { nama: "Gatot Subroto Barat", dari: -0.3, sampai: 0.9, kantor: true },
  { nama: "Gatot Subroto Tengah", dari: 1.2, sampai: 2.6 },
  { nama: "Gatot Subroto Timur", dari: 4.6, sampai: 6.0 },
];

export const CONTOH_GANG = ["Gatot Subroto I", "Gatot Subroto IA", "Gatot Subroto IV", "Gatot Subroto VI K", "Gatot Subroto 1/XII", "Gatot Subroto 6/A"] as const;
export const JUMLAH_GANG = 66;

/** Sebutan kantor Adira di Denpasar menurut sumber — apa adanya, tidak ditafsirkan. */
export const SEBUTAN: readonly { kantor: string; alamat: string; sebutan: string; status: string }[] = [
  {
    kantor: "Gatot Subroto (halaman ini)",
    alamat: "Jl. Gatot Subroto Barat No. 101 X, Ubung",
    sebutan: "“Denpasar 2” (Google Maps), “Denpasar Car” (direktori 2019)",
    status: "Ada di data kami",
  },
  {
    kantor: "Dewata Square",
    alamat: "Komp. Dewata Square, Jl. Letda Tantular No. 1",
    sebutan: "“Dps 1” (Google Maps), “Denpasar 1” (direktori 2019)",
    status: "Ada di data kami — 4,3 km ke tenggara",
  },
  {
    kantor: "Mahendradatta",
    alamat: "Komp. Mahendradatta Square, Jl. Mahendradatta Selatan No. 25K",
    sebutan: "“Denpasar 3 Car” (direktori 2019)",
    status: "Hanya di direktori 2019",
  },
  {
    kantor: "Kesiman",
    alamat: "Jl. W.R. Supratman",
    sebutan: "“Kios Adira Denpasar - Kesiman” (direktori 2019)",
    status: "Hanya di direktori 2019",
  },
];

/** Jarak lurus dari titik listing; OSM/Nominatim. */
export const PATOKAN: readonly { nama: string; km: number; arah: string }[] = [
  { nama: "Pasar Pondok Indah", km: 0.47, arah: "selatan" },
  { nama: "Terminal bus Sehati (ke Gilimanuk)", km: 0.72, arah: "tenggara" },
  { nama: "Terminal Ubung", km: 0.77, arah: "timur" },
  { nama: "RSU Manuaba", km: 1.39, arah: "tenggara" },
  { nama: "Lapangan Puputan Badung", km: 2.97, arah: "tenggara" },
  { nama: "Bandara I Gusti Ngurah Rai", km: 12.0, arah: "selatan" },
];

/** Kantor Adira di Bali luar Denpasar — jarak kira-kira ke titik peta di data kami. */
export const BALI_LAIN: readonly { nama: string; wilayah: string; km: number }[] = [
  { nama: "Adira Finance Tabanan", wilayah: "Kabupaten Tabanan", km: 13 },
  { nama: "Adira Finance Darma Giri", wilayah: "Kabupaten Gianyar", km: 17 },
  { nama: "Adira Finance Karangasem", wilayah: "Kabupaten Karangasem", km: 49 },
  { nama: "Adira Finance Udayana", wilayah: "Singaraja, Buleleng", km: 59 },
];

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("PT Adira Dinamika Multi Finance - Denpasar 2, Jl. Gatot Subroto Barat No.101, Ubung");

/** Dari `gmaps_link` — listing terverifikasi benar. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.5666191874425!2d115.1967348095028!3d-8.637535687786078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23f9d0ece6299%3A0xc307f10a5d5c8aa7!2sPT%20Adira%20Dinamika%20Multi%20Finance%20-%20Denpasar%202!5e0!3m2!1sid!2sid!4v1713406810138!5m2!1sid!2sid";
