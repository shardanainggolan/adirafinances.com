/**
 * Data cabang Adira Finance Alam Sutera.
 *
 * SEMUA nilai di sini berasal dari dataset milik pemilik
 * (`public/analisis/adira-branches-full.csv` baris `branch_id=4`, plus tabel
 * wilayah `provinces/districts/sub_districts.csv` yang memakai kode BPS).
 * Jarak dihitung dari koordinat pada dataset yang sama.
 *
 * Jangan menambah fakta apa pun ke berkas ini tanpa sumber. Rencana halaman
 * (`docs/rencana-halaman-alam-sutera.md` §3) mencatat enam hal yang SENGAJA
 * belum ditulis karena belum terverifikasi: keberadaan SPKLU, apakah Adira
 * Expo di lokasi ini bersifat tetap, apakah unit bekas dipajang, jam
 * operasional cabang, jam operasional expo, dan status aktif kedua nomor
 * telepon. Situs ini YMYL — yang belum dicek tidak terbit.
 */

export const CABANG = {
  nama: "Adira Finance Alam Sutera",
  namaDataset: "Adira Finance Alam Sutera - Tangerang",
  /** Nama tempat pada Google Maps, terbaca dari `gmaps_link` di dataset. */
  namaMaps: "Adira Alam Sutera Otomotif",
  jalan: "Jl. Raya Serpong Kilometer 7 No. 38",
  kelurahan: "Pakulonan",
  kecamatan: "Serpong Utara",
  kota: "Kota Tangerang Selatan",
  provinsi: "Banten",
  kodePos: "15325",
  /** Nomor cabang, bukan nomor agen. Selalu beri label yang membedakannya. */
  telepon: ["021-53124550", "021-53124573"],
  fax: "021-53124559",
  lintang: -6.2511544,
  bujur: 106.6482111,
  slug: "adira-finance-alam-sutera",
} as const;

/** Alamat satu baris, dipakai di JSON-LD dan meta description. */
export const ALAMAT_RINGKAS = `${CABANG.jalan}, ${CABANG.kelurahan}, ${CABANG.kecamatan}, ${CABANG.kota}, ${CABANG.provinsi} ${CABANG.kodePos}`;

/**
 * Kecamatan di Kota Tangerang Selatan.
 * Sumber: `sub_districts.csv`, district_id 3674. Ditulis apa adanya — ini
 * daftar wilayah administratif, BUKAN klaim pembagian teritori Adira.
 */
export const KECAMATAN_TANGSEL = [
  "Serpong Utara",
  "Serpong",
  "Pondok Aren",
  "Ciputat",
  "Ciputat Timur",
  "Pamulang",
  "Setu",
] as const;

/**
 * Cabang lain terdekat, jarak garis lurus dari koordinat dataset.
 *
 * "Terdekat" adalah fakta geografis yang dihitung. Ini BUKAN pernyataan tentang
 * cabang mana yang melayani wilayah tertentu — pembagian itu tidak ada di data
 * mana pun yang kami punya.
 */
export const CABANG_TERDEKAT = [
  { nama: "Adira Finance Ciledug", wilayah: "Kota Tangerang", km: 7.5 },
  { nama: "Adira Finance Pasar Baru", wilayah: "Kota Tangerang", km: 9.5 },
  { nama: "Adira Finance Ciputat", wilayah: "Kota Tangerang Selatan", km: 12.9 },
  { nama: "Adira Finance Daan Mogot", wilayah: "Kota Jakarta Barat", km: 13.3 },
  { nama: "Adira Finance Citra Raya", wilayah: "Kabupaten Tangerang", km: 14.8 },
] as const;

/** Tautan peta. Dibangun dari koordinat, bukan disalin dari pihak ketiga. */
export const PETA_URL = `https://www.google.com/maps/search/?api=1&query=${CABANG.lintang},${CABANG.bujur}`;

/**
 * URL sematan peta, dari kolom `gmaps_link` pada dataset.
 *
 * Sengaja TIDAK dimuat saat halaman dibuka. Sematan Google Maps menarik ratusan
 * kilobita skrip dan ubin peta dari beberapa host pihak ketiga, dan menghubungi
 * Google — beserta cookie dan alamat IP pengunjung — sebelum pengunjung meminta
 * apa pun. Di halaman seringan ini, memuatnya di awal akan mendominasi LCP.
 * `components/ui/PetaCabang.tsx` memuatnya hanya setelah diklik.
 */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.095437301347!2d106.64821107508162!3d-6.251154411206473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb964d60234b%3A0x9466abed1caa4058!2sAdira%20Alam%20Sutera%20Otomotif!5e0!3m2!1sid!2sid!4v1713270245528!5m2!1sid!2sid";
