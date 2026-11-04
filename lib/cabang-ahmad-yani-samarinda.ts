/**
 * Data cabang Adira Finance Ahmad Yani – Samarinda.
 *
 * Diverifikasi 2026-11-04. Baris dataset (`branch_id=115`) SEHAT.
 *
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`): "Adira
 *   Finance", "Jl. Jenderal Ahmad Yani I No.3 A - 3 B, Temindung Permai, Kec.
 *   Sungai Pinang, Kota Samarinda, Kalimantan Timur 75117", 54 ulasan.
 * - Titik LISTING (tautan "@"): -0,4787933 / 117,1551782. Koordinat dataset =
 *   pusat embed (SKILL.md §8).
 * - Telepon 0541-742734 / 742689 / 742698, faks 0541-738607: unik di dataset,
 *   kode area Samarinda; satu sumber terbaca langsung — Google Sites "Adira
 *   Cabang Samarinda-Ahmad Yani" (tanpa tanggal): "Jl. Ahmad Yani No. 3A-B …
 *   Telp: 0541-742734, 0541-742689, 0541-742698 … Fax: 0541-738607".
 *
 * Nama jalan: alamat "Jl. Jenderal Ahmad Yani I"; OSM mencatat dua jalur di
 * dekat kantor, "Jalan Ahmad Yani" (13 m) dan "Jalan Ahmad Yani 1" (58 m);
 * Google memberi label "Jl. Poros Samarinda - Bontang". Arah panah Google dan
 * tag oneway OSM tidak saling cocok — arah lalu lintas TIDAK ditulis.
 *
 * Temindung (id.wikipedia "Bandar Udara Temindung", dibaca): beroperasi "mulai
 * 24 Juli 1974 hingga resmi ditutup pada 23 Mei 2018", digantikan Bandara
 * Internasional Samarinda / APT Pranoto ("beroperasi pada 24 Mei 2018"). OSM:
 * "Temindung Creative Hub (Terminal Lama Temindung Airport)" 0,42 km tenggara —
 * penggunaan terminal lama dinyatakan nama OSM itu, bukan Wikipedia.
 */

export const CABANG = {
  nama: "Adira Finance Ahmad Yani",
  namaDataset: "Adira Finance Ahmad Yani - Samarinda",
  namaMaps: "Adira Finance",
  jalan: "Jl. Jenderal Ahmad Yani I No. 3A-3B",
  kelurahan: "Temindung Permai",
  kecamatan: "Sungai Pinang",
  kota: "Kota Samarinda",
  provinsi: "Kalimantan Timur",
  kodePos: "75117",
  telepon: ["0541-742734", "0541-742689", "0541-742698"],
  fax: "0541-738607",
  slug: "adira-finance-ahmad-yani-samarinda",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

export const GARIS_WAKTU: readonly { waktu: string; isi: string }[] = [
  { waktu: "24 Juli 1974", isi: "Bandara Temindung mulai beroperasi di tengah kota Samarinda." },
  { waktu: "23 Mei 2018", isi: "Bandara Temindung resmi ditutup." },
  {
    waktu: "24 Mei 2018",
    isi: "Bandara APT Pranoto (Bandara Internasional Samarinda) beroperasi — sekitar 16 km di timur laut kantor ini.",
  },
  {
    waktu: "Sekarang",
    isi: "Gedung terminal lamanya tercatat sebagai Temindung Creative Hub, sekitar 400 meter di tenggara kantor Adira.",
  },
];

/** Jarak lurus dari titik listing; OSM/Nominatim. */
export const PATOKAN: readonly { nama: string; km: number; arah: string }[] = [
  { nama: "Temindung Creative Hub (terminal lama Bandara Temindung)", km: 0.42, arah: "tenggara" },
  { nama: "Pasar Segiri", km: 0.75, arah: "barat daya" },
  { nama: "Mall Lembuswana", km: 0.98, arah: "barat laut" },
  { nama: "Islamic Center Samarinda", km: 4.73, arah: "barat daya" },
  { nama: "Big Mall Samarinda", km: 6.86, arah: "barat daya" },
  { nama: "Bandara APT Pranoto", km: 15.9, arah: "timur laut" },
];

/** Kantor Adira lain di Kalimantan Timur pada data kami; jarak kira-kira ke titik peta. */
export const KALTIM: readonly { nama: string; wilayah: string; km: number }[] = [
  { nama: "Adira Finance Tenggarong", wilayah: "Kutai Kartanegara", km: 18 },
  { nama: "Adira Finance Handil", wilayah: "Muara Jawa, Kutai Kartanegara", km: 41 },
  { nama: "Adira Finance Jendral Sudirman", wilayah: "Kota Balikpapan", km: 95 },
  { nama: "Adira Finance Sangatta", wilayah: "Kutai Timur", km: 117 },
  { nama: "Adira Finance Melak", wilayah: "Kutai Barat", km: 152 },
];

/** Kantor "Ahmad Yani" lain di data kami (nama kota saja). */
export const AHMAD_YANI_LAIN = [
  "Banjarmasin",
  "Martapura",
  "Sampit",
  "Manado",
  "Kendari",
  "Bulukumba",
  "Dumai",
  "Langsa",
  "Tebing Tinggi",
  "Serang",
  "Cilegon",
  "Magelang",
  "Purwodadi",
  "Kepanjen",
] as const;

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Adira Finance, Jl. Jenderal Ahmad Yani I No.3, Temindung Permai, Samarinda");

/** Dari `gmaps_link` — listing terverifikasi benar. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6790025658674!2d117.15263507503175!3d-0.4788126352767904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67f4596c606b5%3A0xf15837ed7e8ea4f8!2sAdira%20Finance!5e0!3m2!1sid!2sid!4v1713351253346!5m2!1sid!2sid";
