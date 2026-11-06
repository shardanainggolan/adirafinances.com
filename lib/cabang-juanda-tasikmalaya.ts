/**
 * Data cabang Adira Finance Juanda – Tasikmalaya.
 *
 * Diverifikasi 2026-11-06. Baris dataset (`branch_id=41`): telepon & alamat
 * jalan benar, KODE WILAYAH salah.
 *
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`): "Adira
 *   Dinamika Multi Finance, Tbk. PT", "JL Insinyur Haji Djuanda, No. 18,
 *   Cilembang, Cihideung, Komplek Ruko TFT, Sukamulya, Kec. Bungursari, Kota
 *   Tasikmalaya, Jawa Barat 46123", 69 ulasan. Titik "@": -7,3411492 /
 *   108,1968978 (koordinat dataset = pusat embed, SKILL.md §8).
 * - Dataset: district 3206 (KABUPATEN Tasikmalaya), sub_district 3206010 =
 *   CIPATUJAH (pesisir selatan kabupaten) — keliru; teks alamatnya pun menulis
 *   "Kab. Tasikmalaya". Listing menulis KOTA Tasikmalaya; Cihideung dan
 *   Bungursari ada di daftar kecamatan Kota Tasikmalaya (sub_districts 3278).
 * - Nominatim di titik "@": "Linggajaya, Mangkubumi" — kecamatan ketiga. OSM
 *   memuat Pasar Induk Cikurubuk di kelurahan yang sama. Batas tidak diuji;
 *   halaman menyebut ketiganya tanpa memilih.
 * - Telepon 0265-327525: dua direktori dibaca langsung (Google Sites "Adira
 *   cabang TASIKMALAYA-Juanda", alamatpenting.com) — keduanya tanpa tanggal.
 *   Faks 0265-327528 (keduanya), 0265-313358 (Google Sites saja). Nomor ini
 *   juga tersalin ke baris Adira Cikuray – Garut (branch_id 42).
 * - Nama kompleks: listing "Ruko TFT"; kedua direktori "Ruko TST".
 *
 * Bundaran: OSM mencatat bundaran (junction=roundabout, nama "Jalan Letnan
 * Jenderal Haji Mashudi") ±208 m di selatan titik kantor; Google memberi label
 * "Bunderan Bypass Mangkubumi" dan menamai jalan ke utaranya Jl. Ir. H. Juanda.
 * Titik kantor di sisi barat jalan itu (peta Google).
 */

export const CABANG = {
  nama: "Adira Finance Juanda",
  namaDataset: "Adira Finance Juanda - Tasikmalaya",
  namaMaps: "Adira Dinamika Multi Finance, Tbk. PT",
  kompleks: "Komplek Ruko TFT",
  jalan: "Jl. Ir. H. Juanda No. 18",
  kota: "Kota Tasikmalaya",
  provinsi: "Jawa Barat",
  kodePos: "46123",
  telepon: "0265-327525",
  fax: "0265-327528",
  slug: "adira-finance-juanda-tasikmalaya",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

export const TIGA_KECAMATAN: readonly { kecamatan: string; kelurahan: string; sumber: string }[] = [
  { kecamatan: "Cihideung", kelurahan: "Cilembang", sumber: "ditulis di alamat resmi" },
  { kecamatan: "Bungursari", kelurahan: "Sukamulya", sumber: "ditulis di alamat resmi" },
  { kecamatan: "Mangkubumi", kelurahan: "Linggajaya", sumber: "tempat titik kantor menurut OpenStreetMap" },
];

/** Jarak lurus dari titik listing; OSM/Nominatim. */
export const PATOKAN: readonly { nama: string; km: number; arah: string }[] = [
  { nama: "Bunderan Bypass Mangkubumi", km: 0.21, arah: "selatan" },
  { nama: "Pasar Induk Cikurubuk", km: 0.75, arah: "timur" },
  { nama: "Asia Plaza", km: 2.25, arah: "timur" },
  { nama: "Masjid Agung Tasikmalaya", km: 3.05, arah: "timur laut" },
  { nama: "Stasiun Tasikmalaya", km: 3.65, arah: "timur laut" },
  { nama: "Terminal Tipe A Indihiang", km: 5.55, arah: "utara" },
];

/** Kantor Adira bernama "Tasikmalaya" di data kami; pin keduanya jatuh di jalan sesuai alamat. */
export const TASIK_LAIN: readonly { nama: string; wilayah: string; km: number; arah: string }[] = [
  { nama: "Adira Finance Singaparna", wilayah: "Kabupaten Tasikmalaya", km: 7.1, arah: "barat" },
  { nama: "Adira Finance Karang Nunggal", wilayah: "Kabupaten Tasikmalaya", km: 33.7, arah: "selatan" },
];

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Adira Dinamika Multi Finance, Jl. Ir. H. Juanda No. 18, Tasikmalaya");

/** Dari `gmaps_link` — listing terverifikasi benar. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.1135492189896!2d108.19431750948004!3d-7.341143872180047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f50d02e66bce3%3A0xbb45123e26da7e6e!2sAdira%20Dinamika%20Multi%20Finance%2C%20Tbk.%20PT!5e0!3m2!1sid!2sid!4v1713323544980!5m2!1sid!2sid";
