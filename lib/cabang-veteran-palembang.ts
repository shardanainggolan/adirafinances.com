/**
 * Data cabang Adira Finance Veteran – Palembang.
 *
 * Diverifikasi 2026-11-05. Baris dataset (`branch_id=108`): alamat benar,
 * KOORDINAT rusak, telepon belum punya sumber independen.
 *
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`): "Adira
 *   Dinamika Multi Finance. PT Tbk - Palembang 1", "Ruko Rajawali, Jl.
 *   Veteran, 9 Ilir, Kec. Ilir Tim. II, Kota Palembang, Sumatera Selatan
 *   30114", 62 ulasan. Titik "@": -2,9755823 / 104,7654363 (embed zoom 8;
 *   Nominatim: Jalan Perintis Kemerdekaan, Ilir Timur II).
 * - Koordinat DATASET (-2,955583 / 102,3079852): lintangnya identik dengan
 *   titik listing Adira Basuki Rahmat (branch_id 107), bujurnya ±270 km ke
 *   barat. Tidak dipakai.
 * - Listing Basuki Rahmat JUGA bernama "… Cab. Palembang 1" ("PT. Adira
 *   Dinamika Multi Finance, tbk Cab. Palembang 1", Jl. Jend. Basuki Rachmat
 *   No.1779 A-D, Talang Aman, Kemuning, 182 ulasan; "@" -2,955583/104,74695).
 *   Dua listing berlabel "Palembang 1", 3,0 km terpisah.
 * - Telepon 0711-310511, faks 0711-310512: unik di dataset, kode Palembang.
 *   Semua halaman yang muncul di pencarian situs agen/agregator yang menyalin
 *   data yang sama — TIDAK ada sumber independen yang terbaca. Kolom telp2
 *   dataset berisi nomor HP 0812-7130584 — TIDAK dipakai.
 *
 * Jalan (OSM, 2026-11-05): ±300 m ruas tepat di depan titik kantor tercatat
 * "Jalan Perintis Kemerdekaan" (38 m), diapit dua ruas "Jalan Veteran"; di
 * ujung barat ruas itu ada simpul dengan "Jalan Rajawali" (127 m) — cocok
 * dengan "Kompleks/Ruko Rajawali" di alamat. Penamaan OSM bisa beda dengan
 * papan jalan; halaman menyebutnya sebagai catatan peta.
 */

export const CABANG = {
  nama: "Adira Finance Veteran",
  namaDataset: "Adira Finance Veteran - Palembang",
  namaMaps: "Adira Dinamika Multi Finance. PT Tbk - Palembang 1",
  kompleks: "Ruko/Kompleks Rajawali",
  jalan: "Jl. Veteran No. 993",
  kelurahan: "9 Ilir",
  kecamatan: "Ilir Timur II",
  kota: "Kota Palembang",
  provinsi: "Sumatera Selatan",
  kodePos: "30114",
  telepon: "0711-310511",
  fax: "0711-310512",
  slug: "adira-finance-veteran-palembang",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

export const BASUKI_RAHMAT = {
  namaMaps: "PT. Adira Dinamika Multi Finance, tbk Cab. Palembang 1",
  alamat: "Jl. Jend. Basuki Rachmat No. 1779 A-D, Talang Aman, Kemuning",
  km: 3.0,
} as const;

/** Jarak lurus dari titik listing; OSM/Nominatim. */
export const PATOKAN: readonly { nama: string; km: number; arah: string }[] = [
  { nama: "Gereja & SD Maranatha", km: 0.22, arah: "timur" },
  { nama: "STMIK-STIE Multi Data Palembang", km: 0.26, arah: "barat laut" },
  { nama: "Masjid Agung Palembang", km: 1.49, arah: "selatan" },
  { nama: "Pasar 16 Ilir", km: 1.54, arah: "selatan" },
  { nama: "Palembang Indah Mall", km: 1.68, arah: "barat daya" },
  { nama: "Jembatan Ampera", km: 1.84, arah: "selatan" },
  { nama: "Benteng Kuto Besak", km: 1.94, arah: "selatan" },
];

/**
 * Dari `gmaps_link`, dengan rentang (!1d) dan pusat (!2d/!3d) diganti ke titik
 * listing: embed aslinya ber-zoom 8 dan menampilkan satu provinsi. ID tempat
 * (!1s) tidak diubah — render 2026-11-05 menampilkan kartu listing yang sama.
 */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966!2d104.7654363!3d-2.9755823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b760d3548fa41%3A0xde707b6440eb6f2b!2sAdira%20Dinamika%20Multi%20Finance.%20PT%20Tbk%20-%20Palembang%201!5e0!3m2!1sid!2sid!4v1713349574859!5m2!1sid!2sid";

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Ruko Rajawali, Jl. Veteran, 9 Ilir, Palembang");
