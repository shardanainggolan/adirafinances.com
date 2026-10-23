/**
 * Data cabang Adira Finance Tambun – Tambun Selatan, Kabupaten Bekasi.
 *
 * Diverifikasi 2026-10-23. Baris dataset (`branch_id=13`) SEHAT kecuali kode
 * pos:
 *
 * - Telepon 021-8831881, faks 021-88366581: unik di dataset; telepon
 *   dikuatkan direktori (ringkasan hasil pencarian: Foursquare, idalamat,
 *   portal-alamat). Nomor HP di situs agen lain tidak dipakai.
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`): "PT Adira
 *   Dinamika Multi Finance Tambun (Bekasi 2)", "Tambun, Kec. Tambun Sel.,
 *   Kabupaten Bekasi", 404 ulasan. "(Bekasi 2)" ditampilkan apa adanya, tidak
 *   ditafsirkan.
 * - Titik LISTING (pusat embed): -6,2664234 / 107,0722503 → Nominatim:
 *   kawasan Metland, Mekarsari, Tambun Selatan. Koordinat dataset ±285 m di
 *   baratnya. Semua jarak di halaman ini dari titik listing.
 * - Kode pos: dataset dan direktori menulis 17729; Wikipedia (South Tambun):
 *   17510 untuk seluruh Tambun Selatan; Nominatim di titik listing: 17520.
 *   Tiga versi — TIDAK ditampilkan di blok alamat; halaman menjelaskannya.
 *
 * OSM (Overpass/Nominatim, 2026-10-23):
 * - Plaza Metropolitan Tambun 0,07 km (Metland, Mekarsari); halte bus Trans
 *   Wibawa Mukti "Metland Tambun" 0,15 km.
 * - Jalan raya di utara (155 m) bernama "Jalan Hasanuddin" (trunk, ref 1);
 *   Google melabelinya "Jl. Pantura"; alamat resmi "Jl. Sultan Hasanudin".
 *   ±0,8 km ke timur, nama ruas itu berganti menjadi "Jalan Raya Teuku Umar"
 *   — sisi Cibitung: Pasar Induk Cibitung 0,87 km dan RSUD Kabupaten Bekasi
 *   1,21 km (keduanya Gandasari, Cibitung).
 * - Stasiun KRL terdekat: Cibitung 1,38 km (Wanasari, Kec. Cibitung;
 *   Commuter Line Cikarang — id.wikipedia), lebih dekat dari Stasiun Tambun
 *   2,02 km.
 *
 * Kabupaten Bekasi (3216, 23 kecamatan) punya tiga kantor Adira di dataset:
 * Tambun dan dua di Cikarang Selatan — titik peta kedua kantor Cikarang tidak
 * cocok dengan alamatnya (SKILL.md §8), jadi jaraknya tidak ditampilkan.
 *
 * Tidak dipakai: jam operasional, rating.
 */

export const CABANG = {
  nama: "Adira Finance Tambun",
  namaDataset: "Adira Finance Tambun - Bekasi",
  namaMaps: "PT Adira Dinamika Multi Finance Tambun (Bekasi 2)",
  kompleks: "Ruko Permata Metropolitan",
  jalan: "Blok A3 No. 31-33, Jl. Sultan Hasanudin",
  kecamatan: "Tambun Selatan",
  kabupaten: "Kabupaten Bekasi",
  provinsi: "Jawa Barat",
  telepon: "021-8831881",
  fax: "021-88366581",
  slug: "adira-finance-tambun",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/**
 * Jalur barat → timur di sekitar jalan raya. `m` = jarak timur(+)/barat(−)
 * dari kantor dalam meter (hanya komponen timur-barat), `km` = jarak lurus.
 */
export const JALUR: readonly { nama: string; m: number; km: number | null; sisi: "Tambun" | "Cibitung" | "batas"; catatan: string }[] = [
  { nama: "Stasiun Tambun", m: -1808, km: 2.02, sisi: "Tambun", catatan: "KRL — tapi bukan yang terdekat" },
  { nama: "RS Karya Medika II", m: -534, km: 0.58, sisi: "Tambun", catatan: "" },
  { nama: "Kantor Adira Tambun", m: 0, km: null, sisi: "Tambun", catatan: "Ruko Permata Metropolitan" },
  { nama: "Plaza Metropolitan Tambun", m: 66, km: 0.07, sisi: "Tambun", catatan: "kawasan Metland Tambun" },
  { nama: "Nama jalan berganti", m: 805, km: null, sisi: "batas", catatan: "Jl. Hasanuddin → Jl. Raya Teuku Umar" },
  { nama: "Pasar Induk Cibitung", m: 862, km: 0.87, sisi: "Cibitung", catatan: "" },
  { nama: "RSUD Kabupaten Bekasi", m: 1199, km: 1.21, sisi: "Cibitung", catatan: "" },
  { nama: "Stasiun Cibitung", m: 1269, km: 1.38, sisi: "Cibitung", catatan: "KRL terdekat dari kantor" },
];

/** Kantor Adira terdekat, jarak lurus dari titik listing. */
export const TETANGGA: readonly { nama: string; wilayah: string; km: number; href: string | null }[] = [
  { nama: "Adira Finance Bantar Gebang", wilayah: "Jl. Raya Narogong, Kota Bekasi", km: 10.8, href: null },
  { nama: "Adira Finance Harapan Indah", wilayah: "Medan Satria, Kota Bekasi", km: 14.7, href: "/adira-finance-harapan-indah" },
  { nama: "Adira Finance Jatirahayu", wilayah: "Pondok Gede, Kota Bekasi", km: 19.6, href: "/adira-finance-pondok-gede" },
  { nama: "Adira Finance Mall Cileungsi", wilayah: "Kabupaten Bogor", km: 19.9, href: "/adira-finance-mall-cileungsi" },
  { nama: "Adira Finance Kelapa Gading", wilayah: "Jakarta Utara", km: 23.9, href: "/adira-finance-kelapa-gading" },
];

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("PT Adira Dinamika Multi Finance Tambun (Bekasi 2)");

/** Dari `gmaps_link` — listing terverifikasi benar. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9795616143674!2d107.06967537508179!3d-6.266418061347202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698fbeb649770b%3A0xe973cbc52c628461!2sPT%20Adira%20Dinamika%20Multi%20Finance%20Tambun%20(Bekasi%202)!5e0!3m2!1sid!2sid!4v1713276076785!5m2!1sid!2sid";
