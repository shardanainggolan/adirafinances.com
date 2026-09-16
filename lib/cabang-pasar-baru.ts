/**
 * Data cabang Adira Finance Pasar Baru – Tangerang.
 *
 * Seluruh nilai berasal dari dataset milik pemilik
 * (`public/analisis/adira-branches-full.csv`, `branch_id=6`) dan tabel wilayah
 * berkode BPS. Baris yang diberikan pemilik pada 2026-09-15 cocok seluruhnya
 * dengan dataset (alamat, kode pos, telepon, dua faks, koordinat, kecamatan).
 * Jarak dihitung dari koordinat pada dataset yang sama.
 *
 * Nama tempat di Google Maps, dibaca apa adanya dari `gmaps_link`:
 * "PT. ADIRA FINANCE 0128 PS. BARU". Itulah asal kata kunci
 * `pt adira finance 0128 ps baru`. Angka 0128 TIDAK ditafsirkan di halaman —
 * kami tidak punya sumber yang menjelaskan artinya, jadi ia ditampilkan
 * sebagai bagian nama listing, bukan sebagai "kode cabang".
 *
 * Yang belum terverifikasi dan karena itu belum ditulis: jam operasional,
 * status aktif nomor telepon dan faks, foto cabang, dan jarak ke kawasan
 * Pasar Baru Jakarta Pusat (permintaan OSM tidak terjawab saat halaman
 * dibuat — disambiguasinya ditulis tanpa angka).
 */

export const CABANG = {
  nama: "Adira Finance Pasar Baru",
  namaDataset: "Adira Finance Pasar Baru - Tangerang",
  /** Nama listing di Google Maps, verbatim dari `gmaps_link`. */
  namaMaps: "PT. ADIRA FINANCE 0128 PS. BARU",
  jalan: "Jl. Moh. Toha No. 14CD",
  rtRw: "RT.001/RW.005",
  kelurahan: "Gerendeng",
  kecamatan: "Karawaci",
  kota: "Kota Tangerang",
  provinsi: "Banten",
  kodePos: "15113",
  /** Satu nomor telepon dan dua faks — memang begitu di dataset, bukan salah tulis. */
  telepon: "021-5537799",
  fax: ["021-5537798", "021-5537897"],
  lintang: -6.1704144,
  bujur: 106.6210982,
  slug: "adira-finance-pasar-baru",
} as const;

/**
 * Tiga belas kecamatan Kota Tangerang — `sub_districts.csv`, district_id 3671.
 * Pembagian administratif, BUKAN klaim teritori layanan Adira.
 */
export const KECAMATAN_KOTA_TANGERANG = [
  "Ciledug",
  "Larangan",
  "Karang Tengah",
  "Cipondoh",
  "Pinang",
  "Tangerang",
  "Karawaci",
  "Jati Uwung",
  "Cibodas",
  "Periuk",
  "Batuceper",
  "Neglasari",
  "Benda",
] as const;

/**
 * Tiga cabang terdekat, jarak lurus dari titik ini. Yang paling dekat justru
 * di Tangerang Selatan; satu-satunya cabang lain yang sekota (Ciledug) lebih
 * jauh. Sudah ada halamannya untuk Alam Sutera, jadi ditautkan.
 */
export const TERDEKAT = [
  { nama: "Adira Finance Alam Sutera", wilayah: "Kota Tangerang Selatan", km: 9.5, href: "/adira-finance-alam-sutera" },
  { nama: "Adira Finance Daan Mogot", wilayah: "Kota Jakarta Barat", km: 10.2, href: null },
  { nama: "Adira Finance Ciledug", wilayah: "Kota Tangerang", km: 11.9, href: null },
] as const;

/** Cabang di daftar kami yang berada di Jakarta Pusat — untuk disambiguasi Pasar Baru. */
export const CABANG_JAKARTA_PUSAT = { nama: "Adira Finance Ketapang", kecamatan: "Gambir", km: 21.2 } as const;

export const PETA_URL = `https://www.google.com/maps/search/?api=1&query=${CABANG.lintang},${CABANG.bujur}`;

/** Dari kolom `gmaps_link`. Dimuat hanya setelah diklik — lihat `PetaCabang`. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.703701764191!2d106.62109817508072!3d-6.170414360468295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ff322ea716d7%3A0x6d8fd476d57a2579!2sPT.%20ADIRA%20FINANCE%200128%20PS.%20BARU!5e0!3m2!1sid!2sid!4v1713271042298!5m2!1sid!2sid";
