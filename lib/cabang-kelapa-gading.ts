/**
 * Data cabang Adira Finance Kelapa Gading – Jakarta Utara.
 *
 * Seluruh nilai berasal dari dataset milik pemilik
 * (`public/analisis/adira-branches-full.csv`, `branch_id=159`) dan tabel
 * wilayah berkode BPS. Baris yang diberikan pemilik pada 2026-09-24 cocok
 * seluruhnya dengan dataset.
 *
 * NOMOR TELEPON DAN FAKS KOSONG di dataset — keenam kolomnya. Itu bukan
 * kelalaian halaman ini: 219 dari 377 cabang di dataset juga tanpa nomor.
 * Nomor TIDAK BOLEH ditebak atau diambil dari situs lain; di situs YMYL,
 * nomor yang keliru adalah "displaying false information" menurut kebijakan
 * Scam and Fraud Google (SKILL.md §0). Halaman menjawab kata kunci
 * "no telp ..." dengan jujur: nomornya tidak tercantum, lalu jalur kontak yang
 * terverifikasi.
 *
 * Alamat mentah di dataset:
 *   "Ruko, Kokan Permata Klp. Gading, Kp Jl. Boulevard Bukit Gading Raya No.5
 *    Blok F, RT.15/RW.3, Klp. Gading Barat"
 * Di halaman ditampilkan dengan singkatan "Klp." diuraikan dan kata lepas "Kp"
 * di depan "Jl." dibuang. Tidak ada bagian alamat yang ditambah atau ditafsir.
 *
 * Entri ini lebih baru dari kebanyakan: gambar dan stempel embed peta-nya
 * bertanggal 2025-01-07 (yang lain umumnya April 2024).
 *
 * Belum terverifikasi, karena itu belum ditulis: nomor telepon kantor, jam
 * operasional, foto cabang, patokan di lapangan.
 */

export const CABANG = {
  nama: "Adira Finance Kelapa Gading",
  namaDataset: "Adira Finance Kelapa Gading - Jakarta Utara",
  /** Nama pin di Google Maps, verbatim dari `gmaps_link`. */
  namaMaps: "ADIRA FINANCE",
  gedung: "Ruko Kokan Permata Kelapa Gading",
  jalan: "Jl. Boulevard Bukit Gading Raya No. 5 Blok F",
  rtRw: "RT.15/RW.03",
  kelurahan: "Kelapa Gading Barat",
  kecamatan: "Kelapa Gading",
  kota: "Kota Jakarta Utara",
  provinsi: "DKI Jakarta",
  kodePos: "14240",
  lintang: -6.160201,
  bujur: 106.8839388,
  slug: "adira-finance-kelapa-gading",
} as const;

/** Enam kecamatan Kota Jakarta Utara — `sub_districts.csv`, district_id 3175. */
export const KECAMATAN_JAKUT = [
  "Penjaringan",
  "Pademangan",
  "Tanjung Priok",
  "Koja",
  "Kelapa Gading",
  "Cilincing",
] as const;

/**
 * Lima kantor Adira lain di DKI Jakarta punya nomor, dan SEMUANYA nomor
 * telepon tetap berawalan 021 (Tebet, Pondok Indah Baru, Ketapang, Daan Mogot,
 * Latumenten — dicek 2026-09-24). Dasar tips "nomor kantor = 021" di halaman.
 */
export const JUMLAH_KANTOR_DKI_BERNOMOR_021 = 5;

/**
 * Cabang terdekat, jarak lurus dari titik ini. Kedua entri Cikarang
 * (11,7 dan 14,8 km) sengaja tidak ada — koordinat keduanya terbukti keliru
 * (uji urutan bujur, SKILL.md §8).
 */
export const TERDEKAT = [
  { nama: "Adira Finance Tebet", wilayah: "Jakarta Selatan", km: 7.8, href: "/adira-finance-tebet" },
  { nama: "Adira Finance Ketapang", wilayah: "Jakarta Pusat", km: 7.9, href: null },
  { nama: "Adira Finance Harapan Indah", wilayah: "Kota Bekasi", km: 10.0, href: "/adira-finance-harapan-indah" },
  { nama: "Adira Finance Latumenten", wilayah: "Jakarta Barat", km: 10.0, href: null },
  { nama: "Adira Finance Jatirahayu", wilayah: "Pondok Gede, Kota Bekasi", km: 14.3, href: "/adira-finance-pondok-gede" },
] as const;

export const PETA_URL = `https://www.google.com/maps/search/?api=1&query=${CABANG.lintang},${CABANG.bujur}`;

/** Dari kolom `gmaps_link`. Dimuat hanya setelah diklik — lihat `PetaCabang`. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7933.5601681676835!2d106.88393879357905!3d-6.160200999999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f53c6a85a47b%3A0x30173f5de0359c74!2sADIRA%20FINANCE!5e0!3m2!1sid!2sid!4v1736263457490!5m2!1sid!2sid";
