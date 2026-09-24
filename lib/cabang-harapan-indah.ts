/**
 * Data cabang Adira Finance Harapan Indah – Bekasi.
 *
 * Seluruh nilai berasal dari dataset milik pemilik
 * (`public/analisis/adira-branches-full.csv`, `branch_id=14`) dan tabel wilayah
 * berkode BPS. Baris yang diberikan pemilik pada 2026-09-22 cocok seluruhnya
 * dengan dataset, termasuk kolom `description`-nya.
 *
 * Fakta yang jadi tulang punggung halaman: "Harapan Indah" BUKAN nama
 * kecamatan. Kota Bekasi punya dua belas kecamatan dan tidak satu pun bernama
 * Harapan Indah — kantor ini ada di Kecamatan MEDAN SATRIA. "Harapan Indah"
 * adalah nama kawasan dan nama boulevardnya.
 *
 * Nama pin di Google Maps, verbatim dari `gmaps_link`: "Adira Finance" —
 * generik, sama seperti cabang Tebet.
 *
 * Dua nomor telepon, tanpa faks. Apa adanya dari dataset.
 *
 * Belum terverifikasi, karena itu belum ditulis: jam operasional, status aktif
 * nomor telepon, foto cabang, patokan di lapangan.
 */

export const CABANG = {
  nama: "Adira Finance Harapan Indah",
  namaDataset: "Adira Finance Harapan Indah - Bekasi",
  /** Nama pin di Google Maps, verbatim. Generik. */
  namaMaps: "Adira Finance",
  jalan: "Jl. Harapan Indah Boulevard",
  nomor: "No. 3",
  kecamatan: "Medan Satria",
  kota: "Kota Bekasi",
  provinsi: "Jawa Barat",
  kodePos: "17132",
  /** Dua nomor, tanpa faks — memang begitu di dataset. */
  telepon: ["021-88866352", "021-88866355"],
  lintang: -6.1793818,
  bujur: 106.9719175,
  slug: "adira-finance-harapan-indah",
} as const;

/** Alamat satu baris, untuk meta description dan JSON-LD. */
export const ALAMAT_SATU_BARIS = `${CABANG.jalan} ${CABANG.nomor}, ${CABANG.kecamatan}, ${CABANG.kota}, ${CABANG.provinsi} ${CABANG.kodePos}`;

/**
 * Dua belas kecamatan Kota Bekasi — `sub_districts.csv`, district_id 3275.
 * Dipakai untuk menunjukkan bahwa "Harapan Indah" tidak ada di dalamnya.
 */
export const KECAMATAN_KOTA_BEKASI = [
  "Pondok Gede",
  "Jatisampurna",
  "Pondok Melati",
  "Jatiasih",
  "Bantargebang",
  "Mustikajaya",
  "Bekasi Timur",
  "Rawalumbu",
  "Bekasi Selatan",
  "Bekasi Barat",
  "Medan Satria",
  "Bekasi Utara",
] as const;

/**
 * Kantor Adira lain di kawasan Bekasi, jarak lurus dari titik ini.
 *
 * DUA entri Cikarang sengaja tidak ada di sini — lihat `ANOMALI_CIKARANG`.
 */
export const KAWASAN_BEKASI = [
  { nama: "Adira Finance Tambun", kecamatan: "Tambun Selatan", wilayah: "Kabupaten Bekasi", km: 14.5, href: null },
  {
    nama: "Adira Finance Jatirahayu",
    kecamatan: "Pondok Melati",
    wilayah: "Kota Bekasi",
    km: 14.8,
    href: "/adira-finance-pondok-gede",
  },
  { nama: "Adira Finance Bantar Gebang", kecamatan: "Bantargebang", wilayah: "Kota Bekasi", km: 14.9, href: null },
] as const;

/** Dua cabang Jakarta terdekat. Kelapa Gading yang paling dekat dari sini. */
export const ARAH_JAKARTA: readonly { nama: string; wilayah: string; km: number; href: string | null }[] = [
  { nama: "Adira Finance Kelapa Gading", wilayah: "Jakarta Utara", km: 10.0, href: "/adira-finance-kelapa-gading" },
  { nama: "Adira Finance Tebet", wilayah: "Jakarta Selatan", km: 13.7, href: "/adira-finance-tebet" },
];

/**
 * DUA entri Cikarang, bukan satu, koordinatnya keliru.
 *
 * Diperiksa 2026-09-22 dengan uji urutan bujur: Cikarang berada di TIMUR
 * Tambun. Di dataset, Tambun ada di bujur 107,0697 — sementara
 * "Cikarang - Bekasi" di 106,9831 dan "Sentra Cikarang" di 106,8116, keduanya
 * di BARAT Tambun. Mustahil secara geografis. Keduanya juga mengaku kecamatan
 * Cikarang Selatan tetapi berjarak 19 km satu sama lain.
 *
 * Akibatnya di halaman ini nyata: "Cikarang - Bekasi" terbaca hanya 7,8 km
 * dari Harapan Indah dan akan muncul sebagai cabang terdekat kalau daftar
 * diurut mentah. Tidak dipakai. Sebelumnya hanya "Sentra Cikarang" yang
 * tercatat bermasalah (halaman Ciputat, Tebet, Pondok Gede).
 */
export const ANOMALI_CIKARANG = [
  { nama: "Adira Finance Cikarang - Bekasi", kmSemu: 7.8, bujur: 106.9831 },
  { nama: "Adira Finance Sentra Cikarang", kmSemu: 18.8, bujur: 106.8116 },
] as const;

export const BUJUR_TAMBUN = 107.0697;

export const PETA_URL = `https://www.google.com/maps/search/?api=1&query=${CABANG.lintang},${CABANG.bujur}`;

/** Dari kolom `gmaps_link`. Dimuat hanya setelah diklik — lihat `PetaCabang`. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.636533649949!2d106.9719174750807!3d-6.179381760549752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698ba28bf7d2fb%3A0x7f3288cdf70ee212!2sAdira%20Finance!5e0!3m2!1sid!2sid!4v1713276244474!5m2!1sid!2sid";
