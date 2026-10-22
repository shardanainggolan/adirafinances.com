/**
 * Data cabang Adira Finance Solo Baru – Grogol, Kabupaten Sukoharjo.
 *
 * Diverifikasi 2026-10-22. Baris dataset (`branch_id=60`): telepon dan alamat
 * SEHAT, KOORDINAT SALAH.
 *
 * - Telepon 0271-626626, faks 0271-626622: unik di dataset, dikuatkan
 *   direktori independen (telepon.panggon.com, portal-alamat — ringkasan hasil
 *   pencarian). Nomor lain yang beredar ("0271-626624", nomor HP agen) tidak
 *   dipakai.
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`): "Graha
 *   Adira", "Solo Baru, Jl. Raya Solo Permai 7 …, Dusun I, Madegondo, Kec.
 *   Grogol, Kabupaten Sukoharjo, Jawa Tengah 57552", 103 ulasan.
 * - Titik LISTING (pusat embed): -7,601894 / 110,813303. Di OSM ada gedung
 *   kantor bernama "Adira" 0,02 km dari titik itu (Nominatim: "Adira, Jalan
 *   Insinyur Soekarno, Grogol, 57552"). Koordinat DATASET (bujur 110,7751942)
 *   jatuh di Duwet, ±4,2 km ke barat — tidak dipakai.
 * - Jalan besar terdekat di OSM: Jalan Insinyur Soekarno, 26 m di timur titik
 *   kantor. Alamat resmi menulis "Jl. Raya Solo Permai"; kami tidak menyatakan
 *   keduanya jalan yang sama, hanya memberi tahu nama yang tertulis di peta.
 *
 * Wilayah (detikJateng, 3 Mar 2022, "Jangan Salah! Solobaru Bukan di Solo"):
 * Solo Baru bagian dari Kecamatan Grogol, Kabupaten Sukoharjo; mencakup lima
 * desa — Langenharjo, Gedangan, Madegondo, Kwarasan, Grogol; dikembangkan
 * PT Pondok Solo Permai; "secara alam, batasnya tidak ada" dengan Kota Solo.
 * Solopos (9 Nov 2021): pengembangan dimulai sekitar 1990-an di Madegondo,
 * dipilih karena paling dekat dengan Kota Solo.
 *
 * Kota Surakarta (district 3372): TIDAK ada kantor Adira di dataset.
 *
 * Tidak dipakai: jam operasional (situs agen, tidak terverifikasi), rating.
 */

export const CABANG = {
  nama: "Adira Finance Solo Baru",
  namaDataset: "Adira Finance Solo Baru - Solo",
  namaMaps: "Graha Adira",
  jalan: "Jl. Raya Solo Permai JA No. 7-9",
  desa: "Madegondo",
  kecamatan: "Grogol",
  kabupaten: "Kabupaten Sukoharjo",
  provinsi: "Jawa Tengah",
  kodePos: "57552",
  telepon: "0271-626626",
  fax: "0271-626622",
  slug: "adira-finance-solo-baru",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Lima desa kawasan Solo Baru (detikJateng). */
export const DESA_SOLO_BARU = ["Langenharjo", "Gedangan", "Madegondo", "Kwarasan", "Grogol"] as const;

/**
 * Dari titik-titik terkenal di Kota Solo: jarak lurus ke kantor ini dan ke
 * kantor Adira berikutnya di data kami (selalu Karanganyar). Titik dari
 * Nominatim; Karanganyar dari koordinat dataset (pin jatuh di Jl. Lawu,
 * sesuai alamatnya).
 */
export const DARI_KOTA_SOLO: readonly { titik: string; keSini: number; keKaranganyar: number }[] = [
  { titik: "Alun-Alun Kidul", keSini: 2.6, keKaranganyar: 13.7 },
  { titik: "Keraton Kasunanan", keSini: 3.1, keKaranganyar: 13.7 },
  { titik: "Balai Kota Surakarta", keSini: 4.0, keKaranganyar: 13.5 },
  { titik: "Stasiun Purwosari", keSini: 4.9, keKaranganyar: 17.3 },
  { titik: "Stasiun Solo Balapan", keSini: 5.1, keKaranganyar: 14.8 },
  { titik: "Terminal Tirtonadi", keSini: 5.5, keKaranganyar: 15.0 },
];

/** Patokan sekitar kantor, OSM, jarak lurus dari titik listing. */
export const PATOKAN: readonly { nama: string; km: number; catatan: string }[] = [
  { nama: "Pakuwon Mall Solo Baru", km: 0.19, catatan: "di seberang Jalan Ir. Soekarno" },
  { nama: "The Park Mall", km: 0.5, catatan: "ke timur laut" },
  { nama: "Hotel Grand Mercure Solo Baru", km: 0.54, catatan: "ke timur laut" },
  { nama: "Patung Pandawa Lima", km: 0.78, catatan: "ke selatan" },
  { nama: "RSU Indriati Solo Baru", km: 1.16, catatan: "ke barat daya" },
  { nama: "Bundaran Tugu Soekarno", km: 1.17, catatan: "ke utara" },
];

/**
 * Kantor Adira lain di Solo Raya, jarak lurus dari titik listing ke titik
 * dataset masing-masing. Kelima pin jatuh di kota yang sesuai alamatnya
 * (reverse geocode Nominatim, 2026-10-22), tapi listing Maps-nya belum dicek.
 */
export const SOLO_RAYA: readonly { nama: string; wilayah: string; km: number }[] = [
  { nama: "Adira Finance Karang Anyar", wilayah: "Jl. Lawu, Karanganyar", km: 15.1 },
  { nama: "Adira Finance Boyolali", wilayah: "Jl. Kates, Boyolali", km: 24.6 },
  { nama: "Adira Finance Pemuda Utara", wilayah: "Jl. Pemuda, Klaten", km: 25.8 },
  { nama: "Adira Finance Wonogiri", wilayah: "Jl. A. Yani, Wonogiri", km: 26.3 },
  { nama: "Adira Finance Sukowati", wilayah: "Jl. Sukowati, Sragen", km: 28.5 },
];

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Graha Adira, Solo Baru, Grogol, Sukoharjo");

/** Dari `gmaps_link` — listing terverifikasi benar (koordinat dataset-nya yang salah). */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31638.019812038663!2d110.77519417431638!3d-7.601893999999981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16068094fb3b%3A0x1725d943c3f76bbd!2sGraha%20Adira!5e0!3m2!1sid!2sid!4v1713329671279!5m2!1sid!2sid";
