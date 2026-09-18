/**
 * Data cabang Adira Finance Tebet – Jakarta Selatan.
 *
 * Seluruh nilai berasal dari dataset milik pemilik
 * (`public/analisis/adira-branches-full.csv`, `branch_id=1`) dan tabel wilayah
 * berkode BPS. Baris yang diberikan pemilik pada 2026-09-18 cocok seluruhnya
 * dengan dataset. (Kolom `description` di baris itu lagi-lagi berbunyi
 * "Pasar Baru - Tangerang" — sisa salin-tempel di database, sama seperti pada
 * baris Tajur. Tidak dipakai di sini.)
 *
 * Nama pin di Google Maps, verbatim dari `gmaps_link`: "Adira Finance" —
 * tanpa kata "Tebet", tanpa pembeda apa pun. Itulah alasan halaman ini
 * disusun sebagai verifikasi: di DKI Jakarta ada enam kantor Adira di data
 * kami, dan pin-nya tidak memberi tahu yang mana.
 *
 * Belum terverifikasi, karena itu belum ditulis: jam operasional, status aktif
 * nomor telepon/faks, foto cabang, patokan jalan di lapangan.
 */

export const CABANG = {
  nama: "Adira Finance Tebet",
  namaDataset: "Adira Finance Tebet - Jakarta Selatan",
  /** Nama pin di Google Maps, verbatim dari `gmaps_link`. Sengaja generik. */
  namaMaps: "Adira Finance",
  jalan: "Jl. KH Abdullah Syafei No. 50",
  blok: "Blok A-C",
  rtRw: "RT.12/RW.09",
  kelurahan: "Bukit Duri",
  kecamatan: "Tebet",
  kota: "Kota Jakarta Selatan",
  provinsi: "DKI Jakarta",
  kodePos: "12780",
  /** Nomor kantor cabang — bukan nomor agen. */
  telepon: ["021-7902829", "021-79187576"],
  fax: "021-79191878",
  lintang: -6.2249114,
  bujur: 106.8564082,
  slug: "adira-finance-tebet",
} as const;

/** Sepuluh kecamatan Kota Jakarta Selatan — `sub_districts.csv`, district_id 3171. Administratif, bukan teritori Adira. */
export const KECAMATAN_JAKSEL = [
  "Jagakarsa",
  "Pasar Minggu",
  "Cilandak",
  "Pesanggrahan",
  "Kebayoran Lama",
  "Kebayoran Baru",
  "Mampang Prapatan",
  "Pancoran",
  "Tebet",
  "Setia Budi",
] as const;

/**
 * Enam kantor Adira di DKI Jakarta menurut dataset (province_id 31), diurut
 * jarak lurus dari titik Tebet. Inilah yang dipakai untuk membedakan pin:
 * semua pin-nya bisa tertulis "Adira Finance" saja.
 */
export const DKI_JAKARTA = [
  { nama: "Adira Finance Tebet", kota: "Jakarta Selatan", kecamatan: "Tebet", km: 0, iniHalaman: true },
  { nama: "Adira Finance Kelapa Gading", kota: "Jakarta Utara", kecamatan: "Kelapa Gading", km: 7.8, iniHalaman: false },
  { nama: "Adira Finance Ketapang", kota: "Jakarta Pusat", kecamatan: "Gambir", km: 8.6, iniHalaman: false },
  { nama: "Adira Finance Pondok Indah Baru", kota: "Jakarta Selatan", kecamatan: "Kebayoran Baru", km: 9.0, iniHalaman: false },
  { nama: "Adira Finance Latumenten", kota: "Jakarta Barat", kecamatan: "Tambora", km: 10.5, iniHalaman: false },
  { nama: "Adira Finance Daan Mogot", kota: "Jakarta Barat", kecamatan: "Kalideres", km: 18.1, iniHalaman: false },
] as const;

/**
 * Catatan data yang sengaja TIDAK disembunyikan dari pembaca.
 *
 * Entri "Adira Finance Sentra Cikarang" menyimpan koordinat
 * (-6,2363828 / 106,8115813) yang jatuh 5,1 km dari Tebet — di dalam Jakarta.
 * Padahal nama, alamat (Jl. Raya Cibarusah), dan kecamatannya
 * (Cikarang Selatan, Kabupaten Bekasi) menunjuk Cikarang, dan titik itu
 * berjarak 19 km dari cabang Cikarang lain yang sekecamatan dengannya.
 * Koordinatnya salah, jadi entri ini tidak masuk daftar mana pun di halaman.
 * Anomali yang sama sudah dicatat saat halaman Ciputat dibuat.
 */
export const ANOMALI_CIKARANG = {
  nama: "Adira Finance Sentra Cikarang",
  kmSemuTebet: 5.1,
  kmKeCikarangLain: 19.0,
} as const;

export const PETA_URL = `https://www.google.com/maps/search/?api=1&query=${CABANG.lintang},${CABANG.bujur}`;

/** Dari kolom `gmaps_link`. Dimuat hanya setelah diklik — lihat `PetaCabang`. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.294006026587!2d106.85640819678954!3d-6.224911399999991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3b9aaaaaaab%3A0x2a0bdbaf66d53a35!2sAdira%20Finance!5e0!3m2!1sid!2sid!4v1713268904572!5m2!1sid!2sid";
